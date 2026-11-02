---
tipo: skill
nome: Auditar segurança de servidores MCP
name: auditar-mcp
aliases: [auditar-mcp, /auditar-mcp, seguranca-mcp]
tags: [skill, dev, mcp, integracao, reolios]
camada: 3_folha
dominio: tecnologia
categoria: dev
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Dev]]'
description: >
  Audita ferramentas MCP, transporte e autorização com testes de abuso.
  Use para revisar um servidor MCP existente antes de conectá-lo a dados reais.
---

# Auditar segurança de servidores MCP

## Entrada

Receba código/configuração do servidor, versão do cliente e protocolo, inventário de ferramentas, identidades, recursos acessíveis e dados sensíveis. Exemplo: “Revise o servidor MCP que consulta pedidos do ERP antes de dar acesso a vendedores”. Consulte `sistema/memoria/empresa.md` só se o domínio de acesso depender dela.

## Processo

1. Confirme versão e transporte em uso. Inventarie ferramentas, schemas, recursos, prompts e credenciais acessíveis; identifique ferramentas de escrita, shell e consulta genérica.
2. Verifique autenticação remota quando aplicável e autorização por usuário, recurso e operação no servidor. Texto do modelo, descrição de ferramenta e consentimento genérico não são controles de acesso.
3. Teste entradas inválidas, paginação ilimitada, acesso entre clientes, chamada de ação sem permissão, erro do serviço e exposição de segredos em logs ou saídas.
4. Envie conteúdo externo com instruções adversariais benignas de teste e confirme que ele é tratado como dado, sem ampliar ferramentas ou escopo.
5. Classifique achados por impacto e evidência. Proponha correção mínima e teste de regressão; não declare exploração comprovada a partir de leitura estática.

## Saída esperada

Entregue inventário, matriz `identidade × operação × recurso`, achados `gravidade | arquivo/linha | cenário | evidência | correção | teste` e itens não testados. Exemplo: `alto | consultar_pedido | vendedor A consulta pedido de B | teste 403 ausente | filtrar tenant no servidor | teste cruzado`.

## Fontes

- [MCP: ferramentas](https://modelcontextprotocol.io/specification/2026-07-28/server/tools).
- [MCP: autorização](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization).
- [OWASP: excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/).
