// Função de Hash Criptográfico Irreversível (SHA-256) para senhas
export async function hashPassword(plainTextPassword: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainTextPassword);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

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
