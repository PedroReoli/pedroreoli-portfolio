// Mantém a seção em leitura durante resize e retoma o avanço por capítulos.
async function auditViewportResize(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const savedLanguage = await page.evaluate(() =>
    localStorage.getItem("pedroreoli-portfolio-language"),
  )
  const results = []
  const check = (label, valid, detail) => {
    if (!valid) throw new Error(`${label}: ${JSON.stringify(detail)}`)
    results.push(label)
  }
  const frames = () =>
    page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    )
  const read = (id) =>
    page.locator(`#${id}`).evaluate((e) => ({
      progress: -e.getBoundingClientRect().top / e.offsetHeight,
      active: e
        .querySelector('[aria-current="step"],[aria-pressed="true"]')
        ?.getAttribute("aria-label"),
    }))
  const scenes = [
    ["hero", 0.3],
    ["sobre", 0.2],
    ["projetos-selecionados", 1 / 3],
    ["projetos-selecionados", 0],
    ["projetos-selecionados", 2 / 3],
    ["stack", 0.1],
    ["proposito", 0.2],
    ["experiencia", 0.4],
    ["experiencia", 0],
    ["experiencia", 0.2],
    ["experiencia", 0.6],
    ["experiencia", 0.8],
    ["contato", 0],
  ]
  const sizes = [
    [390, 720],
    [844, 390],
    [768, 1024],
    [1440, 900],
    [390, 844],
  ]
  try {
    for (const motion of ["reduce", "no-preference"]) {
      await page.emulateMedia({ reducedMotion: motion })
      for (const language of ["pt", "en"]) {
        await page.evaluate(
          (value) => localStorage.setItem("pedroreoli-portfolio-language", value),
          language,
        )
        await page.setViewportSize({ width: 390, height: 844 })
        await page.goto(origin)
        await page.locator("#experiencia").waitFor({ state: "attached" })
        await page.evaluate(() => document.fonts.ready)
        for (const [id, progress] of scenes) {
          await page.locator(`#${id}`).evaluate(
            (e, p) =>
              scrollTo({
                top: scrollY + e.getBoundingClientRect().top + e.offsetHeight * p,
                behavior: "instant",
              }),
            progress,
          )
          await frames()
          const before = await read(id)
          for (const [width, height] of sizes) {
            await page.setViewportSize({ width, height })
            await page.waitForFunction(
              (height) => document.getElementById("hero").offsetHeight === height,
              height,
            )
            await page.waitForFunction(
              ({ id, progress }) => {
                const e = document.getElementById(id)
                return Math.abs(-e.getBoundingClientRect().top / e.offsetHeight - progress) < 0.005
              },
              { id, progress: before.progress },
              { timeout: 3000 },
            )
            await frames()
            const after = await read(id)
            check(
              `${motion} ${language} ${id} ${progress} ${width}x${height}`,
              Math.abs(after.progress - before.progress) < 0.005 && after.active === before.active,
              { before, after },
            )
          }
        }
        // Mudanças em sequência (barra do navegador) não perdem o capítulo.
        await page.locator("#experiencia").evaluate((e) =>
          scrollTo({
            top: scrollY + e.getBoundingClientRect().top + e.offsetHeight * 0.4,
            behavior: "instant",
          }),
        )
        await frames()
        const before = await read("experiencia")
        for (const height of [780, 740, 710, 760, 844])
          await page.setViewportSize({ width: 390, height })
        await page.waitForTimeout(150)
        const after = await read("experiencia")
        check(
          `${motion} ${language}: redimensionamento rápido`,
          Math.abs(after.progress - before.progress) < 0.005 && after.active === before.active,
          { before, after },
        )
        const nextChapter = await page.locator("#experiencia").evaluate((e) =>
          scrollY + e.getBoundingClientRect().top + (e.offsetHeight - innerHeight) * 0.75)
        await page.mouse.move(195, 420)
        await page.mouse.wheel(0, 150)
        await page.waitForFunction((target) => Math.abs(scrollY - target) < 2 &&
          !document.querySelector('[data-scene-transition="running"]'), nextChapter)
        check(
          `${motion} ${language}: gesto avança após resize`,
          await page.evaluate((target) => Math.abs(scrollY - target) < 2, nextChapter),
        )
      }
    }
    return {
      passed: results.length,
      scenes: new Set(scenes.map(([id]) => id)).size,
      states: scenes.length,
      viewports: sizes.length,
      languages: ["pt", "en"],
      motion: ["reduce", "no-preference"],
    }
  } finally {
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await page.evaluate((value) => {
      if (value === null) localStorage.removeItem("pedroreoli-portfolio-language")
      else localStorage.setItem("pedroreoli-portfolio-language", value)
    }, savedLanguage)
  }
}
