import { useEffect, useMemo, useState } from "react"
import { LanguageContext, type Language } from "./language-context"

const STORAGE_KEY = "pedroreoli-portfolio-language"

const detectLanguage = (): Language => {
  if (typeof window === "undefined") return "en"

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
  if (savedLanguage === "pt" || savedLanguage === "en") return savedLanguage

  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  return browserLanguages.some((locale) => {
    const normalizedLocale = locale.toLowerCase()
    return normalizedLocale === "pt" || normalizedLocale.startsWith("pt-")
  })
    ? "pt"
    : "en"
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(detectLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en"
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === "pt" ? "en" : "pt")),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
