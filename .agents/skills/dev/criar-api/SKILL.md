---
name: criar-api
description: Cria APIs completas do zero. Pergunta a stack preferida (Node.js, Python, Go, etc), estrutura o projeto, define rotas, autenticação, banco de dados e documentação. Use quando o usuário pedir "criar API", "montar backend", "desenvolver API REST", "/criar-api" ou "/backend".
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Cria API completa em qualquer stack
  aliases: criar-api, /criar-api, Cria API completa em qualquer stack
  tags: h4, skill, dev, reolios
  camada: 3_folha
  dominio: tecnologia
  categoria: dev
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Dev Eng]]"
---
# Criar API — do contrato ao teste

## Objetivo e acionamento
Criar backend/API REST ou outro contrato explicitamente solicitado. Aplicar a uma aplicação existente sem sobrescrever rotas. **Fronteiras:** /modelar-db define modelo/migrations; /auth-seguranca define identidade e autorização; /security revisa controles; /testar avalia execução; /documentar-api aprofunda OpenAPI. Não habilitar auth fictícia como se fosse segura.

## Contrato para qualquer IA
1. Antes de codificar: confirmar **ferramentas acessíveis**, permissão de escrita, linguagem e versão, package manager, testes, diretório existente, ambiente de DB e endpoints. Não afirmar que implementou ou executou sem evidência.
2. Não exigir perguntas repetidas sobre informações já conhecidas. Se faltar requisito crítico (domínio ou stack), perguntar objetivamente; caso contrário propor suposições explícitas e revisáveis.
3. Segurança é parte do desenho: autenticação **e** autorização por objeto/propriedade/tenant, negação por padrão, validação de entrada/saída, limites de payload/paginação, rate limiting proporcional, falha segura e logs sem segredos.
4. Não presumir que JWT resolve autorização, que ORM elimina toda injeção ou que status 200 prova correção. Validar ownership no servidor e evitar mass assignment.
5. Não expor stack traces, segredos nem dados de outros tenants; parâmetros id e filtro nunca substituem autorização.
6. Não instalar libs, migrar banco nem usar credenciais de produção sem necessidade e autorização. Preferir dependências existentes.
7. APIs são contratos: definir erros (400/401/403/404/409/422/429/5xx), versionamento, esquema OpenAPI, exemplos, idempotência quando relevante e compatibilidade retroativa.
8. Implementação ≠ teste executado ≠ deploy. Separar esses estados no relatório final.

## Etapas de implementação
1. **Descoberta:** propósito, consumidores (SPA, serviço, mobile), dados sensíveis, número de usuários, autenticação, disponibilidade, latência, operação e stack. Inspecionar código preexistente e convenções.
2. **Modelagem de recursos:** entidades, identidade, operações, escopo por tenant, fronteiras de domínio, relacionamentos, invariantes e estados.
3. **Contrato OpenAPI antes do controller:** métodos, paths, input/output schemas, erros por endpoint, paginação/ordenação, filtros permitidos e exemplos.
4. **Segurança por endpoint:** principal autenticado, política ação+objeto, validação body/query/path, escopo do tenant, seleção explícita de campos de retorno, proteção de endpoints administrativos.
5. **Persistência:** transações, índices, N+1, concorrência, retry seguro, migrations não destrutivas e integridade. Sem DB, separar interfaces/mock explicitamente.
6. **Implementação:** handlers finos, serviços de negócio, repositórios, erros tipados, rastreamento/request-id, logs e health checks apropriados.
7. **Testes:** unitário de invariantes, integração da API com auth e tenant, contratos/compatibilidade, erros, concorrência e observabilidade. Sempre reportar comando e resultado.
8. **Entrega:** arquivos reais criados, OpenAPI, README de instalação, variáveis necessárias, exemplos de requisição e lista de pendências.

## Exemplo de contrato, não projeto completo
~~~yaml
openapi: 3.1.0
info:
  title: Pedidos API (exemplo)
  version: 0.1.0
paths:
  /v1/orders/{id}:
    get:
      summary: Consultar pedido autorizado
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string }
      responses:
        '200': { description: Pedido do tenant autorizado }
        '401': { description: Não autenticado }
        '403': { description: Sem permissão }
        '404': { description: Não encontrado }
        '500': { description: Falha interna }
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
~~~
**Exemplo incompleto intencionalmente:** falta schema de resposta, store, autenticação e verificação das roles/tenants. Não o tratar como API pronta.

## Matriz de testes sugerida
| Caso | Passo | Esperado |
|---|---|---|
| Autenticado autorizado | GET do próprio pedido | 200 e campos permitidos |
| Usuário de outro tenant | GET por ID conhecido | 403 ou 404 conforme política, sem dados |
| Sem token | GET | 401 |
| Mass assignment | POST com role/tenant extra | rejeitar ou ignorar explicitamente |
| Payload inválido | POST malformado/grande | erro definido, sem side effect |
| Criação repetida | requests com idempotency key quando aplicável | sem efeito de negócio duplicado |
| Falha DB | timeout/conexão indisponível | erro controlado, logs sem dados sensíveis |

## Autoverificação da skill
- [ ] A IA escolheu uma stack **verificada**, não presumida?
- [ ] Endpoints e schema têm exemplos de erro e autorização por objeto?
- [ ] Código usa dependências realmente existentes?
- [ ] Dados sensíveis não aparecem no log/retorno?
- [ ] Testes de execução são comprovados por saída, não pela intenção?
- [ ] README e OpenAPI correspondem a arquivos efetivamente gerados?
- [ ] Não houve alteração de produção sem permissão?

## Fontes de referência consultadas em 08/10/2026
- [OWASP API Security Top 10 2023](https://api-security.owasp.org/editions/2023/en/0x11-t10/): BOLA, autenticação, propriedades, consumo de recursos.
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html): estrutura de contratos e semântica.
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html): negação por padrão e checagens por objeto.
- [Agent Skills skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md): evals com e sem skill e melhorias iterativas.
- Relatos comunitários sobre avaliação de skills: [Reddit ClaudeCode](https://www.reddit.com/r/ClaudeCode/comments/1wlkcbx/skills_are_the_new_code_evals_discussion/) — **anedótico, não evidência normativa**.

## Critério de aceite
Apenas reportar "API validada" após build, testes negativos, regras de autorização e contrato executados no ambiente alvo. Caso contrário: **instrução modernizada, implementação pendente**.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
