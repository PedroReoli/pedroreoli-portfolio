---
tipo: skill
nome: Proposta comercial profissional
name: proposta
aliases:
  - proposta
  - /proposta
  - Proposta comercial profissional
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
  Gera proposta comercial completa em HTML pronta pra enviar ao cliente. Inclui
  escopo, entregas, cronograma, investimento e termos. Visual profissional com a
  identidade da marca. Use quando o usuário pedir "proposta pra", "criar
  proposta", "montar orçamento", "proposta comercial", "/proposta".
---

# Proposta comercial profissional

Gera proposta completa em HTML com visual premium, pronta pra abrir no navegador, gerar PDF ou enviar por email.

## Dependências

- **Contexto:** `sistema/memoria/empresa.md`
- **Tom:** `sistema/memoria/preferencias.md`
- **Visual:** `sistema/identidade/design-guide.md`
- **Output:** `clientes/templates/saidas/propostas/`

---

## Workflow

### Passo 1 — Briefing

Se o usuário não deu contexto suficiente, perguntar:
1. "Pra quem é a proposta? (nome do cliente/empresa)"
2. "O que ele precisa? (problema ou pedido)"
3. "Quais serviços você vai oferecer?"
4. "Prazo estimado de entrega?"
5. "Valor ou faixa de investimento?"
6. "Tem alguma condição especial? (desconto, parcelamento, bônus)"

Se o usuário já deu tudo em texto livre, extrair e seguir.

### Passo 2 — Estrutura da proposta

1. **CAPA** — nome do cliente + nome do negócio + data
2. **SOBRE NÓS** — quem somos (extrair de empresa.md), por que somos a escolha certa
3. **ENTENDIMENTO** — o que o cliente precisa (reformular o problema com empatia)
4. **SOLUÇÃO** — o que vamos entregar (escopo detalhado, item por item)
5. **CRONOGRAMA** — fases com prazos
6. **INVESTIMENTO** — valores, condições de pagamento, incluso/excluso
7. **DIFERENCIAIS** — por que escolher a gente (3-5 pontos concretos)
8. **PRÓXIMOS PASSOS** — como aceitar, contato, validade da proposta
9. **RODAPÉ** — dados de contato, CNPJ se aplicável

### Passo 3 — Escrever o conteúdo

- Tom conforme `sistema/memoria/preferencias.md`
- Sem jargão vazio ("soluções inovadoras", "excelência em atendimento")
- Concreto: números, prazos, entregas tangíveis
- Escopo claro: o que está incluso E o que NÃO está
- Investimento sem rodeios: valor, forma de pagamento, condições

### Passo 4 — Gerar HTML

Criar `proposta-<cliente>-<YYYY-MM-DD>.html` com:
- Inline CSS (abre em qualquer navegador)
- Cores e fontes de `sistema/identidade/design-guide.md`
- Layout limpo, profissional, imprimível (A4)
- Logo no header (se existir em `identidade/`)
- Responsivo (lê bem no celular)

### Passo 5 — Salvar e entregar

```
clientes/templates/saidas/propostas/<cliente>-<YYYY-MM-DD>/
  proposta.html
  proposta.md
```

Mostrar:
```
✓ Proposta criada: clientes/templates/saidas/propostas/<cliente>-<data>/proposta.html

Pra visualizar: abrir no navegador
Pra PDF: Ctrl+P → Salvar como PDF
Pra editar: mexer no proposta.md e regenerar

Quer que eu ajuste algo antes de enviar?
```

---

## Regras

- Nunca inventar serviços que o negócio não oferece (ler empresa.md)
- Valor sempre explícito — sem "sob consulta" a menos que o usuário peça
- Validade da proposta: 15 dias (padrão) ou o que o usuário definir
- Proposta deve caber em 2-4 páginas impressas (não encher linguiça)
- Visual premium mas sóbrio — não é flyer, é documento comercial
- Se não tem identidade visual definida, usar estilo editorial neutro

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Operacao|Skills - Operacao]]
<!-- vault-navigation:end -->
