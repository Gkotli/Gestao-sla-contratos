import { ActionPlan, Evaluation, Sector, Supplier, User } from '../types';
import { INITIAL_ACTION_PLANS, INITIAL_EVALUATIONS, INITIAL_SECTORS, INITIAL_SUPPLIERS, INITIAL_USERS } from './mockData';
import { safeNumber } from '../utils/formatters';
import { KEYS, LEGACY_KEYS, collectionForKey } from './storageKeys';
import { RemoteSync } from './remoteSync';
import { SUPABASE_CONFIGURED } from './supabaseClient';

// Nenhuma senha fica no navegador: descarta o campo de versões antigas.
function withoutPassword<T extends object>(user: T): T {
  const { senha: _discarded, ...rest } = user as T & { senha?: unknown };
  return rest as T;
}

export class StorageService {
  // Grava uma coleção no cache local e envia a diferença para o banco compartilhado (se ativo).
  // As gravações iniciais com a base de demonstração não passam por aqui de propósito.
  private static persist(key: string, list: unknown[]): void {
    const collection = collectionForKey(key);
    // Estado anterior lido pelo mesmo getter (normalizado): assim só o que mudou de verdade é enviado
    const previous = collection ? this.readNormalized(key) : [];
    localStorage.setItem(key, JSON.stringify(list));
    if (collection) RemoteSync.recordChange(collection, previous, list);
  }

  private static readNormalized(key: string): unknown[] {
    switch (key) {
      case KEYS.SECTORS: return this.getSectors();
      case KEYS.SUPPLIERS: return this.getSuppliers();
      case KEYS.EVALUATIONS: return this.getEvaluations();
      case KEYS.ACTION_PLANS: return this.getActionPlans();
      default: return [];
    }
  }

  // Lê uma coleção do cache. Sem cache, o modo local começa com a base de demonstração;
  // com o Supabase começa vazio e é preenchido pelo banco após o login.
  private static load(key: string, initial: unknown[]): any[] {
    const data = localStorage.getItem(key);
    if (!data) {
      if (SUPABASE_CONFIGURED) return [];
      localStorage.setItem(key, JSON.stringify(initial));
      return [...initial];
    }
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [...initial];
    } catch {
      return [...initial];
    }
  }

  // Apaga do navegador senhas e códigos de recuperação guardados por versões antigas.
  static cleanupLegacyData(): void {
    localStorage.removeItem(LEGACY_KEYS.PASSWORD_RESETS);
    if (SUPABASE_CONFIGURED) {
      // Usuários e sessão vêm do Supabase Auth; a cópia local não é mais usada
      localStorage.removeItem(KEYS.USERS);
      localStorage.removeItem(KEYS.CURRENT_USER);
      return;
    }
    const users = localStorage.getItem(KEYS.USERS);
    if (users && users.includes('"senha"')) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(this.getUsers()));
    }
    const current = this.getCurrentUser();
    if (current) this.setCurrentUser(current);
  }

  // Usuários locais: usados apenas no modo local de demonstração (sem Supabase).
  static getUsers(): User[] {
    const data = localStorage.getItem(KEYS.USERS);
    let list: any[] = INITIAL_USERS;
    if (!data) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
    } else {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) list = parsed;
      } catch {}
    }
    return list.map(withoutPassword);
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

  static getCurrentUser(): User | null {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    if (!data) return null;
    try {
      return withoutPassword(JSON.parse(data));
    } catch {
      return null;
    }
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(withoutPassword(user)));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  }

  static getSectors(): Sector[] {
    return this.load(KEYS.SECTORS, INITIAL_SECTORS);
  }

  static getSuppliers(): Supplier[] {
    const list = this.load(KEYS.SUPPLIERS, INITIAL_SUPPLIERS);
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

  static saveSuppliers(updated: Supplier[]): Supplier[] {
    const byId = new Map(updated.map(s => [s.id, s]));
    const suppliers = this.getSuppliers().map(s => byId.get(s.id) || s);
    this.persist(KEYS.SUPPLIERS, suppliers);
    return suppliers;
  }

  static deleteSupplier(supplierId: string): Supplier[] {
    const suppliers = this.getSuppliers().filter(s => s.id !== supplierId);
    this.persist(KEYS.SUPPLIERS, suppliers);
    return suppliers;
  }

  static getEvaluations(): Evaluation[] {
    const list = this.load(KEYS.EVALUATIONS, INITIAL_EVALUATIONS);

    // `...ev` preserva os campos não listados abaixo (perguntasAvaliadas, nomeQuestionario,
    // emailAvaliador...). Sem ele, o laudo perdia as perguntas específicas e a próxima
    // gravação apagava esses campos também no banco compartilhado.
    return list.map((ev, idx) => ({
      ...ev,
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
    return this.load(KEYS.ACTION_PLANS, INITIAL_ACTION_PLANS);
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

  // Apaga só a cópia local (sem enviar nada ao banco); ao recarregar, os dados vêm do banco.
  static clearLocalCache(): void {
    [KEYS.USERS, KEYS.SECTORS, KEYS.SUPPLIERS, KEYS.EVALUATIONS, KEYS.ACTION_PLANS, KEYS.SYNC_OUTBOX]
      .forEach(key => localStorage.removeItem(key));
  }
}
