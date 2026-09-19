// Serviço de envio de e-mails transacionais via EmailJS REST API (sem necessidade de backend)

interface EmailParams {
  to_email: string;
  to_name: string;
  reset_code: string;
  app_name?: string;
}

export class EmailService {
  private static SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  private static TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  private static PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  /**
   * Verifica se as credenciais do EmailJS estão configuradas no .env
   */
  static isConfigured(): boolean {
    return Boolean(this.SERVICE_ID && this.TEMPLATE_ID && this.PUBLIC_KEY);
  }

  /**
   * Dispara o e-mail com o código de redefinição de senha para o usuário
   */
  static async sendPasswordResetEmail(params: EmailParams): Promise<{ success: boolean; simulated: boolean; error?: string }> {
    const payload = {
      service_id: this.SERVICE_ID,
      template_id: this.TEMPLATE_ID,
      user_id: this.PUBLIC_KEY,
      template_params: {
        to_email: params.to_email,
        to_name: params.to_name,
        reset_code: params.reset_code,
        app_name: params.app_name || "Rede D'Or - Gestão de SLA",
        timestamp: new Date().toLocaleString('pt-BR')
      }
    };

    // Se não estiver configurado com chaves reais do EmailJS, opera em modo Simulado / Dev
    if (!this.isConfigured()) {
      console.warn(
        `[EmailService: MODO SIMULADO] EmailJS não configurado no .env.\n` +
        `Código de recuperação para ${params.to_email} (${params.to_name}): ${params.reset_code}`
      );
      // Simula uma latência de rede realista de 600ms
      await new Promise(resolve => setTimeout(resolve, 600));
      return { success: true, simulated: true };
    }

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[EmailService] Erro ao enviar e-mail via EmailJS:', errorText);
        return { success: false, simulated: false, error: errorText };
      }

      return { success: true, simulated: false };
    } catch (err: any) {
      console.error('[EmailService] Falha de conexão ao enviar e-mail:', err);
      return { success: false, simulated: false, error: err?.message || 'Erro de conexão' };
    }
  }
}
