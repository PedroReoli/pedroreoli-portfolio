---
name: auth-seguranca
description: Padrões e práticas de autenticação (JWT, OAuth, RBAC).
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Autenticação e Autorização (Implementação)
  aliases: auth-seguranca, /auth-seguranca, Autenticação e Autorização (Implementação)
  tags: h4, skill, dev, reolios
  camada: 3_folha
  dominio: tecnologia
  categoria: dev-eng
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Dev Eng]]"
---
# Autenticação, sessão e autorização por recurso

## Objetivo
Planejar e implementar login, identidade, sessão, refresh, OAuth/OIDC, RBAC/ABAC e proteção de recursos em uma stack real. Auditoria de vulnerabilidades separada: /audit; hardening geral: /cyber-defense.

## Contrato comportamental para IA
1. Verificar stack, framework, versão, provedor de identidade existente, usuários, banco, requisitos regulatórios e sessão browser/mobile/API. Não inventar bibliotecas ou atributos no request.
2. Autenticação não é autorização. **Toda ação verifica recurso e tenant no servidor**, com deny-by-default, mesmo se o JWT trouxer role.
3. Preferir biblioteca consolidada e mantida a criar autenticação proprietária sem necessidade. Não tratar snippet curto como sistema completo.
4. Para senha, hash adaptativo com salt (Argon2id preferencial, configuração revisada; alternativas por requisito); jamais plaintext, SHA256 puro ou logs de senha.
5. Sessão web: preferir cookies HttpOnly, Secure e SameSite apropriado, TLS integral, renovação controlada e proteção CSRF segundo fluxo. Não prometer que cookie sozinho elimina XSS.
6. Para OAuth2/OIDC: state, nonce onde aplicável, PKCE, verificação completa de issuer/audience/algoritmo/assinatura e callback confiável; não tratar access token como ID token.
7. Refresh tokens: armazenamento seguro, rotação, detecção de reutilização, revogação, logout e limpeza de sessões. JWT não vira revogável apenas por ter expiração.
8. Respostas sem enumeração de contas, rate limit antifraude, MFA quando risco exigir. Não publicar sistema sem testes adversariais.
9. Nunca executar ações administrativas/produção sem autorização; não dizer que fez pentest sem ambiente de teste.

## Análise prévia
Definir identidades, tenant, papéis, permissões granulares, autenticação externa/interna, fluxos de registro e recuperação, duração de sessão, fator MFA e plano de migração.

## Arquitetura recomendada
- Identity provider ou auth library compatível, storage de identidades e sessões.
- Separar middleware authenticate (quem?) de authorize(action, resource, tenant) (pode?).
- Validar token: algoritmo allowlist, issuer, audience, exp/nbf, type, assinatura, key rotation e revogação quando exigido.
- Construir políticas por ação e recurso; evitar role unicamente no browser como autorização.
- Consultar associação real user x tenant, ownership e estados do recurso dentro de transação quando aplicável.
- Login/refresh/logout/reset com token de uso único e rastreamento de sessão; refresh rotation.
- Acesso negado genericamente, logging estruturado sem token, métricas de abuso e alertas.

## Exemplo de autorização (pseudocódigo dependente da aplicação)
~~~typescript
async function canReadOrder(principal: Principal, orderId: string) {
  if (!principal?.id || !principal.tenantId) return false;
  const order = await db.order.findFirst({
    where: { id: orderId, tenantId: principal.tenantId }
  });
  if (!order) return false;
  return await policyEngine.permit(principal, 'orders:read', order);
}
~~~
**Não compila isoladamente:** Principal, db e policyEngine são interfaces do projeto a definir. O exemplo ensina a checar escopo de tenant e permissão de ação; não substitui validação de objeto e contexto. Não usar filtro por userId como regra universal que ignora papéis autorizados.

## Testes de regressão e abuso
- Sem token, token expirado, assinatura forjada, issuer/audience incorretos e token trocado.
- Usuário A acessa pedido do tenant B e tenta elevar role => acesso negado.
- Sessão revogada/refresh reutilizado não recebe nova sessão; logout invalida conforme política.
- Cookies SameSite/CSRF e cookies inseguros em HTTP; MFA e recuperação com token expirado.
- Registros de log sem credencial; limite e resposta para brute force e enumeração.
- Falta de suporte real da biblioteca => adaptar; nunca inventar que MFA/refresh estão implementados.

## Fontes (consulta 08/10/2026)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html).
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).
- [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).
- [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).
- [OAuth 2.0 Security Best Current Practice (RFC 9700)](https://www.rfc-editor.org/rfc/rfc9700).

## Aceite
Política definida, middleware real testado com usuários/tenants distintos, sessão/refresh/revogação auditados, riscos documentados. Sem teste de integração: modernizada documentalmente, implementação pendente.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
