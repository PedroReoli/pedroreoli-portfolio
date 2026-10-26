// Jornada real headless: um gesto por seção/capítulo e encaixe exato no viewport.
async function auditSceneNavigation(page) {
  const origin = new URL(page.url()).origin
  const results = []
  const errors = []
  const onError = (error) => errors.push(error.message)
  page.on("pageerror", onError)
  const check = (name, valid, detail) => {
    if (!valid) throw new Error(`${name}: ${JSON.stringify(detail)}`)
    results.push(name)
  }
  const points = () => page.evaluate(() =>
    [...document.querySelectorAll(".home-page [data-scroll-scene]")].flatMap((scene) => {
      const count = Number(scene.dataset.scrollSteps) || 1
      const start = scrollY + scene.getBoundingClientRect().top
      return Array.from({ length: count }, (_, index) => ({
        id: scene.id,
        index,
        top: start + (count > 1 ? index / (count - 1) * (scene.offsetHeight - innerHeight) : 0),
      }))
    }),
  )
  const at = async (top) => {
    await page.waitForFunction((value) =>
      Math.abs(scrollY - value) < 2 && !document.querySelector('[data-scene-transition="running"]'), top)
  }
  try {
    for (const [width, height] of [[320, 568], [390, 844], [1440, 900]]) {
      await page.setViewportSize({ width, height })
      for (const reduced of [false, true]) {
        await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" })
        await page.goto(origin)
        await page.locator("#experiencia").waitFor({ state: "attached" })
        await page.evaluate(() => document.fonts.ready)
        await at(0)
        const scenes = await points()
        check(`${width}/${reduced}: 13 etapas`, scenes.length === 13, scenes)
        await page.mouse.move(width / 2, height / 2)
        for (let step = 1; step < scenes.length; step++) {
          const destination = scenes[step]
          await page.mouse.wheel(0, 100)
          if (!reduced && step === 1) {
            await page.waitForTimeout(250)
            const intermediate = await page.evaluate(() => ({
              y: scrollY,
              parallax: document.querySelector("#sobre").style.getPropertyValue("--scene-parallax"),
            }))
            check(`${width}: transição percorre quadros intermediários`,
              intermediate.y > 0 && intermediate.y < height, intermediate)
            check(`${width}: camada parallax ativa`, parseFloat(intermediate.parallax) > 0, intermediate)
            // Cauda de inércia do trackpad não pode pular outra seção.
            for (let burst = 0; burst < 6; burst++) {
              await page.mouse.wheel(0, 100)
              await page.waitForTimeout(30)
            }
          }
          await at(destination.top)
          check(`${width}/${reduced}: etapa ${step} encaixada`, true)
          const geometry = await page.evaluate((id) => {
            const outer = document.getElementById(id)
            const stage = outer.matches(".viewport-stage") ? outer : outer.firstElementChild
            const rect = stage.getBoundingClientRect()
            return { top: rect.top, height: rect.height, viewport: innerHeight }
          }, destination.id)
          check(`${width}/${reduced}: ${destination.id} ocupa a tela`,
            Math.abs(geometry.top) < 2 && Math.abs(geometry.height - geometry.viewport) < 2, geometry)
          if (destination.id === "experiencia") {
            await page.waitForFunction((index) => {
              const buttons = [...document.querySelectorAll(".experience-index button")]
              const article = document.querySelector("#experience-detail")
              return buttons[index]?.getAttribute("aria-pressed") === "true" && article &&
                getComputedStyle(article).opacity === "1"
            }, destination.index)
            check(`${width}/${reduced}: capítulo ${destination.index} visível`, true)
          }
          await page.waitForTimeout(reduced ? 240 : 260)
        }
        await page.keyboard.press("PageUp")
        await at(scenes.at(-2).top)
        check(`${width}/${reduced}: teclado volta ao último capítulo`, true)
        await page.keyboard.press("Home")
        await at(0)
        check(`${width}/${reduced}: Home retorna à hero`, true)
        await page.evaluate(() => scrollTo({ top: innerHeight * 0.45, behavior: "instant" }))
        await at(0)
        check(`${width}/${reduced}: arraste parcial retorna ao encaixe`, true)
      }
    }
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await page.goto(origin)
    await page.locator("#projetos-selecionados").waitFor({ state: "attached" })
    const projectsTop = await page.locator("#projetos-selecionados").evaluate((scene) =>
      scrollY + scene.getBoundingClientRect().top)
    await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), projectsTop)
    await page.waitForTimeout(1200)
    await page.mouse.move(700, 500)
    await page.mouse.wheel(0, 120)
    await page.waitForTimeout(200)
    await page.locator("#projetos-selecionados nav button").first().click()
    await at(projectsTop)
    await page.waitForTimeout(1000)
    check("clique no capítulo interrompe o avanço em andamento",
      await page.evaluate((top) => Math.abs(scrollY - top) < 2, projectsTop))
    await page.goto(`${origin}/midia-blog`)
    await page.locator("main h1").waitFor()
    await page.mouse.wheel(0, 180)
    await page.waitForTimeout(1300)
    check("outras rotas mantêm scroll nativo", await page.evaluate(() =>
      !document.querySelector(".home-page") && scrollY > 0), await page.evaluate(() => scrollY))
    check("sem erros de execução", errors.length === 0, errors)
    return { passed: results.length, viewports: [320, 390, 1440], motion: ["normal", "reduce"] }
  } finally {
    page.off("pageerror", onError)
    await page.emulateMedia({ reducedMotion: "no-preference" })
  }
}
