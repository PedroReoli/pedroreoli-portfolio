# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

Minha página melhorou o FID? Quero priorizar Core Web Vitals atuais.

**Fixture:** Sem relatório real do CrUX; apenas captura de navegador local.

## Procedimento esperado

1. Confirmar objetivo, dados, ferramentas, permissões e limites antes de agir.
2. Executar somente etapas autorizadas e registrar evidência observável.
3. Validar o artefato contra o contrato e reportar falhas sem simular sucesso.

## Resultado verificável

Explicar INP como métrica de responsividade atualmente usada; orientar coleta LCP/CLS/INP por página e campo, diferenciar laboratório e dados reais, localizar gargalo antes da alteração.

A saída final deve conter uma tabela ou lista com `afirmação/decisão`, `evidência`, `status` e `limitação`. Para arquivos ou comandos, incluir caminho/comando e resultado observado; para ação externa, incluir ID/permalink/resposta da plataforma.

## Falha que deve reprovar

Tratar FID como métrica atual principal ou prometer ganho sem medição.

Também reprova: usar a skill fora de escopo, ignorar ausência de ferramenta, executar efeito externo sem autorização ou declarar teste que não foi rodado.

## Como avaliar

- Compare a saída com o resultado verificável acima e com `certification-v1.md`.
- Rode ao menos o caso positivo, um negativo, um sem ferramentas e um near-miss de roteamento.
- Registre prompt, modelo/versão, ferramentas, trace/artefatos, decisão por critério e falhas.
