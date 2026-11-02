---
tipo: skill
nome: Operação e Automação Avançada do GitHub
name: github-pro
aliases:
  - github-pro
  - /github-pro
  - Operação e Automação Avançada do GitHub
tags:
  - h4
  - skill
  - devops
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: devops
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Devops]]'
description: >
  Operação avançada e automação profissional do GitHub para agentes de IA. Use
  para configurar e debugar GitHub Actions (CI/CD), criar releases automáticas,
  gerenciar secrets, operar o GitHub CLI (gh), gerenciar branches/PRs e garantir
  segurança de repositórios privados e públicos.
---

# Operação e Automação Avançada do GitHub

Gerencie GitHub Actions, Releases e Secrets conforme o repositório e a documentação atual do `gh`. Registre a ação, o alvo e o resultado antes de concluir.

---

## 🧭 Repositório Privado vs. Público: Regras de Ouro

| Característica | Repositório Privado | Repositório Público |
|---|---|---|
| **Visibilidade** | Apenas você e colaboradores autorizados. | Aberto para toda a internet e indexado no Google. |
| **Segredo Comercial** | Protegido. Ninguém copia seu código ou lógica. | Visível. Qualquer pessoa pode clonar e bifurcar (fork). |
| **GitHub Actions** | Consulte cotas, cobrança e regras de runners na documentação vigente do plano antes de estimar custo. | Configure limites e monitore consumo real. |
| **Segurança & Dados** | Dados sensíveis continuam devendo ficar fora do git. | **Zero tolerância:** Qualquer token, telefone ou senha vaza em segundos para bots de scraping. |

> 🔒 **Regra de Ouro ReoliOS:** Nunca comite tokens de API, senhas ou dados pessoais. Use sempre a pasta `.privado/` (já ignorada no `.gitignore`) ou GitHub Secrets (`gh secret set`).

---

## 🛠️ Comandos Essenciais do GitHub CLI (`gh`)

Sempre que precisar interagir com o GitHub pelo terminal sem abrir o navegador:

### 1. Autenticação e Status
```bash
gh auth status              # Verifica se está autenticado
gh repo view                # Exibe detalhes do repositório atual
```

### 2. Gestão de Releases e Tags
```bash
# Cria uma nova release com tag de versão e notas automáticas
gh release create v1.6.0 --title "ReoliOS v1.6.0" --generate-notes

# Lista as releases existentes
gh release list
```

### 3. Gestão de Variáveis de Ambiente e Segredos (Secrets)
```bash
# Define uma variável secreta para o GitHub Actions
gh secret set MINHA_API_KEY -b "sk_live_123456"

# Lista os segredos configurados
gh secret list
```

### 4. Monitoramento de Workflows (CI/CD)
```bash
# Visualiza o status das últimas execuções de Actions
gh run list --limit 5

# Acompanha os logs de uma execução em tempo real
gh run watch [RUN_ID]

# Re-executa uma action que falhou
gh run rerun [RUN_ID]
```

---

## 🚀 Esteira de CI/CD do ReoliOS

O projeto conta com dois workflows principais em `.github/workflows/`:

1. **`ci.yml` (Integração Contínua):**
   - Disparado a cada `git push` na branch `main` ou em Pull Requests.
   - Executa os testes de sanidade: `npm test`.
   - Executa o linter de skills: `npm run validate:skills`.
   - Roda a suíte de testes do CDP Bridge: `python -m unittest`.

2. **`release.yml` (Publicação Automática):**
   - Disparado manualmente via botão no GitHub (`workflow_dispatch`) ou ao empurrar uma tag `v*`.
   - Roda os portões de qualidade.
   - Publica o changelog oficial e cria a release para download.

---

## 📋 Checklist Pré-Publicação / Pré-Release
- [ ] Rodou `npm test` localmente com sucesso?
- [ ] Rodou `npm run validate:skills` e todas as skills estão com zero erros?
- [ ] O arquivo `package.json` está com a versão correta atualizada?
- [ ] Nenhum arquivo em `.privado/` foi forçado no commit?
- [ ] Commits seguem o padrão semântico (`feat:`, `fix:`, `docs:`, `chore:`)?

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Devops|Skills - Devops]]
<!-- vault-navigation:end -->
