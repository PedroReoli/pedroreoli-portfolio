---
tipo: "regra_reolicode"
nome: "Regra — Regra de Backend e APIs"
camada: "40-stack"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","40-stack"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Backend e APIs"]
---

# Regra de Backend e APIs

## Objetivo

Criar backends previsíveis, seguros e fáceis de integrar, mantendo transporte, regras de negócio, dados e integrações com responsabilidades claras.

## Princípio

O backend é a fonte de verdade para:

* regras de negócio;
* autorização;
* validações críticas;
* cálculos;
* permissões;
* integridade dos dados.

Nunca confie no frontend para garantir uma regra crítica.

## Fluxo

Prefira o fluxo:

**request → validação → autorização → regra de negócio → dados/integração → response**

Cada camada deve possuir responsabilidade clara.

Controllers e handlers devem principalmente receber, validar/orquestrar e retornar.

Não concentre regra de negócio extensa diretamente em endpoints.

## Contratos

Requests e responses devem ser:

* explícitos;
* tipados quando a stack permitir;
* pequenos;
* estáveis;
* documentados.

Não exponha automaticamente entidades completas do banco.

Retorne apenas os campos necessários ao consumidor.

Mudanças incompatíveis em contratos existentes devem ser identificadas antes da implementação.

## Validação

Valide dados externos na borda do sistema.

Considere:

* campos obrigatórios;
* tipo;
* formato;
* tamanho;
* intervalo;
* enum;
* limites.

Validação do frontend não substitui validação do backend.

## Swagger / OpenAPI

APIs HTTP devem possuir documentação **OpenAPI/Swagger por padrão**.

Cada endpoint relevante deve documentar:

* método;
* rota;
* objetivo;
* parâmetros;
* request;
* response;
* status HTTP;
* autenticação quando aplicável;
* erros relevantes.

Requests e responses documentados devem representar o comportamento real da API.

Sempre que a stack permitir, prefira gerar ou sincronizar o OpenAPI a partir dos contratos reais da aplicação.

Evite documentação duplicada manualmente quando puder ficar desatualizada.

Swagger/OpenAPI deve funcionar como **contrato técnico da API**, não apenas como página visual.

## Status HTTP

Utilize códigos HTTP coerentes com o resultado da operação.

Não retorne `200` para esconder falhas.

Diferencie adequadamente:

* sucesso;
* criação;
* entrada inválida;
* não autenticado;
* não autorizado;
* recurso inexistente;
* conflito;
* rate limit;
* erro interno.

Mantenha padrão consistente de erros em toda a API.

## Dados

* Filtre no backend quando apropriado.
* Ordene no backend quando o volume justificar.
* Paginação deve existir para coleções potencialmente grandes.
* Evite retornar dados que serão descartados imediatamente pelo consumidor.
* Evite N+1.
* Reduza round trips desnecessários ao banco.

Não adicione cache para esconder consulta ou modelagem ruim sem antes entender a causa.

## Consistência

Operações com múltiplas escritas dependentes devem considerar transação.

Operações críticas devem considerar:

* atomicidade;
* concorrência;
* idempotência;
* rollback;
* constraints;
* consistência após falha.

Especialmente em:

* pagamentos;
* estoque;
* saldo;
* reservas;
* webhooks;
* criação única.

## Idempotência

Operações repetidas que possam gerar duplicidade ou dano devem possuir estratégia de idempotência quando aplicável.

Não dependa apenas do frontend para impedir duplo envio.

## Integrações Externas

Isole integrações atrás de services, clients ou adapters apropriados.

Considere:

* timeout;
* indisponibilidade;
* resposta inválida;
* autenticação;
* rate limit;
* retry;
* backoff;
* idempotência.

Não aplique retry automaticamente em operações com efeitos colaterais sem garantir segurança contra duplicidade.

## Jobs e Filas

Considere processamento assíncrono para tarefas:

* longas;
* pesadas;
* não interativas;
* independentes da resposta imediata;
* sujeitas a retry controlado.

Não introduza filas para operações simples sem benefício real.

## Webhooks

Webhooks devem considerar:

* autenticação/assinatura;
* validação do payload;
* timestamp quando disponível;
* idempotência;
* duplicidade;
* replay;
* processamento fora de ordem.

Nunca considere um webhook confiável apenas porque conhece a URL.

## Auditoria

Operações sensíveis devem registrar, quando necessário:

**quem → fez o quê → em qual recurso → quando → resultado**

Não registre secrets ou dados privados desnecessários.

## Segurança

Endpoints sensíveis devem considerar:

* autenticação;
* autorização;
* ownership;
* rate limiting;
* validação;
* exposição mínima de dados.

Siga obrigatoriamente `security.md` para decisões relacionadas à segurança.

## Organização

Quando a arquitetura da stack permitir, mantenha separados:

* controllers/routes;
* contracts/DTOs;
* services/use cases;
* repositories/data access;
* integrations/clients;
* domain;
* jobs/workers.

Não crie todas essas camadas automaticamente.

Crie separação quando existir responsabilidade real.

Recursos reutilizáveis entre módulos devem seguir as regras de `shared` definidas pela arquitetura do projeto.

## Testes

Priorize testes para:

* regras de negócio;
* contratos;
* autorização;
* persistência crítica;
* integrações;
* idempotência;
* erros;
* fluxos sensíveis.

Siga `testing.md`.

## Critérios de Aceite

Antes de considerar um endpoint relevante concluído, verifique quando aplicável:

* [ ] request validado;
* [ ] autorização validada no backend;
* [ ] regra de negócio fora do controller quando relevante;
* [ ] response contém apenas dados necessários;
* [ ] status HTTP correto;
* [ ] erros seguem padrão da API;
* [ ] Swagger/OpenAPI atualizado;
* [ ] operações críticas possuem consistência adequada;
* [ ] integrações possuem tratamento de falha;
* [ ] testes relevantes foram executados.

## Resultado esperado

A API deve permitir que outro desenvolvedor entenda **como consumir, quais dados enviar, o que receber e quais erros esperar** sem precisar ler sua implementação interna.

[Catálogo de regras](../README.md)
