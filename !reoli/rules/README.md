# Catálogo de Regras ReoliCode

Este catálogo organiza as regras por camada para garantir previsibilidade, clareza e eficiência no uso do contexto pelos assistentes de IA.

Para localizar uma regra por assunto sem abrir o catálogo inteiro, consulte `RULES-ROUTER.json`. O campo `arquivo` usa caminhos deste repositório (`catalog/...`); em projetos instalados, substitua esse prefixo por `!reoli/rules/`. A precedência obrigatória abaixo continua válida.

O índice é gerado por `python scripts/build_routers.py` na pasta ReoliOS irmã (requer PyYAML). Regere após alterar frontmatter ou a primeira frase de objetivo das regras.

---

## ⚡ Regra de Leitura para Assistentes de IA

Para evitar consumo desnecessário de janela de contexto e processamento redundante, a IA deve seguir a seguinte política de leitura:

### 🔴 1. Regras Obrigatórias (Sempre à Risca)
Estes arquivos de regras **DEVEM ser sempre lidos e seguidos à risca** em qualquer tarefa:

* `00-foundation/` → Comportamento do agente, especificidade e estilo de escrita.
* `30-workflow/commit.md` → Padrão estrito de mensagens de commit.
* `30-workflow/documentation-structure.md` → Estrutura documental (`.docs/`, `.rules/`, `.agent-docs/`).
* `20-governance/security.md` → Diretrizes cruciais de segurança.

### 🟡 2. Regras Situacionais e Condicionais (Lazy Loading / Sob Demanda)
As regras das pastas `40-stack/` e `90-integrations/` são **estritamente situacionais**.

> ⚠️ **Diretriz para a IA**: NÃO leia ou recarregue arquivos destas pastas no início da sessão a menos que o repositório atual utilize a tecnologia correspondente ou a tarefa do usuário envolva explicitamente essa integração.

- **Stack (`40-stack/`)**: Ler apenas se a tecnologia existir no projeto (ex: backend API, frontend web, banco de dados).
- **Integrações (`90-integrations/`)**: Ler apenas quando a tarefa envolver a integração específica (ex: Webhooks, Payments, S3 Storage, OAuth, LLMs, APIs Externas).
- **IA e dados (`10-architecture/`, `20-governance/`)**: `prompt-injection-sanitization.md` para entrada não confiável em agentes, `ai-package-hallucination-defense.md` ao adicionar dependências e `lgpd-gdpr-privacy-by-design.md` quando houver dados pessoais.

---

## Contrato de contexto e carregamento seletivo

Leia este índice e as regras obrigatórias uma vez por sessão; reutilize o que já foi lido enquanto os arquivos não mudarem. O frontmatter é metadado de classificação, não uma instrução para carregar arquivos adicionais.

Para arquitetura, governança e workflow, selecione apenas os arquivos aplicáveis ao fluxo alterado. Não abra diretórios inteiros de stack, integrações, memória ou skills por estarem instalados. Encontre primeiro por caminho, nome e descrição; abra o corpo somente após confirmar pertinência.

Em auditoria explicitamente solicitada de todo o catálogo, a leitura completa integra o escopo. Em implementação pontual, use buscas limitadas e referências a evidências, evitando DOM, logs e arquivos completos no retorno de subagentes.

## 📚 Camadas do Catálogo

- `00-foundation/`: Regras universais, sempre aplicáveis.
- `10-architecture/`: Desenho estrutural, modularização e princípios SOLID.
- `20-governance/`: Segurança, filesystem, tratamento de erros, logs, performance e testes.
- `30-workflow/`: Convenções de commits, documentação, especificação e TODO.
- `40-stack/`: Regras condicionais por tecnologia e stack.
- `90-integrations/`: Regras condicionais para serviços e integrações de terceiros.

---

## 🗺️ Mapa Completo do Catálogo

| Caminho | Papel | Prioridade / Escopo |
| --- | --- | --- |
| `00-foundation/agent-behavior.md` | Comportamento do agente | 🔴 Obrigatório (Sempre) |
| `00-foundation/specificity.md` | Regras anti-vaguidão | 🔴 Obrigatório (Sempre) |
| `00-foundation/writing-style.md` | Estilo de escrita | 🔴 Obrigatório (Sempre) |
| `30-workflow/commit.md` | Padrão de commits | 🔴 Obrigatório (Sempre) |
| `30-workflow/documentation-structure.md` | Estrutura (.docs, .rules, .agent-docs) | 🔴 Obrigatório (Sempre) |
| `20-governance/security.md` | Segurança por padrão | 🔴 Obrigatório (Sempre) |
| `10-architecture/architecture.md` | Desenho modular | Arquitetura |
| `10-architecture/modularization.md` | Coesão e limites | Arquitetura |
| `10-architecture/component-boundaries.md` | Fronteiras (UI, Hook, Service) | Arquitetura |
| `10-architecture/solid.md` | Princípios SOLID | Arquitetura |
| `20-governance/filesystem.md` | Operações em arquivos | Governança |
| `20-governance/error-handling.md` | Tratamento de falhas | Governança |
| `20-governance/logging.md` | Registro de eventos e logs | Governança |
| `20-governance/performance.md` | Otimização e performance | Governança |
| `20-governance/responsiveness.md` | Responsividade e layout | Governança |
| `20-governance/testing.md` | Estratégia de testes | Governança |
| `30-workflow/spec-driven.md` | Modo spec-driven por repo | Workflow |
| `30-workflow/todo.md` | Gestão de TODOs | Workflow |
| `40-stack/frontend-web.md` | Regras para Frontend Web | 🟡 Condicional (Stack) |
| `40-stack/backend-api.md` | Regras para Backend e APIs | 🟡 Condicional (Stack) |
| `40-stack/database.md` | Regras para Banco de Dados | 🟡 Condicional (Stack) |
| `90-integrations/webhooks.md` | Recebimento seguro de Webhooks | 🟡 Situacional (Integração) |
| `90-integrations/external-apis.md` | Consumo de APIs & Resiliência | 🟡 Situacional (Integração) |
| `90-integrations/ai-llm.md` | Integração com IA e LLMs | 🟡 Situacional (Integração) |
| `90-integrations/storage-cdn.md` | Storage Nuvem & CDN (S3/R2) | 🟡 Situacional (Integração) |
| `90-integrations/payment-gateways.md` | Checkout & Gateways de Pagamento | 🟡 Situacional (Integração) |
| `90-integrations/auth-providers.md` | OAuth2 & Social Logins | 🟡 Situacional (Integração) |
