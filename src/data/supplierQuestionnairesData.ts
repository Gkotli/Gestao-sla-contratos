// Arquivo gerado automaticamente a partir de QUESTIONARIOS_PRONTO_ANTIGRAVITY.xlsx e BASE_QUESTIONARIOS_CORRIGIDA_ANTIGRAVITY.xlsx
// Total de fornecedores mapeados e perguntas vinculadas

export interface SupplierQuestionItem {
  id: string;
  fornecedor: string;
  categoria: 'ASPECTOS LEGAIS' | 'ASPECTOS COMPORTAMENTAIS' | 'PROGRAMA QUALIDADE E SEGURANÇA' | string;
  pergunta: string;
  obrigatoria: boolean;
  peso: number;
  isManualAddition?: boolean;
  justificativaAdicao?: string;
}

export const SUPPLIER_QUESTIONNAIRES_DATA: Record<string, SupplierQuestionItem[]> = {
  "Banco de Sangue / Hematologia": [
    {
      "id": "DIRGGS001",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Dispõe de funcionários habilitados, capacitados, treinados e aptos tecnicamente para atender a demanda?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS002",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprir com todas as leis e demais ordenamentos federais, estaduais e municipais vigentes, incluindo normas emanadas das agências reguladoras (ANS e ANVISA), e dos órgãos de classe.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS003",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada e seus profissionais, cumprem as ordens estabelecidas, horário de trabalho, normas de segurança, regimento interno e outras obrigações estabelecidas pela instituição?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS004",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Nos casos de falta do funcionário, férias, faltas, afastamentos médicos e outros está sendo feita a substituição imediata por outro funcionário?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS005",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's recomendados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS006",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A contratada e seus profissionais prestam um bom atendimento técnico e pessoal aos pacientes e acompanhantes com cordialidade, ética, presteza, assegurando o sigilo das informações?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS007",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos prestadores de serviço está adequada (crachá e jaleco da instituição)?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS008",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais prestadores de serviço seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS009",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS010",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Os indicadores são atualizados dentro do prazo, assegurando o monitoramento dos resultados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS011",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O gestor participa das reuniões de indicadores?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS012",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Estabelece método sistemático do controle dos documentos no GED?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS013",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Promove ações de melhoria para as não conformidades encontradas entre os processos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRGGS014",
      "fornecedor": "Banco de Sangue / Hematologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Realiza registro em prontuário corretamente?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Senne Liquor": [
    {
      "id": "DIRSEN001",
      "fornecedor": "Senne Liquor",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Dispõe de funcionários habilitados, capacitados, treinados e aptos tecnicamente para atender a demanda?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN002",
      "fornecedor": "Senne Liquor",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprir com todas as leis e demais ordenamentos federais, estaduais e municipais vigentes, incluindo normas emanadas das agências reguladoras (ANS e ANVISA), e dos órgãos de classe.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN003",
      "fornecedor": "Senne Liquor",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada e seus profissionais, cumprem as ordens estabelecidas, horário de trabalho, normas de segurança, regimento interno e outras obrigações estabelecidas pela instituição?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN004",
      "fornecedor": "Senne Liquor",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Nos casos de falta do funcionário, férias, faltas, afastamentos médicos e outros está sendo feita a substituição imediata por outro funcionário?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN005",
      "fornecedor": "Senne Liquor",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's recomendados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN006",
      "fornecedor": "Senne Liquor",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A contratada e seus profissionais prestam um bom atendimento técnico e pessoal aos pacientes e acompanhantes com cordialidade, ética, presteza, assegurando o sigilo das informações?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN007",
      "fornecedor": "Senne Liquor",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos prestadores de serviço está adequada (crachá e jaleco da instituição)?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN008",
      "fornecedor": "Senne Liquor",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais prestadores de serviço seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN009",
      "fornecedor": "Senne Liquor",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN010",
      "fornecedor": "Senne Liquor",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Os indicadores são atualizados dentro do prazo, assegurando o monitoramento dos resultados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN011",
      "fornecedor": "Senne Liquor",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O gestor participa das reuniões de indicadores?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN012",
      "fornecedor": "Senne Liquor",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Estabelece método sistemático do controle dos documentos no GED?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN013",
      "fornecedor": "Senne Liquor",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Promove ações de melhoria para as não conformidades encontradas entre os processos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRSEN014",
      "fornecedor": "Senne Liquor",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Realiza registro em prontuário corretamente?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Fresenius Terapia Renal": [
    {
      "id": "DIRFRE001",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Disponibiliza equipe treinada, capacitada e habilitada para execução de serviços, se responsabiliza pela gestão técnica dos serviços que presta, bem como pelos atos de seus profissionais envolvidos.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE002",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Disponibiliza com prontidão toda a documentação como alvarás, licenças, certidões, autorizações necessárias para a regularização do serviço",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE003",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O contratado fornece equipamentos, insumos, mão de obra, emissão de laudo e profissional que possua todos os requisitos necessários para assumir a responsabilidade técnica pelo Núcleo Técnico Hospitalar?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE004",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os procedimentos são realizados somente com autorização do convênio?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE005",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Nos casos de procedimentos de urgência, o responsável disponibiliza alguém da equipe para atendimento imedialo?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE006",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Todos profissionais são cadastrados no hospital?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE007",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada atende a demanda de exames solicitados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE008",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "PPRA e o PCMSO estao atualizados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE009",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE010",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE011",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos prestadores de serviço está adequada (crachá e jaleco da instituição)?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE012",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE013",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE014",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Os indicadores são atualizados dentro do prazo, assegurando o monitoramento dos resultados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE015",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Os documentos estão atualizados e disponíveis no GED ou setor?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE017",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "DIRFRE018",
      "fornecedor": "Fresenius Terapia Renal",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Realiza registro em prontuário corretamente?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Brazil 3 Business Mamografia": [
    {
      "id": "ENGBRA001",
      "fornecedor": "Brazil 3 Business Mamografia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA002",
      "fornecedor": "Brazil 3 Business Mamografia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA003",
      "fornecedor": "Brazil 3 Business Mamografia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA004",
      "fornecedor": "Brazil 3 Business Mamografia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA005",
      "fornecedor": "Brazil 3 Business Mamografia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA006",
      "fornecedor": "Brazil 3 Business Mamografia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA007",
      "fornecedor": "Brazil 3 Business Mamografia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA008",
      "fornecedor": "Brazil 3 Business Mamografia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA009",
      "fornecedor": "Brazil 3 Business Mamografia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Baxter Starling": [
    {
      "id": "ENGBAX001",
      "fornecedor": "Baxter Starling",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBAX002",
      "fornecedor": "Baxter Starling",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBAX003",
      "fornecedor": "Baxter Starling",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBAX004",
      "fornecedor": "Baxter Starling",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBAX005",
      "fornecedor": "Baxter Starling",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBAX006",
      "fornecedor": "Baxter Starling",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBAX007",
      "fornecedor": "Baxter Starling",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBAX008",
      "fornecedor": "Baxter Starling",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBAX009",
      "fornecedor": "Baxter Starling",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Canon Ultrassom": [
    {
      "id": "ENGCAN001",
      "fornecedor": "Canon Ultrassom",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAN002",
      "fornecedor": "Canon Ultrassom",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAN003",
      "fornecedor": "Canon Ultrassom",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAN004",
      "fornecedor": "Canon Ultrassom",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAN005",
      "fornecedor": "Canon Ultrassom",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAN006",
      "fornecedor": "Canon Ultrassom",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAN007",
      "fornecedor": "Canon Ultrassom",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAN008",
      "fornecedor": "Canon Ultrassom",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAN009",
      "fornecedor": "Canon Ultrassom",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Invita CyberKnife & TomoTherapy": [
    {
      "id": "ENGINV001",
      "fornecedor": "Invita CyberKnife & TomoTherapy",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGINV002",
      "fornecedor": "Invita CyberKnife & TomoTherapy",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGINV003",
      "fornecedor": "Invita CyberKnife & TomoTherapy",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGINV004",
      "fornecedor": "Invita CyberKnife & TomoTherapy",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGINV005",
      "fornecedor": "Invita CyberKnife & TomoTherapy",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGINV006",
      "fornecedor": "Invita CyberKnife & TomoTherapy",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGINV007",
      "fornecedor": "Invita CyberKnife & TomoTherapy",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGINV008",
      "fornecedor": "Invita CyberKnife & TomoTherapy",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGINV009",
      "fornecedor": "Invita CyberKnife & TomoTherapy",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Steris Esterilizadoras": [
    {
      "id": "ENGSTE001",
      "fornecedor": "Steris Esterilizadoras",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGSTE002",
      "fornecedor": "Steris Esterilizadoras",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGSTE003",
      "fornecedor": "Steris Esterilizadoras",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGSTE004",
      "fornecedor": "Steris Esterilizadoras",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGSTE005",
      "fornecedor": "Steris Esterilizadoras",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGSTE006",
      "fornecedor": "Steris Esterilizadoras",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGSTE007",
      "fornecedor": "Steris Esterilizadoras",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGSTE008",
      "fornecedor": "Steris Esterilizadoras",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGSTE009",
      "fornecedor": "Steris Esterilizadoras",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "H Strattner CyberKnife": [
    {
      "id": "ENGHS001",
      "fornecedor": "H Strattner CyberKnife",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGHS002",
      "fornecedor": "H Strattner CyberKnife",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGHS003",
      "fornecedor": "H Strattner CyberKnife",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGHS004",
      "fornecedor": "H Strattner CyberKnife",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGHS005",
      "fornecedor": "H Strattner CyberKnife",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGHS006",
      "fornecedor": "H Strattner CyberKnife",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGHS007",
      "fornecedor": "H Strattner CyberKnife",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGHS008",
      "fornecedor": "H Strattner CyberKnife",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGHS009",
      "fornecedor": "H Strattner CyberKnife",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Varian Radioterapia": [
    {
      "id": "ENGVAR001",
      "fornecedor": "Varian Radioterapia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGVAR002",
      "fornecedor": "Varian Radioterapia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGVAR003",
      "fornecedor": "Varian Radioterapia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGVAR004",
      "fornecedor": "Varian Radioterapia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGVAR005",
      "fornecedor": "Varian Radioterapia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGVAR006",
      "fornecedor": "Varian Radioterapia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGVAR007",
      "fornecedor": "Varian Radioterapia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGVAR008",
      "fornecedor": "Varian Radioterapia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGVAR009",
      "fornecedor": "Varian Radioterapia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "GE Healthcare Imagem": [
    {
      "id": "ENGGE001",
      "fornecedor": "GE Healthcare Imagem",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGGE002",
      "fornecedor": "GE Healthcare Imagem",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGGE003",
      "fornecedor": "GE Healthcare Imagem",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGGE004",
      "fornecedor": "GE Healthcare Imagem",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGGE005",
      "fornecedor": "GE Healthcare Imagem",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGGE006",
      "fornecedor": "GE Healthcare Imagem",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGGE007",
      "fornecedor": "GE Healthcare Imagem",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGGE008",
      "fornecedor": "GE Healthcare Imagem",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGGE009",
      "fornecedor": "GE Healthcare Imagem",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Brainlab Neuronavegador": [
    {
      "id": "ENGBRA001",
      "fornecedor": "Brainlab Neuronavegador",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA002",
      "fornecedor": "Brainlab Neuronavegador",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA003",
      "fornecedor": "Brainlab Neuronavegador",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA004",
      "fornecedor": "Brainlab Neuronavegador",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA005",
      "fornecedor": "Brainlab Neuronavegador",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA006",
      "fornecedor": "Brainlab Neuronavegador",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA007",
      "fornecedor": "Brainlab Neuronavegador",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA008",
      "fornecedor": "Brainlab Neuronavegador",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBRA009",
      "fornecedor": "Brainlab Neuronavegador",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Cisa Brasile": [
    {
      "id": "ENGCIS001",
      "fornecedor": "Cisa Brasile",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCIS002",
      "fornecedor": "Cisa Brasile",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCIS003",
      "fornecedor": "Cisa Brasile",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCIS004",
      "fornecedor": "Cisa Brasile",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCIS005",
      "fornecedor": "Cisa Brasile",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCIS006",
      "fornecedor": "Cisa Brasile",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCIS007",
      "fornecedor": "Cisa Brasile",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCIS008",
      "fornecedor": "Cisa Brasile",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCIS009",
      "fornecedor": "Cisa Brasile",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Philips medical Sys.": [
    {
      "id": "ENGPHI001",
      "fornecedor": "Philips medical Sys.",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGPHI002",
      "fornecedor": "Philips medical Sys.",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGPHI003",
      "fornecedor": "Philips medical Sys.",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGPHI004",
      "fornecedor": "Philips medical Sys.",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGPHI005",
      "fornecedor": "Philips medical Sys.",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGPHI006",
      "fornecedor": "Philips medical Sys.",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGPHI007",
      "fornecedor": "Philips medical Sys.",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGPHI008",
      "fornecedor": "Philips medical Sys.",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGPHI009",
      "fornecedor": "Philips medical Sys.",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Endoclear": [
    {
      "id": "ENGEND001",
      "fornecedor": "Endoclear",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGEND002",
      "fornecedor": "Endoclear",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGEND003",
      "fornecedor": "Endoclear",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGEND004",
      "fornecedor": "Endoclear",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGEND005",
      "fornecedor": "Endoclear",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGEND006",
      "fornecedor": "Endoclear",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGEND007",
      "fornecedor": "Endoclear",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGEND008",
      "fornecedor": "Endoclear",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGEND009",
      "fornecedor": "Endoclear",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Drager Anestesia": [
    {
      "id": "ENGDRA001",
      "fornecedor": "Drager Anestesia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGDRA002",
      "fornecedor": "Drager Anestesia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGDRA003",
      "fornecedor": "Drager Anestesia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGDRA004",
      "fornecedor": "Drager Anestesia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGDRA005",
      "fornecedor": "Drager Anestesia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGDRA006",
      "fornecedor": "Drager Anestesia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGDRA007",
      "fornecedor": "Drager Anestesia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGDRA008",
      "fornecedor": "Drager Anestesia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGDRA009",
      "fornecedor": "Drager Anestesia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Carestream Dry & Raio-X": [
    {
      "id": "ENGCAR001",
      "fornecedor": "Carestream Dry & Raio-X",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAR002",
      "fornecedor": "Carestream Dry & Raio-X",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAR003",
      "fornecedor": "Carestream Dry & Raio-X",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAR004",
      "fornecedor": "Carestream Dry & Raio-X",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAR005",
      "fornecedor": "Carestream Dry & Raio-X",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAR006",
      "fornecedor": "Carestream Dry & Raio-X",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAR007",
      "fornecedor": "Carestream Dry & Raio-X",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAR008",
      "fornecedor": "Carestream Dry & Raio-X",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGCAR009",
      "fornecedor": "Carestream Dry & Raio-X",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Bbraun Bombas Infusão": [
    {
      "id": "ENGBB001",
      "fornecedor": "Bbraun Bombas Infusão",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBB002",
      "fornecedor": "Bbraun Bombas Infusão",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBB003",
      "fornecedor": "Bbraun Bombas Infusão",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBB004",
      "fornecedor": "Bbraun Bombas Infusão",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBB005",
      "fornecedor": "Bbraun Bombas Infusão",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBB006",
      "fornecedor": "Bbraun Bombas Infusão",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBB007",
      "fornecedor": "Bbraun Bombas Infusão",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBB008",
      "fornecedor": "Bbraun Bombas Infusão",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGBB009",
      "fornecedor": "Bbraun Bombas Infusão",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Air Liquide (Eng. Clínica)": [
    {
      "id": "ENGAIR001",
      "fornecedor": "Air Liquide (Eng. Clínica)",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGAIR002",
      "fornecedor": "Air Liquide (Eng. Clínica)",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGAIR003",
      "fornecedor": "Air Liquide (Eng. Clínica)",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGAIR004",
      "fornecedor": "Air Liquide (Eng. Clínica)",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGAIR005",
      "fornecedor": "Air Liquide (Eng. Clínica)",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGAIR006",
      "fornecedor": "Air Liquide (Eng. Clínica)",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGAIR007",
      "fornecedor": "Air Liquide (Eng. Clínica)",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGAIR008",
      "fornecedor": "Air Liquide (Eng. Clínica)",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "ENGAIR009",
      "fornecedor": "Air Liquide (Eng. Clínica)",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Psicologia Especializada": [
    {
      "id": "EQUPSI001",
      "fornecedor": "Psicologia Especializada",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Dispõe de funcionários habilitados, capacitados, treinados e aptos tecnicamente para atender a demanda?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI002",
      "fornecedor": "Psicologia Especializada",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprir com todas as leis e demais ordenamentos federais, estaduais e municipais vigentes, incluindo normas emanadas das agencias reguladoras (ANS e ANVISA), e dos órgãos de classe.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI003",
      "fornecedor": "Psicologia Especializada",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada e seus profissionais, cumprem as ordens estabelecidas, horário de trabalho, normas de segurança, regimento interno e outras obrigações estabelecidas pela instituição?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI004",
      "fornecedor": "Psicologia Especializada",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Nos casos de falta do funcionário, férias, faltas, afastamentos médicos e outros está sendo feita a substituição imediata por outro funcionário?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI005",
      "fornecedor": "Psicologia Especializada",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's recomendados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI006",
      "fornecedor": "Psicologia Especializada",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A contratada e seus profissionais prestam um bom atendimento técnico e pessoal aos pacientes e acompanhantes com cordialidade, ética, presteza, assegurando o sigilo das informações?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI007",
      "fornecedor": "Psicologia Especializada",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos prestadores de serviço está adequada (crachá e jaleco da instituição)?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI008",
      "fornecedor": "Psicologia Especializada",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais prestadores de serviço seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI009",
      "fornecedor": "Psicologia Especializada",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI010",
      "fornecedor": "Psicologia Especializada",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Os indicadores são atualizados dentro do prazo, assegurando o monitoramento dos resultados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI011",
      "fornecedor": "Psicologia Especializada",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O gestor participa das reuniões de indicadores?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI012",
      "fornecedor": "Psicologia Especializada",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Estabelece método sistemático do controle dos documentos no GED?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI013",
      "fornecedor": "Psicologia Especializada",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Promove ações de melhoria para as não conformidades encontradas entre os processos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUPSI014",
      "fornecedor": "Psicologia Especializada",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Realiza registro em prontuário corretamente?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "CEAF Fonoaudiologia": [
    {
      "id": "EQUFON001",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Dispõe de funcionários habilitados, capacitados, treinados e aptos tecnicamente para atender a demanda?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON002",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprir com todas as leis e demais ordenamentos federais, estaduais e municipais vigentes, incluindo normas emanadas das agencias reguladoras (ANS e ANVISA), e dos órgãos de classe.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON003",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada e seus profissionais, cumprem as ordens estabelecidas, horário de trabalho, normas de segurança, regimento interno e outras obrigações estabelecidas pela instituição?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON004",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Nos casos de falta do funcionário, férias, faltas, afastamentos médicos e outros está sendo feita a substituição imediata por outro funcionário?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON005",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's recomendados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON006",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A contratada e seus profissionais prestam um bom atendimento técnico e pessoal aos pacientes e acompanhantes com cordialidade, ética, presteza, assegurando o sigilo das informações?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON007",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos prestadores de serviço está adequada (crachá e jaleco da instituição)?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON008",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais prestadores de serviço seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON009",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON010",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Os indicadores são atualizados dentro do prazo, assegurando o monitoramento dos resultados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON011",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O gestor participa das reuniões de indicadores?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON012",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Estabelece método sistemático do controle dos documentos no GED?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON013",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Promove ações de melhoria para as não conformidades encontradas entre os processos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFON014",
      "fornecedor": "CEAF Fonoaudiologia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Realiza registro em prontuário corretamente?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "VO2 CARE Fisioterapia": [
    {
      "id": "EQUFIS001",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Dispõe de funcionários habilitados, capacitados, treinados e aptos tecnicamente para atender a demanda?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS002",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprir com todas as leis e demais ordenamentos federais, estaduais e municipais vigentes, incluindo normas emanadas das agências reguladoras (ANS e ANVISA), e dos órgãos de classe.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS003",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada e seus profissionais, cumprem as ordens estabelecidas, horário de trabalho, normas de segurança, regimento interno e outras obrigações estabelecidas pela instituição?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS004",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Nos casos de falta do funcionário, férias, faltas, afastamentos médicos e outros está sendo feita a substituição imediata por outro funcionário?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS005",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's recomendados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS006",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A contratada e seus profissionais prestam um bom atendimento técnico e pessoal aos pacientes e acompanhantes com cordialidade, ética, presteza, assegurando o sigilo das informações?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS007",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos prestadores de serviço está adequada (crachá e jaleco da instituição)?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS008",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais prestadores de serviço seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS009",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS010",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Os indicadores são atualizados dentro do prazo, assegurando o monitoramento dos resultados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS011",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O gestor participa das reuniões de indicadores?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS012",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Estabelece método sistemático do controle dos documentos no GED?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS013",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Promove ações de melhoria para as não conformidades encontradas entre os processos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "EQUFIS014",
      "fornecedor": "VO2 CARE Fisioterapia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Realiza registro em prontuário corretamente?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Bobson Odorizadores": [
    {
      "id": "GOVBOB001",
      "fornecedor": "Bobson Odorizadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprimento dos prazos de acordo com o cronograma coorporativo?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVBOB002",
      "fornecedor": "Bobson Odorizadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados espordicos são atendidos dentro da SLA?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVBOB003",
      "fornecedor": "Bobson Odorizadores",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVBOB004",
      "fornecedor": "Bobson Odorizadores",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVBOB005",
      "fornecedor": "Bobson Odorizadores",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVBOB006",
      "fornecedor": "Bobson Odorizadores",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Foi emitido certificado de realização do serviço?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVBOB007",
      "fornecedor": "Bobson Odorizadores",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperado?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Dunamis Vigilância": [
    {
      "id": "GOVDUN001",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprimento dos prazos de acordo com o cronograma coorporativo?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVDUN002",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados espordicos são atendidos dentro da SLA?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVDUN003",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVDUN004",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVDUN005",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVDUN006",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Foi emitido certificado de realização do serviço?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVDUN007",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN001",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada aloca profissionais devidamente treinados? Com certificados.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN002",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os Vigilantes registram e controlam diariamente as ocorrências do posto, através de livro de ocorrências?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN003",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os vigilantes comunicam imediatamente ao contratante qualquer anormalidade verificada ou acontecimento entendido como irregular e que atente contra seu patrimônio?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN004",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Conhecimento profissional do Vigilantes",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN005",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Habilidades profissionais do Vigilante",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN006",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Capacidade de negociação dos vigilantes.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN007",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Desempenho no atendimento hospitalar",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN008",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Capacidade de informação dos Agentes",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN009",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Distribuição de agentes nos postos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN010",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprimento dos deveres, das Normas, procedimentos e plano de segurança",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN011",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Ética dos vigilantes",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGDUN012",
      "fornecedor": "Dunamis Vigilância",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os vigilantes cumprem a determinação que é expressamente proibida compartilhar informações sobre as atividades do setor?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Wesco Higiene": [
    {
      "id": "GOVGOM001",
      "fornecedor": "Wesco Higiene",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprimento dos prazos de acordo com o cronograma coorporativo?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVGOM002",
      "fornecedor": "Wesco Higiene",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados espordicos são atendidos dentro da SLA?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVGOM003",
      "fornecedor": "Wesco Higiene",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVGOM004",
      "fornecedor": "Wesco Higiene",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVGOM005",
      "fornecedor": "Wesco Higiene",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVGOM006",
      "fornecedor": "Wesco Higiene",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Foi emitido certificado de realização do serviço?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVGOM007",
      "fornecedor": "Wesco Higiene",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperado?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "HPX Lavanderia Hospitalar": [
    {
      "id": "GOVHPX001",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "As ordens de licenças, alvarás, certidões e autorizações estão em dia para cumprimento de suas atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX002",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A roupa suja esta sendo pesada e conferida pelo contratante, a contratada deverá considerar o peso coletado e retirado nas dependências do hospital.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX003",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Assegura a disponibilização de roupas as áreas em condições de higiene e qualidade.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX004",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Assegura a quantidade e a qualidade da roupa para o atendimento da demanda da organização",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX005",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza a manutenção preventiva e corretiva das instalações e dos equipamentos, incluindo a metrologia legal.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX006",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Estabelece critérios e procedimentos de segurança para o sistema de coleta, separação, distribuição de roupas com base em boas práticas.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX007",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Estabelece plano de contingência.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX008",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Viabiliza a execução dos processos de trabalho ocupacional de forma segura.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX009",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "PPRA e o PCMSO estão atualizados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX010",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme da empresa)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX011",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Seus profissionais prestam um bom atendimento técnico e pessoal ao contratante com cordialidade, ética, presteza e agilidade?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX012",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Cumpre com as determinações do plano de gerenciamento do enxoval.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVHPX013",
      "fornecedor": "HPX Lavanderia Hospitalar",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O Relave está dentro da meta estabelecida pelo Hospital?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Multilixo Remoção de Lixo": [
    {
      "id": "GOVMUL001",
      "fornecedor": "Multilixo Remoção de Lixo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVMUL002",
      "fornecedor": "Multilixo Remoção de Lixo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprimento das coletas conforme contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVMUL003",
      "fornecedor": "Multilixo Remoção de Lixo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Containers em condições de utilização",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVMUL004",
      "fornecedor": "Multilixo Remoção de Lixo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVMUL005",
      "fornecedor": "Multilixo Remoção de Lixo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética e agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVMUL006",
      "fornecedor": "Multilixo Remoção de Lixo",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Foi emitido MTR, CDF e relatóriso de realização do serviço?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVMUL007",
      "fornecedor": "Multilixo Remoção de Lixo",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperando? (Coleta dos resíduos comum, orgânico e reciclável)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Peixoto Paisagismo": [
    {
      "id": "GOVPEI001",
      "fornecedor": "Peixoto Paisagismo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprimento dos prazos de acordo com o cronograma coorporativo?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPEI002",
      "fornecedor": "Peixoto Paisagismo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados esporádicos são atendidos dentro da SLA?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPEI003",
      "fornecedor": "Peixoto Paisagismo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPEI004",
      "fornecedor": "Peixoto Paisagismo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética e agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPEI005",
      "fornecedor": "Peixoto Paisagismo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPEI006",
      "fornecedor": "Peixoto Paisagismo",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Foi emitido certificado de realização do serviço?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPEI007",
      "fornecedor": "Peixoto Paisagismo",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperado?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Praxxis Dedetização": [
    {
      "id": "GOVPRA001",
      "fornecedor": "Praxxis Dedetização",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPRA002",
      "fornecedor": "Praxxis Dedetização",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprimento dos prazos de acordo com o cronograma coorporativo?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPRA003",
      "fornecedor": "Praxxis Dedetização",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados esporádicos são atendidos dentro da SLA?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPRA004",
      "fornecedor": "Praxxis Dedetização",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPRA005",
      "fornecedor": "Praxxis Dedetização",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética e agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPRA006",
      "fornecedor": "Praxxis Dedetização",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPRA007",
      "fornecedor": "Praxxis Dedetização",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Foi emitido certificado de realização do serviço?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVPRA008",
      "fornecedor": "Praxxis Dedetização",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperado?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Souza de Transporte Express": [
    {
      "id": "GOVSOU001",
      "fornecedor": "Souza de Transporte Express",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSOU002",
      "fornecedor": "Souza de Transporte Express",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprimento dos horários de atendimento (Envio da OS com horário de entrega, monitoramento em tempo real, cumprimento do SLA de entrega)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSOU003",
      "fornecedor": "Souza de Transporte Express",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Respaldo da Central de atendimento Souza transportes",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSOU004",
      "fornecedor": "Souza de Transporte Express",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSOU005",
      "fornecedor": "Souza de Transporte Express",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética e agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSOU006",
      "fornecedor": "Souza de Transporte Express",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Estado geral do veículo de transporte (Refrigeração, limpeza, manutenção, vidros sem película)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSOU007",
      "fornecedor": "Souza de Transporte Express",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Envio de relatórios mensais (Quilometragem, gasto de combustível, refrigeração, limpeza dos veículos, protocolos de entrega assinadas)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Studio D Essences / Bobson": [
    {
      "id": "GOVSTÚ001",
      "fornecedor": "Studio D Essences / Bobson",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprimento dos prazos de acordo com o cronograma coorporativo?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSTÚ002",
      "fornecedor": "Studio D Essences / Bobson",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados esporadicos são atendidos dentro da SLA",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSTÚ003",
      "fornecedor": "Studio D Essences / Bobson",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSTÚ004",
      "fornecedor": "Studio D Essences / Bobson",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética e agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSTÚ005",
      "fornecedor": "Studio D Essences / Bobson",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSTÚ006",
      "fornecedor": "Studio D Essences / Bobson",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Foi emitido certificado de realização do serviço?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVSTÚ007",
      "fornecedor": "Studio D Essences / Bobson",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperado?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Vertas Resíduos Tecnológicos": [
    {
      "id": "GOVVER001",
      "fornecedor": "Vertas Resíduos Tecnológicos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVVER002",
      "fornecedor": "Vertas Resíduos Tecnológicos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O funcionamento do Site para solicitações?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVVER003",
      "fornecedor": "Vertas Resíduos Tecnológicos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVVER004",
      "fornecedor": "Vertas Resíduos Tecnológicos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética e agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVVER005",
      "fornecedor": "Vertas Resíduos Tecnológicos",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Foi emitido MTR e certificado de realização do serviço?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "GOVVER006",
      "fornecedor": "Vertas Resíduos Tecnológicos",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperado? (Retirada e destinação correta)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Biomérieux Brasil": [
    {
      "id": "LABBIO001",
      "fornecedor": "Biomérieux Brasil",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competências para exercer suas atividades.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABBIO002",
      "fornecedor": "Biomérieux Brasil",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresentada normas de qualidade e procedimentos internos.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABBIO003",
      "fornecedor": "Biomérieux Brasil",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil\" vigente.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABBIO004",
      "fornecedor": "Biomérieux Brasil",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada. (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABBIO005",
      "fornecedor": "Biomérieux Brasil",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (Boa vontade em atender, educação, cordialidade, ética e agilidade).",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABBIO006",
      "fornecedor": "Biomérieux Brasil",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABBIO007",
      "fornecedor": "Biomérieux Brasil",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: Satisfação dos pacientes pelo serviço prestado está dentro da meta.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABBIO008",
      "fornecedor": "Biomérieux Brasil",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, metas internacionais e outros do programa da qualidade.",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Controllab Qualidade": [
    {
      "id": "LABCON001",
      "fornecedor": "Controllab Qualidade",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Apresentação dos produtos com identificação e preços.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABCON002",
      "fornecedor": "Controllab Qualidade",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Existe plano controle de pragas periódicamente.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABCON003",
      "fornecedor": "Controllab Qualidade",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil\" vigente.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABCON004",
      "fornecedor": "Controllab Qualidade",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Manutenção de produtos dentro do prazo de validade.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABCON005",
      "fornecedor": "Controllab Qualidade",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada. (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABCON006",
      "fornecedor": "Controllab Qualidade",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (Boa vontade em atender, educação, cordialidade, ética e agilidade).",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABCON007",
      "fornecedor": "Controllab Qualidade",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABCON008",
      "fornecedor": "Controllab Qualidade",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: Satisfação dos pacientes pelo serviço prestado está dentro da meta.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABCON009",
      "fornecedor": "Controllab Qualidade",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, metas internacionais e outros do programa da qualidade.",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Eco Diagnóstica": [
    {
      "id": "LABECO001",
      "fornecedor": "Eco Diagnóstica",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competências para exercer suas atividades.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABECO002",
      "fornecedor": "Eco Diagnóstica",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABECO003",
      "fornecedor": "Eco Diagnóstica",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil\" vigente.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABECO004",
      "fornecedor": "Eco Diagnóstica",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABECO005",
      "fornecedor": "Eco Diagnóstica",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (Boa vontade em atender, educação, cordialidade, ética e agilidade).",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABECO006",
      "fornecedor": "Eco Diagnóstica",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABECO007",
      "fornecedor": "Eco Diagnóstica",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: Satisfação dos pacientes pelo serviço prestado está dentro da meta.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABECO008",
      "fornecedor": "Eco Diagnóstica",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, metas internacionais e outros do programa da qualidade.",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Sysmex do Brasil": [
    {
      "id": "LABSYS001",
      "fornecedor": "Sysmex do Brasil",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competências para exercer suas atividades.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABSYS002",
      "fornecedor": "Sysmex do Brasil",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABSYS003",
      "fornecedor": "Sysmex do Brasil",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil\" vigente.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABSYS004",
      "fornecedor": "Sysmex do Brasil",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABSYS005",
      "fornecedor": "Sysmex do Brasil",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (Boa vontade em atender, educação, cordialidade, ética e agilidade).",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABSYS006",
      "fornecedor": "Sysmex do Brasil",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABSYS007",
      "fornecedor": "Sysmex do Brasil",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: Satisfação dos pacientes pelo serviço prestado está dentro da meta.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABSYS008",
      "fornecedor": "Sysmex do Brasil",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, metas internacionais e outros do programa da qualidade.",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Vyttra Diagnósticos": [
    {
      "id": "LABVYT001",
      "fornecedor": "Vyttra Diagnósticos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competências para exercer suas atividades.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABVYT002",
      "fornecedor": "Vyttra Diagnósticos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABVYT003",
      "fornecedor": "Vyttra Diagnósticos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil\" vigente.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABVYT004",
      "fornecedor": "Vyttra Diagnósticos",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABVYT005",
      "fornecedor": "Vyttra Diagnósticos",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (Boa vontade em atender, educação, cordialidade, ética e agilidade).",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABVYT006",
      "fornecedor": "Vyttra Diagnósticos",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABVYT007",
      "fornecedor": "Vyttra Diagnósticos",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: Satisfação dos pacientes pelo serviço prestado está dentro da meta.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABVYT008",
      "fornecedor": "Vyttra Diagnósticos",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, metas internacionais e outros do programa da qualidade.",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Werfen Medical": [
    {
      "id": "LABWER001",
      "fornecedor": "Werfen Medical",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competências para exercer suas atividades.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABWER002",
      "fornecedor": "Werfen Medical",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABWER003",
      "fornecedor": "Werfen Medical",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil\" vigente.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABWER004",
      "fornecedor": "Werfen Medical",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABWER005",
      "fornecedor": "Werfen Medical",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores atendem aos aspectos comportamentais esperados (Boa vontade em atender, educação, cordialidade, ética e agilidade).",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABWER006",
      "fornecedor": "Werfen Medical",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABWER007",
      "fornecedor": "Werfen Medical",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: Satisfação dos pacientes pelo serviço prestado está dentro da meta.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "LABWER008",
      "fornecedor": "Werfen Medical",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, metas internacionais e outros do programa da qualidade.",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "B3B": [
    {
      "id": "MANB3B001",
      "fornecedor": "B3B",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANB3B002",
      "fornecedor": "B3B",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANB3B003",
      "fornecedor": "B3B",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANB3B004",
      "fornecedor": "B3B",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANB3B005",
      "fornecedor": "B3B",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANB3B006",
      "fornecedor": "B3B",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANB3B007",
      "fornecedor": "B3B",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANB3B008",
      "fornecedor": "B3B",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANB3B009",
      "fornecedor": "B3B",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Engepower Subestação": [
    {
      "id": "MANGE001",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANGE002",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANGE003",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANGE004",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANGE005",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANGE006",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANGE007",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANGE008",
      "fornecedor": "Engepower Subestação",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANGE009",
      "fornecedor": "Engepower Subestação",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANENG001",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANENG002",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANENG003",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANENG004",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANENG005",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANENG006",
      "fornecedor": "Engepower Subestação",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANENG009",
      "fornecedor": "Engepower Subestação",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Wm Aerocom Pneumático": [
    {
      "id": "MANWM001",
      "fornecedor": "Wm Aerocom Pneumático",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWM002",
      "fornecedor": "Wm Aerocom Pneumático",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWM003",
      "fornecedor": "Wm Aerocom Pneumático",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWM004",
      "fornecedor": "Wm Aerocom Pneumático",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWM005",
      "fornecedor": "Wm Aerocom Pneumático",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWM006",
      "fornecedor": "Wm Aerocom Pneumático",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWM007",
      "fornecedor": "Wm Aerocom Pneumático",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWM009",
      "fornecedor": "Wm Aerocom Pneumático",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Air Liquide Gases": [
    {
      "id": "MANAIR001",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada realiza assitência técnica preventiva mensalmente no recipiente criogênico?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR002",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Ao final de cada visita do técnico é entregue um relatório de assitência técnica, o qual descreve o serviço solicitado, o serviço executado, peças trocadas e/ou substiuição de componentes?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR003",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os defeitos porventura existentes nas instações e/ou equipamentos são sanados em tempo hábil?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR004",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O abastecimento dos gases é realizado em tempo hábil para atende as necessidades do hospital?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR005",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os colaboradores da contratada somente realizam serviços nas dependências do hospital com conhecimento e supervisão da equipe de manutenção do hospital?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR006",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O abastecimento dos gases medicinais é realizado seguindo as normas de segurança? (verificar se no momento do abastecimento não há vazamento de gás)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR007",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada disponibilizou o Plano de Atendimento às Emergências de Gases Medicinais?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR008",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's adequados no abastecimento e na manutenção do cilindro?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR009",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR010",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentaçao dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR011",
      "fornecedor": "Air Liquide Gases",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANAIR013",
      "fornecedor": "Air Liquide Gases",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Atlas Schindler Elevadores": [
    {
      "id": "MANATL001",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza inspeção dos elevadores 1 (uma) vêz por mês?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL002",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza regulagem e ajuste das partes mecânicas e elétricas conforme acordado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL003",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza limpeza e lubrificação dos elevadores em todas as partes mecânicas e elétricas?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL004",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Fornece graxa, óleo e estopa necessárias para a limpeza e lubrificação dos itens anteriores?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL005",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza testes de seguança?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL006",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Presta suporte e presteza quando acionado suporte conforme horário acordado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL007",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Conserta ou substitui, independete do prévio orçamento, pequenas peças como parafusos, molas,",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL008",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza troca de cabos de tração, cabos de comando, enrolamento de motores e outras peças de valor",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL009",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's recomendados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL010",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL011",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL013",
      "fornecedor": "Atlas Schindler Elevadores",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Atlas Schindler Escada Rolante": [
    {
      "id": "MANATL001",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza inspeção dos elevadores 1 (uma) vêz por mês?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL002",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza regulagem e ajuste das partes mecânicas e elétricas conforme acordado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL003",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza limpeza e lubrificação dos elevadores em todas as partes mecânicas e elétricas?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL004",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Fornece graxa, óleo e estopa necessárias para a limpeza e lubrificação dos itens anteriores?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL005",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza testes de seguança?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL006",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Presta suporte e presteza quando acionado suporte conforme horário acordado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL007",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Conserta ou substitui, independete do prévio orçamento, pequenas peças como parafusos, molas,",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL008",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza troca de cabos de tração, cabos de comando, enrolamento de motores e outras peças de valor",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL009",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's recomendados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL010",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL011",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANATL013",
      "fornecedor": "Atlas Schindler Escada Rolante",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "RDI Bender IT Médico": [
    {
      "id": "MANBEN001",
      "fornecedor": "RDI Bender IT Médico",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBEN002",
      "fornecedor": "RDI Bender IT Médico",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBEN003",
      "fornecedor": "RDI Bender IT Médico",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBEN004",
      "fornecedor": "RDI Bender IT Médico",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBEN005",
      "fornecedor": "RDI Bender IT Médico",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBEN006",
      "fornecedor": "RDI Bender IT Médico",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBEN007",
      "fornecedor": "RDI Bender IT Médico",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBEN009",
      "fornecedor": "RDI Bender IT Médico",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Bra Clima": [
    {
      "id": "MANBRA001",
      "fornecedor": "Bra Clima",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBRA002",
      "fornecedor": "Bra Clima",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBRA003",
      "fornecedor": "Bra Clima",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBRA004",
      "fornecedor": "Bra Clima",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBRA005",
      "fornecedor": "Bra Clima",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBRA006",
      "fornecedor": "Bra Clima",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBRA007",
      "fornecedor": "Bra Clima",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANBRA009",
      "fornecedor": "Bra Clima",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "CCL Capelas": [
    {
      "id": "MANCCL001",
      "fornecedor": "CCL Capelas",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCCL002",
      "fornecedor": "CCL Capelas",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCCL003",
      "fornecedor": "CCL Capelas",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCCL004",
      "fornecedor": "CCL Capelas",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCCL005",
      "fornecedor": "CCL Capelas",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCCL006",
      "fornecedor": "CCL Capelas",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCCL007",
      "fornecedor": "CCL Capelas",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCCL009",
      "fornecedor": "CCL Capelas",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Chama Industria": [
    {
      "id": "MANCHA001",
      "fornecedor": "Chama Industria",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCHA002",
      "fornecedor": "Chama Industria",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCHA003",
      "fornecedor": "Chama Industria",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCHA004",
      "fornecedor": "Chama Industria",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCHA005",
      "fornecedor": "Chama Industria",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCHA006",
      "fornecedor": "Chama Industria",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCHA007",
      "fornecedor": "Chama Industria",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCHA009",
      "fornecedor": "Chama Industria",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "WTC Tratamento Água": [
    {
      "id": "MANWTC001",
      "fornecedor": "WTC Tratamento Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWTC002",
      "fornecedor": "WTC Tratamento Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWTC003",
      "fornecedor": "WTC Tratamento Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWTC004",
      "fornecedor": "WTC Tratamento Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWTC005",
      "fornecedor": "WTC Tratamento Água",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWTC006",
      "fornecedor": "WTC Tratamento Água",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWTC007",
      "fornecedor": "WTC Tratamento Água",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANWTC009",
      "fornecedor": "WTC Tratamento Água",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "COMERCIAL COMPOSTO": [
    {
      "id": "MANCOM001",
      "fornecedor": "COMERCIAL COMPOSTO",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCOM002",
      "fornecedor": "COMERCIAL COMPOSTO",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCOM003",
      "fornecedor": "COMERCIAL COMPOSTO",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCOM004",
      "fornecedor": "COMERCIAL COMPOSTO",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCOM005",
      "fornecedor": "COMERCIAL COMPOSTO",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCOM006",
      "fornecedor": "COMERCIAL COMPOSTO",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCOM007",
      "fornecedor": "COMERCIAL COMPOSTO",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCOM009",
      "fornecedor": "COMERCIAL COMPOSTO",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Controlbio Análise de Água": [
    {
      "id": "MANCON001",
      "fornecedor": "Controlbio Análise de Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON002",
      "fornecedor": "Controlbio Análise de Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON003",
      "fornecedor": "Controlbio Análise de Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON004",
      "fornecedor": "Controlbio Análise de Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON005",
      "fornecedor": "Controlbio Análise de Água",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON006",
      "fornecedor": "Controlbio Análise de Água",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON007",
      "fornecedor": "Controlbio Análise de Água",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON009",
      "fornecedor": "Controlbio Análise de Água",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Controller Smart Automação": [
    {
      "id": "MANCON001",
      "fornecedor": "Controller Smart Automação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro para sinistro de roubo, furto, incêndio e colisão de veículo vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON002",
      "fornecedor": "Controller Smart Automação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil Garagista\" vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON003",
      "fornecedor": "Controller Smart Automação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "É responsável pelo pagamento das multas aplicadas pelas autoridades competentes?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON004",
      "fornecedor": "Controller Smart Automação",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON005",
      "fornecedor": "Controller Smart Automação",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON006",
      "fornecedor": "Controller Smart Automação",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON007",
      "fornecedor": "Controller Smart Automação",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuiem para a segurança e higiene do local?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON008",
      "fornecedor": "Controller Smart Automação",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANCON009",
      "fornecedor": "Controller Smart Automação",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Planilha3": [
    {
      "id": "MANPLA001",
      "fornecedor": "Planilha3",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro para sinistro de roubo, furto, incêndio e colisão de veículo vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANPLA002",
      "fornecedor": "Planilha3",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil Garagista\" vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANPLA003",
      "fornecedor": "Planilha3",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "É responsável pelo pagamento das multas aplicadas pelas autoridades competentes?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANPLA004",
      "fornecedor": "Planilha3",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANPLA005",
      "fornecedor": "Planilha3",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANPLA006",
      "fornecedor": "Planilha3",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANPLA007",
      "fornecedor": "Planilha3",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuiem para a segurança e higiene do local?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANPLA008",
      "fornecedor": "Planilha3",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANPLA009",
      "fornecedor": "Planilha3",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Evolutix": [
    {
      "id": "MANEVO001",
      "fornecedor": "Evolutix",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANEVO002",
      "fornecedor": "Evolutix",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANEVO003",
      "fornecedor": "Evolutix",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANEVO004",
      "fornecedor": "Evolutix",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANEVO005",
      "fornecedor": "Evolutix",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANEVO006",
      "fornecedor": "Evolutix",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANEVO007",
      "fornecedor": "Evolutix",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANEVO009",
      "fornecedor": "Evolutix",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Manusa Portas Automáticas": [
    {
      "id": "MANMAN001",
      "fornecedor": "Manusa Portas Automáticas",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMAN002",
      "fornecedor": "Manusa Portas Automáticas",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMAN003",
      "fornecedor": "Manusa Portas Automáticas",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMAN004",
      "fornecedor": "Manusa Portas Automáticas",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMAN005",
      "fornecedor": "Manusa Portas Automáticas",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMAN006",
      "fornecedor": "Manusa Portas Automáticas",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMAN007",
      "fornecedor": "Manusa Portas Automáticas",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMAN009",
      "fornecedor": "Manusa Portas Automáticas",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Microambiental Água": [
    {
      "id": "MANMIC001",
      "fornecedor": "Microambiental Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMIC002",
      "fornecedor": "Microambiental Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMIC003",
      "fornecedor": "Microambiental Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMIC004",
      "fornecedor": "Microambiental Água",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMIC005",
      "fornecedor": "Microambiental Água",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMIC006",
      "fornecedor": "Microambiental Água",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMIC007",
      "fornecedor": "Microambiental Água",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANMIC009",
      "fornecedor": "Microambiental Água",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Net TV a Cabo": [
    {
      "id": "MANNET001",
      "fornecedor": "Net TV a Cabo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNET002",
      "fornecedor": "Net TV a Cabo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNET003",
      "fornecedor": "Net TV a Cabo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNET004",
      "fornecedor": "Net TV a Cabo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNET005",
      "fornecedor": "Net TV a Cabo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNET006",
      "fornecedor": "Net TV a Cabo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNET007",
      "fornecedor": "Net TV a Cabo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNET009",
      "fornecedor": "Net TV a Cabo",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Nobreak Quality": [
    {
      "id": "MANNOB001",
      "fornecedor": "Nobreak Quality",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNOB002",
      "fornecedor": "Nobreak Quality",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNOB003",
      "fornecedor": "Nobreak Quality",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNOB004",
      "fornecedor": "Nobreak Quality",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNOB005",
      "fornecedor": "Nobreak Quality",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNOB006",
      "fornecedor": "Nobreak Quality",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNOB007",
      "fornecedor": "Nobreak Quality",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANNOB009",
      "fornecedor": "Nobreak Quality",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "SOS Portas Corta Fogo": [
    {
      "id": "MANSOS001",
      "fornecedor": "SOS Portas Corta Fogo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANSOS002",
      "fornecedor": "SOS Portas Corta Fogo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANSOS003",
      "fornecedor": "SOS Portas Corta Fogo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANSOS004",
      "fornecedor": "SOS Portas Corta Fogo",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANSOS005",
      "fornecedor": "SOS Portas Corta Fogo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANSOS006",
      "fornecedor": "SOS Portas Corta Fogo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANSOS007",
      "fornecedor": "SOS Portas Corta Fogo",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANSOS009",
      "fornecedor": "SOS Portas Corta Fogo",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "KPM Ar-condicionado PMOC": [
    {
      "id": "MANKPM001",
      "fornecedor": "KPM Ar-condicionado PMOC",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Plano de manutenção, operação e controle (PMOC) esta disponível? (conforme norma NBR 13971(1997)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANKPM002",
      "fornecedor": "KPM Ar-condicionado PMOC",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os serviços são realizados de acordo com o cronograma estabelecido no PMOC?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANKPM003",
      "fornecedor": "KPM Ar-condicionado PMOC",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Colaborador tem disponível todos os equipamentos especializados para execução adequada dos serviços?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANKPM004",
      "fornecedor": "KPM Ar-condicionado PMOC",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's recomendados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANKPM005",
      "fornecedor": "KPM Ar-condicionado PMOC",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANKPM006",
      "fornecedor": "KPM Ar-condicionado PMOC",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANKPM007",
      "fornecedor": "KPM Ar-condicionado PMOC",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANKPM008",
      "fornecedor": "KPM Ar-condicionado PMOC",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Existe evidência da realização do serviço no equipamento?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANKPM009",
      "fornecedor": "KPM Ar-condicionado PMOC",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperado? (relatório de avaliação da qualidade do ar climatizado)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANKPM010",
      "fornecedor": "KPM Ar-condicionado PMOC",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Youcast": [
    {
      "id": "MANYOU001",
      "fornecedor": "Youcast",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANYOU002",
      "fornecedor": "Youcast",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANYOU003",
      "fornecedor": "Youcast",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANYOU004",
      "fornecedor": "Youcast",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANYOU005",
      "fornecedor": "Youcast",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANYOU006",
      "fornecedor": "Youcast",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANYOU007",
      "fornecedor": "Youcast",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANYOU009",
      "fornecedor": "Youcast",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "DAIKIN": [
    {
      "id": "MANDAI001",
      "fornecedor": "DAIKIN",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os representantes da empresa, usam os EPI's adequadamente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANDAI002",
      "fornecedor": "DAIKIN",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Serviço prestado cumpre o que esta no escopo contratado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANDAI003",
      "fornecedor": "DAIKIN",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O Cronograma de manutenção é seguido?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANDAI004",
      "fornecedor": "DAIKIN",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os chamados emergenciais são atendidos no prazo acorado no contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANDAI005",
      "fornecedor": "DAIKIN",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os profissionais seguem a norma da instituição quanto ao uso de adornos?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANDAI006",
      "fornecedor": "DAIKIN",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANDAI007",
      "fornecedor": "DAIKIN",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANDAI009",
      "fornecedor": "DAIKIN",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Thyssem TKE Elevadores": [
    {
      "id": "MANTHY001",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza inspeção dos elevadores 1 (uma) vêz por mês?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY002",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza regulagem e ajuste das partes mecânicas e elétricas conforme acordado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY003",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza limpeza e lubrificação dos elevadores em todas as partes mecânicas e elétricas?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY004",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Fornece graxa, óleo e estopa necessárias para a limpeza e lubrificação dos itens anteriores?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY005",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza testes de seguança?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY006",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Presta suporte e presteza quando acionado suporte conforme horário acordado?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY007",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Conserta ou substitui, independete do prévio orçamento, pequenas peças como parafusos, molas,",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY008",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Realiza troca de cabos de tração, cabos de comando, enrolamento de motores e outras peças de valor",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY009",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os profissionais utilizam os EPI's recomendados?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY010",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY011",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MANTHY013",
      "fornecedor": "Thyssem TKE Elevadores",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "A contratada realiza treinamento para a equipe de manutenção do hospital quando solicitado? ( Cronograma do hospital, sugerido semestralmente)",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "RPH Radiofarmácia": [
    {
      "id": "MEDRPH001",
      "fornecedor": "RPH Radiofarmácia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDRPH002",
      "fornecedor": "RPH Radiofarmácia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDRPH003",
      "fornecedor": "RPH Radiofarmácia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDRPH004",
      "fornecedor": "RPH Radiofarmácia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDRPH005",
      "fornecedor": "RPH Radiofarmácia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDRPH006",
      "fornecedor": "RPH Radiofarmácia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDRPH007",
      "fornecedor": "RPH Radiofarmácia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDRPH008",
      "fornecedor": "RPH Radiofarmácia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDRPH009",
      "fornecedor": "RPH Radiofarmácia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Eckert & Ziegler": [
    {
      "id": "MEDECK001",
      "fornecedor": "Eckert & Ziegler",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDECK002",
      "fornecedor": "Eckert & Ziegler",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDECK003",
      "fornecedor": "Eckert & Ziegler",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDECK004",
      "fornecedor": "Eckert & Ziegler",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDECK005",
      "fornecedor": "Eckert & Ziegler",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDECK006",
      "fornecedor": "Eckert & Ziegler",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDECK007",
      "fornecedor": "Eckert & Ziegler",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDECK008",
      "fornecedor": "Eckert & Ziegler",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDECK009",
      "fornecedor": "Eckert & Ziegler",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "IPEN Radiofármacos": [
    {
      "id": "MEDIPE001",
      "fornecedor": "IPEN Radiofármacos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDIPE002",
      "fornecedor": "IPEN Radiofármacos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDIPE003",
      "fornecedor": "IPEN Radiofármacos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDIPE004",
      "fornecedor": "IPEN Radiofármacos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDIPE005",
      "fornecedor": "IPEN Radiofármacos",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDIPE006",
      "fornecedor": "IPEN Radiofármacos",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDIPE007",
      "fornecedor": "IPEN Radiofármacos",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDIPE008",
      "fornecedor": "IPEN Radiofármacos",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDIPE009",
      "fornecedor": "IPEN Radiofármacos",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "IBF Farmoquímicos": [
    {
      "id": "MEDR2001",
      "fornecedor": "IBF Farmoquímicos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDR2002",
      "fornecedor": "IBF Farmoquímicos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDR2003",
      "fornecedor": "IBF Farmoquímicos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDR2004",
      "fornecedor": "IBF Farmoquímicos",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDR2005",
      "fornecedor": "IBF Farmoquímicos",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDR2006",
      "fornecedor": "IBF Farmoquímicos",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDR2007",
      "fornecedor": "IBF Farmoquímicos",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDR2008",
      "fornecedor": "IBF Farmoquímicos",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDR2009",
      "fornecedor": "IBF Farmoquímicos",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Cyclobras Laboratoriais": [
    {
      "id": "MEDCYC001",
      "fornecedor": "Cyclobras Laboratoriais",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O prestador comprova competencias para exercer as atividades?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDCYC002",
      "fornecedor": "Cyclobras Laboratoriais",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa apresenta normas de qualidade e procedimentos internos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDCYC003",
      "fornecedor": "Cyclobras Laboratoriais",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apolice de seguro de responsabilidades civil vigente",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDCYC004",
      "fornecedor": "Cyclobras Laboratoriais",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDCYC005",
      "fornecedor": "Cyclobras Laboratoriais",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDCYC006",
      "fornecedor": "Cyclobras Laboratoriais",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDCYC007",
      "fornecedor": "Cyclobras Laboratoriais",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDCYC008",
      "fornecedor": "Cyclobras Laboratoriais",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "MEDCYC009",
      "fornecedor": "Cyclobras Laboratoriais",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Melco Equipamentos Cozinha": [
    {
      "id": "NUTMEL001",
      "fornecedor": "Melco Equipamentos Cozinha",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro para sinistro de roubo, furto, incêndio e colisão de veículo vigente ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTMEL002",
      "fornecedor": "Melco Equipamentos Cozinha",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil Garagista\" vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTMEL003",
      "fornecedor": "Melco Equipamentos Cozinha",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "É responsável pelo pagamento das multas aplicadas pelas autoridades competentes?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTMEL004",
      "fornecedor": "Melco Equipamentos Cozinha",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTMEL005",
      "fornecedor": "Melco Equipamentos Cozinha",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTMEL006",
      "fornecedor": "Melco Equipamentos Cozinha",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTMEL007",
      "fornecedor": "Melco Equipamentos Cozinha",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTMEL008",
      "fornecedor": "Melco Equipamentos Cozinha",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação do setor pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTMEL009",
      "fornecedor": "Melco Equipamentos Cozinha",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Sisnacmed Burlodge": [
    {
      "id": "NUTSIS001",
      "fornecedor": "Sisnacmed Burlodge",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro para sinistro de roubo, furto, incêndio e colisão de veículo vigente ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTSIS002",
      "fornecedor": "Sisnacmed Burlodge",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil Garagista\" vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTSIS003",
      "fornecedor": "Sisnacmed Burlodge",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "É responsável pelo pagamento das multas aplicadas pelas autoridades competentes?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTSIS004",
      "fornecedor": "Sisnacmed Burlodge",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTSIS005",
      "fornecedor": "Sisnacmed Burlodge",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTSIS006",
      "fornecedor": "Sisnacmed Burlodge",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTSIS007",
      "fornecedor": "Sisnacmed Burlodge",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTSIS008",
      "fornecedor": "Sisnacmed Burlodge",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação do setor pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTSIS009",
      "fornecedor": "Sisnacmed Burlodge",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Prime Frio Refrigeração": [
    {
      "id": "NUTPRI001",
      "fornecedor": "Prime Frio Refrigeração",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro para sinistro de roubo, furto, incêndio e colisão de veículo vigente ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTPRI002",
      "fornecedor": "Prime Frio Refrigeração",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil Garagista\" vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTPRI003",
      "fornecedor": "Prime Frio Refrigeração",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "É responsável pelo pagamento das multas aplicadas pelas autoridades competentes?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTPRI004",
      "fornecedor": "Prime Frio Refrigeração",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTPRI005",
      "fornecedor": "Prime Frio Refrigeração",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTPRI006",
      "fornecedor": "Prime Frio Refrigeração",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTPRI007",
      "fornecedor": "Prime Frio Refrigeração",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTPRI008",
      "fornecedor": "Prime Frio Refrigeração",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação do setor pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTPRI009",
      "fornecedor": "Prime Frio Refrigeração",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "GPS": [
    {
      "id": "NUTGPS001",
      "fornecedor": "GPS",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro para sinistro de roubo, furto, incêndio e colisão de veículo vigente ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTGPS002",
      "fornecedor": "GPS",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil Garagista\" vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTGPS003",
      "fornecedor": "GPS",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "É responsável pelo pagamento das multas aplicadas pelas autoridades competentes?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTGPS004",
      "fornecedor": "GPS",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTGPS005",
      "fornecedor": "GPS",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTGPS006",
      "fornecedor": "GPS",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTGPS007",
      "fornecedor": "GPS",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTGPS008",
      "fornecedor": "GPS",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação do setor pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTGPS009",
      "fornecedor": "GPS",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "RE7 GASTRONOMIA LTDA": [
    {
      "id": "NUTRE7001",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro para sinistro de roubo, furto, incêndio e colisão de veículo vigente ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7002",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil Garagista\" vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7003",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "É responsável pelo pagamento das multas aplicadas pelas autoridades competentes?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7004",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7005",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7006",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7007",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7008",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7009",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7011",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Satisfação dos pacientes pelo serviço prestado",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7012",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Qualidade/segurança da refeição produzida",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTRE7013",
      "fornecedor": "RE7 GASTRONOMIA LTDA",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Número de colaboradores de acordo com contrato/Postura de colaborador",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Roland Villard Gastronomia": [
    {
      "id": "NUTROL001",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro para sinistro de roubo, furto, incêndio e colisão de veículo vigente ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTROL002",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil Garagista\" vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTROL003",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "É responsável pelo pagamento das multas aplicadas pelas autoridades competentes?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTROL004",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTROL005",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTROL006",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTROL007",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTROL008",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTROL009",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTROL011",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Participação dos treinamentos institucionais",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTROL012",
      "fornecedor": "Roland Villard Gastronomia",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Adequação de fluxos e processos para garatntir qualidade e segurança das refeições servidas",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Nestle Nespresso": [
    {
      "id": "NUTNES001",
      "fornecedor": "Nestle Nespresso",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro para sinistro de roubo, furto, incêndio e colisão de veículo vigente ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTNES002",
      "fornecedor": "Nestle Nespresso",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Há apólice de seguro de \"Responsabilidade Civil Garagista\" vigente?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTNES003",
      "fornecedor": "Nestle Nespresso",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "É responsável pelo pagamento das multas aplicadas pelas autoridades competentes?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTNES004",
      "fornecedor": "Nestle Nespresso",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "O número de profissionais esta de acordo com o contrato?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTNES005",
      "fornecedor": "Nestle Nespresso",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTNES006",
      "fornecedor": "Nestle Nespresso",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTNES007",
      "fornecedor": "Nestle Nespresso",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTNES008",
      "fornecedor": "Nestle Nespresso",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "NUTNES009",
      "fornecedor": "Nestle Nespresso",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, SBV, Metas internacionais e outros do programa da qualidade?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Fermar Fire Segurança": [
    {
      "id": "SESFER001",
      "fornecedor": "Fermar Fire Segurança",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Apresentação dos produtos com identificação preços e caracteristicas.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SESFER002",
      "fornecedor": "Fermar Fire Segurança",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Apresentação e identificação visual segue os critérios da Fermar Fire LTDA.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SESFER003",
      "fornecedor": "Fermar Fire Segurança",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A empresa segue as normas e procedimentos de direito do consumidor.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SESFER004",
      "fornecedor": "Fermar Fire Segurança",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (Crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SESFER005",
      "fornecedor": "Fermar Fire Segurança",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SESFER006",
      "fornecedor": "Fermar Fire Segurança",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuiem para a segurança e higiene do local.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SESFER007",
      "fornecedor": "Fermar Fire Segurança",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SESFER008",
      "fornecedor": "Fermar Fire Segurança",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Colaboradores participam dos treinamentos, como integração, metas internacionais e outros do progremama da qualidade.",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Systempower CFTV": [
    {
      "id": "SEGSYS001",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada aloca profissionais devidamente treinados? Com certificados.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS002",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores registram e controlam diariamente as ocorrências do posto, através de livro de ocorrências?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS003",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores comunicam imediatamente ao contratante qualquer anormalidade verificada ou acontecimento entendido como irregular e que atente contra seu patrimônio?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS004",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores de monitoramento observam a movimentação de indivíduos suspeitos através das câmeras de segurança, adotando as medidas de segurança conforme orientação recebida?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS005",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores de monitoramento realizam check list nos equipamentos com a finalidade de garantir o perfeito funcionamento do sistema?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS006",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores somente permitem o acesso a sala de CSS (Central de Supervisão de Segurança) de pessoas devidamente autorizadas?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS007",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores de monitoramento se certificam que todas as pessoas que adentrem a CSS deixem os aparelhos de celular na banca destina para este fim?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS008",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores realizam rondas eletrônicas periódicas nos setores garantindo que todas as câmeras estejam desobstruídas?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS009",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores registram em planilhas especificas as ocorrências identificadas através das câmeras de seguranca?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS010",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores de monitoramento realizam buscas de imagens somente com autorização da sua chefia imediata?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS011",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores de monitoramento dão suporte remoto conforme orientações recebidas para a equipe em campo (segurança/bombeiros)?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS012",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os operadores de monitoramento cumprem a determinação que é expressamente proibida compartilhar informações sobre as atividades/imagens do setor?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS013",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS014",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS015",
      "fornecedor": "Systempower CFTV",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS016",
      "fornecedor": "Systempower CFTV",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Foi emitido certificado de realização do serviço?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGSYS017",
      "fornecedor": "Systempower CFTV",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperado?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ],
  "Engeradios Telecomunicações": [
    {
      "id": "SEGENG001",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "A contratada aloca profissionais devidamente treinados? Com certificados.",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG002",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "OS TÉCNICOS registram e controlam as manutenções preventivas/ocorrências nos equipamentos, através de livro de ocorrências disponível na CSS?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG003",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os TÉCNICOS comunicam imediatamente ao contratante qualquer anormalidade verificada ou acontecimento entendido como irregular e que atente contra seu patrimônio?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG004",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Conhecimento do profissional TÉCNICO",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG005",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Habilidades profissionais dos TÉCNICOS",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG006",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Capacidade de negociação dos TÉCNICOS",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG007",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Desempenho no atendimento hospitalar",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG008",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Capacidade de Informação dos TÉCNICOS",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG009",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Distribuição de Agentes nos postos",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG010",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Cumprimento dos deveres, das Normas, procedimentos e Plano de Segurança",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG011",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Ética dos TÉCNICOS",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG012",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS LEGAIS",
      "pergunta": "Os TÉCNICOS cumprem a determinação que é expressamente proibida compartilhar informações sobre as atividades do setor?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG013",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "A apresentação dos colaboradores está adequada? (crachá e uniforme)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG014",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores  atendem aos aspectos comportamentais esperados (boa vontade em atender, educação, cordialidade, ética, agilidade)",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG015",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "ASPECTOS COMPORTAMENTAIS",
      "pergunta": "Os colaboradores contribuem para a segurança e higiene do local ?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG016",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "Foi emitido certificado de realização do serviço?",
      "obrigatoria": true,
      "peso": 1.0
    },
    {
      "id": "SEGENG017",
      "fornecedor": "Engeradios Telecomunicações",
      "categoria": "PROGRAMA QUALIDADE E SEGURANÇA",
      "pergunta": "O serviço realizado obteve o resultado esperado?",
      "obrigatoria": true,
      "peso": 1.0
    }
  ]
};
