// Requer sessão headless --persistent com perfil exclusivo de testes.
// Usa o zoom nativo do Chrome, não CSS zoom nem Emulation.setPageScaleFactor.
async function auditBrowserZoom(page) {
  const origin = new URL(page.url()).origin
  if (!/^https?:/.test(origin)) throw new Error("Abra o portfólio antes da auditoria")
  const originalViewport = page.viewportSize()
  const originalLanguage = await page.evaluate(() =>
    localStorage.getItem("pedroreoli-portfolio-language"),
  )
  const results = []
  const runtimeErrors = []
  const onError = (error) => runtimeErrors.push(error.message)
  page.on("pageerror", onError)
  let originalZoom
  const viewports = [
    [640, 960],
    [1280, 720],
    [1440, 900],
    [1920, 1080],
  ]
  const zoomControl = () => page.getByRole("combobox", { name: /^(Zoom da página:|Page zoom:)$/ })
  const assert = (label, condition) => {
    if (!condition) throw new Error(label)
    results.push(label)
  }
  const outsideContent = async (scope, fullscreen) =>
    scope.evaluate((element, full) => {
      const stage = element.querySelector(".selected-projects-stage, .trajectory-stage") || element
      const bounds = stage.getBoundingClientRect()
      const outside = []
      for (const item of element.querySelectorAll(
        "h1,h2,h3,p,a,button,li,.stack-tool,.about-stat,.footer-link",
      )) {
        if (item.closest(".sr-only")) continue
        const box = item.getBoundingClientRect()
        if (!box.width || !box.height) continue
        if (full) {
          let ancestor = item
          while (ancestor && ancestor !== stage.parentElement) {
            const style = getComputedStyle(ancestor)
            if (Number(style.opacity) < 0.99 || style.visibility === "hidden") {
              outside.push(`Conteúdo invisível: ${item.textContent.trim().slice(0, 50)}`)
              break
            }
            ancestor = ancestor.parentElement
          }
        }
        if (
          box.left < -2 ||
          box.right > innerWidth + 2 ||
          (full && (box.top < bounds.top - 2 || box.bottom > bounds.bottom + 2))
        )
          outside.push(item.textContent.trim().slice(0, 70))
      }
      if (document.documentElement.scrollWidth > innerWidth) outside.push("Overflow horizontal")
      if (full && Math.abs(bounds.height - innerHeight) > 1)
        outside.push("Seção não ocupa a viewport")
      return outside
    }, fullscreen)

  try {
    await page.goto("chrome://settings/appearance")
    originalZoom = await zoomControl().inputValue()
    await zoomControl().selectOption({ label: "200%" })
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto(origin)
    for (const language of ["pt", "en"]) {
      await page.evaluate(
        (value) => localStorage.setItem("pedroreoli-portfolio-language", value),
        language,
      )
      for (const [width, height] of viewports) {
        await page.setViewportSize({ width, height })
        await page.goto(origin)
        await page.locator("#experiencia").waitFor()
        await page.evaluate(() => document.fonts.ready)
        await page.waitForFunction(
          ([w, h]) => innerWidth === w / 2 && innerHeight === h / 2,
          [width, height],
        )

        const prefix = `${language} / 200% / ${width}x${height}`
        const header = page.locator("header:visible")
        await header
          .getByRole("link", { name: language === "pt" ? "Ir para o início" : "Go to home" })
          .focus()
        assert(
          `${prefix} / header acessível`,
          await header.evaluate((element) =>
            [...element.querySelectorAll("a,button")].every((control) => {
              const rect = control.getBoundingClientRect()
              if (!rect.width || !rect.height) return true
              const hit = document.elementFromPoint(
                rect.x + rect.width / 2,
                rect.y + rect.height / 2,
              )
              return rect.left >= 0 && rect.right <= innerWidth && control.contains(hit)
            }),
          ),
        )
        const menu = header.getByRole("button", {
          name: language === "pt" ? "Abrir menu" : "Open menu",
        })
        if (await menu.count()) {
          await menu.focus()
          await page.keyboard.press("Enter")
          await page
            .getByRole("navigation", {
              name: language === "pt" ? "Navegação mobile" : "Mobile navigation",
            })
            .waitFor()
          await page.keyboard.press("Escape")
          assert(
            `${prefix} / menu fecha e devolve foco`,
            await menu.evaluate(
              (button) =>
                button === document.activeElement &&
                button.getAttribute("aria-expanded") === "false",
            ),
          )
        }

        for (const id of [
          "hero",
          "sobre",
          "projetos-selecionados",
          "stack",
          "proposito",
          "experiencia",
          "contato",
        ]) {
          const section = page.locator(`#${id}`)
          const steps = id === "experiencia" ? 5 : id === "projetos-selecionados" ? 3 : 1
          for (let step = 0; step < steps; step++) {
            await section.evaluate(
              (element, { index, count }) => {
                const start = scrollY + element.getBoundingClientRect().top
                const distance =
                  count > 1 ? ((element.offsetHeight - innerHeight) * index) / (count - 1) : 0
                scrollTo({ top: start + distance, behavior: "instant" })
              },
              { index: step, count: steps },
            )
            if (id === "projetos-selecionados") {
              await page.waitForFunction(
                (index) =>
                  document
                    .querySelector("#projetos-selecionados [aria-current='step']")
                    ?.textContent.trim()
                    .startsWith(`0${index + 1}`),
                step,
              )
              if (step < 2) {
                await section
                  .getByRole("heading", { name: step === 0 ? "Autocom3" : "Achilles", exact: true })
                  .waitFor()
              } else {
                await section
                  .getByRole("link", {
                    name: language === "pt" ? "Ver mais projetos" : "See more projects",
                  })
                  .waitFor()
              }
            }
            if (id === "experiencia") {
              await page.waitForFunction((index) => {
                const buttons = [...document.querySelectorAll(".experience-index-row")]
                const selected = buttons.findIndex(
                  (button) => button.getAttribute("aria-pressed") === "true",
                )
                const company = buttons[index]?.querySelector("strong")?.textContent
                return (
                  selected === index &&
                  document.querySelector("#experience-detail h3")?.textContent === company
                )
              }, step)
            }
            await page.evaluate(
              () =>
                new Promise((resolve) =>
                  requestAnimationFrame(() => requestAnimationFrame(resolve)),
                ),
            )
            const issues = await outsideContent(section, true)
            assert(`${prefix} / ${id} / ${step + 1}: ${issues.join("; ")}`, issues.length === 0)
          }
        }
        for (const route of [
          "/projetos?tipo=corporativo",
          "/projetos?tipo=gerais",
          "/midia-blog",
        ]) {
          await page.goto(`${origin}${route}`)
          await page.locator("main h1").waitFor()
          await page.evaluate(() => document.fonts.ready)
          const issues = await outsideContent(page.locator("main"), false)
          assert(
            `${prefix} / ${route}: ${issues.join("; ")}`,
            issues.length === 0 && page.url() === `${origin}${route}`,
          )
        }
      }
    }
    if (runtimeErrors.length) throw new Error(runtimeErrors.join("; "))
    return { passed: results.length, zoom: "200% nativo do Chrome", results }
  } finally {
    page.off("pageerror", onError)
    if (originalZoom !== undefined) {
      await page.goto("chrome://settings/appearance")
      await zoomControl().selectOption(originalZoom)
    }
    if (originalViewport) await page.setViewportSize(originalViewport)
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await page.goto(origin)
    await page.evaluate((value) => {
      if (value === null) localStorage.removeItem("pedroreoli-portfolio-language")
      else localStorage.setItem("pedroreoli-portfolio-language", value)
    }, originalLanguage)
    await page.reload()
  }
}
