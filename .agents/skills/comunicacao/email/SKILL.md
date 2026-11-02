---
name: email
description: Projeta e implementa e-mail transacional com templates seguros, idempotência, entrega observável e provedores como Resend ou SendGrid. Use para recibos, alertas, boas-vindas e redefinição de senha; não use para newsletter ou marketing em massa.
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Sistema completo de email transacional
  aliases: email, /email, Sistema completo de email transacional
  tags: h4, skill, comunicacao, reolios
  camada: 3_folha
  dominio: operacao
  categoria: comunicacao
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Comunicacao]]"
---
# Email transacional seguro e observável

## Objetivo
Enviar e-mails operacionais (boas-vindas, redefinição de senha, recibos, alertas) com templates seguros, validação de domínio, proteção contra duplicatas, privacidade e tratamento de entrega. Mensagem de marketing segue consentimentos, opt-out e regras próprias.

## Contrato para qualquer IA
1. Confirmar provider real (SMTP/Resend/SES/SendGrid), DNS, domínio, sandbox, API, logs, fila e permissão de disparo. Não afirmar que mandou e-mail sem ID/status observados.
2. Tratar strings de nome/produto como entrada não confiável. **Escapar HTML, atributos e URLs**, ou usar renderer/framework seguro. Nunca interpolar HTML do usuário diretamente.
3. Token de redefinição: gerado por CSPRNG, armazenado como hash, curta validade real no backend, single-use, rate-limit e resposta que não enumera e-mails. O texto "expira" no template não implementa expiração.
4. Não colocar senha, token, dados pessoais ou link de redefinição em logs/analytics; exigir HTTPS e validar domínio do link do app.
5. Diferenciar API aceitou mensagem, entregou ao MX, abriu, clicou e bounce; cada evento tem semântica distinta.
6. Fila: inserir evento em banco e reservar trabalho com lease/transação; deduplicar localmente, usar idempotency key do provider **se suportado**; retry limitado, DLQ e supressão de bounced/unsubscribed.
7. SPF/DKIM/DMARC, domínio verificado e reputação importam, mas autenticação não garante inbox. Preços/limites devem ser consultados no plano vigente.
8. Não disparar e-mail de teste para terceiros ou configurar DNS em produção sem autorização.

## Workflow
1. Identificar tipos de e-mail e gatilho de negócio; escolher provedor segundo requisitos, região, limites, custo, API e observabilidade.
2. Configurar segredo no ambiente, domínio de envio, SPF/DKIM/DMARC e endereço From/Reply-To legítimos.
3. Criar templates acessíveis: HTML escapado, versão text, alt em imagens, assunto claro, locale e valores verificáveis.
4. Persistir evento de e-mail com chave de deduplicação e estado; worker gerencia retry/backoff, limite de taxa e callbacks assinados.
5. Separar fluxo transacional do marketing, respeitando lista de supressão e direitos aplicáveis.
6. Testar sandbox, bounces, dados inválidos, falha 429/500, reset expirado e idempotência; registrar ids/recebimento observados.

## Exemplo autocontido: escape HTML de valores textuais
~~~javascript
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;'
  })[ch]);
}
function welcomeHtml(name) {
  return '<p>Olá, ' + escapeHtml(name) + '!</p>';
}
module.exports = { escapeHtml, welcomeHtml };
~~~
Isso protege **conteúdo textual** no contexto HTML exemplificado, não URL/CSS/JS arbitrários. Para links de ação, construir URL por host fixo aprovado, token validado e codificação apropriada; não concatenar URL não confiável diretamente.

## Idempotência
Resend suporta idempotencyKey em chamadas de envio (janela documentada de 24h); **não é substituto** de deduplicação durável local. Chave deve ser estável por evento de negócio (ex.: welcome:userId:version) e nunca única global para todos. Não reenviar e-mail já confirmado como enviado ao provedor só porque receipt demorou.

## Testes da skill
- Nome com <script> não injeta HTML e versão text preserva sentido.
- Reset não é reutilizável, token expirado falha no **servidor**, e contas inexistentes não são reveladas.
- Mesmo evento em fila duas vezes => efeito único ou explicação transparente de at-least-once.
- Rate-limit/bounce/falha SMTP => retry controlado e estado correto.
- SPF/DKIM/DMARC realmente verificados antes de alegar entrega. Sem acesso, reportar pendente.

## Fontes (08/10/2026)
- [Resend — Idempotency keys](https://resend.com/changelog/idempotency-keys).
- [Resend — API](https://resend.com/docs/api-reference/emails/send-email).
- [OWASP — Forgot password](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html).
- [OWASP — XSS prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).
- [Google — Email sender guidelines](https://support.google.com/a/answer/81126).

## Aceite
Provar testes, proteção de token, HTML seguro, assinatura de retorno, idempotência, logs e consentimento quando aplicável. Toda proposta ou plano deve registrar SPF, DKIM e DMARC como `verificado`, `pendente` ou `não aplicável`; omitir esse estado reprova a entrega. Configurar template não significa entrega bem-sucedida.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Comunicacao|Skills - Comunicacao]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
