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
  {
    id: 'usr_gabriel',
    nome: 'Gabriel Kotliarenko',
    email: 'gabriel.kotliarenko@vilanovastar.com.br',
    senha: '123',
    cargo: 'Diretoria Operacional (Admin)',
    role: 'DIRETORIA'
  },
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
  // --- DIRETORIA ---
  {
    id: 'sup_dir_01',
    cnpj: '10.808.204/0001-07',
    razaoSocial: 'Banco de sangue _ Hematologia e Hemoterapia',
    nomeFantasia: 'Banco de Sangue / Hematologia',
    categoriaServico: 'Fornecimento de hemocomponentes (Banco de Sangue / Hematologia e Hemoterapia)',
    setorResponsavelId: 'sec_diretoria',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-DIR-001',
    vigenciaFim: '07/05/2041'
  },
  {
    id: 'sup_dir_02',
    cnpj: '30.814.207/0001-60',
    razaoSocial: 'Nicole Longo Fecarotta',
    nomeFantasia: 'Nicole Longo Fecarotta',
    categoriaServico: 'Diretora de Relacionamento Médico',
    setorResponsavelId: 'sec_diretoria',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-DIR-002',
    vigenciaFim: '17/07/2026'
  },
  {
    id: 'sup_dir_03',
    cnpj: '54.529.250/0001-42',
    razaoSocial: 'Senne Liquor',
    nomeFantasia: 'Senne Liquor',
    categoriaServico: 'Laboratório especializado em análise de Líquido Cefalorraquidiano (exames laboratoriais)',
    setorResponsavelId: 'sec_diretoria',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-DIR-003',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_fresenius',
    cnpj: '56.094.410/0001-01',
    razaoSocial: 'Fresenius',
    nomeFantasia: 'Fresenius Terapia Renal',
    categoriaServico: 'Terapia Renal Substitutiva (TRS) / Hemodiálise - Clínica de Doenças Renais, sob demanda',
    setorResponsavelId: 'sec_diretoria',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede20-092-00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_eritel',
    cnpj: '60.322.484/0001-17',
    razaoSocial: 'Eritel Telecomunicações',
    nomeFantasia: 'Eritel Telecomunicações',
    categoriaServico: 'Eritel Telecomunicações',
    setorResponsavelId: 'sec_diretoria',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS21-035-01',
    vigenciaFim: '22/04/2026'
  },
  {
    id: 'sup_nexxto',
    cnpj: '12.982.578/0001-70',
    razaoSocial: 'Nexxto',
    nomeFantasia: 'Nexxto Sensores',
    categoriaServico: 'Sensores de temparatura',
    setorResponsavelId: 'sec_diretoria',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS22-036-03',
    vigenciaFim: '20/03/2026'
  },
  {
    id: 'sup_cappen',
    cnpj: '08.746.768/0001-10',
    razaoSocial: 'Cappen',
    nomeFantasia: 'Cappen Website',
    categoriaServico: 'Criação, desenvolvimento de website',
    setorResponsavelId: 'sec_diretoria',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-DIR-004',
    vigenciaFim: 'Indeterminado'
  },

  // --- ENGENHARIA CLÍNICA ---
  {
    id: 'sup_baxter_starling',
    cnpj: '49.351.789/0002-61',
    razaoSocial: 'Baxter Hospitalar LTDA',
    nomeFantasia: 'Baxter Starling',
    categoriaServico: 'Locação de monitor de débito cardíaco (Starling)',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'ENG-001',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_carestream',
    cnpj: '08.546.929/0003-94',
    razaoSocial: 'Carestream',
    nomeFantasia: 'Carestream Dry & Raio-X',
    categoriaServico: 'Manutenção de impressora/revelador a seco (Dry) e equipamento de Raio-X',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'ENG-002',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_cisa_brasile',
    cnpj: '05.120.289/0001-04',
    razaoSocial: 'Cisa Brasile LTDA',
    nomeFantasia: 'Cisa Brasile',
    categoriaServico: 'Manutenção de equipamento (Termo/Termodesinfectora)',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'ENG-003',
    vigenciaFim: '30/09/2025'
  },
  {
    id: 'sup_drager',
    cnpj: '61.185.922/0001-05',
    razaoSocial: 'Drager do Brasil LTDA',
    nomeFantasia: 'Drager Anestesia',
    categoriaServico: 'Manutenção de equipamentos de Anestesia',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'ENG-004',
    vigenciaFim: '30/09/2025'
  },
  {
    id: 'sup_bbraun',
    cnpj: '31.673.254/0001-02',
    razaoSocial: 'Bbraun',
    nomeFantasia: 'Bbraun Bombas Infusão',
    categoriaServico: 'Locação de bombas de infusão (Perfusor/Infusomat Space)',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Oncostar-19-054-00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_invita',
    cnpj: '22.149.853/0001-22',
    razaoSocial: 'Invita Serviços de Manutenção LTDA',
    nomeFantasia: 'Invita CyberKnife & TomoTherapy',
    categoriaServico: 'Manutenção e reparação preventiva (CyberKnife e TomoTherapy)',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'OncoStar23-005-00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_brazil_3_business',
    cnpj: '10.515.403/0001-27',
    razaoSocial: 'Brazil 3 Business',
    nomeFantasia: 'Brazil 3 Business Mamografia',
    categoriaServico: 'Manutenção de equipamento de Mamografia (Hologic)',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'REDE/21-275/00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_ge_healthcare',
    cnpj: '00.029.372/0003-02',
    razaoSocial: 'Ge Healthcare do Brasil Comércio e Serviços para Equipamento Médico LTDA',
    nomeFantasia: 'GE Healthcare Imagem',
    categoriaServico: 'Manutenção de equipamentos de imagem',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede16-077-28',
    vigenciaFim: '30/08/2029'
  },
  {
    id: 'sup_varian',
    cnpj: '03.009.915/0001-56',
    razaoSocial: 'Varian Medical Systems Brasil LTDA',
    nomeFantasia: 'Varian Radioterapia',
    categoriaServico: 'Manutenção de equipamentos de radioterapia (Gating/TrueBeam)',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede17-122-07',
    vigenciaFim: '30/12/2025'
  },
  {
    id: 'sup_canon',
    cnpj: '46.563.938/0001-10',
    razaoSocial: 'Canon Medical Systems do Brasil LTDA',
    nomeFantasia: 'Canon Ultrassom',
    categoriaServico: 'Manutenção de Ultrassom / bens móveis',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede19-037-25',
    vigenciaFim: '01/02/2026'
  },
  {
    id: 'sup_steris',
    cnpj: '59.233.783/0004-49',
    razaoSocial: 'Steris Solutions do Brasil Importação e Comercialização',
    nomeFantasia: 'Steris Esterilizadoras',
    categoriaServico: 'Manutenção de Lavadoras/Esterilizadoras',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede22-338-03',
    vigenciaFim: '23/04/2026'
  },
  {
    id: 'sup_brainlab',
    cnpj: '02.981.566/0001-77',
    razaoSocial: 'Brainlab LTDA.',
    nomeFantasia: 'Brainlab Neuronavegador',
    categoriaServico: 'Manutenção de Neuronavegador',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede23-310-01',
    vigenciaFim: '16/04/2026'
  },
  {
    id: 'sup_h_strattner',
    cnpj: '33.250.713/0001-62',
    razaoSocial: 'H Strattner e Cia LTDA',
    nomeFantasia: 'H Strattner CyberKnife',
    categoriaServico: 'Manutenção de sistema robótico (CyberKnife)',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS20-051-00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_air_liquide_eng',
    cnpj: '00.331.788/0023-24',
    razaoSocial: 'Air Liquide Brasil LTDA',
    nomeFantasia: 'Air Liquide (Eng. Clínica)',
    categoriaServico: 'Gases Medicinais - Eng. Clínica',
    setorResponsavelId: 'sec_eng_clinica',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'ENG-005',
    vigenciaFim: '10/08/2027'
  },

  // --- GOVERNANÇA ---
  {
    id: 'sup_cleaning_solutions',
    cnpj: '',
    razaoSocial: 'CLEANING SOLUTIONS',
    nomeFantasia: 'Cleaning Solutions Piso',
    categoriaServico: 'Manutenção e tratamento de piso',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'GOV-001',
    vigenciaFim: '15/08/2028'
  },
  {
    id: 'sup_lavanderia_portinari',
    cnpj: '',
    razaoSocial: 'LAVANDERIA PORTINARI',
    nomeFantasia: 'Lavanderia Portinari',
    categoriaServico: 'Serviços de Lavanderia',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'GOV-002',
    vigenciaFim: '09/03/2027'
  },
  {
    id: 'sup_wesco',
    cnpj: '07.045.160/0001-04',
    razaoSocial: 'WESCO - (Gomes D\'Elia)',
    nomeFantasia: 'Wesco Higiene',
    categoriaServico: 'Fornecimento/locação de equipamentos e produtos de higiene',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'GOV-003',
    vigenciaFim: '02/10/2025'
  },
  {
    id: 'sup_vertas',
    cnpj: '68.112.747/0001-75',
    razaoSocial: 'VERTAS COMERCIO DE RESIDUOS TECNOLOGICOS LTDA',
    nomeFantasia: 'Vertas Resíduos Tecnológicos',
    categoriaServico: 'Comércio/gestão de resíduos tecnológicos (descarte de lixo eletrônico)',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Holding/19-111/02',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_praxxis',
    cnpj: '05.424.004/0001-10',
    razaoSocial: 'PRAXXIS CONTROLE INTEGRADO DE PRAGAS LTDA',
    nomeFantasia: 'Praxxis Dedetização',
    categoriaServico: 'Controle Integrado de Pragas (dedetização)',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Oncostar-/19-030/00',
    vigenciaFim: '29/03/2021'
  },
  {
    id: 'sup_bobson',
    cnpj: '02.815.733/0001-00',
    razaoSocial: 'BOBSON SÃO PAULO HIGIENE LTDA',
    nomeFantasia: 'Bobson Odorizadores',
    categoriaServico: 'Locação de Odorizadores Wcs',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede-21-075-19',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_allpark_mo',
    cnpj: '60.537.263/0001-66',
    razaoSocial: 'ALLPARK EPREENDIMENTOS, PARTICIPAÇÕES E SERVIÇOS S/A',
    nomeFantasia: 'Allpark Mão de Obra Estacionamento',
    categoriaServico: 'Mão de obra - Serviço de estacionamento',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-19-008-00',
    vigenciaFim: '01/05/2028'
  },
  {
    id: 'sup_allpark_bens',
    cnpj: '60.537.263/0001-66',
    razaoSocial: 'ALLPARK EPREENDIMENTOS, PARTICIPAÇÕES E SERVIÇOS S/A',
    nomeFantasia: 'Allpark Bens & Serviços Estacionamento',
    categoriaServico: 'Bens e Serviços de estacionamento',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-19-008-00',
    vigenciaFim: '01/05/2028'
  },
  {
    id: 'sup_studio_d',
    cnpj: '12.115.152/0001-19',
    razaoSocial: 'STUDIO D ESSENCES COMERCIO, FABRICAÇÃO, IMPORTAÇÃO - JUNTO COM A PASTA BOBSOON',
    nomeFantasia: 'Studio D Essences / Bobson',
    categoriaServico: 'Fornecimento/comercialização de essências aromatizantes (odorização de ambientes)',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS19-081-05',
    vigenciaFim: '01/03/2028'
  },
  {
    id: 'sup_hpx',
    cnpj: '12.942.098/0001-85',
    razaoSocial: 'HPX HIGIENIZAÇÃO TEXTIL LTDA',
    nomeFantasia: 'HPX Lavanderia Hospitalar',
    categoriaServico: 'Serviços de Lavanderia Hospitalar',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-21-049-00',
    vigenciaFim: '01/11/2024'
  },
  {
    id: 'sup_multilixo',
    cnpj: '01.382.443/0001-57',
    razaoSocial: 'MULTILIXO REMOÇÕES DE LIXO S/S LTDA/FLACIPEL',
    nomeFantasia: 'Multilixo Remoção de Lixo',
    categoriaServico: 'Remoção e coleta de resíduos (lixo)',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-22-047-01',
    vigenciaFim: '17/04/2028'
  },
  {
    id: 'sup_maria_marcia',
    cnpj: '42.479.371/0001-48',
    razaoSocial: 'MARIA MARCIA CONVENIENCE PRESENTES',
    nomeFantasia: 'Maria Marcia Conveniência',
    categoriaServico: 'Locação de espaço para loja de conveniência/presentes',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-23-019-01',
    vigenciaFim: '28/07/2025'
  },
  {
    id: 'sup_gasparian',
    cnpj: '06.984.948/0001-05',
    razaoSocial: 'GASPARIAN E SALAMÃO (Radio Ibiza)',
    nomeFantasia: 'Radio Ibiza',
    categoriaServico: 'Serviços especializados de Licenciamento de estação de rádio',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-23-031-00',
    vigenciaFim: '02/01/2025'
  },
  {
    id: 'sup_voice_tech',
    cnpj: '68.112.747/0001-75',
    razaoSocial: 'VOICE TECHNOLOGY COMERCIO EXTERIOR LTDA',
    nomeFantasia: 'Voice Technology',
    categoriaServico: 'Voice Technology',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-23-064-00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_top_service',
    cnpj: '00.973.749/0014-30',
    razaoSocial: 'Top Service Predial',
    nomeFantasia: 'Top Service Limpeza Predial',
    categoriaServico: 'Serviços de manutenção/limpeza predial',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS-24-023-00',
    vigenciaFim: '16/07/2027'
  },
  {
    id: 'sup_rb_facilities_entrepostos',
    cnpj: '52.951.890/0001-10',
    razaoSocial: 'RB FACILITIES',
    nomeFantasia: 'RB Facilities Entrepostos',
    categoriaServico: 'Mão de Obra entrepostos',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VSN-23-059-00',
    vigenciaFim: '31/12/2026'
  },
  {
    id: 'sup_rb_facilities_ascensoristas',
    cnpj: '52.951.890/0001-10',
    razaoSocial: 'RB FACILITIES',
    nomeFantasia: 'RB Facilities Ascensoristas',
    categoriaServico: 'Mão de obra Ascensoristas',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VSN-23-059-00',
    vigenciaFim: '31/12/2026'
  },
  {
    id: 'sup_allpark_cassolaris',
    cnpj: '60.537.263/0001-66',
    razaoSocial: 'ALLPARK EPREENDIMENTOS, PARTICIPAÇÕES E SERVIÇOS S/A',
    nomeFantasia: 'Allpark Cassolari\'s',
    categoriaServico: 'Locação estacionamento Cassolari\'s',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'GOV-004',
    vigenciaFim: '01/05/2028'
  },
  {
    id: 'sup_rb_facilities_bolsao',
    cnpj: '52.951.890/0001-10',
    razaoSocial: 'RB FACILITIES',
    nomeFantasia: 'RB Facilities Bolsão + Privativos',
    categoriaServico: 'Mão de obra Atendimento Bolsão + Privativos',
    setorResponsavelId: 'sec_governanca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'GOV-005',
    vigenciaFim: '31/12/2026'
  },

  // --- LABORATÓRIO ---
  {
    id: 'sup_biomerieux',
    cnpj: '33.040.635/0006-86',
    razaoSocial: 'Biomérieux Brasil Indústria Ltda',
    nomeFantasia: 'Biomérieux Brasil',
    categoriaServico: 'Comodato de equipamentos e licenciamento de software (REAL) + manutenção corretiva; consumo mínimo de reagentes/kits',
    setorResponsavelId: 'sec_laboratorio',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'LAB-001',
    vigenciaFim: '08/12/2026'
  },
  {
    id: 'sup_sysmex',
    cnpj: '02.923.414/0001-18',
    razaoSocial: 'Sismex do Brasil',
    nomeFantasia: 'Sysmex do Brasil',
    categoriaServico: 'Locação de equipamentos, fornecimento de reagentes (venda avulsa) e prestação de serviços laboratoriais (Sysmex)',
    setorResponsavelId: 'sec_laboratorio',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'LAB-002',
    vigenciaFim: '31/10/2027'
  },
  {
    id: 'sup_vyttra',
    cnpj: '00.904.728/0012-09',
    razaoSocial: 'Vyttra Diagnósticos S.A',
    nomeFantasia: 'Vyttra Diagnósticos',
    categoriaServico: 'Locação e fornecimento / compra e venda de Kits (diagnóstico laboratorial)',
    setorResponsavelId: 'sec_laboratorio',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'LAB-003',
    vigenciaFim: '08/11/2027'
  },
  {
    id: 'sup_werfen',
    cnpj: '02.004.662/0003-27',
    razaoSocial: 'Werfen Medical Ltda',
    nomeFantasia: 'Werfen Medical',
    categoriaServico: 'Fornecimento de reagentes e locação de equipamentos laboratoriais',
    setorResponsavelId: 'sec_laboratorio',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'LAB-004',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_eco_diagnostica',
    cnpj: '-',
    razaoSocial: 'Eco Diagnóstica Ltda',
    nomeFantasia: 'Eco Diagnóstica',
    categoriaServico: 'Fornecimento de kits/reagentes (Linhas F-line e Biomol M-10) com comodato de equipamentos',
    setorResponsavelId: 'sec_laboratorio',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'OncoStar23-011-00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_controllab',
    cnpj: '29.511.607/0001-18',
    razaoSocial: 'Controllab Controle de Qualidade para laboratórios Ltda',
    nomeFantasia: 'Controllab Qualidade',
    categoriaServico: 'Controle de Qualidade Laboratorial',
    setorResponsavelId: 'sec_laboratorio',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'LAB-005',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_ortho_clinical',
    cnpj: '21.921.393/0002-27',
    razaoSocial: 'Ortho Clinical Diagnostics',
    nomeFantasia: 'Ortho Clinical Diagnostics',
    categoriaServico: 'Locação de equipamentos',
    setorResponsavelId: 'sec_laboratorio',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'LAB-006',
    vigenciaFim: '16/12/2029'
  },

  // --- MANUTENÇÃO ---
  {
    id: 'sup_air_liquide_manut',
    cnpj: '00.331.788/0001-19',
    razaoSocial: 'Air Liquide Brasil LTDA',
    nomeFantasia: 'Air Liquide Gases',
    categoriaServico: 'Gases Medicinais - Manutenção',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'MAN-001',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_schindler_elevadores',
    cnpj: '00.028.986/0051-77',
    razaoSocial: 'Elevadores Atlas Shindler LTDA',
    nomeFantasia: 'Atlas Schindler Elevadores',
    categoriaServico: 'Manutenção Elevadores',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'MAN-002',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_schindler_escadas',
    cnpj: '00.028.986/0051-77',
    razaoSocial: 'Elevadores Atlas Shindler LTDA',
    nomeFantasia: 'Atlas Schindler Escada Rolante',
    categoriaServico: 'Manutenção de escada rolante',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'MAN-003',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_net_tv',
    cnpj: '40.432.544/0001-47',
    razaoSocial: 'Net TV a Cabo',
    nomeFantasia: 'Net TV a Cabo',
    categoriaServico: 'TV a Cabo',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'MAN-004',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_thyssen',
    cnpj: '90.347.840/0001-18',
    razaoSocial: 'Thyssem TKE',
    nomeFantasia: 'Thyssem TKE Elevadores',
    categoriaServico: 'Manutenção Elevadores',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'MAN-005',
    vigenciaFim: '23/09/2025'
  },
  {
    id: 'sup_petroserv',
    cnpj: '43.227.610/0001-35',
    razaoSocial: 'Petroserv Comércio de Derivados de Petróleo LTDA',
    nomeFantasia: 'Petroserv Diesel',
    categoriaServico: 'Circulação de Diesel',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede/18-089/05',
    vigenciaFim: '02/10/2027'
  },
  {
    id: 'sup_engepower',
    cnpj: '00.772.864/0001-21',
    razaoSocial: 'Engepower Eng e Com LTDA',
    nomeFantasia: 'Engepower Subestação',
    categoriaServico: 'Preventiva e Corretiva Subestação',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede/18-102/01',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_nobreak_quality',
    cnpj: '10.692.808/0001-30',
    razaoSocial: 'Nobreak Quality',
    nomeFantasia: 'Nobreak Quality',
    categoriaServico: 'Manutenção de Nobreak',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede-19-030-15',
    vigenciaFim: '07/07/2026'
  },
  {
    id: 'sup_slg_incendio',
    cnpj: '00.022.090/0001-11',
    razaoSocial: 'SLG',
    nomeFantasia: 'SLG Incêndio',
    categoriaServico: 'Equipamento de Incêndio',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede20-147-00',
    vigenciaFim: '01/05/2027'
  },
  {
    id: 'sup_argus_manut',
    cnpj: '12.096.667/0001-19',
    razaoSocial: 'Argus Produtos E Sistemas Contra Incêndio Ltda',
    nomeFantasia: 'Argus Combate Incêndio',
    categoriaServico: 'Manutenção do sistema de combate a incêndio',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede24-409-00',
    vigenciaFim: '02/01/2028'
  },
  {
    id: 'sup_wgl_geradores',
    cnpj: '11.063.844/0001-06',
    razaoSocial: 'Wgl Solucoes Em Tecnologias E Servicos Ltda',
    nomeFantasia: 'Wgl Geradores',
    categoriaServico: 'Manutenção nos Geradores',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede25-202-00',
    vigenciaFim: '27/06/2027'
  },
  {
    id: 'sup_kpm_pmoc',
    cnpj: '18.126.361/0001-44',
    razaoSocial: 'KPM SERVICE LTDA',
    nomeFantasia: 'KPM Ar-condicionado PMOC',
    categoriaServico: 'Manutenção de Ar-condicionado - PMOC',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'Rede25-227-00',
    vigenciaFim: '06/05/2031'
  },
  {
    id: 'sup_controlbio_micro',
    cnpj: '67.185.108/0001-77',
    razaoSocial: 'Controlbio assessoria Técnica Microbiológiva SS LTDA',
    nomeFantasia: 'Controlbio Análise de Água',
    categoriaServico: 'Análise Microbiológica',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS/21-027/00',
    vigenciaFim: '28/02/2026'
  },
  {
    id: 'sup_ccl_capelas',
    cnpj: '00.236.854/0001-71',
    razaoSocial: 'CCL',
    nomeFantasia: 'CCL Capelas',
    categoriaServico: 'Manutenção Capelas',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS20-037-00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_controller_smart',
    cnpj: '07.230.898/0001-33',
    razaoSocial: 'Controller- será Smart',
    nomeFantasia: 'Controller Smart Automação',
    categoriaServico: 'Automação Predial',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS20-043-03',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_wtc_agua',
    cnpj: '19.524.939/0001-83',
    razaoSocial: 'W.T.C. Tecnologia em Tratamento de Água LTDA',
    nomeFantasia: 'WTC Tratamento Água',
    categoriaServico: 'Tratamento de Água / Chiller',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS20-071-00',
    vigenciaFim: '27/06/2026'
  },
  {
    id: 'sup_wm_aerocom',
    cnpj: '23.757.662/0001-06',
    razaoSocial: 'Wm Comercio E Servicos De Equipamentos Industriais E Comerciais Eirelli (Aerocom)',
    nomeFantasia: 'Wm Aerocom Pneumático',
    categoriaServico: 'Manutenção do Sistema Pneumático',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS21-025-01',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_rdi_bender',
    cnpj: '52.133.485/0001-95',
    razaoSocial: 'RDI Bender',
    nomeFantasia: 'RDI Bender IT Médico',
    categoriaServico: 'Manutenção do Sistema IT Médico',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS24-011-00',
    vigenciaFim: '11/08/2027'
  },
  {
    id: 'sup_acquasuly',
    cnpj: '43.139.722/0001-34',
    razaoSocial: 'Acquasuly Engenharia Em Agua Quente E Ga',
    nomeFantasia: 'Acquasuly Engenharia',
    categoriaServico: 'Manutenção no Aquecedores e Boilers',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS24-016-00',
    vigenciaFim: '08/01/2027'
  },
  {
    id: 'sup_manusa_portas',
    cnpj: '14.995.623/0001-56',
    razaoSocial: 'Manusa Do Brasil Industria E Com De Portas Automaticas Ltda',
    nomeFantasia: 'Manusa Portas Automáticas',
    categoriaServico: 'Automação das Portas',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS24-018-00',
    vigenciaFim: '31/10/2026'
  },
  {
    id: 'sup_sos_corta_fogo',
    cnpj: '05.357.829/0001-60',
    razaoSocial: 'SOS portas Corta Fogo',
    nomeFantasia: 'SOS Portas Corta Fogo',
    categoriaServico: 'Manutenção em Portas Corta Fogo',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS25-150-00',
    vigenciaFim: '02/10/2026'
  },
  {
    id: 'sup_everest_purificadores',
    cnpj: '01.953.146/0001-14',
    razaoSocial: 'Everest Comércio de Refrigeração e Serviços SLU LTDA',
    nomeFantasia: 'Everest Purificadores',
    categoriaServico: 'Higienização externa dos purificadores',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'MAN-006',
    vigenciaFim: '14/05/2027'
  },
  {
    id: 'sup_microambiental',
    cnpj: '68.312.032/0001-66',
    razaoSocial: 'Microambiental Laboratório, comércio e Serviços em Água LTDA',
    nomeFantasia: 'Microambiental Água',
    categoriaServico: 'Análise de Água',
    setorResponsavelId: 'sec_manutencao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'MAN-007',
    vigenciaFim: 'Indeterminado'
  },

  // --- MEDICINA NUCLEAR ---
  {
    id: 'sup_cyclobras',
    cnpj: '08.820.007/0001-61',
    razaoSocial: 'Cyclobras Indústria, Comercio e Serviços Laboratoriais LTDA',
    nomeFantasia: 'Cyclobras Laboratoriais',
    categoriaServico: 'Fornecimento de doses de Fluordeoxiglicose-F18 (FDG-F18) e PSMA-F18',
    setorResponsavelId: 'sec_medicina_nuclear',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'NUC-001',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_eckert_ziegler',
    cnpj: '21.423.605/0001-65',
    razaoSocial: 'Eckert & Ziegler',
    nomeFantasia: 'Eckert & Ziegler',
    categoriaServico: 'Transporte de mercadorias (radiofármacos) sob demanda',
    setorResponsavelId: 'sec_medicina_nuclear',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'NUC-002',
    vigenciaFim: 'Em Renovação'
  },
  {
    id: 'sup_ibf_farmoquimicos',
    cnpj: '14.864.868/0001-44',
    razaoSocial: 'IBF - Indústria Brasileira de Farmoquimicos',
    nomeFantasia: 'IBF Farmoquímicos',
    categoriaServico: 'Fornecimento do produto FDG-18F para diagnóstico em Medicina Nuclear (PET/CT)',
    setorResponsavelId: 'sec_medicina_nuclear',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'NUC-003',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_rph_radiofarmacia',
    cnpj: '19.315.658/0001-10',
    razaoSocial: 'RPH Radiofarmacia Centralizada LTDA',
    nomeFantasia: 'RPH Radiofarmácia',
    categoriaServico: 'Manipulação de Doses de Radiofármacos',
    setorResponsavelId: 'sec_medicina_nuclear',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS/19-047/00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_ipen_nuclear',
    cnpj: '00.402.552/0001-26',
    razaoSocial: 'IPEN',
    nomeFantasia: 'IPEN Radiofármacos',
    categoriaServico: 'Fornecimento de Radiofármacos IPEN',
    setorResponsavelId: 'sec_medicina_nuclear',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'NUC-004',
    vigenciaFim: 'Indeterminado'
  },

  // --- NUTRIÇÃO ---
  {
    id: 'sup_nestle',
    cnpj: '60.409.075/0540-82',
    razaoSocial: 'Nestle Brasil Ltda',
    nomeFantasia: 'Nestle Nespresso',
    categoriaServico: 'Fornecimento de produtos e comodato de máquinas (linha Nespresso Professional)',
    setorResponsavelId: 'sec_nutricao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'NUT-001',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_roland_villard',
    cnpj: '14.660.551/0001-96',
    razaoSocial: 'Roland Villard Servicos de Gastronomia LTDA',
    nomeFantasia: 'Roland Villard Gastronomia',
    categoriaServico: 'Consultoria em gastronomia e arte culinária',
    setorResponsavelId: 'sec_nutricao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'NUT-002',
    vigenciaFim: '27/11/2027'
  },
  {
    id: 'sup_prime_frio',
    cnpj: '30.482.421/0001-67',
    razaoSocial: 'Prime Frio Refrigeração',
    nomeFantasia: 'Prime Frio Refrigeração',
    categoriaServico: 'Manutenção preventiva e corretiva de equipamentos de refrigeração',
    setorResponsavelId: 'sec_nutricao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS22-011-00',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_melco_cozinha',
    cnpj: '10.721.756/0001-83',
    razaoSocial: 'MELCO COMERCIO E INSTALACOES LTDA',
    nomeFantasia: 'Melco Equipamentos Cozinha',
    categoriaServico: 'Manutenção em equipamentos de cozinha',
    setorResponsavelId: 'sec_nutricao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS23-015-01',
    vigenciaFim: '06/01/2026'
  },
  {
    id: 'sup_sisnacmed_burlodge',
    cnpj: '10.444.624/0001-51',
    razaoSocial: 'SISNACMED',
    nomeFantasia: 'Sisnacmed Burlodge',
    categoriaServico: 'Manutenção Preventiva e Corretiva nos carros de transporte de refeição (Burlodge)',
    setorResponsavelId: 'sec_nutricao',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS25-005-00',
    vigenciaFim: '23/01/2027'
  },

  // --- SEGURANÇA PATRIMONIAL ---
  {
    id: 'sup_systempower_cftv',
    cnpj: '07.880.795/0001-19',
    razaoSocial: 'SYSTEMPOWER LTDA ME',
    nomeFantasia: 'Systempower CFTV',
    categoriaServico: 'Monitoramento e manutenção básica de Circuito Fechado de Televisão (CFTV)',
    setorResponsavelId: 'sec_seguranca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'SEG-001',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_dunamis_vigilancia',
    cnpj: '04.365.440/0001-01',
    razaoSocial: 'DUNAMIS SERVIÇOS EMPRESARIAIS TERCEIRIZADOS LTDA. ME,',
    nomeFantasia: 'Dunamis Vigilância',
    categoriaServico: 'Vigilância',
    setorResponsavelId: 'sec_seguranca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'OncoStarFarm22-001-01.',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_engeradios_telecom',
    cnpj: '45.656.883/0001-20',
    razaoSocial: 'Engeradios Rio Comércio de Aparelhos de Telecomunicações LTDA',
    nomeFantasia: 'Engeradios Telecomunicações',
    categoriaServico: 'Locação/manutenção de equipamentos de radiocomunicação (rádios) para segurança patrimonial',
    setorResponsavelId: 'sec_seguranca',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'VNS19-103-03',
    vigenciaFim: '01/02/2026'
  },

  // --- EQUIPE MULTI ---
  {
    id: 'sup_vo2_fisioterapia',
    cnpj: '39.615.127/0001-50',
    razaoSocial: 'Fisioterapia - VO2 CARE Fisioterapia',
    nomeFantasia: 'VO2 CARE Fisioterapia',
    categoriaServico: 'Prestação de serviços especializados de Fisioterapia',
    setorResponsavelId: 'sec_multi',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'MUL-001',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_ceaf_fonoaudiologia',
    cnpj: '33.440.921/0001-24',
    razaoSocial: 'Fonoaudiologia - CEAF',
    nomeFantasia: 'CEAF Fonoaudiologia',
    categoriaServico: 'Prestação de serviços especializados de Fonoaudiologia',
    setorResponsavelId: 'sec_multi',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'MUL-002',
    vigenciaFim: 'Indeterminado'
  },
  {
    id: 'sup_psicologia_multi',
    cnpj: '22.685.201/0001-02',
    razaoSocial: 'Psicologia',
    nomeFantasia: 'Psicologia Especializada',
    categoriaServico: 'Prestação de serviços especializados de Psicologia',
    setorResponsavelId: 'sec_multi',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'MUL-003',
    vigenciaFim: 'Indeterminado'
  },

  // --- SESMT ---
  {
    id: 'sup_fermar_fire',
    cnpj: '09.494.572/0001-49',
    razaoSocial: 'FERMAR FIRE PROJETOS DE SEGURANÇA CONTRA INCÊNDIO LTDA',
    nomeFantasia: 'Fermar Fire Segurança',
    categoriaServico: 'Engenharia e Projetos de Segurança contra Incêndio (SESMT)',
    setorResponsavelId: 'sec_sesmt',
    contatoNome: '', contatoEmail: '', contatoTelefone: '',
    numeroContrato: 'SES-001',
    vigenciaFim: '01/05/2028'
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
    mediaLegais: 5.0,
    mediaComportamentais: 5.0,
    mediaQualidade: 5.0,
    mediaGeral: 5.0,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: '2024-11-25',
    nomeSignatario: 'Carlos Eduardo Santos',
    cargoSignatario: 'Engenheiro Responsável'
  },
  {
    id: 'eval_acquasuly_2026',
    fornecedorId: 'sup_acquasuly',
    setorId: 'sec_manutencao',
    ano: 2026,
    dataAvaliacao: '2026-08-15',
    gestorAvaliador: 'Eduardo Gonçalves Dias',
    emailAvaliador: 'eduardo.gdias@vilanovastar.com.br',
    respostas: {
      leg_1: 4, leg_2: 4, leg_3: 4, leg_4: 'NA', leg_5: 5,
      comp_1: 4, comp_2: 4, comp_3: 4, comp_4: 4, comp_5: 5,
      qual_1: 4, qual_2: 4, qual_3: 4, qual_4: 5, qual_5: 5
    },
    mediaLegais: 4.25,
    mediaComportamentais: 4.20,
    mediaQualidade: 4.40,
    mediaGeral: 4.28,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'PENDENTE'
  },

  // 2. Equipe Multi - VO2 Care Fisioterapia 2026
  {
    id: 'eval_vo2_2026',
    fornecedorId: 'sup_vo2_fisioterapia',
    setorId: 'sec_multi',
    ano: 2026,
    dataAvaliacao: '2026-08-10',
    gestorAvaliador: 'Giseli Carvalho',
    emailAvaliador: 'giseli.carvalho@vilanovastar.com.br',
    respostas: {
      leg_1: 5, leg_2: 5, leg_3: 5, leg_4: 5, leg_5: 5,
      comp_1: 5, comp_2: 5, comp_3: 5, comp_4: 5, comp_5: 5,
      qual_1: 5, qual_2: 5, qual_3: 5, qual_4: 5, qual_5: 5
    },
    mediaLegais: 5.0,
    mediaComportamentais: 5.0,
    mediaQualidade: 5.0,
    mediaGeral: 5.0,
    statusMeta: 'DENTRO_DA_META',
    necessitaPlanoAcao: false,
    statusAssinatura: 'ASSINADO_CIENTE',
    dataCiencia: '2026-08-12',
    nomeSignatario: 'Dr. André Fonseca',
    cargoSignatario: 'Diretor Técnico'
  }
];

export const INITIAL_ACTION_PLANS: ActionPlan[] = [];
