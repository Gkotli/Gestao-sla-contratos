import { ActionPlan, Evaluation, Sector, Supplier, User } from '../types';
import { INITIAL_ACTION_PLANS, INITIAL_EVALUATIONS, INITIAL_SECTORS, INITIAL_SUPPLIERS, INITIAL_USERS } from './mockData';

const KEYS = {
  USERS: 'sla_hospital_users_v4',
  CURRENT_USER: 'sla_hospital_current_user_v4',
  SECTORS: 'sla_hospital_sectors_v4',
  SUPPLIERS: 'sla_hospital_suppliers_v4',
  EVALUATIONS: 'sla_hospital_evaluations_v4',
  ACTION_PLANS: 'sla_hospital_action_plans_v4'
};

export class StorageService {
  static getUsers(): User[] {
    const data = localStorage.getItem(KEYS.USERS);
    if (!data) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(data);
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
    if (!data) {
      localStorage.setItem(KEYS.SECTORS, JSON.stringify(INITIAL_SECTORS));
      return INITIAL_SECTORS;
    }
    return JSON.parse(data);
  }

  static getSuppliers(): Supplier[] {
    const data = localStorage.getItem(KEYS.SUPPLIERS);
    if (!data) {
      localStorage.setItem(KEYS.SUPPLIERS, JSON.stringify(INITIAL_SUPPLIERS));
      return INITIAL_SUPPLIERS;
    }
    return JSON.parse(data);
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
    if (!data) {
      localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(INITIAL_EVALUATIONS));
      return INITIAL_EVALUATIONS;
    }
    return JSON.parse(data);
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
    const evaluations = this.getEvaluations().filter(e => e.id !== evaluationId);
    localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(evaluations));
    return evaluations;
  }

  static getActionPlans(): ActionPlan[] {
    const data = localStorage.getItem(KEYS.ACTION_PLANS);
    if (!data) {
      localStorage.setItem(KEYS.ACTION_PLANS, JSON.stringify(INITIAL_ACTION_PLANS));
      return INITIAL_ACTION_PLANS;
    }
    return JSON.parse(data);
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

  static deleteActionPlan(planId: string): ActionPlan[] {
    const plans = this.getActionPlans().filter(p => p.id !== planId);
    localStorage.setItem(KEYS.ACTION_PLANS, JSON.stringify(plans));
    return plans;
  }

  static resetToDefault(): void {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0]));
    localStorage.setItem(KEYS.SECTORS, JSON.stringify(INITIAL_SECTORS));
    localStorage.setItem(KEYS.SUPPLIERS, JSON.stringify(INITIAL_SUPPLIERS));
    localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(INITIAL_EVALUATIONS));
    localStorage.setItem(KEYS.ACTION_PLANS, JSON.stringify(INITIAL_ACTION_PLANS));
  }
}
