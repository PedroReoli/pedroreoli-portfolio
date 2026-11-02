---
tipo: "regra_reolicode"
nome: "Regra — Regra de Banco de Dados"
camada: "40-stack"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","40-stack"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Banco de Dados"]
---

# Regra de Banco de Dados

## Objetivo

Manter dados consistentes, seguros e eficientes, com modelagem orientada ao domínio e alterações previsíveis.

## Modelagem

* Modele o banco pelo domínio, não pela conveniência momentânea da interface.
* Use tipos adequados para representar os dados.
* Utilize `NOT NULL`, `UNIQUE`, `CHECK`, `FOREIGN KEY` e outras constraints quando representarem invariantes reais.
* Não dependa apenas da aplicação para garantir integridade que o banco pode garantir.
* Evite campos genéricos quando existir estrutura de domínio clara.
* Evite redundância sem necessidade técnica mensurável.

## Fonte de Verdade

Defina claramente onde cada regra é garantida:

* banco;
* aplicação;
* ou ambos.

Regras críticas de integridade devem possuir proteção na camada apropriada mesmo quando a interface já realiza validação.

Não duplique regra complexa entre aplicação e banco sem necessidade.

## Consultas

* Selecione apenas dados necessários.
* Evite N+1.
* Evite consultas repetidas sem necessidade.
* Não carregue tabelas grandes integralmente para filtrar na aplicação.
* Utilize paginação para conjuntos potencialmente grandes.
* Evite joins sem propósito claro.
* Prefira consultas previsíveis e legíveis.

Consulta pesada deve ser analisada antes de ser considerada otimizada.

Quando necessário, avalie plano de execução, cardinalidade, índices e volume real.

## Índices

Considere índices para colunas utilizadas frequentemente em:

* filtros;
* joins;
* ordenação;
* busca;
* ownership;
* constraints;
* relacionamentos.

Não crie índices indiscriminadamente.

Antes de adicionar, considere:

**frequência da consulta → seletividade → custo de escrita → espaço → benefício esperado**

Índice deve resolver um padrão real de acesso.

## Transações

Utilize transação quando múltiplas operações precisarem ocorrer como uma unidade atômica.

Especialmente em:

* pagamentos;
* estoque;
* saldo;
* reservas;
* movimentações;
* alterações relacionadas.

Falha parcial não deve deixar estado inconsistente.

## Concorrência

Operações críticas devem considerar execução simultânea.

Quando necessário, utilize:

* constraints;
* transações;
* operações atômicas;
* locking apropriado;
* controle de versão;
* idempotência.

Não dependa apenas de:

**consultar → verificar → alterar**

quando outra operação puder modificar o mesmo dado entre essas etapas.

## Migrations

Alterações de schema devem ser versionadas e reproduzíveis.

Antes de migration destrutiva, avalie impacto sobre dados existentes.

Considere destrutivas:

* remover tabela;
* remover coluna;
* alterar tipo incompatível;
* tornar campo obrigatório com dados existentes;
* modificar constraint;
* renomear estruturas consumidas externamente.

Não execute migration destrutiva fora do escopo aprovado.

Quando necessário, prefira evolução em etapas:

**adicionar → migrar dados → atualizar aplicação → validar → remover legado**

## Produção

Nunca presuma que alteração segura em desenvolvimento será segura com dados reais.

Antes de operações relevantes, considere:

* volume;
* locks;
* duração;
* compatibilidade;
* rollback;
* backup;
* impacto em versões existentes da aplicação.

Não execute limpeza, truncate, drop ou alteração massiva sem autorização explícita.

## Segurança

* Utilize princípio de menor privilégio.
* Não exponha credenciais do banco ao frontend.
* Não registre connection strings ou secrets.
* Queries dinâmicas devem utilizar parametrização adequada.
* Valide autorização antes de retornar dados privados.

Siga também `security.md`.

## Supabase / PostgreSQL

Quando utilizar Supabase:

* habilite RLS em tabelas expostas que exijam controle de acesso;
* escreva policies considerando papel, ownership e tenant;
* trate `service_role` como credencial privilegiada exclusivamente de ambiente confiável;
* nunca exponha `service_role` no frontend;
* configure policies específicas para Storage;
* revise funções e triggers que possam alterar fronteiras de autorização.

Não considere RLS corretamente configurado apenas porque está habilitado.

Valide efetivamente os acessos permitidos e negados.

## Views, Functions e Triggers

Utilize quando houver benefício claro de:

* encapsulamento;
* consistência;
* performance;
* reutilização;
* atomicidade.

Não esconda regra de negócio importante em trigger sem documentação adequada.

Funções privilegiadas devem receber atenção adicional de segurança.

## Cache e Materialização

Não utilize cache, view materializada ou duplicação de dados antes de entender o gargalo.

Quando utilizados, defina:

* origem da verdade;
* atualização;
* invalidação;
* tolerância a dados desatualizados.

## Backup e Recuperação

Dados importantes devem possuir estratégia de backup adequada ao ambiente.

Alterações destrutivas relevantes devem considerar possibilidade real de recuperação.

Backup sem processo verificável de restauração não deve ser tratado como garantia suficiente.

## Validação

Para alteração relevante no banco, valide quando aplicável:

* [ ] schema representa corretamente o domínio;
* [ ] constraints necessárias existem;
* [ ] relacionamentos possuem integridade;
* [ ] consulta utiliza somente dados necessários;
* [ ] índices possuem justificativa;
* [ ] concorrência foi considerada;
* [ ] transação existe quando necessária;
* [ ] migration é reproduzível;
* [ ] dados existentes permanecem compatíveis;
* [ ] autorização permanece correta;
* [ ] rollback ou recuperação foi considerado.

## Resultado esperado

O banco deve proteger a integridade dos dados, suportar crescimento previsível e permitir evolução sem depender de correções frágeis exclusivamente na aplicação.

[Catálogo de regras](../README.md)
