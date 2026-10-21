import { useCallback, useEffect, useMemo, useState } from "react"
import { LanguageContext, type Language } from "./language-context"

const STORAGE_KEY = "pedroreoli-portfolio-language"

const readStoredLanguage = (): Language | null => {
  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
    return savedLanguage === "pt" || savedLanguage === "en" ? savedLanguage : null
  } catch {
    return null
  }
}

const detectLanguage = (): Language => {
  if (typeof window === "undefined") return "en"

  const savedLanguage = readStoredLanguage()
  if (savedLanguage) return savedLanguage

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language]

  return browserLanguages.some((locale) => {
    const normalizedLocale = locale.toLowerCase()
    return normalizedLocale === "pt" || normalizedLocale.startsWith("pt-")
  })
    ? "pt"
    : "en"
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(detectLanguage)
  const [isSwitching, setIsSwitching] = useState(false)
  const [switchingTo, setSwitchingTo] = useState<Language | null>(null)

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
      if (targetLanguage === language || isSwitching) return
      setIsSwitching(true)
      setSwitchingTo(targetLanguage)

      window.setTimeout(() => {
        setLanguage(targetLanguage)
      }, 180)

      window.setTimeout(() => {
        setIsSwitching(false)
        setSwitchingTo(null)
      }, 550)
    },
    [language, isSwitching],
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

