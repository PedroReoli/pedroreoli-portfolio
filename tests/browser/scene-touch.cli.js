// Emulação Chromium com toque real via CDP, sem abrir janela.
async function auditSceneTouch(page) {
  const origin = new URL(page.url()).origin
  const context = await page.context().browser().newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "no-preference",
  })
  let passed = 0
  try {
    const mobile = await context.newPage()
    const client = await context.newCDPSession(mobile)
    await mobile.goto(origin)
    await mobile.locator("#experiencia").waitFor({ state: "attached" })
    const swipe = async (from, to) => {
      await client.send("Input.dispatchTouchEvent", {
        type: "touchStart", touchPoints: [{ x: 180, y: from }],
      })
      for (let step = 1; step <= 8; step++) {
        await client.send("Input.dispatchTouchEvent", {
          type: "touchMove", touchPoints: [{ x: 180, y: from + (to - from) * step / 8 }],
        })
        await mobile.waitForTimeout(20)
      }
      await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] })
    }
    await mobile.waitForTimeout(1400)
    await swipe(650, 250)
    await mobile.waitForFunction(() => Math.abs(scrollY - innerHeight) < 2 &&
      !document.querySelector('[data-scene-transition="running"]'))
    passed++
    await mobile.waitForFunction(() =>
      getComputedStyle(document.querySelector("#sobre .about-title").parentElement).opacity === "1")
    passed++
    await mobile.screenshot({ path: "output/playwright/scene-touch-about.png" })
    await swipe(650, 250)
    await mobile.waitForFunction(() => Math.abs(scrollY - innerHeight * 2) < 2 &&
      !document.querySelector('[data-scene-transition="running"]'))
    passed++
    await swipe(250, 650)
    await mobile.waitForFunction(() => Math.abs(scrollY - innerHeight) < 2 &&
      !document.querySelector('[data-scene-transition="running"]'))
    passed++
    return { passed, device: "Chromium mobile 390x844 com toque via CDP" }
  } finally {
    await context.close()
  }
}
