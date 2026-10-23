// Alternativa sem JS e retorno por teclado. Não equivale a auditoria com leitor de tela.
async function auditAccessibility(page) {
  const browser = page.context().browser()
  if (!browser) throw new Error("Navegador indisponível")
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const results = []
  const check = (label, condition) => {
    if (!condition) throw new Error(label)
    results.push(label)
  }
  const noScript = await browser.newContext({ javaScriptEnabled: false })
  try {
    const staticPage = await noScript.newPage()
    for (const path of ["/", "/projetos", "/midia-blog"]) {
      for (const [width, height] of [
        [320, 480],
        [390, 844],
        [667, 375],
        [1440, 900],
      ]) {
        await staticPage.setViewportSize({ width, height })
        await staticPage.goto(`${origin}${path}`)
        await staticPage.getByRole("heading", { name: "Pedro Reoli", exact: true }).waitFor()
        check(
          `Sem JS / ${path} / ${width}x${height}`,
          await staticPage.evaluate(() => {
            if (document.querySelectorAll("main").length !== 1) return false
            const elements = [...document.querySelectorAll("h1,p,nav a")]
            return (
              document.documentElement.scrollWidth <= innerWidth &&
              elements.every((element) => {
                const box = element.getBoundingClientRect()
                return (
                  box.width > 0 &&
                  box.height > 0 &&
                  box.left >= 0 &&
                  box.right <= innerWidth + 1 &&
                  box.bottom <= innerHeight + 1
                )
              })
            )
          }),
        )
      }
    }
    // O build pode antecipar downloads via modulepreload mesmo com JS desativado.
    // O contrato é conteúdo estático utilizável sem montar a aplicação React.
    check(
      "Aplicação interativa não monta sem JavaScript",
      await staticPage.locator("#root").evaluate((root) => root.childElementCount === 0),
    )
    for (const label of ["Enviar e-mail", "GitHub", "LinkedIn"]) {
      await staticPage.keyboard.press("Tab")
      check(
        `Contato por teclado / ${label}`,
        await staticPage
          .getByRole("link", { name: label, exact: true })
          .evaluate(
            (link) => link === document.activeElement && link.getBoundingClientRect().height >= 44,
          ),
      )
    }
  } finally {
    await noScript.close()
  }

  for (const reducedMotion of ["reduce", "no-preference"]) {
    const keyboard = await browser.newContext({ locale: "pt-BR", reducedMotion })
    try {
      const testPage = await keyboard.newPage()
      for (const path of ["/", "/projetos", "/midia-blog"]) {
        await testPage.goto(`${origin}${path}`)
        await testPage.locator(path === "/" ? "#experiencia" : "main h1").waitFor()
        check(
          `Fallback não duplica main com JS / ${path} / ${reducedMotion}`,
          (await testPage.locator("main").count()) === 1 &&
            (await testPage.locator(".no-script-page").count()) === 0,
        )
        const topButton = testPage.getByRole("button", { name: "Voltar ao topo", exact: true })
        await topButton.focus()
        await testPage.keyboard.press("Enter")
        await testPage.waitForFunction(() => scrollY <= 1)
        check(
          `Topo recupera foco / ${path} / ${reducedMotion}`,
          await testPage.locator("main").evaluate((main) => main === document.activeElement),
        )
        await testPage.keyboard.press("Tab")
        check(
          `Tab continua no conteúdo / ${path} / ${reducedMotion}`,
          await testPage
            .locator("main")
            .evaluate(
              (main) => main.contains(document.activeElement) && document.activeElement !== main,
            ),
        )
      }
    } finally {
      await keyboard.close()
    }
  }
  return { passed: results.length, results }
}
