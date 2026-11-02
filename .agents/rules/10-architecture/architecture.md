---
tipo: "regra_reolicode"
nome: "Regra — Regra de Arquitetura"
camada: "10-architecture"
dominio: "arquitetura"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","10-architecture"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Arquitetura"]
---

# Regra de Arquitetura

## Objetivo

Separar responsabilidades e centralizar recursos reutilizáveis, evitando duplicação e componentes que concentrem toda a aplicação.

## Princípio

Um arquivo ou componente deve possuir uma responsabilidade principal.

Não concentre no mesmo componente:

* layout
* regras de negócio
* hooks
* acesso a dados
* services
* estados compartilhados
* funções utilitárias
* integrações
* grandes estruturas de dados

A UI deve principalmente apresentar dados e orquestrar comportamentos.

## Shared

Tudo que for **reutilizável entre diferentes partes do projeto** deve ser considerado para o contexto `shared`.

Exemplos:

```text
shared/
├── components/
├── hooks/
├── services/
├── state/
├── utils/
├── types/
├── constants/
└── layouts/
```

Podem pertencer ao `shared`:

* botões, inputs, modais e componentes reutilizáveis
* layouts comuns
* hooks utilizados por múltiplos módulos
* estados globais ou compartilhados
* services e clients comuns
* funções utilitárias
* tipos e contratos compartilhados
* constantes utilizadas em diferentes contextos
* regras realmente comuns ao sistema

Recursos em `shared` devem possuir **exports simples e previsíveis**, permitindo reutilização sem depender de detalhes internos de outra feature.

## Shared não é depósito

Não mova algo para `shared` apenas porque pode ser reutilizado no futuro.

Use `shared` quando:

1. já existir reutilização;
2. houver necessidade clara de reutilização;
3. o recurso não pertencer exclusivamente a uma feature ou domínio.

Código específico deve permanecer próximo de sua feature.

**Reutilizável → shared.**
**Específico → contexto da feature.**

## Separação por responsabilidade

Conforme a stack, mantenha responsabilidades em estruturas apropriadas:

* **UI** → components/pages
* **Comportamento** → hooks
* **Estado** → state/store
* **Acesso a dados** → services/clients/repositories
* **Funções puras** → utils
* **Tipos** → types/interfaces
* **Dados estáticos** → constants/data
* **Regra de negócio** → domínio/services/use cases
* **Integrações externas** → adapters/clients/services

Não crie camadas artificiais quando a arquitetura existente já possuir uma solução equivalente.

## Fluxo

Prefira fluxos previsíveis:

**entrada → validação → decisão → execução → saída**

Componentes não devem conhecer detalhes internos de persistência, infraestrutura ou integrações quando existir uma camada responsável por isso.

## Fronteiras

* Componentes visuais não acessam diretamente integrações quando existe service/client.
* Hooks não devem misturar layout com regra de negócio.
* Utils não devem esconder decisões relevantes de domínio.
* Layouts não devem conter regras específicas de negócio.
* Estado compartilhado não deve ficar espalhado entre páginas.
* Integrações externas devem possuir fronteira própria.
* Não duplique uma implementação quando já existir equivalente reutilizável.

## Antes de criar

Antes de criar um novo hook, componente, util, service, estado ou função:

1. Procure se já existe implementação equivalente.
2. Verifique o contexto `shared`.
3. Verifique módulos relacionados.
4. Reutilize ou estenda quando fizer sentido.
5. Crie algo novo somente quando a responsabilidade for realmente diferente.

## Quando extrair

Extraia uma responsabilidade quando:

* começar a ser reutilizada;
* puder existir independentemente da UI atual;
* dificultar a leitura da responsabilidade principal;
* misturar dados, comportamento e apresentação;
* gerar duplicação;
* possuir responsabilidade própria claramente identificável.

O limite geral é **750 linhas por arquivo**, mas não espere atingir esse limite para separar responsabilidades.

## Resultado esperado

A arquitetura deve permitir localizar rapidamente:

**onde a UI está, onde a lógica está, onde os dados são acessados e onde os recursos reutilizáveis estão.**

Código compartilhável deve possuir uma fonte única, fácil de importar e reutilizar em todo o projeto.

[Catálogo de regras](../README.md)
