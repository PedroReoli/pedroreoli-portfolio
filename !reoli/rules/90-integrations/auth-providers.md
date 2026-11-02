---
tipo: "regra_reolicode"
nome: "Regra — Regra para Provedores de Autenticação OAuth2 e Social Login"
camada: "90-integrations"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","90-integrations"]
hub_pai: "[[REOLI]]"
aliases: ["Regra para Provedores de Autenticação OAuth2 e Social Login"]
---

# Regra para Provedores de Autenticação OAuth2 e Social Login

## Objetivo

Garantir segurança na autenticação social de terceiros (Google, GitHub, Apple, Auth0, Clerk) e vincular identidades externas aos usuários do sistema.

## Regras

* **Proteção contra CSRF no Fluxo OAuth**:
  - Em fluxos OAuth2 / OIDC baseados em redirecionamento, utilize e valide o parâmetro `state` aleatório para prevenir ataques CSRF de autenticação.

* **Validação do Token de Identidade no Backend**:
  - Ao receber um `id_token` do cliente, o backend DEVE validar a assinatura JWT do provedor, o emissor (`iss`) e a audiência (`aud` / Client ID) usando as chaves públicas oficiais do provedor.
  - Nunca aceite a identidade do usuário enviada pelo cliente sem validar o token de identidade no servidor.

* **Vínculo Seguro de Contas**:
  - Só faça a vinculação automática de uma conta social a uma conta existente se o e-mail do provedor for marcado como verificado (`email_verified: true`).
  - Permita que o usuário gerencie e desvincule provedores de acesso em suas configurações de conta.

* **Escopos Mínimos de Permissão**:
  - Solicite apenas os escopos estritamente necessários ao provedor (ex: `openid`, `profile`, `email`).
  - Evite solicitar permissões de leitura/escrita adicionais sem necessidade funcional clara.

[Catálogo de regras](../README.md)
