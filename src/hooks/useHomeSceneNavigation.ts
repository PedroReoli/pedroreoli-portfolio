import { useEffect, type RefObject } from "react"
import { useReducedMotion } from "./useReducedMotion"

/** Um gesto percorre uma cena (ou capítulo), mantendo o documento e seus links nativos. */
export function useHomeSceneNavigation(root: RefObject<HTMLElement>) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const page = root.current
    if (!page) return
    let frame = 0
    let settleTimer = 0
    let lastWheel = 0
    let wheelDistance = 0
    let gestureConsumed = false
    let touch: { x: number; y: number; handled: boolean } | null = null
    let animating = false
    let disposed = false

    const stops = () => {
      const limit = document.documentElement.scrollHeight - innerHeight
      return [...page.querySelectorAll<HTMLElement>("[data-scroll-scene]")].flatMap((scene) => {
        const top = scrollY + scene.getBoundingClientRect().top
        const count = Number(scene.dataset.scrollSteps) || 1
        const distance = Math.max(0, scene.offsetHeight - innerHeight)
        return Array.from({ length: count }, (_, index) =>
          Math.min(limit, Math.max(0, top + (count > 1 ? (index / (count - 1)) * distance : 0))),
        )
      })
    }

    const unavailable = (target: EventTarget | null) => {
      if (disposed || !page.isConnected || page.closest("[inert]") || document.querySelector("dialog[open]")) return true
      if (!(target instanceof Element)) return false
      if (target.closest('input,textarea,select,[contenteditable="true"],[role="dialog"]')) return true
      // Menus e áreas com rolagem própria continuam usando o comportamento nativo.
      for (let node: Element | null = target; node && node !== page; node = node.parentElement) {
        if (node instanceof HTMLElement && node.scrollHeight > node.clientHeight + 2 &&
          /auto|scroll/.test(getComputedStyle(node).overflowY)) return true
      }
      return false
    }

    const travel = (destination: number) => {
      cancelAnimationFrame(frame)
      clearTimeout(settleTimer)
      const start = scrollY
      const distance = destination - start
      if (Math.abs(distance) < 2) return
      if (reduced) {
        window.scrollTo({ top: destination, behavior: "instant" })
        return
      }
      animating = true
      page.dataset.sceneTransition = "running"
      const began = performance.now()
      const tick = (now: number) => {
        const progress = Math.min(1, (now - began) / 900)
        const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
        window.scrollTo({ top: start + distance * eased, behavior: "instant" })
        if (progress < 1) frame = requestAnimationFrame(tick)
        else {
          animating = false
          delete page.dataset.sceneTransition
        }
      }
      frame = requestAnimationFrame(tick)
    }

    const advance = (direction: number) => {
      if (animating) return
      const points = stops()
      const destination = direction > 0
        ? points.find((point) => point > scrollY + 3)
        : [...points].reverse().find((point) => point < scrollY - 3)
      if (destination !== undefined) travel(destination)
    }

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        unavailable(event.target)) return
      if (event.cancelable) event.preventDefault()
      const now = performance.now()
      if (now - lastWheel > 220) {
        wheelDistance = 0
        gestureConsumed = false
      }
      lastWheel = now
      if (gestureConsumed || animating) return
      wheelDistance += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1)
      if (Math.abs(wheelDistance) < 24) return
      gestureConsumed = true
      advance(Math.sign(wheelDistance))
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.altKey || event.metaKey || unavailable(event.target)) return
      if (event.target instanceof Element && event.target.closest("a,button,[role=button]")) return
      const direction = ["ArrowDown", "PageDown", " "].includes(event.key) ? 1
        : ["ArrowUp", "PageUp"].includes(event.key) ? -1 : 0
      if (!direction && event.key !== "Home" && event.key !== "End") return
      event.preventDefault()
      if (event.repeat || animating) return
      if (event.key === "Home" || event.key === "End") {
        const points = stops()
        travel(event.key === "Home" ? points[0] : points[points.length - 1])
      } else advance(event.key === " " && event.shiftKey ? -1 : direction)
    }

    const onTouchStart = (event: TouchEvent) => {
      touch = event.touches.length === 1 && !unavailable(event.target)
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY, handled: false } : null
    }
    const onTouchMove = (event: TouchEvent) => {
      if (!touch || event.touches.length !== 1) return
      const dx = touch.x - event.touches[0].clientX
      const dy = touch.y - event.touches[0].clientY
      if (Math.abs(dy) < 12 || Math.abs(dx) > Math.abs(dy)) return
      if (event.cancelable) event.preventDefault()
      if (touch.handled || Math.abs(dy) < 40) return
      touch.handled = true
      advance(Math.sign(dy))
    }
    const onTouchEnd = () => { touch = null }

    const onScroll = () => {
      clearTimeout(settleTimer)
      if (animating) return
      // Encaixa também após arrastar a scrollbar ou seguir uma âncora.
      settleTimer = window.setTimeout(() => {
        if (unavailable(null)) return
        const nearest = stops().reduce((best, point) =>
          Math.abs(point - scrollY) < Math.abs(best - scrollY) ? point : best, 0)
        travel(nearest)
      }, 200)
    }
    const cancel = () => {
      cancelAnimationFrame(frame)
      clearTimeout(settleTimer)
      animating = false
      delete page.dataset.sceneTransition
    }
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") cancel() }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKey)
    window.addEventListener("keydown", onEscape)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("touchcancel", onTouchEnd, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", cancel, { passive: true })
    window.addEventListener("pointerdown", cancel, { passive: true })
    return () => {
      disposed = true
      cancel()
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("keydown", onEscape)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchEnd)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", cancel)
      window.removeEventListener("pointerdown", cancel)
    }
  }, [root, reduced])
}
