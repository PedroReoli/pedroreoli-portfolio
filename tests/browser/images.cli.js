// Rede alterada somente na sessão headless. O servidor e os assets não são modificados.
async function auditImageRecovery(page) {
  const origin = new URL(page.url()).origin
  if (origin === "null") throw new Error("Abra o servidor local antes da auditoria")
  const webp = /\/media\/.*\.webp(?:\?|$)/
  const storyOriginal = /\/TCC-img2\.png(?:\?|$)/
  const results = []
  const check = (label, condition) => {
    if (!condition) throw new Error(label)
    results.push(label)
  }
  const verifyImages = async (selector, original, count, label) => {
    const images = page.locator(selector)
    if ((await images.count()) !== count)
      throw new Error(`${label}: quantidade inesperada de imagens`)
    for (let index = 0; index < count; index++) {
      await images.nth(index).scrollIntoViewIfNeeded()
      await page.waitForFunction(
        ({ selector, index, original }) => {
          const image = document.querySelectorAll(selector)[index]
          return (
            image?.complete &&
            image.naturalWidth > 0 &&
            (original ? image.currentSrc === image.src : image.currentSrc.includes(".webp"))
          )
        },
        { selector, index, original },
      )
      const readable = await images.nth(index).evaluate((image) => {
        const box = image.getBoundingClientRect()
        return Boolean(image.alt && box.width > 0 && box.height > 0 && image.width && image.height)
      })
      check(`${label} / imagem ${index + 1}`, readable)
    }
  }

  const verifyHome = async (original, label) => {
    await page.locator("#projetos-selecionados").evaluate((section) => {
      scrollTo({ top: scrollY + section.getBoundingClientRect().top, behavior: "instant" })
    })
    await page.locator("#projetos-selecionados .project-feature-image").waitFor()
    await verifyImages("#projetos-selecionados picture img", original, 1, `${label} / projeto`)
    // Ao sair do capítulo, a imagem do projeto é desmontada. Não usar índices globais.
    await verifyImages("#proposito picture img", original, 1, `${label} / propósito`)
  }

  try {
    await page.emulateMedia({ reducedMotion: "reduce" })
    for (const [width, height] of [
      [320, 480],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height })
      await page.goto(`${origin}/`)
      await page.locator("#experiencia").waitFor()
      await verifyHome(false, `WebP normal ${width}`)
    }

    await page.route(webp, (route) => route.abort("failed"))
    await page.setViewportSize({ width: 390, height: 844 })
    for (const [path, count] of [
      ["/", 2],
      ["/projetos?tipo=corporativo", 4],
      ["/midia-blog", 1],
    ]) {
      await page.goto(`${origin}${path}`)
      await page
        .locator(path === "/" ? "#experiencia" : "main picture")
        .first()
        .waitFor()
      if (path === "/") await verifyHome(true, "Original recuperado home")
      else await verifyImages("main picture img", true, count, `Original recuperado ${path}`)
    }

    const failedRequests = []
    const trackRequest = (request) => {
      if (storyOriginal.test(request.url())) failedRequests.push(request.url())
    }
    page.on("request", trackRequest)
    try {
      await page.route(storyOriginal, (route) => route.abort("failed"))
      await page.goto(`${origin}/`)
      const image = page.locator("#proposito img")
      await image.scrollIntoViewIfNeeded()
      await page.waitForFunction(() => {
        const image = document.querySelector("#proposito img")
        return image?.complete && image.naturalWidth === 0 && image.currentSrc === image.src
      })
      check(
        "Falha total preserva descrição e dimensões",
        await image.evaluate((element) =>
          Boolean(element.alt && element.getBoundingClientRect().height > 0),
        ),
      )
      await page.waitForTimeout(300)
      if (failedRequests.length !== 1)
        throw new Error(`Original solicitado ${failedRequests.length} vezes; esperado 1`)
      results.push("Original tentado uma única vez")
    } finally {
      page.off("request", trackRequest)
      await page.unroute(storyOriginal)
    }
    await page.unroute(webp)
    await page.reload()
    await page.locator("#experiencia").waitFor()
    await verifyHome(false, "Nova visita retoma WebP")
    return {
      passed: results.length,
      results,
      note: "Falhas de rede intencionais geram mensagens no console.",
    }
  } finally {
    await page.unroute(webp)
    await page.unroute(storyOriginal)
  }
}
