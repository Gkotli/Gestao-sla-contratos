import { Supplier, SupplierQuestionItem } from '../types';
import { SUPPLIER_QUESTIONNAIRES_DATA } from '../data/supplierQuestionnairesData';
import { EVALUATION_QUESTIONS } from './questions';

export interface QuestionnaireLoadResult {
  questions: SupplierQuestionItem[];
  isCustom: boolean;
  label: string;
  supplierKey: string;
}

export class QuestionnaireService {
  /**
   * Localiza e carrega as perguntas vinculadas ao fornecedor ou aciona o fallback seguro.
   */
  static getQuestionsForSupplier(supplier: Supplier | null | undefined): QuestionnaireLoadResult {
    if (!supplier) {
      return this.getStandardFallback('Fornecedor não selecionado');
    }

    // 1. Busca por nomeFantasia exato
    if (supplier.nomeFantasia && SUPPLIER_QUESTIONNAIRES_DATA[supplier.nomeFantasia]) {
      const qs = SUPPLIER_QUESTIONNAIRES_DATA[supplier.nomeFantasia];
      return {
        questions: qs.map(q => ({ ...q })),
        isCustom: true,
        label: `Questionário padrão de ${supplier.nomeFantasia} - ${qs.length} perguntas`,
        supplierKey: supplier.nomeFantasia
      };
    }

    // 2. Busca por razaoSocial exata
    if (supplier.razaoSocial && SUPPLIER_QUESTIONNAIRES_DATA[supplier.razaoSocial]) {
      const qs = SUPPLIER_QUESTIONNAIRES_DATA[supplier.razaoSocial];
      return {
        questions: qs.map(q => ({ ...q })),
        isCustom: true,
        label: `Questionário padrão de ${supplier.nomeFantasia} - ${qs.length} perguntas`,
        supplierKey: supplier.razaoSocial
      };
    }

    // 3. Fallback seguro: Questionário padrão de 15 perguntas
    return this.getStandardFallback(supplier.nomeFantasia);
  }

  /**
   * Converte as 15 perguntas padrão para a estrutura unificada SupplierQuestionItem.
   */
  static getStandardFallback(supplierName: string): QuestionnaireLoadResult {
    const standardQuestions: SupplierQuestionItem[] = EVALUATION_QUESTIONS.map(q => {
      let cat = 'PROGRAMA QUALIDADE E SEGURANÇA';
      if (q.category === 'LEGAIS') cat = 'ASPECTOS LEGAIS';
      if (q.category === 'COMPORTAMENTAIS') cat = 'ASPECTOS COMPORTAMENTAIS';

      return {
        id: q.id,
        fornecedor: supplierName,
        categoria: cat,
        pergunta: q.text,
        obrigatoria: true,
        peso: 1
      };
    });

    return {
      questions: standardQuestions,
      isCustom: false,
      label: 'Fornecedor sem questionário específico. Usando padrão (15 perguntas).',
      supplierKey: 'PADRAO'
    };
  }

  /**
   * Agrupa uma lista de perguntas por sua respectiva categoria.
   */
  static groupByCategory(questions: SupplierQuestionItem[]): Record<string, SupplierQuestionItem[]> {
    const groups: Record<string, SupplierQuestionItem[]> = {};

    // Garante uma ordem preferencial para as categorias clássicas
    const order = ['ASPECTOS LEGAIS', 'ASPECTOS COMPORTAMENTAIS', 'PROGRAMA QUALIDADE E SEGURANÇA'];
    order.forEach(cat => {
      groups[cat] = [];
    });

    questions.forEach(q => {
      const cat = q.categoria || 'OUTROS';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(q);
    });

    // Remove categorias vazias
    Object.keys(groups).forEach(cat => {
      if (groups[cat].length === 0) {
        delete groups[cat];
      }
    });

    return groups;
  }

  /**
   * Calcula a média ponderada ou aritmética das respostas de um grupo de perguntas.
   */
  static calculateGroupAverage(
    questions: SupplierQuestionItem[],
    answers: Record<string, number | 'NA'>
  ): number {
    let weightedSum = 0;
    let totalWeight = 0;

    questions.forEach(q => {
      const score = answers[q.id];
      if (typeof score === 'number' && !isNaN(score)) {
        const weight = q.peso > 0 ? q.peso : 1;
        weightedSum += score * weight;
        totalWeight += weight;
      }
    });

    if (totalWeight === 0) return 0;
    return Number((weightedSum / totalWeight).toFixed(2));
  }
}
