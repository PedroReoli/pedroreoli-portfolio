import { useSyncExternalStore } from "react"

let preference: MediaQueryList | undefined
let reducedMotion = false
const subscribers = new Set<() => void>()

function getPreference() {
  if (!preference) {
    preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotion = preference.matches
  }
  return preference
}

function notifySubscribers(event: MediaQueryListEvent) {
  reducedMotion = event.matches
  for (const notify of [...subscribers]) notify()
}

function subscribe(onChange: () => void) {
  const media = getPreference()
  if (subscribers.size === 0) {
    reducedMotion = media.matches
    media.addEventListener("change", notifySubscribers)
  }
  subscribers.add(onChange)
  return () => {
    subscribers.delete(onChange)
    if (subscribers.size === 0) media.removeEventListener("change", notifySubscribers)
  }
}

const getSnapshot = () => {
  getPreference()
  // Todos os consumidores leem o estado publicado pelo mesmo evento, inclusive durante scroll.
  return reducedMotion
}
const getServerSnapshot = () => false

/** Atualiza entradas, parallax e scroll programático sem exigir reload da página. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
