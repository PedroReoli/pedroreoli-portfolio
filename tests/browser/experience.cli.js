// Confere copy, idioma e encaixe de cada capítulo, em sessão headless.
async function auditExperience(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const savedLanguage = await page.evaluate(() =>
    localStorage.getItem("pedroreoli-portfolio-language"),
  )
  const results = []
  const skills = {
    pt: [
      "Inteligência Artificial",
      "Prototipação",
      "Inclusão Digital",
      "Educação Tecnológica",
      "Mentoria",
    ],
    en: [
      "Artificial Intelligence",
      "Prototyping",
      "Digital Inclusion",
      "Technology Education",
      "Mentoring",
    ],
  }
  const sizes = [
    [320, 480],
    [360, 640],
    [390, 844],
    [667, 375],
    [844, 390],
    [768, 1024],
    [1440, 900],
  ]
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
        await page
          .locator("#experiencia")
          .evaluate((element) =>
            scrollTo({ top: scrollY + element.getBoundingClientRect().top, behavior: "instant" }),
          )
        await page.evaluate(
          () =>
            new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        )
        const buttons = page.locator(".experience-index-row")
        for (let index = 0; index < (await buttons.count()); index++) {
          // Botão nativo: garante também navegação alternativa ao scroll.
          await buttons.nth(index).focus()
          await buttons.nth(index).press("Enter")
          await page
            .waitForFunction(
              (index) =>
                [...document.querySelectorAll(".experience-index-row")][index].getAttribute(
                  "aria-pressed",
                ) === "true",
              index,
            )
            .catch(async (error) => {
              throw new Error(
                `${language} ${width}x${height} chapter ${index + 1}: ${await page
                  .locator("#experience-detail")
                  .innerText()} ${error.message}`,
              )
            })
          await page.waitForFunction(
            (index) =>
              document
                .querySelector("#experience-detail > p")
                .textContent.trim()
                .startsWith(`0${index + 1} /`),
            index,
          )
          const result = await page.locator("#experience-detail").evaluate((element) => {
            const frame = element.closest(".experience-detail-shell").getBoundingClientRect()
            const issues = []
            for (const child of element.querySelectorAll("h3,p,.experience-technologies > span")) {
              const rect = child.getBoundingClientRect()
              if (
                rect.left < frame.left - 2 ||
                rect.right > frame.right + 2 ||
                rect.top < frame.top - 2 ||
                rect.bottom > frame.bottom + 2
              )
                issues.push(child.textContent.trim())
            }
            return {
              issues,
              skills: [...element.querySelectorAll(".experience-technologies > span")].map(
                (skill) => skill.textContent.replace("•", "").trim(),
              ),
            }
          })
          if (result.issues.length)
            throw new Error(
              `${language} ${width}×${height} capítulo ${index + 1}: ${JSON.stringify(result)}`,
            )
          if (index === 3 && JSON.stringify(result.skills) !== JSON.stringify(skills[language]))
            throw new Error(`Competências no idioma errado: ${JSON.stringify(result.skills)}`)
          results.push(`${language} ${width}×${height} capítulo ${index + 1}`)
        }
      }
    }
    await page.emulateMedia({ reducedMotion: "no-preference" })
    for (const [width, height] of [
      [390, 844],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height })
      const jumpTo = async (index) => {
        await page
          .locator("#experiencia")
          .evaluate(
            (element, index) =>
              scrollTo({
                top:
                  scrollY +
                  element.getBoundingClientRect().top +
                  ((element.scrollHeight - innerHeight) * index) / 4,
                behavior: "instant",
              }),
            index,
          )
        await page.waitForFunction(
          (index) =>
            document
              .querySelector("#experience-detail > p")
              ?.textContent.trim()
              .startsWith(`0${index + 1} /`),
          index,
        )
      }
      await jumpTo(1)
      await page.waitForFunction(
        () => Number(getComputedStyle(document.querySelector("#experience-detail")).opacity) > 0.99,
      )
      const previous = await page.locator("#experience-detail").elementHandle()
      await jumpTo(4)
      const reused = await page.evaluate(
        (element) => element === document.querySelector("#experience-detail"),
        previous,
      )
      await previous.dispose()
      if (reused)
        throw new Error(
          `${width}x${height}: capítulos da mesma empresa reutilizam a entrada animada`,
        )
      await page.waitForFunction(
        () => Number(getComputedStyle(document.querySelector("#experience-detail")).opacity) > 0.99,
      )
      results.push(`${width}x${height} transição entre capítulos da mesma empresa`)
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
