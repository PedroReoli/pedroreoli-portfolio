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
 * Orquestrador de transições fluidas em rolagem natural com GSAP ScrollTrigger:
 * - Rolagem 100% nativa e livre (SEM parallax travado, sem viewport lock)
 * - Ao rolar de uma seção para outra:
 *   1. Itens da seção anterior somem suavemente com fade, elevação e blur
 *   2. Cor de fundo transmuta dinamicamente (#111010 <-> #edeae4)
 *   3. Itens da nova seção chegam em cascata ágil ("um por um, tudo bem rápido")
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
            clearProps: "filter",
          }
        )
      }
    }

    const triggers: ScrollTrigger[] = []

    SCENE_ORDER.forEach((id, index) => {
      const sceneEl = page.querySelector<HTMLElement>(`#${id}`)
      if (!sceneEl) return

      const config = SCENE_THEMES[id] || { color: "#111010" }

      const applySceneEntrance = (direction: 1 | -1) => {
        // Morph suave da cor do fundo
        page.style.setProperty("--page-bg", config.color)
        document.documentElement.style.setProperty("--page-bg", config.color)
        gsap.to([page, backdrop].filter(Boolean), {
          backgroundColor: config.color,
          duration: 0.35,
          ease: "power2.out",
        })

        document.documentElement.dataset.activeScene = id
        window.dispatchEvent(
          new CustomEvent("scene-change", {
            detail: { sceneId: id, color: config.color },
          })
        )

        if (reduced) return

        // Animação dos itens da nova seção entrando ("um por um, tudo bem rápido")
        const items = getSceneElements(sceneEl)
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: direction > 0 ? 30 : -30,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            duration: 0.35,
            ease: "power3.out",
            clearProps: "filter",
            overwrite: "auto",
          }
        )
      }

      const applySceneExit = (direction: 1 | -1) => {
        if (reduced) return
        const items = getSceneElements(sceneEl)
        gsap.to(items, {
          opacity: 0.1,
          y: direction > 0 ? -20 : 20,
          filter: "blur(4px)",
          duration: 0.2,
          ease: "power2.in",
          overwrite: "auto",
        })
      }

      // ScrollTrigger para cada seção na rolagem normal do documento
      const trigger = ScrollTrigger.create({
        trigger: sceneEl,
        start: index === 0 ? "top 80%" : "top 50%",
        end: "bottom 50%",
        onEnter: () => applySceneEntrance(1),
        onEnterBack: () => applySceneEntrance(-1),
        onLeave: () => {
          if (index < SCENE_ORDER.length - 1) {
            applySceneExit(1)
          }
        },
        onLeaveBack: () => {
          if (index > 0) {
            applySceneExit(-1)
          }
        },
      })

      triggers.push(trigger)
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
