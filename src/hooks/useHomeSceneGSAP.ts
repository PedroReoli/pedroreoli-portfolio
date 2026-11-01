import { useEffect, type RefObject } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"
import { useReducedMotion } from "./useReducedMotion"

gsap.registerPlugin(Observer)

interface SceneThemeConfig {
  color: string
  steps: number
}

const SCENE_THEMES: Record<string, SceneThemeConfig> = {
  hero: { color: "#111010", steps: 1 },
  sobre: { color: "#edeae4", steps: 1 },
  "projetos-selecionados": { color: "#111010", steps: 3 },
  stack: { color: "#edeae4", steps: 1 },
  proposito: { color: "#111010", steps: 1 },
  experiencia: { color: "#111010", steps: 5 },
  contato: { color: "#111010", steps: 1 },
}

const SCENE_ORDER = [
  "hero",
  "sobre",
  "projetos-selecionados",
  "stack",
  "proposito",
  "experiencia",
  "contato",
]

interface NavigationStop {
  sceneId: string
  stepIndex: number
  totalSteps: number
  color: string
  sceneElement: HTMLElement
}

export function getSceneElements(sceneEl: HTMLElement): Element[] {
  const id = sceneEl.id
  let items: NodeListOf<Element> | Element[] | undefined

  if (id === "hero") {
    items = sceneEl.querySelectorAll(
      ".hero-frame > *, .hero-mega-text, .hero-role, a[href*='projetos']"
    )
  } else if (id === "sobre") {
    items = sceneEl.querySelectorAll(
      ".about-stage-heading, .about-portrait-shell, .about-copy > *, .about-stats"
    )
  } else if (id === "projetos-selecionados") {
    items = sceneEl.querySelectorAll(
      ".selected-projects-heading, .selected-project-slide, nav[aria-label*='projetos']"
    )
  } else if (id === "stack") {
    items = sceneEl.querySelectorAll(
      ".stack-stage-heading, .stack-lanes > *, .stack-lane"
    )
  } else if (id === "proposito") {
    items = sceneEl.querySelectorAll(
      ".purpose-stage-heading, .purpose-media-shell, .purpose-title, .purpose-summary, .purpose-link"
    )
  } else if (id === "experiencia") {
    items = sceneEl.querySelectorAll(
      ".experience-stage-heading, .experience-index, .experience-detail-shell"
    )
  } else if (id === "contato") {
    items = sceneEl.querySelectorAll(
      ".editorial-container > :nth-child(1), .footer-cta-stage, .footer-links > *, .footer-bottom"
    )
  }

  if (items && items.length > 0) {
    return Array.from(items)
  }
  const stage = sceneEl.querySelector(".viewport-stage, .selected-projects-stage, .hero-shell") || sceneEl
  return Array.from(stage.children)
}

/**
 * Orquestrador definitivo de transições de cenas via GSAP & Framer Motion:
 * - Trava a rolagem nativa para palco único de alta fidelidade
 * - Fase 1: Itens da primeira seção somem com stagger out, blur e elevação (220ms)
 * - Fase 2: Fundo morphs via GSAP tween para a cor da nova cena (380ms)
 * - Fase 3: Itens da segunda seção vêm um por um, tudo bem rápido (cascata rápida 380ms, stagger 45ms)
 */
export function useHomeSceneGSAP(root: RefObject<HTMLElement>) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const page = root.current
    if (!page) return

    let stops: NavigationStop[] = []
    let currentStopIndex = 0
    let isTransitioning = false
    let disposed = false
    let touchStartY = 0
    let lastWheelTime = 0

    const backdrop = page.querySelector<HTMLElement>(".home-backdrop")

    page.classList.add("gsap-active")

    const buildStops = () => {
      const nextStops: NavigationStop[] = []

      for (const id of SCENE_ORDER) {
        const sceneEl = page.querySelector<HTMLElement>(`#${id}`)
        if (!sceneEl) continue
        const config = SCENE_THEMES[id] || { color: "#111010", steps: 1 }
        const stepsCount = Number(sceneEl.dataset.scrollSteps) || config.steps || 1

        for (let step = 0; step < stepsCount; step++) {
          nextStops.push({
            sceneId: id,
            stepIndex: step,
            totalSteps: stepsCount,
            color: config.color,
            sceneElement: sceneEl,
          })
        }
      }

      stops = nextStops
    }

    buildStops()

    if (stops.length === 0) return

    // Determinar cena inicial pelo hash da URL ou padrão 0
    let initialIdx = 0
    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "")
      const found = stops.findIndex((s) => s.sceneId === hashId)
      if (found !== -1) initialIdx = found
    }

    currentStopIndex = initialIdx
    const initialStop = stops[initialIdx]

    // Inicializa visibilidade de todas as 7 cenas
    stops.forEach((stop, idx) => {
      if (idx === initialIdx) {
        stop.sceneElement.classList.add("scene-active")
        stop.sceneElement.style.display = "block"
        stop.sceneElement.style.visibility = "visible"
      } else if (stop.sceneElement !== initialStop.sceneElement) {
        stop.sceneElement.classList.remove("scene-active")
        stop.sceneElement.style.display = "none"
        stop.sceneElement.style.visibility = "hidden"
      }
    })

    // Cor inicial do fundo
    gsap.set([page, backdrop].filter(Boolean), {
      backgroundColor: initialStop.color,
    })
    page.style.setProperty("--page-bg", initialStop.color)
    document.documentElement.style.setProperty("--page-bg", initialStop.color)
    document.documentElement.dataset.activeScene = initialStop.sceneId

    // Dispara animação de entrada da primeira cena no carregamento inicial
    if (!reduced) {
      const firstItems = getSceneElements(initialStop.sceneElement)
      gsap.fromTo(
        firstItems,
        { opacity: 0, y: 28, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.04,
          duration: 0.45,
          ease: "power3.out",
          clearProps: "transform,filter",
        }
      )
    }

    const unavailable = (target: EventTarget | null) => {
      if (disposed || !page.isConnected || document.querySelector("dialog[open]")) {
        return true
      }
      if (!(target instanceof Element)) return false
      if (target.closest('input,textarea,select,[contenteditable="true"],[role="dialog"]')) return true
      return false
    }

    const goToStop = (targetIndex: number) => {
      if (isTransitioning || stops.length === 0) return
      if (targetIndex < 0 || targetIndex >= stops.length) return
      if (targetIndex === currentStopIndex) return

      const currentStop = stops[currentStopIndex]
      const targetStop = stops[targetIndex]
      if (!currentStop || !targetStop) return

      const currentSceneEl = currentStop.sceneElement
      const targetSceneEl = targetStop.sceneElement
      const isInterScene = currentStop.sceneId !== targetStop.sceneId
      const direction = targetIndex > currentStopIndex ? 1 : -1

      if (reduced) {
        currentSceneEl.classList.remove("scene-active")
        currentSceneEl.style.display = "none"
        currentSceneEl.style.visibility = "hidden"

        targetSceneEl.classList.add("scene-active")
        targetSceneEl.style.display = "block"
        targetSceneEl.style.visibility = "visible"

        gsap.set([page, backdrop].filter(Boolean), { backgroundColor: targetStop.color })
        page.style.setProperty("--page-bg", targetStop.color)
        document.documentElement.style.setProperty("--page-bg", targetStop.color)
        document.documentElement.dataset.activeScene = targetStop.sceneId

        window.dispatchEvent(
          new CustomEvent("scene-change", {
            detail: { sceneId: targetStop.sceneId, color: targetStop.color },
          })
        )

        if (targetStop.sceneId === "projetos-selecionados") {
          window.dispatchEvent(
            new CustomEvent("set-project-step", { detail: { index: targetStop.stepIndex } })
          )
        }
        if (targetStop.sceneId === "experiencia") {
          window.dispatchEvent(
            new CustomEvent("set-experience-chapter", { detail: { index: targetStop.stepIndex } })
          )
        }

        currentStopIndex = targetIndex
        return
      }

      isTransitioning = true

      // Transição interna dentro da mesma seção (projetos ou capítulos de experiência)
      if (!isInterScene) {
        if (targetStop.sceneId === "projetos-selecionados") {
          window.dispatchEvent(
            new CustomEvent("set-project-step", { detail: { index: targetStop.stepIndex } })
          )
        } else if (targetStop.sceneId === "experiencia") {
          window.dispatchEvent(
            new CustomEvent("set-experience-chapter", { detail: { index: targetStop.stepIndex } })
          )
        }

        currentStopIndex = targetIndex
        window.setTimeout(() => {
          isTransitioning = false
        }, 360)
        return
      }

      // =========================================================================
      // TIMELINE DE TRANSIÇÃO GSAP (3 FASES COREOGRAFADAS)
      // =========================================================================
      const tl = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          currentSceneEl.classList.remove("scene-active")
          currentSceneEl.style.display = "none"
          currentSceneEl.style.visibility = "hidden"

          targetSceneEl.classList.add("scene-active")
          targetSceneEl.style.display = "block"
          targetSceneEl.style.visibility = "visible"

          currentStopIndex = targetIndex
          isTransitioning = false
        },
      })

      // FASE 1: ITENS DA SEÇÃO ATUAL SUMINDO COM BLUR, SCALE E ELEVAÇÃO
      const currentItems = getSceneElements(currentSceneEl)
      tl.to(currentItems, {
        opacity: 0,
        y: direction > 0 ? -32 : 32,
        scale: 0.94,
        filter: "blur(8px)",
        stagger: 0.025,
        duration: 0.22,
        ease: "power2.in",
      })

      // FASE 2: MORPH DA COR DO FUNDO
      tl.to(
        [page, backdrop].filter(Boolean),
        {
          backgroundColor: targetStop.color,
          duration: 0.38,
          ease: "power2.inOut",
          onUpdate: () => {
            page.style.setProperty("--page-bg", targetStop.color)
            document.documentElement.style.setProperty("--page-bg", targetStop.color)
          },
        },
        "-=0.08"
      )

      // TROCA SILENCIOSA DE CENA NO PALCO E PREPARAÇÃO DOS ELEMENTOS DA NOVA SEÇÃO
      tl.add(() => {
        currentSceneEl.classList.remove("scene-active")
        currentSceneEl.style.display = "none"
        currentSceneEl.style.visibility = "hidden"

        targetSceneEl.classList.add("scene-active")
        targetSceneEl.style.display = "block"
        targetSceneEl.style.visibility = "visible"

        document.documentElement.dataset.activeScene = targetStop.sceneId
        window.dispatchEvent(
          new CustomEvent("scene-change", {
            detail: { sceneId: targetStop.sceneId, color: targetStop.color },
          })
        )

        if (targetStop.sceneId === "projetos-selecionados") {
          window.dispatchEvent(
            new CustomEvent("set-project-step", { detail: { index: targetStop.stepIndex } })
          )
        }
        if (targetStop.sceneId === "experiencia") {
          window.dispatchEvent(
            new CustomEvent("set-experience-chapter", { detail: { index: targetStop.stepIndex } })
          )
        }

        const nextItems = getSceneElements(targetSceneEl)
        gsap.set(nextItems, {
          opacity: 0,
          y: direction > 0 ? 36 : -36,
          scale: 0.94,
          filter: "blur(8px)",
        })
      })

      // FASE 3: ENTRADA EM CASCATA ÁGIL ("um por um, tudo bem rápido")
      tl.add(() => {
        const nextItems = getSceneElements(targetSceneEl)
        gsap.to(nextItems, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.04,
          duration: 0.38,
          ease: "power3.out",
          clearProps: "transform,filter,scale",
        })
      })
    }

    // Handler universal de Wheel determinístico
    const onWheel = (e: WheelEvent) => {
      if (unavailable(e.target)) return
      e.preventDefault()

      const now = performance.now()
      if (now - lastWheelTime < 380 || isTransitioning) return

      if (Math.abs(e.deltaY) > 18) {
        lastWheelTime = now
        const dir = e.deltaY > 0 ? 1 : -1
        goToStop(currentStopIndex + dir)
      }
    }

    // Handlers de Touch para dispositivos móveis
    const onTouchStart = (e: TouchEvent) => {
      if (unavailable(e.target)) return
      touchStartY = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (unavailable(e.target) || isTransitioning) return
      const touchEndY = e.changedTouches[0].clientY
      const diffY = touchEndY - touchStartY

      if (Math.abs(diffY) > 40) {
        // Arrastar para cima (diffY < 0) avança para a próxima seção
        const dir = diffY < 0 ? 1 : -1
        goToStop(currentStopIndex + dir)
      }
    }

    // Observer complementar
    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      tolerance: 20,
      preventDefault: true,
      onDown: (self) => {
        if (unavailable(self.event.target)) return
        goToStop(currentStopIndex - 1)
      },
      onUp: (self) => {
        if (unavailable(self.event.target)) return
        goToStop(currentStopIndex + 1)
      },
    })

    const onKey = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        unavailable(event.target)
      ) {
        return
      }
      if (event.target instanceof Element && event.target.closest("input,textarea,select")) return

      const dir = ["ArrowDown", "PageDown", " "].includes(event.key)
        ? 1
        : ["ArrowUp", "PageUp"].includes(event.key)
        ? -1
        : 0

      if (!dir && event.key !== "Home" && event.key !== "End") return
      event.preventDefault()

      if (event.repeat || isTransitioning) return

      if (event.key === "Home") goToStop(0)
      else if (event.key === "End") goToStop(stops.length - 1)
      else goToStop(currentStopIndex + dir)
    }

    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a")
      if (!link) return
      const href = link.getAttribute("href") || ""

      if (href === "/" && window.location.pathname === "/") {
        event.preventDefault()
        goToStop(0)
        return
      }

      if (href.includes("#")) {
        const hash = href.startsWith("#") ? href : href.slice(href.indexOf("#"))
        const sceneId = hash.replace("#", "")
        const foundIdx = stops.findIndex((s) => s.sceneId === sceneId)
        if (foundIdx !== -1) {
          event.preventDefault()
          goToStop(foundIdx)
        }
      }
    }

    const onButtonClick = (event: MouseEvent) => {
      const btn = (event.target as Element | null)?.closest<HTMLButtonElement>("button")
      if (!btn) return
      const label = (btn.textContent || btn.getAttribute("aria-label") || "").toLowerCase()
      if (label.includes("voltar ao topo")) {
        event.preventDefault()
        goToStop(0)
      }
    }

    const onProjectSynced = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>
      const idx = customEvent.detail?.index
      if (typeof idx === "number") {
        const match = stops.findIndex(
          (s) => s.sceneId === "projetos-selecionados" && s.stepIndex === idx
        )
        if (match !== -1) currentStopIndex = match
      }
    }

    const onExperienceSynced = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>
      const idx = customEvent.detail?.index
      if (typeof idx === "number") {
        const match = stops.findIndex(
          (s) => s.sceneId === "experiencia" && s.stepIndex === idx
        )
        if (match !== -1) currentStopIndex = match
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("keydown", onKey)
    document.addEventListener("click", onAnchorClick, { capture: true })
    document.addEventListener("click", onButtonClick, { capture: true })
    window.addEventListener("project-step-synced", onProjectSynced)
    window.addEventListener("experience-chapter-synced", onExperienceSynced)

    return () => {
      disposed = true
      observer.kill()
      page.classList.remove("gsap-active")
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("click", onAnchorClick, { capture: true })
      document.removeEventListener("click", onButtonClick, { capture: true })
      window.removeEventListener("project-step-synced", onProjectSynced)
      window.removeEventListener("experience-chapter-synced", onExperienceSynced)
    }
  }, [root, reduced])
}
