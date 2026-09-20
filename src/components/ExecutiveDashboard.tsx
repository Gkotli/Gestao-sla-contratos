import React, { useState, useMemo } from 'react';
import { ActionPlan, Evaluation, Sector, Supplier } from '../types';
import { safeFormatScore, safeNumber } from '../utils/formatters';
import { 
  Building2, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  FileSpreadsheet, 
  Filter, 
  Calendar,
  Layers,
  ArrowUpRight,
  ClipboardList
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  ReferenceLine,
  PieChart,
  Pie
} from 'recharts';

interface ExecutiveDashboardProps {
  evaluations: Evaluation[];
  suppliers: Supplier[];
  sectors: Sector[];
  actionPlans: ActionPlan[];
  onNewEvaluation: () => void;
  onViewEvaluation: (evalId: string) => void;
  onManageActionPlans: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  evaluations,
  suppliers,
  sectors,
  actionPlans,
  onNewEvaluation,
  onViewEvaluation,
  onManageActionPlans
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedSectorId, setSelectedSectorId] = useState<string>('TODOS');

  // Filtrar avaliações pelo ano e setor selecionado
  const filteredEvaluations = useMemo(() => {
    return (evaluations || []).filter(ev => {
      if (!ev) return false;
      const matchYear = ev.ano === selectedYear;
      const matchSector = selectedSectorId === 'TODOS' || ev.setorId === selectedSectorId;
      return matchYear && matchSector;
    });
  }, [evaluations, selectedYear, selectedSectorId]);

  // Indicadores Principais (KPIs)
  const totalEvaluations = filteredEvaluations.length;
  
  const mediaGeralGlobal = useMemo(() => {
    if (totalEvaluations === 0) return 0;
    const sum = filteredEvaluations.reduce((acc, curr) => acc + safeNumber(curr.mediaGeral), 0);
    return Number((sum / totalEvaluations).toFixed(2));
  }, [filteredEvaluations, totalEvaluations]);

  const dentroDaMetaCount = useMemo(() => {
    return filteredEvaluations.filter(ev => ev.statusMeta === 'DENTRO_DA_META').length;
  }, [filteredEvaluations]);

  const abaixoDaMetaCount = useMemo(() => {
    return filteredEvaluations.filter(ev => ev.statusMeta === 'ABAIXO_DA_META' || ev.statusMeta === 'CRITICO').length;
  }, [filteredEvaluations]);

  // Percentual de conformidade
  const taxaAprovacaoPercent = totalEvaluations > 0 
    ? Math.round((dentroDaMetaCount / totalEvaluations) * 100) 
    : 0;

  // Dados do Gráfico de Médias por Setor
  const sectorChartData = useMemo(() => {
    return (sectors || []).map(sec => {
      const evals = filteredEvaluations.filter(e => e.setorId === sec.id);
      if (evals.length === 0) {
        return {
          nome: sec.nome && sec.nome.length > 14 ? `${sec.nome.substring(0, 12)}...` : sec.nome || 'Setor',
          nomeCompleto: sec.nome || 'Setor',
          media: 0,
          total: 0
        };
      }
      const sum = evals.reduce((acc, curr) => acc + safeNumber(curr.mediaGeral), 0);
      const avg = Number((sum / evals.length).toFixed(2));
      return {
        nome: sec.nome && sec.nome.length > 14 ? `${sec.nome.substring(0, 12)}...` : sec.nome || 'Setor',
        nomeCompleto: sec.nome || 'Setor',
        media: avg,
        total: evals.length
      };
    }).filter(d => d.total > 0 || selectedSectorId === 'TODOS');
  }, [sectors, filteredEvaluations, selectedSectorId]);

  // Dados do Gráfico de Pizza por Faixa de Desempenho
  const pieChartData = useMemo(() => {
    const otimo = filteredEvaluations.filter(e => safeNumber(e.mediaGeral) >= 4.5).length;
    const bom = filteredEvaluations.filter(e => safeNumber(e.mediaGeral) >= 4.0 && safeNumber(e.mediaGeral) < 4.5).length;
    const regular = filteredEvaluations.filter(e => safeNumber(e.mediaGeral) >= 3.0 && safeNumber(e.mediaGeral) < 4.0).length;
    const ruim = filteredEvaluations.filter(e => safeNumber(e.mediaGeral) < 3.0).length;

    return [
      { name: 'Ótimo (≥ 4.50)', value: otimo, color: '#047857' },
      { name: 'Bom (4.00 - 4.49)', value: bom, color: '#123768' },
      { name: 'Regular (3.00 - 3.99)', value: regular, color: '#92400E' },
      { name: 'Crítico (< 3.00)', value: ruim, color: '#B91C1C' }
    ].filter(d => d.value > 0);
  }, [filteredEvaluations]);

  // Lista de Fornecedores com Maior Desempenho (Top Performers)
  const topPerformers = useMemo(() => {
    return [...filteredEvaluations]
      .sort((a, b) => safeNumber(b.mediaGeral) - safeNumber(a.mediaGeral))
      .slice(0, 5);
  }, [filteredEvaluations]);

  // Lista de Fornecedores que exigem Plano de Ação (Abaixo da Meta)
  const lowPerformers = useMemo(() => {
    return filteredEvaluations.filter(e => e.necessitaPlanoAcao || safeNumber(e.mediaGeral) < 4.0);
  }, [filteredEvaluations]);

  return (
    <div className="space-y-6 font-sans">
      {/* Cabeçalho do Painel e Barra de Filtros */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-[#CBD5E1]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#123768]/10 text-[#123768] text-[11px] font-bold px-2 py-0.5 rounded border border-[#123768]/20 uppercase tracking-wide">
              Painel Executivo
            </span>
            <span className="text-[#475569] text-xs">| Desempenho de Contratos</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172B4D] tracking-tight mt-1">
            Indicadores de SLA & Nível de Serviço
          </h2>
        </div>

        {/* Filtros de Ano, Setor e Ação */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filtro Ciclo */}
          <div className="relative inline-flex items-center h-9 bg-white border border-[#CBD5E1] rounded-md px-2.5 shadow-sm text-xs focus-within:ring-2 focus-within:ring-[#123768] focus-within:border-[#123768] transition">
            <Calendar className="w-3.5 h-3.5 text-[#475569] mr-1.5 flex-shrink-0" />
            <label htmlFor="filtro-ciclo" className="text-[#475569] font-medium mr-1.5 select-none">Ciclo:</label>
            <select
              id="filtro-ciclo"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent border-0 p-0 pr-1 text-xs font-bold text-[#172B4D] focus:ring-0 focus:outline-none cursor-pointer"
            >
              <option value={2026}>2026</option>
              <option value={2025}>2025</option>
              <option value={2024}>2024</option>
            </select>
          </div>

          {/* Filtro Setor */}
          <div className="relative inline-flex items-center h-9 bg-white border border-[#CBD5E1] rounded-md px-2.5 shadow-sm text-xs focus-within:ring-2 focus-within:ring-[#123768] focus-within:border-[#123768] transition">
            <Filter className="w-3.5 h-3.5 text-[#475569] mr-1.5 flex-shrink-0" />
            <label htmlFor="filtro-setor" className="text-[#475569] font-medium mr-1.5 select-none">Setor:</label>
            <select
              id="filtro-setor"
              value={selectedSectorId}
              onChange={(e) => setSelectedSectorId(e.target.value)}
              className="bg-transparent border-0 p-0 pr-1 text-xs font-bold text-[#172B4D] focus:ring-0 focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              <option value="TODOS">Todos os Setores</option>
              {(sectors || []).map(sec => (
                <option key={sec.id} value={sec.id}>{sec.nome}</option>
              ))}
            </select>
          </div>

          <button
            onClick={onNewEvaluation}
            className="inline-flex items-center h-9 px-4 text-xs font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow-sm transition cursor-pointer"
          >
            + Nova Avaliação
          </button>
        </div>
      </div>

      {/* Cartões dos Indicadores Principais (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Média Geral Hospitalar */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#CBD5E1] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Média Geral de SLA</span>
            <TrendingUp className="w-4 h-4 text-[#123768]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">{safeFormatScore(mediaGeralGlobal)}</span>
            <span className="text-xs text-[#475569] font-semibold">/ 5,00</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-[#475569]">Meta Institucional</span>
            <span className="font-bold text-[#172B4D]">≥ 4,00</span>
          </div>
        </div>

        {/* Taxa de Conformidade */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#CBD5E1] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Taxa de Conformidade</span>
            <CheckCircle2 className="w-4 h-4 text-[#047857]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">{taxaAprovacaoPercent}%</span>
            <span className="text-xs text-[#047857] font-semibold">({dentroDaMetaCount} contratos)</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-[#475569]">Atingiram a Meta</span>
            <span className="font-bold text-[#047857]">{dentroDaMetaCount} de {totalEvaluations}</span>
          </div>
        </div>

        {/* Contratos Abaixo da Meta */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#CBD5E1] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Abaixo da Meta</span>
            <AlertTriangle className={`w-4 h-4 ${abaixoDaMetaCount > 0 ? 'text-[#92400E]' : 'text-[#475569]'}`} />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl sm:text-3xl font-extrabold ${abaixoDaMetaCount > 0 ? 'text-[#92400E]' : 'text-[#172B4D]'}`}>
              {abaixoDaMetaCount}
            </span>
            <span className="text-xs text-[#475569] font-medium">contratos (&lt; 4,00)</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-[#475569]">Exigem Plano de Ação</span>
            <span className={`font-bold ${abaixoDaMetaCount > 0 ? 'text-[#92400E]' : 'text-[#475569]'}`}>
              {abaixoDaMetaCount > 0 ? `${abaixoDaMetaCount} pendente(s)` : 'Nenhum'}
            </span>
          </div>
        </div>

        {/* Total de Avaliações Registradas */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#CBD5E1] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Avaliações Concluídas</span>
            <ClipboardList className="w-4 h-4 text-[#475569]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">{totalEvaluations}</span>
            <span className="text-xs text-[#475569] font-medium">no ciclo {selectedYear}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-[#475569]">Total no Período</span>
            <span className="font-bold text-[#172B4D]">{totalEvaluations} contratos</span>
          </div>
        </div>
      </div>

      {/* Seção dos Gráficos Interativos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Gráfico de Barras - Média por Setor */}
        <div className="lg:col-span-2 bg-white p-5 rounded-lg border border-[#CBD5E1] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-[#172B4D] text-sm">Média de SLA por Setor Hospitalar</h3>
              <p className="text-xs text-[#475569]">Comparativo das médias dos fornecedores vinculados a cada setor ({selectedYear})</p>
            </div>
            <span className="text-xs font-bold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
              Meta: 4,00
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorChartData} margin={{ top: 15, right: 20, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="nome" 
                  tick={{ fontSize: 10, fill: '#475569', fontWeight: 500 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(value: any) => [`${value} / 5,00`, 'Média Anual']}
                  labelFormatter={(label, payload) => payload[0]?.payload?.nomeCompleto || label}
                  contentStyle={{ borderRadius: '6px', fontSize: '12px', border: '1px solid #CBD5E1', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                />
                <ReferenceLine y={4.0} stroke="#047857" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Meta (4,00)', fill: '#047857', fontSize: 10, position: 'top' }} />
                <Bar dataKey="media" radius={[4, 4, 0, 0]}>
                  {sectorChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.media >= 4.0 ? '#123768' : entry.media >= 3.0 ? '#92400E' : '#B91C1C'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Pizza - Distribuição por Faixa de Desempenho */}
        <div className="bg-white p-5 rounded-lg border border-[#CBD5E1] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#172B4D] text-sm border-b border-slate-100 pb-3">
              Distribuição por Faixa de Desempenho
            </h3>
            <p className="text-xs text-[#475569] mt-1">Proporção dos contratos avaliados por faixa de nota</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any) => [`${val} contratos`, 'Quantidade']}
                    contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #CBD5E1' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-xs text-[#475569]">Nenhum dado disponível</div>
            )}
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {pieChartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[#172B4D]">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-[11px] text-[#475569]">{item.name}</span>
                </div>
                <strong className="font-bold text-[11px] text-[#172B4D]">
                  {item.value} ({totalEvaluations > 0 ? Math.round((item.value / totalEvaluations) * 100) : 0}%)
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Listas de Destaques: Maiores Notas vs Abaixo da Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Fornecedores com Maior Nota */}
        <div className="bg-white p-5 rounded-lg border border-[#CBD5E1] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#92400E]" />
              <h3 className="font-bold text-[#172B4D] text-sm">Maiores Notas de SLA (Top 5)</h3>
            </div>
            <span className="text-xs text-[#475569]">Ciclo {selectedYear}</span>
          </div>

          <div className="space-y-2">
            {topPerformers.length > 0 ? (
              topPerformers.map(ev => {
                const sup = (suppliers || []).find(s => s.id === ev.fornecedorId);
                const sec = (sectors || []).find(s => s.id === ev.setorId);

                return (
                  <div 
                    key={ev.id}
                    onClick={() => onViewEvaluation(ev.id)}
                    className="p-3 bg-[#F8FAFC] hover:bg-slate-100/80 rounded-md border border-[#CBD5E1] transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <strong className="text-[#172B4D] text-xs font-bold block group-hover:text-[#123768] transition truncate">
                        {sup?.nomeFantasia || 'Fornecedor'}
                      </strong>
                      <p className="text-[11px] text-[#475569] truncate">
                        {sec?.nome} | Contrato: <span className="font-mono">{sup?.numeroContrato}</span>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2.5 flex-shrink-0">
                      <span className="text-xs font-bold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0] font-mono">
                        {safeFormatScore(ev.mediaGeral)}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#475569] group-hover:text-[#123768] transition" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-xs text-[#475569]">
                Nenhuma avaliação cadastrada no período.
              </div>
            )}
          </div>
        </div>

        {/* Fornecedores que Exigem Plano de Ação */}
        <div className="bg-white p-5 rounded-lg border border-[#CBD5E1] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-[#92400E]" />
              <h3 className="font-bold text-[#172B4D] text-sm">Contratos com Desempenho Abaixo da Meta (&lt; 4,00)</h3>
            </div>
            <button
              onClick={onManageActionPlans}
              className="text-xs font-bold text-[#123768] hover:underline transition cursor-pointer"
            >
              Ver Planos →
            </button>
          </div>

          {lowPerformers.length > 0 ? (
            <div className="space-y-2">
              {lowPerformers.map(ev => {
                const sup = (suppliers || []).find(s => s.id === ev.fornecedorId);
                const sec = (sectors || []).find(s => s.id === ev.setorId);
                const hasPlan = (actionPlans || []).some(ap => ap.evaluationId === ev.id);

                return (
                  <div 
                    key={ev.id}
                    onClick={() => onViewEvaluation(ev.id)}
                    className="p-3 bg-[#FFFBEB]/50 hover:bg-[#FFFBEB] rounded-md border border-[#FCD34D] transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <div className="flex items-center space-x-2">
                        <strong className="text-[#172B4D] text-xs font-bold group-hover:text-[#123768] transition truncate">
                          {sup?.nomeFantasia || 'Fornecedor'}
                        </strong>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          hasPlan ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]' : 'bg-[#FFFBEB] text-[#92400E] border border-[#FCD34D]'
                        }`}>
                          {hasPlan ? 'Plano Ativo' : 'Pendente de Plano'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#475569] truncate">
                        {sec?.nome} | Avaliador: {ev.gestorAvaliador}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2.5 flex-shrink-0">
                      <span className="text-xs font-bold text-[#92400E] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FCD34D] font-mono">
                        {safeFormatScore(ev.mediaGeral)}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#475569] group-hover:text-[#123768] transition" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center bg-[#F8FAFC] rounded-md border border-[#CBD5E1] text-[#475569] text-xs space-y-1">
              <CheckCircle2 className="w-6 h-6 text-[#047857] mx-auto" />
              <strong className="font-bold text-[#172B4D] block">Nenhum Contrato Abaixo da Meta</strong>
              <span className="text-[#475569]">Todos os contratos avaliados atingiram a nota mínima institucional de 4,00.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
