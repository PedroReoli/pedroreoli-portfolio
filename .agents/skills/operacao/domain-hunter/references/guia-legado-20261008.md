# Legado arquivado: operacao/domain-hunter

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Caçador e Validador de Domínios Estratégicos
name: domain-hunter
aliases:
  - domain-hunter
  - /domain-hunter
  - Caçador e Validador de Domínios Estratégicos
tags:
  - h4
  - skill
  - operacao
  - reolios
camada: 3_folha
dominio: operacao
categoria: operacao
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Operacao]]'
description: >
  Caça, pesquisa e valida domínios estratégicos para novos projetos, SaaS e
  landing pages. Gera ideias curtas e memoráveis, verifica disponibilidade real
  via WHOIS / registrars e compara os melhores preços e cupons em registrars
  globais (.com, .io, .ai, .com.br).
---

# Caçador e Validador de Domínios Estratégicos

Pesquise nomes de domínio, disponibilidade e custo em provedores atuais. Registre fonte e data da consulta; disponibilidade e preço podem mudar antes da compra.

---

## 🧭 Contexto do Negócio

Antes de gerar ideias:
1. Consulte `sistema/memoria/empresa.md` e `sistema/memoria/estrategia.md` para entender o posicionamento do projeto.
2. Identifique:
   - Qual é a proposta de valor do produto em 1 frase?
   - Qual é a extensão preferida? (`.com`, `.com.br`, `.ai`, `.io`, `.app`)
   - Há um orçamento máximo para o domínio?

---

## 🔍 Regras de Ouro para Nomes de Domínio

1. **Menos de 15 caracteres:** Quanto menor, mais fácil de digitar de cabeça no mobile.
2. **Pronunciável e Fácil de Escrever:** Se você disser o nome pelo telefone e a pessoa errar a digitação, o nome é ruim.
3. **Padrões de Naming de Alto Sucesso:**
   - `{verbo}{substantivo}`: getreoli.com, runflow.io, shipfast.com
   - `{substantivo}{sufixo}`: reolihq.com, flowapp.io, metricsly.com
   - `{prefixo}{palavra}`: goreoli.com, tryorbit.com, usereoli.com

---

## 🛠️ Workflow de Execução

### Passo 1 — Geração de 5 a 10 Ideias Fortes
Com base no problema do produto, gere 3 categorias de nomes:
- **Descritivos:** Explicam o que o app faz de imediato.
- **Brandables (Marca):** Nomes curtos e sonoros.
- **Ação Direta:** Focam no verbo e na velocidade.

### Passo 2 — Verificação de Disponibilidade Real
> ⚠️ **CRÍTICO:** Nunca apresente um domínio sem verificar se ele está disponível.

Oriente a checagem via terminal ou browser:
```bash
# Verificação rápida via WHOIS
whois seudominio.com | grep -i "no match\|not found\|available"
```
Ou abra diretamente em registrars sem markup abusivo:
- Spaceship: `https://www.spaceship.com/domains/?search={dominio}`
- Cloudflare Registrar (preço de custo at-cost): `https://www.cloudflare.com/products/registrar/`
- Registro.br (para `.com.br` por R$ 40/ano): `https://registro.br/busca-dominio/?busca={dominio}`

### Passo 3 — Comparação de Preços e Renovação
Alerte o usuário sobre a pegadinha clássica dos registrars:
- Preço do 1º ano barato com renovação abusiva no 2º ano (ex: GoDaddy cobra R$ 19 no primeiro ano e R$ 120 na renovação).
- **Registrars recomendados por transparência e custo fixo:**
  1. **Cloudflare Registrar:** Repassa o preço de tabela sem margem de lucro adicional.
  2. **Spaceship (da Namecheap):** Interface moderna e preços imbatíveis.
  3. **Registro.br:** Oficial para qualquer projeto com foco no Brasil.

---

## 📋 Entregável Final
Apresente uma tabela comparativa:

| Domínio Sugerido | Status | Preço Médio (Ano 1) | Renovação (Ano 2+) | Registrar Recomendado |
|---|---|---|---|---|
| `get[nome].com` | NÃO VERIFICADO (exemplo) | A CONSULTAR | A CONSULTAR | A comparar em registrar |
| `[nome].com.br` | NÃO VERIFICADO (exemplo) | A CONSULTAR | A CONSULTAR | Registro.br após consulta |

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Operacao|Skills - Operacao]]
<!-- vault-navigation:end -->
