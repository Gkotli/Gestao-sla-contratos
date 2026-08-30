export type ScoreValue = 5 | 4 | 3 | 2 | 1 | 'NA';

export type QuestionCategory = 'LEGAIS' | 'COMPORTAMENTAIS' | 'QUALIDADE';

export type UserRole = 'DIRETORIA' | 'GESTOR' | 'FORNECEDOR';

export interface User {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  cargo: string;
  role: UserRole;
  setorId?: string;       // Vinculado se for GESTOR
  fornecedorId?: string;  // Vinculado se for FORNECEDOR
}

export interface Question {
  id: string;
  category: QuestionCategory;
  text: string;
  helpText?: string;
}

export type MetaStatus = 'DENTRO_DA_META' | 'ABAIXO_DA_META' | 'CRITICO';

export type SignStatus = 'PENDENTE_ENVIO' | 'ENVIADO_FORNECEDOR' | 'ASSINADO_CIENTE' | 'CONTESTADO';

export type ActionPlanStatus = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'ATRASADO';

export interface Sector {
  id: string;
  nome: string;
  gestorResponsavel: string;
  emailGestor: string;
}

export interface Supplier {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  categoriaServico: string;
  setorResponsavelId: string;
  contatoNome: string;
  contatoEmail: string;
  contatoTelefone: string;
  numeroContrato: string;
  vigenciaFim: string;
}

export interface EvaluationAnswers {
  [questionId: string]: ScoreValue;
}

export type EvaluationType = 'PADRAO' | 'EXCECAO';

export interface ExceptionItem {
  id: string;
  pergunta: string;
  grupo: string;
  nota: ScoreValue;
}

export interface Evaluation {
  id: string;
  fornecedorId: string;
  setorId: string;
  ano: number;
  dataAvaliacao: string;
  gestorAvaliador: string;
  emailAvaliador?: string;
  
  tipoAvaliacao?: EvaluationType;
  justificativaExcecao?: string;
  itensExcecao?: ExceptionItem[];
  
  respostas: EvaluationAnswers;
  
  observacoesLegais?: string;
  observacoesComportamentais?: string;
  observacoesQualidade?: string;
  parecerGeral?: string;
  
  mediaLegais: number;
  mediaComportamentais: number;
  mediaQualidade: number;
  mediaGeral: number;
  
  statusMeta: MetaStatus;
  necessitaPlanoAcao: boolean;
  
  statusAssinatura: SignStatus;
  dataCiencia?: string;
  nomeSignatario?: string;
  cargoSignatario?: string;
  parecerFornecedor?: string;
  assinaturaBase64?: string;
  assinaturaDigitalUrl?: string;
}

export interface ActionPlan {
  id: string;
  evaluationId: string;
  fornecedorId: string;
  setorId: string;
  ano: number;
  
  titulo: string;
  acao5W: string;        // O que fazer (What)
  justificativa5W: string; // Por que (Why)
  responsavel5W: string; // Quem (Who)
  onde5W?: string;       // Onde (Where)
  prazo5W: string;       // Quando (When)
  como5W?: string;       // Como (How)
  custo5W?: string;      // Quanto custa (How much)
  
  status: ActionPlanStatus;
  dataCriacao: string;
  observacoesAcompanhamento?: string;
}
