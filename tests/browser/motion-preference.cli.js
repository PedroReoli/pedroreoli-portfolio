// Executar em Chrome headless. Não muda a preferência real do sistema operacional.
async function auditMotionPreference(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const results = []
  const errors = []
  const onError = (error) => errors.push(error.message)
  const check = (name, condition, detail) => {
    if (!condition) throw new Error(`${name}: ${JSON.stringify(detail)}`)
    results.push(name)
  }
  const savedLanguage = await page.evaluate(() =>
    localStorage.getItem("pedroreoli-portfolio-language"),
  )
  page.on("pageerror", onError)

  try {
    for (const [width, height] of [
      [390, 844],
      [1440, 720],
    ]) {
      await page.setViewportSize({ width, height })
      for (const language of ["pt", "en"]) {
        await page.evaluate(
          (value) => localStorage.setItem("pedroreoli-portfolio-language", value),
          language,
        )
        for (const [path, selector] of [
          ["/midia-blog", ".project-archive-row"],
          ["/projetos?tipo=corporativo", "#corporativo-projects > div:last-child > div"],
          ["/projetos?tipo=gerais", ".project-archive-row"],
        ]) {
          // O alvo precisa estar inteiro abaixo da dobra, independentemente da copy/layout.
          await page.setViewportSize({ width, height: 480 })
          await page.emulateMedia({ reducedMotion: "no-preference" })
          await page.goto(`${origin}${path}`)
          const target = page.locator(selector).last()
          await target.waitFor({ state: "attached" })
          const before = await target.evaluate((element) => {
            const reveal = element.matches("a") ? element.parentElement : element
            return {
              opacity: getComputedStyle(reveal).opacity,
              top: reveal.getBoundingClientRect().top,
            }
          })
          check(
            `${width} / ${language} / ${path}: entrada aguardando scroll`,
            before.top >= 480 && before.opacity === "0",
            before,
          )
          await page.emulateMedia({ reducedMotion: "reduce" })
          await page.waitForFunction((selector) => {
            const element = [...document.querySelectorAll(selector)].at(-1)
            const reveal = element.matches("a") ? element.parentElement : element
            const style = getComputedStyle(reveal)
            return style.opacity === "1" && style.transform === "none"
          }, selector)
          check(`${width} / ${language} / ${path}: preferência aplicada sem reload`, true)
          // A troca não deve mover o usuário nem alterar a categoria ativa.
          check(
            `${width} / ${language} / ${path}: posição e URL preservadas`,
            (await page.evaluate(() => scrollY === 0)) && page.url() === `${origin}${path}`,
          )
        }
      }

      await page.emulateMedia({ reducedMotion: "no-preference" })
      // Viewport curta mantém o título abaixo da dobra antes de iniciar o scroll.
      await page.setViewportSize({ width, height: 480 })
      await page.goto(`${origin}/midia-blog`)
      const notesHeading = page.locator(".archive-section").last().locator(":scope > div").first()
      await notesHeading.waitFor({ state: "attached" })
      check(
        `${width}: título das referências aguarda entrada`,
        await notesHeading.evaluate((element) => getComputedStyle(element).opacity === "0"),
      )
      const headingFrames = await notesHeading.evaluate(async (element) => {
        const values = []
        element.scrollIntoView({ block: "center", behavior: "instant" })
        const start = performance.now()
        while (performance.now() - start < 900) {
          values.push(Number(getComputedStyle(element).opacity))
          await new Promise(requestAnimationFrame)
        }
        return values
      })
      check(
        `${width}: título das referências surge progressivamente`,
        headingFrames.some((opacity) => opacity > 0 && opacity < 1) && headingFrames.at(-1) === 1,
        headingFrames,
      )
      await page.setViewportSize({ width, height })

      await page.emulateMedia({ reducedMotion: "no-preference" })
      await page.goto(`${origin}/`)
      await page.locator("#contato").waitFor({ state: "attached" })
      await page.waitForFunction(
        () => getComputedStyle(document.querySelector(".hero-role")).opacity === "1",
      )
      await page.evaluate(() => scrollTo({ top: innerHeight * 0.35, behavior: "instant" }))
      await page.waitForFunction(
        () => Number(getComputedStyle(document.querySelector(".hero-frame")).opacity) < 0.9,
      )
      await page.emulateMedia({ reducedMotion: "reduce" })
      await page.waitForFunction(() => {
        const style = getComputedStyle(document.querySelector(".hero-frame"))
        return (
          style.opacity === "1" &&
          style.transform === "none" &&
          getComputedStyle(document.querySelector("#sobre")).backgroundColor ===
            "rgb(237, 234, 228)"
        )
      })
      check(`${width}: parallax desligado e Sobre legível sem reload`, true)

      // Intercepta somente para observar as opções reais, mantendo a implementação nativa.
      await page.evaluate(() => {
        const nativeScroll = window.scrollTo.bind(window)
        window.__motionScrollCalls = []
        window.scrollTo = (...args) => {
          window.__motionScrollCalls.push(args[0])
          nativeScroll(...args)
        }
      })
      const projectButton = page.locator('#projetos-selecionados button[aria-label="ACHILLES"]')
      await projectButton.focus()
      await projectButton.press("Enter")
      check(
        `${width}: seleção de projeto sem smooth scroll`,
        await page.evaluate(() => window.__motionScrollCalls.at(-1)?.behavior === "auto"),
      )
      await page.getByRole("heading", { name: "Achilles", exact: true }).waitFor()
      await page.emulateMedia({ reducedMotion: "no-preference" })
      await page.waitForFunction(
        () =>
          getComputedStyle(document.querySelector("#sobre")).backgroundColor === "rgba(0, 0, 0, 0)",
      )
      const firstProject = page.locator('#projetos-selecionados button[aria-label="AUTOCOM3"]')
      await firstProject.focus()
      await firstProject.press("Enter")
      check(
        `${width}: movimento reativado sem reload`,
        await page.evaluate(() => window.__motionScrollCalls.at(-1)?.behavior === "smooth"),
      )

      // Montagem já reduzida: desligar a preferência precisa reativar também elementos existentes.
      await page.emulateMedia({ reducedMotion: "reduce" })
      await page.goto(`${origin}/projetos`)
      await page.locator("#corporativo-projects").waitFor()
      await page.emulateMedia({ reducedMotion: "no-preference" })
      const frames = await page.evaluate(async () => {
        const header = [...document.querySelectorAll("header")].find(
          (element) => element.getBoundingClientRect().height > 0,
        )
        const positions = []
        const start = performance.now()
        scrollTo({ top: 300, behavior: "instant" })
        while (performance.now() - start < 450) {
          positions.push(header.getBoundingClientRect().top)
          await new Promise(requestAnimationFrame)
        }
        return { positions, height: header.getBoundingClientRect().height }
      })
      check(
        `${width}: navbar volta a animar após montagem reduzida`,
        frames.positions.some((top) => top < -1 && top > -frames.height + 1),
        frames,
      )
    }
    check("Sem erros de execução", errors.length === 0, errors)
    return { passed: results.length, results }
  } catch (error) {
    const state = await page.evaluate(() => ({
      scroll: scrollY,
      height: innerHeight,
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      hero: document.querySelector(".hero-frame")?.getAttribute("style"),
      role: document.querySelector(".hero-role")?.getAttribute("style"),
      about: document.querySelector("#sobre")?.getAttribute("style"),
    }))
    throw new Error(
      `${error.message}; último check: ${results.at(
        -1,
      )}; URL: ${page.url()}; estado: ${JSON.stringify(state)}`,
    )
  } finally {
    page.off("pageerror", onError)
    await page.evaluate((value) => {
      if (value === null) localStorage.removeItem("pedroreoli-portfolio-language")
      else localStorage.setItem("pedroreoli-portfolio-language", value)
    }, savedLanguage)
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await page.goto(`${origin}/`)
  }
}
