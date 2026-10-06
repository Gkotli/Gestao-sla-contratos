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
  Play,
  CalendarRange
} from 'lucide-react';
import {
  YearCycleStatus,
  SupplierCycleSummary,
  getCurrentCycleYear,
  getCycleYears,
  getCycleApplicability,
  isPendingStatus,
  summarizeSupplierCycles
} from '../services/evaluationCycles';
import { RegularizacaoAditivoNotice } from './RegularizacaoAditivoNotice';

export type { YearCycleStatus } from '../services/evaluationCycles';

interface PendingEvaluationsViewProps {
  suppliers: Supplier[];
  sectors: Sector[];
  evaluations: Evaluation[];
  users: User[];
  currentUser: User;
  onStartEvaluation: (supplierId: string, year?: number) => void;
}

export interface SupplierPendingRow extends SupplierCycleSummary {
  supplier: Supplier;
  sector?: Sector;
  gestorName: string;
}

export function calculateSupplierPendingRows(
  suppliers: Supplier[],
  sectors: Sector[],
  evaluations: Evaluation[],
  users: User[],
  currentYear: number = getCurrentCycleYear()
): SupplierPendingRow[] {
  return suppliers.map(sup => {
    const sector = sectors.find(sec => sec.id === sup.setorResponsavelId);

    // Identificar nome do gestor responsável pelo setor
    const gestorUser = users.find(u => u.setorId === sup.setorResponsavelId && u.role === 'GESTOR');
    const gestorName = gestorUser?.nome || sector?.gestorResponsavel || 'Não Atribuído';

    return {
      supplier: sup,
      sector,
      gestorName,
      ...summarizeSupplierCycles(sup, evaluations, currentYear)
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
  const currentYear = getCurrentCycleYear();
  const cycleYears = useMemo(() => getCycleYears(currentYear), [currentYear]);

  // Filtros de Estado
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [selectedGestor, setSelectedGestor] = useState<string>('ALL');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');

  // Calcular todas as linhas de fornecedores e suas pendências
  const allRows = useMemo(() => {
    return calculateSupplierPendingRows(suppliers, sectors, evaluations, users, currentYear);
  }, [suppliers, sectors, evaluations, users, currentYear]);

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

      // Filtro de Texto (Nome / Contrato / Serviço / CNPJ)
      if (searchTerm && searchTerm.trim() !== '') {
        const query = searchTerm.trim().toLowerCase();
        const cleanDigits = query.replace(/\D/g, '');

        const matchesName = (row.supplier.nomeFantasia || '').toLowerCase().includes(query) || (row.supplier.razaoSocial || '').toLowerCase().includes(query);
        const matchesContract = (row.supplier.numeroContrato || '').toLowerCase().includes(query);
        const matchesService = (row.supplier.categoriaServico || '').toLowerCase().includes(query);
        const matchesCnpj = (row.supplier.cnpj || '').toLowerCase().includes(query) || (
          cleanDigits.length >= 3 && (row.supplier.cnpj || '').replace(/\D/g, '').includes(cleanDigits)
        );

        if (!matchesName && !matchesContract && !matchesService && !matchesCnpj) return false;
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
        const statusInYr = row.statusByYear[parseInt(selectedYearFilter, 10)];
        if (selectedStatusFilter === 'CONCLUIDA' && statusInYr !== 'CONCLUIDA') return false;
        if (selectedStatusFilter === 'PENDENTE' && !isPendingStatus(statusInYr)) return false;
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

  // Indicadores do topo: só contam ciclos dentro da vigência de cada contrato
  const metrics = useMemo(() => {
    let emDia = 0;
    let comPendencias = 0;
    let pendenciasAnteriores = 0;
    let ciclosObrigatorios = 0;
    let ciclosConcluidos = 0;
    let semDataInicio = 0;

    filteredRows.forEach(r => {
      if (r.totalPendencias === 0) emDia++;
      else comPendencias++;
      if (r.hasPreviousOverdue) pendenciasAnteriores++;
      ciclosObrigatorios += r.ciclosObrigatorios;
      ciclosConcluidos += r.ciclosConcluidos;
      if (r.semDataInicio) semDataInicio++;
    });

    const conformidade = ciclosObrigatorios > 0 ? Math.round((ciclosConcluidos / ciclosObrigatorios) * 100) : 100;

    return {
      totalSobGestao: filteredRows.length,
      emDia,
      comPendencias,
      pendenciasAnteriores,
      ciclosObrigatorios,
      ciclosConcluidos,
      conformidade,
      semDataInicio
    };
  }, [filteredRows]);

  const hasActiveFilters =
    searchTerm || selectedSector !== 'ALL' || selectedGestor !== 'ALL' || selectedYearFilter !== 'ALL' || selectedStatusFilter !== 'ALL';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSector('ALL');
    setSelectedGestor('ALL');
    setSelectedYearFilter('ALL');
    setSelectedStatusFilter('ALL');
  };

  const handleYearFilterChange = (value: string) => {
    setSelectedYearFilter(value);
    // "Não aplicável" só faz sentido com um ano escolhido
    if (value === 'ALL' && selectedStatusFilter === 'NA') setSelectedStatusFilter('ALL');
  };

  const naReason = (sup: Supplier, year: number) =>
    getCycleApplicability(sup, year) === 'ANTES_DO_INICIO'
      ? `Contrato iniciado em ${sup.vigenciaInicio}: sem avaliação obrigatória em ${year}`
      : `Contrato encerrado antes de ${year}`;

  const renderBadge = (status: YearCycleStatus, year: number, sup: Supplier) => {
    const base = 'inline-flex items-center justify-center gap-1 px-2 py-1 rounded text-[11px] leading-tight whitespace-nowrap border';
    switch (status) {
      case 'CONCLUIDA':
        return (
          <span className={`${base} font-bold bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]`}>
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            Concluída
          </span>
        );
      case 'PENDENTE_ANTERIOR':
        return (
          <button
            onClick={() => onStartEvaluation(sup.id, year)}
            className={`${base} font-extrabold bg-[#FEF2F2] hover:bg-rose-100 text-[#B91C1C] border-[#FECACA] transition cursor-pointer shadow-sm`}
            title={`Clique para regularizar a avaliação pendente de ${year}`}
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            Atrasada
          </button>
        );
      case 'PENDENTE_ATUAL':
        return (
          <button
            onClick={() => onStartEvaluation(sup.id, year)}
            className={`${base} font-bold bg-[#FFFBEB] hover:bg-amber-100 text-[#92400E] border-[#FCD34D] transition cursor-pointer`}
            title={`Clique para realizar a avaliação de ${year}`}
          >
            <Clock className="w-3.5 h-3.5 shrink-0" />
            Pendente
          </button>
        );
      case 'NA':
        return (
          <span
            className={`${base} font-semibold bg-slate-100 text-[#475569] border-[#CBD5E1]`}
            title={naReason(sup, year)}
          >
            <MinusCircle className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            Não se aplica
          </span>
        );
    }
  };

  const renderVigencia = (sup: Supplier) => (
    <span className="text-[11px] text-[#475569] leading-snug">
      {sup.vigenciaInicio ? (
        <>Início <strong className="text-[#172B4D]">{sup.vigenciaInicio}</strong></>
      ) : (
        <span className="text-[#92400E] font-bold">Início não informado</span>
      )}
      <span className="text-slate-300 mx-1">·</span>
      Fim <strong className="text-[#172B4D]">{sup.vigenciaFim || '—'}</strong>
      {sup.regularizacaoAditivo && (
        <span className="block mt-1">
          <RegularizacaoAditivoNotice regularizacao={sup.regularizacaoAditivo} compact />
        </span>
      )}
    </span>
  );

  const renderTotal = (row: SupplierPendingRow) =>
    row.totalPendencias === 0 ? (
      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-extrabold bg-[#ECFDF5] text-[#047857] whitespace-nowrap">
        Em dia
      </span>
    ) : (
      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-extrabold whitespace-nowrap border ${
        row.hasPreviousOverdue ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]' : 'bg-[#FFFBEB] text-[#92400E] border-[#FCD34D]'
      }`}>
        {row.totalPendencias} {row.totalPendencias === 1 ? 'pendência' : 'pendências'}
      </span>
    );

  const renderAction = (row: SupplierPendingRow) =>
    row.proximoAnoPendente ? (
      <button
        onClick={() => onStartEvaluation(row.supplier.id, row.proximoAnoPendente)}
        className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow-sm transition cursor-pointer whitespace-nowrap"
      >
        <Play className="w-3.5 h-3.5 mr-1 shrink-0" /> Avaliar {row.proximoAnoPendente}
      </button>
    ) : (
      <span className="text-[11px] text-[#475569] font-semibold italic">Nada pendente</span>
    );

  const selectClass =
    'w-full py-2 px-3 bg-slate-50 border border-[#CBD5E1] text-xs font-bold text-[#172B4D] rounded-md focus:ring-2 focus:ring-[#123768] focus:border-[#123768]';

  return (
    <div className="space-y-6 font-sans">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-xl font-bold text-[#172B4D] flex items-center">
          <FileCheck2 className="w-6 h-6 mr-2 text-[#123768] shrink-0" />
          Matriz de Pendências de Avaliações Anuais
        </h2>
        <p className="text-xs text-[#475569] mt-0.5">
          Obrigações anuais por contrato: cada ciclo só é cobrado a partir do ano de início da vigência do contrato.
        </p>
      </div>

      {/* Indicadores numéricos no topo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white border border-[#CBD5E1] shadow-sm">
          <div className="flex items-start justify-between gap-2 text-xs font-semibold text-[#475569]">
            <span>Fornecedores sob gestão</span>
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
          <div className="text-2xl font-black mt-2 text-[#172B4D]">{metrics.totalSobGestao}</div>
          <p className="text-[11px] text-[#475569] mt-0.5 leading-snug">
            {metrics.ciclosConcluidos} de {metrics.ciclosObrigatorios} ciclos obrigatórios concluídos ({metrics.conformidade}%)
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] shadow-sm">
          <div className="flex items-start justify-between gap-2 text-xs font-bold text-[#047857]">
            <span>Em dia</span>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          </div>
          <div className="text-2xl font-black mt-2 text-[#047857]">{metrics.emDia}</div>
          <p className="text-[11px] text-[#047857] mt-0.5 leading-snug">Todos os ciclos da vigência concluídos</p>
        </div>

        <div className="p-4 rounded-lg bg-[#FFFBEB] border border-[#FCD34D] shadow-sm">
          <div className="flex items-start justify-between gap-2 text-xs font-bold text-[#92400E]">
            <span>Com pendências</span>
            <Clock className="w-4 h-4 shrink-0" />
          </div>
          <div className="text-2xl font-black mt-2 text-[#92400E]">{metrics.comPendencias}</div>
          <p className="text-[11px] text-[#92400E] mt-0.5 leading-snug">Ao menos um ciclo da vigência sem avaliação</p>
        </div>

        <div className="p-4 rounded-lg bg-[#FEF2F2] border border-[#FECACA] shadow-sm">
          <div className="flex items-start justify-between gap-2 text-xs font-bold text-[#B91C1C]">
            <span>Atrasos (anos anteriores)</span>
            <AlertTriangle className="w-4 h-4 shrink-0" />
          </div>
          <div className="text-2xl font-black mt-2 text-[#B91C1C]">{metrics.pendenciasAnteriores}</div>
          <p className="text-[11px] text-[#B91C1C] mt-0.5 leading-snug">Exigem regularização prioritária</p>
        </div>
      </div>

      {metrics.semDataInicio > 0 && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-[#FFFBEB] border border-[#FCD34D] text-xs text-[#92400E]">
          <CalendarRange className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>{metrics.semDataInicio} {metrics.semDataInicio === 1 ? 'contrato está' : 'contratos estão'} sem data de início</strong>{' '}
            no cadastro. Enquanto ela não for informada (Cadastro de Fornecedores), todos os ciclos desde {cycleYears[0]} são cobrados.
          </span>
        </div>
      )}

      {/* Painel de Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-[#CBD5E1] space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Busca por Texto */}
          <div className="sm:col-span-2 lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por fornecedor, contrato, serviço ou CNPJ..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-[#CBD5E1] text-xs font-medium rounded-md focus:ring-2 focus:ring-[#123768] focus:border-[#123768] text-[#172B4D]"
            />
          </div>

          {/* Filtro por Setor */}
          <div className={isDiretoria ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <select value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)} className={selectClass}>
              <option value="ALL">Todos os setores</option>
              {sectors.map(sec => (
                <option key={sec.id} value={sec.id}>{sec.nome}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Gestor Responsável (Somente para Diretoria / Admin) */}
          {isDiretoria && (
            <div className="lg:col-span-2">
              <select value={selectedGestor} onChange={(e) => setSelectedGestor(e.target.value)} className={selectClass}>
                <option value="ALL">Todos os gestores</option>
                {uniqueGestores.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          )}

          {/* Filtro por Ciclo */}
          <div className="lg:col-span-2">
            <select value={selectedYearFilter} onChange={(e) => handleYearFilterChange(e.target.value)} className={selectClass}>
              <option value="ALL">Todos os ciclos</option>
              {[...cycleYears].reverse().map(y => (
                <option key={y} value={y}>Ciclo {y}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Status do Ciclo */}
          <div className={isDiretoria ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <select value={selectedStatusFilter} onChange={(e) => setSelectedStatusFilter(e.target.value)} className={selectClass}>
              <option value="ALL">Todos os status</option>
              <option value="CONCLUIDA">✅ Em dia / Concluídas</option>
              <option value="PENDENTE">🟡 Pendente (geral)</option>
              <option value="ATRASADO">🔴 Atrasada (anos anteriores)</option>
              {selectedYearFilter !== 'ALL' && <option value="NA">⚪ Não se aplica</option>}
            </select>
          </div>
        </div>

        {/* Linha auxiliar de resultado do filtro */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-[#475569]">
          <div className="flex items-center gap-2 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Exibindo <strong>{filteredRows.length}</strong> {filteredRows.length === 1 ? 'fornecedor' : 'fornecedores'} na matriz</span>
          </div>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-[#B91C1C] hover:text-[#991B1B] font-bold flex items-center cursor-pointer">
              <X className="w-3.5 h-3.5 mr-0.5" /> Limpar filtros
            </button>
          )}
        </div>
      </div>

      {filteredRows.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#CBD5E1] p-8 text-center text-xs text-[#475569]">
          Nenhum fornecedor encontrado para os filtros selecionados.
        </div>
      ) : (
        <>
          {/* Tabela (telas médias e grandes): colunas se ajustam ao conteúdo, rolagem horizontal só se faltar espaço */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm border border-[#CBD5E1] overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[880px]">
                <thead>
                  <tr className="bg-slate-50 text-[#172B4D] font-bold text-[11px] border-b border-[#CBD5E1] uppercase tracking-wide">
                    <th className="px-4 py-3 align-bottom">Fornecedor</th>
                    <th className="px-4 py-3 align-bottom">Contrato / Vigência</th>
                    <th className="px-4 py-3 align-bottom">Setor / Gestor</th>
                    {cycleYears.map(y => (
                      <th key={y} className="px-2 py-3 align-bottom text-center whitespace-nowrap">
                        Ciclo {y}
                        {y === currentYear && <span className="block text-[9px] font-semibold text-[#475569] normal-case tracking-normal">atual</span>}
                      </th>
                    ))}
                    <th className="px-4 py-3 align-bottom text-right whitespace-nowrap">Situação / Ação</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredRows.map(row => (
                    <tr key={row.supplier.id} className="hover:bg-slate-50 transition align-top">
                      <td className="px-4 py-3 min-w-[200px] max-w-[300px]">
                        <strong className="text-[#172B4D] text-sm font-bold block break-words leading-snug">{row.supplier.nomeFantasia}</strong>
                        <span className="text-[11px] text-[#475569] block break-words leading-snug mt-0.5">{row.supplier.razaoSocial}</span>
                      </td>

                      <td className="px-4 py-3 min-w-[170px]">
                        <span className="font-mono text-[#172B4D] font-bold block break-all">{row.supplier.numeroContrato || 'N/A'}</span>
                        <div className="mt-0.5">{renderVigencia(row.supplier)}</div>
                      </td>

                      <td className="px-4 py-3 min-w-[150px] max-w-[220px]">
                        <span className="font-semibold text-[#172B4D] block break-words leading-snug">{row.sector?.nome || 'Sem setor'}</span>
                        <span className="flex items-start text-[11px] text-[#475569] mt-0.5 leading-snug">
                          <UserCheck className="w-3.5 h-3.5 mr-1 mt-px text-slate-400 shrink-0" />
                          <span className="break-words">{row.gestorName}</span>
                        </span>
                      </td>

                      {cycleYears.map(y => (
                        <td key={y} className="px-2 py-3 text-center">
                          {renderBadge(row.statusByYear[y], y, row.supplier)}
                        </td>
                      ))}

                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-col items-end gap-1.5">
                          {renderTotal(row)}
                          {renderAction(row)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards (celular) */}
          <div className="md:hidden space-y-3">
            {filteredRows.map(row => (
              <div key={row.supplier.id} className="bg-white rounded-lg shadow-sm border border-[#CBD5E1] p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <strong className="text-[#172B4D] text-sm font-bold block break-words leading-snug">{row.supplier.nomeFantasia}</strong>
                    <span className="text-[11px] text-[#475569] block break-words leading-snug">{row.supplier.razaoSocial}</span>
                  </div>
                  <div className="shrink-0">{renderTotal(row)}</div>
                </div>

                <div className="space-y-1 text-[11px] text-[#475569] pt-2 border-t border-slate-100">
                  <div>
                    Contrato <strong className="font-mono text-[#172B4D] break-all">{row.supplier.numeroContrato || 'N/A'}</strong>
                  </div>
                  <div>{renderVigencia(row.supplier)}</div>
                  <div className="break-words">
                    {row.sector?.nome || 'Sem setor'} <span className="text-slate-300">·</span> {row.gestorName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {cycleYears.map(y => (
                    <div key={y} className="flex flex-col items-start gap-1">
                      <span className="text-[10px] font-bold uppercase text-[#475569]">Ciclo {y}{y === currentYear ? ' (atual)' : ''}</span>
                      {renderBadge(row.statusByYear[y], y, row.supplier)}
                    </div>
                  ))}
                </div>

                {row.proximoAnoPendente && <div className="pt-1">{renderAction(row)}</div>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
