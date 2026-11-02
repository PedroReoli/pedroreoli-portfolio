# Legado arquivado: obsidian/obsidian-librarian

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Bibliotecário do Obsidian e Curadoria de Vault
name: obsidian-librarian
aliases:
  - obsidian-librarian
  - /obsidian-librarian
  - bibliotecario-obsidian
tags:
  - h4
  - skill
  - obsidian
  - segundo-cerebro
  - reolios
camada: 3_folha
dominio: operacao
categoria: obsidian
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Obsidian]]'
description: >
  Organiza, audita e mantém o vault do Obsidian limpo e navegável. Valida
  metadados frontmatter (tags, datas, status), normaliza links internos (MOCs),
  atualiza o arquivo _INDEX.md vivo e detecta notas órfãs automaticamente.
---

# Bibliotecário do Obsidian e Curadoria de Vault

Organize notas e vínculos no Obsidian a partir da estrutura existente. Apresente mudanças propostas e verifique referências antes de mover arquivos.

---

## 🧭 Contexto Operacional

Sempre que ler ou manipular arquivos dentro de um vault do Obsidian:
1. Respeite as regras locais do cofre definidas em `CLAUDE.md` ou `AGENTS.md` na raiz do vault.
2. Não altere o texto original de pensamentos humanos; atue exclusivamente em metadados, links e índices.
3. Garanta que toda nota pertença a pelo menos um **MOC (Map of Content)** ou área temática.

---

## 📐 Regras de Curadoria do Bibliotecário

1. **Frontmatter Padronizado:**
   Toda nota atômica deve conter no topo:
   ```yaml
   ---
   created: YYYY-MM-DD
   updated: YYYY-MM-DD
   area: "Nome da Área"
   type: "nota | projeto | recurso | evergreen"
   status: "ativo | rascunho | concluido | arquivado"
   tags:
     - tag-em-kebab-case
   ---
   ```
2. **Normalização de Tags:**
   - Sempre em minúsculas e separadas por hífen (`segundo-cerebro`, `copywriting`, `marketing`).
   - Nunca use caracteres especiais ou espaços em tags.
3. **Detecção de Notas Órfãs:**
   - Notas que não possuem links de entrada nem de saída devem ser listadas em `_INDEX.md` sob a seção `⚠️ Notas a Categorizar`.

---

## 🧱 Rotina de Atualização do `_INDEX.md`

Ao sincronizar ou auditar o vault, gere ou atualize o arquivo `_INDEX.md` na raiz:

```markdown
# 🗺️ Índice Mestre do Conhecimento (MOC Vivo)

> Última curadoria automática: [DATA_HORA]

## 📊 Estatísticas do Vault
- Total de Notas: [X]
- Áreas Ativas: [Y]
- Notas Órfãs / Pendentes: [Z]

## 📂 Mapas de Conteúdo (MOCs)
- [[01 - Projetos/_MOC_Projetos|🎯 Projetos Ativos]]
- [[02 - Negocio/_MOC_Negocio|💼 Estratégia & Faturamento]]
- [[03 - Recursos/_MOC_Recursos|📚 Conhecimento & Referências]]
- [[04 - Arquivo/_MOC_Arquivo|📦 Arquivo Histórico]]

## 🆕 Últimas 10 Notas Atualizadas
- [[Nome da Nota]] — atualizada em DD/MM/AAAA
```
