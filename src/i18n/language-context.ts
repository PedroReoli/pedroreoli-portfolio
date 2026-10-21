import { createContext } from "react"

export type Language = "pt" | "en"

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  isSwitching: boolean
  switchingTo: Language | null
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

