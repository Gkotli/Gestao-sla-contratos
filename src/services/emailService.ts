// Serviço de envio de e-mails transacionais via EmailJS REST API (sem necessidade de backend)

interface EmailParams {
  to_email: string;
  to_name: string;
  reset_code: string;
  app_name?: string;
}

export class EmailService {
  private static SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_kv5ieuj';
  private static TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_bs47hhd';
  private static PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Dy9FmT3Vtvp4dKu7u';

  /**
   * Verifica se as credenciais do EmailJS estão configuradas
   */
  static isConfigured(): boolean {
    return Boolean(this.SERVICE_ID && this.TEMPLATE_ID && this.PUBLIC_KEY);
  }

  /**
   * Dispara o e-mail com o código de redefinição de senha para o usuário
   */
  static async sendPasswordResetEmail(params: EmailParams): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured()) {
      return { success: false, error: 'Serviço de e-mail temporariamente indisponível. Contate o suporte.' };
    }

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
        return { success: false, error: 'Falha no serviço de e-mail. Tente novamente mais tarde.' };
      }

      return { success: true };
    } catch (err: any) {
      console.error('[EmailService] Falha de conexão ao enviar e-mail:', err);
      return { success: false, error: err?.message || 'Erro de conexão' };
    }
  }
}
