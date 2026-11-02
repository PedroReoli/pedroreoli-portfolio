# Roteador de skills e regras

Gerado em 2026-10-01 a partir dos frontmatters. 128 skills e 33 regras.

## Leitura rápida

1. Consulte `SKILLS-ROUTER.json` por intenção, palavra-chave ou comando.
2. Abra somente o `arquivo` da entrada escolhida. Leia as `memorias_necessarias` se forem pertinentes e existirem.
   Em projetos instalados, prefixe caminhos `sistema/memoria/...` com `!reoli/reolios/`; os arquivos de skills ficam na raiz `.claude/skills/`.
3. Para regras de código, consulte `!reoli/rules/RULES-ROUTER.json` quando instalado ou `ReoliCode/catalog/RULES-ROUTER.json` no workspace da suíte. Em instalação, substitua o prefixo `catalog/` do campo `arquivo` por `!reoli/rules/`; preserve a precedência do README das regras.
4. O índice aponta arquivos; ele não incorpora seus corpos nem substitui validação de fonte ou permissão para agir.

## Skills por categoria

| Categoria | Quantidade |
| --- | ---: |
| ads | 2 |
| automacao | 5 |
| autoridade-carreira | 12 |
| comunicacao | 2 |
| conteudo-criativos | 9 |
| database | 1 |
| dev | 14 |
| dev-eng | 7 |
| devops | 3 |
| documentacao | 1 |
| frontend | 4 |
| geo | 2 |
| gestao-lideranca | 7 |
| impeccable | 1 |
| legal | 3 |
| marketing | 12 |
| mercado | 2 |
| nucleo | 6 |
| obsidian | 2 |
| operacao | 8 |
| pagamento | 1 |
| performance | 1 |
| qualidade | 1 |
| seo | 3 |
| sistema | 7 |
| vendas-atendimento | 9 |
| viral-copy | 1 |
| viral-landing | 1 |
| viral-pricing | 1 |

## Rotas ambíguas

Nenhum alias duplicado.

## Arquivos

- `SKILLS-ROUTER.json`: nome, arquivo, resumo, palavras-chave, gatilhos e memórias por skill.
- `ReoliCode/catalog/RULES-ROUTER.json`: mesmos campos para regras, com prioridade, no workspace da suíte.

Após editar frontmatter ou regras, execute `python scripts/build_routers.py` na pasta ReoliOS (requer PyYAML e o repositório ReoliCode irmão). O gerador valida caminhos, nomes e memórias antes de gravar os índices.
