import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, ChevronRight, AlertCircle, HelpCircle, CheckCircle2, X, KeyRound, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { EmailService } from '../services/emailService';

interface LoginPageProps {
  users: User[];
  onLoginSuccess: (user: User) => void;
  onPasswordReset?: (updatedUser: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ users, onLoginSuccess, onPasswordReset }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Modal de Esqueci minha senha (Fluxo de 3 etapas)
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotCode, setForgotCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccessMsg, setForgotSuccessMsg] = useState('');
  const [demoCodeNotice, setDemoCodeNotice] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const foundUser = users.find(
      u => u.email.toLowerCase().trim() === email.toLowerCase().trim() && (u.senha || '123') === senha
    );

    if (foundUser) {
      onLoginSuccess(foundUser);
    } else {
      setErrorMsg('E-mail ou senha incorretos. Por favor, verifique as credenciais informadas.');
    }
  };

  const handleQuickLogin = (user: User) => {
    setEmail(user.email);
    setSenha(user.senha || '123');
    onLoginSuccess(user);
  };

  const handleOpenForgot = () => {
    setIsForgotModalOpen(true);
    setForgotStep(1);
    setForgotEmail(email.trim());
    setForgotCode('');
    setNewPassword('');
    setConfirmPassword('');
    setForgotError('');
    setForgotSuccessMsg('');
    setDemoCodeNotice(null);
  };

  // Etapa 1: Enviar Código para o E-mail
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotLoading(true);

    const targetUser = users.find(
      u => u.email.toLowerCase().trim() === forgotEmail.toLowerCase().trim()
    );

    if (!targetUser) {
      setForgotLoading(false);
      setForgotError('E-mail corporativo não encontrado na base de usuários. Verifique se digitou corretamente.');
      return;
    }

    // Gerar código criptograficamente seguro de 6 dígitos
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const code = String(100000 + (randomArray[0] % 900000));

    // Salvar código com validade de 15 minutos
    StorageService.savePasswordResetCode(forgotEmail, code, 15);

    // Disparar e-mail via EmailService
    const result = await EmailService.sendPasswordResetEmail({
      to_email: targetUser.email,
      to_name: targetUser.nome,
      reset_code: code
    });

    setForgotLoading(false);

    if (result.success) {
      if (result.simulated) {
        setDemoCodeNotice(code);
      }
      setForgotStep(2);
      setResendCooldown(60);
    } else {
      setForgotError(result.error || 'Falha ao enviar e-mail. Tente novamente.');
    }
  };

  // Etapa 2: Validar Código de 6 Dígitos
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');

    const check = StorageService.verifyPasswordResetCode(forgotEmail, forgotCode);
    if (!check.valid) {
      setForgotError(check.message || 'Código inválido.');
      return;
    }

    setForgotStep(3);
  };

  // Etapa 3: Redefinir Senha
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');

    if (newPassword.length < 4) {
      setForgotError('A nova senha deve ter pelo menos 4 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError('As senhas digitadas não coincidem.');
      return;
    }

    const updatedUser = StorageService.updateUserPassword(forgotEmail, newPassword);

    if (updatedUser) {
      onPasswordReset?.(updatedUser);
      setEmail(forgotEmail);
      setSenha(newPassword);
      setForgotSuccessMsg('Sua senha foi redefinida com sucesso! Você já pode entrar com sua nova senha.');
    } else {
      setForgotError('Não foi possível atualizar a senha. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col md:flex-row font-sans text-slate-900 overflow-x-hidden">
      
      {/* ================================================== */}
      {/* 1. LADO ESQUERDO: PAINEL INSTITUCIONAL AZUL (40%)  */}
      {/* ================================================== */}
      <div className="w-full md:w-[40%] bg-[#073066] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden min-h-[400px] md:min-h-screen">
        
        {/* Detalhes gráficos discretos de fundo (linhas curvas institucionais) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="700" r="350" stroke="white" strokeWidth="2" />
            <circle cx="100" cy="700" r="450" stroke="white" strokeWidth="1.5" />
            <circle cx="100" cy="700" r="550" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        {/* Topo: Logo Oficial */}
        <div className="relative z-10">
          <div className="inline-block bg-white p-2.5 rounded-lg shadow-md border border-slate-200">
            <img
              src="/logo-rede-dor.webp"
              alt="Logo Rede D'Or"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
        </div>

        {/* Centro: Título e Descrição Institucional */}
        <div className="relative z-10 my-8 md:my-auto space-y-4">
          <div className="w-12 h-1 bg-sky-400 rounded-full" />
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Gestão de SLA e<br />Avaliação de Contratos
          </h1>
          
          <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed max-w-md font-medium">
            Sistema interno da Diretoria Operacional para acompanhamento de contratos, SLA e avaliações anuais.
          </p>
        </div>

        {/* Rodapé do Painel Esquerdo: Mensagem de Acesso Restrito */}
        <div className="relative z-10 pt-6 border-t border-white/15">
          <div className="flex items-center space-x-2 text-xs font-semibold text-sky-200/90">
            <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <span>Acesso restrito a usuários autorizados</span>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. LADO DIREITO: ÁREA DE LOGIN CORPORATIVA (60%)   */}
      {/* ================================================== */}
      <div className="w-full md:w-[60%] bg-[#f7f9fc] flex flex-col justify-between p-6 sm:p-12 lg:p-14 min-h-screen">
        
        <div className="flex-1 flex items-center justify-center py-6">
          {/* Card de Login Corporativo */}
          <div className="bg-white w-full max-w-md rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-200/90 p-8 sm:p-10 space-y-6">
            
            {/* Cabeçalho do Card */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Acesso ao sistema
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Informe suas credenciais corporativas para continuar.
              </p>
            </div>

            {/* Alerta de Erro */}
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-md flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Formulário de Login */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  E-mail corporativo
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="seu.nome@hospital.com.br"
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 text-slate-900 text-xs rounded-md focus:ring-2 focus:ring-[#073066] focus:border-[#073066] font-medium transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Senha
                  </label>
                  <button
                    type="button"
                    onClick={handleOpenForgot}
                    className="text-[11px] font-semibold text-[#073066] hover:underline cursor-pointer"
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 text-slate-900 text-xs rounded-md focus:ring-2 focus:ring-[#073066] focus:border-[#073066] font-medium transition"
                  />
                </div>
              </div>

              {/* Botão Entrar em Azul Institucional */}
              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white bg-[#073066] hover:bg-[#05234d] rounded-md shadow-sm transition-colors cursor-pointer flex items-center justify-center"
              >
                Entrar
              </button>
            </form>

            {/* Divisor Visual de Acesso Rápido */}
            <div className="relative pt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                <span className="bg-white px-3 text-slate-400">ACESSO RÁPIDO</span>
              </div>
            </div>

            {/* Bloco Discreto de Acesso Rápido para Desenvolvimento/Testes */}
            <div className="space-y-2">
              {users
                .filter(u => u.id === 'usr_gabriel' || u.id === 'usr_vo2_preposto' || (u.role === 'DIRETORIA' && u.email.includes('gabriel')))
                .slice(0, 1)
                .map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleQuickLogin(u)}
                    className="w-full p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-md text-left transition flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded border border-slate-200 text-slate-600">
                        <Building2 className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block">Conta autorizada</span>
                        <strong className="text-slate-900 text-xs font-bold block">{u.nome}</strong>
                        <span className="text-[11px] text-slate-500 block truncate">{u.email}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Rodapé Corporativo Direita */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col lg:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>
              <strong className="text-slate-700">Acesso corporativo restrito</strong> — Uso exclusivo para fins institucionais. Registro e monitoramento aplicados.
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-500 font-medium">
            <span>© 2026 Hospital Operacional de Excelência</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => alert('Política de Segurança da Informação Hospitalar\n\nTodos os acessos são auditados e registrados em conformidade com as diretrizes institucionais.')}
              className="hover:text-[#073066] hover:underline cursor-pointer"
            >
              Política de Segurança
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => alert('Suporte TI Hospitalar:\nE-mail: suporte.ti@hospital.com.br\nRamal Interno: 4004')}
              className="hover:text-[#073066] hover:underline cursor-pointer"
            >
              Suporte TI
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Esqueci Minha Senha (3 Etapas) */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl border border-slate-200 p-6 space-y-4 text-xs text-slate-800">
            {/* Header do Modal */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#073066]/10 flex items-center justify-center text-[#073066]">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Recuperação de Senha</h3>
                  <p className="text-[11px] text-slate-500">Autoatendimento seguro via e-mail</p>
                </div>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Visual (1 -> 2 -> 3) */}
            {!forgotSuccessMsg && (
              <div className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-md border border-slate-100 text-[11px]">
                <div className={`flex items-center space-x-1.5 ${forgotStep >= 1 ? 'text-[#073066] font-bold' : 'text-slate-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${forgotStep >= 1 ? 'bg-[#073066] text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
                  <span>E-mail</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <div className={`flex items-center space-x-1.5 ${forgotStep >= 2 ? 'text-[#073066] font-bold' : 'text-slate-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${forgotStep >= 2 ? 'bg-[#073066] text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
                  <span>Código</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <div className={`flex items-center space-x-1.5 ${forgotStep >= 3 ? 'text-[#073066] font-bold' : 'text-slate-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${forgotStep >= 3 ? 'bg-[#073066] text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
                  <span>Nova Senha</span>
                </div>
              </div>
            )}

            {/* Alerta de Erro */}
            {forgotError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-md flex items-start space-x-2 text-xs">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{forgotError}</span>
              </div>
            )}

            {/* Alerta de Modo Demonstração (Código visível se EmailJS não estiver configurado) */}
            {demoCodeNotice && !forgotSuccessMsg && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-md space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-xs text-amber-800">
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  <span>Código Gerado (Modo Demonstração)</span>
                </div>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  Para testes imediatos sem configurar chaves de e-mail, utilize o código:
                </p>
                <div className="text-center py-1">
                  <span className="font-mono text-base font-extrabold bg-amber-200/80 px-3 py-1 rounded text-amber-950 tracking-widest border border-amber-300">
                    {demoCodeNotice}
                  </span>
                </div>
              </div>
            )}

            {/* Sucesso Final */}
            {forgotSuccessMsg ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-md space-y-3 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm text-emerald-900">Senha Alterada com Sucesso!</h4>
                <p className="text-xs leading-relaxed text-slate-700">{forgotSuccessMsg}</p>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="w-full py-2.5 bg-[#073066] hover:bg-[#05234d] text-white font-bold rounded-md shadow transition cursor-pointer"
                >
                  Acessar com Nova Senha
                </button>
              </div>
            ) : (
              <>
                {/* ETAPA 1: DIGITAR E-MAIL */}
                {forgotStep === 1 && (
                  <form onSubmit={handleSendCode} className="space-y-4">
                    <p className="text-slate-600 leading-relaxed">
                      Informe seu e-mail corporativo cadastrado. Enviaremos um código de verificação de 6 dígitos para validar sua identidade.
                    </p>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">E-mail Corporativo *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                          placeholder="seu.nome@hospital.com.br"
                          className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-md pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-[#073066]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setIsForgotModalOpen(false)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={forgotLoading}
                        className="px-5 py-2 bg-[#073066] hover:bg-[#05234d] text-white font-bold rounded-md shadow flex items-center space-x-2 disabled:opacity-60 cursor-pointer"
                      >
                        {forgotLoading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <span>Enviar Código</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* ETAPA 2: DIGITAR CÓDIGO DE 6 DÍGITOS */}
                {forgotStep === 2 && (
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div>
                      <p className="text-slate-600 leading-relaxed">
                        Um código de verificação foi enviado para: <br />
                        <strong className="text-slate-900">{forgotEmail}</strong>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Digite os 6 dígitos recebidos abaixo (válido por 15 minutos):
                      </p>
                    </div>

                    <div>
                      <input
                        type="text"
                        maxLength={6}
                        value={forgotCode}
                        onChange={(e) => setForgotCode(e.target.value.replace(/\D/g, ''))}
                        required
                        placeholder="000000"
                        className="w-full text-center tracking-[0.4em] font-mono text-xl font-bold bg-slate-50 border-2 border-slate-300 rounded-md p-3 focus:bg-white focus:border-[#073066] focus:ring-2 focus:ring-[#073066]/20"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Não recebeu o código?</span>
                      {resendCooldown > 0 ? (
                        <span className="text-slate-400 font-medium">Reenviar em {resendCooldown}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendCode}
                          disabled={forgotLoading}
                          className="text-[#073066] font-bold hover:underline cursor-pointer flex items-center space-x-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Reenviar código</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setForgotStep(1)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold cursor-pointer"
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        disabled={forgotCode.length !== 6}
                        className="px-5 py-2 bg-[#073066] hover:bg-[#05234d] text-white font-bold rounded-md shadow disabled:opacity-50 cursor-pointer"
                      >
                        Validar Código
                      </button>
                    </div>
                  </form>
                )}

                {/* ETAPA 3: CRIAR NOVA SENHA */}
                {forgotStep === 3 && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <p className="text-slate-600 leading-relaxed">
                      Código validado com sucesso! Crie uma nova senha para o seu acesso corporativo:
                    </p>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nova Senha *</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          placeholder="Mínimo 4 caracteres"
                          className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-md pl-3 pr-9 py-2.5 focus:ring-2 focus:ring-[#073066]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Confirmar Nova Senha *</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          placeholder="Repita a nova senha"
                          className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-md pl-3 pr-9 py-2.5 focus:ring-2 focus:ring-[#073066]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setIsForgotModalOpen(false)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#073066] hover:bg-[#05234d] text-white font-bold rounded-md shadow cursor-pointer"
                      >
                        Salvar Nova Senha
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
