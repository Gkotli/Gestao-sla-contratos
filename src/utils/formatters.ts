/**
 * Helper utilitário para formatar números e médias de SLA com segurança total contra undefined/null/NaN.
 * Evita exceções do tipo 'TypeError: .toFixed is not a function' que causam Tela Branca.
 */
export const safeFormatScore = (val: any, decimals: number = 2): string => {
  if (typeof val === 'number' && !isNaN(val)) {
    return val.toFixed(decimals);
  }
  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      return parsed.toFixed(decimals);
    }
  }
  return (0).toFixed(decimals);
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
