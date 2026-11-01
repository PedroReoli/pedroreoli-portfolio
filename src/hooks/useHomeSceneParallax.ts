import { useEffect, type RefObject } from "react"
import { useReducedMotion } from "./useReducedMotion"

interface SceneItem {
  id: string
  stage: HTMLElement
  top: number
  height: number
  pinned: boolean
}

/** Aplica micro-parallax de profundidade nas cenas estáticas sem interferir no sistema de transição. */
export function useHomeSceneParallax(root: RefObject<HTMLElement>) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const page = root.current
    if (!page) return
    let frame = 0
    let scenes: SceneItem[] = []

    const measure = () => {
      const position = scrollY
      scenes = [...page.querySelectorAll<HTMLElement>("[data-scroll-scene]")].flatMap((scene) => {
        const stage = scene.matches(".viewport-stage")
          ? scene
          : scene.querySelector<HTMLElement>(".selected-projects-stage,.viewport-stage")
        if (!stage) return []
        const id = scene.id || ""
        return [
          {
            id,
            stage,
            top: position + scene.getBoundingClientRect().top,
            height: scene.offsetHeight,
            pinned: Number(scene.dataset.scrollSteps) > 1,
          },
        ]
      })
      schedule()
    }

    const paint = () => {
      frame = 0
      const position = scrollY
      const viewport = innerHeight || 800

      // Apenas micro-profundidade quando não há movimento reduzido e a cena não está em transição exclusiva
      if (!reduced) {
        for (const { stage, top: sceneTop, height, pinned } of scenes) {
          const top = pinned
            ? Math.max(sceneTop - position, Math.min(0, sceneTop + height - viewport - position))
            : sceneTop - position

          const progress = Math.max(-1, Math.min(1, top / viewport))
          const offset = viewport * (progress > 0 ? 0.04 : 0.02) * progress
          stage.style.setProperty("--scene-parallax", `${offset.toFixed(2)}px`)
          stage.style.setProperty("--scene-scale", `${(1 - Math.abs(progress) * 0.015).toFixed(5)}`)
        }
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const observer = new MutationObserver(measure)
    const resizeObserver = new ResizeObserver(measure)
    observer.observe(page, { childList: true, subtree: true })
    resizeObserver.observe(page)
    measure()

    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", measure, { passive: true })

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", measure)
      for (const stage of page.querySelectorAll<HTMLElement>(
        ".viewport-stage,.selected-projects-stage",
      )) {
        stage.style.removeProperty("--scene-parallax")
        stage.style.removeProperty("--scene-scale")
      }
    }
  }, [root, reduced])
}
