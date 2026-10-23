// Executar com playwright-cli run-code --filename em sessão headless.
async function auditHero(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const savedLanguage = await page.evaluate(() =>
    localStorage.getItem("pedroreoli-portfolio-language"),
  )
  const viewports = [
    [320, 480],
    [360, 640],
    [375, 667],
    [390, 844],
    [414, 896],
    [667, 375],
    [844, 390],
    [768, 1024],
    [1024, 768],
    [1280, 720],
    [1366, 768],
    [1440, 900],
    [1920, 1080],
    [2560, 1440],
  ]
  const results = []
  const errors = []
  const onError = (error) => errors.push(error.message)
  page.on("pageerror", onError)
  const check = (name, condition, detail) => {
    if (!condition) throw new Error(`${name}: ${JSON.stringify(detail)}`)
    results.push(name)
  }

  try {
    await page.emulateMedia({ reducedMotion: "reduce" })
    for (const language of ["pt", "en"]) {
      await page.evaluate(
        (value) => localStorage.setItem("pedroreoli-portfolio-language", value),
        language,
      )
      await page.goto(`${origin}/`)
      await page.locator(".hero-role").waitFor()
      await page.evaluate(() => document.fonts.ready)
      for (const [width, height] of viewports) {
        await page.setViewportSize({ width, height })
        await page.waitForFunction(
          () =>
            Math.abs(document.querySelector("#hero").getBoundingClientRect().height - innerHeight) <
            1,
        )
        await page.evaluate(
          () =>
            new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        )
        const geometry = await page.evaluate(() => {
          const hero = document.querySelector("#hero")
          const issues = []
          for (const element of hero.querySelectorAll("h1,p,a,.hero-mega-text")) {
            const rect = element.getBoundingClientRect()
            if (
              rect.left < -1 ||
              rect.right > innerWidth + 1 ||
              rect.top < -1 ||
              rect.bottom > innerHeight + 1
            )
              issues.push(element.textContent.trim())
          }
          const name = hero.querySelector("h1").getBoundingClientRect()
          const role = hero.querySelector(".hero-role").getBoundingClientRect()
          const metadata = hero.querySelector(".hero-frame > div").getBoundingClientRect()
          const action = hero.querySelector("a").getBoundingClientRect()
          if (metadata.bottom > name.top || name.bottom > role.top || role.bottom > action.top)
            issues.push("Colisão entre metadados, nome, cargo ou ação")
          if (document.documentElement.scrollWidth > innerWidth) issues.push("Overflow horizontal")
          return {
            issues,
            wrapperSize: getComputedStyle(hero.querySelector(".hero-diagonal-reoli")).fontSize,
            letterSize: getComputedStyle(hero.querySelector(".hero-mega-text")).fontSize,
            roleSize: parseFloat(getComputedStyle(hero.querySelector(".hero-role")).fontSize),
            opacity: [...hero.querySelectorAll(".hero-mega-text,.hero-role")].map((element) =>
              Number(getComputedStyle(element).opacity),
            ),
          }
        })
        check(
          `${language} ${width}×${height}: encaixe e proporção`,
          !geometry.issues.length &&
            geometry.wrapperSize === geometry.letterSize &&
            geometry.roleSize >= 18 &&
            geometry.opacity.every((value) => value === 1),
          geometry,
        )
      }
    }

    await page.emulateMedia({ reducedMotion: "no-preference" })
    // Coleta desde a criação dos elementos, sem depender da latência de uma chamada após goto.
    await page.addInitScript(() => {
      if (window.__heroFrames) return
      window.__heroFrames = []
      let start
      const sample = (now) => {
        const elements = [...document.querySelectorAll(".hero-mega-text,.hero-role")]
        if (elements.length === 3) {
          start ??= now
          window.__heroFrames.push({
            time: now - start,
            opacity: elements.map((element) => Number(getComputedStyle(element).opacity)),
            transform: elements.map((element) => getComputedStyle(element).transform),
          })
        }
        if (start === undefined || now - start < 2200) requestAnimationFrame(sample)
      }
      requestAnimationFrame(sample)
    })
    for (const [width, height] of [
      [390, 844],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height })
      await page.goto(`${origin}/`)
      await page.waitForFunction(() => window.__heroFrames?.at(-1)?.time >= 2100)
      const motion = await page.evaluate(() => {
        const frames = window.__heroFrames
        return {
          first: frames[0],
          last: frames.at(-1),
          visible: [0, 1, 2].map(
            (index) => frames.find((frame) => frame.opacity[index] > 0.05)?.time,
          ),
        }
      })
      check(
        `${width}×${height}: Pedro → Reoli → cargo`,
        motion.first.opacity.every((value) => value === 0) &&
          motion.visible[0] < motion.visible[1] &&
          motion.visible[1] < motion.visible[2] &&
          motion.last.opacity.every((value) => value === 1) &&
          motion.last.transform.every((value) => value === "none"),
        motion,
      )

      const colors = []
      for (const progress of [0, 0.25, 0.5]) {
        await page.evaluate(
          (value) => scrollTo({ top: innerHeight * value, behavior: "instant" }),
          progress,
        )
        await page.evaluate(
          () =>
            new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        )
        colors.push(
          await page
            .locator("#hero")
            .evaluate((element) => getComputedStyle(element.parentElement).backgroundColor),
        )
      }
      check(
        `${width}×${height}: fundo escuro → claro`,
        colors[0] === "rgb(17, 16, 16)" &&
          colors[2] === "rgb(237, 234, 228)" &&
          colors[1] !== colors[0] &&
          colors[1] !== colors[2],
        colors,
      )
    }
    check("Sem erros de execução", errors.length === 0, errors)
    return { passed: results.length, results }
  } finally {
    page.off("pageerror", onError)
    await page.evaluate((value) => {
      if (value === null) localStorage.removeItem("pedroreoli-portfolio-language")
      else localStorage.setItem("pedroreoli-portfolio-language", value)
    }, savedLanguage)
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(`${origin}/`)
  }
}
