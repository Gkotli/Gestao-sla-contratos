import React, { useState, useEffect, useMemo } from 'react';
import { Evaluation, EvaluationType, ExceptionItem, ScoreValue, Sector, Supplier, User } from '../types';
import { EVALUATION_QUESTIONS } from '../services/questions';
import { safeFormatScore, safeNumber } from '../utils/formatters';
import { 
  Building2, 
  Calendar, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Save, 
  X,
  FileSpreadsheet,
  Layers,
  Clock,
  Plus,
  Trash2
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

  // Selected Supplier & Sector
  const selectedSupplier = useMemo(() => {
    return suppliers.find(s => s.id === selectedSupplierId);
  }, [suppliers, selectedSupplierId]);

  const selectedSector = useMemo(() => {
    if (!selectedSupplier) return undefined;
    return sectors.find(sec => sec.id === selectedSupplier.setorResponsavelId);
  }, [sectors, selectedSupplier]);

  // Fonte Única de Verdade (15 Perguntas Oficiais do Questionário Padrão)
  const legalCriteria = useMemo(() => {
    return EVALUATION_QUESTIONS.filter(q => q.category === 'LEGAIS').map(q => ({
      id: q.id,
      pergunta: q.text,
      bloco: 'LEGAL' as const
    }));
  }, []);

  const behavioralCriteria = useMemo(() => {
    return EVALUATION_QUESTIONS.filter(q => q.category === 'COMPORTAMENTAIS').map(q => ({
      id: q.id,
      pergunta: q.text,
      bloco: 'COMPORTAMENTAL' as const
    }));
  }, []);

  const qualityCriteria = useMemo(() => {
    return EVALUATION_QUESTIONS.filter(q => q.category === 'QUALIDADE').map(q => ({
      id: q.id,
      pergunta: q.text,
      bloco: 'QUALIDADE' as const
    }));
  }, []);

  // Answers State para Modo Padrão: Map de criterio -> nota
  const [respostas, setRespostas] = useState<Record<string, number | 'NA'>>(() => {
    if (initialEvaluation?.respostas) {
      return initialEvaluation.respostas;
    }
    return {};
  });

  // Observações & Parecer
  const [observacoesLegais, setObservacoesLegais] = useState(initialEvaluation?.observacoesLegais || '');
  const [observacoesComportamentais, setObservacoesComportamentais] = useState(initialEvaluation?.observacoesComportamentais || '');
  const [observacoesQualidade, setObservacoesQualidade] = useState(initialEvaluation?.observacoesQualidade || '');
  const [parecerGeral, setParecerGeral] = useState(initialEvaluation?.parecerGeral || '');

  // Manter respostas ou resetar conforme fornecedor
  useEffect(() => {
    if (initialEvaluation && initialEvaluation.fornecedorId === selectedSupplierId) {
      setRespostas(initialEvaluation.respostas || {});
      if (initialEvaluation.tipoAvaliacao) setTipoAvaliacao(initialEvaluation.tipoAvaliacao);
      if (initialEvaluation.justificativaExcecao) setJustificativaExcecao(initialEvaluation.justificativaExcecao);
      if (initialEvaluation.itensExcecao) setItensExcecao(initialEvaluation.itensExcecao);
      return;
    }

    setRespostas({});
  }, [selectedSupplierId, initialEvaluation]);

  // Manipulação de Itens na Exceção
  const addExceptionItem = () => {
    setItensExcecao(prev => [
      ...prev,
      {
        id: `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
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

  // Cálculo das Médias no Modo Padrão
  const calculateBlockAverage = (criteriaList: { id: string }[]): number => {
    let sum = 0;
    let count = 0;

    criteriaList.forEach(c => {
      const val = respostas[c.id];
      if (typeof val === 'number' && !isNaN(val)) {
        sum += val;
        count++;
      }
    });

    if (count === 0) return 0;
    return Number((sum / count).toFixed(2));
  };

  const mediaLegais = calculateBlockAverage(legalCriteria);
  const mediaComportamentais = calculateBlockAverage(behavioralCriteria);
  const mediaQualidade = calculateBlockAverage(qualityCriteria);

  const mediaGeralPadrao = useMemo(() => {
    const validBlocks = [mediaLegais, mediaComportamentais, mediaQualidade].filter(m => m > 0);
    if (validBlocks.length === 0) return 0;
    const avg = validBlocks.reduce((acc, curr) => acc + curr, 0) / validBlocks.length;
    return Number(avg.toFixed(2));
  }, [mediaLegais, mediaComportamentais, mediaQualidade]);

  // Cálculo das Médias no Modo Exceção (Apenas notas válidas numéricas)
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

  const handleScoreChange = (criterionId: string, score: number | 'NA') => {
    setRespostas(prev => ({
      ...prev,
      [criterionId]: score
    }));
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
        e => e.fornecedorId === selectedSupplier.id && e.ano === selectedYear
      );
      if (isDuplicate) {
        alert(`⚠️ ATENÇÃO: Já existe uma Avaliação Anual concluída para o fornecedor "${selectedSupplier.nomeFantasia}" no exercício de ${selectedYear}.\n\nCaso deseje alterar ou revisar as notas, consulte e edite o registro existente no menu "Avaliações & Histórico".`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const formattedMediaGeral = safeFormatScore(activeMediaGeral);

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
        respostas: tipoAvaliacao === 'EXCECAO' ? {} : (respostas || {}),
        observacoesLegais: observacoesLegais || '',
        observacoesComportamentais: observacoesComportamentais || '',
        observacoesQualidade: observacoesQualidade || '',
        parecerGeral: parecerGeral || `Avaliação Anual ${selectedYear} (${tipoAvaliacao}) referente ao contrato ${selectedSupplier.numeroContrato}. Média Geral: ${formattedMediaGeral}.`,
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase bg-hospital-600 text-white">
              {tipoAvaliacao === 'EXCECAO' ? 'AVALIAÇÃO POR EXCEÇÃO' : 'QUESTIONÁRIO PADRÃO'}
            </span>
            <span className="text-slate-400 text-xs">Ano {selectedYear}</span>
          </div>
          <h2 className="text-xl font-bold mt-1 text-white">Preenchimento da Avaliação Anual de Desempenho</h2>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl shadow-lg transition cursor-pointer"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Avaliação
          </button>
        </div>
      </div>

      {/* Bloco de Seleção de Fornecedor, Setor, Ano e MODALIDADE (PADRÃO vs EXCEÇÃO) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <h3 className="font-bold text-slate-900 text-sm flex items-center">
          <Building2 className="w-4 h-4 mr-2 text-hospital-600" />
          Dados do Contrato e Modalidade de Avaliação
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Selecione o Fornecedor / Empresa *</label>
            <select
              value={selectedSupplierId}
              onChange={(e) => setSelectedSupplierId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-semibold rounded-xl p-3 focus:ring-2 focus:ring-hospital-500"
            >
              {suppliers.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.nomeFantasia} ({sup.numeroContrato})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Setor Hospitalar Responsável</label>
            <input
              type="text"
              readOnly
              value={selectedSector?.nome || 'Setor Responsável'}
              className="w-full bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Ano do Ciclo de Avaliação *</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-bold rounded-xl p-3 focus:ring-2 focus:ring-hospital-500"
            >
              <option value={2026}>Ano 2026 (Ciclo Atual)</option>
              <option value={2025}>Ano 2025</option>
              <option value={2024}>Ano 2024</option>
            </select>
          </div>
        </div>

        {/* SELETOR DE MODO: PADRÃO vs EXCEÇÃO */}
        <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-xs text-teal-300 font-bold uppercase block">Modalidade de Avaliação</span>
              <h4 className="text-sm font-bold text-white">Escolha o Tipo de Questionário</h4>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setTipoAvaliacao('PADRAO')}
                className={`px-3 py-2 rounded-md text-xs font-bold transition cursor-pointer ${
                  tipoAvaliacao === 'PADRAO'
                    ? 'bg-hospital-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📋 PADRÃO (15 Perguntas Oficiais)
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
                className={`px-3 py-2 rounded-md text-xs font-bold transition cursor-pointer ${
                  tipoAvaliacao === 'EXCECAO'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚠️ EXCEÇÃO (Questionário Personalizado)
              </button>
            </div>
          </div>

          {/* PAINEL DE JUSTIFICATIVA OBRIGATÓRIA DA EXCEÇÃO */}
          {tipoAvaliacao === 'EXCECAO' && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="p-3 bg-purple-950/80 border border-purple-700 text-purple-200 text-xs rounded-xl flex items-start space-x-2.5">
                <AlertTriangle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-white text-sm">Modo de Avaliação por Exceção Ativado:</strong>
                  <span>Esta avaliação utilizará um questionário excepcional definido especificamente para este fornecedor. As 15 perguntas oficiais do hospital permanecem intactas para os demais fornecedores.</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">
                  Justificativa para utilização de avaliação por exceção * (Obrigatório)
                </label>
                <textarea
                  rows={2}
                  value={justificativaExcecao}
                  onChange={(e) => setJustificativaExcecao(e.target.value)}
                  required={tipoAvaliacao === 'EXCECAO'}
                  placeholder="Ex: As perguntas padrão não se aplicam integralmente ao escopo e natureza dos serviços deste fornecedor específico..."
                  className="w-full bg-slate-950 border border-purple-700/80 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* Card do Fornecedor Selecionado */}
        {selectedSupplier && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <strong className="text-slate-900 text-sm font-bold block">{selectedSupplier.razaoSocial}</strong>
                <p className="text-slate-500">{selectedSupplier.categoriaServico} | CNPJ: {selectedSupplier.cnpj}</p>
              </div>

              <div className={`inline-flex items-center px-3 py-1 font-bold rounded-lg space-x-1.5 ${
                tipoAvaliacao === 'EXCECAO'
                  ? 'bg-purple-100 border border-purple-300 text-purple-950'
                  : 'bg-teal-900/10 border border-teal-300 text-teal-950'
              }`}>
                <Layers className={`w-4 h-4 ${tipoAvaliacao === 'EXCECAO' ? 'text-purple-700' : 'text-teal-600'}`} />
                <span>
                  {tipoAvaliacao === 'EXCECAO' 
                    ? `Avaliação por Exceção (${itensExcecao.length} Itens Personalizados)`
                    : 'Avaliação Anual de Contrato (15 Perguntas)'
                  }
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
              <div>Contrato: <strong className="text-slate-800">{selectedSupplier.numeroContrato}</strong></div>
              <div>Vigência: <strong className="text-slate-800">{selectedSupplier.vigenciaFim}</strong></div>
              <div>Avaliador: <strong className="text-slate-800">{currentUser?.nome || selectedSector?.gestorResponsavel}</strong></div>
              <div>E-mail: <strong className="text-slate-800">{currentUser?.email || selectedSector?.emailGestor}</strong></div>
            </div>

            {/* Histórico dos Ciclos Anuais */}
            <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="text-slate-600 font-bold flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> Histórico dos ciclos:
              </span>
              <div className="flex items-center space-x-2">
                {[2024, 2025, 2026].map(yr => {
                  const evFound = allEvaluations.find(e => e.fornecedorId === selectedSupplier.id && e.ano === yr);
                  return (
                    <span key={yr} className={`inline-flex items-center px-2 py-0.5 rounded font-bold ${
                      evFound 
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                        : yr < 2026 
                        ? 'bg-rose-100 text-rose-900 border border-rose-300' 
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}>
                      {yr} {evFound ? '✅ Concluída' : yr < 2026 ? '🔴 Pendente' : '🟡 Pendente'}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RENDERIZAÇÃO DO FORMULÁRIO DE EXCEÇÃO VS PADRÃO */}
      {tipoAvaliacao === 'EXCECAO' ? (
        /* --- CONSTRUTOR DINÂMICO DA AVALIAÇÃO POR EXCEÇÃO --- */
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-purple-100 pb-4">
            <div>
              <span className="text-xs text-purple-600 font-bold uppercase block">Questionário de Exceção</span>
              <h3 className="text-base font-bold text-slate-900">
                Itens Específicos Avaliados ({itensExcecao.length} {itensExcecao.length === 1 ? 'item' : 'itens'})
              </h3>
            </div>

            <button
              type="button"
              onClick={addExceptionItem}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow transition inline-flex items-center cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Adicionar Item de Exceção
            </button>
          </div>

          <div className="space-y-4">
            {itensExcecao.map((item, index) => (
              <div key={item.id} className="p-4 bg-purple-50/40 border border-purple-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-xs text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded">
                    ITEM DE EXCEÇÃO #{index + 1}
                  </span>

                  {itensExcecao.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExceptionItem(item.id)}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Remover Item
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-8">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      O que será avaliado neste fornecedor? (Texto livre) *
                    </label>
                    <input
                      type="text"
                      required
                      value={item.pergunta}
                      onChange={(e) => updateExceptionItem(item.id, 'pergunta', e.target.value)}
                      placeholder="Ex: Cumprimento do prazo acordado para atendimento técnico e operacional..."
                      className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="md:col-span-4">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Grupo / Categoria *</label>
                    <select
                      value={item.grupo}
                      onChange={(e) => updateExceptionItem(item.id, 'grupo', e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5 font-semibold"
                    >
                      <option value="Qualidade">Qualidade & Satisfação</option>
                      <option value="Aspectos Comportamentais">Aspectos Comportamentais</option>
                      <option value="Aspectos Legais & Regulatórios">Aspectos Legais & Regulatórios</option>
                      <option value="Outro">Outro (Geral)</option>
                    </select>
                  </div>
                </div>

                {/* Seleção de Nota */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-purple-200/60 text-xs">
                  <span className="font-bold text-slate-800">Nota Atribuída a este Item:</span>
                  <div className="flex items-center space-x-1">
                    {[5, 4, 3, 2, 1].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => updateExceptionItem(item.id, 'nota', val as ScoreValue)}
                        className={`w-8 h-8 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                          item.nota === val
                            ? val >= 4 ? 'bg-emerald-600 text-white shadow' : val === 3 ? 'bg-amber-500 text-white shadow' : 'bg-rose-600 text-white shadow'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => updateExceptionItem(item.id, 'nota', 'NA')}
                      className={`px-2.5 h-8 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                        item.nota === 'NA'
                          ? 'bg-slate-800 text-white shadow'
                          : 'bg-white border border-slate-300 text-slate-500 hover:bg-slate-100'
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
              className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-300 font-bold text-xs rounded-xl shadow-sm transition inline-flex items-center cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Adicionar Outro Item de Exceção
            </button>
          </div>
        </div>
      ) : (
        /* --- FORMULÁRIO DAS 15 PERGUNTAS OFICIAIS PADRÃO --- */
        <>
          {/* Escala de Pontuação explicativa */}
          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs space-y-1">
            <strong className="text-teal-300 font-bold block">Escala de Avaliação (1 a 5 e NA):</strong>
            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <span><strong className="text-emerald-400">5</strong> = Ótimo / Sempre / Sim</span>
              <span><strong className="text-teal-400">4</strong> = Bom</span>
              <span><strong className="text-amber-400">3</strong> = Regular / Às vezes</span>
              <span><strong className="text-orange-400">2</strong> = Ruim</span>
              <span><strong className="text-rose-400">1</strong> = Péssimo / Nunca / Não</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-400"><strong>NA</strong> = Não se aplica (Excluído da média)</span>
            </div>
          </div>

          {/* BLOCO 1: ASPECTOS LEGAIS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">Bloco 1</span>
                <h3 className="text-base font-bold text-slate-900">Aspectos Legais & Regulatórios</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Média do Bloco</span>
                <span className={`text-base font-extrabold ${mediaLegais >= 4 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {mediaLegais.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {legalCriteria.map((c, index) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="text-xs text-slate-800 font-medium leading-relaxed">
                    <strong className="text-slate-400 mr-2">{index + 1}.</strong> {c.pergunta}
                  </span>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {[5, 4, 3, 2, 1].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleScoreChange(c.id, val)}
                        className={`w-8 h-8 rounded-lg text-xs font-extrabold transition ${
                          respostas[c.id] === val
                            ? val >= 4 ? 'bg-emerald-600 text-white shadow' : val === 3 ? 'bg-amber-500 text-white shadow' : 'bg-rose-600 text-white shadow'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleScoreChange(c.id, 'NA')}
                      className={`px-2.5 h-8 rounded-lg text-[11px] font-bold transition ${
                        respostas[c.id] === 'NA'
                          ? 'bg-slate-800 text-white shadow'
                          : 'bg-white border border-slate-300 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      NA
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Observações do Bloco Legal (opcional)</label>
              <textarea
                rows={2}
                value={observacoesLegais}
                onChange={(e) => setObservacoesLegais(e.target.value)}
                placeholder="Comentários sobre documentação, licenças ou exigências regulatórias..."
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-3"
              />
            </div>
          </div>

          {/* BLOCO 2: ASPECTOS COMPORTAMENTAIS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">Bloco 2</span>
                <h3 className="text-base font-bold text-slate-900">Aspectos Comportamentais & Atendimento</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Média do Bloco</span>
                <span className={`text-base font-extrabold ${mediaComportamentais >= 4 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {mediaComportamentais.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {behavioralCriteria.map((c, index) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="text-xs text-slate-800 font-medium leading-relaxed">
                    <strong className="text-slate-400 mr-2">{index + 1}.</strong> {c.pergunta}
                  </span>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {[5, 4, 3, 2, 1].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleScoreChange(c.id, val)}
                        className={`w-8 h-8 rounded-lg text-xs font-extrabold transition ${
                          respostas[c.id] === val
                            ? val >= 4 ? 'bg-emerald-600 text-white shadow' : val === 3 ? 'bg-amber-500 text-white shadow' : 'bg-rose-600 text-white shadow'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleScoreChange(c.id, 'NA')}
                      className={`px-2.5 h-8 rounded-lg text-[11px] font-bold transition ${
                        respostas[c.id] === 'NA'
                          ? 'bg-slate-800 text-white shadow'
                          : 'bg-white border border-slate-300 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      NA
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Observações Comportamentais (opcional)</label>
              <textarea
                rows={2}
                value={observacoesComportamentais}
                onChange={(e) => setObservacoesComportamentais(e.target.value)}
                placeholder="Comentários sobre conduta, relacionamento ou posture da equipe..."
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-3"
              />
            </div>
          </div>

          {/* BLOCO 3: QUALIDADE */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">Bloco 3</span>
                <h3 className="text-base font-bold text-slate-900">Qualidade & Satisfação do Serviço</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Média do Bloco</span>
                <span className={`text-base font-extrabold ${mediaQualidade >= 4 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {mediaQualidade.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {qualityCriteria.map((c, index) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="text-xs text-slate-800 font-medium leading-relaxed">
                    <strong className="text-slate-400 mr-2">{index + 1}.</strong> {c.pergunta}
                  </span>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {[5, 4, 3, 2, 1].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleScoreChange(c.id, val)}
                        className={`w-8 h-8 rounded-lg text-xs font-extrabold transition ${
                          respostas[c.id] === val
                            ? val >= 4 ? 'bg-emerald-600 text-white shadow' : val === 3 ? 'bg-amber-500 text-white shadow' : 'bg-rose-600 text-white shadow'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleScoreChange(c.id, 'NA')}
                      className={`px-2.5 h-8 rounded-lg text-[11px] font-bold transition ${
                        respostas[c.id] === 'NA'
                          ? 'bg-slate-800 text-white shadow'
                          : 'bg-white border border-slate-300 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      NA
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Observações do Programa de Qualidade (opcional)</label>
              <textarea
                rows={2}
                value={observacoesQualidade}
                onChange={(e) => setObservacoesQualidade(e.target.value)}
                placeholder="Comentários sobre treinamentos, indicadores ou satisfação..."
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-3"
              />
            </div>
          </div>
        </>
      )}

      {/* PARECER GERAL E MÉDIA FINAL ANUAL */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-teal-400 font-bold uppercase block">
              Resultado do Ciclo Anual {selectedYear} ({tipoAvaliacao === 'EXCECAO' ? 'Modo Exceção' : 'Modo Padrão'})
            </span>
            <h3 className="text-xl font-bold text-white">Média Geral da Avaliação de Contrato</h3>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Média Final</span>
              <span className={`text-2xl font-black ${activeMediaGeral >= 4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {activeMediaGeral.toFixed(2)}
              </span>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-lg uppercase ${
              statusMeta === 'DENTRO_DA_META' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-amber-950 text-amber-300 border border-amber-700'
            }`}>
              {statusMeta === 'DENTRO_DA_META' ? 'Dentro da Meta (≥ 4,00)' : 'Abaixo da Meta (< 4,00)'}
            </span>
          </div>
        </div>

        {necessitaPlanoAcao && (
          <div className="p-4 bg-amber-950/80 border border-amber-700 text-amber-200 text-xs rounded-xl flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block text-white text-sm">Geração Automática de Plano de Ação (5W2H) Obrigatória:</strong>
              <span>A Média Geral ficou abaixo da meta mínima aceitável (4.00). Ao salvar a avaliação, o sistema direcionará você para o preenchimento do Plano de Ação 5W2H.</span>
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Parecer Geral e Conclusão do Gestor do Contrato *
          </label>
          <textarea
            rows={3}
            value={parecerGeral}
            onChange={(e) => setParecerGeral(e.target.value)}
            required
            placeholder="Resumo anual do desempenho do fornecedor, pontos fortes e recomendação de continuidade contratual..."
            className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
          >
            Cancelar
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {necessitaPlanoAcao && (
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition flex items-center justify-center cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Salvar & Preencher 5W2H
              </button>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl shadow-lg transition flex items-center justify-center cursor-pointer"
            >
              <Save className="w-4 h-4 mr-2" />
              Finalizar e Salvar Avaliação
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
