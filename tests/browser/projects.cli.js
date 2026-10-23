// Executar com playwright-cli run-code --filename em sessão headless.
async function auditProjectSlides(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const viewports = [
    [320, 480],
    [360, 640],
    [390, 844],
    [667, 375],
    [844, 390],
    [768, 1024],
    [1440, 900],
  ]
  const errors = []
  const onError = (error) => errors.push(error.message)
  page.on("pageerror", onError)
  let checks = 0

  try {
    await page.emulateMedia({ reducedMotion: "reduce" })
    for (const language of ["pt", "en"]) {
      await page.evaluate(
        (value) => localStorage.setItem("pedroreoli-portfolio-language", value),
        language,
      )
      await page.goto(`${origin}/`)
      const section = page.locator("#projetos-selecionados")
      await section.waitFor()
      await page.evaluate(() => document.fonts.ready)
      const labels = ["AUTOCOM3", "ACHILLES", language === "pt" ? "MAIS PROJETOS" : "MORE PROJECTS"]

      for (const [width, height] of viewports) {
        await page.setViewportSize({ width, height })
        // Aguarda o layout da nova viewport antes de calcular as posições de scroll.
        await page.waitForFunction(() => {
          const stage = document.querySelector(".selected-projects-stage")
          return stage && Math.abs(stage.getBoundingClientRect().height - innerHeight) < 1
        })
        for (let index = 0; index < labels.length; index++) {
          // Percorre o scroll nativo; a seleção precisa acompanhar cada capítulo.
          await section.evaluate((element, step) => {
            const start = scrollY + element.getBoundingClientRect().top
            scrollTo({
              top: start + ((element.offsetHeight - innerHeight) * step) / 2,
              behavior: "instant",
            })
          }, index)
          const button = section.getByRole("button", { name: labels[index], exact: true })
          await page.waitForFunction(
            (label) =>
              document
                .querySelector('#projetos-selecionados [aria-current="step"]')
                ?.getAttribute("aria-label") === label,
            labels[index],
          )
          if (index < 2) {
            await section
              .getByRole("heading", { name: index === 0 ? "Autocom3" : "Achilles", exact: true })
              .waitFor()
          } else {
            await section
              .getByRole("link", {
                name: language === "pt" ? "Ver mais projetos" : "See more projects",
              })
              .waitFor()
          }
          await button.focus()
          const issues = await section.evaluate((element) => {
            const stage = element.querySelector(".selected-projects-stage").getBoundingClientRect()
            const outside = []
            for (const item of element.querySelectorAll(
              "h2,h3,p,a,button,li,.project-image-frame",
            )) {
              const rect = item.getBoundingClientRect()
              if (!rect.width || !rect.height || item.closest(".sr-only")) continue
              if (
                rect.top < stage.top - 2 ||
                rect.bottom > stage.bottom + 2 ||
                rect.left < stage.left - 2 ||
                rect.right > stage.right + 2
              ) {
                outside.push(item.textContent.trim().slice(0, 60) || item.className)
              }
            }
            if (document.documentElement.scrollWidth > innerWidth)
              outside.push("Overflow horizontal")
            return outside
          })
          if (issues.length)
            throw new Error(`${language} ${width}x${height}, slide ${index}: ${issues.join("; ")}`)
          if (index === 0) {
            const image = section.locator(".project-feature-image")
            await image.evaluate((element) => element.decode())
            if (
              (await section
                .getByRole("link", {
                  name: language === "pt" ? "Explorar interfaces" : "Explore the interfaces",
                })
                .getAttribute("href")) !== "/projetos?tipo=corporativo"
            )
              throw new Error("Destino do projeto corporativo alterado")
          }
          if (index === 1) {
            const link = section.getByRole("link", { name: /GitHub/ })
            if ((await link.getAttribute("target")) !== "_blank")
              throw new Error("Destino externo sem nova aba")
            if ((await link.getAttribute("rel")) !== "noopener noreferrer")
              throw new Error("Proteção de destino externo ausente")
          }
          checks++
        }
      }
      // O seletor também deve funcionar por teclado, sem exigir roda do mouse.
      for (const label of labels) {
        const button = section.getByRole("button", { name: label, exact: true })
        await button.focus()
        await page.keyboard.press("Enter")
        await page.waitForFunction(
          (name) =>
            document
              .querySelector('#projetos-selecionados [aria-current="step"]')
              ?.getAttribute("aria-label") === name,
          label,
        )
        checks++
      }
      await page.emulateMedia({ reducedMotion: "no-preference" })
      await page.reload()
      await section.waitFor()
      for (const index of [0, 1, 2, 0]) {
        await section.evaluate((element, step) => {
          scrollTo({
            top:
              scrollY +
              element.getBoundingClientRect().top +
              ((element.offsetHeight - innerHeight) * step) / 2,
            behavior: "instant",
          })
        }, index)
        await page.waitForFunction(
          ({ index, language }) => {
            const root = document.querySelector("#projetos-selecionados")
            const content =
              index < 2
                ? root?.querySelector(".selected-project-slide")
                : root?.querySelector('a[href="/projetos"]')?.parentElement
            const title =
              index < 2 ? content?.querySelector("h3")?.textContent : content?.textContent
            const expected = [
              "Autocom3",
              "Achilles",
              language === "pt" ? "Ver mais projetos" : "See more projects",
            ][index]
            return (
              content &&
              title?.includes(expected) &&
              Number(getComputedStyle(content).opacity) > 0.99
            )
          },
          { index, language },
        )
        checks++
      }
      await page.emulateMedia({ reducedMotion: "reduce" })
    }
    if (errors.length) throw new Error(errors.join("\n"))
    return { passed: checks, viewports: viewports.length, languages: ["pt", "en"], errors }
  } finally {
    page.off("pageerror", onError)
  }
}
