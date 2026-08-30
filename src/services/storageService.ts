import { ActionPlan, Evaluation, Sector, Supplier, User } from '../types';
import { INITIAL_ACTION_PLANS, INITIAL_EVALUATIONS, INITIAL_SECTORS, INITIAL_SUPPLIERS, INITIAL_USERS } from './mockData';
import { safeNumber } from '../utils/formatters';

const KEYS = {
  USERS: 'sla_hospital_users_v8',
  CURRENT_USER: 'sla_hospital_current_user_v8',
  SECTORS: 'sla_hospital_sectors_v8',
  SUPPLIERS: 'sla_hospital_suppliers_v8',
  EVALUATIONS: 'sla_hospital_evaluations_v8',
  ACTION_PLANS: 'sla_hospital_action_plans_v8'
};

export class StorageService {
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
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return users;
  }

  static deleteUser(userId: string): User[] {
    const users = this.getUsers().filter(u => u.id !== userId);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return users;
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
    localStorage.setItem(KEYS.SUPPLIERS, JSON.stringify(suppliers));
    return suppliers;
  }

  static deleteSupplier(supplierId: string): Supplier[] {
    const suppliers = this.getSuppliers().filter(s => s.id !== supplierId);
    localStorage.setItem(KEYS.SUPPLIERS, JSON.stringify(suppliers));
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
      emailAvaliador: ev?.emailAvaliador || 'gestor@vilanovastar.com.br',
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
      assinaturaDigitalUrl: ev?.assinaturaDigitalUrl
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
    localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(evaluations));
    return evaluations;
  }

  static deleteEvaluation(evaluationId: string): Evaluation[] {
    if (!evaluationId) return this.getEvaluations();

    const evaluations = this.getEvaluations().filter(e => e.id !== evaluationId);
    localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(evaluations));

    // Exclui também os planos de ação vinculados para integridade referencial
    const actionPlans = this.getActionPlans().filter(p => p.avaliacaoId !== evaluationId);
    localStorage.setItem(KEYS.ACTION_PLANS, JSON.stringify(actionPlans));

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
    localStorage.setItem(KEYS.ACTION_PLANS, JSON.stringify(plans));
    return plans;
  }

  static resetAllData(): void {
    localStorage.setItem(KEYS.SECTORS, JSON.stringify(INITIAL_SECTORS));
    localStorage.setItem(KEYS.SUPPLIERS, JSON.stringify(INITIAL_SUPPLIERS));
    localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(INITIAL_EVALUATIONS));
    localStorage.setItem(KEYS.ACTION_PLANS, JSON.stringify(INITIAL_ACTION_PLANS));
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
}
