import { ActionPlan, Evaluation, Sector, Supplier, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_diretoria',
    nome: 'Diretoria Operacional',
    email: 'diretoria@hospital.com.br',
    senha: '123',
    cargo: 'Diretor de Operações Hospitalares',
    role: 'DIRETORIA'
  },
  {
    id: 'user_patricia',
    nome: 'Dra. Patricia Lima',
    email: 'patricia.lima@hospital.com.br',
    senha: '123',
    cargo: 'Coordenadora de Fisioterapia & T.O.',
    role: 'GESTOR',
    setorId: 'sec_multi'
  },
  {
    id: 'user_roberto',
    nome: 'Enf. Roberto Santos',
    email: 'roberto.santos@hospital.com.br',
    senha: '123',
    cargo: 'Gerente de Enfermagem',
    role: 'GESTOR',
    setorId: 'sec_enfermagem'
  },
  {
    id: 'user_ingrid',
    nome: 'Ingrid Mendes',
    email: 'ingrid.mendes@hospital.com.br',
    senha: '123',
    cargo: 'Supervisora de Higienização & Operações',
    role: 'GESTOR',
    setorId: 'sec_higienizacao'
  },
  {
    id: 'user_vo2_preposto',
    nome: 'Dr. André Fonseca',
    email: 'fornecedor@vo2care.com.br',
    senha: '123',
    cargo: 'Preposto / Diretor VO2 Care',
    role: 'FORNECEDOR',
    fornecedorId: 'sup_vo2'
  }
];

export const INITIAL_SECTORS: Sector[] = [
  {
    id: 'sec_multi',
    nome: 'Equipe Multi',
    gestorResponsavel: 'Dra. Patricia Lima (Coordenadora de Fisioterapia & T.O.)',
    emailGestor: 'patricia.lima@hospital.com.br'
  },
  {
    id: 'sec_enfermagem',
    nome: 'Enfermagem / Bloco Cirúrgico',
    gestorResponsavel: 'Enf. Roberto Santos (Gerente de Enfermagem)',
    emailGestor: 'roberto.santos@hospital.com.br'
  },
  {
    id: 'sec_higienizacao',
    nome: 'Higienização e Biossegurança',
    gestorResponsavel: 'Ingrid Mendes (Supervisora de Operações)',
    emailGestor: 'ingrid.mendes@hospital.com.br'
  },
  {
    id: 'sec_eng_clinica',
    nome: 'Engenharia Clínica & Manutenção',
    gestorResponsavel: 'Eng. Fernando Souza (Diretor Técnico)',
    emailGestor: 'fernando.souza@hospital.com.br'
  },
  {
    id: 'sec_nutricao',
    nome: 'Nutrição & Dietética',
    gestorResponsavel: 'Nut. Camila Barbosa (Gestora de SND)',
    emailGestor: 'camila.barbosa@hospital.com.br'
  },
  {
    id: 'sec_laboratorio',
    nome: 'Laboratório & Diagnósticos',
    gestorResponsavel: 'Dr. Marcelo Ribeiro (Diretor Médico)',
    emailGestor: 'marcelo.ribeiro@hospital.com.br'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup_vo2',
    cnpj: '12.345.678/0001-90',
    razaoSocial: 'VO2 Care Fisioterapia LTDA',
    nomeFantasia: 'VO2 Care Fisioterapia',
    categoriaServico: 'Prestação de Serviços de Fisioterapia Respiratória e Motora',
    setorResponsavelId: 'sec_multi',
    contatoNome: 'Dr. André Fonseca',
    contatoEmail: 'contato@vo2care.com.br',
    contatoTelefone: '(11) 98765-4321',
    numeroContrato: 'CT-2024/089',
    vigenciaFim: '2027-12-31'
  },
  {
    id: 'sup_clean',
    cnpj: '98.765.432/0001-11',
    razaoSocial: 'CleanHospital Higienização & Serviços S/A',
    nomeFantasia: 'CleanHospital',
    categoriaServico: 'Higienização Hospitalar, Desinfecção Terminal e Resíduos',
    setorResponsavelId: 'sec_higienizacao',
    contatoNome: 'Juliana Costa',
    contatoEmail: 'atendimento@cleanhospital.com.br',
    contatoTelefone: '(11) 97123-8899',
    numeroContrato: 'CT-2023/102',
    vigenciaFim: '2026-11-30'
  },
  {
    id: 'sup_steril',
    cnpj: '45.678.901/0001-33',
    razaoSocial: 'SterilMeds Central de Esterilização LTDA',
    nomeFantasia: 'SterilMeds',
    categoriaServico: 'Processamento e Esterilização de Instrumental Cirúrgico (CME)',
    setorResponsavelId: 'sec_enfermagem',
    contatoNome: 'Carlos Eduardo',
    contatoEmail: 'supervisao@sterilmeds.com.br',
    contatoTelefone: '(11) 99887-1122',
    numeroContrato: 'CT-2024/044',
    vigenciaFim: '2027-06-30'
  },
  {
    id: 'sup_medlab',
    cnpj: '33.222.111/0001-55',
    razaoSocial: 'MedLab Análises Clínicas & Patologia S/S',
    nomeFantasia: 'MedLab Diagnósticos',
    categoriaServico: 'Exames Laboratoriais, Anatomia Patológica e Urgência',
    setorResponsavelId: 'sec_laboratorio',
    contatoNome: 'Dra. Helena Martins',
    contatoEmail: 'gestao@medlab.com.br',
    contatoTelefone: '(11) 94433-2211',
    numeroContrato: 'CT-2022/015',
    vigenciaFim: '2028-03-15'
  },
  {
    id: 'sup_nutri',
    cnpj: '77.888.999/0001-44',
    razaoSocial: 'NutriCare Alimentação Hospitalar LTDA',
    nomeFantasia: 'NutriCare',
    categoriaServico: 'Fornecimento de Refeições Pacientes, Acompanhantes e Refeitório',
    setorResponsavelId: 'sec_nutricao',
    contatoNome: 'Ricardo Oliveira',
    contatoEmail: 'operacoes@nutricare.com.br',
    contatoTelefone: '(11) 93322-7788',
    numeroContrato: 'CT-2024/110',
    vigenciaFim: '2026-10-31'
  },
  {
    id: 'sup_techmed',
    cnpj: '55.444.333/0001-22',
    razaoSocial: 'TechMed Engenharia Clínica & Equipamentos',
    nomeFantasia: 'TechMed Engenharia',
    categoriaServico: 'Manutenção Preventiva/Corretiva e Calibração de Equipamentos Médicos',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: 'Eng. Bruno Silveira',
    contatoEmail: 'suporte@techmed.com.br',
    contatoTelefone: '(11) 91122-3344',
    numeroContrato: 'CT-2023/078',
    vigenciaFim: '2027-08-31'
  }
];

export const INITIAL_EVALUATIONS: Evaluation[] = [
  {
    id: 'eval_vo2_2026',
    fornecedorId: 'sup_vo2',
    setorId: 'sec_multi',
    ano: 2026,
    dataAvaliacao: '2026-06-15',
    gestorAvaliador: 'Dra. Patricia Lima',
    emailAvaliador: 'patricia.lima@hospital.com.br',
    respostas: {
      leg_1: 5, leg_2: 5, leg_3: 4, leg_4: 4, leg_5: 5,
      comp_1: 5, comp_2: 4, comp_3: 5, comp_4: 5, comp_5: 4,
      qual_1: 5, qual_2: 4, qual_3: 4, qual_4: 'NA', qual_5: 5
    },
    observacoesLegais: 'Equipe altamente qualificada. Documentação dos fisioterapeutas 100% atualizada junto ao CREFITO.',
    observacoesComportamentais: 'Excelente relacionamento com o corpo clínico e equipe multiprofissional.',
    observacoesQualidade: 'Adesão total às diretrizes de desmame ventilatório da UTI.',
    parecerGeral: 'Fornecedor prestador de serviço de excelência no ciclo anual. Recomenda-se renovação contratual.',
    mediaLegais: 4.60,
    mediaComportamentais: 4.60,
    mediaQualidade: 4.50,
    mediaGeral: 4.60,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: '2026-06-20',
    nomeSignatario: 'Dr. André Fonseca',
    cargoSignatario: 'Diretor de Operações VO2 Care',
    parecerFornecedor: 'Agradecemos o reconhecimento da equipe hospitalar no ciclo anual.'
  },
  {
    id: 'eval_clean_2026',
    fornecedorId: 'sup_clean',
    setorId: 'sec_higienizacao',
    ano: 2026,
    dataAvaliacao: '2026-06-18',
    gestorAvaliador: 'Ingrid Mendes',
    emailAvaliador: 'ingrid.mendes@hospital.com.br',
    respostas: {
      leg_1: 4, leg_2: 4, leg_3: 3, leg_4: 2, leg_5: 3,
      comp_1: 4, comp_2: 3, comp_3: 3, comp_4: 4, comp_5: 3,
      qual_1: 4, qual_2: 3, qual_3: 3, qual_4: 'NA', qual_5: 3
    },
    observacoesLegais: 'Identificamos rotatividade excessiva de funcionários no ano sem comunicação prévia.',
    observacoesComportamentais: 'Atrasos no atendimento a chamados de limpeza terminal de leitos no 3º andar.',
    observacoesQualidade: 'Necessidade de reforçar o treinamento do descarte correto de resíduos infectantes.',
    parecerGeral: 'Média Anual 3.40 ficou abaixo da meta mínima aceitável (4.00). É obrigatória a abertura de Plano de Ação.',
    mediaLegais: 3.20,
    mediaComportamentais: 3.40,
    mediaQualidade: 3.65,
    mediaGeral: 3.40,
    statusMeta: 'ABAIXO_DA_META',
    necessitaPlanoAcao: true,
    statusAssinatura: 'ENVIADO_FORNECEDOR'
  },
  {
    id: 'eval_steril_2026',
    fornecedorId: 'sup_steril',
    setorId: 'sec_enfermagem',
    ano: 2026,
    dataAvaliacao: '2026-06-22',
    gestorAvaliador: 'Enf. Roberto Santos',
    emailAvaliador: 'roberto.santos@hospital.com.br',
    respostas: {
      leg_1: 3, leg_2: 3, leg_3: 2, leg_4: 2, leg_5: 3,
      comp_1: 3, comp_2: 2, comp_3: 2, comp_4: 3, comp_5: 2,
      qual_1: 3, qual_2: 2, qual_3: 2, qual_4: 3, qual_5: 2
    },
    observacoesLegais: 'Gargalos no envio dos laudos de validação das autoclaves.',
    observacoesComportamentais: 'Dificuldade de contato com o supervisor da empresa durante os finais de semana.',
    observacoesQualidade: 'Identificado atraso recorrente na entrega de caixas cirúrgicas para cirurgias eletivas.',
    parecerGeral: 'Desempenho Anual CRÍTICO (2.60). Convocação urgente da diretoria do fornecedor.',
    mediaLegais: 2.60,
    mediaComportamentais: 2.40,
    mediaQualidade: 2.80,
    mediaGeral: 2.60,
    statusMeta: 'CRITICO',
    necessitaPlanoAcao: true,
    statusAssinatura: 'PENDENTE_ENVIO'
  },
  {
    id: 'eval_medlab_2026',
    fornecedorId: 'sup_medlab',
    setorId: 'sec_laboratorio',
    ano: 2026,
    dataAvaliacao: '2026-06-10',
    gestorAvaliador: 'Dr. Marcelo Ribeiro',
    emailAvaliador: 'marcelo.ribeiro@hospital.com.br',
    respostas: {
      leg_1: 5, leg_2: 5, leg_3: 5, leg_4: 4, leg_5: 5,
      comp_1: 5, comp_2: 5, comp_3: 5, comp_4: 5, comp_5: 4,
      qual_1: 5, qual_2: 5, qual_3: 4, qual_4: 5, qual_5: 5
    },
    observacoesLegais: '100% de conformidade com normativas do PALC e ANVISA.',
    observacoesComportamentais: 'Atendimento impecável na liberação de exames de urgência da UTI.',
    observacoesQualidade: 'SLA de tempo de liberação de exames abaixo do limite contratual.',
    parecerGeral: 'Fornecedor referência de qualidade no hospital no ciclo anual.',
    mediaLegais: 4.80,
    mediaComportamentais: 4.80,
    mediaQualidade: 4.80,
    mediaGeral: 4.80,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: '2026-06-14',
    nomeSignatario: 'Dra. Helena Martins',
    cargoSignatario: 'Diretora Técnica MedLab'
  },
  {
    id: 'eval_nutri_2026',
    fornecedorId: 'sup_nutri',
    setorId: 'sec_nutricao',
    ano: 2026,
    dataAvaliacao: '2026-06-25',
    gestorAvaliador: 'Nut. Camila Barbosa',
    emailAvaliador: 'camila.barbosa@hospital.com.br',
    respostas: {
      leg_1: 4, leg_2: 4, leg_3: 4, leg_4: 3, leg_5: 4,
      comp_1: 4, comp_2: 3, comp_3: 4, comp_4: 4, comp_5: 3,
      qual_1: 4, qual_2: 4, qual_3: 3, qual_4: 4, qual_5: 3
    },
    observacoesLegais: 'Documentação sanitária em ordem.',
    observacoesComportamentais: 'Ocorrências pontuais de temperatura nas refeições dos acompanhantes.',
    observacoesQualidade: 'Reclamações na pesquisa de satisfação dos pacientes internados.',
    parecerGeral: 'Média Anual 3.75 requer alinhamento e Plano de Ação para controle térmico do transporte.',
    mediaLegais: 3.80,
    mediaComportamentais: 3.60,
    mediaQualidade: 3.60,
    mediaGeral: 3.75,
    statusMeta: 'ABAIXO_DA_META',
    necessitaPlanoAcao: true,
    statusAssinatura: 'PENDENTE_ENVIO'
  },
  {
    id: 'eval_tech_2026',
    fornecedorId: 'sup_techmed',
    setorId: 'sec_eng_clinica',
    ano: 2026,
    dataAvaliacao: '2026-06-12',
    gestorAvaliador: 'Eng. Fernando Souza',
    emailAvaliador: 'fernando.souza@hospital.com.br',
    respostas: {
      leg_1: 4, leg_2: 5, leg_3: 4, leg_4: 4, leg_5: 4,
      comp_1: 4, comp_2: 4, comp_3: 4, comp_4: 4, comp_5: 4,
      qual_1: 4, qual_2: 4, qual_3: 4, qual_4: 5, qual_5: 4
    },
    observacoesLegais: 'Cronograma anual de calibração em dia.',
    observacoesComportamentais: 'Equipe prestativa no atendimento a chamados.',
    observacoesQualidade: 'Ótima rastreabilidade de ordens de serviço.',
    parecerGeral: 'Cumpre satisfatoriamente os termos do contrato anual.',
    mediaLegais: 4.20,
    mediaComportamentais: 4.00,
    mediaQualidade: 4.40,
    mediaGeral: 4.20,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: '2026-06-15',
    nomeSignatario: 'Eng. Bruno Silveira',
    cargoSignatario: 'Engenheiro Chefe TechMed'
  }
];

export const INITIAL_ACTION_PLANS: ActionPlan[] = [
  {
    id: 'plan_clean_01',
    evaluationId: 'eval_clean_2026',
    fornecedorId: 'sup_clean',
    setorId: 'sec_higienizacao',
    ano: 2026,
    titulo: 'Readequação da Equipe de Higienização e Foco em Leitos UTI',
    acao5W: 'Treinamento de reciclagem da equipe sobre higienização terminal e fixação de quadro de dimensionamento mínimo.',
    justificativa5W: 'Nota da avaliação anual foi 3.40 (Abaixo da Meta) devido a atrasos na liberação de leitos.',
    responsavel5W: 'Juliana Costa (Supervisora CleanHospital) & Ingrid Mendes (Hospital)',
    prazo5W: '2026-07-30',
    onde5W: 'Setores de Internação e UTI Adulto',
    como5W: 'Auditorias semanais de higienização e implantação de check-list digital.',
    custo5W: 'Sem custo adicional ao contrato.',
    status: 'EM_ANDAMENTO',
    dataCriacao: '2026-06-19',
    observacoesAcompanhamento: 'Treinamento presencial agendado para o dia 05/07.'
  },
  {
    id: 'plan_steril_01',
    evaluationId: 'eval_steril_2026',
    fornecedorId: 'sup_steril',
    setorId: 'sec_enfermagem',
    ano: 2026,
    titulo: 'Plano Emergencial de Entrega de Caixas Cirúrgicas e Laudos de Autoclave',
    acao5W: 'Reestruturação da logística de transporte de instrumentais e envio semanal dos laudos biológicos de esterilização.',
    justificativa5W: 'Avaliação Anual CRÍTICA com média 2.60 e riscos ao cumprimento do mapa de cirurgias.',
    responsavel5W: 'Carlos Eduardo (Gerente SterilMeds)',
    prazo5W: '2026-07-15',
    onde5W: 'Central de Material e Esterilização (CME)',
    como5W: 'Contratação de motoboy exclusivo para rota hospitalar e protocolo rápido.',
    custo5W: 'R$ 2.500,00/mês (custeado pela SterilMeds).',
    status: 'PENDENTE',
    dataCriacao: '2026-06-23',
    observacoesAcompanhamento: 'Aguardando reunião presencial com a Diretoria Operacional.'
  },
  {
    id: 'plan_nutri_01',
    evaluationId: 'eval_nutri_2026',
    fornecedorId: 'sup_nutri',
    setorId: 'sec_nutricao',
    ano: 2026,
    titulo: 'Adequação Térmica dos Passa-Pratos e Carrinhos Isotérmicos',
    acao5W: 'Aquisição e manutenção dos carros de transporte isotérmico de refeições dos pacientes.',
    justificativa5W: 'Avaliação Anual 3.75 devido a reclamações de refeições mornas.',
    responsavel5W: 'Ricardo Oliveira (NutriCare)',
    prazo5W: '2026-08-10',
    onde5W: 'Cozinha Central e Enfeites de Copa',
    como5W: 'Troca das vedações dos carros térmicos e aferição de temperatura.',
    custo5W: 'R$ 4.200,00;',
    status: 'EM_ANDAMENTO',
    dataCriacao: '2026-06-26'
  }
];
