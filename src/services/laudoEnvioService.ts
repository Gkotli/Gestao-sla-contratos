// Encaminhamento do laudo ao fornecedor pelo Outlook do gestor, com registro de comprovação.
//
// O e-mail sai da caixa do gestor (a cópia em "Itens Enviados" é a prova do envio).
// O sistema guarda quem enviou, quando, para qual endereço e o código de verificação
// do conteúdo — o mesmo código vai no corpo do e-mail, ligando a mensagem à versão do laudo.

import { AcaoFornecedorSite, EnvioLaudo, Evaluation, Sector, Supplier, User } from '../types';
import { safeFormatScore } from '../utils/formatters';
import { getMetaBadgeDetails } from './evaluationCalculation';

// Campos que definem o resultado da avaliação (qualquer mudança gera outro código)
function contentForCode(evaluation: Evaluation) {
  return {
    id: evaluation.id,
    fornecedorId: evaluation.fornecedorId,
    ano: evaluation.ano,
    respostas: evaluation.respostas || {},
    itensExcecao: evaluation.itensExcecao || [],
    perguntas: (evaluation.perguntasAvaliadas || []).map(q => q.id),
    medias: [evaluation.mediaLegais, evaluation.mediaComportamentais, evaluation.mediaQualidade, evaluation.mediaGeral],
    statusMeta: evaluation.statusMeta,
    parecerGeral: evaluation.parecerGeral || '',
    observacoes: [evaluation.observacoesLegais || '', evaluation.observacoesComportamentais || '', evaluation.observacoesQualidade || '']
  };
}

// JSON com chaves ordenadas, para o código não depender da ordem dos campos
function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    return `{${Object.keys(obj).sort().map(k => `${JSON.stringify(k)}:${stableStringify(obj[k])}`).join(',')}}`;
  }
  return JSON.stringify(value ?? null);
}

// Código de verificação do laudo: SHA-256 do conteúdo, exibido como XXXX-XXXX-XXXX
export async function computeLaudoCode(evaluation: Evaluation): Promise<string> {
  const bytes = new TextEncoder().encode(stableStringify(contentForCode(evaluation)));
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  const hex = Array.from(digest.slice(0, 6)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  return hex.match(/.{4}/g)!.join('-');
}

export function getLastEnvio(evaluation: Evaluation): EnvioLaudo | undefined {
  const envios = evaluation.historicoEnvios || [];
  return envios.length ? envios[envios.length - 1] : undefined;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function buildLaudoEmail(evaluation: Evaluation, supplier: Supplier | undefined, sector: Sector | undefined, sender: User | null, codigo: string) {
  const fornecedor = supplier?.nomeFantasia || supplier?.razaoSocial || 'Fornecedor';
  const contrato = supplier?.numeroContrato || '-';
  const meta = getMetaBadgeDetails(evaluation.statusMeta, evaluation.mediaGeral)?.label || '-';
  const link = `${window.location.origin}/?eval=${encodeURIComponent(evaluation.id)}`;
  const saudacao = supplier?.contatoNome ? `Prezado(a) ${supplier.contatoNome},` : 'Prezados,';

  const assunto = `Avaliação Anual de Desempenho ${evaluation.ano} - ${fornecedor} - Contrato ${contrato}`;

  const corpo = [
    saudacao,
    '',
    `Encaminhamos o resultado da Avaliação Anual de Desempenho (SLA) ${evaluation.ano} referente ao contrato ${contrato}, realizada pelo Hospital Vila Nova Star (Rede D'Or).`,
    '',
    `Setor responsável: ${sector?.nome || '-'}`,
    `Aspectos Legais: ${safeFormatScore(evaluation.mediaLegais)}`,
    `Comportamentais: ${safeFormatScore(evaluation.mediaComportamentais)}`,
    `Qualidade e Segurança: ${safeFormatScore(evaluation.mediaQualidade)}`,
    `Média Geral: ${safeFormatScore(evaluation.mediaGeral)} (${meta}; meta mínima 4,00)`,
    evaluation.necessitaPlanoAcao ? 'Resultado abaixo da meta: será necessário Plano de Ação 5W2H.' : '',
    '',
    'O laudo completo segue em anexo e também está disponível no sistema:',
    link,
    '',
    'Caso deseje registrar ciência ou apresentar considerações, responda a este e-mail.',
    '',
    `Código de verificação do laudo: ${codigo}`,
    '',
    'Atenciosamente,',
    sender?.nome || evaluation.gestorAvaliador || '',
    sender?.cargo || '',
    `${sector?.nome ? `${sector.nome} - ` : ''}Hospital Vila Nova Star | Rede D'Or`
  ].filter((line, i, all) => !(line === '' && all[i - 1] === '')).join('\n');

  return { assunto, corpo };
}

export function buildMailto(to: string, subject: string, body: string): string {
  // Outlook exige quebras de linha como CRLF codificado
  return `mailto:${encodeURIComponent(to.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\n/g, '\r\n'))}`;
}

// Nova versão da avaliação com o envio registrado
export function registerEnvio(evaluation: Evaluation, envio: Omit<EnvioLaudo, 'id' | 'dataHora' | 'meio'>): Evaluation {
  const registro: EnvioLaudo = { id: `envio_${Date.now()}`, dataHora: new Date().toISOString(), meio: 'OUTLOOK', ...envio };
  return {
    ...evaluation,
    historicoEnvios: [...(evaluation.historicoEnvios || []), registro],
    // Envio não desfaz uma ciência já registrada
    statusAssinatura: evaluation.statusAssinatura === 'ASSINADO_CIENTE' ? 'ASSINADO_CIENTE' : 'ENVIADO_FORNECEDOR'
  };
}

// ---------------------------------------------------------------------------
// Ações do próprio fornecedor no site (segunda validação, além do e-mail)
// ---------------------------------------------------------------------------
function acaoFornecedor(user: User, codigoLaudo: string): AcaoFornecedorSite {
  return {
    dataHora: new Date().toISOString(),
    usuarioId: user.id,
    nome: user.nome,
    email: user.email,
    codigoLaudo,
    navegador: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
  };
}

export function registerVisualizacaoFornecedor(evaluation: Evaluation, user: User, codigoLaudo: string): Evaluation {
  return { ...evaluation, visualizacaoFornecedor: acaoFornecedor(user, codigoLaudo) };
}

// Validação no site equivale à ciência do fornecedor, feita por ele mesmo
export function registerValidacaoFornecedor(evaluation: Evaluation, user: User, codigoLaudo: string, parecerFornecedor?: string): Evaluation {
  const validacao = acaoFornecedor(user, codigoLaudo);
  return {
    ...evaluation,
    validacaoFornecedor: validacao,
    visualizacaoFornecedor: evaluation.visualizacaoFornecedor || validacao,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: validacao.dataHora.split('T')[0],
    nomeSignatario: evaluation.nomeSignatario || user.nome,
    cargoSignatario: evaluation.cargoSignatario || user.cargo,
    cienciaRegistradaPor: user.nome,
    parecerFornecedor: parecerFornecedor !== undefined ? parecerFornecedor : evaluation.parecerFornecedor
  };
}
