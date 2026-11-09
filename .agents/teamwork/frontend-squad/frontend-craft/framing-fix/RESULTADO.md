# Correcao de enquadramento aplicada

Baseline: fe2f7be^; working tree feat/trajetoria-previa. Sem commit/push/publicacao.

## Codigo e checks
- src/styles/film.css: contain na regra compartilhada poster/video, center bottom e transform none preservados. Piso #060a0e mantido. Comentarios falsos de crop removidos.
- src/test/hero-letterbox.test.ts: protege contain desktop, cover + center top mobile e fundo escuro independente do token ciano.
- Override mobile identico ao baseline apos normalizar CRLF.
- 137/137 testes, lint exit 0, TypeScript/build Vite exit 0. Avisos jsdom pause/scrollTo nao implementados; reproducao real verificada separadamente.
- base.css, pages.css, contracts.test.ts e flow/ tinham alteracoes previas e foram preservados. Nenhuma midia alterada.

## Medicao
OpenBot browser privado, Chromium, reduced-motion reduce, DPR 1. Scroll em index*altura + .45*altura, espera 500-650ms. Cena 6 corresponde ao inicio da fatia longa. Nenhum currentTime foi escrito pelo teste: o produto dirigiu todos os seeks.

CSS baseline extraido por git show, injetado em style temporario e removido em cada comparacao. 18/18 pares com o mesmo currentTime. Barra de rolagem ocultada SOMENTE no fixture para igualar clientWidth ao tamanho pedido (1886 caso contrario tem clientWidth1871). Styles temporarios removidos ao terminar.

BBox: x,y,largura,altura do AMARELO VISIVEL no frame decodificado, projetado com object-fit/object-position computados. Limiar RGB: R>150, G>100, B<85, 1.05<R/G<1.8. O sujeito oculta parte do disco: nao e estimativa do circulo completo. Mobile abaixo mostra bbox anterior ao clipping, que JA EXISTIA no baseline. ROI de rosto fixa source(750,150,450,600) com projecao identica em 18/18 pares: nao e deteccao anatomica de landmarks.

| Viewport | Cena | Tempo | BBox baseline | BBox final | Delta geometria |
|---|---|---:|---|---|---|
| 1886x914 | hero-to-about | 2.407 | 601.94, 51.62, 681.27, 628.80 | 601.94, 51.62, 681.27, 628.80 | 0 px |
| 1886x914 | about-to-projects | 2.407 | 621.41, 42.31, 641.49, 624.57 | 621.41, 42.31, 641.49, 624.57 | 0 px |
| 1886x914 | projects-to-stack | 2.595 | 598.56, 48.24, 687.19, 594.95 | 598.56, 48.24, 687.19, 594.95 | 0 px |
| 1886x914 | stack-to-purpose | 2.595 | 599.40, 48.24, 686.35, 609.33 | 599.40, 48.24, 686.35, 609.33 | 0 px |
| 1886x914 | purpose-to-experience | 2.595 | 598.56, 49.09, 687.19, 590.72 | 598.56, 49.09, 687.19, 590.72 | 0 px |
| 1886x914 | experience-loop | 0.830 | 601.94, 51.62, 681.27, 624.57 | 601.94, 51.62, 681.27, 624.57 | 0 px |
| 1920x1080 | hero-to-about | 2.853 | 557.00, 61.00, 805.00, 688.00 | 557.00, 61.00, 805.00, 688.00 | 0 px |
| 1920x1080 | about-to-projects | 2.853 | 580.00, 50.00, 758.00, 737.00 | 580.00, 50.00, 758.00, 737.00 | 0 px |
| 1920x1080 | projects-to-stack | 3.076 | 553.00, 57.00, 812.00, 739.00 | 553.00, 57.00, 812.00, 739.00 | 0 px |
| 1920x1080 | stack-to-purpose | 3.076 | 554.00, 57.00, 811.00, 720.00 | 554.00, 57.00, 811.00, 720.00 | 0 px |
| 1920x1080 | purpose-to-experience | 3.076 | 553.00, 58.00, 812.00, 698.00 | 553.00, 58.00, 812.00, 698.00 | 0 px |
| 1920x1080 | experience-loop | 0.923 | 557.00, 61.00, 805.00, 738.00 | 557.00, 61.00, 805.00, 738.00 | 0 px |
| 390x844 | hero-to-about | 2.751 | -119.74, 47.67, 629.09, 575.17 | -119.74, 47.67, 629.09, 575.17 | 0 px |
| 390x844 | about-to-projects | 2.751 | -101.76, 39.07, 592.36, 575.95 | -101.76, 39.07, 592.36, 575.95 | 0 px |
| 390x844 | projects-to-stack | 2.966 | -122.86, 44.54, 634.56, 549.38 | -122.86, 44.54, 634.56, 549.38 | 0 px |
| 390x844 | stack-to-purpose | 2.966 | -122.08, 44.54, 633.78, 562.67 | -122.08, 44.54, 633.78, 562.67 | 0 px |
| 390x844 | purpose-to-experience | 2.966 | -122.86, 45.33, 634.56, 545.47 | -122.86, 45.33, 634.56, 545.47 | 0 px |
| 390x844 | experience-loop | 0.903 | -119.74, 47.67, 629.09, 576.73 | -119.74, 47.67, 629.09, 576.73 | 0 px |

verified-compare-*.png: reconstrucoes da midia decodificada com geometria medida, fundos baseline ciano/final escuro preenchidos explicitamente, sem textos/aura. Os dois lados de cada par foram desenhados sincronicamente a partir do MESMO frame final decodificado; a projecao baseline vem da igualdade geometrica medida no JSON e os assets nao mudaram. Sao evidencia de geometria, NAO screenshots integrais da pagina ou duas capturas independentes. As gravacoes reais capturam pagina, textos e transicoes. Folhas compare-* sem prefixo verified foram descartadas: a troca CSS temporaria e callback de download produziram cores/nomes ambiguos. Nao usa-las como evidencia.

## Reproducao real: cinco fronteiras nos dois sentidos
Desktop1886x914: scrollTo continuo de 40px/55ms, 246 amostras; 122 callbacks de frames decodificados, 151 seeked, maior seek16.6ms. Eventos incluem tentativa inicial interrompida no limite200 passos; samples do percurso final completo estao separados.
Mobile390x844: 226 amostras, 80 callbacks de frames decodificados, 106 seeked, maior seek27.2ms. Uma amostra na quinta fronteira descendo (y4240) teve video de saida readyState1/seeking. Decoder retornou; nao e prova de ausencia de flash abaixo da resolucao de captura.
Nas472 amostras nenhuma lacuna em todas as opacidades: ao menos um video com opacity1. Isso prova cobertura logica, NAO pixels sem flash.
Segunda passagem desktop focada: 10 percursos (5 descendo,5 subindo), 22 amostras cada,20px/60ms entre -140 e +280px da borda. 220 amostras: nenhuma lacuna de opacidade, nenhum seek pendente no instante de amostragem. boundary-runs.json e five-boundaries-desktop.mkv.
Contact sheets das gravacoes revisadas: sem novo zoom/crop ou frame inteiro preto nas imagens amostradas. O scrub segue discretizado em cerca de120px no useFrameScroll existente; mudancas de pose continuam perceptiveis. Nao afirmo encaixe/fluidez perfeitos nem aprovacao visual final. Nao existe teste/transicao6->1.

## Artefatos
- source.diff: diff dos dois arquivos de codigo.
- framing-evidence.json:18 pares e telemetria desktop/mobile.
- boundary-runs.json:10 passagens focadas.
- verified-compare-1886x914.png, verified-compare-1920x1080.png, verified-compare-390x844.png: comparacoes de midia.
- desktop.mkv, mobile.mkv: remux sem reencode das gravacoes reais. Primeira gravacao inclui baseline ciano intencional durante comparacoes; trecho final e percurso com CSS final.
- five-boundaries-desktop.mkv: captura focada, e five-boundaries-contact.png.
- Downloads/openbot-browser-2026-11-09T04-02-17-283Z-12bd876f.webm: gravacao adicional1920x1080.

## Limites
Nao foi teste fisico touch/wheel; scrollTo exercita listeners/seeks reais. Nao houve marcacao anatomica da face, ajuste do disco completo ou comparacao de cada pixel em todos os frames. A captura/amostragem nao elimina flashes muito curtos; a amostra mobile de seek esta declarada. Nao foi verificado login/API/servico externo.

Previa: http://localhost:4412/ (Vite dev mantido para revisao). Aba devolvida a hero, estilos temporarios removidos. Escritas adicionais restritas a evidencias em .agents/teamwork/frontend-squad/frontend-craft/framing-fix e Downloads, alem do dist gerado pelo build. Arquivos de evidencia estao ignorados pelo Git local, e precisam ser copiados/anexados para compartilhamento.
