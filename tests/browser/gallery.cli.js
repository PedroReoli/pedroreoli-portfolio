// Galeria modal local: nenhuma aba externa ou janela visível é aberta.
async function auditGallery(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const savedLanguage = await page.evaluate(() =>
    localStorage.getItem("pedroreoli-portfolio-language"),
  )
  const results = []
  const sizes = [
    [320, 480],
    [390, 844],
    [667, 375],
    [768, 1024],
    [1440, 900],
    [1920, 1080],
  ]
  const check = (name, valid, detail) => {
    if (!valid) throw new Error(`${name}: ${JSON.stringify(detail)}`)
    results.push(name)
  }
  try {
    await page.emulateMedia({ reducedMotion: "reduce" })
    for (const language of ["pt", "en"]) {
      await page.evaluate(
        (value) => localStorage.setItem("pedroreoli-portfolio-language", value),
        language,
      )
      await page.goto(origin + "/projetos?tipo=corporativo")
      await page.locator(".project-gallery-link").first().waitFor()
      for (const [width, height] of sizes) {
        await page.setViewportSize({ width, height })
        for (let index = 0; index < 4; index++) {
          const trigger = page.locator(".project-gallery-link").nth(index)
          await trigger.focus()
          const before = await page.evaluate(() => scrollY)
          const tabs = page.context().pages().length
          await trigger.press("Enter")
          const dialog = page.getByRole("dialog")
          await dialog.waitFor()
          await dialog.locator("img").evaluate((img) => img.decode())
          await page.waitForFunction(
            () =>
              document.querySelector(".project-viewer-image")?.getAttribute("aria-busy") ===
              "false",
          )
          const layout = await dialog.evaluate((element) => {
            const frame = element.getBoundingClientRect(),
              issues = []
            for (const e of element.querySelectorAll("h2,p,button,a,img")) {
              const r = e.getBoundingClientRect()
              if (
                r.left < frame.left - 1 ||
                r.right > frame.right + 1 ||
                r.top < frame.top - 1 ||
                r.bottom > frame.bottom + 1 ||
                e.scrollWidth > e.clientWidth + 1
              )
                issues.push(e.textContent || e.tagName)
            }
            return {
              issues,
              inViewport:
                frame.left >= 0 &&
                frame.top >= 0 &&
                frame.right <= innerWidth &&
                frame.bottom <= innerHeight,
              modal: element.matches(":modal"),
              focused: element.contains(document.activeElement),
              animation: getComputedStyle(element).animationName,
            }
          })
          check(
            `${language} ${width} imagem ${index + 1}: modal encaixado`,
            !layout.issues.length &&
              layout.inViewport &&
              layout.modal &&
              layout.focused &&
              layout.animation === "none",
            layout,
          )
          check(
            `${language} ${width} imagem ${index + 1}: original preservado sem nova aba`,
            page.context().pages().length === tabs &&
              (await dialog.locator("a").getAttribute("href")) ===
                (await trigger.getAttribute("href")),
          )
          await page.keyboard.press("Escape")
          await dialog.waitFor({ state: "detached" })
          check(
            `${language} ${width} imagem ${index + 1}: foco e posição restaurados`,
            await trigger.evaluate(
              (e, before) =>
                document.activeElement === e &&
                Math.abs(scrollY - before) <= 2 &&
                document.documentElement.style.overflow !== "hidden",
              before,
            ),
          )
        }
      }
      const trigger = page.locator(".project-gallery-link").first()
      await trigger.focus()
      await trigger.press("Enter")
      const dialog = page.getByRole("dialog")
      await page.keyboard.press("ArrowLeft")
      check(
        `${language}: anterior circula para última`,
        (await dialog.locator("a").getAttribute("href")) ===
          (await page.locator(".project-gallery-link").last().getAttribute("href")),
      )
      await page.keyboard.press("ArrowRight")
      await dialog
        .getByRole("button", { name: language === "pt" ? "Próxima imagem" : "Next image" })
        .click()
      check(
        `${language}: próxima por botão`,
        (await dialog.locator("a").getAttribute("href")) ===
          (await page.locator(".project-gallery-link").nth(1).getAttribute("href")),
      )
      for (let tab = 0; tab < 8; tab++) {
        await page.keyboard.press("Tab")
        check(
          `${language}: foco contido ${tab}`,
          // O dialog nativo permite acessar a barra do navegador. Nesse passo o
          // activeElement vira body; nenhum controle da página de fundo recebe foco.
          await dialog.evaluate(
            (e) => e.contains(document.activeElement) || document.activeElement === document.body,
          ),
        )
      }
      const scroll = await page.evaluate(() => scrollY)
      await dialog
        .getByRole("button", { name: language === "pt" ? "Fechar galeria" : "Close gallery" })
        .focus()
      check(
        `${language}: fundo inerte não recebe foco`,
        await dialog.evaluate((element) => {
          document.querySelector(".project-gallery-link").focus()
          return element.contains(document.activeElement)
        }),
      )
      await page.mouse.wheel(0, 600)
      await page.waitForTimeout(150)
      check(
        `${language}: fundo não rola`,
        await page.evaluate((before) => Math.abs(scrollY - before) <= 2, scroll),
      )
      await page.mouse.click(2, 2)
      await dialog.waitFor({ state: "detached" })
      check(
        `${language}: backdrop fecha e devolve foco`,
        await trigger.evaluate((e) => document.activeElement === e),
      )
    }
    // Falha real do arquivo ampliado, sem impedir fechar ou passar à próxima imagem.
    const firstSrc = await page.locator(".project-gallery-link").first().getAttribute("href")
    await page.route(
      origin + firstSrc,
      async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 800))
        await route.continue()
      },
      { times: 1 },
    )
    await page.locator(".project-gallery-link").first().click()
    await page.getByRole("dialog").getByText("Loading image", { exact: true }).waitFor()
    await page.keyboard.press("Escape")
    check("Carregamento identificado e cancelável", (await page.getByRole("dialog").count()) === 0)
    await page.waitForTimeout(900)
    await page.unroute(origin + firstSrc)
    await page.route(origin + firstSrc, (route) => route.abort("failed"))
    await page.locator(".project-gallery-link").first().click()
    await page
      .getByRole("dialog")
      .getByText("This image couldn't load. Try another image or open the original.")
      .waitFor()
    await page.getByRole("dialog").getByRole("button", { name: "Next image" }).click()
    await page
      .getByRole("dialog")
      .locator("img")
      .evaluate((img) => img.decode())
    await page.waitForFunction(
      () => document.querySelector(".project-viewer-image")?.getAttribute("aria-busy") === "false",
    )
    check(
      "Imagem indisponível não bloqueia a galeria",
      (await page.getByRole("dialog").getByRole("status").count()) === 0,
    )
    await page.unroute(origin + firstSrc)
    await page.keyboard.press("Escape")
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await page.locator(".project-gallery-link").first().click()
    const animation = await page.getByRole("dialog").evaluate(async (element) => {
      const samples = [],
        start = performance.now()
      while (performance.now() - start < 350) {
        samples.push(Number(getComputedStyle(element).opacity))
        await new Promise(requestAnimationFrame)
      }
      return samples
    })
    check(
      "Entrada curta e concluída",
      animation.some((value) => value > 0 && value < 1) && animation.at(-1) === 1,
      animation,
    )
    await page.getByRole("button", { name: "Close gallery" }).click()
    check("Botão fechar remove modal", (await page.getByRole("dialog").count()) === 0)
    return { passed: results.length, viewports: sizes.length, languages: ["pt", "en"] }
  } finally {
    await page.unrouteAll({ behavior: "ignoreErrors" })
    await page.keyboard.press("Escape")
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await page.evaluate((value) => {
      if (value === null) localStorage.removeItem("pedroreoli-portfolio-language")
      else localStorage.setItem("pedroreoli-portfolio-language", value)
    }, savedLanguage)
  }
}
