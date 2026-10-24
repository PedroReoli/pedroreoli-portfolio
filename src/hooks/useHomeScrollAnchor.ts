import { useEffect, type RefObject } from "react"

interface SceneAnchor {
  element: HTMLElement
  progress: number
}

/** Preserva a cena em leitura quando 100dvh muda; não intercepta a rolagem normal. */
export function useHomeScrollAnchor(root: RefObject<HTMLElement>) {
  useEffect(() => {
    const page = root.current
    if (!page) return
    let width = window.innerWidth
    let height = window.innerHeight
    let anchor: SceneAnchor | null = null
    let captureFrame = 0
    let resizeFrame = 0
    let resizing = false
    let pageHeight = page.offsetHeight

    const capture = () => {
      captureFrame = 0
      // Eventos de scroll causados pelo novo layout não substituem a posição antiga.
      if (resizing || window.innerWidth !== width || window.innerHeight !== height) return
      pageHeight = page.offsetHeight
      anchor = null
      for (const element of page.querySelectorAll<HTMLElement>("[data-scroll-scene]")) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 1 && rect.bottom > 1 && rect.height > 0) {
          anchor = { element, progress: Math.max(0, -rect.top / rect.height) }
          break
        }
      }
    }
    const onScroll = () => {
      if (!captureFrame) captureFrame = requestAnimationFrame(capture)
    }
    const onResize = () => {
      if (window.innerWidth === width && window.innerHeight === height) return
      resizing = true
      cancelAnimationFrame(captureFrame)
      cancelAnimationFrame(resizeFrame)
      captureFrame = 0
      resizeFrame = requestAnimationFrame(() => {
        // O resize pode preceder a atualização das unidades dvh. O observer
        // agenda outra leitura quando o layout realmente assumir o novo tamanho.
        if (window.innerHeight !== height && page.offsetHeight === pageHeight) return
        width = window.innerWidth
        height = window.innerHeight
        if (anchor?.element.isConnected) {
          const rect = anchor.element.getBoundingClientRect()
          const top = window.scrollY + rect.top + anchor.progress * rect.height
          window.scrollTo({ top, behavior: "instant" })
        }
        resizing = false
        capture()
      })
    }

    const observer = new ResizeObserver(() => {
      if (window.innerWidth !== width || window.innerHeight !== height) onResize()
      else if (!resizing) capture()
    })

    const onInteraction = () => {
      // Uma nova ação da pessoa tem prioridade sobre a restauração pendente.
      if (!resizing && window.innerWidth === width && window.innerHeight === height) return
      cancelAnimationFrame(resizeFrame)
      resizing = false
      width = window.innerWidth
      height = window.innerHeight
      capture()
    }

    capture()
    observer.observe(page)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    const intentEvents = ["wheel", "touchmove", "pointerdown", "keydown"] as const
    for (const event of intentEvents)
      window.addEventListener(event, onInteraction, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      for (const event of intentEvents) window.removeEventListener(event, onInteraction)
      cancelAnimationFrame(captureFrame)
      cancelAnimationFrame(resizeFrame)
    }
  }, [root])
}
