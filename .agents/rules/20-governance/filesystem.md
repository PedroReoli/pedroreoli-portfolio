---
tipo: "regra_reolicode"
nome: "Regra — Regra de Filesystem"
camada: "20-governance"
dominio: "governanca"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","20-governance"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Filesystem"]
---

# Regra de Filesystem

## Objetivo

Garantir operações seguras e previsíveis sobre arquivos e diretórios, respeitando o escopo autorizado do projeto.

## Escopo

* Opere apenas dentro dos diretórios necessários para a tarefa.
* Não acesse, altere ou remova arquivos fora do escopo autorizado.
* Antes de operar, confirme que o caminho pertence ao contexto esperado.
* Não assuma caminhos inexistentes ou desconhecidos.

## Leitura

A leitura pode ser utilizada para compreender o contexto necessário da tarefa.

Antes de alterar um arquivo:

1. Leia seu conteúdo atual.
2. Identifique arquivos diretamente relacionados quando necessário.
3. Preserve estruturas e comportamentos fora do escopo solicitado.

Não faça varreduras desnecessárias em diretórios sem relação com a tarefa.

## Escrita

Antes de criar ou alterar:

* verifique se o arquivo já existe;
* preserve conteúdo não relacionado;
* respeite formato, encoding e convenções existentes;
* evite sobrescrever arquivos completos quando uma alteração localizada for suficiente.

Não substitua conteúdo existente sem compreender o impacto.

## Exclusão e Sobrescrita

Ações destrutivas exigem confirmação explícita quando não tiverem sido claramente solicitadas.

Considere destrutivas:

* excluir arquivos ou diretórios;
* sobrescrever conteúdo relevante;
* limpar diretórios;
* mover estruturas em massa;
* substituir configurações;
* remover arquivos gerados ou persistidos cuja função não esteja clara.

Nunca execute uma ação destrutiva apenas por inferência.

## Caminhos

* Normalize e valide caminhos antes de operar.
* Evite path traversal ou acesso fora da raiz permitida.
* Não construa caminhos sensíveis diretamente a partir de entrada não validada.
* Prefira APIs próprias da stack para manipulação de paths.
* Considere diferenças de filesystem e sistema operacional quando aplicável.

## Operações em Massa

Antes de alterar múltiplos arquivos:

1. Determine exatamente quais arquivos serão afetados.
2. Confirme que pertencem ao escopo da tarefa.
3. Evite alterações globais quando uma mudança localizada resolver.
4. Em mudanças relevantes ou destrutivas, apresente o impacto antes de executar.

## Arquivos Sensíveis

Tenha cuidado adicional com:

* `.env` e secrets;
* credenciais;
* certificados e chaves;
* configurações de produção;
* arquivos de banco ou persistência;
* scripts de deploy;
* arquivos de CI/CD;
* configurações do sistema.

Nunca exponha conteúdo sensível desnecessariamente.

## Resultado esperado

Operações de filesystem devem ser localizadas, reversíveis quando possível e limitadas ao necessário, sem alterações ou exclusões inesperadas fora do escopo autorizado.

[Catálogo de regras](../README.md)
