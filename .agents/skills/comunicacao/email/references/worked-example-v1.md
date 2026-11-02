# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

Enviar e-mail transacional com nome do usuário e retry após timeout.

**Fixture:** Nome do usuário contém tag HTML e o primeiro disparo pode ter sido aceito pelo provedor.

## Procedimento esperado

1. Identificar tipos de e-mail e gatilho de negócio; escolher provedor segundo requisitos, região, limites, custo, API e observabilidade.
2. Configurar segredo no ambiente, domínio de envio, SPF/DKIM/DMARC e endereço From/Reply-To legítimos.
3. Criar templates acessíveis: HTML escapado, versão text, alt em imagens, assunto claro, locale e valores verificáveis.
4. Persistir evento de e-mail com chave de deduplicação e estado; worker gerencia retry/backoff, limite de taxa e callbacks assinados.
5. Separar fluxo transacional do marketing, respeitando lista de supressão e direitos aplicáveis.
6. Testar sandbox, bounces, dados inválidos, falha 429/500, reset expirado e idempotência; registrar ids/recebimento observados.

## Resultado verificável

Escapar HTML, sanitizar conteúdo, template acessível, deduplicar por message/business event ID, retry com backoff, status incerto separado de falha, SPF/DKIM/DMARC conferidos.

A saída final deve conter uma tabela ou lista com `afirmação/decisão`, `evidência`, `status` e `limitação`. Para arquivos ou comandos, incluir caminho/comando e resultado observado; para ação externa, incluir ID/permalink/resposta da plataforma.

## Falha que deve reprovar

Interpolar nome sem escape e enviar segunda vez sem verificar ID.

Também reprova: usar a skill fora de escopo, ignorar ausência de ferramenta, executar efeito externo sem autorização ou declarar teste que não foi rodado.

## Como avaliar

- Compare a saída com o resultado verificável acima e com `certification-v1.md`.
- Rode ao menos o caso positivo, um negativo, um sem ferramentas e um near-miss de roteamento.
- Registre prompt, modelo/versão, ferramentas, trace/artefatos, decisão por critério e falhas.
