import React, { useState, useEffect, useMemo } from 'react';
import { Evaluation, EvaluationAnswers, EvaluationType, ExceptionItem, ScoreValue, Sector, Supplier, SupplierQuestionItem, User } from '../types';
import { QuestionnaireService } from '../services/questionnaireService';
import { safeFormatScore, safeNumber } from '../utils/formatters';
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  X, 
  Layers, 
  Plus, 
  Trash2, 
  Search,
  FileQuestion,
  Info
} from 'lucide-react';

interface EvaluationFormProps {
  suppliers: Supplier[];
  sectors: Sector[];
  currentUser: User | null;
  initialEvaluation?: Evaluation | null;
  preselectedSupplierId?: string;
  preselectedYear?: number;
  allEvaluations?: Evaluation[];
  onSave: (evaluation: Evaluation, openActionPlanModal?: boolean) => void;
  onCancel: () => void;
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({
  suppliers,
  sectors,
  currentUser,
  initialEvaluation,
  preselectedSupplierId,
  preselectedYear,
  allEvaluations = [],
  onSave,
  onCancel
}) => {
  // Selection state
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(
    initialEvaluation?.fornecedorId || preselectedSupplierId || suppliers[0]?.id || ''
  );
  
  const [supplierSearchTerm, setSupplierSearchTerm] = useState<string>('');

  const [selectedYear, setSelectedYear] = useState<number>(
    initialEvaluation?.ano || preselectedYear || 2026
  );

  // Modalidade de Avaliação: PADRÃO vs EXCEÇÃO
  const [tipoAvaliacao, setTipoAvaliacao] = useState<EvaluationType>(
    initialEvaluation?.tipoAvaliacao || 'PADRAO'
  );
  const [justificativaExcecao, setJustificativaExcecao] = useState<string>(
    initialEvaluation?.justificativaExcecao || ''
  );

  // Selected Supplier & Sector
  const selectedSupplier = useMemo(() => {
    return suppliers.find(s => s.id === selectedSupplierId);
  }, [suppliers, selectedSupplierId]);

  const selectedSector = useMemo(() => {
    if (!selectedSupplier) return undefined;
    return sectors.find(sec => sec.id === selectedSupplier.setorResponsavelId);
  }, [sectors, selectedSupplier]);

  // Lista filtrada de fornecedores para busca rápida
  const filteredSuppliers = useMemo(() => {
    if (!supplierSearchTerm.trim()) return suppliers;
    const term = supplierSearchTerm.toLowerCase();
    return suppliers.filter(s =>
      s.nomeFantasia.toLowerCase().includes(term) ||
      s.razaoSocial.toLowerCase().includes(term) ||
      s.numeroContrato.toLowerCase().includes(term)
    );
  }, [suppliers, supplierSearchTerm]);

  // Questionários Dinâmicos por Fornecedor (Base Oficial)
  const [currentQuestions, setCurrentQuestions] = useState<SupplierQuestionItem[]>(() => {
    if (initialEvaluation?.perguntasAvaliadas && initialEvaluation.perguntasAvaliadas.length > 0) {
      return initialEvaluation.perguntasAvaliadas;
    }
    const sup = suppliers.find(s => s.id === (initialEvaluation?.fornecedorId || preselectedSupplierId || suppliers[0]?.id));
    return QuestionnaireService.getQuestionsForSupplier(sup).questions;
  });

  const [questionnaireStatus, setQuestionnaireStatus] = useState<{ isCustom: boolean; label: string }>(() => {
    const sup = suppliers.find(s => s.id === (initialEvaluation?.fornecedorId || preselectedSupplierId || suppliers[0]?.id));
    const res = QuestionnaireService.getQuestionsForSupplier(sup);
    return { isCustom: res.isCustom, label: res.label };
  });

  // Itens dinâmicos para Avaliação por Exceção
  const [itensExcecao, setItensExcecao] = useState<ExceptionItem[]>(() => {
    if (initialEvaluation?.itensExcecao && initialEvaluation.itensExcecao.length > 0) {
      return initialEvaluation.itensExcecao;
    }
    return [
      { id: `item_1_${Date.now()}`, pergunta: 'Cumprimento do prazo acordado para atendimento técnico e operacional', grupo: 'Qualidade', nota: 5 },
      { id: `item_2_${Date.now()}`, pergunta: 'Disponibilidade e presteza da equipe técnica quando acionada', grupo: 'Aspectos Comportamentais', nota: 5 },
      { id: `item_3_${Date.now()}`, pergunta: 'Entrega das comprovações técnicas e regulatórias vigentes', grupo: 'Aspectos Legais & Regulatórios', nota: 5 }
    ];
  });

  // Answers State: Map de questionId -> nota
  const [respostas, setRespostas] = useState<Record<string, number | 'NA'>>(() => {
    if (initialEvaluation?.respostas) {
      return initialEvaluation.respostas;
    }
    return {};
  });

  // Observações por Categoria
  const [categoryObservations, setCategoryObservations] = useState<Record<string, string>>({
    'ASPECTOS LEGAIS': initialEvaluation?.observacoesLegais || '',
    'ASPECTOS COMPORTAMENTAIS': initialEvaluation?.observacoesComportamentais || '',
    'PROGRAMA QUALIDADE E SEGURANÇA': initialEvaluation?.observacoesQualidade || ''
  });

  const [parecerGeral, setParecerGeral] = useState(initialEvaluation?.parecerGeral || '');

  // Estado do Modal de Adição Manual de Perguntas
  const [showAddManualModal, setShowAddManualModal] = useState(false);
  const [manualQuestionText, setManualQuestionText] = useState('');
  const [manualQuestionCategory, setManualQuestionCategory] = useState('ASPECTOS LEGAIS');
  const [manualQuestionJustification, setManualQuestionJustification] = useState('');

  // Ao alterar o fornecedor, carregar automaticamente o questionário correspondente
  useEffect(() => {
    if (initialEvaluation && initialEvaluation.fornecedorId === selectedSupplierId) {
      setRespostas(initialEvaluation.respostas || {});
      if (initialEvaluation.tipoAvaliacao) setTipoAvaliacao(initialEvaluation.tipoAvaliacao);
      if (initialEvaluation.justificativaExcecao) setJustificativaExcecao(initialEvaluation.justificativaExcecao);
      if (initialEvaluation.itensExcecao) setItensExcecao(initialEvaluation.itensExcecao);
      if (initialEvaluation.perguntasAvaliadas && initialEvaluation.perguntasAvaliadas.length > 0) {
        setCurrentQuestions(initialEvaluation.perguntasAvaliadas);
        setQuestionnaireStatus({
          isCustom: initialEvaluation.isQuestionarioEspecifico ?? true,
          label: initialEvaluation.nomeQuestionario || `Questionário padrão de ${selectedSupplier?.nomeFantasia} - ${initialEvaluation.perguntasAvaliadas.length} perguntas`
        });
        return;
      }
    }

    const res = QuestionnaireService.getQuestionsForSupplier(selectedSupplier);
    setCurrentQuestions(res.questions);
    setQuestionnaireStatus({ isCustom: res.isCustom, label: res.label });
    setRespostas({});
  }, [selectedSupplierId, selectedSupplier, initialEvaluation]);

  // Agrupamento Dinâmico de Perguntas por Categoria
  const groupedQuestions = useMemo(() => {
    return QuestionnaireService.groupByCategory(currentQuestions);
  }, [currentQuestions]);

  // Médias por Categoria
  const categoryAverages = useMemo(() => {
    const avgs: Record<string, number> = {};
    Object.entries(groupedQuestions).forEach(([cat, qs]) => {
      avgs[cat] = QuestionnaireService.calculateGroupAverage(qs, respostas);
    });
    return avgs;
  }, [groupedQuestions, respostas]);

  // Média Geral Modo Padrão
  const mediaGeralPadrao = useMemo(() => {
    const validAvgs = Object.values(categoryAverages).filter(v => v > 0);
    if (validAvgs.length === 0) return 0;
    const avg = validAvgs.reduce((a, b) => a + b, 0) / validAvgs.length;
    return Number(avg.toFixed(2));
  }, [categoryAverages]);

  // Média Geral Modo Exceção
  const mediaGeralExcecao = useMemo(() => {
    const validItems = itensExcecao.filter(i => typeof i.nota === 'number' && !isNaN(i.nota));
    if (validItems.length === 0) return 0;
    const sum = validItems.reduce((acc, curr) => acc + (curr.nota as number), 0);
    return Number((sum / validItems.length).toFixed(2));
  }, [itensExcecao]);

  // Média Ativa (Conforme a modalidade)
  const activeMediaGeral = tipoAvaliacao === 'EXCECAO' ? mediaGeralExcecao : mediaGeralPadrao;
  const necessitaPlanoAcao = activeMediaGeral > 0 && activeMediaGeral < 4.00;
  const statusMeta = activeMediaGeral >= 4.00 ? 'DENTRO_DA_META' : activeMediaGeral >= 3.00 ? 'ABAIXO_DA_META' : 'CRITICO';

  const handleScoreChange = (questionId: string, score: number | 'NA') => {
    setRespostas(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  // Manipulação de Itens na Exceção
  const addExceptionItem = () => {
    setItensExcecao(prev => [
      ...prev,
      {
        id: `item_${Date.now()}_${crypto.randomUUID()}`,
        pergunta: '',
        grupo: 'Qualidade',
        nota: 5
      }
    ]);
  };

  const removeExceptionItem = (itemId: string) => {
    setItensExcecao(prev => prev.filter(i => i.id !== itemId));
  };

  const updateExceptionItem = (itemId: string, field: keyof ExceptionItem, value: any) => {
    setItensExcecao(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Adição Manual de Pergunta
  const handleAddManualQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuestionText.trim()) {
      alert('Por favor, informe o texto da pergunta a ser adicionada.');
      return;
    }
    if (!manualQuestionJustification.trim()) {
      alert('⚠️ ATENÇÃO: A justificativa para adição manual da pergunta é obrigatória.');
      return;
    }

    const newItem: SupplierQuestionItem = {
      id: `manual_${Date.now()}_${crypto.randomUUID()}`,
      fornecedor: selectedSupplier?.nomeFantasia || 'Fornecedor',
      categoria: manualQuestionCategory,
      pergunta: manualQuestionText.trim(),
      obrigatoria: true,
      peso: 1,
      isManualAddition: true,
      justificativaAdicao: manualQuestionJustification.trim()
    };

    setCurrentQuestions(prev => [...prev, newItem]);
    setManualQuestionText('');
    setManualQuestionJustification('');
    setShowAddManualModal(false);
  };

  const handleRemoveManualQuestion = (questionId: string) => {
    setCurrentQuestions(prev => prev.filter(q => q.id !== questionId));
    setRespostas(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent, openActionPlanModalDirectly: boolean = false) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!selectedSupplier) {
      alert('Por favor, selecione um fornecedor válido.');
      return;
    }

    // Validação estrita do Modo Exceção
    if (tipoAvaliacao === 'EXCECAO') {
      if (!justificativaExcecao || justificativaExcecao.trim() === '') {
        alert('⚠️ ATENÇÃO: A Justificativa para utilização de avaliação por exceção é obrigatória. Por favor, informe o motivo.');
        return;
      }

      if (itensExcecao.length === 0) {
        alert('⚠️ ATENÇÃO: Adicione pelo menos 1 item personalizado para avaliar este fornecedor no modo Exceção.');
        return;
      }

      const emptyItem = itensExcecao.find(i => !i.pergunta || i.pergunta.trim() === '');
      if (emptyItem) {
        alert('⚠️ ATENÇÃO: Por favor, preencha a pergunta/item em todos os itens da avaliação por exceção.');
        return;
      }
    }

    // Validação de Duplicidade (Não duplicar avaliação para mesmo Fornecedor + Contrato + Ano)
    if (allEvaluations && !initialEvaluation) {
      const isDuplicate = allEvaluations.some(
        ev => ev.fornecedorId === selectedSupplier.id && ev.ano === selectedYear
      );
      if (isDuplicate) {
        alert(`⚠️ ATENÇÃO: Já existe uma Avaliação Anual concluída para o fornecedor "${selectedSupplier.nomeFantasia}" no exercício de ${selectedYear}.\n\nCaso deseje alterar ou revisar as notas, consulte e edite o registro existente no menu "Avaliações & Histórico".`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const formattedMediaGeral = safeFormatScore(activeMediaGeral);

      const mediaLegais = categoryAverages['ASPECTOS LEGAIS'] ?? activeMediaGeral;
      const mediaComportamentais = categoryAverages['ASPECTOS COMPORTAMENTAIS'] ?? activeMediaGeral;
      const mediaQualidade = categoryAverages['PROGRAMA QUALIDADE E SEGURANÇA'] ?? activeMediaGeral;

      const newEval: Evaluation = {
        id: initialEvaluation?.id || `eval_${Date.now()}`,
        fornecedorId: selectedSupplier.id,
        setorId: selectedSupplier.setorResponsavelId,
        ano: selectedYear,
        dataAvaliacao: new Date().toISOString().split('T')[0],
        gestorAvaliador: currentUser?.nome || selectedSector?.gestorResponsavel || 'Gestor Responsável',
        emailAvaliador: currentUser?.email || selectedSector?.emailGestor || 'gestor@vilanovastar.com.br',
        tipoAvaliacao,
        justificativaExcecao: tipoAvaliacao === 'EXCECAO' ? justificativaExcecao : '',
        itensExcecao: tipoAvaliacao === 'EXCECAO' ? itensExcecao : [],
        perguntasAvaliadas: tipoAvaliacao === 'EXCECAO' ? [] : currentQuestions,
        isQuestionarioEspecifico: tipoAvaliacao === 'EXCECAO' ? false : questionnaireStatus.isCustom,
        nomeQuestionario: tipoAvaliacao === 'EXCECAO' ? 'Questionário Excepcional' : questionnaireStatus.label,
        respostas: tipoAvaliacao === 'EXCECAO' ? {} : ((respostas || {}) as EvaluationAnswers),
        observacoesLegais: categoryObservations['ASPECTOS LEGAIS'] || '',
        observacoesComportamentais: categoryObservations['ASPECTOS COMPORTAMENTAIS'] || '',
        observacoesQualidade: categoryObservations['PROGRAMA QUALIDADE E SEGURANÇA'] || '',
        parecerGeral: parecerGeral || `Avaliação Anual ${selectedYear} referente ao contrato ${selectedSupplier.numeroContrato}. Média Geral: ${formattedMediaGeral}.`,
        mediaLegais: tipoAvaliacao === 'EXCECAO' ? activeMediaGeral : safeNumber(mediaLegais),
        mediaComportamentais: tipoAvaliacao === 'EXCECAO' ? activeMediaGeral : safeNumber(mediaComportamentais),
        mediaQualidade: tipoAvaliacao === 'EXCECAO' ? activeMediaGeral : safeNumber(mediaQualidade),
        mediaGeral: safeNumber(activeMediaGeral),
        statusMeta: statusMeta || 'DENTRO_DA_META',
        necessitaPlanoAcao: Boolean(necessitaPlanoAcao),
        statusAssinatura: initialEvaluation?.statusAssinatura || 'PENDENTE_ENVIO'
      };

      onSave(newEval, openActionPlanModalDirectly);
    } catch (err) {
      console.error('Erro ao concluir avaliação:', err);
      alert('Ocorreu um erro ao salvar a avaliação. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#123768] text-white p-5 rounded-lg shadow-sm border border-[#0B2850]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-white/20 text-white border border-white/30">
              {tipoAvaliacao === 'EXCECAO' ? 'AVALIAÇÃO POR EXCEÇÃO' : 'QUESTIONÁRIO ESPECÍFICO / PADRÃO'}
            </span>
            <span className="text-slate-300 text-xs">Ano {selectedYear}</span>
          </div>
          <h2 className="text-xl font-bold mt-1 text-white">Preenchimento da Avaliação Anual de Desempenho</h2>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 rounded-md transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-xs font-bold text-white bg-[#047857] hover:bg-[#065F46] rounded-md shadow-sm transition cursor-pointer"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Avaliação
          </button>
        </div>
      </div>

      {/* Bloco de Seleção de Fornecedor, Setor, Ano e MODALIDADE */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#CBD5E1] space-y-6">
        <h3 className="font-bold text-[#172B4D] text-sm flex items-center">
          <Building2 className="w-4 h-4 mr-2 text-[#123768]" />
          Dados do Contrato e Seleção do Fornecedor
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-[#172B4D]">Selecione o Fornecedor / Empresa *</label>
              <span className="text-[10px] text-[#475569]">{filteredSuppliers.length} opções</span>
            </div>

            {/* Input de filtro/busca rápida */}
            <div className="relative mb-2">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#475569]" />
              <input
                type="text"
                value={supplierSearchTerm}
                onChange={(e) => setSupplierSearchTerm(e.target.value)}
                placeholder="Filtrar fornecedor por nome..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-xs text-[#172B4D] focus:ring-1 focus:ring-[#123768] placeholder:text-slate-400"
              />
            </div>

            <select
              value={selectedSupplierId}
              onChange={(e) => setSelectedSupplierId(e.target.value)}
              className="w-full bg-white border border-[#CBD5E1] text-[#172B4D] font-semibold rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
            >
              {filteredSuppliers.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.nomeFantasia} ({sup.numeroContrato})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#172B4D] mb-1">Setor Hospitalar Responsável</label>
            <input
              type="text"
              readOnly
              value={selectedSector?.nome || 'Setor Responsável'}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] font-bold rounded-md p-2.5 mt-8"
            />
          </div>

          <div>
            <label className="block font-bold text-[#172B4D] mb-1">Ano do Ciclo de Avaliação *</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full bg-white border border-[#CBD5E1] text-[#172B4D] font-bold rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768] mt-8"
            >
              <option value={2026}>Ano 2026 (Ciclo Atual)</option>
              <option value={2025}>Ano 2025</option>
              <option value={2024}>Ano 2024</option>
            </select>
          </div>
        </div>

        {/* SELETOR DE MODO: QUESTIONÁRIO DO FORNECEDOR / PADRÃO vs EXCEÇÃO */}
        <div className="p-4 bg-[#F8FAFC] border border-[#CBD5E1] text-[#172B4D] rounded-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-xs text-[#123768] font-bold uppercase block">Modalidade de Avaliação</span>
              <h4 className="text-sm font-bold text-[#172B4D]">Escolha o Tipo de Questionário</h4>
            </div>

            <div className="flex items-center space-x-2 bg-white p-1 rounded-md border border-[#CBD5E1]">
              <button
                type="button"
                onClick={() => setTipoAvaliacao('PADRAO')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                  tipoAvaliacao === 'PADRAO'
                    ? 'bg-[#123768] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#172B4D]'
                }`}
              >
                Modelo do Fornecedor / Padrão
              </button>

              <button
                type="button"
                onClick={() => {
                  setTipoAvaliacao('EXCECAO');
                  if (itensExcecao.length === 0) {
                    setItensExcecao([
                      { id: `item_1_${Date.now()}`, pergunta: 'Cumprimento dos prazos acordados para atendimento técnico e operacional', grupo: 'Qualidade', nota: 5 },
                      { id: `item_2_${Date.now()}`, pergunta: 'Disponibilidade e presteza da equipe técnica quando acionada', grupo: 'Aspectos Comportamentais', nota: 5 },
                      { id: `item_3_${Date.now()}`, pergunta: 'Entrega das comprovações técnicas e regulatórias vigentes', grupo: 'Aspectos Legais & Regulatórios', nota: 5 }
                    ]);
                  }
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                  tipoAvaliacao === 'EXCECAO'
                    ? 'bg-[#123768] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#172B4D]'
                }`}
              >
                Questionário Excepcional
              </button>
            </div>
          </div>

          {/* STATUS DO QUESTIONÁRIO CARREGADO */}
          {tipoAvaliacao === 'PADRAO' && (
            <div className="pt-2 border-t border-[#CBD5E1]">
              {questionnaireStatus.isCustom ? (
                <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] text-xs rounded-md flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#1E40AF] flex-shrink-0" />
                    <div>
                      <strong className="font-bold block text-sm">Questionário Específico Localizado:</strong>
                      <span>{questionnaireStatus.label}</span>
                    </div>
                  </div>
                  <span className="bg-white border border-[#BFDBFE] text-[#1E40AF] font-bold px-2.5 py-1 rounded text-xs">
                    {currentQuestions.length} Perguntas Carregadas
                  </span>
                </div>
              ) : (
                <div className="p-3 bg-[#FFFBEB] border border-[#FCD34D] text-[#92400E] text-xs rounded-md flex items-center space-x-2.5">
                  <AlertTriangle className="w-5 h-5 text-[#92400E] flex-shrink-0" />
                  <div>
                    <strong className="font-bold block text-sm">Aviso de Questionário:</strong>
                    <span>{questionnaireStatus.label}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PAINEL DE JUSTIFICATIVA OBRIGATÓRIA DA EXCEÇÃO */}
          {tipoAvaliacao === 'EXCECAO' && (
            <div className="space-y-3 pt-3 border-t border-[#CBD5E1]">
              <div className="p-3 bg-[#FFFBEB] border border-[#FCD34D] text-[#92400E] text-xs rounded-md flex items-start space-x-2.5">
                <AlertTriangle className="w-5 h-5 text-[#92400E] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-[#92400E] text-sm">Modo de Avaliação por Exceção Ativado:</strong>
                  <span className="text-[#92400E]">Esta avaliação utilizará um questionário excepcional definido livremente para este fornecedor.</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-1">
                  Justificativa para utilização de avaliação por exceção * (Obrigatório)
                </label>
                <textarea
                  rows={2}
                  value={justificativaExcecao}
                  onChange={(e) => setJustificativaExcecao(e.target.value)}
                  required={tipoAvaliacao === 'EXCECAO'}
                  placeholder="Ex: As perguntas padrão não se aplicam integralmente ao escopo e natureza dos serviços deste fornecedor específico..."
                  className="w-full bg-white border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-3 focus:ring-2 focus:ring-[#123768] focus:border-[#123768] font-normal placeholder:text-[#94A3B8]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Card do Fornecedor Selecionado */}
        {selectedSupplier && (
          <div className="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <strong className="text-[#172B4D] text-sm font-bold block">{selectedSupplier.razaoSocial}</strong>
                <p className="text-[#475569]">{selectedSupplier.categoriaServico} | CNPJ: {selectedSupplier.cnpj}</p>
              </div>

              <div className={`inline-flex items-center px-3 py-1 font-bold rounded space-x-1.5 ${
                tipoAvaliacao === 'EXCECAO'
                  ? 'bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF]'
                  : questionnaireStatus.isCustom
                  ? 'bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF]'
                  : 'bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857]'
              }`}>
                <Layers className="w-4 h-4" />
                <span>
                  {tipoAvaliacao === 'EXCECAO' 
                    ? `Avaliação por Exceção (${itensExcecao.length} Itens Personalizados)`
                    : `${questionnaireStatus.label}`
                  }
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#CBD5E1] text-[11px] text-[#475569]">
              <div>Contrato: <strong className="text-[#172B4D]">{selectedSupplier.numeroContrato}</strong></div>
              <div>Vigência: <strong className="text-[#172B4D]">{selectedSupplier.vigenciaFim}</strong></div>
              <div>Avaliador: <strong className="text-[#172B4D]">{currentUser?.nome || selectedSector?.gestorResponsavel}</strong></div>
              <div>E-mail: <strong className="text-[#172B4D]">{currentUser?.email || selectedSector?.emailGestor}</strong></div>
            </div>

            {/* Histórico dos Ciclos Anuais */}
            <div className="pt-2 border-t border-[#CBD5E1] flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="text-[#475569] font-bold flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-[#475569]" /> Histórico dos ciclos:
              </span>
              <div className="flex items-center space-x-2">
                {[2024, 2025, 2026].map(yr => {
                  const evFound = allEvaluations.find(e => e.fornecedorId === selectedSupplier.id && e.ano === yr);
                  return (
                    <span key={yr} className={`inline-flex items-center px-2 py-0.5 rounded font-bold ${
                      evFound 
                        ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]' 
                        : yr < 2026 
                        ? 'bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]' 
                        : 'bg-[#FFFBEB] text-[#92400E] border border-[#FCD34D]'
                    }`}>
                      {yr} {evFound ? 'Concluída' : yr < 2026 ? 'Atrasado' : 'Pendente'}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RENDERIZAÇÃO DO FORMULÁRIO DE EXCEÇÃO VS QUESTIONÁRIO CARREGADO */}
      {tipoAvaliacao === 'EXCECAO' ? (
        /* --- CONSTRUTOR DINÂMICO DA AVALIAÇÃO POR EXCEÇÃO --- */
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#CBD5E1] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#CBD5E1] pb-4">
            <div>
              <span className="text-xs text-[#1E40AF] font-bold uppercase block">Questionário de Exceção</span>
              <h3 className="text-base font-bold text-[#172B4D]">
                Itens Específicos Avaliados ({itensExcecao.length} {itensExcecao.length === 1 ? 'item' : 'itens'})
              </h3>
            </div>

            <button
              type="button"
              onClick={addExceptionItem}
              className="px-4 py-2 bg-[#123768] hover:bg-[#0B2850] text-white font-bold text-xs rounded-md shadow-sm transition inline-flex items-center cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Adicionar Item de Exceção
            </button>
          </div>

          <div className="space-y-4">
            {itensExcecao.map((item, index) => (
              <div key={item.id} className="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-[#172B4D] bg-white border border-[#CBD5E1] px-2.5 py-0.5 rounded">
                    ITEM DE EXCEÇÃO #{index + 1}
                  </span>

                  {itensExcecao.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExceptionItem(item.id)}
                      className="text-xs text-[#B91C1C] hover:text-[#991B1B] font-bold flex items-center cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Remover Item
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-8">
                    <label className="block text-[11px] font-bold text-[#172B4D] mb-1">
                      O que será avaliado neste fornecedor? (Texto livre) *
                    </label>
                    <input
                      type="text"
                      required
                      value={item.pergunta}
                      onChange={(e) => updateExceptionItem(item.id, 'pergunta', e.target.value)}
                      placeholder="Ex: Cumprimento do prazo acordado para atendimento técnico e operacional..."
                      className="w-full bg-white border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 font-normal focus:ring-2 focus:ring-[#123768]"
                    />
                  </div>

                  <div className="md:col-span-4">
                    <label className="block text-[11px] font-bold text-[#172B4D] mb-1">Grupo / Categoria *</label>
                    <select
                      value={item.grupo}
                      onChange={(e) => updateExceptionItem(item.id, 'grupo', e.target.value)}
                      className="w-full bg-white border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 font-medium"
                    >
                      <option value="Qualidade">Qualidade & Satisfação</option>
                      <option value="Aspectos Comportamentais">Aspectos Comportamentais</option>
                      <option value="Aspectos Legais & Regulatórios">Aspectos Legais & Regulatórios</option>
                      <option value="Outro">Outro (Geral)</option>
                    </select>
                  </div>
                </div>

                {/* Seleção de Nota */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#CBD5E1] text-xs">
                  <span className="font-bold text-[#172B4D]">Nota Atribuída a este Item:</span>
                  <div className="flex items-center space-x-1">
                    {[5, 4, 3, 2, 1].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => updateExceptionItem(item.id, 'nota', val as ScoreValue)}
                        className={`w-8 h-8 rounded-md text-xs font-bold transition cursor-pointer ${
                          item.nota === val
                            ? val >= 4 
                              ? 'bg-[#047857] text-white shadow-sm' 
                              : val === 3 
                              ? 'bg-[#92400E] text-white shadow-sm' 
                              : 'bg-[#B91C1C] text-white shadow-sm'
                            : 'bg-white border border-[#CBD5E1] text-[#172B4D] hover:bg-slate-50'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => updateExceptionItem(item.id, 'nota', 'NA')}
                      className={`px-2.5 h-8 rounded-md text-[11px] font-bold transition cursor-pointer ${
                        item.nota === 'NA'
                          ? 'bg-slate-800 text-white shadow-sm'
                          : 'bg-white border border-[#CBD5E1] text-[#475569] hover:bg-slate-50'
                      }`}
                    >
                      NA
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-right">
            <button
              type="button"
              onClick={addExceptionItem}
              className="px-4 py-2 bg-[#EFF6FF] text-[#1E40AF] hover:bg-[#DBEAFE] border border-[#BFDBFE] font-bold text-xs rounded-md shadow-sm transition inline-flex items-center cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Adicionar Outro Item de Exceção
            </button>
          </div>
        </div>
      ) : (
        /* --- QUESTIONÁRIO DINÂMICO AGRUPADO POR CATEGORIA --- */
        <div className="space-y-6">
          {/* Barra de Ações: Escala de Pontuação e Adição Manual */}
          <div className="bg-white border border-[#CBD5E1] text-[#172B4D] p-4 rounded-lg text-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <strong className="text-[#123768] font-bold block mb-1">Escala de Avaliação (1 a 5 e NA):</strong>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#475569]">
                <span><strong className="text-[#047857]">5</strong> = Ótimo / Sempre / Sim</span>
                <span><strong className="text-[#047857]">4</strong> = Bom</span>
                <span><strong className="text-[#92400E]">3</strong> = Regular / Às vezes</span>
                <span><strong className="text-[#B91C1C]">2</strong> = Ruim</span>
                <span><strong className="text-[#B91C1C]">1</strong> = Péssimo / Nunca / Não</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-[#475569] border border-[#CBD5E1]"><strong>NA</strong> = Não se aplica</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAddManualModal(true)}
              className="px-4 py-2 bg-[#123768] hover:bg-[#0B2850] text-white font-bold text-xs rounded-md shadow-sm transition inline-flex items-center self-start md:self-center cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Adicionar Pergunta Manual
            </button>
          </div>

          {/* RENDERIZAÇÃO DOS BLOCOS POR CATEGORIA */}
          {Object.entries(groupedQuestions).map(([categoria, questionsInCat], catIndex) => {
            const catAvg = categoryAverages[categoria] || 0;
            return (
              <div key={categoria} className="bg-white p-6 rounded-lg shadow-sm border border-[#CBD5E1] space-y-4">
                <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-3">
                  <div>
                    <span className="text-xs text-[#475569] font-bold uppercase">Bloco {catIndex + 1}</span>
                    <h3 className="text-base font-bold text-[#172B4D]">{categoria}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#475569] block">Média do Bloco</span>
                    <span className={`text-base font-extrabold ${catAvg >= 4 ? 'text-[#047857]' : 'text-[#92400E]'}`}>
                      {catAvg.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {questionsInCat.map((c, index) => (
                    <div key={c.id} className="p-3 bg-[#F8FAFC] rounded-md border border-[#CBD5E1] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <span className="text-xs text-[#172B4D] font-medium leading-relaxed block">
                          <strong className="text-[#475569] mr-2">{index + 1}.</strong> {c.pergunta}
                        </span>

                        {c.isManualAddition && (
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                            <span className="bg-[#FFFBEB] text-[#92400E] border border-[#FCD34D] px-2 py-0.5 rounded font-bold">
                              Adição Manual
                            </span>
                            <span className="text-[#475569] italic">
                              Justificativa: "{c.justificativaAdicao}"
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveManualQuestion(c.id)}
                              className="text-[#B91C1C] hover:text-[#991B1B] font-bold ml-2 cursor-pointer"
                            >
                              Remover
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-1 flex-shrink-0">
                        {[5, 4, 3, 2, 1].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleScoreChange(c.id, val)}
                            className={`w-8 h-8 rounded-md text-xs font-bold transition cursor-pointer ${
                              respostas[c.id] === val
                                ? val >= 4 
                                  ? 'bg-[#047857] text-white shadow-sm' 
                                  : val === 3 
                                  ? 'bg-[#92400E] text-white shadow-sm' 
                                  : 'bg-[#B91C1C] text-white shadow-sm'
                                : 'bg-white border border-[#CBD5E1] text-[#172B4D] hover:bg-slate-50'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleScoreChange(c.id, 'NA')}
                          className={`px-2.5 h-8 rounded-md text-[11px] font-bold transition cursor-pointer ${
                            respostas[c.id] === 'NA'
                              ? 'bg-slate-800 text-white shadow-sm'
                              : 'bg-white border border-[#CBD5E1] text-[#475569] hover:bg-slate-50'
                          }`}
                        >
                          NA
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172B4D] mb-1">
                    Observações de {categoria} (opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={categoryObservations[categoria] || ''}
                    onChange={(e) => setCategoryObservations(prev => ({ ...prev, [categoria]: e.target.value }))}
                    placeholder={`Comentários e apontamentos específicos para ${categoria.toLowerCase()}...`}
                    className="w-full bg-white border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-3 focus:ring-2 focus:ring-[#123768] placeholder:text-[#94A3B8]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PARECER GERAL E MÉDIA FINAL ANUAL */}
      <div className="bg-white text-[#101828] p-6 rounded-lg shadow-sm border border-[#D0D5DD] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#D0D5DD] pb-4">
          <div>
            <span className="text-xs text-[#667085] font-bold uppercase block">
              Resultado do Ciclo Anual {selectedYear} ({tipoAvaliacao === 'EXCECAO' ? 'Modo Exceção' : questionnaireStatus.label})
            </span>
            <h3 className="text-xl font-bold text-[#101828]">Média Geral da Avaliação de Contrato</h3>
          </div>

          <div className="flex items-center space-x-3 bg-white p-3 rounded-md border border-[#D0D5DD] shadow-sm">
            <div className="text-right">
              <span className="text-[10px] text-[#667085] block uppercase font-bold">Média Final</span>
              <span className={`text-2xl font-black ${
                activeMediaGeral >= 4.0
                  ? 'text-[#065F46]'
                  : activeMediaGeral >= 2.0
                  ? 'text-[#92400E]'
                  : 'text-[#7F1D1D]'
              }`}>
                {activeMediaGeral.toFixed(2)}
              </span>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded uppercase ${
              activeMediaGeral >= 4.0
                ? 'bg-[#D1FAE5] text-[#065F46]'
                : activeMediaGeral >= 2.0
                ? 'bg-[#FEF3C7] text-[#92400E]'
                : 'bg-[#FEE2E2] text-[#7F1D1D]'
            }`}>
              {activeMediaGeral >= 4.0
                ? 'Dentro da Meta (≥ 4,00)'
                : activeMediaGeral >= 2.0
                ? 'Abaixo da Meta (2,00 - 3,99)'
                : 'Crítico (< 2,00)'}
            </span>
          </div>
        </div>

        {necessitaPlanoAcao && (
          <div className="p-4 bg-[#FFFBEB] border border-[#FCD34D] text-[#92400E] text-xs rounded-md flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-[#92400E] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block text-[#92400E] text-sm">Geração Automática de Plano de Ação (5W2H) Obrigatória:</strong>
              <span className="text-[#92400E]">A Média Geral ficou abaixo da meta mínima aceitável (4.00). Ao salvar a avaliação, o sistema direcionará você para o preenchimento do Plano de Ação 5W2H.</span>
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Parecer Geral e Conclusão do Gestor do Contrato *
          </label>
          <textarea
            rows={3}
            value={parecerGeral}
            onChange={(e) => setParecerGeral(e.target.value)}
            required
            placeholder="Resumo anual do desempenho do fornecedor, pontos fortes e recomendação de continuidade contratual..."
            className="w-full bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#9CA3AF] text-xs rounded-md p-3 focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#D0D5DD]">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#374151] bg-[#E5E7EB] hover:bg-[#D1D5DB] rounded-md cursor-pointer transition"
          >
            Cancelar
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {necessitaPlanoAcao && (
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#92400E] hover:bg-[#78350F] rounded-md shadow-sm transition flex items-center justify-center cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Salvar & Preencher 5W2H
              </button>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0066FF] rounded-md shadow-sm transition flex items-center justify-center cursor-pointer"
            >
              <Save className="w-4 h-4 mr-2" />
              Finalizar e Salvar Avaliação
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE ADIÇÃO MANUAL DE PERGUNTA */}
      {showAddManualModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-lg shadow-xl border border-[#CBD5E1] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-3">
              <div className="flex items-center space-x-2">
                <FileQuestion className="w-5 h-5 text-[#123768]" />
                <h3 className="font-bold text-base text-[#172B4D]">Adicionar Pergunta Manual</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddManualModal(false)}
                className="text-[#475569] hover:text-[#172B4D] p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] text-xs rounded-md flex items-start space-x-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Esta pergunta será adicionada <strong>exclusivamente a esta avaliação</strong> e não alterará o modelo padrão da base.</span>
            </div>

            <form onSubmit={handleAddManualQuestion} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#172B4D] mb-1">
                  Texto da Pergunta *
                </label>
                <input
                  type="text"
                  required
                  value={manualQuestionText}
                  onChange={(e) => setManualQuestionText(e.target.value)}
                  placeholder="Ex: O fornecedor cumpriu o plano específico acordado para a unidade..."
                  className="w-full bg-white border border-[#CBD5E1] text-[#172B4D] rounded-md p-2.5 focus:ring-2 focus:ring-[#123768]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#172B4D] mb-1">
                  Categoria da Pergunta *
                </label>
                <select
                  value={manualQuestionCategory}
                  onChange={(e) => setManualQuestionCategory(e.target.value)}
                  className="w-full bg-white border border-[#CBD5E1] text-[#172B4D] rounded-md p-2.5 font-semibold focus:ring-2 focus:ring-[#123768]"
                >
                  <option value="ASPECTOS LEGAIS">Aspectos Legais & Regulatórios</option>
                  <option value="ASPECTOS COMPORTAMENTAIS">Aspectos Comportamentais & Atendimento</option>
                  <option value="PROGRAMA QUALIDADE E SEGURANÇA">Programa Qualidade & Segurança</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#172B4D] mb-1">
                  Justificativa para a Adição Manual * (Obrigatória)
                </label>
                <textarea
                  rows={3}
                  required
                  value={manualQuestionJustification}
                  onChange={(e) => setManualQuestionJustification(e.target.value)}
                  placeholder="Explique o motivo pelo qual esta pergunta adicional foi necessária para esta avaliação específica..."
                  className="w-full bg-white border border-[#CBD5E1] text-[#172B4D] rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] placeholder:text-[#94A3B8]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#CBD5E1]">
                <button
                  type="button"
                  onClick={() => setShowAddManualModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#475569] font-bold rounded-md cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#123768] hover:bg-[#0B2850] text-white font-bold rounded-md shadow-sm cursor-pointer transition flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1.5" /> Adicionar à Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </form>
  );
};
