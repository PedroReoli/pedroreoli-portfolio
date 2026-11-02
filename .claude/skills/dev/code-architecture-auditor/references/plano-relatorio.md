# Arquitetura sugerida, plano e relatório

# 23. Arquitetura sugerida

Somente após entender a arquitetura existente, proponha melhorias.

Exemplo:

```text
src/
├── app/
├── features/
│   ├── orders/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── OrdersPage.tsx
│   └── customers/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── infrastructure/
```

Esta é apenas uma referência.

**Não force essa arquitetura caso outra organização seja mais adequada ao projeto.**

---

# 24. Plano incremental

Nunca recomende um big-bang refactor quando mudanças incrementais forem possíveis.

Organize o plano aproximadamente em:

### Etapa 1 — Quick wins

Mudanças pequenas, alto benefício e baixo risco.

### Etapa 2 — Arquivos críticos

God Components, arquivos gigantes e responsabilidades excessivas.

### Etapa 3 — Domínios/features

Melhorar ownership e co-location.

### Etapa 4 — Reutilização

Consolidar abstrações cuja reutilização foi comprovada.

### Etapa 5 — Limpeza arquitetural

Remover legado, duplicações e abstrações desnecessárias.

Adapte as etapas ao projeto analisado.

---

# 25. Relatório obrigatório

Ao finalizar a Fase 1, entregue:

## 1. Resumo executivo

Situação geral da arquitetura.

## 2. Métricas da codebase

Quando possível:

* número aproximado de arquivos;
* arquivos analisados;
* arquivos com 750+ linhas;
* maiores arquivos;
* principais diretórios;
* principais áreas problemáticas.

## 3. Arquitetura atual

Como o projeto está estruturado hoje.

## 4. Arquivos com 750+ linhas

Liste e analise individualmente.

## 5. Arquivos menores mal modularizados

Problemas que não aparecem apenas pelo tamanho.

## 6. God Components / Hooks / Services / Stores

Liste os casos encontrados.

## 7. Separação de responsabilidades

Principais violações.

## 8. Componentização

Oportunidades concretas.

## 9. Custom Hooks

Oportunidades concretas.

## 10. Duplicações e reutilização

Mostre oportunidades reais e possíveis abstrações prematuras.

## 11. Organização por feature/domínio

Analise ownership e co-location.

## 12. Acoplamento e dependências

Principais problemas encontrados.

## 13. Overengineering

Complexidade existente que poderia ser removida.

## 14. O que está bem estruturado

Partes que devem permanecer como estão.

## 15. Arquitetura sugerida

Somente mudanças justificadas.

## 16. Ranking

Use:

| Prioridade | Arquivo/Módulo | Problema | Mudança | Impacto | Esforço | Risco |
| ---------- | -------------- | -------- | ------- | ------- | ------- | ----- |

## 17. Plano incremental

Ordem recomendada de execução.

---

# 26. Encerramento obrigatório

Após entregar o relatório:

**PARE.**

Não implemente nenhuma recomendação.

Finalize perguntando:

> Quais dessas melhorias você quer que eu implemente?

Aguarde autorização.

---

# 27. Implementação após aprovação

Quando o usuário autorizar uma ou mais melhorias:

1. Confirme internamente o escopo autorizado.
2. Releia os arquivos envolvidos.
3. Verifique dependências e consumidores.
4. Faça a menor mudança arquitetural capaz de atingir o objetivo.
5. Preserve comportamento existente.
6. Evite alterações não relacionadas.
7. Atualize imports/referências necessários.
8. Execute verificações disponíveis.
9. Verifique typecheck.
10. Verifique lint.
11. Execute testes relevantes, quando disponíveis.
12. Procure referências quebradas.
13. Informe exatamente o que foi alterado.

Não aproveite uma refatoração autorizada para modificar áreas não aprovadas.

---

# 28. Relatório pós-implementação

Depois de implementar itens aprovados, informe:

### Implementado

Quais findings foram resolvidos.

### Arquivos alterados

Liste os arquivos.

### Antes

Explique brevemente a responsabilidade anterior.

### Depois

Explique a nova organização.

### Validação

Informe:

* testes;
* lint;
* typecheck;
* build;
* outras verificações realizadas.

### Pendências

Liste findings da auditoria que continuam sem implementação.

---

# Regra final

O objetivo desta skill não é produzir a maior quantidade possível de refatorações.

O objetivo é encontrar o **menor conjunto de mudanças arquiteturais que torne a aplicação significativamente mais clara, modular, coesa e sustentável**.

Sempre:

**ANALISAR → RELATAR → AGUARDAR APROVAÇÃO → IMPLEMENTAR SOMENTE O APROVADO**
