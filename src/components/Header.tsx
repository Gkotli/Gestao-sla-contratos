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
  LogOut,
  Clock
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
  const isGabrielAdmin = Boolean(
    currentUser?.email === 'gabriel.kotliarenko@vilanovastar.com.br' || 
    currentUser?.nome?.toLowerCase().includes('gabriel')
  );

  return (
    <header className="bg-[#123768] text-white shadow-md border-b border-[#0B2850] no-print font-sans">
      {/* Barra superior institucional com a Logo Oficial da Rede D'Or */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="bg-white p-2 rounded-lg shadow-sm border border-[#CBD5E1] flex items-center justify-center">
              <img 
                src="/assets/branding/rede-dor-logo.png" 
                alt="Rede D'Or Hospitais" 
                className="w-[110px] sm:w-[140px] md:w-[180px] h-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded border border-white/20 uppercase tracking-wide">
                  Diretoria Operacional
                </span>
                <span className="text-slate-300 text-xs font-medium">| Avaliação de Nível de Serviço</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Gestão de SLA e Avaliação de Contratos
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto">
            {/* Usuário Logado Ativo */}
            {currentUser && (
              <div className="flex items-center space-x-2.5 bg-white/10 px-3 py-1.5 rounded-md border border-white/15">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <div className="text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-white block">{currentUser.nome}</span>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      currentUser.role === 'DIRETORIA' ? 'bg-amber-300 text-slate-950' :
                      currentUser.role === 'GESTOR' ? 'bg-sky-200 text-slate-900' :
                      'bg-emerald-200 text-emerald-950'
                    }`}>
                      {currentUser.role === 'DIRETORIA' ? 'Diretoria' : currentUser.role === 'GESTOR' ? 'Gestor' : 'Fornecedor'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-300 block">{currentUser.cargo}</span>
                </div>
              </div>
            )}

            {isDiretoria && (
              <button
                onClick={onResetData}
                title="Restaurar dados originais do sistema"
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/20 hover:text-white rounded-md border border-white/20 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                Restaurar Dados
              </button>
            )}

            {/* Botão Sair */}
            <button
              onClick={onLogout}
              title="Encerrar sessão de acesso"
              className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-rose-100 bg-rose-600/30 hover:bg-rose-600 hover:text-white rounded-md border border-rose-400/30 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Navegação por abas com hierarquia visual corporativa */}
      <div className="bg-[#0B2850] border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none">
            {isGestor && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-[#123768] font-bold shadow-sm'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Painel da Diretoria
              </button>
            )}

            {isGestor && (
              <button
                onClick={() => setActiveTab('new-eval')}
                className={`flex items-center px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'new-eval'
                    ? 'bg-white text-[#123768] font-bold shadow-sm'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <FileCheck2 className="w-4 h-4 mr-2" />
                Nova Avaliação Anual
              </button>
            )}

            {isGestor && (
              <button
                onClick={() => setActiveTab('pending-evals')}
                className={`flex items-center px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'pending-evals'
                    ? 'bg-white text-[#123768] font-bold shadow-sm'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4 mr-2 text-amber-400" />
                Pendências Anuais
              </button>
            )}

            <button
              onClick={() => setActiveTab('eval-list')}
              className={`flex items-center px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'eval-list'
                  ? 'bg-white text-[#123768] font-bold shadow-sm'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Avaliações & Histórico
            </button>

            {isGestor && (
              <button
                onClick={() => setActiveTab('action-plans')}
                className={`relative flex items-center px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'action-plans'
                    ? 'bg-white text-[#123768] font-bold shadow-sm'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-400" />
                Planos de Ação
                {pendingActionPlansCount > 0 && (
                  <span className="ml-2 bg-amber-400 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.2 rounded-full">
                    {pendingActionPlansCount}
                  </span>
                )}
              </button>
            )}

            {isDiretoria && (
              <button
                onClick={() => setActiveTab('suppliers')}
                className={`flex items-center px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'suppliers'
                    ? 'bg-white text-[#123768] font-bold shadow-sm'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Fornecedores & Contratos
              </button>
            )}

            {isGabrielAdmin && (
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'users'
                    ? 'bg-white text-[#123768] font-bold shadow-sm'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
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
