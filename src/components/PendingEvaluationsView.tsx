import React, { useState, useMemo } from 'react';
import { Evaluation, Sector, Supplier, User } from '../types';
import { 
  Building2, 
  Search, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MinusCircle, 
  UserCheck, 
  Filter, 
  X,
  Play
} from 'lucide-react';

interface PendingEvaluationsViewProps {
  suppliers: Supplier[];
  sectors: Sector[];
  evaluations: Evaluation[];
  users: User[];
  currentUser: User;
  onStartEvaluation: (supplierId: string, year?: number) => void;
}

export type YearCycleStatus = 'CONCLUIDA' | 'PENDENTE_ATUAL' | 'PENDENTE_ANTERIOR' | 'NA';

export interface SupplierPendingRow {
  supplier: Supplier;
  sector?: Sector;
  gestorName: string;
  status2024: YearCycleStatus;
  status2025: YearCycleStatus;
  status2026: YearCycleStatus;
  totalPendencias: number;
  hasPreviousOverdue: boolean;
}

export function calculateSupplierPendingRows(
  suppliers: Supplier[],
  sectors: Sector[],
  evaluations: Evaluation[],
  users: User[],
  currentYear: number = 2026
): SupplierPendingRow[] {
  return suppliers.map(sup => {
    const sector = sectors.find(sec => sec.id === sup.setorResponsavelId);
    
    // Identificar nome do gestor responsável pelo setor
    const gestorUser = users.find(u => u.setorId === sup.setorResponsavelId && u.role === 'GESTOR');
    const gestorName = gestorUser?.nome || sector?.gestorResponsavel || 'Não Atribuído';

    // Determinar início e fim da vigência do contrato
    const vigFim = (sup.vigenciaFim || '').trim().toLowerCase();
    
    let startYear = 2019; // Padrão de início
    if (sup.numeroContrato) {
      const match2 = sup.numeroContrato.match(/(?:16|17|18|19|20|21|22|23|24|25|26)/);
      if (match2) {
        const yr = parseInt(match2[0], 10);
        startYear = yr < 50 ? 2000 + yr : 1900 + yr;
      }
    }
    
    let endYear = 9999;
    if (vigFim && !vigFim.includes('indeterminado') && !vigFim.includes('automatico') && !vigFim.includes('aditivo')) {
      const yearMatch = vigFim.match(/20\d\d/);
      if (yearMatch) {
        endYear = parseInt(yearMatch[0], 10);
      }
    }

    const checkYearStatus = (year: number): YearCycleStatus => {
      // Regra de vigência: contrato não iniciado ou já finalizado antes do ano
      if (startYear > year || endYear < year) {
        return 'NA';
      }
      
      const evalFound = evaluations.find(e => e.fornecedorId === sup.id && e.ano === year);
      if (evalFound) {
        return 'CONCLUIDA';
      }

      if (year < currentYear) {
        return 'PENDENTE_ANTERIOR';
      }
      return 'PENDENTE_ATUAL';
    };

    const status2024 = checkYearStatus(2024);
    const status2025 = checkYearStatus(2025);
    const status2026 = checkYearStatus(2026);

    let totalPendencias = 0;
    if (status2024 === 'PENDENTE_ANTERIOR' || status2024 === 'PENDENTE_ATUAL') totalPendencias++;
    if (status2025 === 'PENDENTE_ANTERIOR' || status2025 === 'PENDENTE_ATUAL') totalPendencias++;
    if (status2026 === 'PENDENTE_ANTERIOR' || status2026 === 'PENDENTE_ATUAL') totalPendencias++;

    const hasPreviousOverdue = status2024 === 'PENDENTE_ANTERIOR' || status2025 === 'PENDENTE_ANTERIOR';

    return {
      supplier: sup,
      sector,
      gestorName,
      status2024,
      status2025,
      status2026,
      totalPendencias,
      hasPreviousOverdue
    };
  });
}

export const PendingEvaluationsView: React.FC<PendingEvaluationsViewProps> = ({
  suppliers,
  sectors,
  evaluations,
  users,
  currentUser,
  onStartEvaluation
}) => {
  const isDiretoria = currentUser.role === 'DIRETORIA';

  // Filtros de Estado
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [selectedGestor, setSelectedGestor] = useState<string>('ALL');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');

  // Calcular todas as linhas de fornecedores e suas pendências
  const allRows = useMemo(() => {
    return calculateSupplierPendingRows(suppliers, sectors, evaluations, users);
  }, [suppliers, sectors, evaluations, users]);

  // Lista única de Gestores para filtro da Diretoria
  const uniqueGestores = useMemo(() => {
    const set = new Set<string>();
    allRows.forEach(r => {
      if (r.gestorName && r.gestorName !== 'Não Atribuído') {
        set.add(r.gestorName);
      }
    });
    return Array.from(set).sort();
  }, [allRows]);

  // Filtragem dos fornecedores visíveis (Respeita escopo do usuário + filtros selecionados)
  const filteredRows = useMemo(() => {
    return allRows.filter(row => {
      // Restrição de Gestor comum (exibe apenas fornecedores do seu setor/responsabilidade por padrão)
      if (!isDiretoria && currentUser.setorId) {
        if (row.supplier.setorResponsavelId !== currentUser.setorId) {
          return false;
        }
      }

      // Filtro de Texto (Nome / Contrato / CNPJ)
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = row.supplier.nomeFantasia.toLowerCase().includes(query) || row.supplier.razaoSocial.toLowerCase().includes(query);
        const matchesContract = (row.supplier.numeroContrato || '').toLowerCase().includes(query);
        const matchesCnpj = row.supplier.cnpj.includes(query);
        if (!matchesName && !matchesContract && !matchesCnpj) return false;
      }

      // Filtro por Setor
      if (selectedSector !== 'ALL' && row.supplier.setorResponsavelId !== selectedSector) {
        return false;
      }

      // Filtro por Gestor (para Diretoria/Admin)
      if (isDiretoria && selectedGestor !== 'ALL' && row.gestorName !== selectedGestor) {
        return false;
      }

      // Filtro por Ano Específico
      if (selectedYearFilter !== 'ALL') {
        const yr = parseInt(selectedYearFilter, 10);
        const statusInYr = yr === 2024 ? row.status2024 : yr === 2025 ? row.status2025 : row.status2026;
        if (selectedStatusFilter === 'CONCLUIDA' && statusInYr !== 'CONCLUIDA') return false;
        if (selectedStatusFilter === 'PENDENTE' && (statusInYr !== 'PENDENTE_ATUAL' && statusInYr !== 'PENDENTE_ANTERIOR')) return false;
        if (selectedStatusFilter === 'ATRASADO' && statusInYr !== 'PENDENTE_ANTERIOR') return false;
        if (selectedStatusFilter === 'NA' && statusInYr !== 'NA') return false;
      } else {
        // Filtro Geral por Status
        if (selectedStatusFilter === 'CONCLUIDA' && row.totalPendencias > 0) return false;
        if (selectedStatusFilter === 'PENDENTE' && row.totalPendencias === 0) return false;
        if (selectedStatusFilter === 'ATRASADO' && !row.hasPreviousOverdue) return false;
      }

      return true;
    });
  }, [allRows, isDiretoria, currentUser, searchTerm, selectedSector, selectedGestor, selectedYearFilter, selectedStatusFilter]);

  // Indicadores Numéricos do Topo (Dinamismo Real)
  const metrics = useMemo(() => {
    const totalSobGestao = filteredRows.length;
    let emDia = 0;
    let comPendencias = 0;
    let pendenciasAnteriores = 0;

    filteredRows.forEach(r => {
      if (r.totalPendencias === 0) {
        emDia++;
      } else {
        comPendencias++;
      }
      if (r.hasPreviousOverdue) {
        pendenciasAnteriores++;
      }
    });

    return { totalSobGestao, emDia, comPendencias, pendenciasAnteriores };
  }, [filteredRows]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSector('ALL');
    setSelectedGestor('ALL');
    setSelectedYearFilter('ALL');
    setSelectedStatusFilter('ALL');
  };

  const renderBadge = (status: YearCycleStatus, year: number, supId: string) => {
    switch (status) {
      case 'CONCLUIDA':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            Concluída
          </span>
        );
      case 'PENDENTE_ANTERIOR':
        return (
          <button
            onClick={() => onStartEvaluation(supId, year)}
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 transition cursor-pointer shadow-sm"
            title={`Clique para regularizar a avaliação pendente de ${year}`}
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-600 animate-pulse" />
            Pendente ({year})
          </button>
        );
      case 'PENDENTE_ATUAL':
        return (
          <button
            onClick={() => onStartEvaluation(supId, year)}
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition cursor-pointer"
            title={`Clique para realizar a avaliação de ${year}`}
          >
            <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" />
            Pendente ({year})
          </button>
        );
      case 'NA':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
            <MinusCircle className="w-3.5 h-3.5 mr-1 text-slate-400" />
            Não Aplicável
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <FileCheck2 className="w-6 h-6 mr-2 text-hospital-600" />
            Matriz de Pendências de Avaliações Anuais
          </h2>
          <p className="text-xs text-slate-500">
            Acompanhamento em tempo real das obrigações anuais por contrato, fornecedor e exercício
          </p>
        </div>
      </div>

      {/* Indicadores numéricos no topo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Fornecedores Sob Gestão</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black mt-2 text-slate-900">{metrics.totalSobGestao}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Sob responsabilidade da visão</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
            <span>Avaliações Em Dia</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black mt-2 text-emerald-700">{metrics.emDia}</div>
          <p className="text-[11px] text-emerald-800 mt-0.5">100% dos ciclos concluídos</p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-amber-950">
            <span>Pendentes (Ciclo Atual)</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black mt-2 text-amber-700">{metrics.comPendencias}</div>
          <p className="text-[11px] text-amber-800 mt-0.5">Requerem preenchimento</p>
        </div>

        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-rose-950">
            <span>Atrasos (Anos Anteriores)</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black mt-2 text-rose-700">{metrics.pendenciasAnteriores}</div>
          <p className="text-[11px] text-rose-800 mt-0.5">Exigem regularização prioritária</p>
        </div>
      </div>

      {/* Painel de Filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Busca por Texto */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por fornecedor ou nº de contrato..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 text-xs font-medium rounded-lg focus:ring-hospital-500 focus:border-hospital-500"
            />
          </div>

          {/* Filtro por Setor */}
          <div className="md:col-span-3">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-lg focus:ring-hospital-500 focus:border-hospital-500"
            >
              <option value="ALL">Todos os setores</option>
              {sectors.map(sec => (
                <option key={sec.id} value={sec.id}>{sec.nome}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Gestor Responsável (Somente para Diretoria / Admin) */}
          {isDiretoria && (
            <div className="md:col-span-3">
              <select
                value={selectedGestor}
                onChange={(e) => setSelectedGestor(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-lg focus:ring-hospital-500 focus:border-hospital-500"
              >
                <option value="ALL">Todos os gestores</option>
                {uniqueGestores.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          )}

          {/* Filtro por Status do Ciclo */}
          <div className={isDiretoria ? "md:col-span-2" : "md:col-span-5"}>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-lg focus:ring-hospital-500 focus:border-hospital-500"
            >
              <option value="ALL">Todos os status</option>
              <option value="CONCLUIDA">✅ Em dia / Concluídas</option>
              <option value="PENDENTE">🟡 Pendente (Geral)</option>
              <option value="ATRASADO">🔴 Pendente (Anos Anteriores)</option>
            </select>
          </div>
        </div>

        {/* Linha auxiliar de resultado do filtro */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center space-x-2 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Exibindo <strong>{filteredRows.length}</strong> fornecedores no matriz</span>
          </div>

          {(searchTerm || selectedSector !== 'ALL' || selectedGestor !== 'ALL' || selectedStatusFilter !== 'ALL') && (
            <button
              onClick={clearFilters}
              className="text-rose-600 hover:text-rose-800 font-bold flex items-center cursor-pointer"
            >
              <X className="w-3.5 h-3.5 mr-0.5" /> Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Matriz / Tabela de Pendências */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                <th className="p-3.5">Fornecedor / Razão Social</th>
                <th className="p-3.5">Contrato</th>
                <th className="p-3.5">Setor</th>
                <th className="p-3.5">Gestor Responsável</th>
                <th className="p-3.5 text-center">Ciclo 2024</th>
                <th className="p-3.5 text-center">Ciclo 2025</th>
                <th className="p-3.5 text-center">Ciclo 2026</th>
                <th className="p-3.5 text-center">Pendências</th>
                <th className="p-3.5 text-right">Ação</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => {
                  const targetYearToEvaluate = 
                    row.status2024 === 'PENDENTE_ANTERIOR' ? 2024 :
                    row.status2025 === 'PENDENTE_ANTERIOR' ? 2025 :
                    row.status2026 === 'PENDENTE_ATUAL' ? 2026 :
                    row.status2025 === 'PENDENTE_ATUAL' ? 2025 : 2026;

                  return (
                    <tr key={row.supplier.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5">
                        <strong className="text-slate-900 text-sm block font-bold">{row.supplier.nomeFantasia}</strong>
                        <span className="text-[11px] text-slate-500 block truncate max-w-[220px]">{row.supplier.razaoSocial}</span>
                      </td>

                      <td className="p-3.5 font-mono text-slate-700 font-bold whitespace-nowrap">
                        {row.supplier.numeroContrato || 'N/A'}
                      </td>

                      <td className="p-3.5 font-semibold text-slate-800 whitespace-nowrap">
                        {row.sector?.nome || 'Sem Setor'}
                      </td>

                      <td className="p-3.5 text-slate-600 font-medium whitespace-nowrap">
                        <div className="flex items-center">
                          <UserCheck className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          <span>{row.gestorName}</span>
                        </div>
                      </td>

                      {/* Status 2024 */}
                      <td className="p-3.5 text-center whitespace-nowrap">
                        {renderBadge(row.status2024, 2024, row.supplier.id)}
                      </td>

                      {/* Status 2025 */}
                      <td className="p-3.5 text-center whitespace-nowrap">
                        {renderBadge(row.status2025, 2025, row.supplier.id)}
                      </td>

                      {/* Status 2026 */}
                      <td className="p-3.5 text-center whitespace-nowrap">
                        {renderBadge(row.status2026, 2026, row.supplier.id)}
                      </td>

                      {/* Total de Pendências */}
                      <td className="p-3.5 text-center whitespace-nowrap">
                        {row.totalPendencias === 0 ? (
                          <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-emerald-100 text-emerald-900">
                            0 (Em Dia)
                          </span>
                        ) : (
                          <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold ${
                            row.hasPreviousOverdue ? 'bg-rose-100 text-rose-900 border border-rose-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}>
                            {row.totalPendencias} {row.totalPendencias === 1 ? 'pendência' : 'pendências'}
                          </span>
                        )}
                      </td>

                      {/* Ação Direta */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        {row.totalPendencias > 0 ? (
                          <button
                            onClick={() => onStartEvaluation(row.supplier.id, targetYearToEvaluate)}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg shadow-sm transition cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 mr-1" /> Avaliar {targetYearToEvaluate}
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-semibold italic">Concluído</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    Nenhuma pendência encontrada para os filtros selecionados.
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
