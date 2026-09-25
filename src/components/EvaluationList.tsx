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
  Printer,
  FileSpreadsheet
} from 'lucide-react';
import { exportEvaluationsListToExcel } from '../services/exportService';

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

  const [exporting, setExporting] = useState(false);

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      await exportEvaluationsListToExcel(filteredEvaluations, suppliers, sectors, actionPlans);
    } catch (err) {
      console.error('Erro ao exportar avaliações:', err);
      alert('Não foi possível gerar o arquivo Excel. Tente novamente.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Botão Nova Avaliação */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#172B4D]">Histórico de Avaliações Anuais de Contratos</h2>
          <p className="text-xs text-[#475569]">
            {isFornecedor ? 'Avaliações do seu contrato no ciclo hospitalar' : 'Acompanhamento consolidado de todos os fornecedores no ciclo anual'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportExcel}
            disabled={exporting || filteredEvaluations.length === 0}
            title="Exporta as avaliações exibidas (com os filtros atuais) para Excel"
            className="inline-flex items-center px-4 py-2.5 text-sm font-bold text-[#123768] bg-white hover:bg-slate-50 border border-[#CBD5E1] rounded-md shadow-sm transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            {exporting ? 'Gerando…' : `Exportar Excel (${filteredEvaluations.length})`}
          </button>

          {/* Botão de Nova Avaliação exibido APENAS para Gestores e Diretoria (Oculto para Fornecedor) */}
          {!isFornecedor && (
            <button
              onClick={onNewEvaluation}
              className="inline-flex items-center px-4 py-2.5 text-sm font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow transition cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Avaliação Anual
            </button>
          )}
        </div>
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="bg-white p-3.5 rounded-lg shadow-sm border border-[#CBD5E1] space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Busca por texto */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por fornecedor, CNPJ ou gestor..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs font-medium rounded-md focus:bg-white focus:ring-2 focus:ring-[#123768] focus:border-[#123768] transition"
            />
          </div>

          {/* Ano */}
          <div>
            <select
              value={selectedAno}
              onChange={(e) => setSelectedAno(e.target.value)}
              className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs font-medium rounded-md p-1.5 focus:bg-white focus:ring-2 focus:ring-[#123768] focus:border-[#123768] transition cursor-pointer"
            >
              <option value="ALL">Ciclo: Todos</option>
              <option value="2026">Ano 2026</option>
              <option value="2025">Ano 2025</option>
              <option value="2024">Ano 2024</option>
            </select>
          </div>

          {/* Faixa de Meta */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs font-medium rounded-md p-1.5 focus:bg-white focus:ring-2 focus:ring-[#123768] focus:border-[#123768] transition cursor-pointer"
            >
              <option value="ALL">Status: Todos</option>
              <option value="DENTRO_DA_META">Conforme (≥ 4,00)</option>
              <option value="ABAIXO_DA_META">Abaixo da Meta (3,00 - 3,99)</option>
              <option value="CRITICO">Crítico (&lt; 3,00)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabela de Avaliações */}
      <div className="bg-white rounded-lg shadow-sm border border-[#CBD5E1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 text-[11px] font-bold uppercase tracking-wider border-b border-[#CBD5E1]">
                <th className="py-3 px-4">Fornecedor / Razão Social</th>
                <th className="py-3 px-4">Setor Responsável</th>
                <th className="py-3 px-4 text-center">Ciclo</th>
                <th className="py-3 px-4 text-center">Legais</th>
                <th className="py-3 px-4 text-center">Comport.</th>
                <th className="py-3 px-4 text-center">Qualidade</th>
                <th className="py-3 px-4 text-center">Média Geral</th>
                <th className="py-3 px-4 text-center">Classificação</th>
                <th className="py-3 px-4 text-center">Ciência / Aceite</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CBD5E1] text-xs">
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
                    <tr key={ev.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-2.5 px-4">
                        <div className="flex items-center space-x-2">
                          <strong className="text-[#172B4D] font-bold text-xs">
                            {supplier?.nomeFantasia || 'Fornecedor'}
                          </strong>
                          {ev.tipoAvaliacao === 'EXCECAO' ? (
                            <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                              Exceção
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-[#CBD5E1] uppercase">
                              Padrão
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#475569] block mt-0.5 font-mono">
                          {supplier?.razaoSocial} {supplier?.cnpj ? `| CNPJ: ${supplier.cnpj}` : ''}
                        </span>
                      </td>

                      <td className="py-2.5 px-4 font-medium text-slate-700">
                        {sector?.nome || 'Setor Hospitalar'}
                      </td>

                      <td className="py-2.5 px-4 font-bold text-[#172B4D] text-center font-mono">
                        {ev.ano}
                      </td>

                      <td className="py-2.5 px-4 text-center font-medium text-[#475569] font-mono">
                        {mediaLegaisFormatted}
                      </td>

                      <td className="py-2.5 px-4 text-center font-medium text-[#475569] font-mono">
                        {mediaComportamentaisFormatted}
                      </td>

                      <td className="py-2.5 px-4 text-center font-medium text-[#475569] font-mono">
                        {mediaQualidadeFormatted}
                      </td>

                      <td className="py-2.5 px-4 text-center">
                        <span className="text-xs font-bold text-[#172B4D] bg-slate-100 px-2 py-0.5 rounded border border-[#CBD5E1] font-mono">
                          {mediaGeralFormatted}
                        </span>
                      </td>

                      <td className="py-2.5 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${metaDetails?.bgClass || 'bg-slate-100'} ${metaDetails?.textClass || 'text-slate-800'} border ${metaDetails?.borderClass || 'border-[#CBD5E1]'}`}>
                          {metaDetails?.label || 'Avaliado'}
                        </span>
                      </td>

                      <td className="py-2.5 px-4 text-center">
                        {ev.statusAssinatura === 'ASSINADO_CIENTE' ? (
                          <span className="inline-flex items-center text-[#047857] bg-[#ECFDF5] border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                            <CheckCircle2 className="w-3 h-3 mr-1 text-[#047857]" /> Ciente
                          </span>
                        ) : ev.statusAssinatura === 'ENVIADO_FORNECEDOR' ? (
                          <span className="inline-flex items-center text-[#92400E] bg-[#FFFBEB] border border-[#FCD34D] px-2 py-0.5 rounded text-[11px] font-semibold">
                            <PenTool className="w-3 h-3 mr-1 text-[#92400E]" /> Aguardando
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[#475569] bg-slate-100 border border-[#CBD5E1] px-2 py-0.5 rounded text-[11px]">
                            Não Enviado
                          </span>
                        )}
                      </td>

                      {/* Ações */}
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {/* Visualizar / PDF */}
                          <button
                            onClick={() => onViewReport(ev.id)}
                            className="p-1.5 text-slate-600 hover:text-[#123768] hover:bg-slate-100 rounded-md transition cursor-pointer"
                            title="Visualizar Laudo e Imprimir"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          {/* Assinatura / Ciência */}
                          <button
                            onClick={() => onOpenSignatureModal(ev)}
                            className="p-1.5 text-slate-600 hover:text-[#047857] hover:bg-emerald-50 rounded-md transition cursor-pointer"
                            title="Registrar Ciência do Fornecedor"
                          >
                            <PenTool className="w-4 h-4" />
                          </button>

                          {/* Plano de Ação se nota < 4.0 */}
                          {!isFornecedor && mediaGeralVal < 4.0 && (
                            <button
                              onClick={() => onOpenActionPlanModal(ev)}
                              className="p-1.5 text-[#92400E] hover:bg-amber-50 rounded-md transition cursor-pointer"
                              title="Configurar Plano de Ação"
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Editar (Apenas para Gestor/Diretoria) */}
                          {!isFornecedor && (
                            <button
                              onClick={() => onEditEvaluation(ev)}
                              className="p-1.5 text-slate-600 hover:text-[#123768] hover:bg-slate-100 rounded-md transition cursor-pointer"
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
                              className="p-1.5 text-[#B91C1C] hover:bg-rose-50 rounded-md transition cursor-pointer"
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
                  <td colSpan={10} className="py-12 text-center text-slate-500">
                    <div className="max-w-xs mx-auto space-y-2">
                      <Search className="w-8 h-8 text-slate-300 mx-auto" />
                      <strong className="text-sm font-bold text-slate-700 block">Nenhuma avaliação encontrada</strong>
                      <p className="text-xs text-slate-400">Verifique os termos da busca ou altere os filtros de ano e status acima.</p>
                    </div>
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
