# ReoliOS — Estrutura de Pastas

```
reolios/
├── sistema/                    ← Cérebro do produto (não muda)
│   ├── nucleo/                 ← CLAUDE.md, manifesto, regras
│   ├── memoria/                ← empresa.md, preferencias.md
│   ├── identidade/             ← design-guide.md
│   ├── scripts/                ← automações
│   └── templates/              ← moldes
│
├── clientes/                   ← O que muda por projeto
│   └── <cliente>/              ← contexto, saídas, assets
│
├── documentacao/               ← O que o sistema coleta
│   ├── guias/                  ← README, FAQ, CHANGELOG
│   ├── metricas/               ← BENCHMARKS, METRICS
│   ├── casos-de-uso/           ← USE_CASES, TESTIMONIALS
│   ├── riscos/                 ← RISKS, TIMELINE
│   └── integracoes/            ← INTEGRATIONS
│
├── .claude/                    ← Skills do sistema
│   └── skills/                 ← nucleo, marketing, ads...
│
├── .privado/                   ← Documentos internos
├── README.md
└── package.json
```
