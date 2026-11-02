# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

- **Caso 1:** Reduced motion ativo: elementos continuam compreensíveis.

## Procedimento esperado

1. Definir quais mudanças de estado dependem de scroll e oferecer navegação clara sem animação.
2. Preferir IntersectionObserver/ScrollTimeline conforme suporte real, evitando listeners pesados e layout thrashing.
3. Garantir reduced-motion, navegação de teclado, foco e alternativa sem JS para conteúdo essencial.
4. Medir INP/LCP/CLS e verificar em dispositivos/tamanhos, inclusive rolagem rápida e restore.
- **Caso 1:** Reduced motion ativo: elementos continuam compreensíveis.
- **Caso 2:** Scroll muito rápido: conteúdo não desaparece para sempre.
- **Caso 3:** Device lento: medir frames e permitir fallback estático.
- **Sem acesso:** simular ausência da ferramenta principal e verificar se a IA declara limitação, em vez de alegar sucesso.

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
