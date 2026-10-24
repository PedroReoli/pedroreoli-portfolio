// Executar apenas em sessão headless. Mede encaixe e amostra entradas reais.
async function auditSections(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const results = []
  const errors = []
  const onError = (error) => errors.push(error.message)
  const savedLanguage = await page.evaluate(() =>
    localStorage.getItem("pedroreoli-portfolio-language"),
  )
  const check = (name, condition, detail) => {
    if (!condition) throw new Error(`${name}: ${JSON.stringify(detail)}`)
    results.push(name)
  }
  const sections = [
    "hero",
    "sobre",
    "projetos-selecionados",
    "stack",
    "proposito",
    "experiencia",
    "contato",
  ]
  const sizes = [
    [320, 480],
    [320, 568],
    [320, 701],
    [360, 640],
    [360, 700],
    [360, 701],
    [375, 667],
    [390, 844],
    [400, 800],
    [430, 932],
    [600, 700],
    [667, 375],
    [767, 701],
    [768, 1024],
    [844, 390],
    [900, 700],
    [1024, 768],
    [1280, 720],
    [1416, 900],
    [1440, 900],
    [1920, 1080],
    [2560, 1440],
  ]
  page.on("pageerror", onError)
  try {
    await page.emulateMedia({ reducedMotion: "reduce" })
    for (const language of ["pt", "en"]) {
      await page.evaluate(
        (value) => localStorage.setItem("pedroreoli-portfolio-language", value),
        language,
      )
      await page.goto(origin)
      await page.locator("#experiencia").waitFor({ state: "attached" })
      await page.evaluate(() => document.fonts.ready)
      for (const [width, height] of sizes) {
        await page.setViewportSize({ width, height })
        await page.waitForFunction(
          (height) => document.getElementById("hero").offsetHeight === height,
          height,
        )
        await page.evaluate(
          () =>
            new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        )
        for (const id of sections) {
          await page
            .locator(`#${id}`)
            .evaluate((element) =>
              scrollTo({ top: scrollY + element.getBoundingClientRect().top, behavior: "instant" }),
            )
          await page.evaluate(
            () =>
              new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
          )
          const geometry = await page.evaluate((id) => {
            const outer = document.getElementById(id)
            const stage = outer.matches(".viewport-stage")
              ? outer
              : outer.querySelector(".viewport-stage") || outer.firstElementChild
            const frame = stage.getBoundingClientRect()
            const issues = []
            if (Math.abs(frame.top) > 2) issues.push(`Seção fora da área visível: ${frame.top}`)
            const inside = (child, parent) =>
              child.left >= parent.left - 2 &&
              child.right <= parent.right + 2 &&
              child.top >= parent.top - 2 &&
              child.bottom <= parent.bottom + 2
            for (const element of stage.querySelectorAll(
              "h1,h2,h3,p,a,button,strong,small,.stack-tool,.hero-mega-text",
            )) {
              const rect = element.getBoundingClientRect()
              if (!rect.width || !rect.height || element.closest(".sr-only")) continue
              if (!inside(rect, frame)) issues.push(element.textContent.trim())
            }
            for (const tool of stage.querySelectorAll(".stack-tool")) {
              if (
                !inside(
                  tool.getBoundingClientRect(),
                  tool.closest(".stack-lane").getBoundingClientRect(),
                )
              )
                issues.push(`Stack row: ${tool.textContent}`)
            }
            const aboutCopy = stage.querySelector(".about-copy")
            if (aboutCopy && aboutCopy.scrollHeight > aboutCopy.clientHeight + 2)
              issues.push("About copy overflows its grid track")
            return {
              issues,
              height: frame.height,
              overflow: document.documentElement.scrollWidth - innerWidth,
            }
          }, id)
          check(
            `${language} ${width}×${height} ${id}`,
            !geometry.issues.length &&
              geometry.overflow <= 1 &&
              Math.abs(geometry.height - height) <= 1,
            geometry,
          )
        }
      }
    }

    // Each section must transition, not just end in a visible state.
    for (const [width, height] of [
      [390, 844],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height })
      await page.emulateMedia({ reducedMotion: "no-preference" })
      for (const [id, selector] of [
        ["sobre", ".about-portrait-shell"],
        ["stack", ".stack-lanes > div"],
        ["proposito", ".purpose-media-shell"],
        ["experiencia", ".experience-detail-shell"],
      ]) {
        await page.goto(origin)
        await page.locator(`#${id}`).waitFor({ state: "attached" })
        const frames = await page.evaluate(
          async ({ id, selector }) => {
            const section = document.getElementById(id)
            const element = section.querySelector(selector)
            const samples = []
            scrollTo({ top: scrollY + section.getBoundingClientRect().top, behavior: "instant" })
            const start = performance.now()
            while (performance.now() - start < 1600) {
              const style = getComputedStyle(element)
              samples.push({ opacity: Number(style.opacity), transform: style.transform })
              await new Promise(requestAnimationFrame)
            }
            return samples
          },
          { id, selector },
        )
        check(
          `${width} ${id}: surgimento progressivo`,
          frames.some((frame) => frame.opacity > 0 && frame.opacity < 1) &&
            frames.at(-1).opacity === 1 &&
            frames.at(-1).transform === "none",
          frames,
        )
      }
    }
    check("Sem erros de renderização", !errors.length, errors)
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
