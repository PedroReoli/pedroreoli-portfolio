---
tipo: skill
nome: Compliance LGPD completo
name: lgpd
aliases:
  - lgpd
  - /lgpd
  - Compliance LGPD completo
tags:
  - h4
  - skill
  - legal
  - reolios
camada: 3_folha
dominio: operacao
categoria: legal
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Legal]]'
description: >
  Implementa compliance LGPD completo. Analisa coleta de dados, cria políticas,
  define bases legais, cria documentos necessários e orienta sobre direitos dos
  titulares. Use quando pedir "LGPD", "privacidade", "compliance", "dados
  pessoais", "/lgpd".
---

# Compliance LGPD completo

Implementa ou audita conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).

## Dependências

- **Contexto:** `sistema/memoria/empresa.md` (tipo de dados coletados)
- **Output:** `saidas/legal/lgpd/`

---

## Workflow

### Passo 1 — Mapeamento de Dados

Perguntar ao usuário:
1. Quais dados pessoais coleta? (nome, email, CPF, endereço, etc)
2. Como coleta? (formulário, API, cookies, terceiros)
3. Para que usa esses dados? (cadastro, marketing, pagamento, suporte)
4. Onde armazena? (banco próprio, nuvem, terceiros)
5. Quem tem acesso? (equipe, fornecedores, parceiros)
6. Quanto tempo mantém? (tempo mínimo necessário)

### Passo 2 — Inventário de Dados

Criar tabela de mapeamento:

| Dado | Tipo | Como coleta | Para que usa | Base Legal | Retention |
|------|------|------------|--------------|------------|-----------|
| Nome | Identificador | Formulário | Cadastro, comunicação | Execução de contrato | 5 anos |
| Email | Contato | Formulário | Login, marketing | Consentimento | Até exclusão |
| CPF | Sensível | Formulário | Pagamento, NF | Obrigação legal | 10 anos |
| ... | | | | | |

### Passo 3 — Bases Legais

Definir base legal para cada tratamento:

```
┌─────────────────────────────────────────────────────────────┐
│                    BASES LEGAIS DA LGPD                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Art. 7º - consentimento                                    │
│  ├── Cliente concorda explicitamente                       │
│  ├── Finalidade específica                                  │
│  └── Pode撤回 a qualquer momento                           │
│                                                             │
│  Art. 7º - obrigação legal                                  │
│  ├── NF, impostos, FGTS, etc                              │
│  └── Não precisa de consentimento                          │
│                                                             │
│  Art. 7º - execução de contrato                              │
│  ├── Necessary para prestar serviço                        │
│  └── Dados do contrato em si                               │
│                                                             │
│  Art. 7º - legítimo interesse                                │
│  ├── Interesse do controlador                              │
│  ├── Não prejudica o titular                               │
│  └── Balanceamento documentado                             │
│                                                             │
│  Art. 7º - proteção da vida                                 │
│  ├── Emergências médicas                                    │
│  └── Proteção em desastres                                 │
│                                                             │
│  Art. 11 - proteção crediticia                              │
│  ├── score de crédito                                       │
│  └── regras específicas da Serasa                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Passo 4 — Documentação Necessária

**1. Política de Privacidade**
```
├── Identificação do controlador
├── Dados coletados e finalidade
├── Base legal para cada tratamento
├── Compartilhamento com terceiros
├── Cookies e tecnologias
├── Retenção de dados
├── Direitos do titular (ACESSAR, CORRIGIR, EXCLUIR, PORTABILIDADE)
├── Contato do DPO/Encarregado
├── Alterações na política
```

**2. Termos de Uso**
```
├── Aceitação necessária
├── Regras de uso
├── Conteúdo gerado pelo usuário
├── Propriedade intelectual
├── Limitação de responsabilidade
├── Resolução de disputas
```

**3. Termo de Consentimento** (se aplicável)
```
├── Finalidade específica
├── Dados coletados
├── Como usar
├── Compartilhamento
├── Tempo de retenção
├── Direito de exclusão
├── Assinatura do titular
```

**4. Aviso de Cookies**
```
├── Quais cookies usa
├── Finalidade de cada um
├── Como desativar
├── Third-party cookies
```

### Passo 5 — Medidas Técnicas e Organizacionais

Implementar medidas:

```
┌─────────────────────────────────────────────────────────────┐
│                    MEDIDAS DE PROTEÇÃO                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TÉCNICAS:                                                  │
│  ├── Criptografia em repouso (banco)                        │
│  ├── TLS em trânsito (HTTPS)                               │
│  ├── Controle de acesso (RBAC)                            │
│  ├── Logs de auditoria                                     │
│  ├── Backup criptografado                                  │
│  ├── MFA para dados sensíveis                             │
│  └── Pseudonimização quando possível                       │
│                                                             │
│  ORGANIZACIONAIS:                                           │
│  ├── Treinamento da equipe                                 │
│  ├── Políticas de segurança                                │
│  ├── DPO/Encarregado designado                            │
│  ├── Processos de resposta a incidentes                    │
│  ├── Avaliação de impacto (quando necessário)              │
│  └── Acordos de processamento (DPA)                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Passo 6 — Plano de adequação

Se o negócio já opera e não está compliant:

```
PRIORIDADE 1 (Imediato):
├── Mapear dados existentes
├── Implementar consentimento
├── Criar política de privacidade
└── Designar DPO

PRIORIDADE 2 (30 dias):
├── Revisar contratos com fornecedores
├── Criar processos de exercício de direitos
├── Implementar logs de auditoria
└── Treinar equipe

PRIORIDADE 3 (60 dias):
├── Avaliação de impacto (quando aplicável)
├── Documentar tudo
└── Revisar fluxos de dados
```

---

## Estrutura de Entrega

```
saidas/legal/lgpd/
├── inventario-dados.md       ← mapeamento completo
├── politica-privacidade.md  ← política em linguagem clara
├── termo-consentimento.md   ← se aplicável
├── aviso-cookies.md         ← se aplicável
├── medidas-seguranca.md     ← técnicas e organizacionais
├── plano-adequacao.md       ← roadmap de conformidade
└── checklist-compliance.md  ← checklist completo
```

---

## Checklist LGPD

```markdown
## Checklist de Conformidade

### Governança
- [ ] DPO/Encarregado designado
- [ ] Politica de Privacidade publicada
- [ ] Canal de atendimento ao titular
- [ ] Registro de atividades de tratamento

### Dados do Titular
- [ ] Consentimento válido (quando aplicável)
- [ ] Base legal documentada para cada tratamento
- [ ]Finalidade específica definida
- [ ] Retenção mínima definida

### Direitos do Titular
- [ ] Processo para acessar dados
- [ ] Processo para corrigir dados
- [ ] Processo para excluir dados
- [ ] Processo para portabilidade
- [ ] Processo para revogar consentimento

### Segurança
- [ ] Criptografia em repouso
- [ ] HTTPS obrigatório
- [ ] Controle de acesso
- [ ] Logs de auditoria
- [ ] Plano de resposta a incidentes

### Fornecedores
- [ ] DPA (Acordo de Processamento de Dados) com terceiros
- [ ] Verificação de conformidade de fornecedores
- [ ] Cláusulas contratuais

### Documentação
- [ ] Inventário de dados
- [ ] Política de Privacidade
- [ ] Termos de Uso atualizados
- [ ] Termo de Consentimento
- [ ] Aviso de Cookies
```

---

## Regras

- LGPD é Lei brasileira — seguir à risca
- Linguagem clara para o usuário (não jurídico)
- Sempre informar o titular sobre seus direitos
- Nunca coletar mais dados que o necessário
- Excluir dados quando a finalidade acaba
- Documentar TODO tratamento de dados
- Periodicamente revisar e atualizar políticas
- Se collecting dados de menores, regras mais rígidas
- ANPD pode aplicar multas de até R$ 50 milhões

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Legal|Skills - Legal]]
<!-- vault-navigation:end -->
