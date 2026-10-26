// Mede o movimento do encaixe, além de conferir somente a posição final.
async function auditSnapQuality(page) {
  const origin = new URL(page.url()).origin
  const results = []
  const reports = []
  const check = (name, valid, detail) => {
    if (!valid) throw new Error(`${name}: ${JSON.stringify(detail)}`)
    results.push(name)
  }
  try {
    await page.emulateMedia({ reducedMotion: "no-preference" })
    for (const [width, height] of [[390, 844], [1440, 900]]) {
      await page.setViewportSize({ width, height })
      await page.goto(origin)
      await page.locator("#experiencia").waitFor({ state: "attached" })
      await page.waitForTimeout(1400)
      await page.mouse.move(width / 2, height / 2)
      for (const direction of [1, -1]) {
        const sampling = page.evaluate(async () => {
          const frames = []
          let runningSeen = false
          const start = performance.now()
          while (performance.now() - start < 3500) {
            const running = Boolean(document.querySelector('[data-scene-transition="running"]'))
            runningSeen ||= running
            frames.push({ t: performance.now() - start, y: scrollY, running,
              opacity: Number(getComputedStyle(document.querySelector("#sobre .about-title").parentElement).opacity) })
            if (runningSeen && !running) break
            await new Promise(requestAnimationFrame)
          }
          return frames
        })
        await page.mouse.wheel(0, direction * 120)
        const frames = await sampling
        const active = frames.filter((frame) => frame.running)
        const final = frames.at(-1)
        const speeds = frames.slice(1).map((frame, index) => ({
          t: frame.t,
          speed: Math.abs(frame.y - frames[index].y) / Math.max(1, frame.t - frames[index].t),
          step: direction * (frame.y - frames[index].y),
        }))
        const peak = Math.max(...speeds.map((frame) => frame.speed))
        const tail = speeds.filter((frame) => frame.t > final.t * 0.8)
        const tailSpeed = tail.reduce((sum, frame) => sum + frame.speed, 0) / Math.max(1, tail.length)
        const name = `${width}/${direction}`
        check(`${name}: quadros reais durante o movimento`, active.length > 12, active.length)
        check(`${name}: encaixe no destino`, Math.abs(final.y - (direction > 0 ? height : 0)) < 1, final)
        check(`${name}: sem rebote ou reversão`, speeds.every((frame) => frame.step >= -1), speeds)
        check(`${name}: desaceleração no encaixe`, tailSpeed < peak * 0.25, { peak, tailSpeed })
        check(`${name}: sem salto no último quadro`, Math.abs(final.y - frames.at(-2).y) <= 2, frames.slice(-2))
        if (direction > 0)
          check(`${name}: conteúdo entra antes de terminar o encaixe`,
            active.some((frame) => frame.y < height * 0.95 && frame.opacity > 0 && frame.opacity < 1), active)
        reports.push({ viewport: `${width}x${height}`, direction, samples: frames.length,
          durationMs: Math.round(final.t), peakPxPerMs: Number(peak.toFixed(2)),
          finalSpeedPxPerMs: Number(tailSpeed.toFixed(2)) })
        await page.waitForTimeout(450)
      }
    }
    return { passed: results.length, reports }
  } finally {
    await page.emulateMedia({ reducedMotion: "no-preference" })
  }
}
