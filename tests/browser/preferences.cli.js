// Cada cenário usa um contexto headless isolado, sem alterar preferências reais do usuário.
async function auditPreferences(page) {
  const browser = page.context().browser()
  if (!browser) throw new Error("O navegador de teste não está disponível")
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const scenarios = [
    { name: "Inglês prioritário", locales: ["en-US", "pt-BR"], expected: "en" },
    { name: "Português prioritário", locales: ["pt-PT", "en-US"], expected: "pt-BR" },
    { name: "Primeiro idioma suportado", locales: ["fr-FR", "en-GB", "pt-BR"], expected: "en" },
    { name: "Escolha salva tem prioridade", locales: ["en-US"], saved: "pt", expected: "pt-BR" },
    { name: "Valor salvo inválido", locales: ["en-US"], saved: "unknown", expected: "en" },
    { name: "Armazenamento bloqueado", locales: ["pt-BR"], blocked: true, expected: "pt-BR" },
  ]
  const results = []
  for (const scenario of scenarios) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    })
    try {
      await context.addInitScript(({ locales, saved, blocked }) => {
        Object.defineProperty(navigator, "languages", { get: () => locales })
        if (blocked) {
          Object.defineProperty(window, "localStorage", {
            get: () => {
              throw new DOMException("Storage disabled for test", "SecurityError")
            },
          })
        } else if (saved) {
          localStorage.setItem("pedroreoli-portfolio-language", saved)
        }
      }, scenario)
      const testPage = await context.newPage()
      const errors = []
      testPage.on("pageerror", (error) => errors.push(error.message))
      await testPage.goto(origin)
      await testPage.locator("#experiencia").waitFor()
      const actual = await testPage.locator("html").getAttribute("lang")
      if (actual !== scenario.expected)
        throw new Error(`${scenario.name}: esperado ${scenario.expected}, recebido ${actual}`)
      results.push(scenario.name)
      if (scenario.blocked) {
        await testPage
          .getByRole("button", { name: "Mudar idioma para inglês" })
          .filter({ visible: true })
          .click()
        await testPage.waitForFunction(() => document.documentElement.lang === "en")
        await testPage.getByRole("button", { name: "Open menu" }).click()
        await testPage
          .getByRole("navigation", { name: "Mobile navigation" })
          .getByRole("link", { name: "Work", exact: true })
          .click()
        await testPage.getByRole("heading", { name: "WORK", exact: true }).waitFor()
        results.push("Idioma permanece na sessão sem armazenamento")
      }
      if (errors.length) throw new Error(`${scenario.name}: ${errors.join("; ")}`)
    } finally {
      await context.close()
    }
  }
  return { passed: results.length, results }
}
