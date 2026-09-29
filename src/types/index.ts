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

export interface SupplierQuestionItem {
  id: string;
  fornecedor: string;
  categoria: string;
  pergunta: string;
  obrigatoria: boolean;
  peso: number;
  isManualAddition?: boolean;
  justificativaAdicao?: string;
}

// Registro de que o laudo foi encaminhado ao fornecedor (comprovação de comunicação)
export interface EnvioLaudo {
  id: string;
  dataHora: string;          // ISO
  enviadoPor: string;
  enviadoPorEmail?: string;
  destinatario: string;
  assunto: string;
  meio: 'OUTLOOK';
  codigoLaudo: string;       // código de verificação do conteúdo enviado
}

// Ação feita pelo próprio fornecedor, logado com a conta dele no site
export interface AcaoFornecedorSite {
  dataHora: string;          // ISO
  usuarioId: string;
  nome: string;
  email: string;
  codigoLaudo: string;       // versão do laudo vista/validada
  navegador?: string;
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
  
  perguntasAvaliadas?: SupplierQuestionItem[];
  isQuestionarioEspecifico?: boolean;
  nomeQuestionario?: string;
  
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
  cienciaRegistradaPor?: string;   // usuário que registrou a ciência (fornecedor ou gestor em nome dele)

  historicoEnvios?: EnvioLaudo[];
  visualizacaoFornecedor?: AcaoFornecedorSite;   // primeira vez que o fornecedor abriu o laudo no site
  validacaoFornecedor?: AcaoFornecedorSite;      // fornecedor validou o laudo no site
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
