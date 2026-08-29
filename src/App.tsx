import React, { useState, useMemo } from 'react';
import { ActionPlan, Evaluation, Sector, Supplier, User } from './types';
import { StorageService } from './services/storageService';
import { Header } from './components/Header';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { EvaluationForm } from './components/EvaluationForm';
import { EvaluationList } from './components/EvaluationList';
import { ActionPlans } from './components/ActionPlans';
import { SuppliersManager } from './components/SuppliersManager';
import { UsersManager } from './components/UsersManager';
import { EvaluationReportModal } from './components/EvaluationReportModal';
import { SupplierSignatureModal } from './components/SupplierSignatureModal';
import { LoginPage } from './components/LoginPage';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Persistent Application State
  const [currentUser, setCurrentUser] = useState<User | null>(() => StorageService.getCurrentUser());
  const [users, setUsers] = useState<User[]>(() => StorageService.getUsers());
  const [sectors, setSectors] = useState<Sector[]>(() => StorageService.getSectors());
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => StorageService.getSuppliers());
  const [evaluations, setEvaluations] = useState<Evaluation[]>(() => StorageService.getEvaluations());
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>(() => StorageService.getActionPlans());

  // Inter-component Action States
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);
  const [preselectedSupplierId, setPreselectedSupplierId] = useState<string | undefined>(undefined);
  const [actionPlanTargetEval, setActionPlanTargetEval] = useState<Evaluation | undefined>(undefined);
  const [reportModalEvalId, setReportModalEvalId] = useState<string | null>(null);
  const [signatureModalEval, setSignatureModalEval] = useState<Evaluation | null>(null);

  // --- FILTRAGEM RÍGIDA DE ACESSO POR SETOR / ROLE ---
  // Apenas a DIRETORIA enxerga todos os 11 setores e 83 fornecedores.
  // Cada GESTOR enxerga EXCLUSIVAMENTE a gestão do seu setor (currentUser.setorId).
  const isDiretoria = currentUser?.role === 'DIRETORIA';
  const isGestor = currentUser?.role === 'GESTOR';
  const isFornecedor = currentUser?.role === 'FORNECEDOR';

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
    if (user.role === 'FORNECEDOR') {
      setActiveTab('eval-list');
    }
  };

  // --- Reset de Dados ---
  const handleResetData = () => {
    if (window.confirm('Deseja restaurar a base de dados oficial com os 11 setores e 83 fornecedores do Vila Nova Star?')) {
      StorageService.resetAllData();
      setSectors(StorageService.getSectors());
      setSuppliers(StorageService.getSuppliers());
      setEvaluations(StorageService.getEvaluations());
      setActionPlans(StorageService.getActionPlans());
      setUsers(StorageService.getUsers());
      alert('Base de dados restaurada com sucesso!');
    }
  };

  // --- User Handlers ---
  const handleSaveUser = (user: User) => {
    const updated = StorageService.saveUser(user);
    setUsers(updated);
  };

  const handleDeleteUser = (userId: string) => {
    const updated = StorageService.deleteUser(userId);
    setUsers(updated);
  };

  // --- Supplier Handlers ---
  const handleSaveSupplier = (supplier: Supplier) => {
    const updated = StorageService.saveSupplier(supplier);
    setSuppliers(updated);
  };

  const handleDeleteSupplier = (supplierId: string) => {
    const updated = StorageService.deleteSupplier(supplierId);
    setSuppliers(updated);
  };

  // --- Evaluation Handlers ---
  const handleStartNewEvaluation = (supplierId?: string) => {
    setEditingEvaluation(null);
    setPreselectedSupplierId(supplierId);
    setActiveTab('new-eval');
  };

  const handleEditEvaluation = (evaluation: Evaluation) => {
    setEditingEvaluation(evaluation);
    setPreselectedSupplierId(evaluation.fornecedorId);
    setActiveTab('new-eval');
  };

  const handleSaveEvaluation = (evaluation: Evaluation, openActionPlanModalDirectly: boolean = false) => {
    const updatedEvaluations = StorageService.saveEvaluation(evaluation);
    setEvaluations(updatedEvaluations);
    setEditingEvaluation(null);
    setPreselectedSupplierId(undefined);

    if (openActionPlanModalDirectly || evaluation.necessitaPlanoAcao) {
      setActionPlanTargetEval(evaluation);
      setActiveTab('action-plans');
    } else {
      setActiveTab('eval-list');
    }
  };

  const handleDeleteEvaluation = (evalId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação de contrato?')) {
      const updated = evaluations.filter(e => e.id !== evalId);
      localStorage.setItem('sla_hospital_evaluations_v5', JSON.stringify(updated));
      setEvaluations(updated);
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

  // Count pending action plans for badge notification (scoped to manager's area)
  const pendingActionPlansCount = useMemo(() => {
    return scopedActionPlans.filter(p => p.status === 'PENDENTE' || p.status === 'EM_ANDAMENTO' || p.status === 'ATRASADO').length;
  }, [scopedActionPlans]);

  // Bloqueio de Acesso — Exibe Tela de Login se deslogado
  if (!currentUser) {
    return <LoginPage users={users} onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans app-root-container">
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 no-print app-main-content">
        {activeTab === 'dashboard' && currentUser.role !== 'FORNECEDOR' && (
          <ExecutiveDashboard
            evaluations={scopedEvaluations}
            suppliers={scopedSuppliers}
            sectors={scopedSectors}
            actionPlans={scopedActionPlans}
            onNewEvaluation={handleStartNewEvaluation}
            onViewEvaluation={(evalId) => setReportModalEvalId(evalId)}
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
            onSave={handleSaveEvaluation}
            onCancel={() => setActiveTab('eval-list')}
          />
        )}

        {activeTab === 'eval-list' && (
          <EvaluationList
            evaluations={scopedEvaluations}
            suppliers={scopedSuppliers}
            sectors={scopedSectors}
            actionPlans={scopedActionPlans}
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
          sector={sectors.find(s => s.id === signatureModalEval.setorId)}
          onSave={handleSaveSignature}
          onClose={() => setSignatureModalEval(null)}
        />
      )}

      {/* Modal do Laudo Oficial (Impressão A4 Multipáginas) */}
      {selectedReportEvaluation && (
        <EvaluationReportModal
          evaluation={selectedReportEvaluation}
          supplier={selectedReportSupplier}
          sector={selectedReportSector}
          actionPlan={selectedReportActionPlan}
          onClose={() => setReportModalEvalId(null)}
        />
      )}

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 no-print">
        <p>© 2026 Rede D'Or - Hospital Vila Nova Star. Sistema Oficial de Gestão de Contratos e SLA.</p>
      </footer>
    </div>
  );
}
