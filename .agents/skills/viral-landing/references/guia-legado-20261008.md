# Legado arquivado: viral-landing

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Landing Page Viral (Marc Lou Principles)
name: viral-landing
aliases:
  - viral-landing
  - /viral-landing
  - Landing Page Viral (Marc Lou Principles)
tags:
  - h4
  - skill
  - landing
  - reolios
camada: 3_folha
dominio: marketing
categoria: viral-landing
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Viral Landing]]'
description: >
  Cria landing pages virais usando os 32 princípios de produto viral de Marc Lou
  (@marclou). Foco em hero section, cores, OG image, footer compartilhável, uma
  ideia por tela, um CTA, e mostrar o produto antes de explicar. Use quando o
  usuário pedir landing page, página de vendas, hero section, ou /viral-landing.
---

# Landing Page Viral (Marc Lou Principles)

> Baseado nos 32 princípios de produto viral de **Marc Lou** (@marclou) — 5 anos construindo 35 startups em público.
> Use como bússola, não como checklist.

---

## Princípios Aplicados

### Princípio 2 — Três cores
Toda cor compete por atenção. Quanto mais cores, menos as pessoas percebem o que importa.

**Regra:** Texto preto. Fundo branco. Uma cor pro botão de compra.

```css
:root {
  --text: #000000;
  --bg: #FFFFFF;
  --cta: #3B82F6; /* uma única cor de ação */
}
```

### Princípio 6 — Uma ideia por tela
Não tente dizer tudo de uma vez. Uma tela = uma mensagem. Nada mais.

**Checklist:**
- [ ] Essa tela comunica UMA ideia?
- [ ] Se eu remover tudo que não é essencial, sobra só essa ideia?
- [ ] Funcionaria como um post do Instagram?

### Princípio 20 — Vendável só pela hero section
80% dos visitantes não vão rolar pra baixo. Se eles não entenderem o produto e quiserem em segundos, você perdeu.

**A hero section precisa responder em <3s:**
1. O que é isso?
2. Por que eu deveria me importar?
3. O que eu faço agora?

**Template de hero:**
```
[Headline que um aluno da 5ª série entende]
[Subtítulo que mostra o resultado, não a feature]
[CTA que diz exatamente o que acontece ao clicar]
[Preview/Demo do produto funcionando]
```

### Princípio 5 — OG Image como thumbnail do YouTube
Sua OG image é vista mais vezes que seu site. Desenhe ela como thumbnail do YouTube.

**Regras:**
- Texto GRANDE (ocupar 60%+ da imagem)
- Uma frase que gere curiosidade
- Contraste forte
- Rosto/foto do fundador (se tiver)
- Sem logos pequenos, sem detalhes

```html
<meta property="og:image" content="https://seu-site.com/og.png" />
<!-- Dimensões: 1200x630px -->
```

### Princípio 4 — Footer que as pessoas queiram compartilhar
97% dos visitantes não vão comprar, mas podem compartilhar. As pessoas lembram do que veem por último.

**Footer viral:**
- Uma frase memorável
- Um CTA pra compartilhar ("Mande isso pra um amigo que precisa")
- Um fato curioso ou número impressionante
- Nada de "© 2024 Todos os direitos reservados"

### Princípio 10 — Mostre o produto antes de explicar
Uma demo comunica mais que parágrafos de texto.

**Regra:** A hero section deve mostrar o produto funcionando (vídeo, GIF, screenshot) antes de qualquer texto explicativo. Se o produto não existe ainda, mostre um mockup realista.

### Princípio 22 — Um único CTA
Cada botão extra cria hesitação. Quando as pessoas têm múltiplos caminhos, muitas escolhem nenhum.

**Regra:** Uma página = um CTA principal. Um CTA. Um próximo passo.

---

## Workflow

### Passo 1 — Diagnóstico do produto
Perguntar:
1. Qual o nome do produto? (princípio 23 — nome que as pessoas lembram)
2. Descreva em menos de 10 palavras (princípio 30)
3. Qual o resultado que o cliente quer? (princípio 24 — venda o desejo, não a feature)
4. Quem é o cliente ideal?
5. Tem concorrentes? (princípio 31)

### Passo 2 — Estrutura da página
Gerar seção por seção:

```
1. Hero (princípios 20, 2, 6, 10)
   - Headline que um aluno da 5ª série entende (princípio 7)
   - Headline emocional (princípio 18)
   - Headline que lembram no dia seguinte (princípio 17)
   - Números, não adjetivos (princípio 3)
   - Preview do produto
   - Um CTA (princípio 22)

2. Problema → Empatia (princípio 21)
   - Descreva o problema melhor que o cliente consegue

3. Solução → Demo (princípio 10)
   - Mostre o produto funcionando

4. Prova social (princípio 29)
   - Testemunhos reais

5. Preço (princípio 16)
   - Preço no header também

6. Footer compartilhável (princípio 4)
```

### Passo 3 — Revisão viral
Checklist final:
- [ ] 3 cores no máximo? (princípio 2)
- [ ] Headline que criança de 10 anos entende? (princípio 7)
- [ ] Números no lugar de adjetivos? (princípio 3)
- [ ] OG image parece thumbnail do YouTube? (princípio 5)
- [ ] Footer que dá vontade de compartilhar? (princípio 4)
- [ ] Uma ideia por seção? (princípio 6)
- [ ] Venderia só com a hero? (princípio 20)
- [ ] Produto visível antes de explicar? (princípio 10)
- [ ] Um CTA só? (princípio 22)
- [ ] CTA diz o que acontece ao clicar? (princípio 28)
- [ ] Sem palavras fracas ("muitos", "a maioria", "raramente")? (princípio 26)
- [ ] Dá pra descrever em <10 palavras? (princípio 30)

---

## Regras

- **Não usar** mais de 3 cores na página inteira
- **Não usar** ease-in em animações (sempre ease-out)
- **Não usar** scale(0) em entradas — começar de scale(0.95) com opacity(0)
- **Não usar** palavras vagas: "muitos", "a maioria", "raramente", "talvez"
- **Sempre** mostrar o produto antes de texto explicativo
- **Sempre** ter um CTA que diz exatamente o que acontece ("Analisar Meu Site" ao invés de "Começar")
- **Sempre** ter footer com algo compartilhável

---

## Créditos

**Marc Lou** (@marclou) — 32 Princípios de Produto Viral.
5 anos construindo 35 startups em público.
Use como bússola, não como checklist.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Viral Landing|Skills - Viral Landing]]
<!-- vault-navigation:end -->
