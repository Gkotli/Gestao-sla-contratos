import type { Evaluation, Supplier } from '../types';

// Caixas de e-mail de setor/empresa: não são o nome de uma pessoa
const GENERIC_MAILBOXES = [
  'contato', 'comercial', 'vendas', 'atendimento', 'operacional', 'qualidade', 'imprensa', 'financeiro',
  'suporte', 'sac', 'adm', 'administrativo', 'faleconosco', 'compras', 'juridico', 'rh', 'contratos',
  'info', 'noreply', 'no-reply', 'nfe', 'fiscal', 'cobranca', 'orcamento', 'servicos', 'tecnico',
  'engenharia', 'manutencao', 'diretoria', 'gerencia', 'secretaria', 'recepcao', 'licitacao', 'email', 'mail'
];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

// "milton.ueno@vyttra.com" → "Milton"; "operacional3@…", "vendas@…", "acquasuly@acquasuly.com.br" → null
export function firstNameFromEmail(email: string): string | null {
  const [local, domain = ''] = email.trim().toLowerCase().split('@');
  if (!local || /\d/.test(local)) return null;
  const parts = local.split(/[._-]+/).filter(Boolean);
  const first = parts[0];
  if (!first || first.length < 3 || !/^[a-z]+$/.test(first)) return null;
  if (GENERIC_MAILBOXES.some(g => first.startsWith(g))) return null;
  // Nome da empresa usado como caixa de e-mail (ex.: engepower@engepower.com)
  if (domain.replace(/[^a-z]/g, '').includes(first)) return null;
  return capitalize(first);
}

export interface SupplierContactDisplay {
  principal: string;      // o que aparece em destaque
  detalhe?: string;       // linha de apoio (e-mail ou telefone)
  nomePessoa?: string;    // nome de uma pessoa, quando identificado (assinatura, saudação)
}

// Contato a exibir no laudo: nome cadastrado → e-mail (cadastrado ou para onde o laudo foi enviado) → fornecedor
export function getSupplierContact(supplier?: Supplier, evaluation?: Evaluation | null): SupplierContactDisplay {
  const telefone = supplier?.contatoTelefone?.trim();
  const nome = supplier?.contatoNome?.trim();
  const envios = evaluation?.historicoEnvios || [];
  const email = supplier?.contatoEmail?.trim() || envios[envios.length - 1]?.destinatario?.trim();

  if (nome) {
    return { principal: nome, detalhe: telefone || email || undefined, nomePessoa: nome };
  }
  if (email) {
    const primeiroNome = firstNameFromEmail(email);
    return primeiroNome
      ? { principal: primeiroNome, detalhe: email, nomePessoa: primeiroNome }
      : { principal: email, detalhe: telefone || undefined };
  }
  if (telefone) {
    return { principal: telefone };
  }
  const fornecedor = supplier?.nomeFantasia || supplier?.razaoSocial;
  return { principal: fornecedor ? `Representante – ${fornecedor}` : 'Representante do fornecedor' };
}
