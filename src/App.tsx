import React, { useState, useMemo, Suspense, lazy } from 'react';
import { ActionPlan, Evaluation, Sector, Supplier, User } from './types';
import { StorageService } from './services/storageService';
import { RemoteSync, SyncStatus } from './services/remoteSync';
import { AuthService, AuthState } from './services/authService';
import { AUTH_LINK_ERROR, SUPABASE_CONFIGURED, clearAuthLink } from './services/supabaseClient';
import { isSystemAdmin } from './utils/security';
import { computeLaudoCode, registerValidacaoFornecedor, registerVisualizacaoFornecedor } from './services/laudoEnvioService';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { ErrorBoundary } from './components/ErrorBoundary';

// Telas carregadas sob demanda: cada aba vira um arquivo JS separado,
// então o login e o painel inicial abrem sem baixar o sistema inteiro.
const ExecutiveDashboard = lazy(() => import('./components/ExecutiveDashboard').then(m => ({ default: m.ExecutiveDashboard })));
const EvaluationForm = lazy(() => import('./components/EvaluationForm').then(m => ({ default: m.EvaluationForm })));
const EvaluationList = lazy(() => import('./components/EvaluationList').then(m => ({ default: m.EvaluationList })));
const ActionPlans = lazy(() => import('./components/ActionPlans').then(m => ({ default: m.ActionPlans })));
const SuppliersManager = lazy(() => import('./components/SuppliersManager').then(m => ({ default: m.SuppliersManager })));
const UsersManager = lazy(() => import('./components/UsersManager').then(m => ({ default: m.UsersManager })));
const EvaluationReportModal = lazy(() => import('./components/EvaluationReportModal').then(m => ({ default: m.EvaluationReportModal })));
const SupplierSignatureModal = lazy(() => import('./components/SupplierSignatureModal').then(m => ({ default: m.SupplierSignatureModal })));
const SendLaudoModal = lazy(() => import('./components/SendLaudoModal').then(m => ({ default: m.SendLaudoModal })));
const PendingEvaluationsView = lazy(() => import('./components/PendingEvaluationsView').then(m => ({ default: m.PendingEvaluationsView })));

const TabFallback = () => (
  <div className="flex items-center justify-center py-24 text-xs font-semibold text-[#475569]">
    Carregando…
  </div>
);

// Com o Supabase configurado: login pelo Supabase Auth e dados protegidos por RLS.
// Sem ele: modo local de demonstração (dados no navegador, sem senha).
const REMOTE = SUPABASE_CONFIGURED;

// Roda antes do primeiro render: remove senhas/códigos guardados por versões antigas
StorageService.cleanupLegacyData();

const INITIAL_NOTICE = AUTH_LINK_ERROR
  ? 'O link de acesso é inválido ou expirou. Peça um novo em "Primeiro acesso ou esqueci a senha".'
  : null;
if (AUTH_LINK_ERROR) clearAuthLink();

const SYNC_LABELS: Record<SyncStatus, string> = {
  local: 'Modo local de demonstração (dados apenas neste navegador)',
  connecting: 'Conectando ao banco compartilhado…',
  online: 'Banco compartilhado conectado',
  error: 'Falha na sincronização — alterações salvas localmente'
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Persistent Application State
  const [currentUser, setCurrentUser] = useState<User | null>(() => REMOTE ? null : StorageService.getCurrentUser());
  const [users, setUsers] = useState<User[]>(() => REMOTE ? [] : StorageService.getUsers());
  const [authState, setAuthState] = useState<AuthState>(() => REMOTE ? { status: 'loading' } : { status: 'signed_out' });
  const [loginNotice, setLoginNotice] = useState<string | null>(INITIAL_NOTICE);
  const currentUserIdRef = React.useRef<string | null>(null);
  const [sectors, setSectors] = useState<Sector[]>(() => StorageService.getSectors());
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => StorageService.getSuppliers());
  const [evaluations, setEvaluations] = useState<Evaluation[]>(() => StorageService.getEvaluations());
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>(() => StorageService.getActionPlans());

  // Inter-component Action States
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);
  const [preselectedSupplierId, setPreselectedSupplierId] = useState<string | undefined>(undefined);
  const [preselectedYear, setPreselectedYear] = useState<number | undefined>(undefined);
  const [actionPlanTargetEval, setActionPlanTargetEval] = useState<Evaluation | undefined>(undefined);
  const [reportModalEvalId, setReportModalEvalId] = useState<string | null>(null);
  const [signatureModalEval, setSignatureModalEval] = useState<Evaluation | null>(null);
  const [sendModalEval, setSendModalEval] = useState<Evaluation | null>(null);

  // --- FILTRAGEM RÍGIDA DE ACESSO POR SETOR / ROLE ---
  // Apenas a DIRETORIA enxerga todos os 11 setores e 83 fornecedores.
  // Cada GESTOR enxerga EXCLUSIVAMENTE a gestão do seu setor (currentUser.setorId).
  const isDiretoria = currentUser?.role === 'DIRETORIA';
  const isGestor = currentUser?.role === 'GESTOR';
  const isFornecedor = currentUser?.role === 'FORNECEDOR';
  const isGabrielAdmin = isSystemAdmin(currentUser);

  // --- SINCRONIZAÇÃO COM O BANCO COMPARTILHADO (Supabase) ---
  // O localStorage continua como cache; quando outro gestor altera algo,
  // o RemoteSync atualiza o cache e avisa aqui para recarregar o estado.
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(() => RemoteSync.getStatus());

  React.useEffect(() => {
    const reloadFromCache = () => {
      setSectors(StorageService.getSectors());
      setSuppliers(StorageService.getSuppliers());
      setEvaluations(StorageService.getEvaluations());
      setActionPlans(StorageService.getActionPlans());
    };
    return RemoteSync.subscribe(setSyncStatus, reloadFromCache, message => alert(message));
  }, []);

  const refreshProfiles = React.useCallback(() => {
    if (!REMOTE) return;
    AuthService.listProfiles()
      .then(setUsers)
      .catch(err => console.error('[App] Falha ao carregar usuários:', err));
  }, []);

  // --- SESSÃO (Supabase Auth) ---
  // O perfil (role, setor, fornecedor) vem da tabela profiles; a sincronização só
  // começa depois do login, com as permissões desse perfil aplicadas pelo banco.
  React.useEffect(() => {
    if (!REMOTE) return;
    return AuthService.watch(state => {
      setAuthState(state);
      if (state.status === 'signed_in') {
        if (currentUserIdRef.current !== state.user.id) {
          currentUserIdRef.current = state.user.id;
          setActiveTab(state.user.role === 'FORNECEDOR' ? 'eval-list' : 'dashboard');
        }
        setLoginNotice(null);
        setCurrentUser(state.user);
        void RemoteSync.start({ authUserId: state.authUserId, role: state.user.role });
        refreshProfiles();
        return;
      }
      currentUserIdRef.current = null;
      setCurrentUser(null);
      setUsers([]);
      if (state.status === 'no_profile') {
        setLoginNotice(`O login ${state.email} não está vinculado a um perfil do sistema. Procure a Diretoria Operacional.`);
        void AuthService.signOut();
      } else if (state.status === 'signed_out') {
        if (state.notice) setLoginNotice(state.notice);
        void RemoteSync.stop();
      }
    });
  }, [refreshProfiles]);

  const scopedSuppliers = useMemo(() => {
    if (!currentUser) return [];
    if (isDiretoria) return suppliers;
    if (isGestor && currentUser.setorId) {
      return suppliers.filter(s => s.setorResponsavelId === currentUser.setorId);
    }
    if (isFornecedor && currentUser.fornecedorId) {
      return suppliers.filter(s => s.id === currentUser.fornecedorId);
    }
    return suppliers;
  }, [suppliers, currentUser, isDiretoria, isGestor, isFornecedor]);

  const scopedEvaluations = useMemo(() => {
    if (!currentUser) return [];
    if (isDiretoria) return evaluations;
    if (isGestor && currentUser.setorId) {
      return evaluations.filter(e => e.setorId === currentUser.setorId);
    }
    if (isFornecedor && currentUser.fornecedorId) {
      return evaluations.filter(e => e.fornecedorId === currentUser.fornecedorId);
    }
    return evaluations;
  }, [evaluations, currentUser, isDiretoria, isGestor, isFornecedor]);

  const scopedActionPlans = useMemo(() => {
    if (!currentUser) return [];
    if (isDiretoria) return actionPlans;
    if (isGestor && currentUser.setorId) {
      return actionPlans.filter(ap => ap.setorId === currentUser.setorId);
    }
    if (isFornecedor && currentUser.fornecedorId) {
      return actionPlans.filter(ap => scopedEvaluations.some(ev => ev.id === ap.evaluationId));
    }
    return actionPlans;
  }, [actionPlans, currentUser, isDiretoria, isGestor, isFornecedor, scopedEvaluations]);

  const scopedSectors = useMemo(() => {
    if (!currentUser) return [];
    if (isDiretoria) return sectors;
    if (isGestor && currentUser.setorId) {
      return sectors.filter(sec => sec.id === currentUser.setorId);
    }
    return sectors;
  }, [sectors, currentUser, isDiretoria, isGestor]);

  // --- Handlers de Autenticação ---
  // Modo local: entrada de demonstração, sem senha
  const handleLocalLogin = (user: User) => {
    setCurrentUser(user);
    StorageService.setCurrentUser(user);
    if (user.role === 'FORNECEDOR') {
      setActiveTab('eval-list');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = async () => {
    if (!REMOTE) {
      setCurrentUser(null);
      StorageService.setCurrentUser(null);
      return;
    }
    if (RemoteSync.hasPendingChanges() && !window.confirm(
      'Existem alterações que ainda não foram enviadas ao banco (sem conexão?). Se sair agora elas serão descartadas deste navegador. Sair mesmo assim?'
    )) {
      return;
    }
    await AuthService.signOut();
    currentUserIdRef.current = null;
    setCurrentUser(null);
    setUsers([]);
    await RemoteSync.stop();
  };

  // Troca de sessão sem senha: só no modo local de demonstração
  const handleSelectUser = (user: User) => {
    // Entrar como outro usuário fica marcado: não vale como ação do próprio usuário (ex.: validar laudo)
    const administrador = currentUser?.sessaoAlternadaPor || currentUser?.nome;
    const sessao: User = isSystemAdmin(user) ? user : { ...user, sessaoAlternadaPor: administrador };
    setCurrentUser(sessao);
    StorageService.setCurrentUser(sessao);
    if (user.role === 'FORNECEDOR') {
      setActiveTab('eval-list');
    }
  };

  // --- User Handlers ---
  // No Supabase a permissão é conferida de novo pelo banco (RLS em profiles).
  const handleSaveUser = async (user: User, isNew: boolean, senhaProvisoria?: string): Promise<boolean> => {
    if (currentUser?.role !== 'DIRETORIA') {
      alert('Acesso negado: Apenas a Diretoria possui permissão para gerenciar usuários.');
      return false;
    }
    if (!REMOTE) {
      setUsers(StorageService.saveUser(user));
      return true;
    }
    const error = await AuthService.saveProfile(user, isNew);
    if (error) {
      alert(error);
      return false;
    }
    if (senhaProvisoria) {
      const result = await AuthService.setTemporaryPassword(user, senhaProvisoria);
      alert(result.ok ? `Usuário salvo. ${result.message}` : `Usuário salvo, mas o acesso não foi criado.\n\n${result.message}`);
    }
    refreshProfiles();
    return true;
  };

  const handleDeleteUser = async (user: User) => {
    if (currentUser?.role !== 'DIRETORIA') {
      alert('Acesso negado: Apenas a Diretoria possui permissão para excluir usuários.');
      return;
    }
    if (!REMOTE) {
      setUsers(StorageService.deleteUser(user.id));
      return;
    }
    const result = await AuthService.deleteProfile(user);
    alert(result.message);
    refreshProfiles();
  };

  // Cria o login ou troca a senha com uma senha provisória (nenhum e-mail é enviado)
  const handleSetTemporaryPassword = async (user: User, senhaProvisoria: string) => {
    if (currentUser?.role !== 'DIRETORIA') return;
    const result = await AuthService.setTemporaryPassword(user, senhaProvisoria);
    alert(result.message);
    refreshProfiles();
  };

  // --- Supplier Handlers ---
  const handleSaveSupplier = (supplier: Supplier) => {
    if (currentUser?.role !== 'DIRETORIA') {
      alert('Acesso negado: Apenas a Diretoria possui permissão para cadastrar ou alterar fornecedores.');
      return;
    }
    const updated = StorageService.saveSupplier(supplier);
    setSuppliers(updated);
  };

  const handleBulkSaveSuppliers = (updated: Supplier[]) => {
    if (currentUser?.role !== 'DIRETORIA') {
      alert('Acesso negado: Apenas a Diretoria possui permissão para alterar fornecedores.');
      return;
    }
    setSuppliers(StorageService.saveSuppliers(updated));
  };

  const handleDeleteSupplier = (supplierId: string) => {
    if (currentUser?.role !== 'DIRETORIA') {
      alert('Acesso negado: Apenas a Diretoria possui permissão para excluir fornecedores.');
      return;
    }
    const updated = StorageService.deleteSupplier(supplierId);
    setSuppliers(updated);
  };

  // --- ROTEAMENTO BASEADO EM ID NA URL (Deep Linking, F5 & Navegação Direta) ---
  React.useEffect(() => {
    const syncEvalFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      let evalId: string | null = null;

      if (params.has('eval')) {
        evalId = params.get('eval');
      } else if (params.has('id')) {
        evalId = params.get('id');
      } else if (hash.startsWith('#eval/')) {
        evalId = hash.replace('#eval/', '');
      }

      if (evalId) {
        setReportModalEvalId(evalId);
      }
    };

    syncEvalFromUrl();
    window.addEventListener('popstate', syncEvalFromUrl);
    window.addEventListener('hashchange', syncEvalFromUrl);
    return () => {
      window.removeEventListener('popstate', syncEvalFromUrl);
      window.removeEventListener('hashchange', syncEvalFromUrl);
    };
  }, []);

  const handleViewReport = (evalId: string) => {
    setReportModalEvalId(evalId);
    try {
      const newUrl = `${window.location.pathname}?eval=${encodeURIComponent(evalId)}`;
      window.history.pushState({ evalId }, '', newUrl);
    } catch {
      // Fallback para navegadores legados
    }
  };

  const handleCloseReportModal = () => {
    setReportModalEvalId(null);
    try {
      window.history.pushState({}, '', window.location.pathname);
    } catch {
      // Fallback
    }
  };

  const handleStartNewEvaluation = (supplierId?: string, year?: number) => {
    if (currentUser?.role === 'FORNECEDOR') {
      alert('Acesso negado: Prestadores de serviço não possuem permissão para realizar avaliações.');
      return;
    }
    setEditingEvaluation(null);
    setPreselectedSupplierId(supplierId);
    setPreselectedYear(year);
    setActiveTab('new-eval');
  };

  const handleEditEvaluation = (evaluation: Evaluation) => {
    if (currentUser?.role === 'FORNECEDOR') {
      alert('Acesso negado: Prestadores de serviço não possuem permissão para editar avaliações.');
      return;
    }
    setEditingEvaluation(evaluation);
    setPreselectedSupplierId(evaluation.fornecedorId);
    setActiveTab('new-eval');
  };

  const handleSaveEvaluation = (evaluation: Evaluation, openActionPlanModalDirectly: boolean = false) => {
    if (currentUser?.role === 'FORNECEDOR') {
      alert('Acesso negado: Prestadores de serviço não possuem permissão para lançar avaliações.');
      return;
    }
    const updatedEvaluations = StorageService.saveEvaluation(evaluation);
    setEvaluations(updatedEvaluations);
    setEditingEvaluation(null);
    setPreselectedSupplierId(undefined);

    if (openActionPlanModalDirectly || evaluation.necessitaPlanoAcao) {
      setActionPlanTargetEval(evaluation);
      setActiveTab('action-plans');
      try {
        window.history.pushState({}, '', window.location.pathname);
      } catch {}
    } else {
      setActiveTab('eval-list');
      setReportModalEvalId(evaluation.id);
      try {
        const newUrl = `${window.location.pathname}?eval=${encodeURIComponent(evaluation.id)}`;
        window.history.pushState({ evalId: evaluation.id }, '', newUrl);
      } catch {}
    }
  };

  const handleDeleteEvaluation = (evalId: string) => {
    if (currentUser?.role === 'FORNECEDOR') {
      alert('Acesso negado: Prestadores de serviço não possuem permissão para excluir avaliações.');
      return;
    }
    if (!evalId) {
      alert('Não foi possível excluir: O ID da avaliação é inválido.');
      return;
    }

    if (window.confirm('Tem certeza que deseja excluir esta avaliação de contrato? Esta ação é definitiva e removerá a avaliação do banco de dados.')) {
      try {
        const updatedEvals = StorageService.deleteEvaluation(evalId);
        setEvaluations(updatedEvals);
        setActionPlans(StorageService.getActionPlans());

        if (reportModalEvalId === evalId) {
          setReportModalEvalId(null);
        }
      } catch (err) {
        console.error('Erro ao excluir avaliação:', err);
        alert('Não foi possível excluir a avaliação. Ocorreu um erro ao salvar a alteração no armazenamento.');
      }
    }
  };

  // --- Action Plan Handlers ---
  const handleSaveActionPlan = (plan: ActionPlan) => {
    const updated = StorageService.saveActionPlan(plan);
    setActionPlans(updated);
    setActionPlanTargetEval(undefined);
  };

  const handleDeleteActionPlan = (planId: string) => {
    const updated = StorageService.deleteActionPlan(planId);
    setActionPlans(updated);
  };

  // --- Signature Handler ---
  const handleSaveSignature = async (updatedEval: Evaluation) => {
    const finalEval = currentUser?.role === 'FORNECEDOR' && !currentUser.sessaoAlternadaPor
      ? registerValidacaoFornecedor(updatedEval, currentUser, await computeLaudoCode(updatedEval), updatedEval.parecerFornecedor)
      : updatedEval;
    const updatedEvaluations = StorageService.saveEvaluation(finalEval);
    setEvaluations(updatedEvaluations);
    setSignatureModalEval(null);
  };

  // --- Validação do laudo pelo fornecedor no site ---
  const handleSupplierValidate = (updatedEval: Evaluation) => {
    if (currentUser?.role !== 'FORNECEDOR' || currentUser.sessaoAlternadaPor) return;
    setEvaluations(StorageService.saveEvaluation(updatedEval));
  };

  // --- Envio do laudo ao fornecedor (Outlook do gestor) ---
  const handleOpenSendModal = (evaluation: Evaluation) => {
    if (currentUser?.role === 'FORNECEDOR') return;
    setSendModalEval(evaluation);
  };

  const handleConfirmSent = (updatedEval: Evaluation) => {
    const updatedEvaluations = StorageService.saveEvaluation(updatedEval);
    setEvaluations(updatedEvaluations);
    setSendModalEval(null);
  };

  // Evaluation targeted for report view modal (Busca pelo ID do estado ou pelo StorageService)
  const selectedReportEvaluation = useMemo(() => {
    if (!reportModalEvalId) return null;
    const found = evaluations.find(e => e.id === reportModalEvalId);
    if (found) return found;
    const allStorageEvals = StorageService.getEvaluations();
    return allStorageEvals.find(e => e.id === reportModalEvalId) || null;
  }, [reportModalEvalId, evaluations]);

  React.useEffect(() => {
    const ev = selectedReportEvaluation;
    if (!ev || !currentUser || currentUser.role !== 'FORNECEDOR' || currentUser.sessaoAlternadaPor) return;
    if (ev.visualizacaoFornecedor || ev.fornecedorId !== currentUser.fornecedorId) return;
    let cancelled = false;
    computeLaudoCode(ev).then(codigo => {
      if (cancelled) return;
      setEvaluations(StorageService.saveEvaluation(registerVisualizacaoFornecedor(ev, currentUser, codigo)));
    });
    return () => { cancelled = true; };
  }, [selectedReportEvaluation, currentUser]);

  const selectedReportSupplier = useMemo(() => {
    if (!selectedReportEvaluation) return undefined;
    return suppliers.find(s => s.id === selectedReportEvaluation.fornecedorId);
  }, [selectedReportEvaluation, suppliers]);

  const selectedReportSector = useMemo(() => {
    if (!selectedReportEvaluation) return undefined;
    return sectors.find(sec => sec.id === selectedReportEvaluation.setorId);
  }, [selectedReportEvaluation, sectors]);

  const selectedReportActionPlan = useMemo(() => {
    if (!selectedReportEvaluation) return undefined;
    return actionPlans.find(ap => ap.evaluationId === selectedReportEvaluation.id);
  }, [selectedReportEvaluation, actionPlans]);

  // Count pending action plans for badge notification (scoped to manager's area)
  const pendingActionPlansCount = useMemo(() => {
    return scopedActionPlans.filter(p => p.status === 'PENDENTE' || p.status === 'EM_ANDAMENTO' || p.status === 'ATRASADO').length;
  }, [scopedActionPlans]);

  if (REMOTE && authState.status === 'loading') {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center text-xs font-semibold text-[#475569]">
        Verificando sessão…
      </div>
    );
  }

  // Link de convite ou de recuperação: pede a nova senha antes de abrir o sistema
  if (REMOTE && authState.status === 'set_password') {
    return (
      <LoginPage
        remote
        setPassword={{
          email: authState.user.email,
          reason: authState.reason,
          onCancel: () => void AuthService.signOut()
        }}
      />
    );
  }

  // Bloqueio de Acesso — Exibe Tela de Login se deslogado
  if (!currentUser) {
    return (
      <LoginPage
        remote={REMOTE}
        users={users}
        onLocalLogin={handleLocalLogin}
        notice={loginNotice}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans app-root-container">
      {/* Header institucional e navegação */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'new-eval' && activeTab !== 'new-eval') {
            setEditingEvaluation(null);
            setPreselectedSupplierId(undefined);
          }
          setActiveTab(tab);
        }}
        pendingActionPlansCount={pendingActionPlansCount}
        currentUser={currentUser}
        users={users}
        onSelectUser={REMOTE ? undefined : handleSelectUser}
        onLogout={() => void handleLogout()}
      />

      {/* Conteúdo Principal (Oculto na Impressão no-print) */}
      <Suspense fallback={<TabFallback />}>
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 no-print app-main-content">
        {activeTab === 'dashboard' && currentUser.role !== 'FORNECEDOR' && (
          <ExecutiveDashboard
            evaluations={scopedEvaluations}
            suppliers={scopedSuppliers}
            sectors={scopedSectors}
            actionPlans={scopedActionPlans}
            onNewEvaluation={handleStartNewEvaluation}
            onViewEvaluation={handleViewReport}
            onManageActionPlans={() => setActiveTab('action-plans')}
          />
        )}

        {activeTab === 'new-eval' && currentUser.role !== 'FORNECEDOR' && (
          <EvaluationForm
            suppliers={scopedSuppliers}
            sectors={scopedSectors}
            currentUser={currentUser}
            initialEvaluation={editingEvaluation}
            preselectedSupplierId={preselectedSupplierId}
            preselectedYear={preselectedYear}
            allEvaluations={evaluations}
            onSave={handleSaveEvaluation}
            onCancel={() => setActiveTab('eval-list')}
          />
        )}

        {activeTab === 'pending-evals' && currentUser.role !== 'FORNECEDOR' && (
          <PendingEvaluationsView
            suppliers={scopedSuppliers}
            sectors={scopedSectors}
            evaluations={scopedEvaluations}
            users={users}
            currentUser={currentUser}
            onStartEvaluation={(supId, yr) => handleStartNewEvaluation(supId, yr)}
          />
        )}

        {activeTab === 'eval-list' && (
          <EvaluationList
            evaluations={scopedEvaluations}
            suppliers={suppliers}
            sectors={sectors}
            actionPlans={scopedActionPlans}
            currentUser={currentUser}
            onNewEvaluation={() => handleStartNewEvaluation()}
            onEditEvaluation={handleEditEvaluation}
            onViewReport={handleViewReport}
            onOpenSignatureModal={(ev) => setSignatureModalEval(ev)}
            onOpenSendModal={handleOpenSendModal}
            onOpenActionPlanModal={(ev) => {
              setActionPlanTargetEval(ev);
              setActiveTab('action-plans');
            }}
            onDeleteEvaluation={handleDeleteEvaluation}
          />
        )}

        {activeTab === 'action-plans' && currentUser.role !== 'FORNECEDOR' && (
          <ActionPlans
            actionPlans={scopedActionPlans}
            evaluations={scopedEvaluations}
            suppliers={scopedSuppliers}
            sectors={scopedSectors}
            onSaveActionPlan={handleSaveActionPlan}
            onDeleteActionPlan={handleDeleteActionPlan}
            targetEvaluation={actionPlanTargetEval}
          />
        )}

        {activeTab === 'suppliers' && currentUser.role === 'DIRETORIA' && (
          <SuppliersManager
            suppliers={suppliers}
            sectors={sectors}
            onSaveSupplier={handleSaveSupplier}
            onBulkSaveSuppliers={handleBulkSaveSuppliers}
            onDeleteSupplier={handleDeleteSupplier}
            onStartEvaluation={(supId) => handleStartNewEvaluation(supId)}
          />
        )}

        {activeTab === 'users' && isGabrielAdmin && (
          <UsersManager
            users={users}
            sectors={sectors}
            suppliers={suppliers}
            currentUser={currentUser}
            remote={REMOTE}
            onSaveUser={handleSaveUser}
            onDeleteUser={(u) => void handleDeleteUser(u)}
            onSetTemporaryPassword={REMOTE ? (u, senha) => void handleSetTemporaryPassword(u, senha) : undefined}
            onSelectUser={REMOTE ? undefined : handleSelectUser}
          />
        )}
      </main>

      {/* Modal de Ciência e Assinatura Digital do Fornecedor */}
      {signatureModalEval && (
        <SupplierSignatureModal
          evaluation={signatureModalEval}
          supplier={suppliers.find(s => s.id === signatureModalEval.fornecedorId)}
          sector={sectors.find(s => s.id === signatureModalEval.setorId)}
          onSaveSignature={handleSaveSignature}
          onSave={handleSaveSignature}
          currentUser={currentUser}
          onClose={() => setSignatureModalEval(null)}
        />
      )}

      {/* Modal do Laudo Oficial por ID na URL (Impressão A4 Multipáginas) */}
      {reportModalEvalId && (
        <EvaluationReportModal
          evaluation={selectedReportEvaluation}
          supplier={selectedReportSupplier}
          sector={selectedReportSector}
          actionPlan={selectedReportActionPlan}
          onOpenSendModal={currentUser.role !== 'FORNECEDOR' ? handleOpenSendModal : undefined}
          currentUser={currentUser}
          onSupplierValidate={currentUser.role === 'FORNECEDOR' && !currentUser.sessaoAlternadaPor ? handleSupplierValidate : undefined}
          onClose={handleCloseReportModal}
        />
      )}

      {/* Envio do laudo ao fornecedor (renderizado depois do laudo para ficar por cima) */}
      {sendModalEval && (
        <SendLaudoModal
          evaluation={sendModalEval}
          supplier={suppliers.find(s => s.id === sendModalEval.fornecedorId)}
          sector={sectors.find(s => s.id === sendModalEval.setorId)}
          currentUser={currentUser}
          onConfirmSent={handleConfirmSent}
          onClose={() => setSendModalEval(null)}
        />
      )}
      </Suspense>

      <footer className="bg-white border-t border-[#CBD5E1] py-4 px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#475569]">
          <div className="flex items-center space-x-3">
            <img
              src="/assets/branding/rede-dor-header-logo.png"
              alt="Rede D'Or"
              className="h-5 sm:h-6 w-auto object-contain"
            />
            <span className="font-medium">© 2026 Rede D'Or Hospitais | Todos os direitos reservados</span>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <p className="text-[11px] text-[#475569]">
              Hospital Vila Nova Star • Diretoria Operacional • SLA de Fornecedores
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#475569]" title="Status do armazenamento de dados">
              <span
                className={`w-2 h-2 rounded-full ${
                  syncStatus === 'online' ? 'bg-emerald-500'
                    : syncStatus === 'error' ? 'bg-rose-500'
                    : syncStatus === 'connecting' ? 'bg-amber-400'
                    : 'bg-slate-400'
                }`}
              />
              {SYNC_LABELS[syncStatus]}
            </span>
          </div>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
}
