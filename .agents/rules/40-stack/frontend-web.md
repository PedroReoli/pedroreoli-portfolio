---
tipo: "regra_reolicode"
nome: "Regra — Regra de Frontend Web"
camada: "40-stack"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","40-stack"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Frontend Web"]
---

# Regra de Frontend Web

## Objetivo

Criar interfaces web leves, previsíveis, acessíveis e organizadas, mantendo apresentação, estado, dados e comportamento com fronteiras claras.

## Responsabilidade

O frontend deve principalmente:

* apresentar dados;
* coletar entrada;
* controlar interação;
* representar estados;
* consumir contratos do backend.

O frontend não é fonte confiável para regras críticas de negócio, autorização, preço, ownership ou integridade.

Siga `security.md` para essas fronteiras.

## Componentes

Componentes devem permanecer focados em apresentação ou orquestração.

Evite misturar no mesmo componente:

* layout extenso;
* acesso a dados;
* regras de negócio;
* transformação complexa;
* estado compartilhado;
* efeitos não relacionados.

Extrações e recursos reutilizáveis devem seguir `architecture.md`, `component-boundaries.md` e `modularization.md`.

Recursos reutilizáveis entre diferentes partes do projeto devem utilizar o contexto `shared`.

## Estado

Mantenha o estado o mais próximo possível de quem realmente precisa dele.

Diferencie:

* estado local de UI;
* estado compartilhado;
* estado do servidor;
* estado derivado;
* estado persistido.

Não copie estado derivado sem necessidade.

Não transforme todo estado em global.

Não mantenha múltiplas fontes de verdade para a mesma informação.

## Dados e Requests

Acesso a APIs deve utilizar a camada definida pelo projeto.

Evite `fetch` ou chamadas externas espalhadas por componentes quando existir service/client dedicado.

Trate explicitamente:

* loading;
* sucesso;
* vazio;
* erro;
* retry quando apropriado.

Requests obsoletos não devem sobrescrever estado atual quando isso puder causar inconsistência.

Não carregue dados excessivos apenas para filtrar no navegador quando o backend puder fazê-lo adequadamente.

## Renderização

* Não execute processamento pesado durante render.
* Evite efeitos usados apenas para derivar valores que poderiam ser calculados diretamente.
* Evite re-renderizações causadas por estado mal posicionado.
* Não utilize memoização automaticamente.
* Utilize otimizações quando houver custo ou benefício justificável.

Siga `performance.md`.

## React

Quando utilizar React:

* mantenha componentes previsíveis;
* preserve regras corretas de hooks;
* evite `useEffect` para lógica que não representa efeito externo;
* evite estados derivados desnecessários;
* mantenha dependências de efeitos corretas;
* evite props instáveis quando causarem impacto relevante;
* extraia comportamento reutilizável para hooks quando possuir responsabilidade clara.

Hooks reutilizáveis devem seguir a estrutura `shared` quando aplicável.

## Next.js

Quando utilizar Next.js:

* respeite a fronteira Server/Client;
* não transforme componentes em Client Components sem necessidade;
* mantenha secrets e operações privilegiadas exclusivamente no servidor;
* evite hidratação desnecessária;
* utilize recursos nativos de routing, metadata e imagens quando apropriados;
* escolha estratégia de renderização conforme necessidade real dos dados.

Não adicione `"use client"` apenas para contornar uma decisão arquitetural mal resolvida.

## Vite / SPA

Quando utilizar Vite ou SPA:

* controle crescimento do bundle;
* divida rotas ou features pesadas quando necessário;
* centralize configuração de ambiente;
* não exponha secrets através de variáveis client-side;
* trate carregamento inicial como parte da performance do produto.

## Formulários

Formulários são fluxos funcionais, não apenas elementos visuais.

Devem considerar:

* validação;
* estados de envio;
* erro;
* sucesso;
* campos obrigatórios;
* prevenção de envio duplicado quando necessário;
* acessibilidade;
* mensagens claras.

Validação no frontend melhora UX, mas não substitui validação no backend.

## HTML e Acessibilidade

Prefira HTML semântico.

Utilize elementos nativos adequados antes de recriar comportamento com `div`.

Garanta quando aplicável:

* labels;
* foco visível;
* navegação por teclado;
* ordem lógica;
* feedback de erro;
* estados disabled;
* atributos ARIA quando HTML nativo não for suficiente.

Não utilize ARIA para substituir semântica nativa disponível.

## Responsividade

Toda alteração relevante de interface deve considerar diferentes larguras.

Não considere uma tela concluída apenas porque funciona no desktop.

Siga `responsiveness.md`.

## Navegação e UX

Mudanças de estado devem possuir feedback previsível.

Evite:

* loading sem indicação;
* botões que parecem não responder;
* mudanças bruscas sem contexto;
* erros silenciosos;
* navegação bloqueada sem explicação.

Preserve contexto do usuário quando isso melhorar o fluxo.

## Browser APIs

Código executado durante SSR ou build não deve assumir disponibilidade de:

* `window`;
* `document`;
* `localStorage`;
* `navigator`;
* outras APIs exclusivas do navegador.

Acesse essas APIs somente no contexto apropriado.

## Dependências

Antes de adicionar biblioteca frontend:

* procure solução existente no projeto;
* avalie necessidade;
* considere tamanho;
* considere manutenção;
* considere impacto no bundle.

Não adicione dependência grande para comportamento trivial.

## Critérios de Aceite

Antes de considerar uma alteração relevante de frontend concluída, verifique quando aplicável:

* [ ] componente possui responsabilidade clara;
* [ ] estado possui fonte de verdade definida;
* [ ] dados são acessados pela camada correta;
* [ ] loading, vazio e erro foram considerados;
* [ ] não existe lógica crítica confiada somente ao frontend;
* [ ] responsividade foi validada;
* [ ] navegação por teclado continua funcional;
* [ ] não existe overflow inesperado;
* [ ] console não apresenta erro introduzido pela alteração;
* [ ] testes relevantes foram executados.

## Resultado esperado

O frontend deve permanecer fácil de compreender e evoluir, com componentes focados, estado previsível, contratos claros e comportamento consistente em diferentes dispositivos.

[Catálogo de regras](../README.md)
