---
tipo: "regra_reolicode"
nome: "Regra — Regra SOLID"
camada: "10-architecture"
dominio: "arquitetura"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","10-architecture"]
hub_pai: "[[REOLI]]"
aliases: ["Regra SOLID"]
---

# Regra SOLID

## Objetivo

Manter módulos, classes, componentes e funções com responsabilidades claras, baixo acoplamento e facilidade de evolução.

Aplique SOLID quando ele melhorar concretamente a estrutura. Não crie abstrações apenas para seguir o princípio formalmente.

## Responsabilidade Única — SRP

Cada unidade deve possuir uma responsabilidade principal e um motivo claro para mudar.

Evite funções, classes ou módulos que simultaneamente:

* validam;
* transformam;
* persistem;
* integram;
* controlam fluxo;
* apresentam dados.

Quando responsabilidades independentes crescerem, separe-as.

## Aberto/Fechado — OCP

Prefira estruturas que permitam adicionar comportamento sem reescrever fluxos estáveis.

Quando novos casos exigirem alterações repetidas no mesmo `if`, `switch` ou módulo central, avalie criar um ponto de extensão.

Não crie abstrações antecipadamente para cenários hipotéticos.

## Substituição — LSP

Implementações do mesmo contrato devem manter o comportamento esperado por quem utiliza esse contrato.

Uma implementação não deve:

* exigir condições inesperadas;
* remover comportamentos prometidos;
* alterar o significado do contrato;
* produzir efeitos incompatíveis com outras implementações.

## Segregação de Interfaces — ISP

Contratos devem expor somente o necessário para seus consumidores.

Evite interfaces grandes que obriguem implementações a depender de métodos ou dados que não utilizam.

Quando consumidores precisarem de partes claramente diferentes de um contrato, considere separá-lo.

## Inversão de Dependência — DIP

Regras importantes não devem depender diretamente de detalhes instáveis de infraestrutura quando essa dependência dificultar manutenção ou substituição.

Quando aplicável, isole:

* APIs externas;
* banco de dados;
* filesystem;
* serviços de terceiros;
* recursos específicos de sistema operacional.

Prefira contratos estáveis nas fronteiras onde existir necessidade real de desacoplamento.

## Acoplamento

Uma mudança localizada não deve provocar alterações em áreas sem relação direta.

Se pequenas mudanças gerarem efeito cascata, investigue:

* responsabilidade misturada;
* dependência concreta desnecessária;
* contrato inadequado;
* estado compartilhado excessivo;
* abstração ausente ou incorreta.

## Evite Overengineering

SOLID não significa criar interfaces, factories, repositories ou abstrações para tudo.

Antes de abstrair, deve existir benefício identificável:

**reduzir acoplamento, permitir substituição, facilitar teste, eliminar duplicação estrutural ou separar responsabilidades reais.**

Sem benefício concreto, prefira a solução mais simples.

## Resultado esperado

O código deve permitir mudanças localizadas, responsabilidades claras e substituição de partes sem exigir reestruturação desnecessária do restante do sistema.

[Catálogo de regras](../README.md)
