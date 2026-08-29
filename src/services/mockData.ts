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

  // Gestores dos 11 Setores do Vila Nova Star
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
  // Manutenção
  {
    id: 'sup_acquasuly',
    cnpj: '43.139.722/0001-34',
    razaoSocial: 'Acquasuly Engenharia Em Agua Quente E Gas LTDA',
    nomeFantasia: 'Acquasuly Engenharia',
    categoriaServico: 'Manutenção nos Aquecedores e Boilers',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS24-016-00',
    vigenciaFim: '2027-01-08'
  },
  {
    id: 'sup_air_liquide_manut',
    cnpj: '00.331.788/0001-19',
    razaoSocial: 'Air Liquide Brasil LTDA',
    nomeFantasia: 'Air Liquide (Manutenção)',
    categoriaServico: 'Gases Medicinais - Manutenção',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: '0',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_argus',
    cnpj: '12.096.667/0001-19',
    razaoSocial: 'Argus Produtos E Sistemas Contra Incêndio Ltda',
    nomeFantasia: 'Argus Contra Incêndio',
    categoriaServico: 'Manutenção do sistema de combate a incêndio',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'Rede24-409-00',
    vigenciaFim: '2028-01-02'
  },
  {
    id: 'sup_ccl',
    cnpj: '00.236.854/0001-71',
    razaoSocial: 'CCL Manutenção de Capelas',
    nomeFantasia: 'CCL Capelas',
    categoriaServico: 'Manutenção Capelas de Exaustão',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS20-037-00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_controlbio',
    cnpj: '67.185.108/0001-77',
    razaoSocial: 'Controlbio assessoria Técnica Microbiológica SS LTDA',
    nomeFantasia: 'Controlbio Microbiologia',
    categoriaServico: 'Análise Microbiológica de Ambientes',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS/21-027/00',
    vigenciaFim: '2026-02-28'
  },
  {
    id: 'sup_controller',
    cnpj: '07.230.898/0001-33',
    razaoSocial: 'Controller Smart Automação LTDA',
    nomeFantasia: 'Controller Smart',
    categoriaServico: 'Automação Predial Hospitalar',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS20-043-03',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_daikin',
    cnpj: '02.172.568/0006-20',
    razaoSocial: 'Daikin Ar Condicionado Brasil LTDA',
    nomeFantasia: 'Daikin Chillers',
    categoriaServico: 'Manutenção de Chiller e Climatização',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS19-011-00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_atlas',
    cnpj: '61.074.001/0001-90',
    razaoSocial: 'Elevadores Atlas Schindler LTDA',
    nomeFantasia: 'Atlas Schindler',
    categoriaServico: 'Manutenção Preventiva e Corretiva de Elevadores',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS/19-002/00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_kpm',
    cnpj: '15.421.902/0001-44',
    razaoSocial: 'KPM Service Climatização LTDA',
    nomeFantasia: 'KPM Climatização (PMOC)',
    categoriaServico: 'Manutenção de Ar Condicionado e PMOC',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS23-018-00',
    vigenciaFim: '2026-12-31'
  },

  // Engenharia Clínica
  {
    id: 'sup_techmed',
    cnpj: '11.222.333/0001-44',
    razaoSocial: 'TechMed Equipamentos Hospitalares LTDA',
    nomeFantasia: 'TechMed Equipamentos',
    categoriaServico: 'Manutenção e Calibração de Equipamentos Médicos',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS23-104-00',
    vigenciaFim: '2027-05-15'
  },
  {
    id: 'sup_air_liquide_eng',
    cnpj: '00.331.788/0023-24',
    razaoSocial: 'Air Liquide Brasil LTDA',
    nomeFantasia: 'Air Liquide (Eng. Clínica)',
    categoriaServico: 'Gases Medicinais - Eng. Clínica',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS23-088-00',
    vigenciaFim: '2027-08-10'
  },
  {
    id: 'sup_ge_healthcare',
    cnpj: '00.029.372/0001-03',
    razaoSocial: 'GE Healthcare do Brasil LTDA',
    nomeFantasia: 'GE Healthcare',
    categoriaServico: 'Manutenção de Tomógrafos e Ressonâncias',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS22-045-00',
    vigenciaFim: '2028-03-31'
  },

  // Medicina Nuclear
  {
    id: 'sup_baxter_nuclear',
    cnpj: '45.748.777/0001-99',
    razaoSocial: 'Baxter Hospitalar LTDA',
    nomeFantasia: 'Baxter Medicina Nuclear',
    categoriaServico: 'Equipamentos e Dosimetria de Medicina Nuclear',
    setorResponsavelId: 'sec_medicina_nuclear',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS24-030-00',
    vigenciaFim: '2027-11-30'
  },

  // SESMT
  {
    id: 'sup_sesmt_01',
    cnpj: '23.456.789/0001-11',
    razaoSocial: 'MedSeg Medicina e Segurança do Trabalho LTDA',
    nomeFantasia: 'MedSeg SESMT',
    categoriaServico: 'Exames Ocupacionais e Laudos de Segurança (PPRA/PCMSO)',
    setorResponsavelId: 'sec_sesmt',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS24-009-00',
    vigenciaFim: '2026-10-15'
  },

  // Segurança Patrimonial
  {
    id: 'sup_dunamis',
    cnpj: '08.999.888/0001-22',
    razaoSocial: 'Dunamis Segurança Patrimonial Eireli',
    nomeFantasia: 'Dunamis Segurança',
    categoriaServico: 'Serviços de Vigilância e Segurança Armada/Desarmada',
    setorResponsavelId: 'sec_seguranca',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS22-019-00',
    vigenciaFim: '2027-04-30'
  },

  // Nutrição
  {
    id: 'sup_nutri',
    cnpj: '55.666.777/0001-88',
    razaoSocial: 'NutriCare Alimentação Hospitalar LTDA',
    nomeFantasia: 'NutriCare Alimentação',
    categoriaServico: 'Fornecimento de Refeições Hospitalares e Dietas',
    setorResponsavelId: 'sec_nutricao',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS23-050-00',
    vigenciaFim: '2026-08-31'
  },

  // Governança
  {
    id: 'sup_clean',
    cnpj: '22.333.444/0001-55',
    razaoSocial: 'CleanHospital Higienização LTDA',
    nomeFantasia: 'CleanHospital',
    categoriaServico: 'Higienização, Limpeza Hospitalar e Governança',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS22-015-00',
    vigenciaFim: '2026-12-31'
  },
  {
    id: 'sup_allpark',
    cnpj: '60.537.263/0001-66',
    razaoSocial: 'ALLPARK EMPREENDIMENTOS, PARTICIPAÇÕES E SERVIÇOS S/A',
    nomeFantasia: 'Estapar / Allpark Estacionamentos',
    categoriaServico: 'Mão de Obra e Gestão de Estacionamento Valet',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS-19-008-00',
    vigenciaFim: '2028-05-01'
  },

  // Laboratório
  {
    id: 'sup_medlab',
    cnpj: '33.444.555/0001-66',
    razaoSocial: 'MedLab Diagnósticos Laboratoriais S/A',
    nomeFantasia: 'MedLab Diagnósticos',
    categoriaServico: 'Exames de Patologia Clínica e Análises Laboratoriais',
    setorResponsavelId: 'sec_laboratorio',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS21-080-00',
    vigenciaFim: '2027-09-30'
  },

  // Relacionamento Médico
  {
    id: 'sup_relmed_01',
    cnpj: '77.888.999/0001-33',
    razaoSocial: 'MedConnect Gestão Médica LTDA',
    nomeFantasia: 'MedConnect Relacionamento Médico',
    categoriaServico: 'Gestão de Corpo Clínico e Escala Médica Hospitalar',
    setorResponsavelId: 'sec_rel_medico',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS23-012-00',
    vigenciaFim: '2027-03-31'
  },

  // Equipe Multi
  {
    id: 'sup_vo2',
    cnpj: '39.615.127/0001-50',
    razaoSocial: 'VO2 Care Fisioterapia Hospitalar LTDA',
    nomeFantasia: 'VO2 Care Fisioterapia',
    categoriaServico: 'Serviços de Fisioterapia Cardiorrespiratória e Motora',
    setorResponsavelId: 'sec_multi',
    contatoNome: '',
    contatoEmail: '',
    contatoTelefone: '',
    numeroContrato: 'VNS23-019-00',
    vigenciaFim: '2027-06-30'
  }
];

export const INITIAL_EVALUATIONS: Evaluation[] = [
  // 1. Manutenção - Acquasuly 2024 & 2026
  {
    id: 'eval_acquasuly_2024',
    fornecedorId: 'sup_acquasuly',
    setorId: 'sec_manutencao',
    ano: 2024,
    dataAvaliacao: '2024-11-20',
    gestorAvaliador: 'Eduardo Gonçalves Dias',
    emailAvaliador: 'eduardo.gdias@vilanovastar.com.br',
    respostas: {
      leg_1: 5, leg_2: 5, leg_3: 5, leg_4: 5, leg_5: 5,
      comp_1: 5, comp_2: 5, comp_3: 5, comp_4: 5, comp_5: 5,
      qual_1: 5, qual_2: 5, qual_3: 5, qual_4: 5, qual_5: 5
    },
    observacoesLegais: 'Manutenção preventiva nos boilers realizada com 100% de conformidade.',
    observacoesComportamentais: 'Equipe altamente capacitada e respeitosa.',
    observacoesQualidade: 'Sem ocorrências no fornecimento de água quente.',
    parecerGeral: 'Fornecedor de alta performance no contrato de manutenção de aquecedores.',
    mediaLegais: 5.00,
    mediaComportamentais: 5.00,
    mediaQualidade: 5.00,
    mediaGeral: 5.00,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: '2024-11-25',
    nomeSignatario: 'Preposto Acquasuly',
    cargoSignatario: 'Engenheiro Responsável'
  },
  {
    id: 'eval_acquasuly_2026',
    fornecedorId: 'sup_acquasuly',
    setorId: 'sec_manutencao',
    ano: 2026,
    dataAvaliacao: '2026-06-15',
    gestorAvaliador: 'Eduardo Gonçalves Dias',
    emailAvaliador: 'eduardo.gdias@vilanovastar.com.br',
    respostas: {
      leg_1: 5, leg_2: 5, leg_3: 5, leg_4: 4, leg_5: 5,
      comp_1: 5, comp_2: 5, comp_3: 4, comp_4: 5, comp_5: 5,
      qual_1: 5, qual_2: 4, qual_3: 5, qual_4: 5, qual_5: 4
    },
    observacoesLegais: 'Atendimento às chamadas de manutenção com agilidade.',
    observacoesComportamentais: 'Uso rigoroso de EPIs.',
    observacoesQualidade: 'Relatórios entregues no prazo.',
    parecerGeral: 'Excelente desempenho no ciclo anual.',
    mediaLegais: 4.80,
    mediaComportamentais: 4.80,
    mediaQualidade: 4.60,
    mediaGeral: 4.73,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ENVIADO_FORNECEDOR'
  },

  // 2. Equipe Multi - VO2 Care 2026
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
      qual_1: 5, qual_2: 4, qual_3: 4, qual_4: 5, qual_5: 4.5
    },
    observacoesLegais: 'Equipe de fisioterapia totalmente habilitada com registros no CREFITO atualizados.',
    observacoesComportamentais: 'Excelente atendimento humanizado aos pacientes da UTI e Unidades de Internação.',
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

  // 3. Engenharia Clínica - TechMed 2026
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

  // 4. Governança - CleanHospital 2026
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
      qual_1: 4, qual_2: 3, qual_3: 3, qual_4: 4, qual_5: 3
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

  // 5. Laboratório - MedLab 2026
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

  // 6. Nutrição - NutriCare 2026
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
  },

  // 7. Segurança Patrimonial - Dunamis 2026
  {
    id: 'eval_dunamis_2026',
    fornecedorId: 'sup_dunamis',
    setorId: 'sec_seguranca',
    ano: 2026,
    dataAvaliacao: '2026-06-14',
    gestorAvaliador: 'Alex Henrique Leite Dantes',
    emailAvaliador: 'alex.dantes@vilanovastar.com.br',
    respostas: {
      leg_1: 5, leg_2: 5, leg_3: 5, leg_4: 5, leg_5: 5,
      comp_1: 5, comp_2: 5, comp_3: 4, comp_4: 5, comp_5: 5,
      qual_1: 5, qual_2: 5, qual_3: 4, qual_4: 5, qual_5: 5
    },
    observacoesLegais: 'Vigilantes com reciclagens e certificados da Polícia Federal em dia.',
    observacoesComportamentais: 'Postura ostensiva preventiva exemplar nas portarias do hospital.',
    observacoesQualidade: 'Livros de ocorrência diariamente inspecionados sem inconformidades.',
    parecerGeral: 'Serviço de vigilância com alto padrão de segurança patrimonial no ciclo anual.',
    mediaLegais: 5.00,
    mediaComportamentais: 4.80,
    mediaQualidade: 4.80,
    mediaGeral: 4.87,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: '2026-06-18'
  },

  // 8. SESMT - MedSeg 2026
  {
    id: 'eval_sesmt_2026',
    fornecedorId: 'sup_sesmt_01',
    setorId: 'sec_sesmt',
    ano: 2026,
    dataAvaliacao: '2026-06-11',
    gestorAvaliador: 'Vivian Paula Da Cunha Silva',
    emailAvaliador: 'vivian.cunha@vilanovastar.com.br',
    respostas: {
      leg_1: 5, leg_2: 5, leg_3: 4, leg_4: 5, leg_5: 5,
      comp_1: 5, comp_2: 4, comp_3: 5, comp_4: 4, comp_5: 5,
      qual_1: 4, qual_2: 5, qual_3: 5, qual_4: 4, qual_5: 5
    },
    observacoesLegais: 'Exames periódicos de medicina do trabalho 100% atualizados.',
    observacoesComportamentais: 'Ótima integração com as equipes de saúde ocupacional.',
    observacoesQualidade: 'Laudos de PPRA/PCMSO entregues dentro do cronograma.',
    parecerGeral: 'Desempenho aprovado com nota destacada.',
    mediaLegais: 4.80,
    mediaComportamentais: 4.60,
    mediaQualidade: 4.60,
    mediaGeral: 4.67,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: '2026-06-15'
  },

  // 9. Medicina Nuclear - Baxter 2026
  {
    id: 'eval_mednuclear_2026',
    fornecedorId: 'sup_baxter_nuclear',
    setorId: 'sec_medicina_nuclear',
    ano: 2026,
    dataAvaliacao: '2026-06-16',
    gestorAvaliador: 'Karina G Moutinho C Vasconcelos',
    emailAvaliador: 'karina.moutinho@oncologiador.com.br',
    respostas: {
      leg_1: 5, leg_2: 5, leg_3: 5, leg_4: 5, leg_5: 5,
      comp_1: 5, comp_2: 5, comp_3: 5, comp_4: 5, comp_5: 5,
      qual_1: 5, qual_2: 5, qual_3: 5, qual_4: 5, qual_5: 5
    },
    observacoesLegais: 'Radiofármacos e calibrações de tomógrafos PET-CT em dia.',
    observacoesComportamentais: 'Físicos médicos e técnicos extremamente qualificados.',
    observacoesQualidade: 'Controle de qualidade de dosimetria individual impecável.',
    parecerGeral: 'Fornecedor padrão Ouro de medicina nuclear.',
    mediaLegais: 5.00,
    mediaComportamentais: 5.00,
    mediaQualidade: 5.00,
    mediaGeral: 5.00,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: '2026-06-20'
  },

  // 10. Relacionamento Médico - MedConnect 2026
  {
    id: 'eval_relmed_2026',
    fornecedorId: 'sup_relmed_01',
    setorId: 'sec_rel_medico',
    ano: 2026,
    dataAvaliacao: '2026-06-22',
    gestorAvaliador: 'Nicole Longo Fecarotta',
    emailAvaliador: 'nicole.longo@vilanovastar.com.br',
    respostas: {
      leg_1: 5, leg_2: 4, leg_3: 5, leg_4: 5, leg_5: 4,
      comp_1: 5, comp_2: 5, comp_3: 4, comp_4: 5, comp_5: 5,
      qual_1: 5, qual_2: 4, qual_3: 5, qual_4: 5, qual_5: 4
    },
    observacoesLegais: 'Suporte médico aos plantões e escalonamento sem interrupções.',
    observacoesComportamentais: 'Atendimento aos médicos cadastrados com extrema eficiência.',
    observacoesQualidade: 'Relatórios de satisfação médica dentro das métricas.',
    parecerGeral: 'Avaliação excelente no período.',
    mediaLegais: 4.60,
    mediaComportamentais: 4.80,
    mediaQualidade: 4.60,
    mediaGeral: 4.67,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: '2026-06-25'
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
