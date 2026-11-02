---
tipo: "regra_reolicode"
nome: "Regra — Regra de Estrutura da Documentação"
camada: "30-workflow"
dominio: "workflow"
categoria: "regras_codigo"
prioridade: "obrigatoria"
tags: ["reoli","reolicode","30-workflow"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Estrutura da Documentação"]
---

# Regra de Estrutura da Documentação

## Objetivo

Manter a documentação simples, rápida de consultar e fácil de manter.

Documentação deve reduzir tempo de busca, não criar burocracia.

## Estrutura Base

```text
/
├── README.md
├── CHANGELOG.md
├── TODO.md
├── .docs/
├── .rules/
├── .prompts/
└── .agent-docs/
```

Use apenas o que fizer sentido para o projeto.

## Responsabilidades

* `README.md` → visão geral, execução e entrada do projeto.
* `CHANGELOG.md` → histórico curto das alterações relevantes.
* `TODO.md` → tarefas e pendências temporárias.
* `.docs/` → fonte de verdade da documentação técnica e funcional.
* `.rules/` → regras permanentes do ReoliCode para agentes.
* `.prompts/` → prompts reutilizáveis.
* `.agent-docs/` → contexto operacional temporário usado pelos agentes durante planejamento e execução.

Não misture essas responsabilidades.

## .docs/

Comece simples.

Prefira arquivos diretamente em `.docs/`:

```text
.docs/
├── architecture.md
├── authentication.md
├── database.md
├── api.md
└── deployment.md
```

Não crie uma estrutura extensa de pastas antecipadamente.

Crie subpastas somente quando a quantidade de documentação de um assunto justificar.

Exemplo:

```text
.docs/
└── api/
    ├── authentication.md
    ├── webhooks.md
    └── payments.md
```

**Arquivos primeiro. Pastas quando necessário.**

## .agent-docs/

Use `.agent-docs/` para informações necessárias ao trabalho do agente que não pertencem à documentação permanente do projeto.

Exemplos:

* planos de implementação;
* contexto de tarefas;
* etapas de execução;
* sprints;
* análises temporárias;
* checkpoints de trabalho.

Não use `.agent-docs/` como fonte de verdade para arquitetura, regras de negócio, APIs ou decisões permanentes.

Quando uma informação se tornar conhecimento permanente do projeto, mova ou consolide seu conteúdo em `.docs/`.

Evite acumular contexto operacional que não possui mais utilidade.

## Organização

Cada assunto deve possuir uma fonte de verdade clara.

* Não duplique documentação.
* Não crie arquivos diferentes para pequenas variações do mesmo assunto.
* Não transforme um arquivo em depósito de assuntos sem relação.
* Divida quando o documento ficar difícil de localizar, navegar ou manter.
* Mantenha documentação próxima do contexto que explica.

Antes de criar um documento novo, procure se já existe um local adequado para atualizar.

## Nomenclatura

Pastas e arquivos devem possuir nomes técnicos, curtos e em inglês.

Prefira:

`authentication.md`
`billing-flow.md`
`database.md`
`deployment.md`

Evite:

`various-notes.md`
`general.md`
`misc.md`
`important-information.md`

O conteúdo deve ser escrito em **Português do Brasil**.

## Conteúdo

Documente principalmente informações que não são óbvias apenas lendo o código:

* arquitetura;
* fluxos importantes;
* regras de negócio;
* contratos;
* integrações;
* decisões relevantes;
* banco e persistência;
* segurança;
* deploy e operação.

Evite documentação que apenas repete a implementação.

## Atualização da Documentação

Ao realizar uma alteração relevante, verifique se ela modifica alguma documentação existente.

Atualize a documentação quando houver mudança em:

* arquitetura;
* contrato;
* fluxo;
* regra de negócio;
* integração;
* configuração;
* operação relevante.

Não crie ou atualize documentação para alterações triviais que já sejam evidentes pelo código.

Antes de criar um novo documento:

1. procure documentação relacionada;
2. atualize a fonte existente quando apropriado;
3. crie um novo arquivo somente quando existir um novo assunto com responsabilidade própria.

## Decisões

Decisões arquiteturais relevantes devem ser registradas quando houver valor histórico.

Não é obrigatório criar ADR ou estrutura específica para toda decisão.

Se decisões começarem a crescer, crie:

`.docs/decisions/`

## Arquivamento

Não crie `archive/` preventivamente.

Quando documentação antiga precisar ser preservada, utilize `.docs/archive/`.

Quando não possuir valor histórico, prefira remover em vez de acumular documentação obsoleta.

## Navegação

Se `.docs/` crescer a ponto de dificultar localização, crie:

`.docs/README.md`

Ele deve funcionar apenas como índice curto para os principais documentos.

Não crie índices para estruturas pequenas que já são fáceis de navegar.

## Regra Principal

A estrutura documental deve crescer junto com a necessidade do projeto.

**Não crie pastas, índices ou documentos apenas para preencher uma arquitetura documental predefinida.**

## Resultado esperado

Qualquer pessoa ou agente deve conseguir encontrar rapidamente a documentação relevante sem navegar por uma árvore desnecessariamente complexa.

[Catálogo de regras](../README.md)
