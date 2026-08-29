import React, { useState, useEffect, useMemo } from 'react';
import { ActionPlan, Evaluation, Sector, Supplier, User } from './types';
import { StorageService } from './services/storageService';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { EvaluationForm } from './components/EvaluationForm';
import { EvaluationList } from './components/EvaluationList';
import { ActionPlans } from './components/ActionPlans';
import { SuppliersManager } from './components/SuppliersManager';
import { UsersManager } from './components/UsersManager';
import { SupplierSignatureModal } from './components/SupplierSignatureModal';
import { EvaluationReportModal } from './components/EvaluationReportModal';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Core Data States
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);

  // Modal / Selection States
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);
  const [preselectedSupplierId, setPreselectedSupplierId] = useState<string | undefined>(undefined);
  
  const [signatureModalEval, setSignatureModalEval] = useState<Evaluation | null>(null);
  const [reportModalEvalId, setReportModalEvalId] = useState<string | null>(null);
  const [actionPlanTargetEval, setActionPlanTargetEval] = useState<Evaluation | null>(null);

  // Load Initial Data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedUsers = StorageService.getUsers();
    setUsers(loadedUsers);
    const userInSession = StorageService.getCurrentUser();
    setCurrentUser(userInSession);
    setSectors(StorageService.getSectors());
    setSuppliers(StorageService.getSuppliers());
    setEvaluations(StorageService.getEvaluations());
    setActionPlans(StorageService.getActionPlans());

    if (userInSession?.role === 'FORNECEDOR') {
      setActiveTab('eval-list');
    }
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    StorageService.setCurrentUser(user);
    if (user.role === 'FORNECEDOR') {
      setActiveTab('eval-list');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    StorageService.setCurrentUser(null);
  };

  const handleSelectUser = (user: User) => {
    setCurrentUser(user);
    StorageService.setCurrentUser(user);
  };

  const handleSaveUser = (user: User) => {
    const updatedUsers = StorageService.saveUser(user);
    setUsers(updatedUsers);
    if (currentUser?.id === user.id) {
      setCurrentUser(user);
      StorageService.setCurrentUser(user);
    }
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = StorageService.deleteUser(userId);
    setUsers(updatedUsers);
    if (currentUser?.id === userId && updatedUsers.length > 0) {
      setCurrentUser(updatedUsers[0]);
      StorageService.setCurrentUser(updatedUsers[0]);
    }
  };

  const handleResetData = () => {
    if (confirm('Deseja restaurar todos os dados demonstrativos originais? Suas edições recentes serão redefinidas.')) {
      StorageService.resetToDefault();
      loadData();
      setActiveTab('dashboard');
    }
  };

  // --- Evaluation CRUD Handlers ---
  const handleSaveEvaluation = (evaluation: Evaluation, openActionPlanModal: boolean = false) => {
    const updatedEvaluations = StorageService.saveEvaluation(evaluation);
    setEvaluations(updatedEvaluations);

    setEditingEvaluation(null);
    setPreselectedSupplierId(undefined);

    if (openActionPlanModal || evaluation.necessitaPlanoAcao) {
      setActionPlanTargetEval(evaluation);
      setActiveTab('action-plans');
    } else {
      setActiveTab('eval-list');
    }
  };

  const handleDeleteEvaluation = (evalId: string) => {
    const updated = StorageService.deleteEvaluation(evalId);
    setEvaluations(updated);
  };

  const handleStartNewEvaluation = (supplierId?: string) => {
    setEditingEvaluation(null);
    setPreselectedSupplierId(supplierId);
    setActiveTab('new-eval');
  };

  const handleEditEvaluation = (ev: Evaluation) => {
    setEditingEvaluation(ev);
    setPreselectedSupplierId(ev.fornecedorId);
    setActiveTab('new-eval');
  };

  // --- Supplier CRUD Handlers ---
  const handleSaveSupplier = (supplier: Supplier) => {
    const updated = StorageService.saveSupplier(supplier);
    setSuppliers(updated);
  };

  const handleDeleteSupplier = (supplierId: string) => {
    const updated = StorageService.deleteSupplier(supplierId);
    setSuppliers(updated);
  };

  // --- Action Plan CRUD Handlers ---
  const handleSaveActionPlan = (plan: ActionPlan) => {
    const updated = StorageService.saveActionPlan(plan);
    setActionPlans(updated);
    setActionPlanTargetEval(null);
  };

  const handleDeleteActionPlan = (planId: string) => {
    const updated = StorageService.deleteActionPlan(planId);
    setActionPlans(updated);
  };

  // --- Signature Handler ---
  const handleSaveSignature = (updatedEval: Evaluation) => {
    const updatedEvaluations = StorageService.saveEvaluation(updatedEval);
    setEvaluations(updatedEvaluations);
    setSignatureModalEval(null);
  };

  // Evaluation targeted for report view modal
  const selectedReportEvaluation = useMemo(() => {
    if (!reportModalEvalId) return null;
    return evaluations.find(e => e.id === reportModalEvalId) || null;
  }, [reportModalEvalId, evaluations]);

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

  // Count pending action plans for badge notification
  const pendingActionPlansCount = useMemo(() => {
    return actionPlans.filter(p => p.status === 'PENDENTE' || p.status === 'EM_ANDAMENTO' || p.status === 'ATRASADO').length;
  }, [actionPlans]);

  // Bloqueio de Acesso — Exibe Tela de Login se deslogado
  if (!currentUser) {
    return <LoginPage users={users} onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
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
        onResetData={handleResetData}
        pendingActionPlansCount={pendingActionPlansCount}
        currentUser={currentUser}
        users={users}
        onSelectUser={handleSelectUser}
        onLogout={handleLogout}
      />

      {/* Conteúdo Principal (Oculto na Impressão no-print) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 no-print">
        {activeTab === 'dashboard' && currentUser.role !== 'FORNECEDOR' && (
          <ExecutiveDashboard
            evaluations={evaluations}
            suppliers={suppliers}
            sectors={sectors}
            actionPlans={actionPlans}
            onNewEvaluation={handleStartNewEvaluation}
            onViewEvaluation={(evalId) => setReportModalEvalId(evalId)}
            onManageActionPlans={() => setActiveTab('action-plans')}
          />
        )}

        {activeTab === 'new-eval' && currentUser.role !== 'FORNECEDOR' && (
          <EvaluationForm
            suppliers={suppliers}
            sectors={sectors}
            currentUser={currentUser}
            initialEvaluation={editingEvaluation}
            preselectedSupplierId={preselectedSupplierId}
            onSave={handleSaveEvaluation}
            onCancel={() => setActiveTab('eval-list')}
          />
        )}

        {activeTab === 'eval-list' && (
          <EvaluationList
            evaluations={
              currentUser.role === 'FORNECEDOR' && currentUser.fornecedorId
                ? evaluations.filter(e => e.fornecedorId === currentUser.fornecedorId)
                : currentUser.role === 'GESTOR' && currentUser.setorId
                ? evaluations.filter(e => e.setorId === currentUser.setorId)
                : evaluations
            }
            suppliers={suppliers}
            sectors={sectors}
            actionPlans={actionPlans}
            onNewEvaluation={() => handleStartNewEvaluation()}
            onEditEvaluation={handleEditEvaluation}
            onViewReport={(evalId) => setReportModalEvalId(evalId)}
            onOpenSignatureModal={(ev) => setSignatureModalEval(ev)}
            onOpenActionPlanModal={(ev) => {
              setActionPlanTargetEval(ev);
              setActiveTab('action-plans');
            }}
            onDeleteEvaluation={handleDeleteEvaluation}
          />
        )}

        {activeTab === 'action-plans' && currentUser.role !== 'FORNECEDOR' && (
          <ActionPlans
            actionPlans={actionPlans}
            evaluations={evaluations}
            suppliers={suppliers}
            sectors={sectors}
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
            onDeleteSupplier={handleDeleteSupplier}
            onStartEvaluation={(supId) => handleStartNewEvaluation(supId)}
          />
        )}

        {activeTab === 'users' && currentUser.role === 'DIRETORIA' && (
          <UsersManager
            users={users}
            sectors={sectors}
            suppliers={suppliers}
            currentUser={currentUser}
            onSaveUser={handleSaveUser}
            onDeleteUser={handleDeleteUser}
            onSelectUser={handleSelectUser}
          />
        )}
      </main>

      {/* Modal de Ciência e Assinatura Digital do Fornecedor */}
      {signatureModalEval && (
        <SupplierSignatureModal
          evaluation={signatureModalEval}
          supplier={suppliers.find(s => s.id === signatureModalEval.fornecedorId)}
          onSaveSignature={handleSaveSignature}
          onClose={() => setSignatureModalEval(null)}
        />
      )}

      {/* Modal de Laudo em PDF e Impressão */}
      {selectedReportEvaluation && (
        <EvaluationReportModal
          evaluation={selectedReportEvaluation}
          supplier={selectedReportSupplier}
          sector={selectedReportSector}
          actionPlan={selectedReportActionPlan}
          onClose={() => setReportModalEvalId(null)}
        />
      )}

      {/* Rodapé Institucional */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 <strong>Gestão de SLA e Avaliação de Contratos Hospitalares</strong> — Diretoria Operacional
          </span>
          <span className="text-slate-400">
            Usuário Autenticado: <strong>{currentUser?.nome || 'N/A'}</strong> ({currentUser?.role})
          </span>
        </div>
      </footer>
    </div>
  );
}
export default App;
