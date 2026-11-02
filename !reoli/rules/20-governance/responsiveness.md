---
tipo: "regra_reolicode"
nome: "Regra — Regra de Responsividade"
camada: "20-governance"
dominio: "governanca"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","20-governance"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Responsividade"]
---

# Regra de Responsividade

## Objetivo

Garantir interfaces utilizáveis e visualmente consistentes em diferentes tamanhos de tela, sem layouts quebrados ou adaptações improvisadas.

## Princípios

* Pense mobile-first ao alterar layout ou navegação.
* Responsividade deve considerar o espaço necessário do conteúdo, não apenas dispositivos específicos.
* Overflow horizontal inesperado é defeito.
* Não dependa de zoom para tornar uma interface utilizável.
* Preserve funcionalidade, hierarquia e legibilidade em todas as faixas.
* Não esconda funcionalidades importantes apenas para fazer o layout caber.

## Breakpoints

Use como referência, não como regra absoluta:

* `≤ 480px` → mobile pequeno
* `≤ 640px` → mobile
* `≤ 768px` → tablet
* `≤ 1024px` → notebook
* `≤ 1280px` → desktop
* `≥ 1536px` → telas largas

Priorize os breakpoints já definidos pelo projeto ou framework.

Crie um novo breakpoint somente quando o conteúdo realmente exigir adaptação.

## Layout

Prefira:

* containers fluidos;
* `flex` e `grid`;
* `min/max-width`;
* `clamp()`;
* wrapping;
* espaçamento adaptável.

Evite larguras e alturas fixas quando o conteúdo puder variar.

Elementos dentro de `flex` ou `grid` devem poder encolher corretamente quando necessário.

Empilhe ou reorganize conteúdo quando a largura deixar de comportar a estrutura original.

## Componentes

Componentes reutilizáveis devem funcionar fora da página onde foram criados.

Não implemente responsividade dependendo excessivamente do contexto externo do componente.

Quando aplicável:

* sidebar → colapsar ou virar drawer;
* modal → adaptar largura e altura à viewport;
* tabela → scroll controlado, redução de colunas ou representação alternativa;
* ações → reorganizar sem perder prioridade;
* grids → reduzir colunas progressivamente.

## Textos e Dados Dinâmicos

Considere conteúdo real e variável:

* nomes longos;
* emails;
* URLs;
* números grandes;
* traduções;
* mensagens de erro;
* conteúdo vindo de API.

Use quebra, truncamento ou expansão conforme o contexto.

Não dimensione componentes apenas para textos de exemplo.

## Formulários e Interação

* Inputs devem utilizar adequadamente o espaço disponível.
* Grupos devem reorganizar quando faltar largura.
* Dropdowns, popovers e menus devem permanecer dentro da viewport.
* Áreas interativas devem ser confortáveis para toque.
* Ações críticas devem possuir espaçamento suficiente para evitar interação acidental.
* Botões podem ocupar largura total no mobile quando isso melhorar a interação.

## Tipografia

* Preserve legibilidade em todas as faixas.
* Evite fontes pequenas apenas para fazer conteúdo caber.
* Títulos, labels e valores não devem quebrar a estrutura.
* Ajuste escala tipográfica quando necessário, preferencialmente de forma fluida.

## Mídia

* Imagens devem preservar proporção e respeitar o container.
* Vídeos, embeds e iframes devem possuir comportamento responsivo.
* Mídia decorativa não deve determinar largura mínima desnecessária da página.
* Recursos pesados específicos de desktop não devem prejudicar desnecessariamente o mobile.

## Validação

Ao alterar layout relevante, valide pelo menos:

**mobile estreito → mobile/tablet → desktop → tela larga**

Verifique:

* overflow;
* quebra de texto;
* alinhamento;
* legibilidade;
* interação por toque;
* menus e overlays;
* conteúdo dinâmico;
* elementos fora da viewport.

Não considere a tarefa concluída se alguma faixa relevante apresentar layout quebrado.

## Resultado esperado

A interface deve se adaptar ao espaço disponível mantendo conteúdo, funcionalidade e hierarquia, sem depender de correções específicas para cada dispositivo.

[Catálogo de regras](../README.md)
