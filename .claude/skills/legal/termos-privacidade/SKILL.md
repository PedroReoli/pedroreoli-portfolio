---
tipo: skill
nome: Termos de Uso e Privacidade LGPD
name: termos-privacidade
aliases:
  - termos-privacidade
  - /termos-privacidade
  - Termos de Uso e Privacidade LGPD
tags:
  - h4
  - skill
  - juridico
  - lgpd
  - reolios
camada: 3_folha
dominio: juridico
categoria: legal
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Legal]]'
description: >
  Redige minutas de Termos de Uso e Política de Privacidade a partir do tratamento real de dados.
  Use em rascunhos para SaaS ou comércio eletrônico, com lacunas para revisão jurídica.
---

# Termos de Uso e Privacidade LGPD

Redija documentos fiéis à operação observada. Uma minuta gerada pela skill não comprova conformidade legal da empresa.

---

## 🧭 Contexto do Negócio

Antes de escrever, consulte:
1. `sistema/memoria/empresa.md` — nicho da empresa e dados que costuma coletar.
2. Informações vitais da plataforma:
   - Quais dados dos usuários são coletados (nome, email, cartão, cookies)?
   - Como os dados são armazenados e com quem são compartilhados (gateways de pagamento, ferramentas de analytics)?
   - Qual a política de cancelamento/reembolso?
   - Existem usuários menores de idade?

---

## 📐 Estrutura de trabalho para revisão

### Para a Política de Privacidade
1. **Controlador dos Dados:** Quem é a empresa responsável.
2. **Dados Coletados e Finalidade:** O que você coleta e por quê (ex: email para login, endereço para entrega).
3. **Compartilhamento de Dados:** Terceiros que acessam os dados (ex: Stripe, AWS).
4. **Direitos do Titular (Art. 18 LGPD):** Como o usuário pode pedir para ver, alterar ou excluir seus dados.
5. **Segurança e Retenção:** Como você protege os dados e por quanto tempo os guarda.
6. **Canal de Comunicação:** contato para assuntos de privacidade e identificação do encarregado quando aplicável à organização.

### Para os Termos de Uso
1. **Aceitação:** mecanismo real de ciência e aceite dos termos, conforme fluxo do produto.
2. **Regras de Uso:** O que o usuário pode ou não fazer (ex: proibido engenharia reversa, proibido uso ilícito).
3. **Propriedade Intelectual:** Direitos autorais do conteúdo da plataforma.
4. **Pagamentos e Assinaturas (SaaS/E-commerce):** Regras de cobrança, renovação automática e estorno.
5. **Limitação de Responsabilidade:** Até onde a empresa se responsabiliza por falhas de terceiros ou indisponibilidades de servidor.

---

## 🗣 Adaptação de Linguagem

Termos legais não precisam ser ilegíveis.
- **Linguagem Acessível:** Substitua o "juridiquês" por linguagem clara. (Ex: Em vez de "Fica eleito o foro para dirimir...", use "Qualquer disputa será resolvida na justiça da cidade de...").
- **Resumo Executivo (TL;DR):** É uma boa prática adicionar um resumo no topo de cada seção longa, explicando em uma frase o que aquele trecho significa.

---

## 📤 Formato de Saída (Output)

Ao gerar os documentos, entregue:
1. **O Documento Completo:** Termos de Uso e Política de Privacidade estruturados em Markdown.
2. **Lacunas para Preenchimento:** Campos destacados como `[INSERIR DADO]` onde o usuário precisa colocar informações específicas.
3. **Guia de Implementação:** Um breve passo a passo de como exibir o aviso de cookies e coletar o consentimento no site.

**Briefing de exemplo:** “SaaS B2B com cadastro por e-mail, analytics opcional, cobrança por gateway e suporte por e-mail; preciso de minutas”. Primeiro monte matriz `dado | finalidade | base legal proposta | operador/terceiro | retenção | evidência`. Marque `não informado` em vez de presumir base legal, prazo ou transferência internacional. Revise o fluxo real de cookies; nem todo tratamento depende de consentimento. Entregue minutas com pendências e solicite revisão jurídica antes de publicar.

**Fontes:** [ANPD: agentes de tratamento e encarregado](https://www.gov.br/anpd/pt-br/assuntos/noticias/nova-versao-do-guia-dos-agentes-de-tratamento) e [ANPD: legítimo interesse](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_hipoteses_legais_tratamento_de_dados_pessoais_legitimo_interesse).

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Legal|Skills - Legal]]
<!-- vault-navigation:end -->
