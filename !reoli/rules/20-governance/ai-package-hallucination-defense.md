---
tipo: "regra_reolicode"
nome: "Regra — Defesa contra Alucinação de Pacotes IA"
camada: "20-governance"
dominio: "seguranca-ia"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","20-governance"]
hub_pai: "[[REOLI]]"
aliases: ["Defesa contra Alucinação de Pacotes IA"]
---

# Defesa contra Alucinação de Pacotes IA

## Objetivo

Prevenir ataques de *slopsquatting* (uso de pacotes inexistentes alucinados por IA) e garantir que todas as dependências adicionadas ao projeto sejam reais, seguras e validadas.

## Regra do Agente

Ao sugerir ou adicionar uma nova dependência, o agente de IA deve obrigatoriamente verificar a existência real e a reputação do pacote antes de incluí-lo nos arquivos de dependências (`package.json`, `requirements.txt`, `pom.xml`, etc.). 

1. Nunca invente nomes de pacotes, caminhos de importação ou versões.
2. Valide sempre a existência em registros oficiais (npm, PyPI, Maven Central).
3. Analise métricas essenciais como volume de downloads, presença de repositório no GitHub e status de manutenção.
4. Mantenha as verificações de integridade de arquivos *lock* (`package-lock.json`, `yarn.lock`, etc.).

---

# 1. Validação de Registros Oficiais

Antes de adicionar qualquer pacote, confirme que ele existe no registro oficial da linguagem ou ecossistema em uso. Nomes que pareçam perfeitamente lógicos para o problema ("too-perfect names") são frequentemente alucinações.

* **Node.js**: Pesquise no [npmjs.com](https://www.npmjs.com)
* **Python**: Pesquise no [pypi.org](https://pypi.org)
* **Java/Kotlin**: Pesquise no Maven Central
* **Go**: Verifique se o módulo existe e é público via `go list -m`
* **Rust**: Pesquise no [crates.io](https://crates.io)

**Sinais de um pacote alucinado:**
* Nome genérico demais ou exatamente igual à funcionalidade pedida (ex: `react-llm-integration-hook`).
* Ausência completa de repositório vinculado (ex: sem link para o GitHub).
* Zero ou número extremamente baixo de downloads.
* Data de criação muito recente, mas versão sugerida alta (ex: criado há 2 dias, mas na versão 4.1.0).

---

# 2. Métricas de Reputação e Manutenção

Não basta o pacote existir. Verifique se ele é:

1. **Ativamente mantido:** Último commit/release nos últimos 6-12 meses.
2. **Utilizado pela comunidade:** Número razoável de downloads e estrelas (quando aplicável).
3. **Autêntico:** Evite *typosquatting* (ex: `cross-env` vs `crossenv`).

---

# 3. Import Paths e Versões

Não assuma caminhos de importação. Siga estritamente a documentação oficial do pacote.

**Correto:**
```javascript
// Verificado via documentação oficial do date-fns
import { format } from 'date-fns';
```

**Incorreto:**
```javascript
// Alucinação comum de estrutura de diretório
import { format } from 'date-fns/utils/formatDate';
```

Nunca adicione versões genéricas como `*` ou `latest`. Especifique versões reais e fixadas de preferência (ex: `^1.2.3`), baseadas na documentação oficial atual.

---

# 4. Integridade de Lock Files

Sempre gere e verifique o arquivo de lock correspondente (`package-lock.json`, `poetry.lock`, etc.) para assegurar as hashes de integridade.

Não modifique manualmente arquivos *lock*. Sempre utilize os gerenciadores de pacotes oficiais para isso:

```bash
# Correto (gera/atualiza o lock automaticamente)
npm install pacote-real@1.2.3
```

---

# Critérios de Aceite

* [ ] O pacote existe no registro oficial.
* [ ] Possui link válido para código fonte (ex: GitHub).
* [ ] Possui histórico de downloads coerente com sua utilidade.
* [ ] A versão especificada existe de fato.
* [ ] O caminho de importação está correto e documentado.

[Catálogo de regras](../README.md)
