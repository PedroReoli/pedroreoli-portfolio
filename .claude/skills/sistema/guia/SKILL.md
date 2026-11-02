---
tipo: skill
nome: Guia completo do ReoliOS
name: guia
aliases:
  - guia
  - /guia
  - Guia completo do ReoliOS
tags:
  - h4
  - skill
  - sistema
  - reolios
camada: 3_folha
dominio: operacao
categoria: sistema
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Sistema]]'
description: >
  Guia completo do ReoliOS para novos usuarios. Explica o que e, como usar,
  quais skills existem, e como comecar. Use quando pedir "guia", "help",
  "ajuda", "como usar", "inicio", /guia ou /help.
---

# Guia completo do ReoliOS

Guia para novos usuarios entenderem o ReoliOS e comecarem a usar.

---

## O que e o ReoliOS?

**ReoliOS** e um sistema operacional de negocio que roda dentro do Claude Code. Ele transforma o Claude numa equipe completa: marketing, SEO, ads, conteudo, atendimento, operacao — tudo guiado por voce, executado pela IA.

> Uma pessoa. Uma IA. Uma empresa rodando.

---

## Como comecar

### Passo 1: Entenda sua estrutura

```
meu-negocio/
├── .claude/skills/   <- Todas as skills disponiveis
├── sistema/memoria/   <- Configuracoes do seu negocio
├── sistema/identidade/ <- Sua marca (cores, fontes, logo)
├── templates/         <- Moldes reutilizaveis
├── scripts/          <- Automacao (render, postar)
├── clientes/templates/marketing/ <- Conteudo gerado
├── dados/             <- Dados de entrada (CSVs)
├── clientes/templates/saidas/ <- Documentos finais
└── CLAUDE.md          <- Regras de operacao
```

### Passo 2: Configure sua identidade

Antes de usar qualquer skill de conteudo, execute `/instalar` para configurar:
- Nome da empresa
- Seu perfil/targeting
- Cores e estilo visual
- Preferencias de tom

### Passo 3: Comece a usar

No comeco de cada sessao, digite `/abrir` para carregar o contexto do seu negocio. Depois e so usar as skills!

---

## Todas as Skills

### NUCLEO (6 skills)
| Skill | O que faz |
|-------|-----------|
| `/abrir` | Carrega o contexto do negocio |
| `/salvar` | Commit + push no GitHub |
| `/atualizar` | Sincroniza a memoria |
| `/novo-projeto` | Cria pasta pra cada cliente |
| `/projeto` | Gerencia projeto atual |
| `/mapear-rotinas` | Transforma tarefa em skill |

### MARKETING (6 skills)
| Skill | O que faz |
|-------|-----------|
| `/carrossel` | Cria carrosseis 1080x1350 |
| `/publicar-tema` | Blog + carrossel + legendas |
| `/seo` | Estrategia de 8 passos |
| `/copy-vendas` | Copy de alta conversao |
| `/responder-avaliacoes` | Respostas pro Google |
| `/aprovar-post` | Publica blog + social |

### ADS (2 skills)
| Skill | O que faz |
|-------|-----------|
| `/anuncio-google` | CSV pro Google Ads |
| `/relatorio-ads` | Relatorio semanal |

### OPERACAO (5 skills)
| Skill | O que faz |
|-------|-----------|
| `/analisar-dados` | Le CSV e gera resumo |
| `/email-profissional` | Emails calibrados |
| `/proposta` | Proposta comercial |
| `/pesquisar` | Pesquisa topics |
| `/comercial` | Processo de vendas |

### DEV (5 skills)
| Skill | O que faz |
|-------|-----------|
| `/criar-api` | Cria API completa |
| `/frontend` | Cria interface (shadcn/baseui) |
| `/security` | Seguranca OWASP |
| `/audit` | Audita seguranca |
| `/documentar-api` | OpenAPI, README |

### DATABASE (1 skill)
| Skill | O que faz |
|-------|-----------|
| `/modelar-db` | Schema Prisma |

### DEVOPS (2 skills)
| Skill | O que faz |
|-------|-----------|
| `/ci-cd` | Pipelines GitHub Actions |
| `/deploy` | Deploy (Vercel, Railway) |

### PAGAMENTO (1 skill)
| Skill | O que faz |
|-------|-----------|
| `/stripe` | Checkout, assinaturas |

### QUALIDADE (1 skill)
| Skill | O que faz |
|-------|-----------|
| `/testar` | Suite de testes |

### COMUNICACAO (2 skills)
| Skill | O que faz |
|-------|-----------|
| `/email` | Email transacional |
| `/webhook` | Webhooks |

### PERFORMANCE (1 skill)
| Skill | O que faz |
|-------|-----------|
| `/performance` | Lighthouse, Core Web Vitals |

### SEO (1 skill)
| Skill | O que faz |
|-------|-----------|
| `/seo-tecnico` | Sitemap, meta, schema |

### LEGAL (2 skills)
| Skill | O que faz |
|-------|-----------|
| `/lgpd` | Compliance LGPD |
| `/legal` | Termos, contratos |

### MERCADO (1 skill)
| Skill | O que faz |
|-------|-----------|
| `/analise-mercado` | Analise de concorrencia |

### DOCUMENTACAO (1 skill)
| Skill | O que faz |
|-------|-----------|
| `/documentar-api` | Docs da API |

### SISTEMA (5 skills)
| Skill | O que faz |
|-------|-----------|
| `/instalar` | Configura negocio |
| `/funil` | Funil de vendas |
| `/docs-api` | Documentacao API |
| `/guia` | Este guia |
| `/legal` | Juridico |

---

## Quick Start

```bash
# 1. Clone e abra
git clone ... meu-negocio
cd meu-negocio
code .

# 2. No Claude Code:
/instalar    # Configura
/abrir       # Carrega contexto
/guia        # Este guia

# 3. Use as skills!
/carrossel
/seo
/proposta
```

---

## FAQ

**P: Preciso saber programar?**
R: Nao! Skills de marketing/operacao sao pra qualquer pessoa.

**P: Quanto custa?**
R: R$ 450 vitalicio — todas as skills.

**P: Funciona em qualquer SO?**
R: Sim! Windows, Mac, Linux.

---

## Dicas

1. Use `/abrir` no inicio de cada sessao
2. Configure sua identidade antes de criar conteudo
3. Use `/atualizar` quando mudar coisas
4. Peça nova skill se tiver tarefa repetitiva

---

**Total: 40 skills** cobrindo tudo que uma empresa precisa.

Explore, teste, personalize! 🚀

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Sistema|Skills - Sistema]]
<!-- vault-navigation:end -->
