import { Question } from '../types';

export const EVALUATION_QUESTIONS: Question[] = [
  // --- ASPECTOS LEGAIS & REGULATÓRIOS (1 a 5) ---
  {
    id: 'leg_1',
    category: 'LEGAIS',
    text: 'O fornecedor dispõe de profissionais habilitados, capacitados, treinados e tecnicamente aptos para atender à demanda?',
    helpText: 'Verificar comprovação de registros em conselhos de classe, certidões e treinamentos específicos.'
  },
  {
    id: 'leg_2',
    category: 'LEGAIS',
    text: 'O fornecedor cumpre as legislações, normas de vigilância sanitária (ANVISA), trabalhistas e fiscalizatórias aplicáveis?',
    helpText: 'Conformidade legal, regularidade fiscal, trabalhista e licenças sanitárias vigentes.'
  },
  {
    id: 'leg_3',
    category: 'LEGAIS',
    text: 'Os profissionais cumprem normas internas, horários, crachá, segurança e demais obrigações institucionais do hospital?',
    helpText: 'Respeito ao regimento interno e fluxos operacionais hospitalares.'
  },
  {
    id: 'leg_4',
    category: 'LEGAIS',
    text: 'Nos casos de ausência, faltas ou desligamento de profissionais, existe substituição adequada e tempestiva?',
    helpText: 'Manutenção do dimensionamento de pessoal contratado sem descontinuidade na assistência.'
  },
  {
    id: 'leg_5',
    category: 'LEGAIS',
    text: 'Os colaboradores utilizam obrigatoriamente todos os Equipamentos de Proteção Individual (EPIs) recomendados?',
    helpText: 'Cumprimento das NRs e protocolos de biossegurança de vestimenta e proteção.'
  },

  // --- ASPECTOS COMPORTAMENTAIS (6 a 10) ---
  {
    id: 'comp_1',
    category: 'COMPORTAMENTAIS',
    text: 'A equipe mantém atendimento cortês, com ética, urbanidade e presteza aos pacientes, acompanhantes e corpo clínico?',
    helpText: 'Humanização do atendimento e conduta profissional nas dependências do hospital.'
  },
  {
    id: 'comp_2',
    category: 'COMPORTAMENTAIS',
    text: 'A apresentação pessoal dos colaboradores está adequada (uso correto de crachá de identificação e uniforme/jaleco)?',
    helpText: 'Padronização visual, higienização de uniformes e crachá visível.'
  },
  {
    id: 'comp_3',
    category: 'COMPORTAMENTAIS',
    text: 'Os prestadores de serviço cumprem rigorosamente a política institucional de adornos zero em áreas assistenciais?',
    helpText: 'Cumprimento da NR-32 e diretrizes assistenciais sobre adornos.'
  },
  {
    id: 'comp_4',
    category: 'COMPORTAMENTAIS',
    text: 'Existe comunicação clara, ágil e eficiente entre a supervisão da contratada e a gestão do hospital?',
    helpText: 'Facilidade de contato com a supervisão/gerência do fornecedor para alinhamentos.'
  },
  {
    id: 'comp_5',
    category: 'COMPORTAMENTAIS',
    text: 'Os colaboradores da contratada contribuem ativamente para a higiene, organização e segurança das áreas de atuação?',
    helpText: 'Manutenção da ordem, limpeza e segurança dos postos de trabalho.'
  },

  // --- PROGRAMA QUALIDADE E SEGURANÇA (11 a 15) ---
  {
    id: 'qual_1',
    category: 'QUALIDADE',
    text: 'Pesquisa de opinião: o nível de satisfação dos usuários e pacientes pelo serviço prestado está dentro da meta estipulada?',
    helpText: 'Engajamento no cumprimento de metas de acreditação e pesquisas de satisfação.'
  },
  {
    id: 'qual_2',
    category: 'QUALIDADE',
    text: 'Os colaboradores participam dos treinamentos obrigatórios (integração, SBV, Metas Internacionais de Segurança)?',
    helpText: 'Adesão às capacitações e certificações institucionais da qualidade.'
  },
  {
    id: 'qual_3',
    category: 'QUALIDADE',
    text: 'Os indicadores contratuais e relatórios operacionais são alimentados e entregues rigorosamente no prazo?',
    helpText: 'Pontualidade e consistência técnica na entrega de relatórios periódicos.'
  },
  {
    id: 'qual_4',
    category: 'QUALIDADE',
    text: 'O gestor do fornecedor participa das reuniões de alinhamento mensal e análise crítica de desempenho?',
    helpText: 'Presença em reuniões de comitês, alinhamento mensal e análise de SLA.'
  },
  {
    id: 'qual_5',
    category: 'QUALIDADE',
    text: 'As tratativas de não conformidades e planos de ação preventivos/corretivos são executados nos prazos firmados?',
    helpText: 'Resolução efetiva de inconsistências e execução dos planos de ação.'
  }
];
