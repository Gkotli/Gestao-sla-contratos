import React from 'react';
import { User } from '../types';
import { 
  BarChart3, 
  FileCheck2, 
  ClipboardList, 
  AlertTriangle, 
  Users, 
  RotateCcw,
  UserCheck,
  UserCog,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onResetData: () => void;
  pendingActionPlansCount: number;
  currentUser: User | null;
  users: User[];
  onSelectUser: (user: User) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onResetData,
  pendingActionPlansCount,
  currentUser,
  users,
  onSelectUser,
  onLogout
}) => {
  const isDiretoria = currentUser?.role === 'DIRETORIA';
  const isGestor = currentUser?.role === 'GESTOR' || isDiretoria;

  return (
    <header className="bg-slate-900 text-white shadow-lg border-b border-slate-800 no-print font-sans">
      {/* Barra superior institucional com a Logo Oficial da Rede D'Or */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-xl shadow-md border border-slate-200 flex items-center justify-center">
              <img 
                src="/logo-rede-dor.webp" 
                alt="Logo Rede D'Or" 
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-hospital-500/20 text-hospital-100 text-xs font-semibold px-2.5 py-0.5 rounded border border-hospital-400/30">
                  DIRETORIA OPERACIONAL
                </span>
                <span className="text-slate-400 text-xs font-medium">| Avaliação Anual de Contratos</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Gestão de Nível de Serviço e Avaliação de Contratos
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-end md:self-auto">
            {/* Usuário Logado Ativo */}
            {currentUser && (
              <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <UserCheck className="w-4 h-4 text-teal-400" />
                <div className="text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-white block">{currentUser.nome}</span>
                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                      currentUser.role === 'DIRETORIA' ? 'bg-purple-900 text-purple-200 border border-purple-700' :
                      currentUser.role === 'GESTOR' ? 'bg-teal-900 text-teal-200 border border-teal-700' :
                      'bg-amber-900 text-amber-200 border border-amber-700'
                    }`}>
                      {currentUser.role === 'DIRETORIA' ? 'DIRETORIA' : currentUser.role === 'GESTOR' ? 'GESTOR' : 'FORNECEDOR'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">{currentUser.cargo}</span>
                </div>
              </div>
            )}

            {/* Botão Sair */}
            <button
              onClick={onLogout}
              title="Encerrar sessão de acesso"
              className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/60 hover:bg-rose-900 hover:text-white rounded-lg border border-rose-800/80 transition"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Sair
            </button>

            {isDiretoria && (
              <button
                onClick={onResetData}
                title="Restaurar dados originais do sistema"
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                Restaurar Dados
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navegação por abas 100% em Português */}
      <div className="bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
            {isGestor && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'bg-hospital-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Painel da Diretoria
              </button>
            )}

            {isGestor && (
              <button
                onClick={() => setActiveTab('new-eval')}
                className={`flex items-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'new-eval'
                    ? 'bg-hospital-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FileCheck2 className="w-4 h-4 mr-2" />
                Nova Avaliação Anual
              </button>
            )}

            {isGestor && (
              <button
                onClick={() => setActiveTab('pending-evals')}
                className={`flex items-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'pending-evals'
                    ? 'bg-hospital-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4 mr-2 text-amber-400" />
                Pendências Anuais
              </button>
            )}

            <button
              onClick={() => setActiveTab('eval-list')}
              className={`flex items-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'eval-list'
                  ? 'bg-hospital-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Avaliações & Histórico
            </button>

            {isGestor && (
              <button
                onClick={() => setActiveTab('action-plans')}
                className={`relative flex items-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'action-plans'
                    ? 'bg-hospital-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-400" />
                Planos de Ação
                {pendingActionPlansCount > 0 && (
                  <span className="ml-2 bg-amber-500 text-slate-950 font-bold text-xs px-2 py-0.5 rounded-full">
                    {pendingActionPlansCount}
                  </span>
                )}
              </button>
            )}

            {isDiretoria && (
              <button
                onClick={() => setActiveTab('suppliers')}
                className={`flex items-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'suppliers'
                    ? 'bg-hospital-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Fornecedores & Contratos
              </button>
            )}

            {isDiretoria && (
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'users'
                    ? 'bg-hospital-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <UserCog className="w-4 h-4 mr-2" />
                Gestão de Usuários
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
