# PROMPT MESTRE E ESPECIFICAÇÃO DE REGRAS — HOSPITAL VILA NOVA STAR (REDE D'OR)

Este documento especifica a arquitetura, regras de negócio e padrão de montagem das Avaliações de SLA de Contratos para o **Hospital Vila Nova Star (Rede D'Or)**.

---

## 1. REGRAS CENTRAIS DE AVALIAÇÃO DE CONTRATO (SLA)

### 1.1 Processo 100% Anual ("Anual")
- O ciclo de avaliação é **100% ANUAL** (anos 2026, 2025, 2024).
- Não existem mais divisões semestrais (1º Sem / 2º Sem).

### 1.2 Regra de Pontuação e Cálculo
- Escala de Avaliação: **5 (Ótimo / Sempre / Sim)**, **4 (Bom)**, **3 (Regular / Às vezes)**, **2 (Ruim)**, **1 (Péssimo / Nunca / Não)**, e **NA (Não se Aplica)**.
- **NA (Não se Aplica)** é estritamente **excluído dos divisores matemáticos**.
- Média Geral Anual:
  $$\text{Média Geral} = \frac{\text{Média Legais} + \text{Média Comportamentais} + \text{Média Qualidade}}{\text{Quantidade de Blocos Válidos}}$$
- **Meta de Aprovação**: $\ge 4.00$ (Dentro da Meta).
- **Abaixo da Meta / Crítico**: $< 4.00$ exige **Plano de Ação 5W2H (CAPA)** obrigatório.

---

## 2. REGRAS DOS 10 ARQUÉTIPOS DE SERVIÇO DO HOSPITAL VILA NOVA STAR

O critério de avaliação legal é determinado pelo **Arquétipo de Serviço do Fornecedor** (o que ele efetivamente faz) e não apenas pelo nome do setor.

### 2.1 Famílias de Comportamental e Qualidade
- **Família A (Prestadores Operacionais e Gerais)**: Utilizada em 95% dos contratos (Manutenção, Governança, Segurança, Laboratório, Nutrição, Engenharia Clínica, Medicina Nuclear, SESMT).
  - *Comportamentais*: Uso de adornos zero, Apresentação (crachá e uniforme), Cordialidade/ética/agilidade, Segurança e higiene.
  - *Qualidade*: Pesquisa de satisfação do paciente/setor, Participação em treinamentos institucionais, Acompanhamento de planos de ação.
- **Família B (Mão de Obra Clínica / Assistencial)**: Utilizada em equipes clínicas terceirizadas que registram prontuário e atendem pacientes diretamente (Equipe Multi: Fisioterapia, Psicologia, Fonoaudiologia, Hematologia/Senne Liquor).
  - *Comportamentais*: Atendimento técnico/pessoal aos pacientes com cordialidade/sigilo, Apresentação (crachá/jaleco), Adornos zero.
  - *Qualidade*: Pesquisa de satisfação dos pacientes, Atualização de indicadores no prazo, Participação nas reuniões de indicadores, Registro correto em prontuário eletrônico, Ações de melhoria em não conformidades.

### 2.2 Os 10 Arquétipos Legais
1. **Arquétipo 1 — Fabricante/Equipamento Médico Especializado**: Competências comprovadas, normas de qualidade/procedimentos internos, seguro de responsabilidade civil, dimensionamento de profissionais.
2. **Arquétipo 1B — Reagentes e Insumos de Laboratório**: Competências com ANVISA, normas de qualidade, seguro de responsabilidade civil.
3. **Arquétipo 2 — Manutenção Predial / Múltiplas Especialidades**: Uso obrigatório de EPIs, cumprimento integral do escopo contratado, cronograma de manutenção seguido, atendimento de chamados no prazo de SLA.
4. **Arquétipo 3 — Estacionamento, Valet e Frota**: Seguro contra roubo/furto/incêndio/colisão, Responsabilidade Civil Garagista, pagamento de multas de trânsito, dimensionamento de manobristas.
5. **Arquétipo 4 — Manutenção de Elevadores**: Inspeção mensal preventiva, regulagem de partes mecânicas/elétricas, limpeza/lubrificação, fornecimento de graxa/óleo/estopa, testes de segurança, atendimento emergencial, conserto de pequenas peças sem orçamento prévio, EPIs.
6. **Arquétipo 5 — Gases Medicinais e Criogenia**: Assistência técnica mensal no recipiente criogênico, relatório assinado por visita, defeitos sanados em tempo hábil, abastecimento estanque sem vazamento, Plano de Atendimento a Emergências de Gases, EPIs.
7. **Arquétipo 6 — Climatização PMOC**: PMOC (NBR 13971) atualizado e disponível, cumprimento rigoroso do cronograma do PMOC, equipamentos de medição calibrados, EPIs específicos.
8. **Arquétipo 7 — Mão de Obra Clínica / Assistencial (Equipe Multi)**: Equipe habilitada no conselho de classe, cumprimento de normas da ANS/ANVISA/hospital, escala e regimento, substituição imediata em ausências/férias, EPIs e jaleco.
9. **Arquétipo 8 — Vigilância e Segurança Patrimonial**: Vigilantes treinados com certificados da Polícia Federal, registro diário de ocorrências em livro, comunicação imediata de anormalidades, conduta ética, proibição de compartilhar informações sigilosas.
10. **Arquétipo 9 — Responsabilidade Técnica / Hemodiálise**: Gestão técnica e RT formal assumida perante o hospital, alvarás sanitários e licenças em dia, atendimento imediato em urgências, cadastro de profissionais, PPRA e PCMSO atualizados, EPIs.
11. **Arquétipo 10 — Serviços Pontuais Agendados por SLA**: Cumprimento do cronograma corporativo, chamados esporádicos atendidos dentro da SLA, EPIs e uniformes.

---

## 3. ESTRUTURA DAS TABELAS DO BANCO DE DADOS

- `Tabela_Setores`: ID_Setor, NomeSetor, GestorResponsavel, EmailGestor.
- `Tabela_Fornecedores`: ID_Fornecedor, CNPJ, RazaoSocial, NomeFantasia, CategoriaServico, ID_SetorResponsavel, ContatoNome, ContatoEmail, ContatoTelefone, NumeroContrato, VigenciaFim.
- `Tabela_Avaliacoes`: ID_Avaliacao, ID_Fornecedor, ID_Setor, Ano, DataAvaliacao, GestorAvaliador, EmailAvaliador, Respostas, ObservacoesLegais, ObservacoesComportamentais, ObservacoesQualidade, ParecerGeral, MediaLegais, MediaComportamentais, MediaQualidade, MediaGeral, StatusMeta, NecessitaPlanoAcao, StatusAssinatura, DataCiencia, NomeSignatario, CargoSignatario, ParecerFornecedor.
- `Tabela_PlanosAcao_5W2H`: ID_PlanoAcao, ID_Avaliacao, ID_Fornecedor, ID_Setor, Ano, Titulo, Acao5W, Justificativa5W, Responsavel5W, Prazo5W, Onde5W, Como5W, Custo5W, Status, DataCriacao, ObservacoesAcompanhamento.
