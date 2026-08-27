# PROMPT MESTRE DEFINITIVO - GESTÃO DE SLA E AVALIAÇÃO ANUAL DE CONTRATOS

Cole o prompt abaixo no Claude (ou qualquer assistente de código) para que ele construa a aplicação web e o pacote de migração do Power Apps de forma 100% autônoma.

```markdown
Crie uma aplicação web completa e profissional em Português do Brasil chamada "Gestão de SLA e Avaliação de Contratos", projetada especificamente para a Diretoria Operacional de um Hospital automatizar o processo ANUAL de avaliação de fornecedores terceirizados.

---

### 1. ARQUITETURA E ESTRUTURA DOS DADOS
- Tecnologia: React 18, TypeScript, Tailwind CSS, Lucide React Icons, Recharts.
- Hierarquia de dados: Fornecedor → Setor Responsável no Hospital → Ano (Ciclo Anual).
- Armazenamento: LocalStorage com serviço de persistência e base de dados pré-populada inicial de alta fidelidade com fornecedores hospitalares reais fictícios (ex: VO2 Care Fisioterapia, CleanHospital, SterilMeds CME, MedLab, NutriCare, TechMed).

---

### 2. ESTRUTURA DO QUESTIONÁRIO E REGRA DA ESCALA
Dividir o questionário em 3 grandes grupos hospitalares:
1. ASPECTOS LEGAIS (Conselhos de classe, ANVISA, regimento interno, substituição de pessoal, EPIs).
2. ASPECTOS COMPORTAMENTAIS (Postura ética, urbanidade, LGPD/sigilo, agilidade, pontualidade).
3. PROGRAMA QUALIDADE E SEGURANÇA (Acreditação ONA/JCI, biossegurança, calibrações, eventos adversos, SLAs).

Escala por pergunta (utilizar BOTÕES CLICÁVEIS interativos):
- [ 5 - Ótimo ] (Verde escuro)
- [ 4 - Bom ] (Verde claro / Teal)
- [ 3 - Regular ] (Amarelo / Amber)
- [ 2 - Ruim ] (Laranja)
- [ 1 - Péssimo ] (Vermelho)
- [ NA ] (Cinza)

REGRA CRÍTICA DO CÁLCULO:
- Itens marcados como "NA" (Não se aplica) DEVEM ser estritamente desconsiderados do divisor no cálculo da média dos blocos e da média geral.
- Média Legais = Soma das notas válidas dos Aspectos Legais / Quantidade de itens não-NA dos Legais.
- Média Comportamentais = Soma das notas válidas / Quantidade de itens não-NA.
- Média Qualidade = Soma das notas válidas / Quantidade de itens não-NA.
- Média Geral = Soma total das notas válidas de todos os grupos / Quantidade total de itens não-NA.

---

### 3. FAIXAS DE META (META MÍNIMA: 4,00) E GATILHO AUTOMÁTICO
- 4,00 a 5,00: "Dentro da Meta" (Verde - Emerald)
- 3,00 a 3,99: "Abaixo da Meta" (Amarelo - Amber) -> Exige Plano de Ação
- 1,00 a 2,99: "Crítico" (Vermelho - Rose) -> Exige Plano de Ação Urgente

GATILHO AUTOMÁTICO:
- Se a Média Geral da avaliação for menor que 4,00 (< 4,00), a tela deve apresentar automaticamente o alerta destacado "PLANO DE AÇÃO NECESSÁRIO" e disponibilizar o botão para abrir e configurar o Plano de Ação 5W2H diretamente daquela avaliação.

---

### 4. MÓDULOS E TELAS DA APLICAÇÃO
1. Dashboard Executivo da Diretoria Operacional:
   - Cards de KPIs (Média Geral Hospitalar, % Dentro da Meta, % Abaixo da Meta, % Críticos, % Assinados pelo Fornecedor, Planos Ativos).
   - Gráfico de Barras (Recharts): Médias por Setor Hospitalar com linha de referência vermelha em 4.00 (META 4.0).
   - Gráfico de Rosca (Pie Chart): Distribuição de fornecedores por faixa de nota.
   - Painel de Alerta de Atenção da Diretoria para fornecedores abaixo da meta (< 4,00).
2. Formulário de Avaliação Anual:
   - Seleção de Fornecedor, Setor, Ano e Gestor Avaliador.
   - Respostas por botões de notas 1 a 5 ou NA.
   - Placa de cálculo em tempo real mostrando as 3 submédias e a Média Geral com destaque de cor.
   - Campos de observações por bloco e parecer geral da gestão.
3. Histórico e Tabela de Avaliações Anuais:
   - Listagem completa com busca por texto, filtro por Ano, Setor e Status de Meta.
   - Ações: Visualizar Laudo PDF, Editar, Registrar Assinatura/Ciência, Plano de Ação, Excluir.
4. Gestão de Planos de Ação (CAPA / 5W2H):
   - Estrutura 5W2H: O que fazer (What), Por que (Why), Quem (Who), Onde (Where), Quando (When), Como (How), Quanto Custa (How much).
   - Status: PENDENTE, EM_ANDAMENTO, CONCLUÍDO, ATRASADO.
5. Termo de Ciência e Assinatura Digital do Fornecedor:
   - Modal com resumo da avaliação, parecer/considerações do fornecedor e Canvas de assinatura digital (desenho via mouse ou touch).
6. Laudo Oficial em PDF / Impressão:
   - Layout limpo em folha oficial hospitalar formatado para impressão ou exportação em PDF via `window.print()`.

---

### 5. PACOTE DE MIGRAÇÃO PARA MICROSOFT POWER APPS
Crie uma pasta chamada `powerapps-package` contendo:
- 4 arquivos CSV preenchidos (`01_Tabela_Fornecedores.csv`, `02_Tabela_Setores.csv`, `03_Tabela_Avaliacoes.csv`, `04_Tabela_Planos_de_Acao_5W2H.csv`).
- Um arquivo `GUIA_POWER_FX_E_TELAS.md` contendo todas as fórmulas prontas de Power Fx para cálculo de médias desconsiderando NA, formatação condicional de cores verde/amarelo/vermelho, gatilho de plano de ação e captura de assinatura com o controle PenInput.

Construa todo o projeto pronto para rodar com `npm install` e `npm run dev`.
```
