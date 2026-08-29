import React, { useState } from 'react';
import { User } from '../types';
import { Building2, Lock, Mail, ArrowRight, KeyRound, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  users: User[];
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ users, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const foundUser = users.find(
      u => u.email.toLowerCase().trim() === email.toLowerCase().trim() && (u.senha || '123') === senha
    );

    if (foundUser) {
      onLoginSuccess(foundUser);
    } else {
      setErrorMsg('E-mail ou senha incorretos. Por favor, verifique os dados informados.');
    }
  };

  const handleQuickLogin = (user: User) => {
    setEmail(user.email);
    setSenha(user.senha || '123');
    onLoginSuccess(user);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-100">
      {/* Background Decorativo Hospitalar */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-950 to-slate-950 pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-hospital-500 to-teal-600 p-4 rounded-2xl shadow-xl shadow-teal-900/40 border border-teal-400/30">
            <Building2 className="w-10 h-10 text-white" />
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          SLA & Avaliação de Contratos
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          Diretoria Operacional — Sistema Restrito de Avaliação Anual
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900/90 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl border border-slate-800 space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs rounded-xl flex items-center space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                E-mail Corporativo *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu.nome@hospital.com.br"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-slate-700 text-white text-xs rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Senha de Acesso *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-slate-700 text-white text-xs rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-teal-900/30 transition-all transform hover:-translate-y-0.5"
            >
              Acessar Sistema
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>

          {/* Seleção de Contas Autorizadas (Sem exibição de senha) */}
          <div className="border-t border-slate-800 pt-5 space-y-3">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
              <KeyRound className="w-4 h-4 text-teal-400" />
              <span>Selecione a Conta Autorizada:</span>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs">
              {users.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickLogin(u)}
                  className="p-2.5 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-teal-500/50 rounded-xl text-left transition flex items-center justify-between group"
                >
                  <div className="truncate pr-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        u.role === 'DIRETORIA' ? 'bg-purple-900/80 text-purple-200 border border-purple-700' :
                        u.role === 'GESTOR' ? 'bg-teal-900/80 text-teal-200 border border-teal-700' :
                        'bg-amber-900/80 text-amber-200 border border-amber-700'
                      }`}>
                        {u.role}
                      </span>
                      <strong className="text-white group-hover:text-teal-300 transition text-xs font-semibold">{u.nome}</strong>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{u.email}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-500 mt-6">
          © 2026 Hospital Operacional de Excelência — Acesso Restrito e Auditado
        </p>
      </div>
    </div>
  );
};
