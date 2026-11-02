---
tipo: "regra_reolicode"
nome: "Regra — Regra de Segurança"
camada: "20-governance"
dominio: "seguranca"
categoria: "regras_codigo"
prioridade: "obrigatoria"
tags: ["reoli","reolicode","20-governance"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Segurança"]
---

# Regra de Segurança

## Objetivo

Prevenir vulnerabilidades comuns e impedir alterações de segurança não autorizadas.

Segurança deve ser tratada como requisito funcional: **entrada não confiável → validação → autorização → execução controlada → saída segura**.

## Regra do Agente

Ao identificar uma vulnerabilidade ou risco de segurança fora do escopo atual:

1. Não altere automaticamente.
2. Informe o usuário.
3. Identifique arquivo, fluxo ou componente afetado.
4. Explique o risco e impacto provável.
5. Classifique como `baixo`, `médio`, `alto` ou `crítico`.
6. Sugira a correção.
7. Aguarde autorização antes de modificar.

Exceção: se a tarefa solicitada explicitamente for corrigir ou revisar segurança, alterações permanecem dentro do escopo aprovado.

Nunca introduza silenciosamente mudanças em autenticação, autorização, criptografia, sessão, permissões ou contratos de segurança.

---

# 1. Entradas Não Confiáveis

Considere não confiável qualquer dado vindo de:

* usuário;
* URL;
* query string;
* formulário;
* headers;
* cookies;
* arquivos;
* banco quando originado externamente;
* APIs externas;
* webhooks;
* WebSocket;
* local/session storage;
* variáveis manipuláveis pelo cliente;
* CLI;
* filas;
* imports;
* QR codes;
* deep links.

Validar no servidor sempre que houver impacto de segurança ou negócio.

Validação apenas no frontend é UX, não fronteira de segurança.

Defina quando aplicável:

* tipo;
* formato;
* tamanho;
* intervalo;
* enum permitido;
* campos obrigatórios;
* caracteres/formato aceitos.

Prefira **allowlist** quando o domínio esperado for conhecido.

---

# 2. Injection

Proteja contra:

* SQL Injection;
* NoSQL Injection;
* Command Injection;
* LDAP Injection;
* XPath Injection;
* template injection;
* header injection;
* CRLF injection.

Nunca construa comandos ou consultas sensíveis concatenando entrada externa.

Para banco:

* use queries parametrizadas;
* use parâmetros tipados;
* evite SQL dinâmico com entrada do usuário;
* valide campos usados dinamicamente em ordenação, tabela ou coluna.

Para comandos do sistema:

* evite shell quando existir API específica;
* não concatene argumentos externos;
* utilize APIs com argumentos separados;
* aplique allowlist quando comandos forem necessários.

---

# 3. XSS

Trate qualquer conteúdo externo renderizado como não confiável.

Previna:

* Stored XSS;
* Reflected XSS;
* DOM XSS.

Prefira escaping automático do framework.

Evite APIs que inserem HTML bruto.

HTML fornecido externamente deve ser sanitizado com solução apropriada antes da renderização.

Nunca considere sanitização genérica equivalente a validação de domínio.

Use CSP como camada adicional quando aplicável, não como única defesa.

---

# 4. CSRF

Operações autenticadas por credenciais enviadas automaticamente pelo navegador devem considerar CSRF.

Para operações mutáveis:

* utilize proteção CSRF quando aplicável;
* configure cookies adequadamente;
* valide origem quando necessário;
* não execute alterações de estado via `GET`.

Endpoints autenticados exclusivamente por tokens enviados explicitamente possuem modelo diferente e devem ser avaliados conforme a arquitetura.

---

# 5. Autenticação

Nunca implemente autenticação baseada apenas em informações controladas pelo cliente.

* Senhas devem usar algoritmo próprio para password hashing.
* Nunca armazene senha em texto puro.
* Não registre senha em logs.
* Não revele se usuário ou email existe quando isso facilitar enumeração indevida.
* Aplique proteção contra tentativas automatizadas quando necessário.
* Fluxos de recuperação devem usar tokens fortes, limitados e expirados.
* Alterações críticas podem exigir reautenticação.

MFA deve ser considerado para contas ou operações de maior risco.

---

# 6. Autorização

**Autenticação não significa autorização.**

Toda operação protegida deve validar no servidor:

**usuário → ação → recurso → permissão**

Nunca confie em:

* botão escondido;
* rota protegida apenas no frontend;
* role enviada pelo cliente;
* ID recebido na URL;
* estado local;
* campo `isAdmin` controlável pelo cliente.

Aplique princípio de **deny by default** quando possível.

---

# 7. IDOR / BOLA

Receber um ID válido não significa possuir autorização sobre o recurso.

Para qualquer operação baseada em identificador:

1. identifique o usuário autenticado;
2. carregue ou identifique o recurso;
3. valide autorização sobre aquele recurso;
4. somente então execute a operação.

Aplica-se a:

* IDs numéricos;
* UUIDs;
* arquivos;
* pedidos;
* usuários;
* contratos;
* documentos;
* registros financeiros.

UUID difícil de adivinhar não substitui autorização.

---

# 8. Mass Assignment

Não aplique automaticamente payload recebido sobre entidades internas.

Evite aceitar objetos completos diretamente do cliente quando apenas alguns campos podem ser modificados.

Defina explicitamente campos permitidos.

Nunca permita alteração indireta de campos como:

* role;
* permission;
* ownerId;
* balance;
* status administrativo;
* flags internas;
* auditoria.

---

# 9. Sessões, Cookies e Tokens

Sessões e tokens devem possuir:

* expiração;
* validação;
* escopo adequado;
* mecanismo seguro de revogação quando necessário.

Cookies sensíveis devem considerar:

* `HttpOnly`;
* `Secure`;
* `SameSite`.

Não coloque secrets em armazenamento acessível ao JavaScript sem necessidade arquitetural clara.

Não envie tokens em URLs.

Não exponha tokens em logs, analytics ou mensagens de erro.

JWT deve ter assinatura e claims relevantes validados no servidor.

Decodificar JWT não significa validá-lo.

---

# 10. Secrets

Nunca coloque secrets em:

* frontend;
* bundle;
* código versionado;
* logs;
* documentação pública;
* URLs;
* exemplos reais;
* variáveis client-side.

Use mecanismos apropriados de configuração ou secret management.

Considere comprometido qualquer secret exposto publicamente e recomende rotação.

---

# 11. Criptografia

Não crie algoritmos criptográficos próprios.

Use bibliotecas e algoritmos reconhecidos pela stack.

* Proteja dados sensíveis em trânsito.
* Utilize TLS corretamente.
* Não desative validação de certificado para resolver erros.
* Não reutilize senha como chave diretamente.
* Não utilize hashes rápidos para armazenamento de senhas.
* Não dependa de Base64, encoding ou obfuscação como criptografia.

Chaves devem possuir armazenamento e ciclo de vida apropriados.

---

# 12. SSRF

URLs fornecidas externamente não devem ser acessadas cegamente pelo servidor.

Quando o sistema buscar recursos externos:

* valide protocolo;
* valide destino;
* prefira allowlist quando possível;
* bloqueie destinos internos quando não forem necessários;
* limite redirects;
* defina timeout;
* limite tamanho da resposta.

Proteja especialmente acesso a:

* localhost;
* redes privadas;
* metadata services;
* serviços administrativos internos.

---

# 13. Upload de Arquivos

Nunca confie apenas em:

* extensão;
* MIME enviado pelo navegador;
* nome original.

Valide:

* tipo permitido;
* tamanho;
* conteúdo quando aplicável;
* quantidade;
* nome gerado pelo servidor.

Armazene uploads fora de locais executáveis quando possível.

Não permita que nome fornecido pelo usuário determine livremente o caminho final.

Arquivos públicos e privados devem possuir regras de acesso distintas.

---

# 14. Path Traversal

Entrada externa não deve controlar livremente caminhos do filesystem.

Previna sequências e variações equivalentes a navegação fora da raiz permitida.

Normalize o caminho e confirme que o destino final permanece dentro do diretório autorizado.

Prefira IDs internos mapeados para arquivos em vez de caminhos recebidos diretamente.

---

# 15. Deserialização e Dados Não Confiáveis

Não desserialize conteúdo externo utilizando mecanismos capazes de instanciar tipos ou executar comportamento arbitrário.

Valide schema e tipos antes de processar dados.

Não trate objetos provenientes de cache, fila, arquivo ou integração como confiáveis apenas por serem internos ao sistema.

---

# 16. APIs

Toda API deve considerar:

* autenticação;
* autorização;
* validação;
* rate limiting quando necessário;
* tamanho máximo de payload;
* paginação;
* timeout;
* contratos de entrada e saída;
* exposição mínima de dados.

Não retorne entidades internas completas automaticamente.

Retorne somente propriedades necessárias ao consumidor.

---

# 17. Rate Limit e Abuso

Proteja operações suscetíveis a automação ou custo excessivo, como:

* login;
* recuperação de senha;
* cadastro;
* envio de email/SMS;
* busca pesada;
* geração de arquivos;
* uploads;
* pagamentos;
* integrações pagas.

Considere:

* rate limit;
* quotas;
* cooldown;
* paginação;
* limite de tamanho;
* proteção contra concorrência abusiva.

Não use apenas IP quando o modelo de ameaça exigir proteção por usuário, conta ou recurso.

---

# 18. DoS e Consumo de Recursos

Entrada do usuário não deve controlar recursos ilimitados.

Defina limites quando aplicável para:

* payload;
* upload;
* paginação;
* quantidade de registros;
* profundidade;
* concorrência;
* processamento;
* memória;
* duração;
* requests externos.

Nunca permita `pageSize` ou equivalente ilimitado sem necessidade explícita.

---

# 19. CORS

Não utilize CORS permissivo indiscriminadamente.

Defina origens necessárias.

Não reflita automaticamente qualquer `Origin`.

Tenha atenção especial ao combinar:

* origem ampla;
* credentials;
* cookies;
* endpoints privados.

CORS não substitui autenticação ou autorização.

---

# 20. Redirects

Não redirecione automaticamente para URL arbitrária fornecida pelo usuário.

Quando redirects externos forem necessários:

* valide destino;
* prefira destinos conhecidos;
* utilize allowlist quando possível.

Previna Open Redirect.

---

# 21. Webhooks

Nunca confie em webhook apenas porque conhece o endpoint.

Quando o provedor oferecer mecanismo de autenticação:

* valide assinatura;
* valide secret;
* valide timestamp quando disponível;
* rejeite assinatura inválida.

Considere:

* replay attacks;
* duplicidade;
* idempotência;
* ordem inesperada;
* payload adulterado.

Operações financeiras ou irreversíveis devem possuir proteção contra processamento duplicado.

---

# 22. WebSocket e Comunicação em Tempo Real

Valide:

* autenticação da conexão;
* autorização por evento/canal;
* payload;
* tamanho;
* frequência.

Conexão autenticada não significa autorização para todos os canais ou eventos.

---

# 23. Dados Sensíveis

Colete e exponha apenas dados necessários.

Não retorne campos sensíveis apenas porque existem na entidade.

Proteja especialmente:

* credenciais;
* tokens;
* documentos pessoais;
* dados financeiros;
* dados privados;
* informações administrativas.

Aplique autorização também no nível das propriedades quando necessário.

---

# 24. Logs e Erros

Nunca exponha ao usuário:

* stack trace;
* query SQL;
* connection string;
* caminho interno sensível;
* token;
* secret;
* detalhes internos desnecessários.

Logs técnicos podem conter contexto para diagnóstico, mas nunca secrets ou dados privados completos.

Siga também `logging.md` e `error-handling.md`.

---

# 25. Configuração e Produção

Produção não deve expor desnecessariamente:

* debug;
* páginas de diagnóstico;
* endpoints de teste;
* documentação administrativa;
* stack traces;
* credenciais padrão;
* portas administrativas;
* arquivos internos.

Recursos exclusivos de desenvolvimento devem permanecer indisponíveis em produção.

---

# 26. Dependências e Supply Chain

Antes de adicionar dependência:

* confirme necessidade;
* prefira fonte oficial/confiável;
* evite pacote abandonado quando houver alternativa adequada;
* avalie vulnerabilidades conhecidas quando relevante.

Mantenha lockfiles quando utilizados pela stack.

Não execute scripts, binários ou código externo desconhecido sem avaliar origem e necessidade.

Atualizações de segurança não devem ser aplicadas cegamente se puderem quebrar compatibilidade: informe impacto e valide.

---

# 27. Integridade

Não confie automaticamente em:

* pacotes;
* artefatos;
* atualizações;
* arquivos baixados;
* dados importados;
* conteúdo vindo de terceiros.

Quando a origem fornecer assinatura, checksum ou mecanismo de integridade apropriado, utilize-o quando o risco justificar.

---

# 28. Race Conditions e Concorrência

Operações críticas devem considerar concorrência.

Especialmente:

* pagamento;
* estoque;
* saldo;
* cupom;
* reserva;
* criação única;
* processamento de webhook.

Quando necessário utilize:

* transação;
* constraint;
* operação atômica;
* locking apropriado;
* idempotência.

Não dependa apenas de uma verificação anterior seguida de escrita se outra operação puder modificar o mesmo estado simultaneamente.

---

# 29. Regras de Negócio

Segurança também existe no domínio.

Avalie abuso de fluxos legítimos como:

* aplicar benefício repetidamente;
* alterar preço pelo cliente;
* reutilizar cupom;
* executar operação fora da ordem esperada;
* manipular quantidade;
* alterar ownership;
* repetir pagamento;
* automatizar fluxo sensível.

Valores críticos devem ser calculados ou confirmados pela fonte confiável, não pelo frontend.

---

# 30. Frontend Não é Fonte de Verdade

Nunca confie no frontend para garantir:

* preço;
* desconto;
* permissão;
* role;
* ownership;
* status;
* saldo;
* identidade;
* regra de negócio;
* autorização.

O cliente pode ser manipulado.

Revalide decisões críticas no backend.

---

# Critérios de Aceite

Para funcionalidade que manipule dados ou ações protegidas, valide quando aplicável:

### Entrada

* [ ] Entrada externa possui validação adequada.
* [ ] Limites de tamanho e formato existem quando necessários.
* [ ] Entrada não é concatenada em consultas ou comandos sensíveis.

### Autenticação

* [ ] Recursos privados exigem autenticação.
* [ ] Tokens/sessões são validados corretamente.

### Autorização

* [ ] Permissão é validada no servidor.
* [ ] Ownership é validado quando aplicável.
* [ ] Alterar IDs não permite acessar recursos de terceiros.
* [ ] Funções administrativas não podem ser executadas por usuários comuns.

### Dados

* [ ] API retorna apenas campos necessários.
* [ ] Cliente não pode modificar propriedades internas.
* [ ] Dados sensíveis não aparecem em logs ou erros.

### Browser

* [ ] Conteúdo externo não gera XSS.
* [ ] Cookies possuem configuração apropriada.
* [ ] Operações mutáveis possuem proteção CSRF quando aplicável.
* [ ] CORS está restrito ao necessário.

### Infraestrutura

* [ ] Secrets não estão no código ou frontend.
* [ ] Produção não expõe recursos de desenvolvimento.
* [ ] Dependências relevantes foram avaliadas.

### Recursos

* [ ] Operações caras possuem limites adequados.
* [ ] Uploads possuem tamanho máximo.
* [ ] Listagens grandes possuem limite/paginação.
* [ ] Integrações externas possuem timeout quando necessário.

### Integridade

* [ ] Operações críticas consideram concorrência.
* [ ] Operações repetíveis possuem idempotência quando necessária.
* [ ] Falhas não deixam estado inconsistente.

---

# Ao Encontrar uma Vulnerabilidade

O agente deve reportar de forma curta:

**Risco:** `alto`
**Local:** `arquivo/fluxo`
**Problema:** descrição objetiva
**Impacto:** consequência possível
**Correção sugerida:** abordagem recomendada
**Ação:** aguardando autorização

Não explore a vulnerabilidade além do necessário para confirmar tecnicamente sua existência.

Não altere segurança fora do escopo sem autorização.

# Resultado esperado

O sistema deve assumir que entradas e clientes podem ser manipulados, validar decisões críticas em fronteiras confiáveis e limitar o impacto de falhas.

Segurança deve ser **explícita, verificável e autorizada**, nunca implícita ou modificada silenciosamente.

## Segredos e isolamento de execução

* Proibido hardcoding de credenciais reais em código, prompts, fixtures, comandos ou documentos. Use variáveis de ambiente ou um gerenciador de segredos; exemplos contêm somente placeholders.
* Valide presença, formato e escopo das variáveis obrigatórias no início da operação. Ausência de segredo deve interromper a operação dependente, sem fallback para uma credencial embutida.
* Não imprima valores secretos, dumps completos de ambiente, cookies ou headers de autenticação. Logs informam apenas o nome da variável ausente e a correção necessária.
* Execute com permissões mínimas e preserve sandbox/limites do ambiente. Não troque shell, conta ou ferramenta para contornar uma restrição de aprovação.
* Antes de remoções ou movimentos recursivos, resolva o destino absoluto e confira que permanece no diretório autorizado, considerando links simbólicos/junctions. Não componha comandos destrutivos entre shells.
* Dry-run não cria arquivos, não remove diretórios, não grava manifestos e não envia solicitações com efeitos externos.

[Catálogo de regras](../README.md)
