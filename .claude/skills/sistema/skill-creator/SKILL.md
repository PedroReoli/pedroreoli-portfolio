---
tipo: skill
nome: Criação e Engenharia Reversa de Skills
name: skill-creator
aliases:
  - skill-creator
  - /skill-creator
  - Criação e Engenharia Reversa de Skills
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
  Cria novas skills profissionais para o ReoliOS fazendo engenharia reversa de
  casos reais, bibliotecas ou repositórios open-source do GitHub. Use quando
  pedir "criar nova skill", "fazer skill para...", "engenharia reversa de repo",
  "skill-creator" ou "/criar-skill".
---

# Criação e Engenharia Reversa de Skills

Cria skills de alta performance para o ReoliOS baseadas no que **praticantes de ponta** fazem no mundo real, e não em teoria genérica de IA.

---

## 💡 Princípio Central

> **Skills são para executar trabalho real.**
> Conhecimento prático vem do que quem faz melhor no mercado executa, quais erros evita e quais padrões utiliza.

| Abordagem Errada ❌ | Abordagem ReoliOS ✅ |
| :--- | :--- |
| Gerar um prompt prolixo e teórico sobre um tema geral | Mapear o processo passo a passo do especialista com gatilhos e checklists |
| Misturar 10 tópicos num arquivo confuso | Criar uma skill focada, com frontmatter válido e exemplos claros |
| Ignorar custos de tokens e complexidade | Otimizar para consumo mínimo de tokens com instruções de alto sinal |

---

## 🔄 Fluxo de Criação de Skill

### Passo 1: Delimitação e Escopo
Responder com precisão:
1. **Qual o problema exato que ela resolve?** (ex: "Gera campanhas em CSV para o Google Ads Editor")
2. **Quem é o gatilho?** Quais frases ou comandos chamam essa skill?
3. **Qual a entrada esperada?** (URL, arquivo, texto bruto, parâmetros)
4. **Qual a saída esperada?** (Arquivo `.md`, script, JSON, plano de ação)

### Passo 2: Garimpo de Padrões Reais
Se houver uma biblioteca ou repositório no GitHub:
- Identificar as melhores práticas oficiais da documentação
- Mapear os 3 erros mais comuns cometidos por quem implementa pela primeira vez
- Extrair os argumentos de linha de comando ou funções essenciais

### Passo 3: Estruturação no Padrão ReoliOS
Toda skill deve seguir a estrutura obrigatória:

```markdown
---
name: nome-da-skill
description: >
  Descrição concisa com gatilhos de ativação claros.
  Use quando pedir "gatilho 1", "gatilho 2", "/comando".
---

# /nome-da-skill — Título Claro

> Propósito da skill em 1 frase.

## 🎯 Quando Usar
- Caso 1
- Caso 2

## 📋 Checklist de Execução
1. Passo 1
2. Passo 2
3. Passo 3

## 💡 Exemplos Práticos & Anti-Padrões
...
```

### Passo 4: Validação Automática
Após criar a skill em `.claude/skills/<categoria>/<nome>/SKILL.md`:
```bash
npm run validate:skills
```
Garanta que o linter aprove a nova skill sem erros ou avisos.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Sistema|Skills - Sistema]]
<!-- vault-navigation:end -->
