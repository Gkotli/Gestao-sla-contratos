/**
 * Helper utilitário para formatar números e médias de SLA com segurança total contra undefined/null/NaN.
 * Evita exceções do tipo 'TypeError: .toFixed is not a function' que causam Tela Branca.
 */
// Notas vão de 1 a 5: média 0 significa "sem nota" (ex.: bloco todo marcado como Não se Aplica)
export const safeFormatScore = (val: any, decimals: number = 2): string => {
  const num = safeNumber(val);
  return num > 0 ? num.toFixed(decimals) : 'N/A';
};

export const safeNumber = (val: any): number => {
  if (typeof val === 'number' && !isNaN(val)) {
    return val;
  }
  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  return 0;
};
