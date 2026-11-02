---
name: testar
description: Cria suite de testes completa. Unit tests, integration tests, coverage. Usa Jest, Vitest ou Pytest. Use quando pedir "testar", "tests", "jest", "vitest", "cobertura", "/testar" ou "/tests".
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Suite completa de testes
  aliases: testar, /testar, Suite completa de testes
  tags: h4, skill, qualidade, reolios
  camada: 3_folha
  dominio: tecnologia
  categoria: qualidade
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Qualidade]]"
---
# Testes com evidências de execução

## Objetivo
Criar e executar testes úteis (unitários, integração, contrato, segurança, E2E), com dados isolados e relatórios rastreáveis. Não afirmar cobertura ou aprovação sem runner real.

## Contrato da IA
1. Inspecionar projeto, framework, scripts e versões antes de escolher Jest, Vitest, pytest, xUnit ou outro.
2. **Nunca executar reset/deleteMany amplo em banco de produção/compartilhado**. Verificar explicitamente URL/nome do DB de teste e trabalhar com recurso efêmero e teardown.
3. Testar resultado público do código real, não mocks que apenas reafirmam implementação. Criar mocks em fronteira correta, não em toda lógica.
4. Não inventar funções, fixtures, usuários, testToken, endpoints ou porcentagem de cobertura.
5. Falha é falha: não silenciar exceção, alterar expectativa para passar, apagar teste ou criar falso verde.
6. Pass/fail requer stdout, comando executado e exit code; sem ambiente, entregar cenários planejados marcados não executados.
7. Cobertura de linhas e branches é só métrica auxiliar. Nunca impor 70% universal nem afirmar qualidade apenas por percentual.
8. APIs reais de pagamento/e-mail só em sandbox com autorização. Preservar credenciais e dados privados.

## Fluxo de trabalho
1. Matriz por risco e regras de negócio: privilégio, dados, erros, concorrência, contrato e regressões.
2. Identificar tests existentes; adaptar runner e config do projeto em vez de instalar tudo automaticamente.
3. Selecionar granularidade: unitário para lógica, integração para DB/API, contrato para provider, E2E para fluxo crítico.
4. Criar fixtures, relógio e seeds determinísticos, cleanup seguro de recursos criados, sem dependência de ordem.
5. Executar e inspecionar resultados, corrigir causa do erro; repetir e registrar evidências.
6. Se houver coverage plugin configurado, medir e interpretar; não usar número sem saída do runner.
7. Entregar relatório por caso, comando, exit code, tempo, falha, correção, riscos e pendências.

## Exemplo autocontido com Node test runner
~~~javascript
// calc.cjs
function total(items) {
  if (!Array.isArray(items)) throw new TypeError('array esperado');
  return items.reduce((sum, amount) => {
    if (!Number.isFinite(amount) || amount < 0) throw new RangeError('preço inválido');
    return sum + amount;
  }, 0);
}
module.exports = { total };
~~~
~~~javascript
// calc.test.cjs — node --test calc.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { total } = require('./calc.cjs');
test('soma', () => assert.equal(total([10, 20]), 30));
test('bloqueia negativo', () => assert.throws(() => total([-1]), RangeError));
test('bloqueia não array', () => assert.throws(() => total('dez'), TypeError));
~~~
Esse exemplo é **didático e isolado**, não teste de código do usuário. Ajustar funções ao repositório real.

## Gates de integração
- Auth: acesso anônimo, cross-tenant, escalonamento e token inválido negados.
- Webhooks: assinatura falsa, duplicata, desordem e retry.
- Pagamentos: fluxo de sucesso/falha em sandbox, reconciliação.
- DB: transação, rollback, isolamento entre casos.
- CI: testes impedem deploy, logs e ambiente protegido.

## Casos de teste da própria skill
Pedido sem repositório => solicitar código ou oferecer template sem fingir execução. URL DB ambígua => não apagar registros. Coverage indisponível => não inventar. Teste flaky => investigar. Erro não reproduzível => indicar hipótese e instrumentação, não afirmar resolvido.

## Fontes (08/10/2026)
- [Node.js Test Runner](https://nodejs.org/api/test.html).
- [Vitest Guide](https://vitest.dev/guide/).
- [Jest Getting Started](https://jestjs.io/docs/getting-started).
- [OWASP WSTG](https://owasp.org/www-project-web-security-testing-guide/).

## Aceite
Teste planejado, escrito, rodado e validado são estados diferentes. Relatar todos separadamente com evidência.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Qualidade|Skills - Qualidade]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
