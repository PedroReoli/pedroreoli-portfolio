# Legado arquivado: operacao/comercial

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Processo comercial completo
name: comercial
aliases:
  - comercial
  - /comercial
  - Processo comercial completo
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
  Conduz o processo comercial completo: descoberta, qualificação, proposta,
  negociação e fechamento. Usa metodologia consultiva e ajuda a fechar mais. Use
  quando pedir "comercial", "vender mais", "fechar pedido", "proposta
  comercial", "negociação", "/comercial".
---

# Processo comercial completo

Guia o usuário pelo processo de vendas: da descoberta ao fechamento. Metodologia consultiva para entender, diagnosticar e resolver.

## Dependências

- **Contexto:** `sistema/memoria/empresa.md`, `sistema/memoria/estrategia.md`
- **Tom:** `_memoria/preferencias.md`
- **Output:** `saidas/comercial/`

---

## Workflow

### Fase 1 — Descoberta

**Objetivo:** Entender o problema do cliente antes de falar de solução.

**Perguntas essenciais:**
```
┌─────────────────────────────────────────────────────────────┐
│                    DESCOBERTA DO CLIENTE                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SITUAÇÃO ATUAL:                                            │
│  "Me conta como funciona hoje..."                          │
│  "O que vocês usam hoje pra resolver isso?"                │
│  "Quanto tempo gastam com isso?"                           │
│                                                             │
│  DORES:                                                     │
│  "O que mais te incomoda nisso?"                          │
│  "Qual o maior custo disso pra vocês?"                     │
│  "O que acontece quando isso dá errado?"                  │
│                                                             │
│  ENVOLVIMENTO:                                              │
│  "Quem mais está envolvido nessa decisão?"                │
│  "Você tem autonomia pra essa decisão?"                   │
│  "Qual o processo pra aprovar?"                           │
│                                                             │
│  URGÊNCIA:                                                  │
│  "Quando preciso ter isso resolvido?"                      │
│  "O que acontece se não resolver agora?"                  │
│  "Tem algo bloqueando que precisa resolver antes?"        │
│                                                             │
│  ORÇAMENTO:                                                │
│  "Vocês já tem budget reservado pra isso?"                 │
│  "Qual a faixa de investimento que vocês estão           │
│   considerando?"                                          │
│  "Como funciona o pagamento pra vocês?"                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Classificar o lead:**
```
HOT — Tem dor, orçamento, urgência, decisão agora
   → Avançar rápido, proposta hoje

MORNO — Tem dor mas sem urgência ou sem budget
   → Nutrir, educar, criar urgência

FRIO — Sem dor clara, sem budget, não está pronto
   → Manter contato, não forçar
```

### Fase 2 — Diagnóstico

**Objetivo:** Formalizar o problema e demostrar entendimento.

Após a descoberta, fazer um resumo:

```
┌─────────────────────────────────────────────────────────────┐
│                    DIAGNÓSTICO                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Entendi que hoje vocês [descrever situação atual].        │
│  O principal problema é [dores identificadas].             │
│  Isso custa [impacto em tempo/dinheiro].                    │
│  Vocês precisam de [solução] até [prazo].                  │
│                                                             │
│  Confere?                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Se discordar:** Voltar e entender melhor.
**Se confirmar:** Avançar pra proposta.

### Fase 3 — Proposta

**Perguntar antes de criar:**
1. "Quer proposta formal ou só um resumo?"
2. "Qual formato prefere? (PDF, documento, apresentação)"
3. "Tem prazo de aprovação?"

**Estrutura da proposta:**
```
1. RESUMO EXECUTIVO
   - Entendemos seu problema
   - Nossa solução
   - Resultado esperado

2. PROPOSTA TÉCNICA
   - O que vamos fazer
   - Como vamos fazer
   - Prazo de entrega
   - Escopo

3. INVESTIMENTO
   - Valor total
   - Formas de pagamento
   - Condições

4. GARANTIA
   - O que está incluso
   - Suporte pós-entrega
   - Revisões

5. PRÓXIMOS PASSOS
   - O que acontece se aceitar
   - Início previsto
```

**Usar skill `/proposta` para gerar documento formal.**

### Fase 4 — Negociação

**Sinais de objeção:**
```
┌─────────────────────────────────────────────────────────────┐
│                    OBJEÇÕES E RESPOSTAS                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  "É caro demais"                                            │
│  → "Qual é o problema específico? Vamos resolver juntos."  │
│  → "O que faz ser caro? Compare com o custo de não fazer?" │
│  → "Podemos ajustar o escopo pra caber no budget?"          │
│                                                             │
│  "Preciso pensar"                                           │
│  → "O que exatamente precisa pensar?"                      │
│  → "Tem alguma dúvida minha proposta não respondeu?"      │
│  → "Quando posso te ligar pra conversar?"                  │
│                                                             │
│  "Vou comparar com outros"                                 │
│  → "Ótimo. O que vai avaliar neles?"                      │
│  → "Posso te enviar diferenciais pra comparar?"            │
│                                                             │
│  "Não tenho autonomia"                                     │
│  → "Quem mais está envolvido na decisão?"                  │
│  → "Posso participar de uma reunião?"                      │
│  → "O que preciso mostrar pra te ajudar nesse processo?"   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Não fazer:**
- Tentar empurrar sem entender a objeção
- Abaixar preço sem explorar outras opções
- Desesperar (sinaliza necessidade)

**Fazer:**
- Ouvir mais do que falar
- Entender o medo por trás da objeção
- Oferecer alternativas
- Dar tempo se precisar

### Fase 5 — Fechamento

**Sinais de pronto pra fechar:**
- Concordou com diagnóstico
- Viu proposta e não objectionou preço
- "Vamos fazer"
- "Quando começamos"

**Táticas de fechamento:**
```
FECHAMENTO NATURAL:
"Perfeito. Vou preparar o contrato. Assina amanhã?"
→ Confirma decisão

FECHAMENTO POR ESCOLHA:
"Quer a versão com pagamento à vista ou parcelado?"
→ Assume que vai fechar

FECHAMENTO POR CRONOGRAMA:
"Se fecharmos até sexta, conseguimos começar segunda."
→ Cria urgência legítima

FECHAMENTO SILENCIOSO:
Ficar quieto. Esperar. Quem falar primeiro, perde.
→ Funciona com leads quentes
```

**Se não fechar:**
- Identificar o que faltou
- Resolver antes da próxima conversa
- Não perder contato

---

## Templates de Mensagem

**Primeiro contato (frio):**
```
Olá [Nome], vi que você [contexto]. 

[Problema que você resolve] é algo que te afeta também?

Se fizer sentido, adoraria trocar uma ideia de 15min pra entender melhor.
```

**Retorno de proposta:**
```
[Nome], bom dia. Vi que recebeu nossa proposta.

Quer um resumo rápido no telefone? 15min pra tirar dúvidas e talvez avançar.

Tem horário essa semana?
```

**Follow-up (sem resposta):**
```
Oi [Nome], só passing by. 

Senti que faz um tempo da proposta. Ainda faz sentido pra vocês?

Se não for mais prioridade, sem problema — só me avisa pra eu não ficar te incomodando.
```

---

## Métricas Comerciais

```
┌─────────────────────────────────────────────────────────────┐
│                    PIPELINE DE VENDAS                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LEADS                                                      │
│  └── Taxa de conversão: ~30% → qualified leads              │
│                                                             │
│  QUALIFIED LEADS                                            │
│  └── Taxa de conversão: ~50% → proposals                   │
│                                                             │
│  PROPOSALS                                                  │
│  └── Taxa de conversão: ~40% → won                         │
│                                                             │
│  WON                                                        │
│  └── Ticket médio, tempo de ciclo, taxa de recompra       │
│                                                             │
│  FÓRMULA:                                                   │
│  Receita = Leads × Conv% × Ticket                          │
│                                                             │
│  EXEMPLO:                                                   │
│  100 leads × 30% (qualificados) × 50% (propostas) × 40% (ganhos) × R$ 500 = R$ 3.000 — exemplo meramente hipotético                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Checklist por Negócio

```markdown
### Negócio: [Nome]
- [ ] Descoberta feita
- [ ] Dor clara identificada
- [ ] Budget confirmado
- [ ] Decisor identificado
- [ ] Urgência definida
- [ ] Proposta enviada
- [ ] Follow-up agendado
- [ ] Objeções tratadas
- [ ] Fechamento definido
- [ ] Contrato enviado
- [ ] Pago
- [ ] Entregue
```

---

## Regras

- Nunca vendar sem entender a dor
- Proposta personalizada > genérica
- Escutar 70%, falar 30%
- Objeção é oportunidade de entender melhor
- Follow-up é importante, mas não atribua porcentagens ou números mágicos de contatos sem dados verificáveis do negócio.
- Não baixar preço sem reduzir escopo
- Cada objeção tem uma resposta — nunca ignorar
- Documentar TODO o processo
- Atualizar CRM/pipeline regularmente

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Operacao|Skills - Operacao]]
<!-- vault-navigation:end -->
