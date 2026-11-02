---
name: security
description: Implementa segurança completa em APIs e sistemas. Baseado no OWASP Top 10, cobre autenticação JWT, autorização, proteção contra SQL injection, XSS, CSRF, rate limiting, headers de segurança e mais. Use quando pedir "segurança", "implementar auth", "proteger API", "/security" ou "/auth-seguro".
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Implementação completa de segurança
  aliases: security, /security, Implementação completa de segurança
  tags: h4, skill, dev, reolios
  camada: 3_folha
  dominio: tecnologia
  categoria: dev
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Dev Eng]]"
---
# Security — implementação de controles por ameaça

## Responsabilidade
Aplicar práticas de segurança no código real: autorização por recurso, consultas seguras, exposição de dados, SSRF, XSS, CSRF, headers, logs, rate limit, secrets e uploads. Especialidades: **/auth-seguranca** faz login/sessão/roles; **/cyber-defense** faz threat modeling/hardening; **/audit** investiga achados de código. Esta skill foca implementação controlada e testes de regressão.

## Contrato da IA
1. Validar capacidade real de ler código, instalar dependências, rodar testes e realizar alterações. Sem acesso, entregar plano/pseudocódigo sem declarar correção aplicada.
2. Classificar cada achado por: superfície, pré-condição, ameaça, dado impactado, probabilidade, severidade justificada e prova reproduzível. Vulnerabilidade hipotética ≠ incidente confirmado.
3. Aplicar **authorization by object/action/tenant** no backend, deny-by-default, não confiar em `userId` de input, role em JWT ou botão oculto no browser.
4. Queries parametrizadas e validação de entrada adequada; encode de saída no contexto HTML/JS/URL e CSP complementar. "Sanitizar tudo" é impreciso e não garante prevenção de SQLi/XSS.
5. SSRF exige allowlist, revalidação de DNS/IP no momento de conexão, proteção a redirects/IPv6/metadata e controles de egress. Regex de endereço não basta.
6. CSRF depende de credenciais anexadas automaticamente (cookies/session) e política SameSite; JWT Bearer no header não equivale automaticamente a cookie. Conferir arquitetura.
7. Rate limits, durações e regras de senha são configurados por risco e evidência, não `5 tentativas` como regra fixa. Preferir MFA e detecção de abuso para cenários críticos.
8. Proteger segredos em secret manager, nunca registrar tokens, senhas ou body completo; não executar scanners invasivos contra sistemas terceiros sem autorização.
9. Usar teste antes/depois para comprovar correção, não apenas incluir pacote Helmet e declarar "seguro".
10. Manter compatibilidade do sistema e plano de rollback; não alterar auth/infra de produção sem aprovação.

## Matriz para cada endpoint
| Campo | Pergunta |
|---|---|
| Identidade | Quem está autenticado? |
| Autorização | Qual ação sobre qual recurso e tenant? |
| Propriedades | Quais campos podem ser lidos/escritos por esta role? |
| Entrada | Tipo, tamanho, formato, coercão, query e multipart? |
| Saída | Projeção explícita, escape contextual, dados sensíveis? |
| Limites | Taxa, paginação, payload, timeout, concorrência? |
| Segredos | Chave/token/PII em logs e erros? |
| Recuperação | Falha segura, alerta e efeito transacional? |

## Workflow
1. Ler arquitetura e versões de SDK/framework, identificar trust boundaries e rotas críticas.
2. Criar uma ou mais hipóteses de ataque; reproduzir **em ambiente permitido** com teste negativo (sem tocar terceiros).
3. Escolher remediação mínima; validar libs e docs antes de alterar.
4. Escrever teste de regressão que falha antes e passa depois, incluindo caminhos legítimos.
5. Aplicar correção, executar runner, checar que logs/headers/DB não vazam segredo ou tenant.
6. Registrar evidência, risco residual, limitação, plano de monitoramento e rollback.

## Exemplo de autorização (pseudocódigo que depende do app)
~~~typescript
const record = await db.order.findFirst({
  where: { id: params.orderId, tenantId: principal.tenantId }
});
if (!record || !(await policy.can(principal, 'read', record))) {
  return res.status(404).json({error: 'Não encontrado'});
}
return res.json({ id: record.id, status: record.status });
~~~
`principal`, `policy`, `db` e `res` são integrações do projeto; o trecho **não compila isoladamente**. Não incluir dados financeiros/sensíveis sem revisão do escopo de acesso.

## Avaliações obrigatórias
- Anônimo, usuário de outro tenant, usuário com role limitada, admin autorizado.
- Campo extra `role`/`tenantId` em POST não concede privilégio.
- Payloads XSS, SQLi, SSRF e uploads hostis em ambiente autorizado.
- Falha de autenticação/DB não retorna informações pessoais.
- Cookies/cross-origin conforme arquitetura real, headers verificados em HTTP.
- Falso positivo de scanner documentado com linha, evidência e justificativa.

## Fontes verificadas em 08/10/2026
- [OWASP API Top 10](https://api-security.owasp.org/editions/2023/en/0x11-t10/): BOLA, auth e consumo de recursos.
- [OWASP Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html): negação por padrão e teste de permissão.
- [OWASP SSRF](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html): defesa em camadas.
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html): escape por contexto.
- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html): cookies e tokens.
- [GitHub Skill Creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md): ciclo de avaliação e regressão.

## Aceite
Só concluir remediação quando o teste do ataque anteriormente reproduzido falhar de modo correto, testes legítimos passarem e risco residual estiver documentado. Sem execução: **instruções prontas, aplicação ainda não validada**.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
