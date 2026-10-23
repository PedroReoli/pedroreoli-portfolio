// Auditoria de Projetos/Notas via playwright-cli, exclusivamente headless.
async function auditArchives(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const results = []
  const errors = []
  const onError = (error) => errors.push(error.message)
  const check = (label, valid, data) => {
    if (!valid) throw new Error(`${label}: ${JSON.stringify(data)}`)
    results.push(label)
  }
  const savedLanguage = await page.evaluate(() =>
    localStorage.getItem("pedroreoli-portfolio-language"),
  )
  const routes = ["/projetos?tipo=corporativo", "/projetos?tipo=gerais", "/midia-blog"]
  const sizes = [
    [320, 480],
    [360, 640],
    [390, 844],
    [430, 932],
    [600, 700],
    [639, 800],
    [640, 800],
    [768, 1024],
    [899, 700],
    [900, 700],
    [1024, 768],
    [1280, 720],
    [1440, 900],
    [1920, 1080],
    [2560, 1440],
    [667, 375],
  ]
  page.on("pageerror", onError)
  try {
    await page.emulateMedia({ reducedMotion: "reduce" })
    for (const language of ["pt", "en"]) {
      await page.evaluate(
        (value) => localStorage.setItem("pedroreoli-portfolio-language", value),
        language,
      )
      for (const [width, height] of sizes) {
        await page.setViewportSize({ width, height })
        for (const route of routes) {
          await page.goto(origin + route)
          await page.locator("h1").waitFor()
          await page.evaluate(() => document.fonts.ready)
          await page.evaluate(async () => {
            for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.75) {
              scrollTo({ top: y, behavior: "instant" })
              await new Promise(requestAnimationFrame)
            }
          })
          await page
            .locator("main img")
            .evaluateAll((images) => Promise.all(images.map((image) => image.decode())))
          const geometry = await page.evaluate(() => {
            const issues = []
            for (const element of document.querySelectorAll(
              "main h1,main h2,main h3,main p,main a,main button,main figcaption,footer a",
            )) {
              const rect = element.getBoundingClientRect()
              if (!rect.width || !rect.height || element.closest(".sr-only")) continue
              if (rect.left < -1 || rect.right > innerWidth + 1) issues.push(element.textContent)
            }
            const title = document.querySelector("h1")
            const range = document.createRange()
            range.selectNodeContents(title)
            const text = range.getBoundingClientRect()
            const mask = document.querySelector(".archive-title-mask").getBoundingClientRect()
            if (text.right > mask.right + 1 || text.left < mask.left - 1)
              issues.push("Título recortado pela máscara")
            return {
              issues,
              overflow: document.documentElement.scrollWidth - innerWidth,
              images: [...document.querySelectorAll("main img")].every(
                (image) => image.complete && image.naturalWidth > 0,
              ),
            }
          })
          check(
            `${language} ${width}×${height} ${route}`,
            !geometry.issues.length && geometry.overflow <= 1 && geometry.images,
            geometry,
          )
        }
      }
    }

    for (const [width, height] of [
      [390, 844],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height })
      await page.emulateMedia({ reducedMotion: "no-preference" })
      for (const route of routes) {
        await page.setViewportSize({ width, height })
        await page.goto(origin + route)
        await page.locator("h1").waitFor({ state: "attached" })
        const titleFrames = await page
          .locator(".archive-title-mask > div")
          .evaluate(async (element) => {
            const samples = []
            const start = performance.now()
            while (performance.now() - start < 1100) {
              samples.push(Number(getComputedStyle(element).opacity))
              await new Promise(requestAnimationFrame)
            }
            return samples
          })
        check(
          `${width} ${route}: título com entrada progressiva`,
          titleFrames.some((value) => value > 0 && value < 1) && titleFrames.at(-1) === 1,
          titleFrames,
        )
        // Salto rápido até o último item: nada pode continuar invisível depois da entrada.
        await page.setViewportSize({ width, height: 480 })
        await page.goto(origin + route)
        const target = route.includes("corporativo")
          ? page.locator(".project-gallery > div").last()
          : page.locator(".project-archive-row").last().locator("..")
        await target.waitFor({ state: "attached" })
        check(
          `${width} ${route}: alvo aguarda scroll`,
          await target.evaluate(
            (element) =>
              element.getBoundingClientRect().top >= innerHeight &&
              getComputedStyle(element).opacity === "0",
          ),
        )
        const frames = await target.evaluate(async (element) => {
          element.scrollIntoView({ block: "center", behavior: "instant" })
          const samples = []
          const start = performance.now()
          while (performance.now() - start < 1200) {
            const style = getComputedStyle(element)
            samples.push({ opacity: Number(style.opacity), transform: style.transform })
            await new Promise(requestAnimationFrame)
          }
          return samples
        })
        check(
          `${width} ${route}: conteúdo surge após scroll rápido`,
          frames.some((value) => value.opacity > 0 && value.opacity < 1) &&
            frames.at(-1).opacity === 1 &&
            frames.at(-1).transform === "none",
          frames,
        )
        await target.locator("a").focus()
        check(
          `${width} ${route}: link alcançável por teclado`,
          await target.locator("a").evaluate((element) => document.activeElement === element),
        )
      }
      await page.setViewportSize({ width, height })
      await page.goto(`${origin}/projetos?tipo=corporativo&origem=teste`)
      const buttons = page.locator(".archive-category-tabs button")
      await buttons.nth(1).focus()
      await buttons.nth(1).press("Enter")
      await page.locator("#gerais-projects").waitFor()
      check(
        `${width}: categoria preserva URL e foco`,
        page.url().includes("tipo=gerais") &&
          page.url().includes("origem=teste") &&
          (await buttons
            .nth(1)
            .evaluate(
              (element) =>
                document.activeElement === element &&
                element.getAttribute("aria-pressed") === "true",
            )),
      )
      await buttons.first().press("Enter")
      await page.locator("#corporativo-projects").waitFor()
      check(
        `${width}: categoria corporativa restaura galeria`,
        (await page.locator(".project-gallery-link").count()) === 4,
      )
    }
    check("Sem erros de execução", !errors.length, errors)
    return { passed: results.length, viewports: sizes.length, languages: ["pt", "en"] }
  } finally {
    page.off("pageerror", onError)
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await page.evaluate((value) => {
      if (value === null) localStorage.removeItem("pedroreoli-portfolio-language")
      else localStorage.setItem("pedroreoli-portfolio-language", value)
    }, savedLanguage)
  }
}
