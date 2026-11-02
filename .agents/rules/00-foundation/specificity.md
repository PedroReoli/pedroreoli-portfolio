---
tipo: "regra_reolicode"
nome: "Regra — Regra de Especificidade"
camada: "00-foundation"
dominio: "governanca"
categoria: "regras_codigo"
prioridade: "obrigatoria"
tags: ["reoli","reolicode","00-foundation"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Especificidade"]
---

# Regra de Especificidade

## Objetivo

Transformar regras em instruções claras, executáveis e verificáveis, evitando interpretações vagas.

## Regras

* Regras complexas devem definir, quando aplicável: escopo, condição, ação esperada, exceções e validação.
* Termos vagos como `melhorar`, `otimizar`, `proteger` ou `organizar` devem ser convertidos em critérios observáveis.
* Se o contexto não permitir definir esses critérios, pergunte ao usuário e sugira critérios possíveis para aprovação.
* Regras específicas de uma stack podem permanecer no documento geral, desde que a stack aplicável esteja explicitamente identificada.
* Se duas regras entrarem em conflito, não escolha arbitrariamente: apresente o conflito, sugira qual faz mais sentido para o contexto e aguarde decisão.
* Use exemplos somente quando forem necessários para eliminar interpretações relevantes.
* Em regras de segurança, dados, performance ou UX, identifique o sintoma, a causa provável e a checagem mínima.
* Se uma regra não puder ser validada objetivamente, não a estabeleça. Pergunte ao usuário como ela deve ser validada.
* Documente as exceções conhecidas para uma regra.
* Priorize concisão, mas nunca remova informação necessária para aplicar a regra corretamente.
* Prefira ações observáveis: `validar`, `bloquear`, `limitar`, `registrar`, `paginar`, `dividir`, `isolar` e `medir`.

## Antes de criar uma regra

Verifique:

1. Se já existe regra equivalente ou relacionada.
2. Se o comportamento realmente precisa virar uma regra permanente.
3. Se a regra pertence a este documento ou a um contexto mais específico.

Evite duplicar ou espalhar regras relacionadas sem necessidade.

## Resultado esperado

Qualquer agente ou desenvolvedor deve conseguir aplicar e validar uma regra sem precisar adivinhar sua intenção.

[Catálogo de regras](../README.md)
