import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { LanguageContext, type Language } from "./language-context"
import { resolveLanguage } from "./language-preference"

const STORAGE_KEY = "pedroreoli-portfolio-language"

const readStoredLanguage = (): string | null => {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const detectLanguage = (): Language => {
  if (typeof window === "undefined") return "en"

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language]
  return resolveLanguage(readStoredLanguage(), browserLanguages)
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(detectLanguage)
  const [switchingTo, setSwitchingTo] = useState<Language | null>(null)
  const noticeTimer = useRef<number>()
  const isSwitching = switchingTo !== null

  useEffect(() => () => window.clearTimeout(noticeTimer.current), [])

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en"

    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // The language still works for this session when storage is unavailable.
    }
  }, [language])

  useEffect(() => {
    const syncLanguage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      if (event.newValue === "pt" || event.newValue === "en") {
        setLanguage(event.newValue)
      }
    }

    window.addEventListener("storage", syncLanguage)
    return () => window.removeEventListener("storage", syncLanguage)
  }, [])

  const triggerLanguageSwitch = useCallback(
    (targetLanguage: Language) => {
      if (targetLanguage === language) return
      window.clearTimeout(noticeTimer.current)
      setLanguage(targetLanguage)
      setSwitchingTo(targetLanguage)
      noticeTimer.current = window.setTimeout(() => {
        setSwitchingTo(null)
      }, 1400)
    },
    [language],
  )

  const toggleLanguage = useCallback(() => {
    const nextLang = language === "pt" ? "en" : "pt"
    triggerLanguageSwitch(nextLang)
  }, [language, triggerLanguageSwitch])

  const value = useMemo(
    () => ({
      language,
      setLanguage: triggerLanguageSwitch,
      toggleLanguage,
      isSwitching,
      switchingTo,
    }),
    [language, isSwitching, switchingTo, triggerLanguageSwitch, toggleLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
