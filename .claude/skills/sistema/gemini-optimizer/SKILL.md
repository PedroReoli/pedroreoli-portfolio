---
tipo: skill
nome: Otimização Avançada para Gemini CLI
name: gemini-optimizer
aliases:
  - gemini-optimizer
  - /gemini-optimizer
  - Otimização Avançada para Gemini CLI
tags:
  - h4
  - skill
  - sistema
  - reolios
camada: 3_folha
dominio: operacao
categoria: sistema
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Sistema]]'
description: >
  Otimizações específicas para execução no Gemini CLI. Inclui compactação
  estratégica de contexto, loops de verificação autônoma e prevenção de
  alucinações. Use quando pedir "otimizar gemini", "gemini cli", "compactar
  contexto", "gemini-optimizer" ou "/gemini-opt".
---

# Otimização Avançada para Gemini CLI

Ajuste carregamento de contexto e verificação para uma tarefa executada no Gemini CLI. Confirme recursos e comandos na versão instalada antes de instruir o agente.

---

## ⚡ Estratégias Centrais para o Gemini CLI

### 1. Compactação Estratégica (Strategic Compact)
Quando uma sessão de trabalho fica muito longa:
- Resuma as decisões de arquitetura tomadas até o momento.
- Registre decisões duráveis no local de documentação apropriado; não use `sistema/memoria/` como log de arquivos modificados.
- Descarte outputs de terminal brutos ou logs de testes antigos para manter o modelo ágil.

### 2. Ciclo de Verificação Contínua (Verification Loop)
Nunca assuma que o código funcionou apenas porque foi escrito:
1. **Escrever:** Implementar o código ou alteração.
2. **Executar:** Rodar o comando real de teste (`npm test`, `python script.py`).
3. **Inspecionar:** Ler a saída de erro ou sucesso no terminal.
4. **Iterar:** Corrigir imediatamente se houver falha antes de entregar ao usuário.

### 3. Preservação de Contexto do Negócio
Na abertura de sessão, consulte `sistema/dados/SKILLS-ROUTER.json` e carregue apenas as memórias exigidas pela tarefa; para `/abrir`, leia:
- `sistema/memoria/empresa.md`
- `sistema/memoria/preferencias.md`
- `sistema/memoria/estrategia.md`

Isso garante que o Gemini responda com o seu tom de voz e alinhado aos seus objetivos comerciais.

## Entrada e saída

**Briefing de exemplo:** “A sessão de revisão de API está lenta; mantém logs enormes e relê todas as skills”. Inventarie arquivos carregados, tamanho, decisões ainda relevantes e comandos de teste. Entregue plano `manter | resumir | descartar`, com caminhos exatos, mais um teste de comportamento antes/depois. Não descarte evidências necessárias para revisar falhas.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Sistema|Skills - Sistema]]
<!-- vault-navigation:end -->
