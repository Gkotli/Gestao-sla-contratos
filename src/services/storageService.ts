import { ActionPlan, Evaluation, Sector, Supplier, User } from '../types';
import { INITIAL_ACTION_PLANS, INITIAL_EVALUATIONS, INITIAL_SECTORS, INITIAL_SUPPLIERS, INITIAL_USERS } from './mockData';
import { safeNumber } from '../utils/formatters';
import { KEYS, collectionForKey } from './storageKeys';
import { RemoteSync } from './remoteSync';

export class StorageService {
  // Grava uma coleção no cache local e envia a diferença para o banco compartilhado (se ativo).
  // As gravações iniciais com a base de demonstração não passam por aqui de propósito.
  private static persist(key: string, list: unknown[]): void {
    const previous = localStorage.getItem(key);
    localStorage.setItem(key, JSON.stringify(list));
    const collection = collectionForKey(key);
    if (collection) RemoteSync.recordChange(collection, previous, list);
  }

  static getUsers(): User[] {
    const data = localStorage.getItem(KEYS.USERS);
    let list: any[] = [];
    if (!data) {
      list = INITIAL_USERS;
      localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
    } else {
      try {
        const parsed = JSON.parse(data);
        list = Array.isArray(parsed) ? parsed : INITIAL_USERS;
      } catch {
        list = INITIAL_USERS;
      }
    }
    return list;
  }

  static saveUser(user: User): User[] {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    this.persist(KEYS.USERS, users);
    return users;
  }

  static deleteUser(userId: string): User[] {
    const users = this.getUsers().filter(u => u.id !== userId);
    this.persist(KEYS.USERS, users);
    return users;
  }

  static savePasswordResetCode(email: string, code: string, expirationMinutes = 15): void {
    const data = localStorage.getItem(KEYS.PASSWORD_RESETS);
    let resets: Record<string, { code: string; expiresAt: number }> = {};
    if (data) {
      try {
        resets = JSON.parse(data);
      } catch {}
    }
    resets[email.toLowerCase().trim()] = {
      code: code.trim(),
      expiresAt: Date.now() + expirationMinutes * 60 * 1000
    };
    localStorage.setItem(KEYS.PASSWORD_RESETS, JSON.stringify(resets));
  }

  static verifyPasswordResetCode(email: string, code: string): { valid: boolean; message?: string } {
    const data = localStorage.getItem(KEYS.PASSWORD_RESETS);
    if (!data) return { valid: false, message: 'Nenhum código solicitado para este e-mail.' };
    try {
      const resets = JSON.parse(data);
      const entry = resets[email.toLowerCase().trim()];
      if (!entry) return { valid: false, message: 'Código não encontrado. Solicite um novo código.' };
      if (Date.now() > entry.expiresAt) {
        return { valid: false, message: 'O código de verificação expirou. Solicite um novo código.' };
      }
      if (entry.code !== code.trim()) {
        return { valid: false, message: 'Código incorreto. Por favor, verifique os 6 dígitos informados.' };
      }
      return { valid: true };
    } catch {
      return { valid: false, message: 'Erro ao validar código.' };
    }
  }

  static clearPasswordResetCode(email: string): void {
    const data = localStorage.getItem(KEYS.PASSWORD_RESETS);
    if (!data) return;
    try {
      const resets = JSON.parse(data);
      delete resets[email.toLowerCase().trim()];
      localStorage.setItem(KEYS.PASSWORD_RESETS, JSON.stringify(resets));
    } catch {}
  }

  static updateUserPassword(email: string, newPassword: string): User | null {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());
    if (idx >= 0) {
      users[idx] = {
        ...users[idx],
        senha: newPassword
      };
      this.persist(KEYS.USERS, users);
      this.clearPasswordResetCode(email);
      return users[idx];
    }
    return null;
  }

  static getCurrentUser(): User | null {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  }

  static getSectors(): Sector[] {
    const data = localStorage.getItem(KEYS.SECTORS);
    let list: any[] = [];
    if (!data) {
      list = INITIAL_SECTORS;
      localStorage.setItem(KEYS.SECTORS, JSON.stringify(INITIAL_SECTORS));
    } else {
      try {
        const parsed = JSON.parse(data);
        list = Array.isArray(parsed) ? parsed : INITIAL_SECTORS;
      } catch {
        list = INITIAL_SECTORS;
      }
    }
    return list;
  }

  static getSuppliers(): Supplier[] {
    const data = localStorage.getItem(KEYS.SUPPLIERS);
    let list: any[] = [];
    if (!data) {
      list = INITIAL_SUPPLIERS;
      localStorage.setItem(KEYS.SUPPLIERS, JSON.stringify(INITIAL_SUPPLIERS));
    } else {
      try {
        const parsed = JSON.parse(data);
        list = Array.isArray(parsed) ? parsed : INITIAL_SUPPLIERS;
      } catch {
        list = INITIAL_SUPPLIERS;
      }
    }
    return list.map((s, idx) => ({
      id: s?.id || `sup_${idx}`,
      cnpj: s?.cnpj || '',
      razaoSocial: s?.razaoSocial || 'Fornecedor',
      nomeFantasia: s?.nomeFantasia || s?.razaoSocial || 'Fornecedor',
      categoriaServico: s?.categoriaServico || 'Serviços Prestados',
      setorResponsavelId: s?.setorResponsavelId || 'sec_manutencao',
      contatoNome: s?.contatoNome || '',
      contatoEmail: s?.contatoEmail || '',
      contatoTelefone: s?.contatoTelefone || '',
      numeroContrato: s?.numeroContrato || 'Contrato Sem Número',
      vigenciaFim: s?.vigenciaFim || 'Indeterminado'
    }));
  }

  static saveSupplier(supplier: Supplier): Supplier[] {
    const suppliers = this.getSuppliers();
    const idx = suppliers.findIndex(s => s.id === supplier.id);
    if (idx >= 0) {
      suppliers[idx] = supplier;
    } else {
      suppliers.push(supplier);
    }
    this.persist(KEYS.SUPPLIERS, suppliers);
    return suppliers;
  }

  static deleteSupplier(supplierId: string): Supplier[] {
    const suppliers = this.getSuppliers().filter(s => s.id !== supplierId);
    this.persist(KEYS.SUPPLIERS, suppliers);
    return suppliers;
  }

  static getEvaluations(): Evaluation[] {
    const data = localStorage.getItem(KEYS.EVALUATIONS);
    let list: any[] = [];
    if (!data) {
      list = INITIAL_EVALUATIONS;
      localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(INITIAL_EVALUATIONS));
    } else {
      try {
        const parsed = JSON.parse(data);
        list = Array.isArray(parsed) ? parsed : INITIAL_EVALUATIONS;
      } catch {
        list = INITIAL_EVALUATIONS;
      }
    }

    return list.map((ev, idx) => ({
      id: ev?.id || `eval_${idx}_${Date.now()}`,
      fornecedorId: ev?.fornecedorId || 'sup_acquasuly',
      setorId: ev?.setorId || 'sec_manutencao',
      ano: typeof ev?.ano === 'number' ? ev.ano : 2026,
      dataAvaliacao: ev?.dataAvaliacao || new Date().toISOString().split('T')[0],
      gestorAvaliador: ev?.gestorAvaliador || 'Gestor Responsável',
      tipoAvaliacao: ev?.tipoAvaliacao || 'PADRAO',
      justificativaExcecao: ev?.justificativaExcecao || '',
      itensExcecao: Array.isArray(ev?.itensExcecao) ? ev.itensExcecao : [],
      respostas: ev?.respostas && typeof ev.respostas === 'object' ? ev.respostas : {},
      observacoesLegais: ev?.observacoesLegais || '',
      observacoesComportamentais: ev?.observacoesComportamentais || '',
      observacoesQualidade: ev?.observacoesQualidade || '',
      parecerGeral: ev?.parecerGeral || 'Avaliação de Desempenho Anual.',
      mediaLegais: safeNumber(ev?.mediaLegais),
      mediaComportamentais: safeNumber(ev?.mediaComportamentais),
      mediaQualidade: safeNumber(ev?.mediaQualidade),
      mediaGeral: safeNumber(ev?.mediaGeral),
      statusMeta: ev?.statusMeta || 'DENTRO_DA_META',
      necessitaPlanoAcao: Boolean(ev?.necessitaPlanoAcao),
      statusAssinatura: ev?.statusAssinatura || 'PENDENTE_ENVIO',
      dataCiencia: ev?.dataCiencia,
      nomeSignatario: ev?.nomeSignatario,
      cargoSignatario: ev?.cargoSignatario,
      parecerFornecedor: ev?.parecerFornecedor,
      assinaturaBase64: ev?.assinaturaBase64 || ev?.assinaturaDigitalUrl,
      assinaturaDigitalUrl: ev?.assinaturaDigitalUrl || ev?.assinaturaBase64
    }));
  }

  static saveEvaluation(evaluation: Evaluation): Evaluation[] {
    const evaluations = this.getEvaluations();
    const idx = evaluations.findIndex(e => e.id === evaluation.id);
    if (idx >= 0) {
      evaluations[idx] = evaluation;
    } else {
      evaluations.unshift(evaluation);
    }
    this.persist(KEYS.EVALUATIONS, evaluations);
    return evaluations;
  }

  static deleteEvaluation(evaluationId: string): Evaluation[] {
    if (!evaluationId) return this.getEvaluations();

    const evaluations = this.getEvaluations().filter(e => e.id !== evaluationId);
    this.persist(KEYS.EVALUATIONS, evaluations);

    // Exclui também os planos de ação vinculados para integridade referencial
    const actionPlans = this.getActionPlans().filter(p => p.evaluationId !== evaluationId);
    this.persist(KEYS.ACTION_PLANS, actionPlans);

    return evaluations;
  }

  static getActionPlans(): ActionPlan[] {
    const data = localStorage.getItem(KEYS.ACTION_PLANS);
    let list: any[] = [];
    if (!data) {
      list = INITIAL_ACTION_PLANS;
      localStorage.setItem(KEYS.ACTION_PLANS, JSON.stringify(INITIAL_ACTION_PLANS));
    } else {
      try {
        const parsed = JSON.parse(data);
        list = Array.isArray(parsed) ? parsed : INITIAL_ACTION_PLANS;
      } catch {
        list = INITIAL_ACTION_PLANS;
      }
    }
    return list;
  }

  static saveActionPlan(plan: ActionPlan): ActionPlan[] {
    const plans = this.getActionPlans();
    const idx = plans.findIndex(p => p.id === plan.id);
    if (idx >= 0) {
      plans[idx] = plan;
    } else {
      plans.unshift(plan);
    }
    this.persist(KEYS.ACTION_PLANS, plans);
    return plans;
  }

  static deleteActionPlan(planId: string): ActionPlan[] {
    const plans = this.getActionPlans().filter(p => p.id !== planId);
    this.persist(KEYS.ACTION_PLANS, plans);
    return plans;
  }

  static resetAllData(): void {
    this.persist(KEYS.SECTORS, INITIAL_SECTORS);
    this.persist(KEYS.SUPPLIERS, INITIAL_SUPPLIERS);
    this.persist(KEYS.EVALUATIONS, INITIAL_EVALUATIONS);
    this.persist(KEYS.ACTION_PLANS, INITIAL_ACTION_PLANS);
    this.persist(KEYS.USERS, INITIAL_USERS);
  }
}
