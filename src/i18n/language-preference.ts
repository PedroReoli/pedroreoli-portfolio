import type { Language } from "./language-context"

/** Escolha explícita primeiro; depois o primeiro idioma suportado na ordem do navegador. */
export function resolveLanguage(saved: string | null, locales: readonly string[]): Language {
  if (saved === "pt" || saved === "en") return saved

  for (const locale of locales) {
    const language = locale.trim().toLowerCase().split("-")[0]
    if (language === "pt" || language === "en") return language
  }

  return "en"
}
