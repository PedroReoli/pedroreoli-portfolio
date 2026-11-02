# CONTRIBUING

# Como contribuir

## Estrutura de uma Skill

Cada skill deve ter:
- Pasta em `.claude/skills/<categoria>/<nome-da-skill>/`
- Arquivo `SKILL.md` com documentacao
-_frontmatter com name e description

## Como criar uma skill

1. Crie a pasta
2. Crie o arquivo SKILL.md
3. Use o template padrao:

```markdown
---
name: nome-da-skill
description: >
  Descricao do que a skill faz.
  Use quando o usuario pedir "/nome-da-skill".
---

# /nome-da-skill — Titulo

Descricao da skill.

## Workflow

### Passo 1
...

## Regras

- Regra 1
- Regra 2
```

## Categorias

- `nucleo` - Operacoes do sistema
- `marketing` - Conteudo e conversao
- `ads` - Anuncios pagos
- `operacao` - Gestao do dia a dia
- `dev` - Desenvolvimento
- `database` - Banco de dados
- `devops` - Infraestrutura
- `pagamento` - Pagamentos
- `qualidade` - Testes
- `comunicacao` - Email e webhooks
- `performance` - Otimizacao
- `seo` - SEO
- `legal` - Juridico
- `mercado` - Analise
- `documentacao` - Documentacao
- `sistema` - Utilitarios

## Testes

Antes de adicionar uma skill:
1. Teste manualmente
2. Verifique a documentacao
3. Confirme que cumpre o described

## Commits

Use conventional commits:
- `feat:` - Nova feature
- `fix:` - Correcao
- `docs:` - Documentacao
- `refactor:` - Refatoracao