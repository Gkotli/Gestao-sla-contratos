// Exportação de avaliações para PDF (laudo A4) e Excel (.xlsx).
// As bibliotecas pesadas (jsPDF, html2canvas, write-excel-file) só são baixadas no clique.

import type { SheetData, Cell } from 'write-excel-file/browser';
import { ActionPlan, Evaluation, ScoreValue, Sector, SignStatus, Supplier } from '../types';
import { EVALUATION_QUESTIONS } from './questions';
import { getMetaBadgeDetails } from './evaluationCalculation';

const SIGN_LABELS: Record<SignStatus, string> = {
  PENDENTE_ENVIO: 'Não enviado',
  ENVIADO_FORNECEDOR: 'Aguardando ciência',
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
  if (evaluation.perguntasAvaliadas?.length) {
    return evaluation.perguntasAvaliadas.map(q => ({
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
  typeof value === 'number' && Number.isFinite(value) ? { value, type: Number, format: '0.00' } : '-';

const notaCell = (nota: ScoreValue | undefined): Cell =>
  nota === 'NA' ? 'N/A' : typeof nota === 'number' ? { value: nota, type: Number } : '-';

const header = (labels: string[]): Cell[] =>
  labels.map(value => ({ value, fontWeight: 'bold' as const, backgroundColor: '#123768', color: '#FFFFFF' }));

// ---------------------------------------------------------------------------
// PDF: captura o laudo já renderizado na tela e divide em páginas A4
// ---------------------------------------------------------------------------
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

  for (let offset = 0, page = 0; offset < canvas.height; offset += sliceHeightPx, page++) {
    const slice = document.createElement('canvas');
    slice.width = canvas.width;
    slice.height = Math.min(sliceHeightPx, canvas.height - offset);
    slice.getContext('2d')!.drawImage(canvas, 0, offset, canvas.width, slice.height, 0, 0, canvas.width, slice.height);

    if (page > 0) pdf.addPage();
    pdf.addImage(slice.toDataURL('image/jpeg', 0.92), 'JPEG', margin, margin, pageWidth, (slice.height * pageWidth) / canvas.width);
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
      'Plano de Ação', 'Status do Plano', 'Ciência do Fornecedor'
    ]),
    ...evaluations.map((ev): Cell[] => {
      const supplier = suppliers.find(s => s.id === ev.fornecedorId);
      const plan = actionPlans.find(p => p.evaluationId === ev.id);
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
        SIGN_LABELS[ev.statusAssinatura] || ev.statusAssinatura
      ];
    })
  ];

  const today = new Date().toISOString().split('T')[0];
  await writeXlsxFile(rows, {
    sheet: 'Avaliações',
    columns: [
      { width: 7 }, { width: 36 }, { width: 20 }, { width: 22 }, { width: 28 }, { width: 28 }, { width: 12 },
      { width: 10 }, { width: 16 }, { width: 11 }, { width: 12 }, { width: 16 }, { width: 14 }, { width: 16 }, { width: 20 }
    ],
    stickyRowsCount: 1
  }).toFile(`Avaliacoes_SLA_${today}.xlsx`);
}
