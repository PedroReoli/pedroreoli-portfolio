---
tipo: "regra_reolicode"
nome: "Regra — Concorrência de Múltiplos Agentes"
camada: "30-workflow"
dominio: "fluxo-trabalho"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","30-workflow"]
hub_pai: "[[REOLI]]"
aliases: ["Concorrência de Múltiplos Agentes"]
---

# Concorrência de Múltiplos Agentes

## Objetivo

Gerenciar e mitigar conflitos quando múltiplos agentes de IA trabalham de forma paralela no mesmo repositório ou base de código, garantindo a integridade do código e prevenindo retrabalho.

## Regra do Agente

Quando for informado que há concorrência de múltiplos agentes ou quando observar atividades simultâneas:

1. Estabeleça bloqueios lógicos (file-level locking) informando em quais arquivos está trabalhando.
2. Comunique-se através de *commits* atômicos ou protocolos inter-agentes.
3. Isole o trabalho usando estratégias de branch por agente.
4. Ao menor sinal de conflito irreversível, alerte o operador humano.

---

# 1. Estratégias de Isolamento de Branch

Um agente por branch. Esta é a regra de ouro para evitar colisões catastróficas.

* **Agente A**: Trabalha na branch `agent/feature-auth`
* **Agente B**: Trabalha na branch `agent/feature-dashboard`

O uso de **Git Worktrees** é altamente recomendado se ambos precisarem compartilhar a mesma raiz local do sistema de arquivos sem interferir na área de *staging* ou histórico não consolidado do outro.

---

# 2. Convenções de Locking e Fronteiras (Boundaries)

Os agentes devem respeitar as responsabilidades definidas por diretório ou módulo.

* **Fronteira Clara**: Agente A lida com `src/backend/` e Agente B lida com `src/frontend/`.
* **Shared State**: Arquivos de configuração compartilhados (como `package.json`, `.env`, `docker-compose.yml`) requerem permissão de "lock" (sinalização num arquivo de registro ou coordenação com o usuário) antes da edição. Evite escritas simultâneas no mesmo arquivo de *configuração*.

---

# 3. Protocolos de Comunicação

Para agentes rodando na mesma infraestrutura que suportam troca de mensagens:

* **Sinalização de Início**: "Iniciando refatoração no arquivo `src/utils/math.ts`".
* **Sinalização de Conclusão**: "Arquivo liberado, pull request atualizado."
* Não altere o histórico de outro agente (não faça `git push --force` numa branch compartilhada).

---

# 4. Estratégias de Reconciliação (Diffs e Merges)

Quando ocorrerem conflitos de merge (Merge Conflicts):

1. **Ação Primária:** Puxe as atualizações recentes usando `git fetch` seguido de `git rebase` ou `git merge`.
2. **Revisão:** Analise as marcações de conflito (`<<<<<<<`, `=======`, `>>>>>>>`). Resolva preservando a intenção de ambos os lados se possível.
3. **Escalonamento:** Se o conflito for em estruturas críticas, ou envolver grandes refatorações realizadas pelo outro agente, **pare**. Reclame a situação ao operador humano para tomar a decisão executiva de arquitetura. Não tente adivinhar a lógica de negócio complexa de outro agente durante um conflito pesado.

---

# Critérios de Aceite

* [ ] Os agentes possuem branches e, preferencialmente, ambientes (ou worktrees) separados.
* [ ] Responsabilidades sobre arquivos ou diretórios foram estabelecidas antes da execução.
* [ ] Arquivos críticos (`package.json`, etc.) são manipulados de maneira sincronizada.
* [ ] Conflitos críticos escalam para decisão humana em vez de sobrescrita destrutiva.

[Catálogo de regras](../README.md)
