import { useEffect, type RefObject } from "react"
import { useReducedMotion } from "./useReducedMotion"

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

interface NavigationStop {
  sceneId: string
  stepIndex: number
  totalSteps: number
  color: string
  sceneElement: HTMLElement
  top: number
}

/**
 * Orquestrador central de navegação por cenas cinematográficas:
 * 1. Itens da cena atual somem em palco fixo (fade-out + elevação + blur)
 * 2. Cor de fundo muda com morph suave e alinhamento silencioso da viewport
 * 3. Itens da nova cena surgem um por um em cascata ágil ("tudo bem rápido")
 */
export function useHomeSceneNavigation(root: RefObject<HTMLElement>) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const page = root.current
    if (!page) return

    let stops: NavigationStop[] = []
    let currentStopIndex = 0
    let animating = false
    let lastWheel = 0
    let wheelDistance = 0
    let touch: { x: number; y: number; handled: boolean } | null = null
    let disposed = false
    let scrollTimeout = 0

    const buildStops = () => {
      const sceneElements = [...page.querySelectorAll<HTMLElement>("[data-scroll-scene]")]
      const nextStops: NavigationStop[] = []
      const currentScrollY = window.scrollY

      for (const sceneEl of sceneElements) {
        const id = sceneEl.id || ""
        const config = SCENE_THEMES[id] || { color: "#111010", steps: 1 }
        const stepsCount = Number(sceneEl.dataset.scrollSteps) || config.steps || 1
        const start = Math.round(currentScrollY + sceneEl.getBoundingClientRect().top)
        const scrollable = Math.max(0, sceneEl.offsetHeight - window.innerHeight)

        for (let step = 0; step < stepsCount; step++) {
          const stopTop =
            stepsCount <= 1 ? start : Math.round(start + (step / (stepsCount - 1)) * scrollable)

          nextStops.push({
            sceneId: id,
            stepIndex: step,
            totalSteps: stepsCount,
            color: config.color,
            sceneElement: sceneEl,
            top: stopTop,
          })
        }
      }

      stops = nextStops
    }

    const unavailable = (target: EventTarget | null) => {
      if (
        disposed ||
        !page.isConnected ||
        page.closest("[inert]") ||
        document.querySelector("dialog[open]")
      ) {
        return true
      }
      if (!(target instanceof Element)) return false
      if (target.closest('input,textarea,select,[contenteditable="true"],[role="dialog"]')) return true
      for (let node: Element | null = target; node && node !== page; node = node.parentElement) {
        if (
          node instanceof HTMLElement &&
          node.scrollHeight > node.clientHeight + 2 &&
          /auto|scroll/.test(getComputedStyle(node).overflowY)
        ) {
          return true
        }
      }
      return false
    }

    const navigateToStop = (targetIndex: number) => {
      if (animating || stops.length === 0) return
      if (targetIndex < 0 || targetIndex >= stops.length) return
      if (targetIndex === currentStopIndex) return

      const currentStop = stops[currentStopIndex]
      const targetStop = stops[targetIndex]
      if (!currentStop || !targetStop) return

      const currentSceneEl = currentStop.sceneElement
      const targetSceneEl = targetStop.sceneElement
      const isInterScene = currentStop.sceneId !== targetStop.sceneId

      if (reduced) {
        window.scrollTo({ top: targetStop.top, behavior: "instant" })
        page.style.setProperty("--page-bg", targetStop.color)
        currentSceneEl.dataset.sceneState = "idle"
        targetSceneEl.dataset.sceneState = "active"
        currentStopIndex = targetIndex
        return
      }

      animating = true
      page.dataset.sceneTransition = "running"

      if (!isInterScene) {
        // Transição intra-seção (troca entre slides de projetos ou capítulos de trajetória)
        window.scrollTo({ top: targetStop.top, behavior: "smooth" })
        currentStopIndex = targetIndex
        window.setTimeout(() => {
          animating = false
          delete page.dataset.sceneTransition
        }, 360)
        return
      }

      // =========================================================================
      // FASE 1: ITENS DA PRIMEIRA SUMINDO (190ms)
      // O usuário vê os elementos da cena atual desaparecerem em palco fixo.
      // =========================================================================
      currentSceneEl.dataset.sceneState = "exiting"

      window.setTimeout(() => {
        // =======================================================================
        // FASE 2: COR DO FUNDO MUDANDO E ALINHAMENTO DA SEGUNDA (260ms)
        // O fundo morphs suavemente via CSS transition de 320ms enquanto a posição
        // do scroll se alinha instantaneamente (invisível porque ambas estão opacas/0).
        // =======================================================================
        page.style.setProperty("--page-bg", targetStop.color)
        currentSceneEl.dataset.sceneState = "hidden"

        window.scrollTo({ top: targetStop.top, behavior: "instant" })

        // =======================================================================
        // FASE 3: ITENS DA SEGUNDA VÊM UM POR UM, TUDO BEM RÁPIDO (CASCATA)
        // O CSS engatilha sceneCascadeItemEnter em cada elemento filho com stagger.
        // =======================================================================
        targetSceneEl.dataset.sceneState = "entering"

        window.setTimeout(() => {
          // FASE 4: FIXAÇÃO NO ESTADO ATIVO
          targetSceneEl.dataset.sceneState = "active"
          currentStopIndex = targetIndex
          animating = false
          delete page.dataset.sceneTransition
        }, 440)
      }, 190)
    }

    const onWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        unavailable(event.target)
      ) {
        return
      }
      if (event.cancelable) event.preventDefault()

      const now = performance.now()
      if (now - lastWheel > 180) {
        wheelDistance = 0
      }
      lastWheel = now

      if (animating) return

      wheelDistance +=
        event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1)

      if (Math.abs(wheelDistance) < 22) return

      const direction = Math.sign(wheelDistance)
      wheelDistance = 0
      navigateToStop(currentStopIndex + direction)
    }

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

      const direction = ["ArrowDown", "PageDown", " "].includes(event.key)
        ? 1
        : ["ArrowUp", "PageUp"].includes(event.key)
        ? -1
        : 0

      if (!direction && event.key !== "Home" && event.key !== "End") return
      event.preventDefault()

      if (event.repeat || animating) return

      if (event.key === "Home") navigateToStop(0)
      else if (event.key === "End") navigateToStop(stops.length - 1)
      else navigateToStop(currentStopIndex + direction)
    }

    const onTouchStart = (event: TouchEvent) => {
      touch =
        event.touches.length === 1 && !unavailable(event.target)
          ? { x: event.touches[0].clientX, y: event.touches[0].clientY, handled: false }
          : null
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!touch || event.touches.length !== 1 || animating) return
      const dx = touch.x - event.touches[0].clientX
      const dy = touch.y - event.touches[0].clientY

      if (Math.abs(dy) < 14 || Math.abs(dx) > Math.abs(dy)) return
      if (event.cancelable) event.preventDefault()

      if (touch.handled || Math.abs(dy) < 32) return
      touch.handled = true
      navigateToStop(currentStopIndex + Math.sign(dy))
    }

    const onTouchEnd = () => {
      touch = null
    }

    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a")
      if (!link) return
      const href = link.getAttribute("href") || ""

      if (href === "/" && window.location.pathname === "/") {
        event.preventDefault()
        navigateToStop(0)
        return
      }

      if (href.includes("#")) {
        const hash = href.startsWith("#") ? href : href.slice(href.indexOf("#"))
        const sceneId = hash.replace("#", "")
        const foundIdx = stops.findIndex((s) => s.sceneId === sceneId)
        if (foundIdx !== -1) {
          event.preventDefault()
          navigateToStop(foundIdx)
        }
      }
    }

    const onButtonClick = (event: MouseEvent) => {
      const btn = (event.target as Element | null)?.closest<HTMLButtonElement>("button")
      if (!btn) return
      const label = (btn.textContent || btn.getAttribute("aria-label") || "").toLowerCase()
      if (label.includes("voltar ao topo")) {
        event.preventDefault()
        navigateToStop(0)
      }
    }

    const onScroll = () => {
      if (animating || stops.length === 0) return
      window.clearTimeout(scrollTimeout)
      scrollTimeout = window.setTimeout(() => {
        if (animating) return
        const currentY = window.scrollY
        let closestIdx = 0
        let closestDist = Infinity

        for (let i = 0; i < stops.length; i++) {
          const dist = Math.abs(stops[i].top - currentY)
          if (dist < closestDist) {
            closestDist = dist
            closestIdx = i
          }
        }

        if (closestIdx !== currentStopIndex) {
          currentStopIndex = closestIdx
          const activeStop = stops[closestIdx]
          page.style.setProperty("--page-bg", activeStop.color)
          for (const s of stops) {
            if (s.sceneElement === activeStop.sceneElement) {
              s.sceneElement.dataset.sceneState = "active"
            } else {
              s.sceneElement.dataset.sceneState = "idle"
            }
          }
        }
      }, 100)
    }

    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      const foundIdx = stops.findIndex((s) => s.sceneId === hash)
      if (foundIdx !== -1 && foundIdx !== currentStopIndex) {
        navigateToStop(foundIdx)
      }
    }

    buildStops()

    // Encontrar o stop inicial com base no hash ou scroll
    let initialStopIdx = 0
    if (window.location.hash) {
      const targetHash = window.location.hash.replace("#", "")
      const foundIdx = stops.findIndex((s) => s.sceneId === targetHash)
      if (foundIdx !== -1) initialStopIdx = foundIdx
    } else if (window.scrollY > 40) {
      const currentY = window.scrollY
      let closestDist = Infinity
      for (let i = 0; i < stops.length; i++) {
        const dist = Math.abs(stops[i].top - currentY)
        if (dist < closestDist) {
          closestDist = dist
          initialStopIdx = i
        }
      }
    }
    currentStopIndex = initialStopIdx

    if (stops.length > 0) {
      const activeStop = stops[initialStopIdx]
      page.style.setProperty("--page-bg", activeStop.color)

      for (let i = 0; i < stops.length; i++) {
        const sEl = stops[i].sceneElement
        if (i === initialStopIdx) {
          sEl.dataset.sceneState = "active"
        } else if (sEl !== activeStop.sceneElement) {
          sEl.dataset.sceneState = "idle"
        }
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKey)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("touchcancel", onTouchEnd, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("hashchange", onHashChange)
    document.addEventListener("click", onAnchorClick, { capture: true })
    document.addEventListener("click", onButtonClick, { capture: true })
    window.addEventListener("resize", buildStops, { passive: true })

    return () => {
      disposed = true
      window.clearTimeout(scrollTimeout)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchEnd)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("hashchange", onHashChange)
      document.removeEventListener("click", onAnchorClick, { capture: true })
      document.removeEventListener("click", onButtonClick, { capture: true })
      window.removeEventListener("resize", buildStops)
    }
  }, [root, reduced])
}
