# Legado arquivado: operacao/email-profissional

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Rascunho de Email
name: email-profissional
aliases:
  - email-profissional
  - /email-profissional
  - Rascunho de Email
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
  Rascunha um email profissional a partir de um contexto livre. Calibra o tom ao
  destinatário e ao objetivo do email. Use quando o usuário disser "escreve um
  email pra", "preciso mandar um email sobre", "como eu respondo isso", "faz um
  email pra [cliente/pessoa]".
---

# Rascunho de Email

## Dependências

- **Contexto do negócio:** `sistema/memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`

---

## Workflow

### Passo 1 — Coletar o contexto

Se o usuário não forneceu as informações necessárias, perguntar:
1. "Pra quem é o email? (nome, cargo, relação com você)"
2. "Qual é o objetivo? (cobrar, propor, responder, agradecer, seguir up...)"
3. "Tem algo específico que precisa constar ou que precisa evitar dizer?"

Se o usuário deu o contexto de forma livre (mesmo que bagunçado), extrai o que der e prossegue.

### Passo 2 — Escrever o email

**Considerar:**
- Tom proporcional à relação (cliente novo = mais cuidado, parceiro antigo = mais direto)
- Objetivo claro na abertura (não enterrar o pedido no final)
- Uma ação pedida por vez
- Encerramento sem redundância ("Qualquer dúvida, fico à disposição" é padrão — só usar se fizer sentido)

**Estrutura:**
```
Assunto: [linha de assunto direta, sem clicbait]

[Nome],

[Parágrafo 1 — contexto ou referência ao último contato]

[Parágrafo 2 — o ponto principal ou o pedido]

[Parágrafo 3 — próximo passo, se houver]

[Assinatura]
[Nome do usuário, de _memoria/empresa.md]
```

### Passo 3 — Apresentar opções de tom (quando fizer sentido)

Se o assunto for delicado (cobrança, feedback negativo, recusa), oferecer 2 versões:
- Versão A: mais direta
- Versão B: mais suave

Deixar o usuário escolher.

---

## Regras

- Tom segue `_memoria/preferencias.md`
- Nunca usar linguagem corporativa genérica sem necessidade
- Assunto do email deve ser específico e descritivo, não vago ("Seguimento", "Proposta")
- Se for um email de cobrança, ser direto mas sem agressividade
- Se for resposta a algo, citar o contexto na primeira linha

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Operacao|Skills - Operacao]]
<!-- vault-navigation:end -->
