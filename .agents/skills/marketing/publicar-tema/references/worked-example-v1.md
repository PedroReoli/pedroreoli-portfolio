# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

- **Caso 1:** Usuário pede apenas calendário: não publicar.

## Procedimento esperado

1. Pesquisar tema e fontes; produzir tese e evidências originais antes de gerar variantes.
2. Criar versão longa e derivados adequados a LinkedIn, blog e redes, sem simples cópia massiva.
3. Passar por revisão de fatos, LGPD, marcas e aprovação humana antes de enviar.
4. Agendar/publicar somente via ferramentas disponíveis e registrar post IDs e status.
5. Confirmar quais derivados são desejados; artigo, carrossel e legendas são módulos opcionais, não um pacote obrigatório.
6. Para carrossel, localizar a skill pelo catálogo (`carrossel` ou `carrossel-instagram`) e usar seu caminho canônico em `.agents/skills/`; se não estiver disponível no host, entregar briefing sem fingir renderização.
- **Caso 1:** Usuário pede apenas calendário: não publicar.
- **Caso 2:** Publicação parcial em um canal: reportar status por canal.

## Resultado verificável

Produzir o artefato definido no contrato, com premissas, evidências, limitações, validações executadas e próximos passos.

A saída final deve conter uma tabela ou lista com `afirmação/decisão`, `evidência`, `status` e `limitação`. Para arquivos ou comandos, incluir caminho/comando e resultado observado; para ação externa, incluir ID/permalink/resposta da plataforma.

## Falha que deve reprovar

Não inventar dados, capacidades, execução, aprovação, publicação ou resultado.

Também reprova: usar a skill fora de escopo, ignorar ausência de ferramenta, executar efeito externo sem autorização ou declarar teste que não foi rodado.

## Como avaliar

- Compare a saída com o resultado verificável acima e com `certification-v1.md`.
- Rode ao menos o caso positivo, um negativo, um sem ferramentas e um near-miss de roteamento.
- Registre prompt, modelo/versão, ferramentas, trace/artefatos, decisão por critério e falhas.
