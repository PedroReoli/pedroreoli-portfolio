import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

export const ScrollToTop = ({
  renderedPath,
  focusOnMount = false,
}: {
  renderedPath?: string
  focusOnMount?: boolean
}) => {
  const location = useLocation()
  const pathname = renderedPath ?? location.pathname
  const previousPath = useRef(pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    const changedPage = previousPath.current !== pathname || focusOnMount
    previousPath.current = pathname
    if (!changedPage) return

    // Espera o conteúdo real, não o fallback transitório de uma rota lazy.
    const focusContent = () => {
      const main = Array.from(
        document.querySelectorAll<HTMLElement>('main:not([aria-busy="true"])'),
      ).find((element) => element.getClientRects().length > 0)
      if (!main) return false
      main.focus({ preventScroll: true })
      return true
    }
    let observer: MutationObserver | undefined
    const frame = window.requestAnimationFrame(() => {
      if (focusContent()) return
      observer = new MutationObserver(() => {
        if (focusContent()) observer?.disconnect()
      })
      observer.observe(document.body, { childList: true, subtree: true })
    })
    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [pathname, focusOnMount])

  return null
}

export default ScrollToTop
