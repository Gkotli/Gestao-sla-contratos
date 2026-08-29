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
