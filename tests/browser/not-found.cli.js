// Tela 404: encaixe, movimento, zoom de texto e rotas de saída. Apenas headless.
async function auditNotFound(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const savedLanguage = await page.evaluate(() =>
    localStorage.getItem("pedroreoli-portfolio-language"),
  )
  const results = []
  const check = (name, value, details) => {
    if (!value) throw new Error(`${name}: ${JSON.stringify(details)}`)
    results.push(name)
  }
  const sizes = [
    [320, 480],
    [390, 844],
    [400, 800],
    [667, 375],
    [768, 1024],
    [900, 700],
    [1416, 900],
    [1920, 1080],
  ]
  try {
    await page.emulateMedia({ reducedMotion: "reduce" })
    for (const language of ["pt", "en"]) {
      await page.evaluate(
        (value) => localStorage.setItem("pedroreoli-portfolio-language", value),
        language,
      )
      for (const [width, height] of sizes) {
        await page.setViewportSize({ width, height })
        await page.goto(`${origin}/pagina-ausente`)
        await page.locator(".not-found-title").waitFor()
        await page.evaluate(() => document.fonts.ready)
        const layout = await page.locator("main").evaluate((main) => {
          const issues = []
          for (const element of main.querySelectorAll("h1,p,a,.not-found-label")) {
            const rect = element.getBoundingClientRect()
            if (
              rect.left < -1 ||
              rect.right > innerWidth + 1 ||
              rect.bottom > innerHeight + 1 ||
              rect.top < 0 ||
              element.scrollWidth > element.clientWidth + 1
            )
              issues.push(element.textContent.trim())
          }
          return {
            issues,
            overflow: document.documentElement.scrollWidth > innerWidth,
            opacity: getComputedStyle(main.querySelector(".not-found-title-mask > div")).opacity,
          }
        })
        check(
          `${language} ${width}x${height}: conteúdo e ações encaixados`,
          !layout.issues.length && !layout.overflow && layout.opacity === "1",
          layout,
        )
        check(
          `${language} ${width}: uma heading e noindex`,
          (await page.locator("h1").count()) === 1 &&
            (await page.locator('meta[name="robots"]').getAttribute("content")).includes("noindex"),
        )
      }
      // Texto ampliado pode crescer verticalmente; nunca ocultar conteúdo ou ações.
      for (const [width, height] of [
        [320, 480],
        [900, 700],
      ]) {
        await page.setViewportSize({ width, height })
        await page.goto(`${origin}/pagina-ausente`)
        await page.locator(".not-found-title").waitFor()
        await page.addStyleTag({ content: "html {font-size:32px !important}" })
        const zoom = await page.locator("main").evaluate((main) => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          clipped: [...main.querySelectorAll("h1,p,a")]
            .filter((e) => e.scrollWidth > e.clientWidth + 1)
            .map((e) => e.textContent),
        }))
        check(
          `${language} ${width}: texto ampliado sem corte horizontal`,
          !zoom.overflow && !zoom.clipped.length,
          zoom,
        )
      }
      await page.setViewportSize({ width: 390, height: 844 })
      for (const [index, path] of [
        [0, "/"],
        [1, "/projetos"],
      ]) {
        await page.goto(`${origin}/pagina-ausente`)
        const action = page.locator(".not-found-actions a").nth(index)
        await action.focus()
        await action.press("Enter")
        await page.waitForURL(origin + path)
        await page.waitForFunction(() => document.activeElement?.id === "main-content")
        check(`${language}: saída ${path} por teclado`, true)
      }
    }
    await page.emulateMedia({ reducedMotion: "no-preference" })
    for (const [width, height] of [
      [390, 844],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height })
      await page.goto(`${origin}/pagina-ausente`)
      const frames = await page.locator(".not-found-title-mask > div").evaluate(async (element) => {
        const frames = [],
          start = performance.now()
        while (performance.now() - start < 1200) {
          const style = getComputedStyle(element)
          frames.push({ opacity: Number(style.opacity), transform: style.transform })
          await new Promise(requestAnimationFrame)
        }
        return frames
      })
      check(
        `${width}: surgimento gradual`,
        frames.some((f) => f.opacity > 0 && f.opacity < 1) &&
          frames.at(-1).opacity === 1 &&
          frames.at(-1).transform === "none",
        frames,
      )
      await page.goto(`${origin}/pagina-ausente`)
      const action = page.locator(".not-found-actions a").first()
      await action.focus()
      await page.waitForFunction(
        () => getComputedStyle(document.querySelector(".not-found-detail")).opacity === "1",
      )
      check(
        `${width}: foco revela ação imediatamente`,
        await action.evaluate((e) => document.activeElement === e),
      )
    }
    return { passed: results.length, viewports: sizes.length, languages: ["pt", "en"] }
  } finally {
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await page.evaluate((value) => {
      if (value === null) localStorage.removeItem("pedroreoli-portfolio-language")
      else localStorage.setItem("pedroreoli-portfolio-language", value)
    }, savedLanguage)
  }
}
