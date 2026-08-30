import React, { useState, useEffect, useMemo } from 'react';
import { Evaluation, Sector, Supplier, User } from '../types';
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
  Layers
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

  // Selected Supplier & Sector
  const selectedSupplier = useMemo(() => {
    return suppliers.find(s => s.id === selectedSupplierId);
  }, [suppliers, selectedSupplierId]);

  const selectedSector = useMemo(() => {
    if (!selectedSupplier) return undefined;
    return sectors.find(sec => sec.id === selectedSupplier.setorResponsavelId);
  }, [sectors, selectedSupplier]);

  // Fonte Única de Verdade (15 Perguntas da Avaliação Anual)
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

  // Answers State: Map of criterion ID -> score (1..5 or 'NA')
  const [respostas, setRespostas] = useState<Record<string, number | 'NA'>>(() => {
    if (initialEvaluation?.respostas) {
      return initialEvaluation.respostas;
    }
    return {};
  });

  // Observations & Feedback
  const [observacoesLegais, setObservacoesLegais] = useState(initialEvaluation?.observacoesLegais || '');
  const [observacoesComportamentais, setObservacoesComportamentais] = useState(initialEvaluation?.observacoesComportamentais || '');
  const [observacoesQualidade, setObservacoesQualidade] = useState(initialEvaluation?.observacoesQualidade || '');
  const [parecerGeral, setParecerGeral] = useState(initialEvaluation?.parecerGeral || '');

  // Manter respostas do fornecedor ou iniciar formulário vazio (sem notas padrão 5)
  useEffect(() => {
    if (initialEvaluation && initialEvaluation.fornecedorId === selectedSupplierId) {
      setRespostas(initialEvaluation.respostas || {});
      return;
    }

    setRespostas({});
  }, [selectedSupplierId, initialEvaluation]);

  // Calculate live block averages
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

  // Média Geral Anual (Média simples das médias dos 3 blocos válidos)
  const mediaGeral = useMemo(() => {
    const validBlocks = [mediaLegais, mediaComportamentais, mediaQualidade].filter(m => m > 0);
    if (validBlocks.length === 0) return 0;
    const avg = validBlocks.reduce((acc, curr) => acc + curr, 0) / validBlocks.length;
    return Number(avg.toFixed(2));
  }, [mediaLegais, mediaComportamentais, mediaQualidade]);

  // Status de Meta (< 4.00 exige Plano de Ação 5W2H)
  const necessitaPlanoAcao = mediaGeral > 0 && mediaGeral < 4.00;
  const statusMeta = mediaGeral >= 4.00 ? 'DENTRO_DA_META' : mediaGeral >= 3.00 ? 'ABAIXO_DA_META' : 'CRITICO';

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
      const formattedMediaGeral = safeFormatScore(mediaGeral);

      const newEval: Evaluation = {
        id: initialEvaluation?.id || `eval_${Date.now()}`,
        fornecedorId: selectedSupplier.id,
        setorId: selectedSupplier.setorResponsavelId,
        ano: selectedYear,
        dataAvaliacao: new Date().toISOString().split('T')[0],
        gestorAvaliador: currentUser?.nome || selectedSector?.gestorResponsavel || 'Gestor Responsável',
        emailAvaliador: currentUser?.email || selectedSector?.emailGestor || 'gestor@vilanovastar.com.br',
        respostas: respostas || {},
        observacoesLegais: observacoesLegais || '',
        observacoesComportamentais: observacoesComportamentais || '',
        observacoesQualidade: observacoesQualidade || '',
        parecerGeral: parecerGeral || `Avaliação Anual ${selectedYear} referente ao contrato ${selectedSupplier.numeroContrato}. Média Geral: ${formattedMediaGeral}.`,
        mediaLegais: safeNumber(mediaLegais),
        mediaComportamentais: safeNumber(mediaComportamentais),
        mediaQualidade: safeNumber(mediaQualidade),
        mediaGeral: safeNumber(mediaGeral),
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

  const archetypeLabelMap: Record<string, string> = {
    'ARQUETIPO_1_EQUIPAMENTO_MEDICO': 'Arquétipo 1: Fabricante / Equipamento Médico Especializado',
    'ARQUETIPO_1B_REAGENTES_LABORATORIO': 'Arquétipo 1B: Reagentes e Insumos de Laboratório',
    'ARQUETIPO_2_MANUTENCAO_PREDIAL': 'Arquétipo 2: Manutenção Predial / Múltiplas Especialidades',
    'ARQUETIPO_3_ESTACIONAMENTO_FROTA': 'Arquétipo 3: Estacionamento, Valet e Frota',
    'ARQUETIPO_4_ELEVADORES': 'Arquétipo 4: Manutenção Especializada de Elevadores',
    'ARQUETIPO_5_GASES_MEDICINAIS': 'Arquétipo 5: Gases Medicinais e Criogenia',
    'ARQUETIPO_6_CLIMATIZACAO_PMOC': 'Arquétipo 6: Climatização e PMOC Hospitalar',
    'ARQUETIPO_7_MAO_DE_OBRA_CLINICA': 'Arquétipo 7: Mão de Obra Clínica / Assistencial (Equipe Multi)',
    'ARQUETIPO_8_VIGILANCIA_SEGURANCA': 'Arquétipo 8: Vigilância e Segurança Patrimonial',
    'ARQUETIPO_9_RESPONSABILIDADE_TECNICA_HEMODIALISE': 'Arquétipo 9: Responsabilidade Técnica / Hemodiálise',
    'ARQUETIPO_10_SERVICO_AGENDADO_SLA': 'Arquétipo 10: Serviços Pontuais Agendados por SLA'
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-hospital-500/20 text-hospital-200 text-xs font-bold px-2.5 py-0.5 rounded border border-hospital-400/30 uppercase">
              Formulário Oficial SLA
            </span>
            <span className="text-slate-400 text-xs font-medium">| Avaliação Anual de Desempenho</span>
          </div>
          <h2 className="text-2xl font-bold mt-1 text-white">
            {initialEvaluation ? 'Editar Avaliação Anual de Contrato' : 'Nova Avaliação Anual de Contrato'}
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl shadow-lg transition"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Avaliação
          </button>
        </div>
      </div>

      {/* Bloco de Seleção de Fornecedor, Setor e Ano */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <h3 className="font-bold text-slate-900 text-sm flex items-center">
          <Building2 className="w-4 h-4 mr-2 text-hospital-600" />
          Dados do Contrato e Fornecedor Avaliado
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

        {/* Card do Fornecedor Selecionado com Indicador de Arquétipo Automático */}
        {selectedSupplier && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <strong className="text-slate-900 text-sm font-bold block">{selectedSupplier.razaoSocial}</strong>
                <p className="text-slate-500">{selectedSupplier.categoriaServico} | CNPJ: {selectedSupplier.cnpj}</p>
              </div>

              {/* Badge da Avaliação Anual */}
              <div className="inline-flex items-center px-3 py-1 bg-teal-900/10 border border-teal-300 text-teal-950 font-bold rounded-lg space-x-1.5">
                <Layers className="w-4 h-4 text-teal-600" />
                <span>Avaliação Anual de Contrato (15 Perguntas)</span>
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

      {/* BLOCO 1: ASPECTOS LEGAIS (Dinâmico pelo Arquétipo) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">1. ASPECTOS LEGAIS & REGULATÓRIOS</h3>
            <p className="text-xs text-slate-500">Conformidade técnica, licenças, normas e obrigações contratuais específicas do arquétipo</p>
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

              {/* Botões de nota 5..1 e NA */}
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
          <label className="block text-xs font-semibold text-slate-700 mb-1">Observações dos Aspectos Legais (opcional)</label>
          <textarea
            rows={2}
            value={observacoesLegais}
            onChange={(e) => setObservacoesLegais(e.target.value)}
            placeholder="Comentários sobre documentação, seguros ou EPIs..."
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-3"
          />
        </div>
      </div>

      {/* BLOCO 2: ASPECTOS COMPORTAMENTAIS */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">2. ASPECTOS COMPORTAMENTAIS</h3>
            <p className="text-xs text-slate-500">Postura, apresentação, adornos e ética dos colaboradores prestadores de serviço</p>
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
            placeholder="Comentários sobre conduta, horários ou atendimento..."
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-3"
          />
        </div>
      </div>

      {/* BLOCO 3: PROGRAMA QUALIDADE E SEGURANÇA */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">3. PROGRAMA QUALIDADE E SEGURANÇA</h3>
            <p className="text-xs text-slate-500">Satisfação do paciente/setor, treinamentos e controle de não conformidades</p>
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

      {/* PARECER GERAL E MÉDIA FINAL ANUAL */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-teal-400 font-bold uppercase block">Resultado do Ciclo Anual {selectedYear}</span>
            <h3 className="text-xl font-bold text-white">Média Geral da Avaliação de Contrato</h3>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Média Final</span>
              <span className={`text-2xl font-black ${mediaGeral >= 4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {mediaGeral.toFixed(2)}
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
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
          >
            Cancelar
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {necessitaPlanoAcao && (
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition flex items-center justify-center"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Salvar & Preencher 5W2H
              </button>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl shadow-lg transition flex items-center justify-center"
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
