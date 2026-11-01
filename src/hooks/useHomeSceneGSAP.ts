import { useEffect, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "./useReducedMotion"

gsap.registerPlugin(ScrollTrigger)

interface SceneThemeConfig {
  color: string
}

const SCENE_THEMES: Record<string, SceneThemeConfig> = {
  hero: { color: "#111010" },
  sobre: { color: "#edeae4" },
  "projetos-selecionados": { color: "#111010" },
  stack: { color: "#edeae4" },
  proposito: { color: "#111010" },
  experiencia: { color: "#111010" },
  contato: { color: "#111010" },
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
 * Orquestrador de transições fluidas com GSAP ScrollTrigger:
 * - Rolagem 100% nativa e natural (SEM scroll lock ou parallax artificial)
 * - Ao entrar na seção: itens surgem em cascata ágil ("um por um, tudo bem rápido")
 * - Uso de clearProps: "all" para garantir que nenhum elemento fique preso ou invisível
 * - Header sincronizado dinamicamente via dataset.activeScene e evento scene-change
 */
export function useHomeSceneGSAP(root: RefObject<HTMLElement>) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const page = root.current
    if (!page) return

    const backdrop = page.querySelector<HTMLElement>(".home-backdrop")

    // Define cor inicial no Hero
    const initialColor = SCENE_THEMES.hero.color
    page.style.setProperty("--page-bg", initialColor)
    document.documentElement.style.setProperty("--page-bg", initialColor)
    document.documentElement.dataset.activeScene = "hero"

    // Cascata inicial dos itens do Hero
    if (!reduced) {
      const heroEl = page.querySelector<HTMLElement>("#hero")
      if (heroEl) {
        const heroItems = getSceneElements(heroEl)
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 24, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "all",
          }
        )
      }
    }

    const triggers: ScrollTrigger[] = []

    SCENE_ORDER.forEach((id, index) => {
      const sceneEl = page.querySelector<HTMLElement>(`#${id}`)
      if (!sceneEl) return

      const config = SCENE_THEMES[id] || { color: "#111010" }

      const activateScene = () => {
        page.style.setProperty("--page-bg", config.color)
        document.documentElement.style.setProperty("--page-bg", config.color)
        document.documentElement.dataset.activeScene = id

        if (backdrop) {
          gsap.to(backdrop, {
            backgroundColor: config.color,
            duration: 0.35,
            ease: "power2.out",
          })
        }

        window.dispatchEvent(
          new CustomEvent("scene-change", {
            detail: { sceneId: id, color: config.color },
          })
        )
      }

      // 1. Gatilho de entrada com cascata ágil ("um por um, tudo bem rápido")
      if (index > 0 && !reduced) {
        const entranceTrigger = ScrollTrigger.create({
          trigger: sceneEl,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const items = getSceneElements(sceneEl)
            gsap.fromTo(
              items,
              {
                opacity: 0,
                y: 28,
                filter: "blur(6px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                stagger: 0.04,
                duration: 0.35,
                ease: "power3.out",
                clearProps: "all",
                overwrite: "auto",
              }
            )
          },
        })
        triggers.push(entranceTrigger)
      }

      // 2. Gatilho de sincronização de cena ativa para header e background
      const activeTrigger = ScrollTrigger.create({
        trigger: sceneEl,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: activateScene,
        onEnterBack: activateScene,
      })
      triggers.push(activeTrigger)
    })

    // Suporte a cliques em âncoras para rolagem suave
    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a")
      if (!link) return
      const href = link.getAttribute("href") || ""

      if (href === "/" && window.location.pathname === "/") {
        event.preventDefault()
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
        return
      }

      if (href.includes("#")) {
        const hash = href.startsWith("#") ? href : href.slice(href.indexOf("#"))
        const target = page.querySelector<HTMLElement>(hash)
        if (target) {
          event.preventDefault()
          target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })
        }
      }
    }

    document.addEventListener("click", onAnchorClick, { capture: true })

    return () => {
      triggers.forEach((t) => t.kill())
      document.removeEventListener("click", onAnchorClick, { capture: true })
    }
  }, [root, reduced])
}
