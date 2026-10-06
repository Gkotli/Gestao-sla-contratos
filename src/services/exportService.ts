// Exportação de avaliações para PDF (laudo A4) e Excel (.xlsx).
// As bibliotecas pesadas (jsPDF, html2canvas, write-excel-file) só são baixadas no clique.

import type { SheetData, Cell } from 'write-excel-file/browser';
import { ActionPlan, Evaluation, ScoreValue, Sector, SignStatus, Supplier } from '../types';
import { EVALUATION_QUESTIONS } from './questions';
import { QuestionnaireService } from './questionnaireService';
import { StorageService } from './storageService';
import { formatDateTime, getLastEnvio } from './laudoEnvioService';
import { getMetaBadgeDetails } from './evaluationCalculation';

const SIGN_LABELS: Record<SignStatus, string> = {
  PENDENTE_ENVIO: 'Não enviado',
  ENVIADO_FORNECEDOR: 'Enviado ao fornecedor',
  ASSINADO_CIENTE: 'Ciente / assinado',
  CONTESTADO: 'Contestado'
};

const PLAN_LABELS: Record<string, string> = {
  PENDENTE: 'Pendente',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDO: 'Concluído',
  ATRASADO: 'Atrasado'
};

interface EvaluationItem {
  pergunta: string;
  grupo: string;
  nota: ScoreValue | undefined;
  observacao?: string;
}

// Mesma regra do laudo: itens de exceção, perguntas salvas na avaliação, ou as 15 padrão.
function getEvaluationItems(evaluation: Evaluation): EvaluationItem[] {
  if (evaluation.tipoAvaliacao === 'EXCECAO' && evaluation.itensExcecao?.length) {
    return evaluation.itensExcecao.map(item => ({ pergunta: item.pergunta, grupo: item.grupo, nota: item.nota }));
  }
  const respostas = evaluation.respostas || {};
  const perguntas = QuestionnaireService.resolveEvaluatedQuestions(evaluation);
  if (perguntas) {
    return perguntas.map(q => ({
      pergunta: q.pergunta,
      grupo: q.categoria,
      nota: respostas[q.id],
      observacao: q.isManualAddition ? `Adição manual: ${q.justificativaAdicao || ''}` : undefined
    }));
  }
  return EVALUATION_QUESTIONS.map(q => ({ pergunta: q.text, grupo: q.category, nota: respostas[q.id] }));
}

function sanitizeFileName(text: string): string {
  return text
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 80);
}

export function evaluationFileName(evaluation: Evaluation, supplier?: Supplier): string {
  const nome = supplier?.nomeFantasia || supplier?.razaoSocial || evaluation.fornecedorId;
  return sanitizeFileName(`Avaliacao_SLA_${nome}_${evaluation.ano}`);
}

const score = (value: number | undefined): Cell =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? { value, type: Number, format: '0.00' } : 'N/A';

const notaCell = (nota: ScoreValue | undefined): Cell =>
  nota === 'NA' ? 'N/A' : typeof nota === 'number' ? { value: nota, type: Number } : '-';

const header = (labels: string[]): Cell[] =>
  labels.map(value => ({ value, fontWeight: 'bold' as const, backgroundColor: '#123768', color: '#FFFFFF' }));

// ---------------------------------------------------------------------------
// PDF: captura o laudo já renderizado na tela e divide em páginas A4.
// As quebras de página são ajustadas para não cortar blocos, linhas de tabela ou linhas de texto.
// ---------------------------------------------------------------------------

// Elementos que não devem ser partidos entre duas páginas (quando cabem em uma página)
const BLOCK_SELECTOR = '.print-avoid-break, .signature-block, [class*="rounded"], img, svg, blockquote';
// Último recurso: ao menos não cortar uma linha de texto ou de tabela no meio
const LINE_SELECTOR = 'tr, li, p, h1, h2, h3, h4, h5, strong, span, label, td, th';

interface Block { top: number; bottom: number }

function collectBlocks(element: HTMLElement, selector: string, pxRatio: number): Block[] {
  const origin = element.getBoundingClientRect();
  const blocks: Block[] = [];
  element.querySelectorAll<HTMLElement>(selector).forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.height <= 0) return;
    blocks.push({ top: (r.top - origin.top) * pxRatio, bottom: (r.bottom - origin.top) * pxRatio });
  });
  return blocks;
}

// Sobe o ponto de corte até o início do bloco mais externo (que caiba numa página) que seria cortado
function raiseCut(blocks: Block[], start: number, idealEnd: number, pageHeightPx: number): number {
  let cut = idealEnd;
  for (let pass = 0; pass < 50; pass++) {
    let next = cut;
    for (const b of blocks) {
      if (b.bottom - b.top <= pageHeightPx && b.top > start && b.top < cut - 1 && b.bottom > cut + 1) {
        next = Math.min(next, b.top);
      }
    }
    if (next === cut) break;
    cut = next;
  }
  return Math.floor(cut);
}

function findPageBreak(blocks: Block[], lines: Block[], start: number, idealEnd: number, pageHeightPx: number): number {
  const byBlock = raiseCut([...blocks, ...lines], start, idealEnd, pageHeightPx);
  // Não deixa a página com mais de 35% em branco só para manter um bloco grande inteiro
  if (byBlock - start >= pageHeightPx * 0.65) return byBlock;
  const byLine = raiseCut(lines, start, idealEnd, pageHeightPx);
  return byLine - start >= pageHeightPx * 0.5 ? byLine : idealEnd;
}

export async function exportElementToPdf(element: HTMLElement, fileName: string): Promise<void> {
  const [{ jsPDF }, { default: html2canvas }] = await Promise.all([import('jspdf'), import('html2canvas')]);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#FFFFFF',
    windowWidth: element.scrollWidth
  });

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const margin = 10;
  const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
  const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2;
  // Altura (em pixels do canvas) que cabe em uma página
  const sliceHeightPx = Math.floor((pageHeight * canvas.width) / pageWidth);
  const pxRatio = canvas.width / element.getBoundingClientRect().width;
  const blocks = collectBlocks(element, BLOCK_SELECTOR, pxRatio);
  const lines = collectBlocks(element, LINE_SELECTOR, pxRatio);

  for (let offset = 0, page = 0; offset < canvas.height; page++) {
    const idealEnd = offset + sliceHeightPx;
    const end = idealEnd >= canvas.height ? canvas.height : findPageBreak(blocks, lines, offset, idealEnd, sliceHeightPx);

    const slice = document.createElement('canvas');
    slice.width = canvas.width;
    slice.height = end - offset;
    slice.getContext('2d')!.drawImage(canvas, 0, offset, canvas.width, slice.height, 0, 0, canvas.width, slice.height);

    if (page > 0) pdf.addPage();
    pdf.addImage(slice.toDataURL('image/jpeg', 0.92), 'JPEG', margin, margin, pageWidth, (slice.height * pageWidth) / canvas.width);
    offset = end;
  }

  pdf.save(`${fileName}.pdf`);
}

// ---------------------------------------------------------------------------
// Excel de uma avaliação: Resumo + Notas por pergunta + Plano de Ação
// ---------------------------------------------------------------------------
export async function exportEvaluationToExcel(
  evaluation: Evaluation,
  supplier?: Supplier,
  sector?: Sector,
  actionPlan?: ActionPlan
): Promise<void> {
  const { default: writeXlsxFile } = await import('write-excel-file/browser');
  const meta = getMetaBadgeDetails(evaluation.statusMeta, evaluation.mediaGeral);

  const resumo: SheetData = [
    header(['Campo', 'Valor']),
    ['Fornecedor', supplier?.nomeFantasia || '-'],
    ['Razão social', supplier?.razaoSocial || '-'],
    ['CNPJ', supplier?.cnpj || '-'],
    ['Contrato', supplier?.numeroContrato || '-'],
    ['Setor', sector?.nome || evaluation.setorId],
    ['Ano', { value: evaluation.ano, type: Number }],
    ['Data da avaliação', evaluation.dataAvaliacao],
    ['Avaliador', evaluation.gestorAvaliador],
    ['Tipo', evaluation.tipoAvaliacao === 'EXCECAO' ? 'Exceção' : 'Padrão'],
    ['Média Legais', score(evaluation.mediaLegais)],
    ['Média Comportamentais', score(evaluation.mediaComportamentais)],
    ['Média Qualidade', score(evaluation.mediaQualidade)],
    ['Média Geral', score(evaluation.mediaGeral)],
    ['Status da meta', meta?.label || '-'],
    ['Necessita plano de ação', evaluation.necessitaPlanoAcao ? 'Sim' : 'Não'],
    ['Ciência do fornecedor', SIGN_LABELS[evaluation.statusAssinatura] || evaluation.statusAssinatura],
    ['Signatário', evaluation.nomeSignatario ? `${evaluation.nomeSignatario} (${evaluation.cargoSignatario || ''})` : '-'],
    ['Data da ciência', evaluation.dataCiencia || '-'],
    ['Ciência registrada por', evaluation.cienciaRegistradaPor || '-'],
    ['Visualizado pelo fornecedor no site', evaluation.visualizacaoFornecedor
      ? `${formatDateTime(evaluation.visualizacaoFornecedor.dataHora)} - ${evaluation.visualizacaoFornecedor.nome} (${evaluation.visualizacaoFornecedor.email})` : '-'],
    ['Validado pelo fornecedor no site', evaluation.validacaoFornecedor
      ? `${formatDateTime(evaluation.validacaoFornecedor.dataHora)} - ${evaluation.validacaoFornecedor.nome} (${evaluation.validacaoFornecedor.email}), código ${evaluation.validacaoFornecedor.codigoLaudo}` : '-'],
    ...(evaluation.historicoEnvios || []).map((envio, i): Cell[] => [
      `Envio ao fornecedor ${i + 1}`,
      `${formatDateTime(envio.dataHora)} para ${envio.destinatario}, por ${envio.enviadoPor} (código ${envio.codigoLaudo})`
    ]),
    ['Parecer do gestor', evaluation.parecerGeral || '-'],
    ['Parecer do fornecedor', evaluation.parecerFornecedor || '-'],
    ['Obs. legais', evaluation.observacoesLegais || '-'],
    ['Obs. comportamentais', evaluation.observacoesComportamentais || '-'],
    ['Obs. qualidade', evaluation.observacoesQualidade || '-']
  ];

  const notas: SheetData = [
    header(['Item', 'Pergunta', 'Grupo', 'Nota', 'Observação']),
    ...getEvaluationItems(evaluation).map((item, i): Cell[] => [
      { value: i + 1, type: Number },
      item.pergunta,
      item.grupo,
      notaCell(item.nota),
      item.observacao || ''
    ])
  ];

  const sheets = [
    { sheet: 'Resumo', data: resumo, columns: [{ width: 26 }, { width: 80 }] },
    { sheet: 'Notas', data: notas, columns: [{ width: 6 }, { width: 80 }, { width: 32 }, { width: 8 }, { width: 40 }], stickyRowsCount: 1 }
  ];

  if (actionPlan) {
    sheets.push({
      sheet: 'Plano de Ação 5W2H',
      data: [
        header(['Campo', 'Valor']),
        ['Título', actionPlan.titulo],
        ['O quê (What)', actionPlan.acao5W],
        ['Por quê (Why)', actionPlan.justificativa5W],
        ['Quem (Who)', actionPlan.responsavel5W],
        ['Onde (Where)', actionPlan.onde5W || '-'],
        ['Quando (When)', actionPlan.prazo5W],
        ['Como (How)', actionPlan.como5W || '-'],
        ['Quanto (How much)', actionPlan.custo5W || '-'],
        ['Status', PLAN_LABELS[actionPlan.status] || actionPlan.status],
        ['Acompanhamento', actionPlan.observacoesAcompanhamento || '-']
      ],
      columns: [{ width: 22 }, { width: 80 }]
    });
  }

  await writeXlsxFile(sheets).toFile(`${evaluationFileName(evaluation, supplier)}.xlsx`);
}

// ---------------------------------------------------------------------------
// Excel consolidado: uma linha por avaliação (respeita os filtros da tela)
// ---------------------------------------------------------------------------
export async function exportEvaluationsListToExcel(
  evaluations: Evaluation[],
  suppliers: Supplier[],
  sectors: Sector[],
  actionPlans: ActionPlan[]
): Promise<void> {
  const { default: writeXlsxFile } = await import('write-excel-file/browser');

  const rows: SheetData = [
    header([
      'Ano', 'Fornecedor', 'CNPJ', 'Contrato', 'Setor', 'Avaliador', 'Data',
      'Legais', 'Comportamentais', 'Qualidade', 'Média Geral', 'Status da Meta',
      'Plano de Ação', 'Status do Plano', 'Ciência do Fornecedor', 'Enviado ao Fornecedor em', 'E-mail de Envio',
      'Visualizado no Site em', 'Validado no Site em', 'Validado por'
    ]),
    ...evaluations.map((ev): Cell[] => {
      const supplier = suppliers.find(s => s.id === ev.fornecedorId);
      const plan = actionPlans.find(p => p.evaluationId === ev.id);
      const envio = getLastEnvio(ev);
      return [
        { value: ev.ano, type: Number },
        supplier?.nomeFantasia || ev.fornecedorId,
        supplier?.cnpj || '',
        supplier?.numeroContrato || '',
        sectors.find(s => s.id === ev.setorId)?.nome || ev.setorId,
        ev.gestorAvaliador,
        ev.dataAvaliacao,
        score(ev.mediaLegais),
        score(ev.mediaComportamentais),
        score(ev.mediaQualidade),
        score(ev.mediaGeral),
        getMetaBadgeDetails(ev.statusMeta, ev.mediaGeral)?.label || '',
        ev.necessitaPlanoAcao ? 'Obrigatório' : 'Não',
        plan ? PLAN_LABELS[plan.status] || plan.status : ev.necessitaPlanoAcao ? 'Não cadastrado' : '-',
        SIGN_LABELS[ev.statusAssinatura] || ev.statusAssinatura,
        envio ? formatDateTime(envio.dataHora) : '-',
        envio?.destinatario || '-',
        ev.visualizacaoFornecedor ? formatDateTime(ev.visualizacaoFornecedor.dataHora) : '-',
        ev.validacaoFornecedor ? formatDateTime(ev.validacaoFornecedor.dataHora) : '-',
        ev.validacaoFornecedor ? `${ev.validacaoFornecedor.nome} (${ev.validacaoFornecedor.email})` : '-'
      ];
    })
  ];

  const today = new Date().toISOString().split('T')[0];
  await writeXlsxFile(rows, {
    sheet: 'Avaliações',
    columns: [
      { width: 7 }, { width: 36 }, { width: 20 }, { width: 22 }, { width: 28 }, { width: 28 }, { width: 12 },
      { width: 10 }, { width: 16 }, { width: 11 }, { width: 12 }, { width: 16 }, { width: 14 }, { width: 16 }, { width: 20 }, { width: 18 }, { width: 32 }, { width: 18 }, { width: 18 }, { width: 36 }
    ],
    stickyRowsCount: 1
  }).toFile(`Avaliacoes_SLA_${today}.xlsx`);
}

// ---------------------------------------------------------------------------
// Backup completo (JSON) para o administrador guardar fora do sistema
// ---------------------------------------------------------------------------
export function downloadFullBackup(): { total: number } {
  const collections = {
    users: StorageService.getUsers().map(({ senha: _textoAntigo, ...u }) => u),
    sectors: StorageService.getSectors(),
    suppliers: StorageService.getSuppliers(),
    evaluations: StorageService.getEvaluations(),
    action_plans: StorageService.getActionPlans()
  };
  const total = Object.values(collections).reduce((sum, list) => sum + list.length, 0);
  const backup = { sistema: "SLA de Fornecedores - Rede D'Or", geradoEm: new Date().toISOString(), versao: 1, total, collections };

  const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `Backup_SLA_Fornecedores_${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return { total };
}
