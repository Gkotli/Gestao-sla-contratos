import React, { useState } from 'react';
import { ActionPlan, ActionPlanStatus, Evaluation, Sector, Supplier } from '../types';
import { safeFormatScore } from '../utils/formatters';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  Filter
} from 'lucide-react';

interface ActionPlansProps {
  actionPlans: ActionPlan[];
  evaluations: Evaluation[];
  suppliers: Supplier[];
  sectors: Sector[];
  onSaveActionPlan: (plan: ActionPlan) => void;
  onDeleteActionPlan: (planId: string) => void;
  targetEvaluation?: Evaluation | null;
}

export const ActionPlans: React.FC<ActionPlansProps> = ({
  actionPlans,
  evaluations,
  suppliers,
  sectors,
  onSaveActionPlan,
  onDeleteActionPlan,
  targetEvaluation
}) => {
  const [isModalOpen, setIsModalOpen] = useState(Boolean(targetEvaluation));
  const [editingPlan, setEditingPlan] = useState<ActionPlan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');

  const mediaFormatted = targetEvaluation ? safeFormatScore(targetEvaluation.mediaGeral) : '0.00';

  // Modal Form State
  const [formEvalId, setFormEvalId] = useState<string>(targetEvaluation?.id || '');
  const [formSupplierId, setFormSupplierId] = useState<string>(targetEvaluation?.fornecedorId || suppliers[0]?.id || '');
  const [formSectorId, setFormSectorId] = useState<string>(targetEvaluation?.setorId || sectors[0]?.id || '');
  const [formAno, setFormAno] = useState<number>(targetEvaluation?.ano || 2026);
  
  const [titulo, setTitulo] = useState(
    targetEvaluation ? `Plano de Melhoria - Nota ${mediaFormatted}` : ''
  );
  const [acao5W, setAcao5W] = useState('');
  const [justificativa5W, setJustificativa5W] = useState(
    targetEvaluation ? `Média Anual (${mediaFormatted}) ficou abaixo da meta estipulada de 4,00.` : ''
  );
  const [responsavel5W, setResponsavel5W] = useState('');
  const [onde5W, setOnde5W] = useState('');
  const [prazo5W, setPrazo5W] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [como5W, setComo5W] = useState('');
  const [custo5W, setCusto5W] = useState('');
  const [status, setStatus] = useState<ActionPlanStatus>('EM_ANDAMENTO');
  const [observacoes, setObservacoes] = useState('');

  const openNewPlanModal = (ev?: Evaluation) => {
    setEditingPlan(null);
    if (ev) {
      const scoreStr = safeFormatScore(ev.mediaGeral);
      setFormEvalId(ev.id);
      setFormSupplierId(ev.fornecedorId);
      setFormSectorId(ev.setorId);
      setFormAno(ev.ano);
      setTitulo(`Plano de Ação - Avaliação Anual Nota ${scoreStr}`);
      setJustificativa5W(`Média anual (${scoreStr}) ficou abaixo da meta aceitável de 4,00.`);
    } else {
      setFormEvalId('');
      setFormSupplierId(suppliers[0]?.id || '');
      setFormSectorId(sectors[0]?.id || '');
      setFormAno(2026);
      setTitulo('');
      setJustificativa5W('');
    }
    setAcao5W('');
    setResponsavel5W('');
    setOnde5W('');
    setComo5W('');
    setCusto5W('');
    setStatus('EM_ANDAMENTO');
    setObservacoes('');
    setIsModalOpen(true);
  };

  const openEditModal = (plan: ActionPlan) => {
    setEditingPlan(plan);
    setFormEvalId(plan.evaluationId);
    setFormSupplierId(plan.fornecedorId);
    setFormSectorId(plan.setorId);
    setFormAno(plan.ano);
    setTitulo(plan.titulo);
    setAcao5W(plan.acao5W);
    setJustificativa5W(plan.justificativa5W);
    setResponsavel5W(plan.responsavel5W);
    setOnde5W(plan.onde5W || '');
    setPrazo5W(plan.prazo5W);
    setComo5W(plan.como5W || '');
    setCusto5W(plan.custo5W || '');
    setStatus(plan.status);
    setObservacoes(plan.observacoesAcompanhamento || '');
    setIsModalOpen(true);
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const planData: ActionPlan = {
        id: editingPlan?.id || `plan_${Date.now()}`,
        evaluationId: formEvalId,
        fornecedorId: formSupplierId,
        setorId: formSectorId,
        ano: formAno,
        titulo: titulo || 'Plano de Ação de Melhoria',
        acao5W,
        justificativa5W,
        responsavel5W,
        onde5W,
        prazo5W,
        como5W,
        custo5W,
        status,
        dataCriacao: editingPlan?.dataCriacao || new Date().toISOString().split('T')[0],
        observacoesAcompanhamento: observacoes
      };

      onSaveActionPlan(planData);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Erro ao salvar plano de ação:', err);
      alert('Ocorreu um erro ao salvar o plano de ação. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPlans = actionPlans.filter(p => {
    if (selectedStatusFilter === 'ALL') return true;
    return p.status === selectedStatusFilter;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top bar de Planos de Ação */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gestão de Planos de Ação (CAPA / 5W2H)</h2>
          <p className="text-xs text-slate-500">Planos de melhoria corretiva gerados para fornecedores abaixo da meta de SLA (&lt; 4,00)</p>
        </div>

        <button
          onClick={() => openNewPlanModal()}
          className="inline-flex items-center px-4 py-2.5 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Plano de Ação
        </button>
      </div>

      {/* Filtros de Status */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 flex items-center">
          <Filter className="w-3.5 h-3.5 mr-1" /> Status do Plano:
        </span>

        {['ALL', 'PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO', 'ATRASADO'].map(st => (
          <button
            key={st}
            onClick={() => setSelectedStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              selectedStatusFilter === st
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {st === 'ALL' ? 'Todos os Planos' : st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Grid de Cards de Planos de Ação 5W2H */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlans.length > 0 ? (
          filteredPlans.map(plan => {
            const supplier = suppliers.find(s => s.id === plan.fornecedorId);
            const sector = sectors.find(s => s.id === plan.setorId);
            const planStatus = plan.status || 'EM_ANDAMENTO';

            return (
              <div key={plan.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
                <div>
                  {/* Cabeçalho do Card */}
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-500">{plan.id} — Ciclo Anual {plan.ano}</span>
                      <h3 className="font-bold text-slate-900 text-sm mt-0.5">{plan.titulo}</h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold uppercase ${
                      planStatus === 'CONCLUIDO' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      planStatus === 'EM_ANDAMENTO' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                      planStatus === 'ATRASADO' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {planStatus.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Conteúdo 5W2H */}
                  <div className="p-4 space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div>
                        <span className="block text-[10px] font-bold uppercase text-slate-400">Fornecedor</span>
                        <strong className="text-slate-900">{supplier?.nomeFantasia || 'N/A'}</strong>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase text-slate-400">Setor Hospitalar</span>
                        <strong className="text-slate-900">{sector?.nome || 'N/A'}</strong>
                      </div>
                    </div>

                    <div>
                      <strong className="text-slate-900 block font-semibold">O QUE FAZER (Ação):</strong>
                      <p className="text-slate-700 bg-amber-50/50 border border-amber-100 p-2 rounded mt-0.5">{plan.acao5W}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <strong className="text-slate-900 block font-semibold">QUEM (Responsável):</strong>
                        <p className="text-slate-700 mt-0.5">{plan.responsavel5W}</p>
                      </div>
                      <div>
                        <strong className="text-slate-900 block font-semibold">QUANDO (Prazo):</strong>
                        <p className="text-amber-800 font-bold mt-0.5 flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-amber-600" /> {plan.prazo5W}
                        </p>
                      </div>
                    </div>

                    {plan.justificativa5W && (
                      <div>
                        <strong className="text-slate-900 block font-semibold">POR QUE (Justificativa):</strong>
                        <p className="text-slate-600 mt-0.5">{plan.justificativa5W}</p>
                      </div>
                    )}

                    {plan.observacoesAcompanhamento && (
                      <div className="bg-blue-50 border border-blue-100 p-2.5 rounded text-blue-900">
                        <strong className="block font-bold text-[11px]">Acompanhamento da Gestão:</strong>
                        <p className="mt-0.5">{plan.observacoesAcompanhamento}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ações do Card */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Criado em: {plan.dataCriacao}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(plan)}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition flex items-center cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1" /> Editar
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Deseja excluir este plano de ação?')) {
                          onDeleteActionPlan(plan.id);
                        }
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-rose-600 bg-white border border-rose-200 rounded hover:bg-rose-50 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 p-12 bg-white rounded-xl shadow-sm border border-slate-200 text-center text-slate-500">
            Nenhum plano de ação encontrado com os filtros atuais.
          </div>
        )}
      </div>

      {/* Modal 5W2H para Criar / Editar Plano de Ação */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">
                  {editingPlan ? 'Editar Plano de Ação (5W2H)' : 'Novo Plano de Ação de Melhoria (5W2H)'}
                </h3>
                <p className="text-xs text-slate-300">Definição estruturada de ações para adequação à meta de SLA (≥ 4.00)</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-xl font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitModal} className="p-6 space-y-4 text-xs">
              {/* Fornecedor & Setor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fornecedor *</label>
                  <select
                    value={formSupplierId}
                    onChange={(e) => setFormSupplierId(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-900"
                  >
                    {suppliers.map(s => (
                      <option key={s.id} value={s.id}>{s.nomeFantasia} ({s.numeroContrato})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Setor Hospitalar *</label>
                  <select
                    value={formSectorId}
                    onChange={(e) => setFormSectorId(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-900"
                  >
                    {sectors.map(sec => (
                      <option key={sec.id} value={sec.id}>{sec.nome}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Título do Plano */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Título do Plano de Ação *</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  placeholder="Ex: Treinamento de Reciclagem da Equipe de Higienização"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-900"
                />
              </div>

              {/* 5W2H: O que fazer / Por que fazer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WHAT — O que será feito? *</label>
                  <textarea
                    rows={2}
                    value={acao5W}
                    onChange={(e) => setAcao5W(e.target.value)}
                    required
                    placeholder="Descreva a ação corretiva a ser implantada..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WHY — Por que será feito? (Justificativa)</label>
                  <textarea
                    rows={2}
                    value={justificativa5W}
                    onChange={(e) => setJustificativa5W(e.target.value)}
                    placeholder="Motivo da ação (ex: Nota abaixo da meta no ciclo anual)..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              {/* 5W2H: Quem / Onde / Quando */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WHO — Quem fará? (Responsável) *</label>
                  <input
                    type="text"
                    value={responsavel5W}
                    onChange={(e) => setResponsavel5W(e.target.value)}
                    required
                    placeholder="Nome do responsável..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WHERE — Onde será feito?</label>
                  <input
                    type="text"
                    value={onde5W}
                    onChange={(e) => setOnde5W(e.target.value)}
                    placeholder="Local / Setor / UTI..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WHEN — Prazo de Conclusão *</label>
                  <input
                    type="date"
                    value={prazo5W}
                    onChange={(e) => setPrazo5W(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* 5W2H: Como / Quanto custa / Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">HOW — Como será feito?</label>
                  <input
                    type="text"
                    value={como5W}
                    onChange={(e) => setComo5W(e.target.value)}
                    placeholder="Metodologia / Procedimento..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">HOW MUCH — Quanto custa?</label>
                  <input
                    type="text"
                    value={custo5W}
                    onChange={(e) => setCusto5W(e.target.value)}
                    placeholder="Sem custo / R$..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status de Execução *</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ActionPlanStatus)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  >
                    <option value="PENDENTE">Pendente</option>
                    <option value="EM_ANDAMENTO">Em Andamento</option>
                    <option value="CONCLUIDO">Concluído</option>
                    <option value="ATRASADO">Atrasado</option>
                  </select>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Observações de Acompanhamento da Gestão</label>
                <textarea
                  rows={2}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Anotações de auditorias, reuniões de alinhamento..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-slate-950 font-bold bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg shadow"
                >
                  {isSubmitting ? 'Salvando...' : editingPlan ? 'Salvar Alterações' : 'Criar Plano de Ação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
