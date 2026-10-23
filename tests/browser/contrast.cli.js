// Alto contraste emulado no Chrome; não equivale a validar todos os temas do Windows.
async function auditForcedColors(page) {
  const origin = new URL(page.url()).origin
  const browser = page.context().browser()
  if (!browser || !/^https?:/.test(origin))
    throw new Error("Abra o servidor local antes da auditoria")
  const results = []
  const check = (label, condition) => {
    if (!condition) throw new Error(label)
    results.push(label)
  }

  for (const colorScheme of ["light", "dark"]) {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1440, height: 900 },
    ]) {
      const context = await browser.newContext({
        colorScheme,
        viewport,
        forcedColors: "active",
        reducedMotion: "reduce",
        locale: "pt-BR",
      })
      try {
        const target = await context.newPage()
        const prefix = `${colorScheme} / ${viewport.width}`
        await target.goto(origin)
        await target.locator("#experiencia").waitFor()
        await target.evaluate(() => document.fonts.ready)
        const menu = target.getByRole("button", { name: "Abrir menu", exact: true })
        const hasMenu = (await menu.count()) > 0
        if (hasMenu) {
          await menu.focus()
          await target.keyboard.press("Enter")
        }
        const activeLink = target.getByRole("link", { name: "Início", exact: true })
        check(
          `${prefix} / página ativa sublinhada`,
          await activeLink.evaluate((link) =>
            getComputedStyle(link).textDecorationLine.includes("underline"),
          ),
        )
        if (hasMenu) await target.keyboard.press("Escape")

        const selectedState = async (button, label) => {
          await button.focus()
          await target.keyboard.press("Enter")
          await target.waitForFunction(
            (text) =>
              [
                ...document.querySelectorAll(
                  'button[aria-current="step"], button[aria-pressed="true"]',
                ),
              ].some(
                (item) =>
                  item.getAttribute("aria-label") === text || item.textContent.trim() === text,
              ),
            (await button.getAttribute("aria-label")) || (await button.textContent()).trim(),
          )
          await target.evaluate(
            () =>
              new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
          )
          check(
            `${prefix} / ${label} / foco distinto`,
            await button.evaluate((element) => {
              const style = getComputedStyle(element)
              return (
                element === document.activeElement &&
                element.matches(":focus-visible") &&
                style.outlineStyle === "dashed" &&
                parseFloat(style.outlineWidth) >= 2 &&
                parseFloat(style.outlineOffset) > 0
              )
            }),
          )
          await target.locator("main").evaluate((main) => main.focus({ preventScroll: true }))
          await target.evaluate(
            () =>
              new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
          )
          check(
            `${prefix} / ${label} / seleção persistente`,
            await button.evaluate((element) => {
              const style = getComputedStyle(element)
              return (
                style.outlineStyle === "solid" &&
                parseFloat(style.outlineWidth) >= 2 &&
                parseFloat(style.outlineOffset) < 0
              )
            }),
          )
        }

        const projects = target.locator("#projetos-selecionados")
        await projects.evaluate((section) =>
          scrollTo({ top: scrollY + section.getBoundingClientRect().top, behavior: "instant" }),
        )
        for (const name of ["AUTOCOM3", "ACHILLES", "MAIS PROJETOS"]) {
          await selectedState(
            projects.getByRole("button", { name, exact: true }),
            `Projeto ${name}`,
          )
        }
        const experience = target.locator("#experiencia")
        await experience.evaluate((section) =>
          scrollTo({ top: scrollY + section.getBoundingClientRect().top, behavior: "instant" }),
        )
        const chapters = experience.locator(".experience-index-row")
        for (let index = 0; index < (await chapters.count()); index++) {
          await selectedState(chapters.nth(index), `Experiência ${index + 1}`)
        }
        check(
          `${prefix} / progresso mantém traço visível`,
          await experience.locator(".experience-progress span").evaluateAll((items) =>
            items.every((item) => {
              const style = getComputedStyle(item)
              return style.borderTopStyle === "solid" && parseFloat(style.borderTopWidth) >= 2
            }),
          ),
        )
        await target.goto(`${origin}/projetos`)
        const filters = target.getByRole("group", { name: "Categorias de projetos" })
        await filters.waitFor()
        for (const name of ["Corporativo", "Independentes"]) {
          await selectedState(filters.getByRole("button", { name, exact: true }), `Filtro ${name}`)
        }
        check(
          `${prefix} / sem overflow horizontal`,
          await target.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        )
      } finally {
        await context.close()
      }
    }
  }
  const standard = await browser.newContext({ forcedColors: "none", reducedMotion: "reduce" })
  try {
    const target = await standard.newPage()
    await target.goto(origin)
    await target.locator("#experiencia").waitFor()
    check(
      "Modo normal preserva contorno tipográfico e seleção original",
      await target.evaluate(() => {
        const title = getComputedStyle(document.querySelector(".hero-text-hollow"))
        const selected = getComputedStyle(document.querySelector('button[aria-current="step"]'))
        return (
          title.color === "rgba(0, 0, 0, 0)" &&
          parseFloat(title.webkitTextStrokeWidth) > 0 &&
          selected.outlineStyle === "none"
        )
      }),
    )
  } finally {
    await standard.close()
  }
  return { passed: results.length, results }
}
