import { useEffect, type RefObject } from "react"
import { useReducedMotion } from "./useReducedMotion"

type RGB = [number, number, number]

const SCENE_THEME_COLORS: Record<string, RGB> = {
  hero: [17, 16, 16],
  sobre: [237, 234, 228],
  "projetos-selecionados": [17, 16, 16],
  stack: [237, 234, 228],
  proposito: [17, 16, 16],
  experiencia: [17, 16, 16],
  contato: [17, 16, 16],
}

interface SceneItem {
  id: string
  stage: HTMLElement
  top: number
  height: number
  pinned: boolean
  color: RGB
}

/** Move a composição visual, faz a transição contínua da cor de fundo e o fade-out de saída. */
export function useHomeSceneParallax(root: RefObject<HTMLElement>) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const page = root.current
    if (!page) return
    let frame = 0
    let scenes: SceneItem[] = []

    const measure = () => {
      const position = scrollY
      // Cache de geometria: o scroll anima sem medir o layout a cada quadro.
      scenes = [...page.querySelectorAll<HTMLElement>("[data-scroll-scene]")].flatMap((scene) => {
        const stage = scene.matches(".viewport-stage")
          ? scene
          : scene.querySelector<HTMLElement>(".selected-projects-stage,.viewport-stage")
        if (!stage) return []
        const id = scene.id || ""
        const color = SCENE_THEME_COLORS[id] || [17, 16, 16]
        return [
          {
            id,
            stage,
            top: position + scene.getBoundingClientRect().top,
            height: scene.offsetHeight,
            pinned: Number(scene.dataset.scrollSteps) > 1,
            color,
          },
        ]
      })
      schedule()
    }

    const paint = () => {
      frame = 0
      const position = scrollY
      const viewport = innerHeight || 800

      // 1. Atualização de cor de fundo contínua e suave
      if (scenes.length > 0) {
        let activeR = scenes[0].color[0]
        let activeG = scenes[0].color[1]
        let activeB = scenes[0].color[2]

        for (let i = 0; i < scenes.length - 1; i++) {
          const nextScene = scenes[i + 1]
          const transStart = nextScene.top - viewport
          const transEnd = nextScene.top

          if (position >= transStart && position <= transEnd) {
            const rawProgress = Math.max(0, Math.min(1, (position - transStart) / viewport))
            const s = Math.max(0, Math.min(1, (rawProgress - 0.15) / 0.65))
            const eased = s * s * (3 - 2 * s) // Hermite smoothstep
            const cCurr = scenes[i].color
            const cNext = nextScene.color

            activeR = Math.round(cCurr[0] + (cNext[0] - cCurr[0]) * eased)
            activeG = Math.round(cCurr[1] + (cNext[1] - cCurr[1]) * eased)
            activeB = Math.round(cCurr[2] + (cNext[2] - cCurr[2]) * eased)
            break
          } else if (position > transEnd) {
            activeR = nextScene.color[0]
            activeG = nextScene.color[1]
            activeB = nextScene.color[2]
          }
        }

        const bg = `rgb(${activeR}, ${activeG}, ${activeB})`
        page.style.setProperty("--page-bg", bg)
      }

      // 2. Parallax e Exit Animations
      if (!reduced) {
        for (const { stage, top: sceneTop, height, pinned } of scenes) {
          const top = pinned
            ? Math.max(sceneTop - position, Math.min(0, sceneTop + height - viewport - position))
            : sceneTop - position

          const progress = Math.max(-1, Math.min(1, top / viewport))
          const offset = viewport * (progress > 0 ? 0.08 : 0.03) * progress
          stage.style.setProperty("--scene-parallax", `${offset.toFixed(2)}px`)
          stage.style.setProperty("--scene-scale", `${(1 - Math.abs(progress) * 0.02).toFixed(5)}`)

          // Fade out e recuo ágil de saída quando a cena rola para fora pelo topo
          if (top < 0) {
            const exitRatio = Math.max(0, Math.min(1, -top / (viewport * 0.38)))
            const exitOpacity = (1 - exitRatio).toFixed(3)
            const exitY = (-exitRatio * 24).toFixed(1)
            stage.style.setProperty("--scene-exit-opacity", exitOpacity)
            stage.style.setProperty("--scene-exit-y", `${exitY}px`)
          } else {
            stage.style.setProperty("--scene-exit-opacity", "1")
            stage.style.setProperty("--scene-exit-y", "0px")
          }
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
        stage.style.removeProperty("--scene-exit-opacity")
        stage.style.removeProperty("--scene-exit-y")
      }
      page.style.removeProperty("--page-bg")
    }
  }, [root, reduced])
}
