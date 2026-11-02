---
tipo: "regra_reolicode"
nome: "Regra — Regra de Tratamento de Erros"
camada: "20-governance"
dominio: "governanca"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","20-governance"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Tratamento de Erros"]
---

# Regra de Tratamento de Erros

## Objetivo

Garantir que falhas sejam detectadas, registradas e comunicadas de forma previsível, segura e útil.

## Princípios

* Não ignore erros silenciosamente.
* Não transforme falha em sucesso aparente.
* Trate o erro na camada que possui contexto suficiente para decidir o que fazer.
* Preserve a causa original quando o erro precisar ser propagado.
* Diferencie falhas esperadas de falhas inesperadas.

## Tratamento

Ao ocorrer uma falha, determine:

1. O que falhou.
2. Se a operação pode continuar.
3. Se existe recuperação segura.
4. O que precisa ser registrado.
5. O que deve ser comunicado ao usuário.

Não utilize `try/catch` apenas para impedir que o erro apareça.

Evite `catch` vazio ou tratamento que descarte a causa da falha.

## Propagação

Trate localmente quando existir uma ação concreta de recuperação.

Caso contrário, propague o erro para a camada responsável.

Ao encapsular um erro, preserve contexto suficiente para diagnóstico.

Não replique tratamento idêntico em várias camadas.

## Mensagens ao Usuário

Mensagens devem:

* explicar de forma simples que a operação falhou;
* indicar uma ação possível quando existir;
* evitar detalhes técnicos desnecessários;
* não expor stack trace, query, token, credencial ou dado sensível.

Erro técnico e mensagem apresentada ao usuário são responsabilidades diferentes.

## Logs

Registre contexto útil para diagnóstico, como:

* operação executada;
* etapa que falhou;
* identificadores técnicos seguros;
* causa do erro;
* integração envolvida quando aplicável.

Nunca registre senhas, tokens, secrets ou dados sensíveis desnecessários.

## Integrações

Falhas em integrações opcionais não devem derrubar funcionalidades independentes.

Para integrações externas, considere quando aplicável:

* timeout;
* indisponibilidade;
* resposta inválida;
* falha de autenticação;
* limite de requisições;
* recuperação ou retry seguro.

Não implemente retry automaticamente quando a operação puder gerar duplicidade ou efeito colateral.

## Estado

Após uma falha, o sistema deve permanecer em estado consistente.

Não deixe:

* loading infinito;
* estado parcial apresentado como concluído;
* transação incompleta sem tratamento;
* UI indicando sucesso após falha;
* dados temporários inválidos afetando próximas operações.

## Validação

Ao implementar tratamento de erro, valide pelo menos:

**falha → captura adequada → estado consistente → registro seguro → mensagem correta**

## Resultado esperado

O sistema deve falhar de forma controlada, sem esconder problemas, expor informações sensíveis ou comprometer funcionalidades não relacionadas.

[Catálogo de regras](../README.md)
