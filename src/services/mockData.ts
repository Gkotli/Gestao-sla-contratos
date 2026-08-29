import { ActionPlan, Evaluation, Sector, Supplier, User } from '../types';

export const INITIAL_SECTORS: Sector[] = [
  {
    id: 'sec_eng_clinica',
    nome: 'Engenharia Clínica',
    gestorResponsavel: 'Ellen Manoela F Zerbetto',
    emailGestor: 'ellen.zerbetto@vilanovastar.com.br'
  },
  {
    id: 'sec_manutencao',
    nome: 'Manutenção',
    gestorResponsavel: 'Eduardo Gonçalves Dias',
    emailGestor: 'eduardo.gdias@vilanovastar.com.br'
  },
  {
    id: 'sec_medicina_nuclear',
    nome: 'Medicina Nuclear',
    gestorResponsavel: 'Karina G Moutinho C Vasconcelos',
    emailGestor: 'karina.moutinho@oncologiador.com.br'
  },
  {
    id: 'sec_sesmt',
    nome: 'SESMT',
    gestorResponsavel: 'Vivian Paula Da Cunha Silva',
    emailGestor: 'vivian.cunha@vilanovastar.com.br'
  },
  {
    id: 'sec_seguranca',
    nome: 'Segurança Patrimonial',
    gestorResponsavel: 'Alex Henrique Leite Dantes',
    emailGestor: 'alex.dantes@vilanovastar.com.br'
  },
  {
    id: 'sec_nutricao',
    nome: 'Nutrição',
    gestorResponsavel: 'Maira Oliveira Vanucci',
    emailGestor: 'maira.vanucci@vilanovastar.com.br'
  },
  {
    id: 'sec_governanca',
    nome: 'Governança',
    gestorResponsavel: 'Jaqueline Cleide Aguiar Monteiro De Carvalho',
    emailGestor: 'jaqueline.monteiroc@vilanovastar.com.br'
  },
  {
    id: 'sec_laboratorio',
    nome: 'Laboratório',
    gestorResponsavel: 'Manoel Iomar De Medeiros',
    emailGestor: 'manoel.medeiros@vilanovastar.com.br'
  },
  {
    id: 'sec_rel_medico',
    nome: 'Relacionamento Médico',
    gestorResponsavel: 'Nicole Longo Fecarotta',
    emailGestor: 'nicole.longo@vilanovastar.com.br'
  },
  {
    id: 'sec_multi',
    nome: 'Equipe Multi',
    gestorResponsavel: 'Giseli Carvalho',
    emailGestor: 'giseli.carvalho@vilanovastar.com.br'
  },
  {
    id: 'sec_diretoria',
    nome: 'Diretoria Geral / Operacional',
    gestorResponsavel: 'Maria Luisa do Nascimento Moura',
    emailGestor: 'maria.nmoura@vilanovastar.com.br'
  }
];

export const INITIAL_USERS: User[] = [
  // Administrador Principal da Diretoria
  {
    id: 'usr_gabriel',
    nome: 'Gabriel Kotliarenko',
    email: 'gabriel.kotliarenko@vilanovastar.com.br',
    senha: '123',
    cargo: 'Diretoria Operacional (Admin)',
    role: 'DIRETORIA'
  },
  // Preposto Fornecedor Exemplo
  {
    id: 'usr_vo2_preposto',
    nome: 'Dr. André Fonseca',
    email: 'fornecedor@vo2care.com.br',
    senha: '123',
    cargo: 'Preposto / Diretor VO2 Care',
    role: 'FORNECEDOR',
    fornecedorId: 'sup_vo2'
  },

  // Gestores de Setores cadastrados
  {
    id: 'usr_maria_luisa',
    nome: 'Maria Luisa do Nascimento Moura',
    email: 'maria.nmoura@vilanovastar.com.br',
    senha: '123',
    cargo: 'Gestor - Diretoria Geral',
    role: 'DIRETORIA',
    setorId: 'sec_diretoria'
  },
  {
    id: 'usr_daniel',
    nome: 'Daniel Favarão Del Negro',
    email: 'daniel.fnegro@saoluiz.com.br',
    senha: '123',
    cargo: 'Gestor - Diretoria Geral',
    role: 'DIRETORIA',
    setorId: 'sec_diretoria'
  },
  {
    id: 'usr_mariana',
    nome: 'Mariana Ferres Candiotto',
    email: 'mariana.candiotto@rededor.com.br',
    senha: '123',
    cargo: 'Gestor - Diretoria Geral',
    role: 'DIRETORIA',
    setorId: 'sec_diretoria'
  },
  {
    id: 'usr_ellen',
    nome: 'Ellen Manoela F Zerbetto',
    email: 'ellen.zerbetto@vilanovastar.com.br',
    senha: '123',
    cargo: 'Gestor - Engenharia Clínica',
    role: 'GESTOR',
    setorId: 'sec_eng_clinica'
  },
  {
    id: 'usr_eduardo',
    nome: 'Eduardo Gonçalves Dias',
    email: 'eduardo.gdias@vilanovastar.com.br',
    senha: '123',
    cargo: 'Gestor - Manutenção',
    role: 'GESTOR',
    setorId: 'sec_manutencao'
  },
  {
    id: 'usr_karina',
    nome: 'Karina G Moutinho C Vasconcelos',
    email: 'karina.moutinho@oncologiador.com.br',
    senha: '123',
    cargo: 'Gestor - Medicina Nuclear',
    role: 'GESTOR',
    setorId: 'sec_medicina_nuclear'
  },
  {
    id: 'usr_vivian',
    nome: 'Vivian Paula Da Cunha Silva',
    email: 'vivian.cunha@vilanovastar.com.br',
    senha: '123',
    cargo: 'Gestor - SESMT',
    role: 'GESTOR',
    setorId: 'sec_sesmt'
  },
  {
    id: 'usr_alex',
    nome: 'Alex Henrique Leite Dantes',
    email: 'alex.dantes@vilanovastar.com.br',
    senha: '123',
    cargo: 'Gestor - Segurança Patrimonial',
    role: 'GESTOR',
    setorId: 'sec_seguranca'
  },
  {
    id: 'usr_maira',
    nome: 'Maira Oliveira Vanucci',
    email: 'maira.vanucci@vilanovastar.com.br',
    senha: '123',
    cargo: 'Gestor - Nutrição',
    role: 'GESTOR',
    setorId: 'sec_nutricao'
  },
  {
    id: 'usr_jaqueline',
    nome: 'Jaqueline Cleide Aguiar Monteiro De Carvalho',
    email: 'jaqueline.monteiroc@vilanovastar.com.br',
    senha: '123',
    cargo: 'Gestor - Governança',
    role: 'GESTOR',
    setorId: 'sec_governanca'
  },
  {
    id: 'usr_manoel',
    nome: 'Manoel Iomar De Medeiros',
    email: 'manoel.medeiros@vilanovastar.com.br',
    senha: '123',
    cargo: 'Gestor - Laboratório',
    role: 'GESTOR',
    setorId: 'sec_laboratorio'
  },
  {
    id: 'usr_nicole',
    nome: 'Nicole Longo Fecarotta',
    email: 'nicole.longo@vilanovastar.com.br',
    senha: '123',
    cargo: 'Gestor - Relacionamento Médico',
    role: 'GESTOR',
    setorId: 'sec_rel_medico'
  },
  {
    id: 'usr_giseli',
    nome: 'Giseli Carvalho',
    email: 'giseli.carvalho@vilanovastar.com.br',
    senha: '123',
    cargo: 'Gestor - Equipe Multi',
    role: 'GESTOR',
    setorId: 'sec_multi'
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
    nomeFantasia: 'CleanHospital Governança',
    categoriaServico: 'Higienização Hospitalar, Desinfecção Terminal e Governança',
    setorResponsavelId: 'sec_governanca',
    contatoNome: 'Juliana Costa',
    contatoEmail: 'atendimento@cleanhospital.com.br',
    contatoTelefone: '(11) 97123-8899',
    numeroContrato: 'CT-2023/102',
    vigenciaFim: '2026-11-30'
  },
  {
    id: 'sup_techmed',
    cnpj: '55.444.333/0001-22',
    razaoSocial: 'TechMed Engenharia Clínica & Equipamentos',
    nomeFantasia: 'TechMed Engenharia Clínica',
    categoriaServico: 'Manutenção Preventiva/Corretiva e Calibração de Equipamentos Médicos',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: 'Eng. Bruno Silveira',
    contatoEmail: 'suporte@techmed.com.br',
    contatoTelefone: '(11) 91122-3344',
    numeroContrato: 'CT-2023/078',
    vigenciaFim: '2027-08-31'
  },
  {
    id: 'sup_seguranca',
    cnpj: '88.999.000/0001-77',
    razaoSocial: 'Grypho Segurança Patrimonial LTDA',
    nomeFantasia: 'Grypho Segurança',
    categoriaServico: 'Vigilância Patrimonial, Controle de Acesso e Portaria',
    setorResponsavelId: 'sec_seguranca',
    contatoNome: 'Inspetor Renato Viana',
    contatoEmail: 'operacoes@gryphoseg.com.br',
    contatoTelefone: '(11) 93344-5566',
    numeroContrato: 'CT-2024/012',
    vigenciaFim: '2027-05-31'
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
    nomeFantasia: 'NutriCare Alimentação',
    categoriaServico: 'Fornecimento de Refeições Pacientes, Acompanhantes e Refeitório',
    setorResponsavelId: 'sec_nutricao',
    contatoNome: 'Ricardo Oliveira',
    contatoEmail: 'operacoes@nutricare.com.br',
    contatoTelefone: '(11) 93322-7788',
    numeroContrato: 'CT-2024/110',
    vigenciaFim: '2026-10-31'
  }
];

export const INITIAL_EVALUATIONS: Evaluation[] = [
  {
    id: 'eval_vo2_2026',
    fornecedorId: 'sup_vo2',
    setorId: 'sec_multi',
    ano: 2026,
    dataAvaliacao: '2026-06-15',
    gestorAvaliador: 'Giseli Carvalho',
    emailAvaliador: 'giseli.carvalho@vilanovastar.com.br',
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
    id: 'eval_tech_2026',
    fornecedorId: 'sup_techmed',
    setorId: 'sec_eng_clinica',
    ano: 2026,
    dataAvaliacao: '2026-06-12',
    gestorAvaliador: 'Ellen Manoela F Zerbetto',
    emailAvaliador: 'ellen.zerbetto@vilanovastar.com.br',
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
  },
  {
    id: 'eval_clean_2026',
    fornecedorId: 'sup_clean',
    setorId: 'sec_governanca',
    ano: 2026,
    dataAvaliacao: '2026-06-18',
    gestorAvaliador: 'Jaqueline Cleide Aguiar Monteiro De Carvalho',
    emailAvaliador: 'jaqueline.monteiroc@vilanovastar.com.br',
    respostas: {
      leg_1: 4, leg_2: 4, leg_3: 3, leg_4: 2, leg_5: 3,
      comp_1: 4, comp_2: 3, comp_3: 3, comp_4: 4, comp_5: 3,
      qual_1: 4, qual_2: 3, qual_3: 3, qual_4: 'NA', qual_5: 3
    },
    observacoesLegais: 'Identificamos rotatividade de funcionários sem comunicação prévia.',
    observacoesComportamentais: 'Atrasos no atendimento a chamados de limpeza terminal de leitos.',
    observacoesQualidade: 'Necessidade de reforçar o treinamento do descarte correto de resíduos.',
    parecerGeral: 'Média Anual 3.40 ficou abaixo da meta mínima aceitável (4.00). Plano de ação em andamento.',
    mediaLegais: 3.20,
    mediaComportamentais: 3.40,
    mediaQualidade: 3.65,
    mediaGeral: 3.40,
    statusMeta: 'ABAIXO_DA_META',
    necessitaPlanoAcao: true,
    statusAssinatura: 'ENVIADO_FORNECEDOR'
  },
  {
    id: 'eval_medlab_2026',
    fornecedorId: 'sup_medlab',
    setorId: 'sec_laboratorio',
    ano: 2026,
    dataAvaliacao: '2026-06-10',
    gestorAvaliador: 'Manoel Iomar De Medeiros',
    emailAvaliador: 'manoel.medeiros@vilanovastar.com.br',
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
    gestorAvaliador: 'Maira Oliveira Vanucci',
    emailAvaliador: 'maira.vanucci@vilanovastar.com.br',
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
  }
];

export const INITIAL_ACTION_PLANS: ActionPlan[] = [
  {
    id: 'plan_clean_01',
    evaluationId: 'eval_clean_2026',
    fornecedorId: 'sup_clean',
    setorId: 'sec_governanca',
    ano: 2026,
    titulo: 'Readequação da Equipe de Governança e Foco em Leitos UTI',
    acao5W: 'Treinamento de reciclagem da equipe sobre higienização terminal e fixação de quadro de dimensionamento mínimo.',
    justificativa5W: 'Nota da avaliação anual foi 3.40 (Abaixo da Meta) devido a atrasos na liberação de leitos.',
    responsavel5W: 'Juliana Costa (CleanHospital) & Jaqueline Monteiro (Vila Nova Star)',
    prazo5W: '2026-07-30',
    onde5W: 'Setores de Internação e UTI Adulto',
    como5W: 'Auditorias semanais de higienização e implantação de check-list digital.',
    custo5W: 'Sem custo adicional ao contrato.',
    status: 'EM_ANDAMENTO',
    dataCriacao: '2026-06-19',
    observacoesAcompanhamento: 'Treinamento presencial agendado para o dia 05/07.'
  },
  {
    id: 'plan_nutri_01',
    evaluationId: 'eval_nutri_2026',
    fornecedorId: 'sup_nutri',
    setorId: 'sec_nutricao',
    ano: 2026,
    titulo: 'Adequação Térmica dos Carrinhos Isotérmicos de Refeições',
    acao5W: 'Aquisição e manutenção dos carros de transporte isotérmico de refeições dos pacientes.',
    justificativa5W: 'Avaliação Anual 3.75 devido a reclamações de refeições mornas.',
    responsavel5W: 'Ricardo Oliveira (NutriCare) & Maira Vanucci (Vila Nova Star)',
    prazo5W: '2026-08-10',
    onde5W: 'Cozinha Central e Enfeites de Copa',
    como5W: 'Troca das vedações dos carros térmicos e aferição de temperatura.',
    custo5W: 'R$ 4.200,00',
    status: 'EM_ANDAMENTO',
    dataCriacao: '2026-06-26'
  }
];
