import React, { useState, useMemo } from 'react';
import { ActionPlan, Evaluation, Sector, Supplier } from '../types';
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
    return evaluations.filter(ev => {
      const matchYear = ev.ano === selectedYear;
      const matchSector = selectedSectorId === 'TODOS' || ev.setorId === selectedSectorId;
      return matchYear && matchSector;
    });
  }, [evaluations, selectedYear, selectedSectorId]);

  // Indicadores Principais (KPIs)
  const totalEvaluations = filteredEvaluations.length;
  
  const mediaGeralGlobal = useMemo(() => {
    if (totalEvaluations === 0) return 0;
    const sum = filteredEvaluations.reduce((acc, curr) => acc + curr.mediaGeral, 0);
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
    return sectors.map(sec => {
      const evals = filteredEvaluations.filter(e => e.setorId === sec.id);
      if (evals.length === 0) {
        return {
          nome: sec.nome.length > 14 ? `${sec.nome.substring(0, 12)}...` : sec.nome,
          nomeCompleto: sec.nome,
          media: 0,
          total: 0
        };
      }
      const sum = evals.reduce((acc, curr) => acc + curr.mediaGeral, 0);
      const avg = Number((sum / evals.length).toFixed(2));
      return {
        nome: sec.nome.length > 14 ? `${sec.nome.substring(0, 12)}...` : sec.nome,
        nomeCompleto: sec.nome,
        media: avg,
        total: evals.length
      };
    }).filter(d => d.total > 0 || selectedSectorId === 'TODOS');
  }, [sectors, filteredEvaluations, selectedSectorId]);

  // Dados do Gráfico de Pizza por Faixa de Desempenho
  const pieChartData = useMemo(() => {
    const otimo = filteredEvaluations.filter(e => e.mediaGeral >= 4.5).length;
    const bom = filteredEvaluations.filter(e => e.mediaGeral >= 4.0 && e.mediaGeral < 4.5).length;
    const regular = filteredEvaluations.filter(e => e.mediaGeral >= 3.0 && e.mediaGeral < 4.0).length;
    const ruim = filteredEvaluations.filter(e => e.mediaGeral < 3.0).length;

    return [
      { name: 'Ótimo (≥ 4.50)', value: otimo, color: '#059669' },
      { name: 'Bom (4.00 - 4.49)', value: bom, color: '#0d9488' },
      { name: 'Regular (3.00 - 3.99)', value: regular, color: '#d97706' },
      { name: 'Crítico (< 3.00)', value: ruim, color: '#dc2626' }
    ].filter(d => d.value > 0);
  }, [filteredEvaluations]);

  // Lista de Fornecedores com Maior Desempenho (Top Performers)
  const topPerformers = useMemo(() => {
    return [...filteredEvaluations]
      .sort((a, b) => b.mediaGeral - a.mediaGeral)
      .slice(0, 5);
  }, [filteredEvaluations]);

  // Lista de Fornecedores que exigem Plano de Ação (Abaixo da Meta)
  const lowPerformers = useMemo(() => {
    return filteredEvaluations.filter(e => e.necessitaPlanoAcao || e.mediaGeral < 4.0);
  }, [filteredEvaluations]);

  return (
    <div className="space-y-8 font-sans">
      {/* Cabeçalho do Painel e Filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-hospital-500/10 text-hospital-700 text-xs font-bold px-2.5 py-0.5 rounded border border-hospital-200 uppercase">
              Diretoria Operacional — Rede D'Or
            </span>
            <span className="text-slate-400 text-xs font-medium">| Visão Geral do SLA Hospitalar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Painel Geral de Avaliação de Contratos
          </h2>
        </div>

        {/* Filtros de Ano e Setor */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
            <Calendar className="w-4 h-4 text-hospital-600" />
            <span className="text-slate-600">Ciclo Anual:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value={2026}>Ano 2026</option>
              <option value={2025}>Ano 2025</option>
              <option value={2024}>Ano 2024</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
            <Filter className="w-4 h-4 text-hospital-600" />
            <span className="text-slate-600">Setor:</span>
            <select
              value={selectedSectorId}
              onChange={(e) => setSelectedSectorId(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer max-w-[180px] truncate"
            >
              <option value="TODOS">Todos os Setores</option>
              {sectors.map(sec => (
                <option key={sec.id} value={sec.id}>{sec.nome}</option>
              ))}
            </select>
          </div>

          <button
            onClick={onNewEvaluation}
            className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-hospital-600 hover:bg-hospital-700 rounded-xl shadow-md transition"
          >
            + Nova Avaliação Anual
          </button>
        </div>
      </div>

      {/* Cartões dos Indicadores Principais (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Média Geral Hospitalar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Média Geral de SLA</span>
            <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900">{mediaGeralGlobal.toFixed(2)}</span>
            <span className="text-xs text-slate-500 font-semibold">/ 5,00</span>
          </div>
          <p className="text-[11px] text-slate-500">Meta Mínima Institucional: <strong>4,00</strong></p>
        </div>

        {/* Taxa de Conformidade */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Taxa de Conformidade</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900">{taxaAprovacaoPercent}%</span>
            <span className="text-xs text-emerald-600 font-bold">({dentroDaMetaCount} contratos)</span>
          </div>
          <p className="text-[11px] text-slate-500">Contratos com média $\ge$ 4,00 no ciclo</p>
        </div>

        {/* Contratos Abaixo da Meta */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Abaixo da Meta (&lt; 4,00)</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-3xl font-black ${abaixoDaMetaCount > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
              {abaixoDaMetaCount}
            </span>
            <span className="text-xs text-slate-500 font-semibold">contratos</span>
          </div>
          <p className="text-[11px] text-slate-500">Exigem Plano de Ação 5W2H</p>
        </div>

        {/* Total de Avaliações Registradas */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Avaliações Concluídas</span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900">{totalEvaluations}</span>
            <span className="text-xs text-slate-500 font-semibold">no ano {selectedYear}</span>
          </div>
          <p className="text-[11px] text-slate-500">Contratos avaliados no período</p>
        </div>
      </div>

      {/* Seção dos Gráficos Interativos (Média por Setor + Distribuição) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Barras - Média por Setor */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Média de SLA por Setor Hospitalar</h3>
              <p className="text-xs text-slate-500">Comparativo das médias dos fornecedores vinculados a cada área no ano {selectedYear}</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Linha de Meta: 4,00
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorChartData} margin={{ top: 20, right: 30, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="nome" 
                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(value: any) => [`${value} / 5,00`, 'Média Anual']}
                  labelFormatter={(label, payload) => payload[0]?.payload?.nomeCompleto || label}
                  contentStyle={{ borderRadius: '12px', fontSize: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <ReferenceLine y={4.0} stroke="#10b981" strokeDasharray="4 4" strokeWidth={2} label={{ value: 'Meta (4,00)', fill: '#059669', fontSize: 10, position: 'top' }} />
                <Bar dataKey="media" radius={[6, 6, 0, 0]}>
                  {sectorChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.media >= 4.0 ? '#0d9488' : entry.media >= 3.0 ? '#f59e0b' : '#ef4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Pizza - Distribuição de Notas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
              Distribuição por Faixa de Desempenho
            </h3>
            <p className="text-xs text-slate-500 mt-1">Proporção dos contratos por faixa de pontuação anual</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any) => [`${val} contratos`, 'Quantidade']}
                    contentStyle={{ borderRadius: '10px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-xs text-slate-400">Nenhum dado disponível</div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            {pieChartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-slate-700">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-[11px]">{item.name}</span>
                </div>
                <strong className="font-bold text-[11px]">{item.value} ({Math.round((item.value / totalEvaluations) * 100)}%)</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Listas de Destaques: Maiores Notas vs Abaixo da Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fornecedores com Maior Nota */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm">Fornecedores com Maior Nota (Top 5)</h3>
            </div>
            <span className="text-xs text-slate-500">Ano {selectedYear}</span>
          </div>

          <div className="space-y-3">
            {topPerformers.map(ev => {
              const sup = suppliers.find(s => s.id === ev.fornecedorId);
              const sec = sectors.find(s => s.id === ev.setorId);

              return (
                <div 
                  key={ev.id}
                  onClick={() => onViewEvaluation(ev.id)}
                  className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5 truncate pr-2">
                    <strong className="text-slate-900 text-xs font-bold block group-hover:text-hospital-600 transition truncate">
                      {sup?.nomeFantasia || 'Fornecedor'}
                    </strong>
                    <p className="text-[11px] text-slate-500 truncate">
                      {sec?.nome} | Contrato: {sup?.numeroContrato}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      {ev.mediaGeral.toFixed(2)}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-hospital-600 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fornecedores que Exigem Plano de Ação (Abaixo da Meta) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm">Contratos Abaixo da Meta (&lt; 4,00)</h3>
            </div>
            <button
              onClick={onManageActionPlans}
              className="text-xs font-bold text-hospital-600 hover:text-hospital-700 transition"
            >
              Ver Planos 5W2H →
            </button>
          </div>

          {lowPerformers.length > 0 ? (
            <div className="space-y-3">
              {lowPerformers.map(ev => {
                const sup = suppliers.find(s => s.id === ev.fornecedorId);
                const sec = sectors.find(s => s.id === ev.setorId);
                const hasPlan = actionPlans.some(ap => ap.evaluationId === ev.id);

                return (
                  <div 
                    key={ev.id}
                    onClick={() => onViewEvaluation(ev.id)}
                    className="p-3.5 bg-amber-50/50 hover:bg-amber-100/50 rounded-xl border border-amber-200/80 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <div className="flex items-center space-x-2">
                        <strong className="text-slate-900 text-xs font-bold group-hover:text-hospital-600 transition truncate">
                          {sup?.nomeFantasia || 'Fornecedor'}
                        </strong>
                        <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                          hasPlan ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-200 text-amber-900'
                        }`}>
                          {hasPlan ? '5W2H Ativo' : 'Pendente 5W2H'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 truncate">
                        {sec?.nome} | Avaliador: {ev.gestorAvaliador}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 flex-shrink-0">
                      <span className="text-sm font-black text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-300">
                        {ev.mediaGeral.toFixed(2)}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-hospital-600 transition" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500 text-xs space-y-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <strong className="font-bold text-slate-800 block">Nenhum Contrato Abaixo da Meta!</strong>
              <span>Todos os contratos avaliados no ciclo atingiram a nota mínima exigida (4,00).</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
