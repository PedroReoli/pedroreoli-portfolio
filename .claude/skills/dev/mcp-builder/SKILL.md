---
tipo: skill
nome: Desenvolvimento de Servidores MCP (Model Context Protocol)
name: mcp-builder
aliases:
  - mcp-builder
  - /mcp-builder
  - Desenvolvimento de Servidores MCP (Model Context Protocol)
tags:
  - h4
  - skill
  - dev
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: dev
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Dev Eng]]'
description: >
  Desenvolvimento e arquitetura de servidores MCP (Model Context Protocol) em
  TypeScript ou Python. Use para criar ferramentas customizadas que conectam
  Claude Code, Gemini CLI, Cursor e Antigravity a bancos de dados, APIs de
  terceiros, sistemas legados e ferramentas do seu negócio.
---

# Desenvolvimento de Servidores MCP (Model Context Protocol)

Desenvolva servidores MCP com ferramentas delimitadas e autorização no servidor. Antes de programar, confirme versão do protocolo e SDK compatível com o cliente alvo.

---

## 🧭 Princípios de Design de Ferramentas para IA

1. **Nomes Descritivos e Semânticos:** Use prefixos consistentes (`empresa_listar_clientes`, `empresa_criar_fatura`).
2. **Esquema Pydantic / Zod Rigoroso:** Defina tipos estritos e descrições detalhadas para cada parâmetro. A IA decide chamar a ferramenta com base na descrição dos argumentos.
3. **Respostas Enxutas (Anti-Saturação de Contexto):** Não retorne JSONs gigantes com 50 campos inúteis. Filtre e retorne apenas os dados necessários para o agente tomar a próxima decisão.
4. **Mensagens de Erro Acionáveis:** Se um parâmetro falhar, o erro deve dizer como corrigir (ex: *"Formato de data inválido. Use AAAA-MM-DD"*).

---

## 🛠️ Escolha da Stack

- **TypeScript / Node.js (`@modelcontextprotocol/sdk`):** Recomendado quando o projeto já é em Node/TypeScript e roda local via `stdio`.
- **Python (`FastMCP`):** Recomendado para prototipagem rápida e ecossistema de dados/APIs REST em Python.

---

## Contrato antes do código

**Briefing de exemplo:** “Crie um servidor MCP local para consultar status de pedidos do ERP, somente leitura, filtrado pelo usuário logado”. Registre versão do cliente, transporte, origem, campos de entrada/saída, identidade e dados sensíveis.

1. Consulte a documentação do SDK instalado e o protocolo suportado. Exemplos de importação e inicialização variam por versão; não copie um template antigo como se fosse universal.
2. Defina uma ferramenta por operação com schema estrito, resultado tipado quando suportado, erros legíveis e caso sem resultado.
3. Autorize por usuário, recurso e ação no servidor. Não exponha SQL, shell ou acesso irrestrito a arquivos. Limite paginação, duração e dados retornados.
4. Teste descoberta, chamada válida, argumento inválido, acesso negado, origem indisponível e tentativa de atravessar fronteira entre clientes.

**Saída:** contrato `ferramenta | entrada | saída | autorização | erro`, implementação, configuração sem segredos e evidência dos testes. Para auditoria de um servidor existente, use `/auditar-mcp`.

**Fontes:** [especificação MCP: ferramentas](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) e [autorização](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization).

---

## 📋 Checklist de Validação de Servidor MCP
- [ ] O servidor roda via transporte `stdio` (ou Streamable HTTP caso seja remoto)?
- [ ] Todas as ferramentas possuem descrições claras para a IA entender quando chamar?
- [ ] Os erros retornam dicas de recuperação legíveis pelo modelo?
- [ ] O arquivo `mcp_config.json` ou `claude_desktop_config.json` foi testado e validado?

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->
