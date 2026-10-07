// Fornecedores apresentados na auditoria da JCI (aba "JCI - FORNECEDORES" da planilha CONTRATOS VNS).
// A lista padrão vale enquanto o cadastro não marcar/desmarcar "Auditoria JCI" explicitamente.
import { Supplier } from '../types';

// CNPJs (só dígitos) dos fornecedores pré-definidos
const CNPJS_JCI = new Set([
  '48757090000277', // Davita (Nefrologia)
  '10808204000107', // GSH - Banco de Sangue
  '39615127000150', // VO2 Care (Fisioterapia)
  '22685201000102', // Núcleo Pró-Creare (Psicologia)
  '55992660000198', // CEAF DUE (Fonoaudiologia), contrato VNS25-002-00
  '33440921000124', // CEAF (Fonoaudiologia), contrato anterior
  '00973749001430', // Top Service (Higiene)
  '60537263000166', // Allpark (Estacionamento)
  '18126361000144', // KPM Service (Ar-condicionado)
  '33497095000150', // Grupo Portinari (Lavanderia)
  '04365440000101', // Dunamis (Segurança Física)
  '14660551000196'  // Roland Villard / R&7 Gastronomia (Chefe de Cozinha)
]);

// Reserva por nome, caso o CNPJ do cadastro esteja vazio ou diferente
const NOMES_JCI = /davita|catene|\bgsh\b|g\s+s\s+h|banco de sangue|vo2\s*care|pr[oó][\s-]*creare|\bceaf\b|top service|allpark|\bkpm\b|portinari|dunamis|r\s*&\s*7|\bre7\b|roland villard/i;

export function isPadraoJCI(sup: Supplier): boolean {
  const cnpj = (sup.cnpj || '').replace(/\D/g, '');
  if (cnpj && CNPJS_JCI.has(cnpj)) return true;
  return NOMES_JCI.test(`${sup.nomeFantasia} ${sup.razaoSocial}`);
}

export function isFornecedorJCI(sup: Supplier): boolean {
  return sup.auditoriaJCI ?? isPadraoJCI(sup);
}
