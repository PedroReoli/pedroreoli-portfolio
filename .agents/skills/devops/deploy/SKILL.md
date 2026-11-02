---
name: deploy
description: Cria scripts e configurações para deploy. Vercel, Railway, AWS, Docker, Fly.io. Use quando pedir "deploy", "production", "hosting", "/deploy" ou "/publicar".
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Configuração completa de deploy
  aliases: deploy, /deploy, Configuração completa de deploy
  tags: h4, skill, devops, reolios
  camada: 3_folha
  dominio: tecnologia
  categoria: devops
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Devops]]"
---
# Deploy auditável — planejamento, publicação e recuperação

## Objetivo
Preparar deploy reproduzível em Vercel, Railway, Docker, Fly, AWS ou outra plataforma **sem segredos no código, sem senha padrão e sem afirmar publicação antes de verificação**. Pipeline: /ci-cd.

## Contrato para qualquer IA
1. Verificar stack, ambiente, arquivos existentes, build/start, infraestrutura, Docker, DNS/TLS, banco e acesso real à plataforma. Sem acesso, só propor arquivos e passos.
2. **Não executar deploy, migrations destrutivas ou reinicializar serviço sem autorização.** Planejar rollback e janela de manutenção.
3. Gerar template específico baseado no repositório e provider atual, não reciclar Vercel como se fosse Docker.
4. Segredos somente em gerenciador da plataforma, nunca arquivo versionado, ARG/ENV de build nem password=password.
5. DB/Redis com usuários de menor privilégio, redes privadas, backup comprovado e migrations versionadas.
6. CORS não deve permitir wildcard com credenciais; validar origens, cookies, CSRF e autenticação.
7. Cache immutable apenas em assets com versão/hash; não em HTML nem APIs dinâmicas.
8. Diferenciar proposta, build testado, deploy feito, health e smoke confirmados. Sem output real, status é não verificado.

## Procedimento
1. Detectar framework, scripts npm, lockfile, portas, extensões nativas, serviços, região, storage e requisitos de disponibilidade.
2. Selecionar provider por limites, custos, persistência e rollback; explicar custo de operação e trade-offs.
3. Produzir arquivos manifest/compose/provider, Dockerignore, secrets e health check adaptados ao projeto.
4. Gate CI aprovado no mesmo código/artefato. Revisar plano de DB backup/migration e comunicação de incidente.
5. Publicar apenas com aprovação. Registrar release ID, logs, horário e health checks.
6. Smoke tests com dados de teste; monitorar erros, latência, DB e disponibilidade. Nunca exibir chaves em health.

## Dockerfile de referência para Node compilado em dist/server.js
~~~dockerfile
# Conferir tag Node LTS e pin de digest antes de produção
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
~~~
**Escopo estrito:** só funciona se build gerar dist/server.js, scripts existirem e artefatos estarem corretos. Next.js standalone requer Dockerfile diferente. Em .dockerignore excluir .env*, .git, node_modules, chaves e dados privados sem excluir artefato necessário. Não copiar credencial num exemplo real.

## Health e rollback
- /health/live confirma apenas processo, sem dependências pesadas.
- /health/ready verifica DB/filas críticos com timeout e retorna 503 quando inapto.
- Versão publicada é artefato imutável; rollback requer release anterior disponível e migrations compatíveis.
- Se migração não reversível, exigir plano de expansão/contração e recuperação de dados, não simples downgrade.

## Casos de teste
- Build e start de projeto real geram processo e health 200/503 conforme condição.
- Sem secrets, falha segura; banco off deixa readiness 503.
- Configuração que não encontra artefato após build falha; sem falso verde.
- Testar CORS com origem indevida, HTTPS e cookies.
- Reverter versão com rollback em ambiente descartável; produzir registro de execução.
- Sem acesso ao provider, não afirmar que realizou deploy.

## Fontes (consulta 08/10/2026)
- [Docker Build best practices](https://docs.docker.com/build/building/best-practices/).
- [Docker Build secrets](https://docs.docker.com/build/building/secrets/).
- [Vercel Deployments](https://vercel.com/docs/deployments).
- [Railway Deployments](https://docs.railway.com/deployments).
- [GitHub Deployment Environments](https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments).
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html).

## Aceite
Deploy implementável, testes, readiness, segredos, release e rollback verificados. "Escrevi Dockerfile" não significa "publicado".

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Devops|Skills - Devops]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
