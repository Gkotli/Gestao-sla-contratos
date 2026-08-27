# Guia de Transição para o Microsoft Power Apps (Power Platform)

Este documento contém toda a especificação técnica e as **fórmulas prontas em Power Fx** para montar a aplicação no **Microsoft Power Apps** integrada às listas do **SharePoint** ou **Dataverse**.

---

## 1. Estrutura das Tabelas (Importar os arquivos CSV)

No SharePoint ou Dataverse, crie as seguintes 4 listas importando os arquivos `.csv` fornecidos nesta pasta:

1. **`tbl_Fornecedores`** (Arquivo `01_Tabela_Fornecedores.csv`)
2. **`tbl_Setores`** (Arquivo `02_Tabela_Setores.csv`)
3. **`tbl_Avaliacoes`** (Arquivo `03_Tabela_Avaliacoes.csv`)
4. **`tbl_PlanosDeAcao`** (Arquivo `04_Tabela_Planos_de_Acao_5W2H.csv`)

---

## 2. Fórmulas Power Fx para as Telas

### A) Cálculo das Médias dos Bloco Desconsiderando "NA"

Em cada grupo de perguntas (Legais, Comportamentais, Qualidade), utilize a seguinte fórmula no evento `OnChange` ou na propriedade `Text` do rótulo da média:

```powerfx
// 1. Média dos Aspectos Legais (Perguntas leg_1 até leg_5)
Set(varSomaLegais, 
    If(DropdownLeg1.Selected.Value <> "NA", Value(DropdownLeg1.Selected.Value), 0) +
    If(DropdownLeg2.Selected.Value <> "NA", Value(DropdownLeg2.Selected.Value), 0) +
    If(DropdownLeg3.Selected.Value <> "NA", Value(DropdownLeg3.Selected.Value), 0) +
    If(DropdownLeg4.Selected.Value <> "NA", Value(DropdownLeg4.Selected.Value), 0) +
    If(DropdownLeg5.Selected.Value <> "NA", Value(DropdownLeg5.Selected.Value), 0)
);

Set(varQtdLegais,
    If(DropdownLeg1.Selected.Value <> "NA", 1, 0) +
    If(DropdownLeg2.Selected.Value <> "NA", 1, 0) +
    If(DropdownLeg3.Selected.Value <> "NA", 1, 0) +
    If(DropdownLeg4.Selected.Value <> "NA", 1, 0) +
    If(DropdownLeg5.Selected.Value <> "NA", 1, 0)
);

Set(varMediaLegais, If(varQtdLegais > 0, Round(varSomaLegais / varQtdLegais, 2), 0));
```

---

### B) Cálculo da Média Geral do SLA

```powerfx
Set(varSomaTotal, varSomaLegais + varSomaComportamentais + varSomaQualidade);
Set(varQtdTotal, varQtdLegais + varQtdComportamentais + varQtdQualidade);

Set(varMediaGeral, If(varQtdTotal > 0, Round(varSomaTotal / varQtdTotal, 2), 0));
```

---

### C) Classificação da Meta e Cor do Card (Verde / Amarelo / Vermelho)

Defina a propriedade `Color` ou `Fill` do painel com a seguinte regra:

```powerfx
// Propriedade Fill (Cor de fundo da pontuação)
If(
    varMediaGeral >= 4.00, ColorValue("#10b981"), // Verde (Dentro da Meta)
    varMediaGeral >= 3.00, ColorValue("#f59e0b"), // Amarelo/Laranja (Abaixo da Meta)
    ColorValue("#ef4444")                         // Vermelho (Crítico)
)
```

```powerfx
// Texto do Status da Meta
If(
    varMediaGeral >= 4.00, "Dentro da Meta (≥ 4.00)",
    varMediaGeral >= 3.00, "Abaixo da Meta (3.00 a 3.99)",
    "Crítico (< 3.00)"
)
```

---

### D) Gatilho Automático para Plano de Ação

Na visibilidade do Banner de Alerta (`Visible`):

```powerfx
varMediaGeral < 4.00 && varQtdTotal > 0
```

No evento `OnSelect` do Botão **"Salvar e Abrir Plano de Ação"**:

```powerfx
SubmitForm(FormAvaliacao);
Navigate(ScreenNovoPlanoDeAcao, ScreenTransition.Cover);
```

---

### E) Assinatura Digital (Componente PenInput)

No Power Apps, insira o componente **Caneta (PenInput)** chamado `PenInputAssinatura`.

No evento `OnSelect` do Botão **Confirmar Ciência**:

```powerfx
Patch(
    tbl_Avaliacoes,
    LookUp(tbl_Avaliacoes, ID_Avaliacao = varAvaliacaoSelecionada.ID_Avaliacao),
    {
        Status_Assinatura: "ASSINADO_CIENTE",
        Data_Ciencia: Text(Now(), "yyyy-mm-dd"),
        Nome_Signatario: txtNomeSignatario.Text,
        Assinatura_Imagem: PenInputAssinatura.Image
    }
);
Notify("Ciência e Assinatura salvas com sucesso!", NotificationType.Success);
```

---

## 3. Integração com Power Automate (Opcional - Envio de E-mails)

Para enviar um e-mail automático ao fornecedor e à Diretoria Operacional quando a avaliação for salva:

1. Crie um fluxo no **Power Automate** disparado pelo evento `Quando um item é criado em tbl_Avaliacoes`.
2. Adicione a condição: `Media_Geral < 4.00`.
3. Se `Verdadeiro`: Envia e-mail de alerta para a Diretoria Operacional com o assunto: `[ALERTA SLA] Fornecedor [Nome_Fantasia] ficou abaixo da meta (Nota: [Media_Geral])`.
