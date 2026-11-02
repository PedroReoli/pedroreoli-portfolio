---
tipo: "regra_reolicode"
nome: "Regra — Regra de Modularização"
camada: "10-architecture"
dominio: "arquitetura"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","10-architecture"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Modularização"]
---

# Regra de Modularização

## Objetivo

Evitar arquivos e módulos monolíticos, mantendo o código dividido por responsabilidades claras e independentes.

## Princípios

* Cada arquivo deve possuir um motivo principal para existir.
* Cada módulo deve representar uma responsabilidade identificável.
* Prefira módulos pequenos e coesos a arquivos que concentram comportamentos diferentes.
* Separe por responsabilidade, não apenas por quantidade de linhas.
* Não crie arquivos artificiais que apenas fragmentem código sem melhorar sua organização.

## Limite de Arquivo

**750 linhas é o limite máximo por arquivo.**

Não espere atingir o limite para modularizar.

Se um arquivo estiver crescendo, avalie antecipadamente se existem responsabilidades que podem ser isoladas.

Nunca reduza linhas apenas movendo código aleatoriamente para outros arquivos.

A modularização deve produzir responsabilidades reais.

## Quando Modularizar

Considere modularização quando:

* existirem responsabilidades diferentes no mesmo arquivo;
* hooks, handlers, helpers e renderização disputarem espaço;
* funções internas começarem a ser reutilizadas;
* testes exigirem configurar comportamentos não relacionados;
* uma alteração tiver risco de afetar funcionalidades independentes;
* for necessário navegar por muito código para entender uma única funcionalidade;
* o nome do arquivo não representar mais tudo que ele contém;
* uma parte puder ser compreendida e testada isoladamente.

## Ordem de Extração

Ao modularizar, priorize:

1. Código duplicado ou reutilizável.
2. Responsabilidades independentes.
3. Acesso a dados e integrações.
4. Regras de negócio.
5. Hooks e estados complexos.
6. Funções e transformações auxiliares.
7. Blocos extensos de UI.

Não extraia apenas o trecho mais fácil. Extraia aquilo que possui uma fronteira clara.

## Destino

Ao extrair uma responsabilidade:

* UI → `components`
* comportamento → `hooks`
* acesso externo → `services` / `clients`
* estado → `state` / `store`
* funções puras → `utils`
* tipos → `types`
* constantes/dados → `constants` / `data`
* regra de negócio → domínio / services / use cases

Se o módulo for reutilizável por diferentes partes do projeto, utilize o contexto `shared` correspondente.

Se for específico de uma feature, mantenha-o dentro do contexto dessa feature.

## Reutilização

Antes de criar um novo módulo:

1. Procure implementação equivalente no projeto.
2. Verifique o contexto `shared`.
3. Verifique módulos relacionados.
4. Reutilize ou estenda quando fizer sentido.
5. Crie um novo módulo somente quando houver responsabilidade diferente.

Evite duplicação causada apenas por desconhecimento da estrutura existente.

## Evite Modularização Artificial

Não crie:

* arquivos com uma função trivial sem motivo arquitetural;
* abstrações usadas apenas uma vez sem benefício claro;
* wrappers que apenas encaminham parâmetros;
* módulos genéricos sem responsabilidade definida;
* estruturas profundas de pastas sem necessidade.

Modularizar não significa maximizar a quantidade de arquivos.

## Validação

Após modularizar, confirme que:

* o comportamento original foi preservado;
* imports e exports continuam claros;
* não foram criadas dependências circulares;
* cada módulo possui responsabilidade identificável;
* código compartilhado possui ponto de importação simples;
* nenhuma nova duplicação foi introduzida.

## Resultado esperado

O projeto deve crescer adicionando ou evoluindo módulos, e não aumentando continuamente os mesmos arquivos.

Cada módulo deve ser fácil de localizar, entender, testar, reutilizar e substituir.

[Catálogo de regras](../README.md)
