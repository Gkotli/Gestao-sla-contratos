// Ocultar e-mails e textos sensíveis para exibição segura
export function maskSensitiveText(text: string): string {
  return '••••••••';
}

// Administrador do sistema (gestão de usuários): identificado pelo ID/e-mail cadastrado,
// nunca pelo nome exibido — qualquer usuário poderia se chamar "Gabriel".
const SYSTEM_ADMIN_IDS = ['usr_gabriel'];
const SYSTEM_ADMIN_EMAILS = ['gabriel.kotliarenko@vilanovastar.com.br'];

export function isSystemAdmin(user?: { id?: string; email?: string; role?: string } | null): boolean {
  if (!user || user.role !== 'DIRETORIA') return false;
  const email = (user.email || '').toLowerCase().trim();
  return SYSTEM_ADMIN_IDS.includes(user.id || '') || SYSTEM_ADMIN_EMAILS.includes(email);
}
