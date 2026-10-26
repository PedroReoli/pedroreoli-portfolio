import { useEffect, type RefObject } from "react"
import { useReducedMotion } from "./useReducedMotion"

/** Move apenas a composição visual; as medidas de navegação continuam imóveis. */
export function useHomeSceneParallax(root: RefObject<HTMLElement>) {
  const reduced = useReducedMotion()
  useEffect(() => {
    const page = root.current
    if (!page || reduced) return
    let frame = 0
    let scenes: { stage: HTMLElement; top: number; height: number; pinned: boolean }[] = []
    const measure = () => {
      const position = scrollY
      // Cache de geometria: o scroll anima sem medir o layout a cada quadro.
      scenes = [...page.querySelectorAll<HTMLElement>("[data-scroll-scene]")].flatMap((scene) => {
        const stage = scene.matches(".viewport-stage") ? scene
          : scene.querySelector<HTMLElement>(".selected-projects-stage,.viewport-stage")
        if (!stage) return []
        return [{ stage, top: position + scene.getBoundingClientRect().top,
          height: scene.offsetHeight, pinned: Number(scene.dataset.scrollSteps) > 1 }]
      })
      schedule()
    }
    const paint = () => {
      frame = 0
      const position = scrollY
      const viewport = innerHeight
      for (const { stage, top: sceneTop, height, pinned } of scenes) {
        const top = pinned
          ? Math.max(sceneTop - position, Math.min(0, sceneTop + height - viewport - position))
          : sceneTop - position
        const progress = Math.max(-1, Math.min(1, top / viewport))
        const offset = viewport * (progress > 0 ? 0.1 : 0.04) * progress
        stage.style.setProperty("--scene-parallax", `${offset.toFixed(2)}px`)
        stage.style.setProperty("--scene-scale", `${(1 - Math.abs(progress) * 0.025).toFixed(5)}`)
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint) }
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
      for (const stage of page.querySelectorAll<HTMLElement>(".viewport-stage,.selected-projects-stage")) {
        stage.style.removeProperty("--scene-parallax")
        stage.style.removeProperty("--scene-scale")
      }
    }
  }, [root, reduced])
}
