---
tipo: "regra_reolicode"
nome: "Regra — 90.07 — Integração ReoliOS (Sistema Operacional do Negócio)"
camada: "90-integrations"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","90-integrations"]
hub_pai: "[[REOLI]]"
aliases: ["90.07 — Integração ReoliOS (Sistema Operacional do Negócio)"]
---

# 90.07 — Integração ReoliOS (Sistema Operacional do Negócio)

> Esta regra define a convivência e interoperabilidade entre o **ReoliCode** (Governança de Código) e o **ReoliOS** (Skills & Operação do Negócio).

---

## 🎯 Divisão de Responsabilidades

| Ferramenta | Escopo Principal | Localização no Projeto |
| :--- | :--- | :--- |
| **ReoliCode** | Catálogo de Regras Universais, Governança, Arquitetura, Convenções e Padrões de Código | `.rules/` |
| **ReoliOS** | Skills Operacionais (Marketing, Ads, Copy, Dev, Vendas) + Memória e Identidade do Negócio | `.claude/skills/` e `sistema/` |

---

## 🤝 Princípios de Coexistência

1. **Sem Conflitos de Entrada**:
   - `reolicode` gera os arquivos de entrada `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` apontando para a governança em `.rules/`.
   - `reolios` detecta os arquivos de entrada existentes e anexa/mescla a seção do ReoliOS referente a `.claude/skills/` e `sistema/`.
   - Ambos os sistemas coexistem no mesmo repositório sem sobrescrever as configurações um do outro.

2. **Fluxo de Trabalho Unificado**:
   - **Desenvolvimento e Arquitetura**: A IA segue estritamente o catálogo `.rules/` mantido pelo ReoliCode.
   - **Operação do Negócio e Automação**: A IA utiliza as skills disponíveis em `.claude/skills/` e a memória em `sistema/memoria/`.

3. **Independência de Repositórios**:
   - O repositório **ReoliOS** é a fonte da lógica, skills e scripts distribuíveis (não armazena dados privados de clientes).
   - Ao executar `reolios` em um novo projeto, a estrutura base limpa é injetada para que o projeto local desenvolva seu próprio contexto em `sistema/memoria/`.

[Catálogo de regras](../README.md)
