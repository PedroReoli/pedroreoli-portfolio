# Diagramas

## Arquitetura do ReoliOS

```
┌─────────────────────────────────────────────────────────────┐
│                        USUARIO                              │
│                   (Voce + Claude)                          │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     REOLIOS                                 │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   NUCLEO    │  │  MARKETING  │  │     ADS     │         │
│  │  6 skills   │  │  6 skills   │  │  2 skills   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  OPERACAO  │  │     DEV     │  │   DATABASE   │         │
│  │  5 skills   │  │  5 skills   │  │  1 skill    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   DEVOPS    │  │  PAGAMENTO  │  │  QUALIDADE  │         │
│  │  2 skills   │  │  1 skill    │  │  1 skill    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Fluxo de Trabalho

```
ABRIR SESSAO
     │
     ▼
/instalar (primeira vez)
     │
     ▼
/abrir (carrega contexto)
     │
     ▼
ESCOLHER SKILL
     │
     ├── /carrossel ──► Conteudo visual
     ├── /seo ────────► Estrategia
     ├── /proposta ───► Vendas
     ├── /criar-api ──► Backend
     └── /frontend ───► Interface
     │
     ▼
EXECUTAR OUTPUT
     │
     ▼
/salvar (commit + push)
```

## Estrutura de Pastas

```
meu-negocio/
├── .claude/skills/     <- Skills (40)
├── _memoria/            <- Configuracao
├── identidade/          <- Marca
├── templates/          <- Moldes
├── scripts/            <- Automacao
├── marketing/          <- Saida conteudo
├── dados/              <- Entrada
├── saidas/             <- Documentos
└── CLAUDE.md           <- Regras
```