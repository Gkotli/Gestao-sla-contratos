import React, { useState, useEffect, useMemo } from 'react';
import { Evaluation, EvaluationAnswers, ScoreValue, Sector, Supplier, User } from '../types';
import { EVALUATION_QUESTIONS } from '../services/questions';
import { calculateAverages, getMetaBadgeDetails } from '../services/evaluationCalculation';
import { 
  AlertTriangle, 
  Save, 
  ArrowLeft, 
  HelpCircle, 
  FilePlus, 
  Calculator,
  Building2
} from 'lucide-react';

interface EvaluationFormProps {
  suppliers: Supplier[];
  sectors: Sector[];
  currentUser: User | null;
  initialEvaluation?: Evaluation | null;
  preselectedSupplierId?: string;
  onSave: (evaluation: Evaluation, openActionPlanModal?: boolean) => void;
  onCancel: () => void;
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({
  suppliers,
  sectors,
  currentUser,
  initialEvaluation,
  preselectedSupplierId,
  onSave,
  onCancel
}) => {
  // Form State
  const [fornecedorId, setFornecedorId] = useState<string>(
    initialEvaluation?.fornecedorId || preselectedSupplierId || (suppliers[0]?.id || '')
  );
  const [setorId, setSetorId] = useState<string>(
    initialEvaluation?.setorId || (suppliers.find(s => s.id === (preselectedSupplierId || suppliers[0]?.id))?.setorResponsavelId || sectors[0]?.id || '')
  );
  const [ano, setAno] = useState<number>(initialEvaluation?.ano || 2026);
  const [gestorAvaliador, setGestorAvaliador] = useState<string>(
    initialEvaluation?.gestorAvaliador || currentUser?.nome || 'Gestor da Diretoria Operacional'
  );

  const [respostas, setRespostas] = useState<EvaluationAnswers>(() => {
    if (initialEvaluation?.respostas) {
      return initialEvaluation.respostas;
    }
    // Default all questions to score 5
    const initial: EvaluationAnswers = {};
    EVALUATION_QUESTIONS.forEach(q => {
      initial[q.id] = 5;
    });
    return initial;
  });

  const [observacoesLegais, setObservacoesLegais] = useState<string>(initialEvaluation?.observacoesLegais || '');
  const [observacoesComportamentais, setObservacoesComportamentais] = useState<string>(initialEvaluation?.observacoesComportamentais || '');
  const [observacoesQualidade, setObservacoesQualidade] = useState<string>(initialEvaluation?.observacoesQualidade || '');
  const [parecerGeral, setParecerGeral] = useState<string>(initialEvaluation?.parecerGeral || '');

  // Auto-update Sector when Supplier changes
  useEffect(() => {
    const sup = suppliers.find(s => s.id === fornecedorId);
    if (sup && sup.setorResponsavelId) {
      setSetorId(sup.setorResponsavelId);
    }
  }, [fornecedorId, suppliers]);

  // Live Averages Calculation
  const calcResults = useMemo(() => {
    return calculateAverages(respostas);
  }, [respostas]);

  const badgeDetails = getMetaBadgeDetails(calcResults.statusMeta, calcResults.mediaGeral);

  // Score option button handler
  const handleScoreSelect = (questionId: string, score: ScoreValue) => {
    setRespostas(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent, createActionPlan: boolean = false) => {
    e.preventDefault();

    const evaluationData: Evaluation = {
      id: initialEvaluation?.id || `eval_${Date.now()}`,
      fornecedorId,
      setorId,
      ano,
      dataAvaliacao: initialEvaluation?.dataAvaliacao || new Date().toISOString().split('T')[0],
      gestorAvaliador,
      emailAvaliador: initialEvaluation?.emailAvaliador || currentUser?.email,
      respostas,
      observacoesLegais,
      observacoesComportamentais,
      observacoesQualidade,
      parecerGeral,
      mediaLegais: calcResults.mediaLegais,
      mediaComportamentais: calcResults.mediaComportamentais,
      mediaQualidade: calcResults.mediaQualidade,
      mediaGeral: calcResults.mediaGeral,
      statusMeta: calcResults.statusMeta,
      necessitaPlanoAcao: calcResults.necessitaPlanoAcao,
      statusAssinatura: initialEvaluation?.statusAssinatura || 'PENDENTE_ENVIO',
      dataCiencia: initialEvaluation?.dataCiencia,
      nomeSignatario: initialEvaluation?.nomeSignatario,
      cargoSignatario: initialEvaluation?.cargoSignatario,
      parecerFornecedor: initialEvaluation?.parecerFornecedor,
      assinaturaBase64: initialEvaluation?.assinaturaBase64
    };

    onSave(evaluationData, createActionPlan);
  };

  const selectedSupplier = suppliers.find(s => s.id === fornecedorId);
  const selectedSectorObj = sectors.find(s => s.id === setorId);

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8 pb-12">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </button>

        <h2 className="text-xl font-bold text-slate-900">
          {initialEvaluation ? 'Editar Avaliação Anual' : 'Nova Avaliação Anual de Desempenho'}
        </h2>
      </div>

      {/* Card 1: Identificação do Contrato */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-hospital-600" />
          <h3 className="font-bold text-slate-800 text-base">Identificação da Avaliação Anual e Contrato</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Fornecedor */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Fornecedor / Prestador de Serviço *
            </label>
            <select
              value={fornecedorId}
              onChange={(e) => setFornecedorId(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg p-2.5 focus:ring-hospital-500 focus:border-hospital-500 font-medium"
            >
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>
                  {s.nomeFantasia} ({s.razaoSocial})
                </option>
              ))}
            </select>
            {selectedSupplier && (
              <p className="text-xs text-slate-500 mt-1">CNPJ: {selectedSupplier.cnpj} | Contrato: {selectedSupplier.numeroContrato}</p>
            )}
          </div>

          {/* Setor Responsável */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Setor Responsável no Hospital *
            </label>
            <select
              value={setorId}
              onChange={(e) => setSetorId(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg p-2.5 focus:ring-hospital-500 focus:border-hospital-500 font-medium"
            >
              {sectors.map(sec => (
                <option key={sec.id} value={sec.id}>{sec.nome}</option>
              ))}
            </select>
            {selectedSectorObj && (
              <p className="text-xs text-slate-500 mt-1">Gestor do Setor: {selectedSectorObj.gestorResponsavel}</p>
            )}
          </div>

          {/* Ano */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ano do Ciclo de Avaliação *
            </label>
            <select
              value={ano}
              onChange={(e) => setAno(Number(e.target.value))}
              required
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg p-2.5 focus:ring-hospital-500 focus:border-hospital-500 font-bold text-hospital-700"
            >
              <option value={2026}>2026 (Ciclo Anual)</option>
              <option value={2025}>2025 (Ciclo Anual)</option>
              <option value={2024}>2024 (Ciclo Anual)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Nome do Gestor Avaliador</label>
          <input
            type="text"
            value={gestorAvaliador}
            onChange={(e) => setGestorAvaliador(e.target.value)}
            required
            placeholder="Ex: Dra. Patricia Lima / Enf. Roberto Santos"
            className="w-full md:w-1/2 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg p-2.5 focus:ring-hospital-500 focus:border-hospital-500"
          />
        </div>
      </div>

      {/* Painel Flutuante / Fixo de Médias em Tempo Real */}
      <div className={`p-5 rounded-xl border shadow-md transition-all ${
        calcResults.mediaGeral >= 4.0 
          ? 'bg-emerald-50 border-emerald-300' 
          : calcResults.mediaGeral >= 3.0 
          ? 'bg-amber-50 border-amber-300' 
          : 'bg-rose-50 border-rose-300'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-slate-800" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Resumo das Médias em Tempo Real</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="text-xs text-slate-700">
                Aspectos Legais: <strong className="text-slate-900">{calcResults.mediaLegais.toFixed(2)}</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-700">
                Aspectos Comportamentais: <strong className="text-slate-900">{calcResults.mediaComportamentais.toFixed(2)}</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-700">
                Qualidade & Segurança: <strong className="text-slate-900">{calcResults.mediaQualidade.toFixed(2)}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-200">
            <div className="text-right">
              <span className="block text-xs font-medium text-slate-600">MÉDIA GERAL</span>
              <span className={`text-3xl font-extrabold ${badgeDetails.textColor}`}>
                {calcResults.mediaGeral.toFixed(2)}
              </span>
            </div>
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-extrabold ${badgeDetails.colorClass}`}>
              {badgeDetails.label}
            </div>
          </div>
        </div>

        {/* Gatilho Automático: Alerta de Plano de Ação se nota < 4.0 */}
        {calcResults.necessitaPlanoAcao && (
          <div className="mt-4 p-4 bg-rose-100 border border-rose-300 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0" />
              <div>
                <h4 className="font-extrabold text-rose-900 text-sm">PLANO DE AÇÃO NECESSÁRIO (Média &lt; 4,00)</h4>
                <p className="text-xs text-rose-800">
                  A média geral atingida ({calcResults.mediaGeral.toFixed(2)}) ficou abaixo da meta aceitável (4,00). É obrigatória a abertura de plano de ação de melhoria.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition whitespace-nowrap self-end md:self-center"
            >
              <FilePlus className="w-4 h-4 mr-1.5" />
              Salvar e Configurar Plano de Ação
            </button>
          </div>
        )}
      </div>

      {/* --- GRUPO 1: ASPECTOS LEGAIS --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden space-y-4">
        <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">1. ASPECTOS LEGAIS</h3>
            <p className="text-xs text-slate-300">Regulamentações, certificações, habilitação profissional, EPIs e regimento interno</p>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase text-slate-400 block">Média do Bloco</span>
            <span className="text-xl font-extrabold text-teal-400">{calcResults.mediaLegais.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-6 divide-y divide-slate-100">
          {EVALUATION_QUESTIONS.filter(q => q.category === 'LEGAIS').map((q, index) => (
            <QuestionRow
              key={q.id}
              questionNumber={index + 1}
              question={q}
              currentValue={respostas[q.id]}
              onSelect={(val) => handleScoreSelect(q.id, val)}
            />
          ))}

          {/* Campo de Observações do Bloco Legais */}
          <div className="pt-4 mt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observações / Justificativas dos Aspectos Legais
            </label>
            <textarea
              rows={2}
              value={observacoesLegais}
              onChange={(e) => setObservacoesLegais(e.target.value)}
              placeholder="Descreva detalhes, apontamentos de auditoria ou ressalvas dos aspectos legais..."
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg p-2.5 focus:ring-hospital-500 focus:border-hospital-500"
            />
          </div>
        </div>
      </div>

      {/* --- GRUPO 2: ASPECTOS COMPORTAMENTAIS --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden space-y-4">
        <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">2. ASPECTOS COMPORTAMENTAIS</h3>
            <p className="text-xs text-slate-300">Ética, urbanidade, sigilo/LGPD, pontualidade e resolução de ocorrências</p>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase text-slate-400 block">Média do Bloco</span>
            <span className="text-xl font-extrabold text-teal-400">{calcResults.mediaComportamentais.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-6 divide-y divide-slate-100">
          {EVALUATION_QUESTIONS.filter(q => q.category === 'COMPORTAMENTAIS').map((q, index) => (
            <QuestionRow
              key={q.id}
              questionNumber={index + 1}
              question={q}
              currentValue={respostas[q.id]}
              onSelect={(val) => handleScoreSelect(q.id, val)}
            />
          ))}

          {/* Campo de Observações do Bloco Comportamentais */}
          <div className="pt-4 mt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observações / Justificativas dos Aspectos Comportamentais
            </label>
            <textarea
              rows={2}
              value={observacoesComportamentais}
              onChange={(e) => setObservacoesComportamentais(e.target.value)}
              placeholder="Descreva observações de conduta, comunicação da liderança ou postura da equipe..."
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg p-2.5 focus:ring-hospital-500 focus:border-hospital-500"
            />
          </div>
        </div>
      </div>

      {/* --- GRUPO 3: PROGRAMA QUALIDADE E SEGURANÇA --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden space-y-4">
        <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">3. PROGRAMA QUALIDADE E SEGURANÇA</h3>
            <p className="text-xs text-slate-300">Acreditação (ONA/JCI), biossegurança, calibrações, eventos adversos e SLAs</p>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase text-slate-400 block">Média do Bloco</span>
            <span className="text-xl font-extrabold text-teal-400">{calcResults.mediaQualidade.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-6 divide-y divide-slate-100">
          {EVALUATION_QUESTIONS.filter(q => q.category === 'QUALIDADE').map((q, index) => (
            <QuestionRow
              key={q.id}
              questionNumber={index + 1}
              question={q}
              currentValue={respostas[q.id]}
              onSelect={(val) => handleScoreSelect(q.id, val)}
            />
          ))}

          {/* Campo de Observações do Bloco Qualidade */}
          <div className="pt-4 mt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observações / Justificativas do Programa Qualidade e Segurança
            </label>
            <textarea
              rows={2}
              value={observacoesQualidade}
              onChange={(e) => setObservacoesQualidade(e.target.value)}
              placeholder="Descreva apontamentos de segurança do paciente, relatórios técnicos ou cumprimento de metas..."
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg p-2.5 focus:ring-hospital-500 focus:border-hospital-500"
            />
          </div>
        </div>
      </div>

      {/* Card de Parecer Geral Final */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          Parecer Geral Conclusivo da Gestão / Diretoria Operacional
        </label>
        <textarea
          rows={3}
          value={parecerGeral}
          onChange={(e) => setParecerGeral(e.target.value)}
          placeholder="Síntese conclusiva da avaliação anual do prestador de serviço..."
          className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-lg p-3 focus:ring-hospital-500 focus:border-hospital-500"
        />
      </div>

      {/* Botões de Ação do Form */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="inline-flex items-center px-6 py-2.5 text-sm font-bold text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg shadow transition"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Avaliação Anual
        </button>
      </div>
    </form>
  );
};

// Componente para a linha de cada Pergunta com Botões Clicáveis
interface QuestionRowProps {
  questionNumber: number;
  question: any;
  currentValue: ScoreValue;
  onSelect: (val: ScoreValue) => void;
}

const QuestionRow: React.FC<QuestionRowProps> = ({
  questionNumber,
  question,
  currentValue,
  onSelect
}) => {
  const options: { val: ScoreValue; label: string; activeClass: string }[] = [
    { val: 5, label: '5 - Ótimo', activeClass: 'bg-emerald-600 text-white border-emerald-600 font-bold ring-2 ring-emerald-300' },
    { val: 4, label: '4 - Bom', activeClass: 'bg-teal-600 text-white border-teal-600 font-bold ring-2 ring-teal-300' },
    { val: 3, label: '3 - Regular', activeClass: 'bg-amber-500 text-slate-950 border-amber-500 font-bold ring-2 ring-amber-300' },
    { val: 2, label: '2 - Ruim', activeClass: 'bg-orange-600 text-white border-orange-600 font-bold ring-2 ring-orange-300' },
    { val: 1, label: '1 - Péssimo', activeClass: 'bg-rose-600 text-white border-rose-600 font-bold ring-2 ring-rose-300' },
    { val: 'NA', label: 'NA', activeClass: 'bg-slate-700 text-white border-slate-700 font-bold ring-2 ring-slate-400' },
  ];

  return (
    <div className="py-4 space-y-3">
      <div className="flex items-start space-x-3">
        <span className="bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 rounded-md mt-0.5 border border-slate-200">
          Item {questionNumber}
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">{question.text}</p>
          {question.helpText && (
            <p className="text-xs text-slate-500 mt-0.5 flex items-center">
              <HelpCircle className="w-3 h-3 mr-1 text-slate-400 inline" /> {question.helpText}
            </p>
          )}
        </div>
      </div>

      {/* Opções Clicáveis [5] [4] [3] [2] [1] [NA] */}
      <div className="flex flex-wrap items-center gap-2 pl-0 sm:pl-10">
        {options.map((opt) => {
          const isSelected = currentValue === opt.val;
          return (
            <button
              key={opt.val.toString()}
              type="button"
              onClick={() => onSelect(opt.val)}
              className={`px-3.5 py-2 text-xs rounded-lg border transition-all duration-150 shadow-sm font-medium ${
                isSelected
                  ? opt.activeClass
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
