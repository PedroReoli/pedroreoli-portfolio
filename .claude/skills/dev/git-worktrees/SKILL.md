---
tipo: skill
nome: Isolamento Seguro de Workspace
name: git-worktrees
aliases:
  - git-worktrees
  - /git-worktrees
  - Isolamento Seguro de Workspace
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
  Configura e opera Git Worktrees para isolamento seguro de desenvolvimento.
  Permite que o agente crie features e faça testes pesados em pastas separadas
  sem arriscar o branch principal do usuário. Use quando pedir "worktree",
  "isolar branch", "trabalhar em branch separada", "git worktree" ou
  "/worktree".
---

# Isolamento Seguro de Workspace

Permite que a IA trabalhe em paralelo ou execute testes e refatorações complexas em um diretório isolado via Git Worktree, sem poluir ou alterar a pasta atual de trabalho.

---

## 🎯 Por que Usar Git Worktrees com Agentes de IA?

- **Zero Risco no Branch Principal:** A IA executa comandos, compila código e instala pacotes numa pasta isolada. Se algo der errado, basta remover o worktree sem sujar seu git local.
- **Trabalho Paralelo Real:** Você pode continuar editando no seu branch atual enquanto o agente compila ou roda testes em segundo plano no worktree.

---

## 🛠️ Comandos Operacionais

### 1. Criar um Worktree Isolado
```bash
# Cria uma pasta temporária isolada apontando para uma nova branch
git worktree add ../reolios-feature-sandbox -b feat/nova-rotina
```

### 2. Listar Worktrees Ativos
```bash
git worktree list
```

### 3. Finalizar e Limpar o Worktree
Quando a tarefa estiver concluída e os testes passarem:
```bash
# Voltar para o repositório principal
# Mesclar ou fazer rebase das alterações
git merge feat/nova-rotina

# Remover a pasta do worktree de forma limpa
git worktree remove ../reolios-feature-sandbox
```

---

## 📋 Regras de Segurança do Agente

1. **Nunca forçar remoção sem verificar commits não salvos:** Sempre conferir `git status` dentro do worktree antes de remover.
2. **Respeitar o `.gitignore`:** Arquivos sensíveis e `.privado/` não devem ser copiados sem necessidade para fora da raiz do projeto.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->
