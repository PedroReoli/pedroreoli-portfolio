import { useEffect, useRef, useState } from "react"

/** Comportamento de disclosure: não bloqueia a página nem aprisiona o teclado. */
export function useMobileNavigation(pathname: string) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const navigationRef = useRef<HTMLElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return

    const desktop = window.matchMedia("(min-width: 768px)")
    const closeOutside = (event: Event) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (buttonRef.current?.contains(target) || navigationRef.current?.contains(target)) return
      setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      buttonRef.current?.focus({ preventScroll: true })
    }
    const closeOnDesktop = () => {
      if (!desktop.matches) return
      if (navigationRef.current?.contains(document.activeElement)) {
        document.querySelector<HTMLElement>('header nav a[aria-current="page"]')?.focus()
      }
      setOpen(false)
    }

    closeOnDesktop()
    desktop.addEventListener("change", closeOnDesktop)
    document.addEventListener("pointerdown", closeOutside)
    document.addEventListener("focusin", closeOutside)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      desktop.removeEventListener("change", closeOnDesktop)
      document.removeEventListener("pointerdown", closeOutside)
      document.removeEventListener("focusin", closeOutside)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  return { open, setOpen, buttonRef, navigationRef }
}
