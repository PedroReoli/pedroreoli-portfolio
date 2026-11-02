# Legado arquivado: nucleo/projeto

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Gestao de projeto
name: projeto
aliases:
  - projeto
  - /projeto
  - Gestao de projeto
tags:
  - h4
  - skill
  - nucleo
  - reolios
camada: 3_folha
dominio: gestao
categoria: nucleo
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Nucleo]]'
description: >
  Gestao de projeto com sprints, tarefas, prazos e acompanhamento. Cria board em
  markdown, quebra entregas em tarefas, estima prazos e acompanha progresso. Use
  quando o usuario pedir gerenciar projeto, criar sprint, organizar tarefas,
  acompanhar entregas, /projeto.
---

# Gestao de projeto

Transforma um objetivo em plano executavel com tarefas, prazos e acompanhamento.

## Dependencias

- **Contexto:** `sistema/memoria/empresa.md`, `sistema/memoria/estrategia.md`
- **Output:** pasta do projeto ou `tarefas.md` na raiz

---

## Workflow

### Passo 1 — Definir o projeto

Perguntar:
1. Qual o objetivo final desse projeto?
2. Qual o prazo? (data limite ou estimativa)
3. Quem esta envolvido? (so voce ou tem mais gente?)
4. Quais as entregas concretas?

### Passo 2 — Quebrar em tarefas

Pra cada entrega, criar tarefas atomicas:
- Cada tarefa deve ser completavel em 1-4 horas
- Cada tarefa tem: descricao, responsavel, prazo, status
- Agrupar em fases/sprints de 1 semana

### Passo 3 — Criar o board

Gerar `tarefas.md` ou `<projeto>/tarefas.md`:

```markdown
# Projeto: [Nome]
Prazo: [data]
Status: em andamento

## Sprint 1 (DD/MM - DD/MM)
- [ ] Tarefa 1 — @responsavel — prazo DD/MM
- [ ] Tarefa 2 — @responsavel — prazo DD/MM
- [x] Tarefa 3 (concluida)

## Sprint 2 (DD/MM - DD/MM)
- [ ] Tarefa 4
- [ ] Tarefa 5

## Backlog
- [ ] Coisas que podem esperar
```

### Passo 4 — Acompanhamento

Quando o usuario pedir status ou update:
- Ler o arquivo de tarefas
- Mostrar: % concluido, proximas tarefas, atrasadas, bloqueios
- Perguntar se quer marcar algo como feito

---

## Regras

- Tarefas atomicas (1-4h cada) — nada de tarefa vaga tipo melhorar o site
- Prazos realistas — dev solo nao faz 40h de trabalho em 1 semana
- Priorizar o que desbloqueia outras tarefas (caminho critico)
- Nao criar burocracia — board simples em markdown, sem ferramenta extra
- Atualizar o board quando tarefas forem concluidas
- Se o projeto tiver pasta propria, o board fica la dentro

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Nucleo|Skills - Nucleo]]
<!-- vault-navigation:end -->
