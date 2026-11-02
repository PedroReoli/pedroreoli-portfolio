---
tipo: skill
nome: Automação local observável
name: automacao-local
aliases: [automacao-local, /automacao-local, tarefa-agendada]
tags: [skill, automacao, windows, agendamento, reolios]
camada: 3_folha
dominio: tecnologia
categoria: automacao
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Automacao]]'
description: >
  Planeja e implementa rotinas locais agendadas com logs, repetição segura e recuperação.
  Use para automatizar arquivos, backups, relatórios ou sincronização em máquina local.
---

# Automação local observável

## Entrada

Receba gatilho, sistema operacional, diretórios autorizados, usuário de execução, volume, destino, duração aceitável e ação diante de falha. Exemplo: “Gerar relatório de vendas do CSV local às 8h, sem enviar dados pela rede”. Consulte `sistema/memoria/automacoes.md` para evitar duplicação.

## Processo

1. Desenhe entradas, transformação e saídas com caminhos absolutos. Confirme o fuso horário e a necessidade de execução durante suspensão ou ausência de login.
2. Implemente primeiro comando executável manualmente, com validação de entrada, código de saída, log sem segredos e modo de teste. Use arquivo temporário e troca atômica para saídas que não podem ficar pela metade.
3. Torne repetições seguras: chave por período/arquivo, bloqueio de execução concorrente e regra explícita para reprocessamento.
4. No Windows, registre a tarefa no Agendador com conta de menor privilégio e diretório de trabalho correto. Nunca ponha senha em linha de comando ou script rastreado. Em outras plataformas, use o agendador nativo documentado.
5. Teste execução manual, agendada, falha de origem, falha de destino e reinício. Registre como consultar último resultado, log e como desativar a rotina.

## Saída esperada

Entregue `comando | agenda/fuso | entradas | saída | conta | log | retentativa | rollback`, script, configuração e evidência de uma execução de teste. Exemplo: `08:00 America/Sao_Paulo | vendas.csv | relatorio-AAAA-MM-DD.csv | conta restrita | logs/relatorio.log | uma repetição em falha transitória`.

## Fonte

- [Microsoft Learn: principal de tarefa agendada](https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/new-scheduledtaskprincipal?view=windowsserver2025-ps).
