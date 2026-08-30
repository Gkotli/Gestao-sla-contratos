import React, { useState, useMemo } from 'react';
import { ActionPlan, Evaluation, Sector, Supplier, User } from '../types';
import { getMetaBadgeDetails } from '../services/evaluationCalculation';
import { safeFormatScore } from '../utils/formatters';
import { 
  Search, 
  Edit3, 
  Trash2, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  PenTool, 
  Printer
} from 'lucide-react';

interface EvaluationListProps {
  evaluations: Evaluation[];
  suppliers: Supplier[];
  sectors: Sector[];
  actionPlans: ActionPlan[];
  currentUser: User | null;
  onNewEvaluation: () => void;
  onEditEvaluation: (evaluation: Evaluation) => void;
  onViewReport: (evalId: string) => void;
  onOpenSignatureModal: (evaluation: Evaluation) => void;
  onOpenActionPlanModal: (evaluation: Evaluation) => void;
  onDeleteEvaluation: (evalId: string) => void;
}

export const EvaluationList: React.FC<EvaluationListProps> = ({
  evaluations,
  suppliers,
  sectors,
  actionPlans,
  currentUser,
  onNewEvaluation,
  onEditEvaluation,
  onViewReport,
  onOpenSignatureModal,
  onOpenActionPlanModal,
  onDeleteEvaluation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAno, setSelectedAno] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const isFornecedor = currentUser?.role === 'FORNECEDOR';

  const filteredEvaluations = useMemo(() => {
    return (evaluations || []).filter(ev => {
      if (!ev) return false;
      const supplier = suppliers?.find(s => s.id === ev.fornecedorId);
      const textMatch = 
        !searchTerm ||
        supplier?.nomeFantasia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier?.razaoSocial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier?.cnpj?.includes(searchTerm) ||
        ev.gestorAvaliador?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchAno = selectedAno === 'ALL' || ev.ano?.toString() === selectedAno;
      const matchSector = selectedSector === 'ALL' || ev.setorId === selectedSector;
      const matchStatus = selectedStatus === 'ALL' || ev.statusMeta === selectedStatus;

      return textMatch && matchAno && matchSector && matchStatus;
    });
  }, [evaluations, suppliers, searchTerm, selectedAno, selectedSector, selectedStatus]);

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Botão Nova Avaliação */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Histórico de Avaliações Anuais de Contratos</h2>
          <p className="text-xs text-slate-500">
            {isFornecedor ? 'Avaliações do seu contrato no ciclo hospitalar' : 'Acompanhamento consolidado de todos os fornecedores no ciclo anual'}
          </p>
        </div>

        {/* Botão de Nova Avaliação exibido APENAS para Gestores e Diretoria (Oculto para Fornecedor) */}
        {!isFornecedor && (
          <button
            onClick={onNewEvaluation}
            className="inline-flex items-center px-4 py-2.5 text-sm font-bold text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg shadow transition self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Avaliação Anual
          </button>
        )}
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Busca por texto */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por fornecedor, CNPJ ou gestor..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 text-xs font-medium rounded-lg focus:ring-hospital-500 focus:border-hospital-500"
            />
          </div>

          {/* Ano */}
          <div>
            <select
              value={selectedAno}
              onChange={(e) => setSelectedAno(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-xs font-medium rounded-lg p-2 focus:ring-hospital-500 focus:border-hospital-500"
            >
              <option value="ALL">Ano: Todos</option>
              <option value="2026">Ano: 2026</option>
              <option value="2025">Ano: 2025</option>
              <option value="2024">Ano: 2024</option>
            </select>
          </div>

          {/* Faixa de Meta */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-xs font-medium rounded-lg p-2 focus:ring-hospital-500 focus:border-hospital-500"
            >
              <option value="ALL">Status: Todos</option>
              <option value="DENTRO_DA_META">Verde (≥ 4.0)</option>
              <option value="ABAIXO_DA_META">Amarelo (3.0 - 3.99)</option>
              <option value="CRITICO">Vermelho (&lt; 3.0)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabela de Avaliações */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Fornecedor / CNPJ</th>
                <th className="py-3.5 px-4">Setor Responsável</th>
                <th className="py-3.5 px-4">Ano</th>
                <th className="py-3.5 px-4 text-center">Legais</th>
                <th className="py-3.5 px-4 text-center">Comport.</th>
                <th className="py-3.5 px-4 text-center">Qualidade</th>
                <th className="py-3.5 px-4 text-center">Média Geral</th>
                <th className="py-3.5 px-4">Status Meta</th>
                <th className="py-3.5 px-4">Ciência Fornecedor</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredEvaluations.length > 0 ? (
                filteredEvaluations.map((ev) => {
                  const supplier = suppliers?.find(s => s.id === ev.fornecedorId);
                  const sector = sectors?.find(s => s.id === ev.setorId);
                  const mediaGeralVal = typeof ev.mediaGeral === 'number' ? ev.mediaGeral : parseFloat(String(ev.mediaGeral || 0));
                  const metaDetails = getMetaBadgeDetails(ev.statusMeta || mediaGeralVal, mediaGeralVal);

                  const mediaLegaisFormatted = safeFormatScore(ev.mediaLegais);
                  const mediaComportamentaisFormatted = safeFormatScore(ev.mediaComportamentais);
                  const mediaQualidadeFormatted = safeFormatScore(ev.mediaQualidade);
                  const mediaGeralFormatted = safeFormatScore(ev.mediaGeral);

                  return (
                    <tr key={ev.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4">
                        <strong className="text-slate-900 block font-bold text-sm">
                          {supplier?.nomeFantasia || 'Fornecedor Cadastrado'}
                        </strong>
                        <span className="text-[11px] text-slate-500 block">
                          {supplier?.razaoSocial} {supplier?.cnpj ? `| ${supplier.cnpj}` : ''}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-700">
                        {sector?.nome || 'Setor Hospitalar'}
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-900">
                        {ev.ano}
                      </td>

                      <td className="py-3 px-4 text-center font-semibold text-slate-700">
                        {mediaLegaisFormatted}
                      </td>

                      <td className="py-3 px-4 text-center font-semibold text-slate-700">
                        {mediaComportamentaisFormatted}
                      </td>

                      <td className="py-3 px-4 text-center font-semibold text-slate-700">
                        {mediaQualidadeFormatted}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="text-sm font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                          {mediaGeralFormatted}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${metaDetails?.bgClass || 'bg-slate-100'} ${metaDetails?.textClass || 'text-slate-800'} border ${metaDetails?.borderClass || 'border-slate-300'}`}>
                          {metaDetails?.label || 'Avaliado'} ({mediaGeralFormatted})
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        {ev.statusAssinatura === 'ASSINADO_CIENTE' ? (
                          <span className="inline-flex items-center text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Assinado / Ciente
                          </span>
                        ) : ev.statusAssinatura === 'ENVIADO_FORNECEDOR' ? (
                          <span className="inline-flex items-center text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                            <PenTool className="w-3 h-3 mr-1 text-amber-600" /> Aguardando Aceite
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px]">
                            Pendente Envio
                          </span>
                        )}
                      </td>

                      {/* Ações */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {/* Visualizar / PDF */}
                          <button
                            onClick={() => onViewReport(ev.id)}
                            className="p-1.5 text-slate-600 hover:text-hospital-600 hover:bg-hospital-50 rounded transition cursor-pointer"
                            title="Gerar Laudo PDF / Imprimir"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          {/* Assinatura / Ciência */}
                          <button
                            onClick={() => onOpenSignatureModal(ev)}
                            className="p-1.5 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded transition cursor-pointer"
                            title="Registrar Assinatura / Ciência do Fornecedor"
                          >
                            <PenTool className="w-4 h-4" />
                          </button>

                          {/* Plano de Ação se nota < 4.0 */}
                          {!isFornecedor && mediaGeralVal < 4.0 && (
                            <button
                              onClick={() => onOpenActionPlanModal(ev)}
                              className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition cursor-pointer"
                              title="Configurar Plano de Ação de Melhoria"
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Editar (Apenas para Gestor/Diretoria) */}
                          {!isFornecedor && (
                            <button
                              onClick={() => onEditEvaluation(ev)}
                              className="p-1.5 text-slate-600 hover:text-hospital-600 hover:bg-hospital-50 rounded transition cursor-pointer"
                              title="Editar Avaliação"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Excluir (Apenas para Gestor/Diretoria) */}
                          {!isFornecedor && (
                            <button
                              onClick={() => {
                                if (confirm('Deseja realmente remover esta avaliação anual?')) {
                                  onDeleteEvaluation(ev.id);
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded transition cursor-pointer"
                              title="Excluir Avaliação"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-500">
                    Nenhuma avaliação encontrada com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
