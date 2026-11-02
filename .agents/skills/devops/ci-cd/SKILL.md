---
name: ci-cd
description: Cria pipelines CI/CD completas com GitHub Actions. Automatiza build, testes, deploy e notificações. Use quando pedir "ci cd", "github actions", "pipeline", "automação deploy", "/ci-cd" ou "/pipeline".
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Pipelines CI/CD completas
  aliases: ci-cd, /ci-cd, Pipelines CI/CD completas
  tags: h4, skill, devops, reolios
  camada: 3_folha
  dominio: tecnologia
  categoria: devops
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Devops]]"
---
# CI/CD — verificações bloqueantes e deploy seguro

## Objetivo
Gerar pipelines reais de build, teste, análise e deploy com aprovação, identidade mínima, rollback e evidência. Para templates de hospedagem e infraestrutura: /deploy. Não disparar pipelines reais ou editar proteções do GitHub sem autorização.

## Contrato de comportamento para IA
1. Detectar stack, lockfile, scripts existentes, runner, branches, plano do GitHub, tipo de deploy e credenciais reais. Nunca declarar comando executado sem saída observada.
2. **CI é gate real de CD:** separar workflow que roda em push não é suficiente para garantir que deploy aguarde testes. Usar dependência \`needs\` do mesmo workflow ou correlação estrita de artefato/check entre workflows.
3. PR não confiável não recebe secrets/credenciais. Evitar \`pull_request_target\` com checkout de código externo; limitar \`permissions\`.
4. Fixar actions externas por **commit SHA completo verificado** em revisão de produção. Não fabricar SHAs; versões por tag em exemplos exigem resolução antes do deploy.
5. Proteção de environment e branch deve ser **configurada e inspecionada**. Declarar environment YAML não garante reviewers.
6. Preferir credenciais curtas OIDC quando provider permitir; \`id-token: write\` apenas no job correspondente.
7. Lint, testes e build devem existir ou ser explicitamente implementados. Nunca usar \`--if-present\` em teste crítico para obter falso verde.
8. Documentar rollback, migrations e backups separados; segredos nunca em logs nem argumentos interpolados de eventos.

## Fluxo
- Inspecionar \`package.json\`, \`npm ci\` com lockfile, Node suportado, matriz de ambiente e suites.
- Desenhar \`PR -> verify\` e \`main -> verify -> [approval environment] -> deploy -> smoke/monitoring\`.
- Fazer checagens estáticas de workflow e executar CI em repositório temporário/local somente quando possível.
- Fazer staging primeiro e registrar ID imutável de artefato. Deploy prod exige autorização do usuário.

## Modelo de workflow GitHub Actions (gate real, SEM comando deploy)
~~~yaml
name: verify-and-deploy
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
permissions:
  contents: read
concurrency:
  group: production-pipeline
  cancel-in-progress: false
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4 # Substituir por SHA verificado
      - uses: actions/setup-node@v4 # Substituir por SHA verificado
        with:
          node-version: '22' # Verificar suporte do app
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
  deploy:
    needs: [verify] # Não roda se verify falhar
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production # Deve ter proteções configuradas
    steps:
      - run: echo "Verificado. Etapa real de deploy ainda não configurada."
        # Substituir apenas após revisar provider, credenciais e rollback
~~~
**Aviso:** o job \`deploy\` acima é placeholder intencional. Não marca aplicativo como publicado. Em projeto sem \`build\` script, definir \`build\` real ou ajustar com justificativa documentada; não esconder falha.

## Segurança, falhas e observabilidade
- Evitar shell interpolation de títulos/bodies de PR; preferir env com escaping e validação.
- Supply chain: dependency review, lockfile, SHA de actions, scanner de segredos/artefatos; relatórios de vulnerabilidades não são prova de ausência de falhas.
- Concurrency adequada a migrações e deploys; cancelar deployment em progresso pode deixar banco em estado intermediário.
- Se deploy falhar: manter logs, alertar, reverter release com procedimento testado; não apagar registros.
- Definir privilégios restritos e gate manual/automatizado conforme ambiente.

## Casos de avaliação
1. PR com teste falhando não alcança deploy; push main com teste falhando não deploya.
2. PR aprovado não deploya (só push em main após CI).
3. Secrets inexistentes ou reviewers não configurados: informar pré-requisito pendente.
4. Falha em build causa job failing, sem falso verde.
5. Validar YAML com parser compatível com chaves de GitHub e execução de CI em sandbox.
6. Testar rollback e artefato consistente antes de produção.
Registrar output de \`npm test\`, job IDs ou "não executado".

## Fontes (08/10/2026)
- [GitHub — Deployment environments](https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments).
- [GitHub — Security/Secure use](https://docs.github.com/en/actions/reference/security/secure-use).
- [GitHub — OIDC](https://docs.github.com/en/actions/reference/security/oidc).
- [GitHub — Deployment control](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments).

## Aceite
Workflow compilável/configurado, gates reais, secrets e permissões revisados, pipeline de teste observada, proteções e rollback documentados. "Pipeline criada" não significa "deploy realizado".

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Devops|Skills - Devops]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
