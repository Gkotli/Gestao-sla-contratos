import { EvaluationAnswers, MetaStatus } from '../types';
import { EVALUATION_QUESTIONS } from './questions';

export interface CalculationResult {
  mediaLegais: number;
  mediaComportamentais: number;
  mediaQualidade: number;
  mediaGeral: number;
  statusMeta: MetaStatus;
  necessitaPlanoAcao: boolean;
  qtdValidosLegais: number;
  qtdValidosComportamentais: number;
  qtdValidosQualidade: number;
  qtdValidosTotal: number;
}

export function calculateAverages(respostas: EvaluationAnswers): CalculationResult {
  let somaLegais = 0;
  let countLegais = 0;

  let somaComp = 0;
  let countComp = 0;

  let somaQual = 0;
  let countQual = 0;

  EVALUATION_QUESTIONS.forEach((q) => {
    const score = respostas[q.id];
    if (typeof score === 'number' && score >= 1 && score <= 5) {
      if (q.category === 'LEGAIS') {
        somaLegais += score;
        countLegais += 1;
      } else if (q.category === 'COMPORTAMENTAIS') {
        somaComp += score;
        countComp += 1;
      } else if (q.category === 'QUALIDADE') {
        somaQual += score;
        countQual += 1;
      }
    }
  });

  const mediaLegais = countLegais > 0 ? Number((somaLegais / countLegais).toFixed(2)) : 0;
  const mediaComportamentais = countComp > 0 ? Number((somaComp / countComp).toFixed(2)) : 0;
  const mediaQualidade = countQual > 0 ? Number((somaQual / countQual).toFixed(2)) : 0;

  const somaTotal = somaLegais + somaComp + somaQual;
  const countTotal = countLegais + countComp + countQual;

  const mediaGeral = countTotal > 0 ? Number((somaTotal / countTotal).toFixed(2)) : 0;

  let statusMeta: MetaStatus = 'DENTRO_DA_META';
  if (mediaGeral < 3.00) {
    statusMeta = 'CRITICO';
  } else if (mediaGeral < 4.00) {
    statusMeta = 'ABAIXO_DA_META';
  }

  const necessitaPlanoAcao = mediaGeral < 4.00 && countTotal > 0;

  return {
    mediaLegais,
    mediaComportamentais,
    mediaQualidade,
    mediaGeral,
    statusMeta,
    necessitaPlanoAcao,
    qtdValidosLegais: countLegais,
    qtdValidosComportamentais: countComp,
    qtdValidosQualidade: countQual,
    qtdValidosTotal: countTotal
  };
}

export function getMetaBadgeDetails(statusOrMedia?: MetaStatus | number | null, fallbackMedia?: number) {
  let status: MetaStatus = 'DENTRO_DA_META';

  if (typeof statusOrMedia === 'number') {
    if (statusOrMedia < 3.0) status = 'CRITICO';
    else if (statusOrMedia < 4.0) status = 'ABAIXO_DA_META';
    else status = 'DENTRO_DA_META';
  } else if (typeof statusOrMedia === 'string' && ['DENTRO_DA_META', 'ABAIXO_DA_META', 'CRITICO'].includes(statusOrMedia)) {
    status = statusOrMedia as MetaStatus;
  } else if (typeof fallbackMedia === 'number') {
    if (fallbackMedia < 3.0) status = 'CRITICO';
    else if (fallbackMedia < 4.0) status = 'ABAIXO_DA_META';
    else status = 'DENTRO_DA_META';
  }

  switch (status) {
    case 'ABAIXO_DA_META':
      return {
        label: 'Abaixo da Meta',
        colorClass: 'bg-amber-100 text-amber-800 border-amber-300',
        bgClass: 'bg-amber-100',
        textClass: 'text-amber-800',
        borderClass: 'border-amber-300',
        badgeBg: 'bg-amber-500',
        textColor: 'text-amber-700',
        description: 'Desempenho insatisfatório (3.00 a 3.99). Requer Plano de Ação.'
      };
    case 'CRITICO':
      return {
        label: 'Crítico',
        colorClass: 'bg-rose-100 text-rose-800 border-rose-300',
        bgClass: 'bg-rose-100',
        textClass: 'text-rose-800',
        borderClass: 'border-rose-300',
        badgeBg: 'bg-rose-600',
        textColor: 'text-rose-700',
        description: 'Desempenho crítico (< 3.00). Requer Plano de Ação Urgente e Reunião com a Diretoria.'
      };
    case 'DENTRO_DA_META':
    default:
      return {
        label: 'Dentro da Meta',
        colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        bgClass: 'bg-emerald-100',
        textClass: 'text-emerald-800',
        borderClass: 'border-emerald-300',
        badgeBg: 'bg-emerald-500',
        textColor: 'text-emerald-700',
        description: 'Fornecedor em conformidade com o SLA exigido (≥ 4.00)'
      };
  }
}
