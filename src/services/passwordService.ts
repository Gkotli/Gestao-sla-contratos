// Senhas: o sistema guarda só o hash (SHA-256 com o e-mail como "sal"), nunca a senha em texto.
// Contas antigas ainda têm `senha` em texto (ou nenhuma, valendo a padrão "123"): elas entram
// uma última vez com a senha antiga e são obrigadas a criar uma nova.

import { User } from '../types';

const LEGACY_DEFAULT_PASSWORD = '123';

export async function hashPassword(email: string, senha: string): Promise<string> {
  const bytes = new TextEncoder().encode(`sla-rededor:v1:${email.toLowerCase().trim()}:${senha}`);
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  return Array.from(digest).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(user: User, senha: string): Promise<boolean> {
  if (user.senhaHash) {
    return (await hashPassword(user.email, senha)) === user.senhaHash;
  }
  return (user.senha || LEGACY_DEFAULT_PASSWORD) === senha;
}

// Conta ainda sem senha própria: sem hash, ou com senha provisória definida pelo administrador
export function mustChangePassword(user: User): boolean {
  return !user.senhaHash || Boolean(user.precisaTrocarSenha);
}

// Retorna a mensagem de erro, ou null se a senha é aceitável
export function validateNewPassword(senha: string, email: string): string | null {
  if (senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
  if (!/[A-Za-z]/.test(senha) || !/[0-9]/.test(senha)) return 'A senha deve ter letras e números.';
  const localPart = email.split('@')[0].toLowerCase();
  if (localPart.length >= 4 && senha.toLowerCase().includes(localPart)) return 'A senha não pode conter o seu e-mail.';
  if (/^(.)\1+$/.test(senha) || /^(?:0?123456789?|12345678|abc12345|senha123|password1)$/i.test(senha)) {
    return 'Essa senha é fácil demais de adivinhar. Escolha outra.';
  }
  return null;
}

// Usuário com a nova senha aplicada (remove a senha em texto, se ainda existir)
export async function withNewPassword(user: User, senha: string, provisoria = false): Promise<User> {
  const { senha: _textoAntigo, ...rest } = user;
  return { ...rest, senhaHash: await hashPassword(user.email, senha), precisaTrocarSenha: provisoria };
}
