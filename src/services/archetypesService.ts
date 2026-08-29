export interface EvaluationCriterion {
  id: string;
  pergunta: string;
  bloco: 'LEGAL' | 'COMPORTAMENTAL' | 'QUALIDADE';
}

export type ArchetypeType = 
  | 'ARQUETIPO_1_EQUIPAMENTO_MEDICO'
  | 'ARQUETIPO_1B_REAGENTES_LABORATORIO'
  | 'ARQUETIPO_2_MANUTENCAO_PREDIAL'
  | 'ARQUETIPO_3_ESTACIONAMENTO_FROTA'
  | 'ARQUETIPO_4_ELEVADORES'
  | 'ARQUETIPO_5_GASES_MEDICINAIS'
  | 'ARQUETIPO_6_CLIMATIZACAO_PMOC'
  | 'ARQUETIPO_7_MAO_DE_OBRA_CLINICA'
  | 'ARQUETIPO_8_VIGILANCIA_SEGURANCA'
  | 'ARQUETIPO_9_RESPONSABILIDADE_TECNICA_HEMODIALISE'
  | 'ARQUETIPO_10_SERVICO_AGENDADO_SLA';

export class ArchetypesService {
  /**
   * Determina o arquétipo do fornecedor com base no setor e categoria do serviço.
   */
  static detectArchetype(sectorId: string, categoriaServico: string): ArchetypeType {
    const cat = categoriaServico.toLowerCase();

    // 1. Elevadores
    if (cat.includes('elevador') || cat.includes('escada rolante')) {
      return 'ARQUETIPO_4_ELEVADORES';
    }

    // 2. Gases Medicinais
    if (cat.includes('gases medicinais') || cat.includes('criogênic')) {
      return 'ARQUETIPO_5_GASES_MEDICINAIS';
    }

    // 3. PMOC Ar Condicionado
    if (cat.includes('pmoc') || cat.includes('climatização')) {
      return 'ARQUETIPO_6_CLIMATIZACAO_PMOC';
    }

    // 4. Estacionamento / Valet
    if (cat.includes('estacionamento') || cat.includes('valet')) {
      return 'ARQUETIPO_3_ESTACIONAMENTO_FROTA';
    }

    // 5. Vigilância / Segurança
    if (sectorId === 'sec_seguranca' || cat.includes('vigilância') || cat.includes('cftv') || cat.includes('rádios')) {
      return 'ARQUETIPO_8_VIGILANCIA_SEGURANCA';
    }

    // 6. Hemodiálise / Responsabilidade Técnica
    if (cat.includes('hemodiálise') || cat.includes('terapia renal') || cat.includes('núcleo técnico')) {
      return 'ARQUETIPO_9_RESPONSABILIDADE_TECNICA_HEMODIALISE';
    }

    // 7. Mão de Obra Clínica / Equipe Multi (Fisioterapia, Psicologia, Fonoaudiologia)
    if (sectorId === 'sec_multi' || cat.includes('fisioterapia') || cat.includes('fonoaudiologia') || cat.includes('psicologia') || cat.includes('assistencial')) {
      return 'ARQUETIPO_7_MAO_DE_OBRA_CLINICA';
    }

    // 8. Reagentes / Laboratório Insumos
    if (sectorId === 'sec_laboratorio' && (cat.includes('reagentes') || cat.includes('kits') || cat.includes('diagnóstico') || cat.includes('insumos'))) {
      return 'ARQUETIPO_1B_REAGENTES_LABORATORIO';
    }

    // 9. Fabricante / Equipamento Médico Especializado (Engenharia Clínica)
    if (sectorId === 'sec_eng_clinica' || sectorId === 'sec_medicina_nuclear' || cat.includes('manutenção de equipamento') || cat.includes('robótico') || cat.includes('radioterapia') || cat.includes('imagem')) {
      return 'ARQUETIPO_1_EQUIPAMENTO_MEDICO';
    }

    // 10. Serviços Pontuais Agendados (Governança, Dedetização, Lavanderia, Odorização)
    if (cat.includes('dedetização') || cat.includes('pragas') || cat.includes('odorização') || cat.includes('lavanderia') || cat.includes('limpeza predial')) {
      return 'ARQUETIPO_10_SERVICO_AGENDADO_SLA';
    }

    // Padrão: Manutenção Predial / Genérica
    return 'ARQUETIPO_2_MANUTENCAO_PREDIAL';
  }

  /**
   * Retorna os critérios exatos para o bloco de Aspectos Legais de acordo com o Arquétipo.
   */
  static getLegalCriteria(archetype: ArchetypeType): EvaluationCriterion[] {
    switch (archetype) {
      case 'ARQUETIPO_1_EQUIPAMENTO_MEDICO':
        return [
          { id: 'leg_1', pergunta: 'O prestador comprova competências técnicas para exercer as atividades de manutenção do equipamento?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'A empresa apresenta normas de qualidade e procedimentos internos documentados?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'Há apólice de seguro de responsabilidade civil vigente?', bloco: 'LEGAL' },
          { id: 'leg_4', pergunta: 'O número de profissionais destacados está de acordo com o especificado no contrato?', bloco: 'LEGAL' }
        ];

      case 'ARQUETIPO_1B_REAGENTES_LABORATORIO':
        return [
          { id: 'leg_1', pergunta: 'O prestador comprova competências técnicas e autorizações da ANVISA para exercer suas atividades?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'A empresa apresenta normas de qualidade, certificações e procedimentos internos atualizados?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'Há apólice de seguro de Responsabilidade Civil vigente?', bloco: 'LEGAL' }
        ];

      case 'ARQUETIPO_3_ESTACIONAMENTO_FROTA':
        return [
          { id: 'leg_1', pergunta: 'Há apólice de seguro para sinistro de roubo, furto, incêndio e colisão de veículo vigente?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'Há apólice de seguro de Responsabilidade Civil Garagista vigente?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'A empresa assume prontamente a responsabilidade pelo pagamento das multas aplicadas pelas autoridades?', bloco: 'LEGAL' },
          { id: 'leg_4', pergunta: 'O número de manobristas e profissionais em campo está de acordo com o contrato?', bloco: 'LEGAL' }
        ];

      case 'ARQUETIPO_4_ELEVADORES':
        return [
          { id: 'leg_1', pergunta: 'Realiza inspeção preventiva dos elevadores no mínimo 1 (uma) vez por mês?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'Realiza regulagem e ajuste de partes mecânicas e elétricas conforme acordado?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'Realiza limpeza e lubrificação dos elevadores em todas as partes mecânicas/elétricas?', bloco: 'LEGAL' },
          { id: 'leg_4', pergunta: 'Fornece graxa, óleo e insumos necessários para a manutenção preventiva?', bloco: 'LEGAL' },
          { id: 'leg_5', pergunta: 'Realiza testes de segurança normativos com relatórios técnicos?', bloco: 'LEGAL' },
          { id: 'leg_6', pergunta: 'Presta suporte e atendimento emergencial quando acionado no horário estabelecido?', bloco: 'LEGAL' },
          { id: 'leg_7', pergunta: 'Substitui pequenas peças de desgaste sem necessidade de orçamento prévio pendente?', bloco: 'LEGAL' },
          { id: 'leg_8', pergunta: 'Os técnicos utilizam obrigatoriamente os EPIs recomendados durante a manutenção?', bloco: 'LEGAL' }
        ];

      case 'ARQUETIPO_5_GASES_MEDICINAIS':
        return [
          { id: 'leg_1', pergunta: 'A contratada realiza assistência técnica preventiva mensalmente no recipiente criogênico?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'Entrega relatório de assistência técnica assinado ao final de cada visita?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'Defeitos porventura existentes nas instalações ou equipamentos são sanados em tempo hábil?', bloco: 'LEGAL' },
          { id: 'leg_4', pergunta: 'O abastecimento de gases é realizado em tempo hábil para atender a demanda hospitalar?', bloco: 'LEGAL' },
          { id: 'leg_5', pergunta: 'Os colaboradores realizam serviços nas dependências sob supervisão da manutenção?', bloco: 'LEGAL' },
          { id: 'leg_6', pergunta: 'O abastecimento segue rigorosamente as normas de segurança estanqueidade contra vazamento?', bloco: 'LEGAL' },
          { id: 'leg_7', pergunta: 'Disponibilizou o Plano de Atendimento às Emergências de Gases Medicinais atualizado?', bloco: 'LEGAL' },
          { id: 'leg_8', pergunta: 'Os profissionais utilizam os EPIs adequados no abastecimento e na manutenção de cilindros?', bloco: 'LEGAL' }
        ];

      case 'ARQUETIPO_6_CLIMATIZACAO_PMOC':
        return [
          { id: 'leg_1', pergunta: 'O Plano de Manutenção, Operação e Controle (PMOC - NBR 13971) está atualizado e disponível?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'Os serviços de climatização são realizados rigorosamente conforme o cronograma do PMOC?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'A equipe técnica possui todos os equipamentos de medição calibrados para os serviços?', bloco: 'LEGAL' },
          { id: 'leg_4', pergunta: 'Os profissionais utilizam obrigatoriamente os EPIs específicos recomendados?', bloco: 'LEGAL' }
        ];

      case 'ARQUETIPO_7_MAO_DE_OBRA_CLINICA':
        return [
          { id: 'leg_1', pergunta: 'Dispõe de equipe habilitada, capacitada, registrada no órgão de classe e apta tecnicamente?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'Cumpre com ordenamentos federais, estaduais e municipais vigentes (ANS e ANVISA)?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'A equipe cumpre horários, escala de trabalho, normas de segurança e regimento interno do hospital?', bloco: 'LEGAL' },
          { id: 'leg_4', pergunta: 'Realiza substituição imediata de profissionais em casos de faltas, férias ou afastamentos?', bloco: 'LEGAL' },
          { id: 'leg_5', pergunta: 'Os profissionais utilizam obrigatoriamente os EPIs e vestimentas adequadas?', bloco: 'LEGAL' }
        ];

      case 'ARQUETIPO_8_VIGILANCIA_SEGURANCA':
        return [
          { id: 'leg_1', pergunta: 'Aloca profissionais de vigilância devidamente treinados e com certificados da Polícia Federal em dia?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'Os vigilantes/operadores registram diariamente as ocorrências do posto em livro oficial?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'Comunicam imediatamente ao contratante qualquer anormalidade verificada no patrimônio?', bloco: 'LEGAL' },
          { id: 'leg_4', pergunta: 'Demonstram conhecimento profissional, presteza e capacidade de atuação em situações de conflito?', bloco: 'LEGAL' },
          { id: 'leg_5', pergunta: 'Cumprem rigorosamente o plano de segurança, normas internas e regimento do hospital?', bloco: 'LEGAL' },
          { id: 'leg_6', pergunta: 'Mantêm conduta ética e cumprem a proibição expressa de compartilhar informações sigilosas?', bloco: 'LEGAL' }
        ];

      case 'ARQUETIPO_9_RESPONSABILIDADE_TECNICA_HEMODIALISE':
        return [
          { id: 'leg_1', pergunta: 'Se responsabiliza formalmente pela gestão técnica dos serviços e pelos atos dos seus profissionais?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'Disponibiliza com prontidão alvarás sanitários, licenças e certidões dos órgãos competentes?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'Fornece equipamentos, insumos e profissional capacitado para assumir a Responsabilidade Técnica (RT)?', bloco: 'LEGAL' },
          { id: 'leg_4', pergunta: 'Garante atendimento imediato por profissional da equipe em casos de urgência/emergência?', bloco: 'LEGAL' },
          { id: 'leg_5', pergunta: 'Mantém PPRA, PCMSO e documentação de saúde ocupacional dos colaboradores atualizados?', bloco: 'LEGAL' }
        ];

      case 'ARQUETIPO_10_SERVICO_AGENDADO_SLA':
        return [
          { id: 'leg_1', pergunta: 'Cumpre rigorosamente os prazos de atendimento de acordo com o cronograma estabelecido?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'Os chamados esporádicos ou emergenciais são atendidos dentro do limite de SLA acordado?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'Os colaboradores em serviço utilizam os EPIs e uniforme adequados ao trabalho?', bloco: 'LEGAL' }
        ];

      case 'ARQUETIPO_2_MANUTENCAO_PREDIAL':
      default:
        return [
          { id: 'leg_1', pergunta: 'Os representantes e técnicos da empresa utilizam os EPIs adequadamente?', bloco: 'LEGAL' },
          { id: 'leg_2', pergunta: 'O serviço prestado cumpre integralmente o que está previsto no escopo contratado?', bloco: 'LEGAL' },
          { id: 'leg_3', pergunta: 'O cronograma de manutenção preventiva estabelecido é seguido rigorosamente?', bloco: 'LEGAL' },
          { id: 'leg_4', pergunta: 'Os chamados emergenciais e corretivos são atendidos dentro do prazo de SLA acordado?', bloco: 'LEGAL' }
        ];
    }
  }

  /**
   * Retorna os critérios dos Blocos 2 (Comportamental) e 3 (Qualidade) baseados na Família (A ou B).
   */
  static getBehavioralAndQualityCriteria(archetype: ArchetypeType): {
    behavioral: EvaluationCriterion[];
    quality: EvaluationCriterion[];
  } {
    const isClinical = archetype === 'ARQUETIPO_7_MAO_DE_OBRA_CLINICA' || archetype === 'ARQUETIPO_9_RESPONSABILIDADE_TECNICA_HEMODIALISE';

    if (isClinical) {
      // Família B - Mão de Obra Clínica / Assistencial
      return {
        behavioral: [
          { id: 'comp_1', pergunta: 'A contratada e seus profissionais prestam um bom atendimento técnico e pessoal aos pacientes e acompanhantes com cordialidade, ética e presteza, assegurando o sigilo?', bloco: 'COMPORTAMENTAL' },
          { id: 'comp_2', pergunta: 'A apresentação dos prestadores de serviço está adequada (crachá visível e jaleco/uniforme da instituição)?', bloco: 'COMPORTAMENTAL' },
          { id: 'comp_3', pergunta: 'Os profissionais prestadores de serviço seguem a norma da instituição quanto ao uso de adornos zero?', bloco: 'COMPORTAMENTAL' }
        ],
        quality: [
          { id: 'qual_1', pergunta: 'Pesquisa de opinião: satisfação dos pacientes pelo serviço prestado está dentro da meta estipulada?', bloco: 'QUALIDADE' },
          { id: 'qual_2', pergunta: 'Os indicadores de desempenho são atualizados dentro do prazo, assegurando o monitoramento dos resultados?', bloco: 'QUALIDADE' },
          { id: 'qual_3', pergunta: 'O gestor da contratada participa das reuniões de alinhamento de indicadores e qualidade?', bloco: 'QUALIDADE' },
          { id: 'qual_4', pergunta: 'Realiza registro em prontuário eletrônico corretamente e dentro das normas da instituição?', bloco: 'QUALIDADE' },
          { id: 'qual_5', pergunta: 'Promove ações de melhoria e correções para as não conformidades encontradas nos processos?', bloco: 'QUALIDADE' }
        ]
      };
    }

    // Família A - Genérica / Prestador Operacional (Padrão para 95% dos contratos)
    return {
      behavioral: [
        { id: 'comp_1', pergunta: 'Os profissionais seguem a norma da instituição quanto ao uso de adornos no ambiente hospitalar?', bloco: 'COMPORTAMENTAL' },
        { id: 'comp_2', pergunta: 'A apresentação dos colaboradores está adequada (crachá de identificação e uniforme limpo/completo)?', bloco: 'COMPORTAMENTAL' },
        { id: 'comp_3', pergunta: 'Os colaboradores atendem aos aspectos comportamentais esperados (boa vontade, educação, cordialidade, ética e agilidade)?', bloco: 'COMPORTAMENTAL' },
        { id: 'comp_4', pergunta: 'Os colaboradores contribuem ativamente para a segurança e higiene do local de trabalho?', bloco: 'COMPORTAMENTAL' }
      ],
      quality: [
        { id: 'qual_1', pergunta: 'Pesquisa de opinião: a satisfação dos pacientes ou do setor hospitalar com o serviço está dentro da meta?', bloco: 'QUALIDADE' },
        { id: 'qual_2', pergunta: 'Os colaboradores participam dos treinamentos obrigatórios (integração, SBV, Metas Internacionais de Segurança)?', bloco: 'QUALIDADE' },
        { id: 'qual_3', pergunta: 'Os planos de ação das não conformidades identificadas são apresentados e cumpridos nos prazos?', bloco: 'QUALIDADE' }
      ]
    };
  }
}
