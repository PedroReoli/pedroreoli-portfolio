import { useEffect, type RefObject } from "react"
import { useReducedMotion } from "./useReducedMotion"

/** Move apenas a composição visual; as medidas de navegação continuam imóveis. */
export function useHomeSceneParallax(root: RefObject<HTMLElement>) {
  const reduced = useReducedMotion()
  useEffect(() => {
    const page = root.current
    if (!page || reduced) return
    let frame = 0
    const paint = () => {
      frame = 0
      for (const scene of page.querySelectorAll<HTMLElement>("[data-scroll-scene]")) {
        const stage = scene.matches(".viewport-stage") ? scene
          : scene.querySelector<HTMLElement>(".selected-projects-stage,.viewport-stage")
        if (!stage) continue
        const { top } = stage.getBoundingClientRect()
        const offset = Math.max(-innerHeight * 0.08, Math.min(innerHeight * 0.16, top * 0.16))
        stage.style.setProperty("--scene-parallax", `${offset.toFixed(2)}px`)
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint) }
    const observer = new MutationObserver(schedule)
    observer.observe(page, { childList: true, subtree: true })
    paint()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule, { passive: true })
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      for (const stage of page.querySelectorAll<HTMLElement>(".viewport-stage,.selected-projects-stage"))
        stage.style.removeProperty("--scene-parallax")
    }
  }, [root, reduced])
}
