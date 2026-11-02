---
tipo: skill
nome: Otimizador de Prompts e Economia de Tokens
name: skill-optimizer
aliases:
  - skill-optimizer
  - /skill-optimizer
  - Otimizador de Prompts e Economia de Tokens
tags:
  - h4
  - skill
  - dev
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: dev
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Dev Eng]]'
description: >
  Otimiza prompts, instruções de sistema e arquivos SKILL.md para máxima
  clareza, ativação precisa e menor consumo de tokens. Use quando pedir
  "otimizar skill", "reduzir tokens de prompt", "melhorar instrução", "skill-
  optimizer" ou "/otimizar-skill".
---

# Otimizador de Prompts e Economia de Tokens

Refina instruções e mede se a revisão melhora a execução. Clareza e saída tipada reduzem falhas, mas não eliminam alucinações.

---

## 🎯 Por que Otimizar Skills?

- **Custo e Velocidade:** Menos tokens no prompt significam respostas mais rápidas e contas de API menores.
- **Ativação:** Descrições específicas podem melhorar a seleção da skill; confirme em tarefas reais, sem presumir taxa de fidelidade.

---

## 📐 Heurísticas de Otimização (Padrão Matteo Collina / Fastify)

1. **Prefira poucas regras de alto impacto** em vez de dezenas de sugestões vagas.
2. **Use checklists diretos** para comportamentos críticos (o que DEVE e o que NÃO DEVE ser feito).
3. **Elimine conversação vazia:** Remova introduções óbvias como *"Como uma IA você deve..."* — vá direto para o verbo de ação.
4. **Inclua 1 exemplo concreto** de entrada e saída. Exemplos reduzem alucinações mais do que 3 parágrafos de explicação.

---

## 🔍 Checklist de Refatoração de uma Skill

- [ ] A descrição no frontmatter YAML tem gatilhos claros e objetivos?
- [ ] O tamanho do arquivo está dentro do orçamento ideal (< 300 linhas)?
- [ ] Não há termos contraditórios ou ambíguos?
- [ ] Os caminhos de arquivos e comandos de terminal são exatos e funcionais?

## Entrada, revisão e teste

**Briefing de exemplo:** “A skill de orçamento é chamada para propostas jurídicas e inventa preços; revise gatilhos e prova”. Receba skill original, três pedidos reais, saídas esperadas e falhas observadas.

1. Congele uma cópia do original para comparação. Liste cada instrução vaga, conflito, ação sem autorização e fato sem fonte.
2. Reescreva descrição com tarefa e gatilhos; no corpo, defina entrada, sequência, saída e tratamento de ausência de dados.
3. Execute os mesmos casos no original e na revisão quando houver ambiente de avaliação. Compare seleção da skill, correção dos fatos, formato e custo de contexto. Não atribua melhoria a contagem menor de tokens sozinha.
4. Entregue diff, tabela de resultados e riscos remanescentes. Se não for possível executar casos, marque a revisão como editorial não validada.

**Saída exemplo:** `caso orçamento sem preço | antes: inventou R$ 2.000 | depois: marcou preço pendente | evidência: saídas anexas`.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->
