import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { Building2, Lock, Mail, ShieldCheck, ChevronRight, AlertCircle, CheckCircle2, X, KeyRound, Eye, EyeOff, RefreshCw, Info } from 'lucide-react';
import { AuthService } from '../services/authService';

const MIN_PASSWORD_LENGTH = 8;

interface SetPasswordRequest {
  email: string;
  reason: 'invite' | 'recovery';
  onCancel: () => void;
}

interface LoginPageProps {
  // true = login pelo Supabase Auth; false = modo local de demonstração (sem senha)
  remote: boolean;
  users?: User[];
  onLocalLogin?: (user: User) => void;
  notice?: string | null;
  // Presente quando o usuário abriu um link de convite ou de recuperação de senha
  setPassword?: SetPasswordRequest;
}

const inputClass = 'w-full pl-10 pr-3 py-2.5 bg-white border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md focus:ring-2 focus:ring-[#123768] focus:border-[#123768] font-medium transition';
const primaryButtonClass = 'w-full py-3 text-xs font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow-sm transition-colors cursor-pointer flex items-center justify-center disabled:opacity-60';

const ErrorAlert: React.FC<{ message: string }> = ({ message }) => (
  <div className="p-3 bg-rose-50 border border-[#FECACA] text-[#B91C1C] text-xs rounded-md flex items-center space-x-2">
    <AlertCircle className="w-4 h-4 text-[#B91C1C] flex-shrink-0" />
    <span>{message}</span>
  </div>
);

const InfoAlert: React.FC<{ message: string }> = ({ message }) => (
  <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] text-xs rounded-md flex items-start space-x-2">
    <Info className="w-4 h-4 text-[#123768] flex-shrink-0 mt-0.5" />
    <span className="leading-relaxed">{message}</span>
  </div>
);

// Campo de senha com botão de mostrar/ocultar
const PasswordInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
}> = ({ value, onChange, placeholder, autoComplete }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${inputClass} pr-9`}
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="absolute right-3 top-3 text-slate-400 hover:text-[#475569] cursor-pointer"
        title={visible ? 'Ocultar senha' : 'Mostrar senha'}
      >
        {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
};

// Criar senha (convite) ou redefinir senha (link de recuperação)
const SetPasswordForm: React.FC<SetPasswordRequest> = ({ email, reason, onCancel }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`);
      return;
    }
    if (password !== confirm) {
      setError('As senhas digitadas não coincidem.');
      return;
    }
    setLoading(true);
    const result = await AuthService.updatePassword(password);
    setLoading(false);
    if (result) setError(result);
    // Sucesso: o App recebe a sessão atualizada e abre o sistema
  };

  return (
    <>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#172B4D] tracking-tight">
          {reason === 'invite' ? 'Criar senha de acesso' : 'Redefinir senha'}
        </h2>
        <p className="text-xs text-[#475569] mt-1">
          {reason === 'invite' ? 'Bem-vindo(a)! Defina a senha que você usará para entrar.' : 'Crie uma nova senha para o seu acesso.'}
          <br />
          <strong className="text-[#172B4D]">{email}</strong>
        </p>
      </div>

      {error && <ErrorAlert message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#172B4D] mb-1.5">Nova senha</label>
          <PasswordInput value={password} onChange={setPassword} placeholder={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres`} autoComplete="new-password" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#172B4D] mb-1.5">Confirmar nova senha</label>
          <PasswordInput value={confirm} onChange={setConfirm} placeholder="Repita a nova senha" autoComplete="new-password" />
        </div>
        <button type="submit" disabled={loading} className={primaryButtonClass}>
          {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Salvar senha e entrar'}
        </button>
      </form>

      <button
        type="button"
        onClick={onCancel}
        className="w-full text-[11px] font-semibold text-[#475569] hover:text-[#123768] hover:underline cursor-pointer"
      >
        Cancelar e sair
      </button>
    </>
  );
};

export const LoginPage: React.FC<LoginPageProps> = ({ remote, users = [], onLocalLogin, notice, setPassword }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal "Esqueci minha senha": o Supabase envia um link para criar a nova senha
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!remote) {
      const foundUser = users.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());
      if (foundUser) {
        onLocalLogin?.(foundUser);
      } else {
        setErrorMsg('E-mail não cadastrado na base de demonstração.');
      }
      return;
    }

    setLoading(true);
    const error = await AuthService.signIn(email, senha);
    setLoading(false);
    if (error) setErrorMsg(error);
    // Sucesso: o App recebe a sessão pelo AuthService e abre o sistema
  };

  const handleOpenForgot = () => {
    setIsForgotModalOpen(true);
    setForgotEmail(email.trim());
    setForgotError('');
    setForgotSent(false);
  };

  const handleSendResetLink = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setForgotError('');
    setForgotLoading(true);
    const error = await AuthService.sendPasswordReset(forgotEmail);
    setForgotLoading(false);
    if (error) {
      setForgotError(error);
      return;
    }
    setForgotSent(true);
    setResendCooldown(60);
  };

  const renderCardContent = () => {
    if (setPassword) return <SetPasswordForm {...setPassword} />;

    return (
      <>
        {/* Cabeçalho do Card */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172B4D] tracking-tight">
            Acesso ao sistema
          </h2>
          <p className="text-xs text-[#475569] mt-1">
            {remote ? 'Informe suas credenciais corporativas para continuar.' : 'Informe um e-mail da base de demonstração para continuar.'}
          </p>
        </div>

        {!remote && (
          <InfoAlert message="Modo local de demonstração: o Supabase não está configurado. Os dados ficam apenas neste navegador e não há senha. Não use este modo com dados reais." />
        )}

        {notice && <InfoAlert message={notice} />}
        {errorMsg && <ErrorAlert message={errorMsg} />}

        {/* Formulário de Login */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#172B4D] mb-1.5">
              E-mail corporativo
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                placeholder="seu.nome@hospital.com.br"
                className={inputClass}
              />
            </div>
          </div>

          {remote && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#172B4D]">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={handleOpenForgot}
                  className="text-[11px] font-semibold text-[#123768] hover:underline cursor-pointer"
                >
                  Esqueci minha senha
                </button>
              </div>
              <PasswordInput value={senha} onChange={setSenha} placeholder="••••••••••••" autoComplete="current-password" />
            </div>
          )}

          {/* Botão Entrar em Azul Institucional */}
          <button type="submit" disabled={loading} className={primaryButtonClass}>
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Entrar'}
          </button>
        </form>

        {/* Acesso rápido: só no modo local de demonstração */}
        {!remote && (
          <>
            <div className="relative pt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#CBD5E1]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                <span className="bg-white px-3 text-[#475569]">ACESSO RÁPIDO (DEMONSTRAÇÃO)</span>
              </div>
            </div>

            <div className="space-y-2">
              {users
                .filter(u => u.role === 'DIRETORIA')
                .slice(0, 1)
                .map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => onLocalLogin?.(u)}
                    className="w-full p-3 bg-slate-50 hover:bg-slate-100/80 border border-[#CBD5E1] rounded-md text-left transition flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded border border-[#CBD5E1] text-[#475569]">
                        <Building2 className="w-4 h-4 text-[#475569]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-[#475569] block">Conta de demonstração</span>
                        <strong className="text-[#172B4D] text-xs font-bold block">{u.nome}</strong>
                        <span className="text-[11px] text-[#475569] block truncate">{u.email}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#172B4D]" />
                  </button>
                ))}
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col md:flex-row font-sans text-[#172B4D] overflow-x-hidden">

      {/* ================================================== */}
      {/* 1. LADO ESQUERDO: PAINEL INSTITUCIONAL AZUL (40%)  */}
      {/* ================================================== */}
      <div className="w-full md:w-[40%] bg-[#123768] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden min-h-[400px] md:min-h-screen">

        {/* Detalhes gráficos discretos de fundo (linhas curvas institucionais) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="700" r="350" stroke="white" strokeWidth="2" />
            <circle cx="100" cy="700" r="450" stroke="white" strokeWidth="1.5" />
            <circle cx="100" cy="700" r="550" stroke="white" strokeWidth="1" />
          </svg>
        </div>


        {/* Centro: Título e Descrição Institucional */}
        <div className="relative z-10 my-8 md:my-auto space-y-4">
          <div className="w-12 h-1 bg-white/70 rounded-full" />

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            SLA de<br />Fornecedores
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md font-medium">
            Sistema interno da Diretoria Operacional para a avaliação anual de desempenho dos contratos.
          </p>
        </div>

        {/* Rodapé do Painel Esquerdo: Mensagem de Acesso Restrito */}
        <div className="relative z-10 pt-6 border-t border-white/15">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <ShieldCheck className="w-4 h-4 text-slate-300 flex-shrink-0" />
            <span>Acesso restrito a usuários autorizados</span>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. LADO DIREITO: ÁREA DE LOGIN CORPORATIVA (60%)   */}
      {/* ================================================== */}
      <div className="w-full md:w-[60%] bg-[#F1F5F9] flex flex-col justify-between p-6 sm:p-12 lg:p-14 min-h-screen">

        <div className="flex-1 flex items-center justify-center py-6">
          {/* Card de Login Corporativo */}
          <div className="bg-white w-full max-w-md rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#CBD5E1] p-8 sm:p-10 space-y-6">

            {/* Logo Oficial em Destaque Centralizada */}
            <div className="flex justify-center pt-1 pb-2">
              <img
                src="/assets/branding/rede-dor-header-logo.png"
                alt="Rede D'Or"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </div>

            {renderCardContent()}
          </div>
        </div>

        {/* Rodapé Corporativo Direita */}
        <div className="pt-6 border-t border-[#CBD5E1] flex flex-col lg:flex-row items-center justify-between gap-3 text-[11px] text-[#475569]">
          <div className="flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>
              <strong className="text-[#172B4D]">Acesso corporativo restrito</strong> — Uso exclusivo para fins institucionais. Registro e monitoramento aplicados.
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[#475569] font-medium">
            <span>© 2026 Hospital Operacional de Excelência</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => alert('Política de Segurança da Informação Hospitalar\n\nTodos os acessos são auditados e registrados em conformidade com as diretrizes institucionais.')}
              className="hover:text-[#123768] hover:underline cursor-pointer"
            >
              Política de Segurança
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Esqueci Minha Senha (link enviado pelo Supabase Auth) */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl border border-[#CBD5E1] p-6 space-y-4 text-xs text-[#172B4D]">
            {/* Header do Modal */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#123768]/10 flex items-center justify-center text-[#123768]">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#172B4D]">Recuperação de Senha</h3>
                  <p className="text-[11px] text-[#475569]">Autoatendimento seguro via e-mail</p>
                </div>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="text-slate-400 hover:text-[#172B4D] text-lg font-bold cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {forgotError && (
              <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] rounded-md flex items-start space-x-2 text-xs">
                <AlertCircle className="w-4 h-4 text-[#B91C1C] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{forgotError}</span>
              </div>
            )}

            {forgotSent ? (
              <div className="p-5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded-md space-y-3 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#047857]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm text-[#047857]">Verifique seu e-mail</h4>
                <p className="text-xs leading-relaxed text-[#172B4D]">
                  Se <strong>{forgotEmail}</strong> estiver cadastrado, você receberá um link para criar uma nova senha.
                  Confira também a caixa de spam. O link vale por tempo limitado e só pode ser usado uma vez.
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#475569] pt-1">
                  <span>Não recebeu?</span>
                  {resendCooldown > 0 ? (
                    <span className="text-[#475569] font-medium">Reenviar em {resendCooldown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSendResetLink()}
                      disabled={forgotLoading}
                      className="text-[#123768] font-bold hover:underline cursor-pointer flex items-center space-x-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reenviar link</span>
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="w-full py-2.5 bg-[#123768] hover:bg-[#0B2850] text-white font-bold rounded-md shadow transition cursor-pointer"
                >
                  Voltar ao login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendResetLink} className="space-y-4">
                <p className="text-[#475569] leading-relaxed">
                  Informe seu e-mail corporativo cadastrado. Enviaremos um link seguro para você criar uma nova senha.
                </p>

                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">E-mail Corporativo *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                      placeholder="seu.nome@hospital.com.br"
                      className="w-full bg-white border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#172B4D] rounded-md font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="px-5 py-2 bg-[#123768] hover:bg-[#0B2850] text-white font-bold rounded-md shadow flex items-center space-x-2 disabled:opacity-60 cursor-pointer"
                  >
                    {forgotLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <span>Enviar link</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
