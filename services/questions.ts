import { Question } from '../types';

export const EVALUATION_QUESTIONS: Question[] = [
  // --- ASPECTOS LEGAIS ---
  {
    id: 'leg_1',
    category: 'LEGAIS',
    text: 'O fornecedor dispõe de profissionais habilitados, capacitados, treinados e tecnicamente aptos para atender à demanda?',
    helpText: 'Verificar comprovação de registros em conselhos de classe, certidões e treinamentos específicos.'
  },
  {
    id: 'leg_2',
    category: 'LEGAIS',
    text: 'O fornecedor cumpre as legislações, normas vigilância sanitária (ANVISA), trabalhistas e fiscalizatórias aplicáveis?',
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
    text: 'Os profissionais utilizam os Equipamentos de Proteção Individual (EPIs) recomendados e vestuário adequado?',
    helpText: 'Cumprimento das NRs e protocolos de biossegurança de vestimenta e proteção.'
  },

  // --- ASPECTOS COMPORTAMENTAIS ---
  {
    id: 'comp_1',
    category: 'COMPORTAMENTAIS',
    text: 'A equipe do fornecedor demonstra postura ética, cordialidade, empatia e respeito no atendimento a pacientes e colaboradores?',
    helpText: 'Humanização do atendimento e conduta profissional nas dependências do hospital.'
  },
  {
    id: 'comp_2',
    category: 'COMPORTAMENTAIS',
    text: 'Há prontidão, agilidade e eficácia na resolução de problemas, intercorrências e solicitações da gestão hospitalar?',
    helpText: 'Capacidade de resposta rápida e resolução de inconsistências operacionais.'
  },
  {
    id: 'comp_3',
    category: 'COMPORTAMENTAIS',
    text: 'A liderança/preposto do fornecedor mantém comunicação transparente, alinhamento técnico e acessibilidade constante?',
    helpText: 'Facilidade de contato com a supervisão/gerência do fornecedor para alinhamentos.'
  },
  {
    id: 'comp_4',
    category: 'COMPORTAMENTAIS',
    text: 'Os profissionais respeitam o sigilo médico, privacidade dos pacientes e diretrizes de confidencialidade (LGPD)?',
    helpText: 'Guarda de dados de prontuários e proteção de informações dos pacientes.'
  },
  {
    id: 'comp_5',
    category: 'COMPORTAMENTAIS',
    text: 'Há pontualidade na entrega de relatórios operacionais, escalas mensais e documentos solicitados pela contratante?',
    helpText: 'Cumprimento dos prazos de envio de relatórios e comprovações técnicas.'
  },

  // --- PROGRAMA QUALIDADE E SEGURANÇA ---
  {
    id: 'qual_1',
    category: 'QUALIDADE',
    text: 'O fornecedor adere e participa ativamente dos protocolos de Qualidade, Acreditação Hospitalar (ONA/JCI) e Segurança do Paciente?',
    helpText: 'Engajamento no cumprimento de metas de acreditação e protocolos assistenciais.'
  },
  {
    id: 'qual_2',
    category: 'QUALIDADE',
    text: 'As rotinas de biossegurança, higienização, desinfecção e descarte de resíduos de saúde são rigorosamente seguidas?',
    helpText: 'Adesão às normas do CCIH (Controle de Infecção Hospitalar) e PGRSS.'
  },
  {
    id: 'qual_3',
    category: 'QUALIDADE',
    text: 'Há notificação tempestiva de eventos adversos, quase-falhas (near miss) e colaboração nas análises de causa raiz?',
    helpText: 'Transparência na notificação de ocorrências e aplicação de medidas corretivas.'
  },
  {
    id: 'qual_4',
    category: 'QUALIDADE',
    text: 'Os equipamentos, insumos e instrumentos utilizados possuem calibração, manutenção preventiva/corretiva e registro Anvisa?',
    helpText: 'Rastreabilidade e certificação de materiais e equipamentos sob responsabilidade do prestador.'
  },
  {
    id: 'qual_5',
    category: 'QUALIDADE',
    text: 'Os indicadores contratuais de desempenho, metas assistenciais e SLAs acordados foram satisfatoriamente atingidos?',
    helpText: 'Aferição final dos SLAs e metas pactuadas no contrato de prestação de serviços.'
  }
];
