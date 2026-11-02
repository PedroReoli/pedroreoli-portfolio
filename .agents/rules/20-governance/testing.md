---
tipo: "regra_reolicode"
nome: "Regra — Regra de Testes"
camada: "20-governance"
dominio: "governanca"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","20-governance"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Testes"]
---

# Regra de Testes

## Objetivo

Proteger comportamentos importantes do sistema com testes úteis, rápidos e confiáveis.

Testes existem para detectar regressões e validar contratos, não para aumentar cobertura artificialmente.

## Prioridade

Priorize testes para:

1. regras de negócio;
2. segurança e autorização;
3. cálculos e transformações;
4. persistência e integridade de dados;
5. integrações externas;
6. fluxos críticos do usuário;
7. bugs já encontrados;
8. comportamentos com alto risco de regressão.

Código trivial não precisa de teste apenas para aumentar cobertura.

## Estratégia

Prefira o teste de menor nível capaz de validar o comportamento com confiança.

### Unitário

Use para:

* funções;
* regras;
* validações;
* cálculos;
* transformações;
* hooks ou services isoláveis.

Devem ser rápidos e determinísticos.

### Integração

Use para validar fronteiras entre partes reais do sistema:

* API;
* banco;
* repository;
* filesystem;
* filas;
* serialização;
* services;
* integrações.

Teste principalmente se os contratos entre as partes funcionam corretamente.

### E2E

Reserve principalmente para jornadas críticas:

* autenticação;
* cadastro;
* pagamento;
* checkout;
* fluxos administrativos críticos;
* operações essenciais do produto.

Evite reproduzir em E2E todos os casos já cobertos adequadamente em níveis inferiores.

## Estrutura

Um teste deve deixar claro:

**contexto → ação → resultado esperado**

Teste comportamento observável, não detalhes internos desnecessários da implementação.

Evite testes que quebram apenas porque uma função foi reorganizada sem alterar comportamento.

## Casos

Quando aplicável, valide:

* caminho esperado;
* entrada inválida;
* limites;
* ausência de dados;
* erro;
* permissão negada;
* comportamento concorrente;
* integração indisponível;
* casos relevantes de segurança.

Não crie combinações artificiais sem risco ou valor real.

## Bugs

Ao corrigir um bug relevante:

1. identifique o comportamento incorreto;
2. crie ou ajuste um teste capaz de reproduzi-lo quando viável;
3. aplique a correção;
4. confirme que o teste passa;
5. confirme que testes relacionados continuam passando.

O teste deve impedir que o mesmo comportamento incorreto retorne.

## Segurança

Fluxos sensíveis devem possuir prioridade elevada de validação.

Quando aplicável, teste:

* autenticação;
* autorização;
* ownership;
* acesso entre usuários;
* validação de entrada;
* campos protegidos;
* manipulação de IDs;
* permissões administrativas;
* exposição de dados;
* limites e abuso.

Siga também `security.md`.

## Integrações

Não dependa desnecessariamente de serviços externos reais em testes comuns.

Use mocks, stubs, fakes ou ambientes próprios quando adequado.

Valide contratos importantes separadamente quando necessário.

Nunca execute testes automatizados destrutivos contra produção.

## Dados de Teste

* Não utilize dados pessoais reais sem necessidade autorizada.
* Prefira dados determinísticos.
* Cada teste deve controlar o estado necessário para sua execução.
* Um teste não deve depender da execução anterior de outro.
* Limpe estado persistente criado pelo teste quando necessário.

## Qualidade

Um bom teste deve ser:

* determinístico;
* legível;
* isolado quando possível;
* rápido para seu nível;
* focado em comportamento relevante;
* capaz de indicar claramente o que quebrou.

Evite:

* sleeps arbitrários;
* dependência de ordem;
* mocks excessivos;
* asserts genéricos;
* duplicação entre níveis;
* testes que apenas reproduzem a implementação;
* testes instáveis ignorados permanentemente.

## Falhas

Não altere um teste apenas para fazê-lo passar.

Quando um teste falhar:

1. determine se existe regressão;
2. confirme se o requisito mudou;
3. verifique se o próprio teste está incorreto;
4. corrija a causa adequada.

Nunca remova, ignore ou enfraqueça um teste válido para concluir uma implementação.

## Alterações Existentes

Ao modificar comportamento já coberto:

* execute os testes relacionados;
* preserve testes válidos;
* atualize expectativas somente quando o comportamento esperado realmente mudou.

Não reescreva testes fora do escopo sem necessidade.

## Cobertura

Cobertura é indicador, não objetivo isolado.

Não crie testes sem valor apenas para aumentar percentual.

Código crítico com baixa cobertura merece atenção maior que código trivial sem cobertura.

## Validação Final

Antes de considerar uma alteração relevante concluída:

1. execute os testes relacionados disponíveis;
2. confirme que os novos testes passam;
3. verifique regressões no escopo afetado;
4. informe testes que não puderam ser executados.

Nunca afirme que algo foi testado se o teste não foi realmente executado.

## Resultado esperado

A suíte deve fornecer confiança para alterar o sistema sem regressões, concentrando esforço nos comportamentos de maior valor e risco.

[Catálogo de regras](../README.md)
