// Atualização dos contatos dos fornecedores em lote, por planilha Excel.
// Fluxo: baixar o modelo (já com os fornecedores cadastrados) -> preencher -> enviar -> conferir -> aplicar.
// Células em branco não apagam nada: só o que foi preenchido e mudou é atualizado.

import type { Cell, SheetData } from 'write-excel-file/browser';
import { Sector, Supplier } from '../types';
import { isValidEmail } from './laudoEnvioService';

const HEADERS = ['ID (não alterar)', 'Fornecedor', 'Razão Social', 'CNPJ', 'Nº Contrato', 'Setor', 'Contato (nome)', 'E-mail', 'Telefone'];

export interface ContactChange {
  supplier: Supplier;
  linha: number;
  novo: Pick<Supplier, 'contatoNome' | 'contatoEmail' | 'contatoTelefone'>;
  campos: string[];
}

export interface ContactImportResult {
  changes: ContactChange[];
  errors: { linha: number; motivo: string }[];
  semAlteracao: number;
}

const normalize = (text: unknown) =>
  String(text ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

const onlyDigits = (text: unknown) => String(text ?? '').replace(/\D/g, '');

export async function downloadContactsTemplate(suppliers: Supplier[], sectors: Sector[]): Promise<void> {
  const { default: writeXlsxFile } = await import('write-excel-file/browser');
  const header: Cell[] = HEADERS.map(value => ({ value, fontWeight: 'bold' as const, backgroundColor: '#123768', color: '#FFFFFF' }));
  const rows: SheetData = [
    header,
    ...[...suppliers]
      .sort((a, b) => a.nomeFantasia.localeCompare(b.nomeFantasia, 'pt-BR'))
      .map((s): Cell[] => [
        s.id,
        s.nomeFantasia,
        s.razaoSocial,
        s.cnpj,
        s.numeroContrato,
        sectors.find(sec => sec.id === s.setorResponsavelId)?.nome || '',
        s.contatoNome || '',
        s.contatoEmail || '',
        s.contatoTelefone || ''
      ])
  ];
  await writeXlsxFile(rows, {
    sheet: 'Contatos',
    columns: [{ width: 22 }, { width: 34 }, { width: 38 }, { width: 20 }, { width: 18 }, { width: 26 }, { width: 28 }, { width: 34 }, { width: 18 }],
    stickyRowsCount: 1
  }).toFile(`Contatos_Fornecedores_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

export async function parseContactsFile(file: File, suppliers: Supplier[]): Promise<ContactImportResult> {
  const { readSheet } = await import('read-excel-file/browser');
  const data = await readSheet(file);
  if (data.length < 2) throw new Error('A planilha está vazia.');

  // Localiza as colunas pelo título (aceita a ordem trocada)
  const titles = data[0].map(normalize);
  const col = (...names: string[]) => titles.findIndex(t => names.some(n => t.startsWith(normalize(n))));
  const idx = {
    id: col('ID'),
    cnpj: col('CNPJ'),
    nome: col('Contato (nome)', 'Contato', 'Nome do contato'),
    email: col('E-mail', 'Email'),
    telefone: col('Telefone', 'Fone', 'Celular')
  };
  if (idx.email < 0 && idx.nome < 0 && idx.telefone < 0) {
    throw new Error('Não encontrei as colunas "Contato (nome)", "E-mail" ou "Telefone". Use a planilha modelo.');
  }
  if (idx.id < 0 && idx.cnpj < 0) {
    throw new Error('A planilha precisa da coluna "ID (não alterar)" ou "CNPJ" para identificar o fornecedor.');
  }

  const byId = new Map(suppliers.map(s => [s.id, s]));
  const byCnpj = new Map(suppliers.filter(s => onlyDigits(s.cnpj)).map(s => [onlyDigits(s.cnpj), s]));
  const result: ContactImportResult = { changes: [], errors: [], semAlteracao: 0 };
  const vistos = new Set<string>();

  data.slice(1).forEach((row, i) => {
    const linha = i + 2;
    const cell = (index: number) => (index >= 0 ? String(row[index] ?? '').trim() : '');
    if (row.every(v => v === null || String(v).trim() === '')) return;

    const supplier = byId.get(cell(idx.id)) || byCnpj.get(onlyDigits(cell(idx.cnpj)));
    if (!supplier) {
      result.errors.push({ linha, motivo: 'Fornecedor não encontrado (confira o ID ou o CNPJ).' });
      return;
    }
    if (vistos.has(supplier.id)) {
      result.errors.push({ linha, motivo: `${supplier.nomeFantasia} aparece mais de uma vez; esta linha foi ignorada.` });
      return;
    }
    vistos.add(supplier.id);

    const email = cell(idx.email).toLowerCase();
    if (email && !isValidEmail(email)) {
      result.errors.push({ linha, motivo: `E-mail inválido para ${supplier.nomeFantasia}: "${email}".` });
      return;
    }

    const novo = {
      contatoNome: cell(idx.nome) || supplier.contatoNome,
      contatoEmail: email || supplier.contatoEmail,
      contatoTelefone: cell(idx.telefone) || supplier.contatoTelefone
    };
    const campos = [
      novo.contatoNome !== supplier.contatoNome && 'Contato',
      novo.contatoEmail !== supplier.contatoEmail && 'E-mail',
      novo.contatoTelefone !== supplier.contatoTelefone && 'Telefone'
    ].filter((c): c is string => Boolean(c));

    if (campos.length) result.changes.push({ supplier, linha, novo, campos });
    else result.semAlteracao++;
  });

  return result;
}
