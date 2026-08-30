import React, { useState } from 'react';
import { User } from '../types';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, ChevronRight, AlertCircle, HelpCircle, CheckCircle2, X } from 'lucide-react';

interface LoginPageProps {
  users: User[];
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ users, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Modal de Esqueci minha senha
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccessMsg, setForgotSuccessMsg] = useState('');

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

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccessMsg(
      `Solicitação enviada com sucesso! A Diretoria Operacional foi notificada para redefinir a senha do e-mail corporativo ${forgotEmail}.`
    );
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
                    onClick={() => {
                      setForgotSuccessMsg('');
                      setIsForgotModalOpen(true);
                    }}
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

      {/* Modal de Esqueci Minha Senha */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl border border-slate-200 p-6 space-y-4 text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-[#073066]" />
                <h3 className="font-bold text-sm text-slate-900">Recuperação de Senha Corporativa</h3>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {forgotSuccessMsg ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-md space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <strong className="font-bold">Solicitação Registrada</strong>
                </div>
                <p className="text-xs leading-relaxed text-slate-700">{forgotSuccessMsg}</p>
                <button
                  onClick={() => setIsForgotModalOpen(false)}
                  className="w-full py-2 bg-[#073066] hover:bg-[#05234d] text-white font-bold rounded-md transition cursor-pointer"
                >
                  Voltar para o Acesso
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Informe seu e-mail corporativo cadastrado. A Diretoria Operacional receberá o chamado para redefinição de credenciais.
                </p>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">E-mail Corporativo *</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    placeholder="seu.nome@hospital.com.br"
                    className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#073066]"
                  />
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
                    Solicitar Redefinição
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
