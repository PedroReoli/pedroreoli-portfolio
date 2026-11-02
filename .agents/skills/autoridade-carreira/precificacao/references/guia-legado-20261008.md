# Legado arquivado: autoridade-carreira/precificacao

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Precificação de Serviços Profissionais
name: precificacao
aliases:
  - precificacao
  - /precificacao
  - Precificação de Serviços Profissionais
tags:
  - h4
  - skill
  - autoridade-carreira
  - reolios
camada: 3_folha
dominio: autoridade
categoria: autoridade-carreira
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Autoridade Carreira]]'
description: >
  Calcula piso econômico, cenários de preço, margem, capacidade e pacotes para serviços profissionais,
  distinguindo custo, valor, risco e hipótese de disposição a pagar.
  Acione em freelancer, consultoria ou projeto sob medida; nunca invente benchmark, margem, taxa de utilização ou ROI do cliente.
metadata:
  tipo: "skill"
  nome-exibicao: "Precificação de Serviços Profissionais"
  aliases: "precificacao, /precificacao"
  tags: "h4, skill, autoridade-carreira, reolios"
  camada: "3_folha"
  dominio: "autoridade"
  categoria: "autoridade-carreira"
  subtipo: "skill"
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Autoridade Carreira]]"
---

# Precificação de Serviços Profissionais

## Missão

Produzir uma decisão de preço auditável para serviço profissional, combinando viabilidade econômica, capacidade de entrega, escopo, risco, estrutura de pacote e valor percebido. A skill deve mostrar hipóteses e sensibilidades, não declarar um “preço certo” universal.

## Princípios não negociáveis

1. **Separar custo, preço e valor.**
2. **Nenhuma taxa arbitrária.** Horas faturáveis, impostos, margem e contingência são entradas ou cenários explícitos.
3. **Markup não é margem.** Não confundir multiplicador sobre custo com margem percentual sobre preço.
4. **Preço de valor exige evidência.** Impacto econômico do cliente não pode ser inventado.
5. **Desconto troca algo.** Redução de preço deve alterar escopo, prazo, risco, volume, condição de pagamento ou compromisso.
6. **Escopo é parte do preço.** Revisões, reuniões, suporte e direitos de uso consomem capacidade.
7. **Cenário antes de falsa precisão.** Quando faltarem dados, entregar faixa com premissas.
8. **Ledger financeiro.** Marcar inputs como `FORNECIDO_PELO_USUARIO`, `VERIFICADO`, `INFERENCIA` ou `NAO_ESPECIFICADO`.

## Quando ativar

- Definir taxa/hora de referência.
- Precificar projeto fechado.
- Criar pacotes ou tiers.
- Revisar serviço subprecificado.
- Simular desconto.
- Comparar preço por hora, projeto, retainer ou valor.
- Preparar proposta comercial com limites claros.

## Modos de trabalho

| Modo | Entrega |
|---|---|
| `PISO_ECONOMICO` | taxa mínima e receita necessária |
| `PROJETO` | preço por escopo e risco |
| `PACOTES` | tiers com diferenciação real |
| `VALOR` | hipótese de valor/disposição a pagar com evidência |
| `AUDITORIA` | rentabilidade, scope creep e descontos |
| `NEGOCIACAO` | concessões condicionais e alternativas |

## Entradas

| Entrada | Obrigatória | Regra |
|---|---:|---|
| Serviço e entregáveis | sim | descrever unidade de venda |
| Capacidade disponível | sim | horas/dias por período |
| Capacidade faturável | recomendado | se desconhecida, criar cenários |
| Custos fixos do negócio | sim | separar pessoal quando apropriado |
| Custos variáveis/diretos | sim | por projeto, cliente ou transação |
| Pró-labore/remuneração desejada | recomendado | não confundir com lucro |
| Tributos/taxas | recomendado | usar regime real; se ausente, `NAO_ESPECIFICADO` |
| Margem/meta de lucro | opcional | definir base do cálculo |
| Estimativa de esforço | sim para projeto | faixa preferível a ponto único quando incerto |
| Revisões/reuniões/suporte | sim | incluir no esforço |
| Risco/variabilidade | recomendado | dependências, terceiros, incerteza |
| Mercado/alternativas | opcional | benchmarks observados, não inventados |
| Valor para o cliente | opcional | somente dados demonstráveis |

## Metodologia & Procedimento Passo a Passo

### Normalizar os conceitos

- **Receita:** valor cobrado.
- **Custo direto/variável:** cresce com a entrega ou transação.
- **Custo fixo:** existe independentemente de um projeto específico.
- **Margem de contribuição:** `(preço - custos variáveis) / preço`.
- **Markup:** acréscimo sobre uma base de custo; não equivale à margem.
- **Capacidade faturável:** horas/dias realmente vendáveis depois de admin, vendas, estudo, férias e ociosidade.
- **Piso econômico:** referência para sustentabilidade, não preço automático de mercado.

### Calcular receita necessária

Estrutura:

`receita_requerida = custos_do_negocio + remuneracao_do_socio + tributos/taxas + reservas + lucro_alvo`

Evitar dupla contagem: se a remuneração já está em custos, não somar novamente.

### Calcular capacidade faturável

`capacidade_faturavel = capacidade_total × taxa_de_utilizacao`

A taxa de utilização deve ser:
- fornecida pelo usuário;
- calculada de histórico;
- ou tratada como cenário, por exemplo baixo/base/alto.

Nunca fixar 65%, 70% ou outro número como regra universal.

### Calcular taxa de referência

`taxa_referencia = receita_requerida / capacidade_faturavel`

Separar:
- taxa de cobertura;
- taxa para meta de receita;
- taxa vendida final.

A taxa vendida pode ser maior devido a risco, especialização, urgência, direitos, escopo ou valor.

### Precificar projeto

Construir:

`custo_capacidade = esforço_estimado × taxa_referencia`

Adicionar:
- custos diretos;
- terceiros;
- licenças;
- deslocamento;
- custo de pagamento;
- contingência justificada por risco, quando aprovada.

Se o objetivo for margem `m` sobre o preço e a base de custo aplicável for `C`:

`preço = C / (1 - m)`

Usar somente quando `0 <= m < 1` e quando `C` estiver corretamente definido.

### Rodar sensibilidade

Variar:
- esforço;
- taxa de utilização;
- custos externos;
- número de revisões;
- prazo;
- margem;
- desconto.

Entregar tabela com pelo menos cenário conservador, base e agressivo quando houver incerteza material.

### Avaliar preço por valor

Somente quando houver dados do cliente:

1. Identificar resultado econômico relevante.
2. Identificar baseline.
3. Separar impacto do serviço de outros fatores.
4. Estimar faixa de valor, não “ROI garantido”.
5. Avaliar risco percebido, alternativas e urgência.
6. Definir faixa de preço que faça sentido comercialmente.

Preço baseado em valor é uma decisão sobre disposição a pagar e valor percebido; não é uma fórmula automática de “X% do benefício”.

### Criar pacotes

Cada tier deve variar algo real:
- escopo;
- velocidade;
- profundidade;
- acesso;
- suporte;
- quantidade;
- direitos;
- responsabilidade assumida.

Não criar “valor fictício” de bônus apenas para exibir desconto.

### Tratar desconto

Antes de conceder:
- recalcular margem;
- verificar piso;
- trocar por prazo maior, pagamento antecipado, redução de escopo, menor suporte ou volume mínimo;
- registrar preço cheio e concessão.

### Formalizar proposta

Incluir:
- objetivo;
- escopo incluído;
- exclusões;
- entregáveis;
- premissas;
- dependências do cliente;
- revisões;
- cronograma;
- preço;
- impostos quando aplicável;
- condições de pagamento;
- validade da proposta;
- regra de mudança de escopo.

Contratos e efeitos jurídicos específicos exigem revisão profissional adequada à jurisdição.

## Formatos de Saída

### Quadro econômico

`input | valor | status | fonte | observação`

### Cenários

`cenário | receita requerida | capacidade faturável | taxa referência | esforço | custos diretos | preço | margem estimada`

### Pacotes

`pacote | escopo | limites | prazo | suporte | preço | racional`

### Negociação

`objeção | diagnóstico | concessão possível | contrapartida | limite`

### Lacunas

Listar toda variável `NAO_ESPECIFICADO` que possa alterar materialmente o preço.

## Checklist final

- [ ] Custos, remuneração e lucro não foram misturados?
- [ ] Capacidade faturável tem origem ou está marcada como cenário?
- [ ] Tributos/taxas não foram inventados?
- [ ] Markup e margem foram diferenciados?
- [ ] Esforço inclui gestão, revisão, reunião e suporte?
- [ ] Risco foi explicitado?
- [ ] O preço de valor usa dados reais do cliente?
- [ ] Pacotes diferem em valor/escopo real?
- [ ] Desconto preserva piso e recebe contrapartida?
- [ ] Mudança de escopo tem regra explícita?
- [ ] Foram mostrados cenários quando há incerteza?
- [ ] Nenhum benchmark foi apresentado como universal sem fonte?

## Regra de ouro

**Preço sem premissa explícita é palpite; preço bom é uma decisão econômica cuja lógica sobrevive à auditoria.**

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Autoridade Carreira|Skills - Autoridade Carreira]]
<!-- vault-navigation:end -->
