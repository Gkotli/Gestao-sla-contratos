// Regra única dos ciclos anuais de avaliação (matriz de pendências, formulário e indicadores).
//
// Ordem de verificação de cada ciclo (ano):
//   início do contrato → período da avaliação → existência da avaliação → status
// Um ciclo só pode ficar "Pendente" se o contrato esteve vigente em algum momento daquele ano.
// Ex.: contrato iniciado em 15/03/2025 não tem ciclo 2024; iniciado em 29/07/2024 tem ciclo 2024.

import type { Evaluation, Supplier } from '../types';

// Primeiro ciclo controlado pelo sistema (avaliações de 2024 transcritas do papel)
export const FIRST_CYCLE_YEAR = 2024;

export function getCurrentCycleYear(): number {
  return new Date().getFullYear();
}

export function getCycleYears(currentYear: number = getCurrentCycleYear()): number[] {
  const years: number[] = [];
  for (let y = FIRST_CYCLE_YEAR; y <= currentYear; y++) years.push(y);
  return years;
}

export type YearCycleStatus = 'CONCLUIDA' | 'PENDENTE_ATUAL' | 'PENDENTE_ANTERIOR' | 'NA';

// Aceita "DD/MM/AAAA" (padrão do cadastro) ou "AAAA-MM-DD". Retorna null para textos livres.
export function parseContractDate(value?: string): Date | null {
  const v = (value || '').trim();
  let m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return validDate(+m[3], +m[2], +m[1]);
  m = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return validDate(+m[1], +m[2], +m[3]);
  return null;
}

function validDate(y: number, mo: number, d: number): Date | null {
  const date = new Date(y, mo - 1, d);
  return date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d ? date : null;
}

export function isValidContractDateInput(value: string): boolean {
  return value.trim() === '' || parseContractDate(value) !== null;
}

// Ano de término: só quando há data; "Indeterminado", "Aguardando aditivo" etc. não encerram ciclos
export function getContractEndYear(sup: Supplier): number | null {
  const fim = parseContractDate(sup.vigenciaFim);
  if (fim) return fim.getFullYear();
  const yearMatch = (sup.vigenciaFim || '').match(/\b20\d\d\b/);
  return yearMatch ? parseInt(yearMatch[0], 10) : null;
}

export function getContractStartYear(sup: Supplier): number | null {
  const inicio = parseContractDate(sup.vigenciaInicio);
  return inicio ? inicio.getFullYear() : null;
}

export type CycleApplicability = 'APLICAVEL' | 'ANTES_DO_INICIO' | 'APOS_O_FIM';

export function getCycleApplicability(sup: Supplier, year: number): CycleApplicability {
  const startYear = getContractStartYear(sup);
  // Sem data de início cadastrada o ciclo continua obrigatório (o cadastro sinaliza a falta)
  if (startYear !== null && year < startYear) return 'ANTES_DO_INICIO';
  const endYear = getContractEndYear(sup);
  if (endYear !== null && year > endYear) return 'APOS_O_FIM';
  return 'APLICAVEL';
}

export function findCycleEvaluation(evaluations: Evaluation[], supplierId: string, year: number): Evaluation | undefined {
  return evaluations.find(e => e.fornecedorId === supplierId && e.ano === year);
}

export function getCycleStatus(
  sup: Supplier,
  year: number,
  evaluations: Evaluation[],
  currentYear: number = getCurrentCycleYear()
): YearCycleStatus {
  // Avaliação registrada é sempre mostrada (ex.: histórica anterior ao contrato atual), mas nunca gera pendência
  if (findCycleEvaluation(evaluations, sup.id, year)) return 'CONCLUIDA';
  if (getCycleApplicability(sup, year) !== 'APLICAVEL') return 'NA';
  return year < currentYear ? 'PENDENTE_ANTERIOR' : 'PENDENTE_ATUAL';
}

export const isPendingStatus = (s: YearCycleStatus) => s === 'PENDENTE_ATUAL' || s === 'PENDENTE_ANTERIOR';

export interface SupplierCycleSummary {
  statusByYear: Record<number, YearCycleStatus>;
  totalPendencias: number;
  hasPreviousOverdue: boolean;
  ciclosObrigatorios: number;   // ciclos dentro da vigência (base dos percentuais)
  ciclosConcluidos: number;     // ciclos obrigatórios com avaliação
  semDataInicio: boolean;
  proximoAnoPendente?: number;  // o mais antigo primeiro (regulariza atrasos antes)
}

export function summarizeSupplierCycles(
  sup: Supplier,
  evaluations: Evaluation[],
  currentYear: number = getCurrentCycleYear()
): SupplierCycleSummary {
  const statusByYear: Record<number, YearCycleStatus> = {};
  let totalPendencias = 0;
  let ciclosObrigatorios = 0;
  let ciclosConcluidos = 0;
  let proximoAnoPendente: number | undefined;

  for (const year of getCycleYears(currentYear)) {
    const status = getCycleStatus(sup, year, evaluations, currentYear);
    statusByYear[year] = status;
    if (getCycleApplicability(sup, year) === 'APLICAVEL') {
      ciclosObrigatorios++;
      if (status === 'CONCLUIDA') ciclosConcluidos++;
    }
    if (isPendingStatus(status)) {
      totalPendencias++;
      if (proximoAnoPendente === undefined) proximoAnoPendente = year;
    }
  }

  return {
    statusByYear,
    totalPendencias,
    hasPreviousOverdue: Object.values(statusByYear).includes('PENDENTE_ANTERIOR'),
    ciclosObrigatorios,
    ciclosConcluidos,
    semDataInicio: getContractStartYear(sup) === null,
    proximoAnoPendente
  };
}
