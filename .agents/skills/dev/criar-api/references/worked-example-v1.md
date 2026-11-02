# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

Especificar POST /pagamentos idempotente para ERP.

**Fixture:** Cliente envia duas vezes o mesmo pedido com mesmo identificador.

## Procedimento esperado

1. **Descoberta:** propósito, consumidores (SPA, serviço, mobile), dados sensíveis, número de usuários, autenticação, disponibilidade, latência, operação e stack. Inspecionar código preexistente e convenções.
2. **Modelagem de recursos:** entidades, identidade, operações, escopo por tenant, fronteiras de domínio, relacionamentos, invariantes e estados.
3. **Contrato OpenAPI antes do controller:** métodos, paths, input/output schemas, erros por endpoint, paginação/ordenação, filtros permitidos e exemplos.
4. **Segurança por endpoint:** principal autenticado, política ação+objeto, validação body/query/path, escopo do tenant, seleção explícita de campos de retorno, proteção de endpoints administrativos.
5. **Persistência:** transações, índices, N+1, concorrência, retry seguro, migrations não destrutivas e integridade. Sem DB, separar interfaces/mock explicitamente.
6. **Implementação:** handlers finos, serviços de negócio, repositórios, erros tipados, rastreamento/request-id, logs e health checks apropriados.
7. **Testes:** unitário de invariantes, integração da API com auth e tenant, contratos/compatibilidade, erros, concorrência e observabilidade. Sempre reportar comando e resultado.
8. **Entrega:** arquivos reais criados, OpenAPI, README de instalação, variáveis necessárias, exemplos de requisição e lista de pendências.

## Resultado verificável

Documentar autenticação, input validado, idempotency key, erros 400/401/403/409/500, status, paginação quando aplicável; criar contrato OpenAPI somente para rotas existentes ou explicitamente propostas.

A saída final deve conter uma tabela ou lista com `afirmação/decisão`, `evidência`, `status` e `limitação`. Para arquivos ou comandos, incluir caminho/comando e resultado observado; para ação externa, incluir ID/permalink/resposta da plataforma.

## Falha que deve reprovar

Inventar endpoint implantado ou duplicar pagamento.

Também reprova: usar a skill fora de escopo, ignorar ausência de ferramenta, executar efeito externo sem autorização ou declarar teste que não foi rodado.

## Como avaliar

- Compare a saída com o resultado verificável acima e com `certification-v1.md`.
- Rode ao menos o caso positivo, um negativo, um sem ferramentas e um near-miss de roteamento.
- Registre prompt, modelo/versão, ferramentas, trace/artefatos, decisão por critério e falhas.
