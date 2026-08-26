import React, { useState, useMemo } from 'react';
import { ActionPlan, Evaluation, Sector, Supplier } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Award,
  PenTool,
  Eye
} from 'lucide-react';
import { getMetaBadgeDetails } from '../services/evaluationCalculation';

interface ExecutiveDashboardProps {
  evaluations: Evaluation[];
  suppliers: Supplier[];
  sectors: Sector[];
  actionPlans: ActionPlan[];
  onNewEvaluation: (supplierId?: string) => void;
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
  const [selectedAno, setSelectedAno] = useState<string>('2026');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  // Filtered evaluations
  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(e => {
      const matchAno = selectedAno === 'ALL' || e.ano.toString() === selectedAno;
      const matchSector = selectedSector === 'ALL' || e.setorId === selectedSector;
      return matchAno && matchSector;
    });
  }, [evaluations, selectedAno, selectedSector]);

  // Overall Statistics
  const stats = useMemo(() => {
    const total = filteredEvaluations.length;
    if (total === 0) {
      return {
        mediaGeral: 0,
        dentroMetaCount: 0,
        abaixoMetaCount: 0,
        criticoCount: 0,
        pctDentroMeta: 0,
        pctAbaixoMeta: 0,
        pctCritico: 0,
        assinadosCount: 0,
        pctAssinados: 0
      };
    }

    const somaGeral = filteredEvaluations.reduce((acc, e) => acc + e.mediaGeral, 0);
    const mediaGeral = Number((somaGeral / total).toFixed(2));

    const dentroMetaCount = filteredEvaluations.filter(e => e.statusMeta === 'DENTRO_DA_META').length;
    const abaixoMetaCount = filteredEvaluations.filter(e => e.statusMeta === 'ABAIXO_DA_META').length;
    const criticoCount = filteredEvaluations.filter(e => e.statusMeta === 'CRITICO').length;

    const assinadosCount = filteredEvaluations.filter(e => e.statusAssinatura === 'ASSINADO_CIENTE').length;

    return {
      mediaGeral,
      dentroMetaCount,
      abaixoMetaCount,
      criticoCount,
      pctDentroMeta: Math.round((dentroMetaCount / total) * 100),
      pctAbaixoMeta: Math.round((abaixoMetaCount / total) * 100),
      pctCritico: Math.round((criticoCount / total) * 100),
      assinadosCount,
      pctAssinados: Math.round((assinadosCount / total) * 100)
    };
  }, [filteredEvaluations]);

  // Sector Averages Chart Data
  const sectorChartData = useMemo(() => {
    return sectors.map(sec => {
      const evalsInSector = filteredEvaluations.filter(e => e.setorId === sec.id);
      if (evalsInSector.length === 0) {
        return {
          name: sec.nome.split(' / ')[0], // short name
          mediaGeral: 0,
          mediaLegais: 0,
          mediaComportamentais: 0,
          mediaQualidade: 0
        };
      }

      const avgGeral = evalsInSector.reduce((a, b) => a + b.mediaGeral, 0) / evalsInSector.length;
      const avgLegais = evalsInSector.reduce((a, b) => a + b.mediaLegais, 0) / evalsInSector.length;
      const avgComp = evalsInSector.reduce((a, b) => a + b.mediaComportamentais, 0) / evalsInSector.length;
      const avgQual = evalsInSector.reduce((a, b) => a + b.mediaQualidade, 0) / evalsInSector.length;

      return {
        name: sec.nome.split(' / ')[0],
        mediaGeral: Number(avgGeral.toFixed(2)),
        mediaLegais: Number(avgLegais.toFixed(2)),
        mediaComportamentais: Number(avgComp.toFixed(2)),
        mediaQualidade: Number(avgQual.toFixed(2))
      };
    }).filter(d => d.mediaGeral > 0);
  }, [sectors, filteredEvaluations]);

  // Pie chart status breakdown
  const pieData = useMemo(() => {
    return [
      { name: 'Dentro da Meta (≥ 4.0)', value: stats.dentroMetaCount, color: '#10b981' },
      { name: 'Abaixo da Meta (3.0 a 3.99)', value: stats.abaixoMetaCount, color: '#f59e0b' },
      { name: 'Crítico (< 3.0)', value: stats.criticoCount, color: '#ef4444' }
    ].filter(d => d.value > 0);
  }, [stats]);

  // Low score suppliers (Abaixo da Meta & Crítico)
  const lowScoreEvaluations = useMemo(() => {
    return filteredEvaluations.filter(e => e.mediaGeral < 4.00);
  }, [filteredEvaluations]);

  // Top score suppliers
  const topScoreEvaluations = useMemo(() => {
    return [...filteredEvaluations]
      .filter(e => e.mediaGeral >= 4.00)
      .sort((a, b) => b.mediaGeral - a.mediaGeral);
  }, [filteredEvaluations]);

  return (
    <div className="space-y-6">
      {/* Bar de Filtros Globais da Diretoria */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-2 text-slate-700 font-semibold text-sm">
          <Filter className="w-4 h-4 text-hospital-600" />
          <span>Filtros Executivos:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filtro Ano */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Ano de Avaliação</label>
            <select
              value={selectedAno}
              onChange={(e) => setSelectedAno(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-lg p-2 focus:ring-hospital-500 focus:border-hospital-500"
            >
              <option value="ALL">Todos os Anos</option>
              <option value="2026">Ano 2026</option>
              <option value="2025">Ano 2025</option>
              <option value="2024">Ano 2024</option>
            </select>
          </div>

          {/* Filtro Setor */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Setor Responsável</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-lg p-2 focus:ring-hospital-500 focus:border-hospital-500"
            >
              <option value="ALL">Todos os Setores Hospitalares</option>
              {sectors.map(sec => (
                <option key={sec.id} value={sec.id}>{sec.nome}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cards de Indicadores de SLA (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Média Geral Hospitalar */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Média Geral Hospitalar</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                {stats.mediaGeral > 0 ? stats.mediaGeral.toFixed(2) : 'N/A'}
              </h3>
            </div>
            <div className={`p-3 rounded-full ${stats.mediaGeral >= 4 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <span className="text-slate-500">Meta Estabelecida: </span>
            <span className="font-bold text-slate-800 ml-1">≥ 4,00</span>
          </div>
          <div className={`h-1.5 w-full mt-3 rounded-full ${stats.mediaGeral >= 4 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        </div>

        {/* KPI 2: Dentro da Meta */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Dentro da Meta (≥ 4.0)</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <h3 className="text-3xl font-extrabold text-emerald-600">
                  {stats.dentroMetaCount}
                </h3>
                <span className="text-sm font-semibold text-slate-500">({stats.pctDentroMeta}%)</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Fornecedores em conformidade plena de SLA</p>
        </div>

        {/* KPI 3: Abaixo da Meta e Críticos */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Abaixo da Meta / Críticos</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <h3 className="text-3xl font-extrabold text-amber-600">
                  {stats.abaixoMetaCount + stats.criticoCount}
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  ({stats.abaixoMetaCount} Amarelos / {stats.criticoCount} Vermelhos)
                </span>
              </div>
            </div>
            <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-3 text-xs text-amber-700 font-medium">Requerem abertura obrigatória de Plano de Ação</p>
        </div>

        {/* KPI 4: Assinatura e Ciência */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ciência do Fornecedor</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <h3 className="text-3xl font-extrabold text-slate-800">
                  {stats.assinadosCount}
                </h3>
                <span className="text-sm font-semibold text-slate-500">({stats.pctAssinados}%)</span>
              </div>
            </div>
            <div className="p-3 bg-hospital-100 text-hospital-600 rounded-full">
              <PenTool className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Laudos com aceite formal registrado</p>
        </div>
      </div>

      {/* Gráficos da Diretoria */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico 1: Médias por Setor Hospitalar */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Média de Desempenho por Setor Hospitalar</h3>
              <p className="text-xs text-slate-500">Comparativo das avaliações anuais consolidadas por setor</p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="inline-block w-3 h-3 bg-rose-500 rounded-full"></span>
              <span className="text-slate-600 font-medium">Linha da Meta (4,00)</span>
            </div>
          </div>

          <div className="h-72 w-full">
            {sectorChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11, fill: '#475569' }} 
                    interval={0} 
                    angle={-15} 
                    textAnchor="end" 
                  />
                  <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: '#475569' }} />
                  <Tooltip 
                    formatter={(value: any) => [`${value}`, 'Média']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                  />
                  <ReferenceLine y={4.0} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={2} label={{ value: 'META 4.0', fill: '#ef4444', fontSize: 10, position: 'top' }} />
                  <Bar dataKey="mediaGeral" fill="#0284c7" radius={[6, 6, 0, 0]} name="Média Geral" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                Nenhuma avaliação encontrada para os filtros selecionados.
              </div>
            )}
          </div>
        </div>

        {/* Gráfico 2: Distribuição da Meta */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Distribuição por Meta de SLA</h3>
            <p className="text-xs text-slate-500 mb-4">Proporção de fornecedores por faixa de nota</p>

            <div className="h-56 w-full flex items-center justify-center">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-slate-400 text-sm">Sem dados suficientes</div>
              )}
            </div>
          </div>

          <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-slate-600">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2"></span>
                Dentro da Meta (4.0 - 5.0)
              </span>
              <span className="font-bold text-slate-800">{stats.dentroMetaCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-slate-600">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full mr-2"></span>
                Abaixo da Meta (3.0 - 3.99)
              </span>
              <span className="font-bold text-slate-800">{stats.abaixoMetaCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-slate-600">
                <span className="w-2.5 h-2.5 bg-rose-600 rounded-full mr-2"></span>
                Crítico (&lt; 3.0)
              </span>
              <span className="font-bold text-slate-800">{stats.criticoCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabelas Sintéticas de Acompanhamento Executivo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Painel de Atenção: Fornecedores Abaixo da Meta (< 4.00) */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
          <div className="bg-amber-50 p-4 border-b border-amber-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Atenção Diretoria: Fornecedores Abaixo da Meta</h3>
            </div>
            <span className="bg-amber-200 text-amber-800 font-bold text-xs px-2.5 py-0.5 rounded-full">
              {lowScoreEvaluations.length} Alertas
            </span>
          </div>

          {lowScoreEvaluations.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {lowScoreEvaluations.map(ev => {
                const supplier = suppliers.find(s => s.id === ev.fornecedorId);
                const sector = sectors.find(s => s.id === ev.setorId);
                const badge = getMetaBadgeDetails(ev.statusMeta, ev.mediaGeral);
                const plan = actionPlans.find(p => p.evaluationId === ev.id);

                return (
                  <div key={ev.id} className="p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">{supplier?.nomeFantasia || 'Fornecedor'}</span>
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-md border ${badge.colorClass}`}>
                          {ev.mediaGeral.toFixed(2)} - {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Setor: <strong className="text-slate-700">{sector?.nome}</strong> | Ciclo Anual: {ev.ano}
                      </p>
                      {plan ? (
                        <span className="inline-flex items-center text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded mt-2">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-amber-600" /> Plano de Ação em Andamento ({plan.status})
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded mt-2">
                          <XCircle className="w-3 h-3 mr-1 text-rose-600" /> PLANO DE AÇÃO PENDENTE
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      <button
                        onClick={() => onViewEvaluation(ev.id)}
                        className="p-2 text-slate-600 hover:text-hospital-600 hover:bg-hospital-50 rounded-lg transition text-xs font-medium flex items-center border border-slate-200"
                        title="Visualizar Avaliação"
                      >
                        <Eye className="w-4 h-4 mr-1" /> Ver Avaliação
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 text-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              Nenhum fornecedor abaixo da meta no período selecionado. Excelente!
            </div>
          )}
        </div>

        {/* Top Fornecedores com Excelência (>= 4.00) */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 overflow-hidden">
          <div className="bg-emerald-50 p-4 border-b border-emerald-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Top Performance Hospitalar (≥ 4.00)</h3>
            </div>
            <span className="bg-emerald-200 text-emerald-800 font-bold text-xs px-2.5 py-0.5 rounded-full">
              {topScoreEvaluations.length} Fornecedores
            </span>
          </div>

          {topScoreEvaluations.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {topScoreEvaluations.slice(0, 5).map(ev => {
                const supplier = suppliers.find(s => s.id === ev.fornecedorId);
                const sector = sectors.find(s => s.id === ev.setorId);

                return (
                  <div key={ev.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">{supplier?.nomeFantasia || 'Fornecedor'}</span>
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-xs px-2 py-0.5 rounded">
                          {ev.mediaGeral.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Setor: {sector?.nome} | Avaliado por: {ev.gestorAvaliador}
                      </p>
                    </div>

                    <button
                      onClick={() => onViewEvaluation(ev.id)}
                      className="p-2 text-slate-600 hover:text-hospital-600 hover:bg-hospital-50 rounded-lg transition text-xs border border-slate-200 flex items-center"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> Laudo
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 text-sm">
              Nenhuma avaliação cadastrada neste período.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
