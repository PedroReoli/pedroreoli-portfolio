---
tipo: "regra_reolicode"
nome: "Regra — Writing Style"
camada: "00-foundation"
dominio: "governanca"
categoria: "regras_codigo"
prioridade: "obrigatoria"
tags: ["reoli","reolicode","00-foundation"]
hub_pai: "[[REOLI]]"
aliases: ["Writing Style"]
---

# Writing Style

## Idioma

* Escreva explicações, documentação e comentários em **Português do Brasil (PT-BR)**.
* Preserve em inglês termos técnicos consolidados quando a tradução prejudicar clareza.
* Código, nomes de arquivos, funções, classes, interfaces, tipos e variáveis devem seguir a convenção técnica da stack e do projeto.

## Comentários no Código

Use comentários com moderação.

Comentários devem servir principalmente para **localização e identificação de blocos ou responsabilidades relevantes**.

Evite comentários que apenas descrevem o código imediatamente abaixo.

```ts
// Buscar usuário pelo ID
const user = await findUserById(id);
```

Não comente código autoexplicativo.

Prefira comentários curtos de localização quando ajudarem a navegar pelo arquivo:

```ts
// Validação

// Processamento

// Persistência
```

Comentários explicativos são aceitáveis quando documentarem uma decisão, restrição ou comportamento que não seja evidente pelo código.

## Nomenclatura

Use nomes técnicos, explícitos e relacionados à responsabilidade real.

Evite nomes genéricos como:

* `utils`
* `helpers`
* `common`
* `functions`
* `data`
* `temp`
* `manager`

quando existir um nome de domínio ou responsabilidade mais específico.

Funções devem indicar claramente sua ação.

Prefira:

`validateUserAccess()`

em vez de:

`check()`

Arquivos devem representar claramente seu conteúdo ou responsabilidade.

Respeite sempre as convenções de nomenclatura já estabelecidas pela stack e pelo projeto.

## Estrutura

* Cada arquivo deve possuir uma responsabilidade clara.
* Evite concentrar responsabilidades diferentes apenas para reduzir a quantidade de arquivos.
* Prefira módulos pequenos e coesos.
* **750 linhas é o limite máximo por arquivo.**
* Ao se aproximar desse limite, avalie a divisão por responsabilidade antes de adicionar novo código.
* Não divida arquivos artificialmente apenas para cumprir o limite.

## Documentação

Documente estruturas importantes de forma curta e técnica.

Quando necessário, a documentação deve responder:

1. O que é.
2. Qual sua responsabilidade.
3. Como se relaciona com outras partes do sistema.
4. Restrições ou decisões importantes.

Evite documentação que apenas repita o código.

Para fluxos complexos, documente principalmente **decisões, contratos, dependências e pontos de entrada**, não cada implementação interna.

## Prioridade

O código deve ser compreensível principalmente por:

**estrutura → nomenclatura → tipagem → documentação → comentários**

Não use comentários para compensar código mal estruturado ou nomes pouco claros.

[Catálogo de regras](../README.md)
