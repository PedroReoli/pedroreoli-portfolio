// Amostra quadros reais em uma sessão headless: páginas, cenas, cliques e capítulos.
async function auditFilmMotion(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const savedLanguage = await page.evaluate(() =>
    localStorage.getItem("pedroreoli-portfolio-language"),
  )
  const results = []
  const check = (name, valid, detail) => {
    if (!valid) throw new Error(`${name}: ${JSON.stringify(detail)}`)
    results.push(name)
  }
  const settled = () =>
    page.waitForFunction(() => {
      const scene = document.querySelector('.route-scene[data-page-state="present"]')
      return (
        scene &&
        getComputedStyle(scene).opacity === "1" &&
        !document.querySelector('.route-scene[data-page-state="exiting"]')
      )
    })
  const navigate = async (name, width) => {
    if (width < 768) {
      await page.getByRole("button", { name: "Abrir menu", exact: true }).click()
      await page
        .getByRole("navigation", { name: "Navegação mobile" })
        .getByRole("link", { name, exact: true })
        .click()
    } else
      await page
        .getByRole("navigation", { name: "Links do site" })
        .getByRole("link", { name, exact: true })
        .click()
  }
  try {
    await page.evaluate(() => localStorage.setItem("pedroreoli-portfolio-language", "pt"))
    for (const [width, height] of [
      [390, 844],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height })
      for (const reduced of [false, true]) {
        await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" })
        await page.goto(origin)
        await page.locator("#experiencia").waitFor({ state: "attached" })
        await settled()
        const samples = page.evaluate(async () => {
          const records = [],
            start = performance.now()
          while (performance.now() - start < 1400) {
            const scene = document.querySelector(".route-scene")
            if (scene)
              records.push({
                state: scene.dataset.pageState,
                opacity: Number(getComputedStyle(scene).opacity),
                inert: scene.inert,
                mains: document.querySelectorAll("main").length,
              })
            await new Promise(requestAnimationFrame)
          }
          return records
        })
        await navigate("Projetos", width)
        await page.locator("#corporativo-projects").waitFor()
        await settled()
        const frames = await samples
        check(
          `${width} ${reduced}: uma página por vez`,
          frames.every((f) => f.mains <= 1),
          frames,
        )
        if (!reduced) {
          check(
            `${width}: saída visível e inerte`,
            frames.some((f) => f.state === "exiting" && f.inert && f.opacity > 0 && f.opacity < 1),
            frames,
          )
          check(
            `${width}: entrada da próxima página`,
            frames.some((f) => f.state === "present" && f.opacity > 0 && f.opacity < 1),
            frames,
          )
        }
        check(
          `${width} ${reduced}: foco após transição`,
          await page.evaluate(() => document.activeElement?.id === "main-content"),
        )

        const button = page.locator(".archive-category-button").first()
        await button.hover()
        await page.mouse.down()
        await page.waitForTimeout(100)
        const pressed = await button.evaluate((e) => getComputedStyle(e).scale)
        await page.mouse.up()
        await page.waitForTimeout(200)
        const released = await button.evaluate((e) => getComputedStyle(e).scale)
        check(
          `${width} ${reduced}: pressão no controle`,
          reduced
            ? pressed === "none"
            : Number(pressed) < 0.99 && (released === "none" || Number(released) > 0.99),
          { pressed, released },
        )
        await page.locator(".archive-category-button").nth(1).focus()
        await page.locator(".archive-category-button").nth(1).press("Enter")
        await page.locator("#gerais-projects").waitFor()
        await page.waitForFunction(
          () => getComputedStyle(document.querySelector(".project-category-scene")).opacity === "1",
        )
        check(
          `${width} ${reduced}: categoria mantém foco`,
          await page
            .locator(".archive-category-button")
            .nth(1)
            .evaluate(
              (e) => document.activeElement === e && e.getAttribute("aria-pressed") === "true",
            ),
        )
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }))
        await navigate("Notas", width)
        await page.getByRole("heading", { name: "NOTAS", exact: true }).waitFor()
        await settled()
        check(
          `${width} ${reduced}: notas acessível após troca`,
          await page.evaluate(() => document.activeElement?.id === "main-content"),
        )
        await page.goBack()
        await page.locator("#gerais-projects").waitFor()
        await settled()
        check(
          `${width} ${reduced}: histórico preserva categoria`,
          page.url().includes("tipo=gerais"),
        )
      }

      await page.emulateMedia({ reducedMotion: "no-preference" })
      await page.goto(origin)
      await page.locator("#experiencia").waitFor({ state: "attached" })
      const jump = async (index) => {
        await page.locator("#experiencia").evaluate(
          (e, index) =>
            scrollTo({
              top:
                scrollY +
                e.getBoundingClientRect().top +
                ((e.offsetHeight - innerHeight) * index) / 4,
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
      await jump(1)
      await page.waitForTimeout(1100)
      for (const [index, direction] of [
        [3, 1],
        [1, -1],
      ]) {
        const samples = page.evaluate(async () => {
          const records = [],
            start = performance.now()
          while (performance.now() - start < 1100) {
            const article = document.querySelector("#experience-detail")
            if (article) {
              const heading = article.querySelector("h3"),
                copy = article.querySelector(".experience-detail-copy")
              const transform = getComputedStyle(article).transform
              records.push({
                number: article.querySelector("p").textContent.trim().slice(0, 2),
                x: transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41,
                heading: Number(getComputedStyle(heading).opacity),
                copy: Number(getComputedStyle(copy).opacity),
              })
            }
            await new Promise(requestAnimationFrame)
          }
          return records
        })
        await jump(index)
        const frames = (await samples).filter((f) => f.number === `0${index + 1}`)
        check(
          `${width}: direção ${direction} na experiência`,
          frames.some((f) => f.x * direction > 1),
          frames,
        )
        check(
          `${width}: título precede descrição ${direction}`,
          frames.some((f) => f.heading > f.copy + 0.1) && frames.at(-1).copy === 1,
          frames,
        )
      }

      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }))
      const target = page.locator("#stack .stack-stage-heading")
      await page.waitForFunction(
        () =>
          getComputedStyle(document.querySelector("#stack .stack-stage-heading")).opacity === "0",
      )
      for (let visit = 0; visit < 2; visit++) {
        const samples = target.evaluate(async (element) => {
          document.getElementById("stack").scrollIntoView({ behavior: "instant", block: "start" })
          const records = [],
            start = performance.now()
          while (performance.now() - start < 950) {
            records.push(Number(getComputedStyle(element).opacity))
            await new Promise(requestAnimationFrame)
          }
          return records
        })
        const frames = await samples
        check(
          `${width}: seção reapresenta entrada ${visit}`,
          frames.some((f) => f > 0 && f < 1) && frames.at(-1) === 1,
          frames,
        )
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }))
        await page.waitForFunction(
          () =>
            getComputedStyle(document.querySelector("#stack .stack-stage-heading")).opacity === "0",
        )
      }
    }
    return { passed: results.length, viewports: [390, 1440], motion: ["normal", "reduce"] }
  } finally {
    await page.mouse.up()
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await page.evaluate((value) => {
      if (value === null) localStorage.removeItem("pedroreoli-portfolio-language")
      else localStorage.setItem("pedroreoli-portfolio-language", value)
    }, savedLanguage)
  }
}
