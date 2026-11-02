# Fontes da revisão de /pesquisar
**Consulta:** 08/10/2026. Adaptação de princípios; sem copiar código nem afirmar compatibilidade universal de todos os agentes.

## Padrão aberto e avaliação
- https://agentskills.io/specification — estrutura SKILL.md com references/scripts opcionais e divulgação progressiva; formato aberto, suporte depende de cada agente.
- https://github.com/agentskills/agentskills — especificação e desenvolvimento do padrão.
- https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md — ciclo de criar, testar cenários, avaliar respostas e iterar.

## Skills públicas comparadas
- https://github.com/openai/plugins/blob/main/plugins/product-design/skills/research/SKILL.md — busca problemas por fontes oficiais, comunitárias e evidência observada, separando inferência.
- https://github.com/openai/plugins/blob/main/plugins/life-science-research/skills/research-router-skill/SKILL.md — triagem por especialidade, síntese com lacunas e delegação opcional.
- https://github.com/ramit-mitra/deep-research-skill/blob/main/SKILL.md — rastreamento de evidência, triangulação e pesquisa pelas lacunas. Subagentes são requisito dessa implementação, não de toda skill.
- https://github.com/Silence-view/deep-research/blob/main/skills/deep-research/SKILL.md — busca iterativa, referência de fontes e checagem adversarial; metas de 100+ fontes e algoritmos descritos não foram adotados.

## Relatos comunitários (anedóticos)
- https://www.reddit.com/r/ClaudeAI/comments/1opxgq4/i_was_wrong_about_agent_skills_and_how_i_refactor/ — caso de contextos inchados e disclosure progressivo.
- https://www.reddit.com/r/ClaudeCode/comments/1ts91es/i_logged_my_claude_code_agents_selfgovernance_for/ — guardrails sobre declarar tarefa concluída sem prova; um operador.
- https://www.reddit.com/r/ClaudeAI/comments/1qbc30u/claude_code_skills_subagents_feel_misaligned_what/ — experiência sobre ativação de skills e subagentes específica de versões.

## O que mudou no ReoliOS
1. Ferramentas por capacidade real em vez de nomes exclusivos Claude (portabilidade).
2. Comparação de SKILL.md/README/issues e fóruns antes de copiar ideias (pesquisa adversarial).
3. Registro de fonte, contexto, nível de confiança e divergências (rastreabilidade).
4. `references/` carregado somente quando necessário (contexto eficiente).
5. Casos de teste definidos antes de declarar melhoria comprovada (avaliação).

**Pendências:** testar invocação e qualidade em Claude Code, Codex, Gemini CLI e outros agentes. A existência do formato aberto não prova funcionamento nestes ambientes.