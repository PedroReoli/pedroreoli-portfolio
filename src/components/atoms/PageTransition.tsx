import { useEffect, useRef, type ReactNode } from "react"
import { m, useIsPresent } from "framer-motion"
import gsap from "gsap"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import { filmEase } from "../../motion/choreography"

export default function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  const present = useIsPresent()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.inert = !present
  }, [present])

  // GSAP entrada com stagger dos elementos estruturais da nova página
  useEffect(() => {
    if (reduceMotion || !present || !ref.current) return

    const timer = window.setTimeout(() => {
      if (!ref.current) return
      const targets = ref.current.querySelectorAll(
        "h1, h2, .archive-title, .archive-eyebrow, .editorial-label, .project-card, article, nav[role='tablist'], .about-portrait-frame, .filter-chip"
      )
      if (targets && targets.length > 0) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 32, filter: "blur(8px)", scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.045,
            duration: 0.42,
            ease: "power3.out",
            clearProps: "transform,filter,scale",
          }
        )
      }
    }, 40)

    return () => window.clearTimeout(timer)
  }, [present, reduceMotion])

  return (
    <m.div
      ref={ref}
      className="route-scene relative min-h-screen"
      data-page-state={present ? "present" : "exiting"}
      aria-hidden={!present || undefined}
      initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: -24, filter: "blur(8px)" }
      }
      transition={{
        duration: reduceMotion ? 0 : present ? 0.38 : 0.22,
        ease: filmEase,
      }}
    >
      {/* Cortina sutil que acompanha a transição */}
      {!reduceMotion && (
        <m.div
          className="pointer-events-none fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.28, ease: filmEase }}
          aria-hidden="true"
        />
      )}

      {/* Linha de acento cinemático no topo da janela durante transições de rota */}
      {!reduceMotion && (
        <m.div
          className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-transparent via-[#82aaff] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 0.4, 0], opacity: [0, 1, 0.8, 0] }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
      )}
      {children}
    </m.div>
  )
}
