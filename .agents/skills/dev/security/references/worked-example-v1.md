# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

Fazer threat model preliminar para API multi-tenant.

**Fixture:** Há RBAC, JWT e arquivos enviados por usuários.

## Procedimento esperado

1. Ler arquitetura e versões de SDK/framework, identificar trust boundaries e rotas críticas.
2. Criar uma ou mais hipóteses de ataque; reproduzir **em ambiente permitido** com teste negativo (sem tocar terceiros).
3. Escolher remediação mínima; validar libs e docs antes de alterar.
4. Escrever teste de regressão que falha antes e passa depois, incluindo caminhos legítimos.
5. Aplicar correção, executar runner, checar que logs/headers/DB não vazam segredo ou tenant.
6. Registrar evidência, risco residual, limitação, plano de monitoramento e rollback.

## Resultado verificável

Mapear ativos, atores, fronteiras, fluxos, ameaças STRIDE/OWASP, controles e testes por risco; distinguir revisão documental de pentest; risco residual com responsáveis.

A saída final deve conter uma tabela ou lista com `afirmação/decisão`, `evidência`, `status` e `limitação`. Para arquivos ou comandos, incluir caminho/comando e resultado observado; para ação externa, incluir ID/permalink/resposta da plataforma.

## Falha que deve reprovar

Declarar sistema seguro sem testar ou confundir JWT válido com autorização de objeto.

Também reprova: usar a skill fora de escopo, ignorar ausência de ferramenta, executar efeito externo sem autorização ou declarar teste que não foi rodado.

## Como avaliar

- Compare a saída com o resultado verificável acima e com `certification-v1.md`.
- Rode ao menos o caso positivo, um negativo, um sem ferramentas e um near-miss de roteamento.
- Registre prompt, modelo/versão, ferramentas, trace/artefatos, decisão por critério e falhas.
