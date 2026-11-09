# REGRA DE NAVEGADOR — proibido aparecer na tela do Pedro

Owner: LayoutGuard · Vale para **todos** os agentes do frontend-squad (e qualquer bot que toque este repo)
Motivo: Pedro trabalha na mesma máquina. Qualquer janela, popup, aba visível ou app abrindo interrompe ele.

## Regra única

> Nenhum agente abre nada que apareça na tela do Pedro. Navegação, screenshot e inspeção visual rodam em **Chrome headless controlado por CDP**, em processo próprio, sem janela, e o servidor é sempre `preview`/build — nunca um app interativo.

## Permitido

| Uso | Como |
|---|---|
| Inspecionar o site | `chrome --headless=new --remote-debugging-port=<porta livre> --user-data-dir=%TEMP%\cdp-<agent>-<ts>` e dirigir por CDP (`Page.navigate`, `Runtime.evaluate`, `Emulation.*`) |
| Screenshot | `Page.captureScreenshot` → gravar PNG em disco. Nunca salvar na área de trabalho do Pedro |
| Servir o site | `npm run preview -- --port <porta livre>` ou `npx vite build` + preview. Fechar o processo no fim (`taskkill //PID`) |
| Viewports | `Emulation.setDeviceMetricsOverride` (1440×900, 1024×768, 768×1024, 390×844) |
| reduced-motion | `Emulation.setEmulatedMedia` com `prefers-reduced-motion` |

Script de referência já pronto e testado: `C:\Users\PEDRO LUCAS\OpenBot\Agents\agent-78690a04-4519-44ac-a29a-87a4f9a12f36\audit\cdp.mjs` (dependência zero: `WebSocket` nativo do Node 24). Reaproveitar em vez de reescrever.

## Proibido (sem exceção, sem "só para conferir")

1. `computer_use`, controle de mouse/teclado, automação de desktop.
2. Abrir Chrome/Edge/Firefox **com janela** (`--headless` ausente), mesmo que minimizado ou atrás.
3. `npm run dev` / `vite` interativo (abre servidor e às vezes navegador).
4. Playwright/Cypress em modo headed (`--headed`, `headless: false`), `PWDEBUG`.
5. `start http://localhost...`, `explorer`, `open`, `xdg-open`, atalhos `.url`/`.lnk`.
6. Painéis, devtools visíveis, teto de janela, "Ask Gemini"/side panel, notificações de sistema.
7. Deixar processo de servidor/browser rodando depois de terminar a tarefa.

## Encerramento obrigatório

Ao fim de qualquer verificação:
1. `taskkill //F //PID <pid do preview>` e confirmar com `curl` que a porta não responde.
2. Matar o `chrome` do `--user-data-dir` usado.
3. Apagar o perfil temporário `%TEMP%\cdp-*`.
4. Conferir que não sobrou nada: `tasklist /v | grep -i chrome` (o `grep` deve vir vazio para janelas do agente).

## Se precisar de algo que exija janela

Não faça. Reporte ao Pedro pelo BotManager o que precisa e por quê. Exemplo: login em serviço externo (Google Flow) — pedir takeover, nunca abrir navegador visível por conta própria.

## Armadilha conhecida

`chrome --headless=new` **sem** `--user-data-dir` dedicado pode anexar ao perfil já aberto do Pedro e reabrir abas dele. Sempre passar `--user-data-dir` novo + `--no-first-run --no-default-browser-check`.
