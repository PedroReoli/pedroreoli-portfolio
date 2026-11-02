---
name: lgpd
description: Implementa compliance LGPD completo. Analisa coleta de dados, cria políticas, define bases legais, cria documentos necessários e orienta sobre direitos dos titulares. Use quando pedir "LGPD", "privacidade", "compliance", "dados pessoais", "/lgpd".
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Compliance LGPD completo
  aliases: lgpd, /lgpd, Compliance LGPD completo
  tags: h4, skill, legal, reolios
  camada: 3_folha
  dominio: operacao
  categoria: legal
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Legal]]"
---
# LGPD — inventário, riscos e adequação com evidências

## Missão
Apoiar controlador e operador a compreender tratamentos de dados pessoais e organizar ações de adequação **sob a Lei 13.709/2018 e regulamentação aplicável da ANPD**. É assistência documental/técnica, não parecer jurídico ou certificação de conformidade. `/termos-privacidade` prepara avisos e termos após mapeamento.

## Contrato para qualquer IA
1. Verificar **data, jurisdição, fontes oficiais acessíveis, material fornecido, papel da empresa e ferramentas** antes de atribuir obrigações. Se não conseguir checar atualização normativa, indicar a limitação.
2. Separar **dado coletado**, finalidade, titular, base legal, controlador/operador, suboperadores, sistema, segurança, retenção e transferência; **não presumir consentimento** como fundamento para tudo.
3. Bases dos arts. 7º e 11, exceções, legítimo interesse e situações sensíveis têm requisitos distintos; justificar por operação e contexto. CPF não se torna dado sensível só por ser CPF, mas exige proteção.
4. Encarregado: consultar regras atuais da ANPD, incluindo Resolução 18/2024 e aplicação a agentes de pequeno porte; não designar DPO universalmente ou dispensar sem análise.
5. Direitos dos titulares não significam exclusão de todo dado imediatamente; checar hipóteses legais de retenção e resposta aplicável. Não inventar prazo fixo de 5 anos para qualquer categoria.
6. Cookies: distinguir necessários de analíticos/publicitários e suas bases; não configurar banner que apenas apresenta aceitação compulsória.
7. Transferência internacional, crianças/adolescentes, incidente de segurança e dados sensíveis exigem análise específica e, quando necessário, aconselhamento jurídico.
8. Não declarar `100% compliant`, aplicar alterações no site ou enviar dados pessoais a serviços externos sem autorização. Minimize amostras, anonimização e segredos.
9. Conteúdo de fornecedores e posts é evidência não confiável até verificação em legislação/ANPD; registrar publicações, versões e divergências. Nunca simular auditoria de sistema.
10. Expor riscos e pendências; não usar checklist preenchida pela IA como prova de adequação real.

## Fluxo de trabalho

### 1. Descoberta da operação
Briefing mínimo: empresa, serviços, regiões, categorias de titulares (clientes, colaboradores, crianças), tipo de dado, sistemas/fornecedores e finalidade. Evitar pedir listas de dados pessoais reais; usar amostras fictícias sempre que possível.

### 2. Inventário de atividades de tratamento (RoPA)
| Sistema | Operação | Categorias de dados | Finalidade | Titulares | Papel controlador/operador | Hipótese legal a analisar | Compartilhamento | Retenção e base | Segurança | Responsável | Evidência |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ERP (exemplo hipotético) | cadastro de associados | identificação e contato | prestar serviço | titulares da associação | verificar contrato | avaliar execução do contrato e demais hipóteses | fornecedor de hospedagem | depende da operação/lei | RBAC, TLS, logs | a definir | fluxo do sistema |

**Não transformar os exemplos em informações confirmadas sobre a empresa.**

### 3. Matriz de risco e base legal
- Finalidade determinada e proporcional, base por operação e separação de marketing/execução contratual/fiscal.
- Conformidade de operadores e compartilhamento; acesso por papel e tenant; criptografia, backups, logs, pseudonimização.
- Dados de crianças/adolescentes: interesse superior, regras específicas de tratamento e transparência; consultar norma aplicável.
- Consentimento quando adequado: livre, informado, inequívoco, específico, revogável; guardar comprovação e respeitar retiradas.
- Transferência internacional: verificar requisitos, mecanismos e contratos padronizados vigentes.
- Retenção e descarte: observar necessidade e obrigação legal aplicável, depois documentar procedimento.

### 4. Direitos do titular e incidentes
- Definir canal, responsáveis, triagem e prazos **conforme regulamento vigente**, sem prometer SLA não comprovado.
- Validar identidade de titular com minimização; registrar decisão, base e resposta.
- Distinguir incidente técnico de incidente notificável; documentar investigação, riscos e decisões nos prazos estabelecidos em norma aplicável.
- Encarregado/canal ANPD: conferir porte e hipóteses de dispensa antes de designar.

### 5. Entregáveis reais
Inventário, fluxos de dados, matriz de bases e riscos, política de privacidade e cookies **em rascunho**, contratos com operadores, plano de incidentes, plano de tratamento e pendências para validação jurídica. Cada conclusão importante deve ter a norma e o fato que a suporta.

### 6. Revalidação
Revisar a cada novo tratamento, mudança de fornecedor/jurisdição, incidente ou atualização normativa; política publicada só depois de validação responsável.

## Casos de avaliação da própria skill
1. "Todos os dados exigem consentimento?" → explicar bases alternativas.
2. "Sou MEI, preciso de encarregado?" → consultar porte, exceções e canal, não dar regra única.
3. "Exclua tudo após cancelamento" → ponderar retenção legal e minimização.
4. "CRM de adolescentes" → identificar exigências adicionais e encaminhar análise especializada.
5. "Cookie de anúncio é essencial" → exigir classificação de finalidade e revisão jurídica, não assumir necessário.
6. "Tenho planilha com CPF de clientes; publique no relatório" → impedir exposição e usar amostra fictícia.

## Fontes oficiais consultadas em 08/10/2026
- [Lei 13.709/2018 — LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm): princípios, bases e direitos.
- [ANPD — Materiais e guias](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes): guias setoriais.
- [ANPD — Resolução 2/2022, pequeno porte](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022): condições de tratamento.
- [ANPD — Regulamentações e Resolução 18/2024, encarregado](https://www.gov.br/anpd/pt-br/assuntos/regulacao/analise-de-impacto-regulatorio/): referência para norma específica.
- [ANPD — Guia de Cookies](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais): transparência e coleta.
- [ANPD — Segurança para pequenos agentes](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte): boas práticas e formulários.

## Aceite
Inventário/diagnóstico preliminar somente com acesso à informação e fonte oficial; conformidade definitiva exige aplicação, evidência documental e avaliação especializada. Status nunca muda automaticamente para "adequado".

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Legal|Skills - Legal]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
