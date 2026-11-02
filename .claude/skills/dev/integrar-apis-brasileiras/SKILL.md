---
tipo: skill
nome: Integrar APIs brasileiras de dados públicos
name: integrar-apis-brasileiras
aliases: [integrar-apis-brasileiras, /apis-brasileiras, consulta-cnpj-cep]
tags: [skill, dev, brasil, api, cnpj, cep, reolios]
camada: 3_folha
dominio: tecnologia
categoria: dev
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Dev]]'
description: >
  Integra consultas brasileiras como CNPJ e CEP com contrato, proveniência e tratamento de falhas.
  Use quando implementar validação cadastral ou enriquecimento por APIs brasileiras.
---

# Integrar APIs brasileiras de dados públicos

## Entrada

Receba identificador consultado, finalidade, fornecedor aprovado, volume, limite de latência, dados pessoais envolvidos e comportamento quando a fonte falhar. Exemplo: “Preencher razão social ao digitar CNPJ no cadastro, sem bloquear a conclusão do formulário se a consulta estiver indisponível”.

## Processo

1. Escolha a fonte conforme elegibilidade e contrato. A API oficial de CNPJ do Conecta gov.br tem público de acesso definido; não presuma acesso universal. BrasilAPI é projeto comunitário e deve ser identificado como tal.
2. Verifique documentação e status atual do endpoint escolhido. Valide formato de entrada, inclusive mudanças de identificadores alfanuméricos quando aplicáveis. Não construa URL com entrada não validada.
3. Separe dado fornecido pelo usuário de dado retornado pela API. Registre `fonte`, `consultado_em` e `status`. Não trate ausência ou desatualização como inexistência da empresa.
4. Estabeleça timeout, tratamento de 400/404/429/5xx, limite de taxa, retentativa limitada para falhas transitórias e fallback manual. Não registre CNPJ completo e respostas com dados pessoais em logs sem necessidade.
5. Defina finalidade, retenção e acesso aos dados; revisão jurídica é necessária quando houver uso de dados pessoais em escala. Teste entradas inválidas, não encontradas e indisponibilidade do fornecedor.

## Saída esperada

Entregue matriz `campo | fonte | tipo | obrigatório | atualização`, contrato de erro, código e testes de integração com respostas simuladas, mais resultado de uma consulta real somente se executada. Exemplo: `razao_social | BrasilAPI CNPJ v1 | string | não | 2026-10-01`; o formulário permite correção manual.

## Fontes

- [Conecta gov.br: API CNPJ](https://www.gov.br/conecta/catalogo/apis/consulta-cnpj/swagger_api_cnpj.md/swagger_view).
- [BrasilAPI: contrato CNPJ](https://github.com/BrasilAPI/BrasilAPI/blob/main/pages/docs/doc/cnpj.json).
- [BrasilAPI: documentação do projeto](https://github.com/BrasilAPI/BrasilAPI).
