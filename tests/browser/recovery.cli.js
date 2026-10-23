// Falhas de rede simuladas somente nesta sessão; não modifica arquivos nem servidor.
async function auditRecovery(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const homeChunk =
    /\/(src\/components\/organisms\/HomeSections\.tsx|assets\/HomeSections-[^/]+\.js)/
  const projectsChunk = /\/(src\/pages\/ProjectsPage\.tsx|assets\/ProjectsPage-[^/]+\.js)/
  const notesChunk = /\/(src\/pages\/MediaBlogPage\.tsx|assets\/MediaBlogPage-[^/]+\.js)/
  const results = []
  const check = (label, condition) => {
    if (!condition) throw new Error(label)
    results.push(label)
  }

  try {
    for (const language of ["pt", "en"]) {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.evaluate(
        (value) => localStorage.setItem("pedroreoli-portfolio-language", value),
        language,
      )
      await page.route(homeChunk, (route) => route.abort("failed"), { times: 1 })
      await page.goto(`${origin}/`)
      await page.getByRole("alert").waitFor()
      check(`Hero preservada / ${language}`, (await page.locator("#hero h1").count()) === 1)
      check(
        `Header e contato preservados / ${language}`,
        (await page.getByRole("banner").count()) === 1 &&
          (await page.locator("#contato").count()) === 1,
      )
      check(
        `Sem main ou h1 duplicados / ${language}`,
        (await page.locator("main").count()) === 1 && (await page.locator("h1").count()) === 1,
      )
      const retryName = language === "pt" ? "Tentar novamente" : "Try again"
      await page.getByRole("button", { name: retryName, exact: true }).click()
      await page.locator("#experiencia").waitFor()
      check(`Seções recuperadas / ${language}`, (await page.getByRole("alert").count()) === 0)

      // Duas falhas consecutivas: sem retry automático infinito e sem perder a URL.
      let failures = 0
      const failTwice = async (route) => {
        failures++
        await route.abort("failed")
      }
      await page.route(projectsChunk, failTwice, { times: 2 })
      const destination = `${origin}/projetos?tipo=gerais&origem=recovery`
      await page.goto(destination)
      await page.getByRole("alert").waitFor()
      check(
        `Erro de página localizado / ${language}`,
        (await page.getByRole("heading", { level: 1 }).innerText()) ===
          (language === "pt"
            ? "Não foi possível carregar esta página."
            : "This page couldn't load."),
      )
      check(`Navegação mantida / ${language}`, (await page.getByRole("banner").count()) === 1)
      check(
        `Detalhes técnicos não expostos / ${language}`,
        !(await page.getByRole("alert").innerText()).includes("import"),
      )
      await page.setViewportSize({ width: 320, height: 480 })
      check(
        `Erro sem overflow horizontal / ${language}`,
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      await page.getByRole("button", { name: retryName, exact: true }).click()
      await page.getByRole("alert").waitFor()
      await page.waitForTimeout(350)
      check(`Falha repetida controlada / ${language}`, failures === 2)
      await page.getByRole("button", { name: retryName, exact: true }).click()
      await page.locator("#gerais-projects").waitFor()
      check(`Retry preserva filtro e parâmetros / ${language}`, page.url() === destination)
      check(`Página recuperada / ${language}`, (await page.getByRole("alert").count()) === 0)

      // A rota com erro também permite sair pelo link interno, sem recarregar manualmente.
      await page.route(projectsChunk, (route) => route.abort("failed"), { times: 1 })
      await page.goto(destination)
      await page.getByRole("alert").waitFor()
      await page
        .getByRole("link", {
          name: language === "pt" ? "Voltar ao início" : "Back to home",
          exact: true,
        })
        .click()
      await page.locator("#experiencia").waitFor()
      check(
        `Navegar limpa o estado de erro / ${language}`,
        (await page.getByRole("alert").count()) === 0,
      )

      // O limite protege também contra erro de renderização, não só importação rejeitada.
      await page.route(
        notesChunk,
        (route) =>
          route.fulfill({
            status: 200,
            contentType: "application/javascript",
            body: 'export default function BrokenRoute(){throw new Error("Simulated render failure");}',
          }),
        { times: 1 },
      )
      await page.goto(`${origin}/midia-blog`)
      await page.getByRole("alert").waitFor()
      check(
        `Erro de renderização isolado / ${language}`,
        (await page.getByRole("banner").count()) === 1 &&
          !(await page.locator("body").innerText()).includes("Simulated render failure"),
      )
      await page.getByRole("button", { name: retryName, exact: true }).click()
      await page
        .getByRole("heading", { name: language === "pt" ? "NOTAS" : "NOTES", exact: true })
        .waitFor()
      check(`Renderização recuperada / ${language}`, (await page.getByRole("alert").count()) === 0)
    }
  } finally {
    await page.unroute(homeChunk)
    await page.unroute(projectsChunk)
    await page.unroute(notesChunk)
  }
  return {
    passed: results.length,
    results,
    note: "Erros de rede intencionais são esperados no console deste ensaio.",
  }
}
