# Legado arquivado: automacao/planilhas-inteligentes

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Criação de Planilhas Inteligentes com IA
name: planilhas-inteligentes
aliases:
  - planilhas-inteligentes
  - /planilhas-inteligentes
  - Criação de Planilhas Inteligentes com IA
tags:
  - h4
  - skill
  - automacao
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: automacao
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Automacao]]'
description: >
  Modela ou revisa planilhas de operação com esquema de dados, fórmulas,
  validação e testes de totais. Use para controle financeiro, vendas ou
  indicadores em Excel e formatos compatíveis.
---

# Planilhas de operação verificáveis

## Entrada

Receba arquivo ou amostra de linhas, objetivo, sistema de destino (Excel, Google Sheets ou LibreOffice), localidade de fórmulas, frequência de atualização e responsável pelos dados. Identifique campos sensíveis e regras de acesso. Se houver arquivo existente, inventarie abas, tabelas, fórmulas, vínculos externos e linhas de exemplo antes de editar. Preserve uma cópia para comparação.

**Briefing de exemplo:** “Registrar vendas por data, pedido, cliente, canal e valor; calcular receita mensal. O arquivo atual tem 500 linhas e fórmulas manuais na última linha; usar Excel em PT-BR.”

## Processo

1. Separe entrada, cálculo e apresentação. Defina uma linha por evento, chave única, tipos e unidade de cada coluna. Não misture totais manuais com linhas de transação.
2. Liste campos obrigatórios, valores permitidos e tratamento de vazio, duplicata e cancelamento. Use validação de dados quando o aplicativo suportar; validação na interface não substitui conferência na origem.
3. Em Excel, prefira Tabelas e referências estruturadas para colunas calculadas que crescem com novas linhas. Confirme nome real da tabela, nomes das colunas, idioma das funções e separadores antes de escrever fórmulas.
4. Para cada métrica, registre regra de negócio e fórmula. Exemplo: `receita líquida = soma de pedidos pagos, excluindo cancelados e estornos`; não conte linha sem status conhecido como venda.
5. Teste com casos pequenos de resultado conhecido: primeira linha, linha vazia, duplicata, mês sem movimento, valor negativo e inclusão de nova linha. Compare total calculado com soma independente.
6. Se a tarefa pedir arquivo, abra o artefato no aplicativo ou leitor compatível disponível e confira fórmulas, recálculo, filtros e layout. Se não puder executar, entregue especificação e marque o teste como pendente.

## Saída esperada

Entregue `aba | tabela | coluna | tipo | origem | validação | fórmula | exemplo esperado`, mais dicionário de métricas, passos de atualização e testes executados. Para o briefing acima: aba `Vendas`, tabela `tbVendas`, colunas `Pedido` (texto, único), `Data` (data), `Status` (lista controlada) e `Valor` (moeda). A aba `Resumo` agrega apenas pedidos pagos por mês; registre a fórmula exata depois de confirmar a versão do Excel e o nome das colunas.

## Fontes

- [Microsoft: referências estruturadas em tabelas do Excel](https://support.microsoft.com/pt-br/excel/using-structured-references-with-excel-tables).
- [Microsoft: validação de dados](https://support.microsoft.com/en-gb/excel/get-started/apply-data-validation-to-cells?nochrome=true).

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Automacao|Skills - Automacao]]
<!-- vault-navigation:end -->
