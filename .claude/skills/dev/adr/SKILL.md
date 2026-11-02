---
tipo: skill
nome: Architecture Decision Records (Registros de Decisão Técnica)
name: adr
aliases:
  - adr
  - /adr
  - Architecture Decision Records (Registros de Decisão Técnica)
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
  Gera e mantém Architecture Decision Records (ADRs) leves para documentar
  decisões técnicas, mudanças estruturais e escolhas de design no projeto. Use
  quando decidir adoção de banco de dados, frameworks, estratégias de cache ou
  refatorações de grande impacto.
---

# Architecture Decision Records (Registros de Decisão Técnica)

Registre decisão arquitetural com contexto, alternativas consideradas, consequência e status. Use evidências do repositório e identifique premissas não validadas.

---

## 🧭 Quando Registrar uma ADR?

Registre uma ADR sempre que uma decisão:
- For difícil ou cara de reverter no futuro (escolha de banco de dados, biblioteca central, protocolo de auth).
- Impactar a governança de código ou estrutura de diretórios da equipe/agentes.
- Resolver uma divergência técnica com prós e contras relevantes.

---

## 📁 Estrutura de Armazenamento
Os arquivos de ADR devem ser salvos em `docs/adr/` com nomenclatura numerada:
`docs/adr/0001-escolha-do-banco-de-dados.md`

---

## 📝 Molde Padrão de ADR (Formato Michael Nygard)

```markdown
# [Número]. [Título Curto e Imperativo]

* **Data:** [AAAA-MM-DD]
* **Status:** [Proposto | Aceito | Substituído | Deprecado]
* **Decisores:** [Nomes ou "Equipe ReoliOS"]

## Contexto e Problema
Qual é a situação atual e qual problema técnico precisamos resolver? Quais restrições (tempo, custo, stack, performance) influenciam a decisão?

## Decisão Considerada
Decidimos adotar [Tecnologia / Padrão X].

## Alternativas Avaliadas
1. **Alternativa A:** [Prós e Contras]
2. **Alternativa B:** [Prós e Contras]

## Consequências
### Positivas (+)
- [Benefício direto 1]
- [Benefício direto 2]

### Negativas / Riscos (-)
- [Trade-off aceito ou manutenção adicional necessária]
```

---

## 📋 Checklist de Uma Boa ADR
- [ ] A justificativa foca em fatos de engenharia e regras de negócio, não em gosto pessoal?
- [ ] Pelo menos duas alternativas reais foram comparadas honestamente?
- [ ] Os trade-offs negativos foram explicitamente documentados?
- [ ] O documento tem menos de 2 páginas e pode ser lido em 3 minutos?

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->
