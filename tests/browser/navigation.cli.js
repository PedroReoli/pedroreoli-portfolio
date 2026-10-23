// Callback para playwright-cli run-code --filename; executar em sessão headless.
async function auditNavigation(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes de executar a auditoria")
  const results = []
  const check = (name, valid) => {
    if (!valid) throw new Error(name)
    results.push(name)
  }

  await page.evaluate(() => localStorage.setItem("pedroreoli-portfolio-language", "pt"))
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.setViewportSize({ width: 390, height: 844 })
  let releasePage
  const pageReady = new Promise((resolve) => {
    releasePage = resolve
  })
  const lazyPage = /\/(src\/pages\/ProjectsPage\.tsx|assets\/ProjectsPage-[^/]+\.js)/
  let intercepted = false
  let finishRoute
  const routeHandled = new Promise((resolve) => {
    finishRoute = resolve
  })
  await page.route(
    lazyPage,
    async (route) => {
      intercepted = true
      try {
        await pageReady
        await route.continue()
      } finally {
        finishRoute()
      }
    },
    { times: 1 },
  )
  try {
    await page.goto(`${origin}/`)

    await page.getByRole("button", { name: "Abrir menu" }).click()
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.waitForFunction(() => !document.getElementById("mobile-navigation"))
    check(
      "Resize fecha o menu sem bloquear a página",
      await page.evaluate(() => document.body.style.overflow !== "hidden"),
    )

    await page.setViewportSize({ width: 390, height: 844 })
    await page.getByRole("button", { name: "Abrir menu" }).click()
    await page
      .getByRole("navigation", { name: "Navegação mobile" })
      .getByRole("link", { name: "Projetos", exact: true })
      .click()
    await page.locator('main[aria-busy="true"]').waitFor({ timeout: 5000 })
    check("Carregamento lazy identificado", true)
  } finally {
    releasePage()
    if (intercepted) await routeHandled
    else await page.unroute(lazyPage)
  }
  await page.locator("#corporativo-projects").waitFor()
  await page.waitForFunction(() => document.activeElement?.id === "main-content")
  check("Nova rota foca o conteúdo real", await page.evaluate(() => scrollY === 0))

  await page.getByRole("button", { name: "Abrir menu" }).click()
  await page.keyboard.press("Escape")
  check(
    "Escape devolve o foco",
    await page
      .getByRole("button", { name: "Abrir menu" })
      .evaluate((e) => e === document.activeElement),
  )

  await page.getByRole("button", { name: "Abrir menu" }).click()
  await page.keyboard.press("Tab")
  check(
    "Tab alcança o primeiro link",
    await page
      .getByRole("navigation", { name: "Navegação mobile" })
      .getByRole("link", { name: "Início", exact: true })
      .evaluate((e) => e === document.activeElement),
  )
  await page.getByRole("button", { name: "Corporativo", exact: true }).focus()
  await page.waitForFunction(() => !document.getElementById("mobile-navigation"))
  check("Foco fora fecha o disclosure", true)

  await page.getByRole("button", { name: "Abrir menu" }).click()
  // Margem lateral abaixo do dropdown, sem acionar links do conteúdo.
  await page.mouse.click(3, 600)
  await page.waitForFunction(() => !document.getElementById("mobile-navigation"))
  check("Clique fora fecha o menu", true)

  for (const reducedMotion of ["no-preference", "reduce"]) {
    await page.emulateMedia({ reducedMotion })
    await page
      .getByRole("button", { name: "Mudar idioma para inglês" })
      .filter({ visible: true })
      .click()
    await page.waitForFunction(() => document.documentElement.lang === "en")
    check(
      `Idioma imediato / ${reducedMotion}`,
      await page.getByRole("heading", { name: "WORK", exact: true }).isVisible(),
    )
    const notice = page.getByRole("status")
    check(
      `Confirmação compacta / ${reducedMotion}`,
      await notice.evaluate((e) => e.getBoundingClientRect().height < 100),
    )
    await page
      .getByRole("button", { name: "Switch language to Portuguese" })
      .filter({ visible: true })
      .click()
    await page.waitForFunction(() => document.documentElement.lang === "pt-BR")
    check(
      `Troca rápida sem estado atrasado / ${reducedMotion}`,
      await page.evaluate(() => localStorage.getItem("pedroreoli-portfolio-language") === "pt"),
    )
  }

  await page.setViewportSize({ width: 667, height: 240 })
  await page.getByRole("button", { name: "Abrir menu" }).click()
  const navigation = page.getByRole("navigation", { name: "Navegação mobile" })
  check(
    "Menu cabe em paisagem curta",
    await navigation.evaluate((e) => e.getBoundingClientRect().bottom <= innerHeight + 1),
  )
  await navigation.getByRole("link", { name: "Vamos conversar", exact: true }).focus()
  check(
    "Último link continua alcançável",
    await navigation
      .getByRole("link", { name: "Vamos conversar", exact: true })
      .evaluate((e) => e.getBoundingClientRect().bottom <= innerHeight + 1),
  )
  await page.keyboard.press("Escape")
  await page.setViewportSize({ width: 390, height: 844 })
  return { passed: results.length, results }
}
