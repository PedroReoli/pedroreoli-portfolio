import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"

// Importando as traduções
import translationPT from "./locales/pt/translation.json"
import translationEN from "./locales/en/translation.json"
import translationES from "./locales/es/translation.json"

// Recursos de tradução
const resources = {
  pt: {
    translation: translationPT,
  },
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
}

// Mapeamento de códigos de idioma para URLs
export const languageToPath: Record<string, string> = {
  pt: "pt",
  en: "en",
  es: "es",
}

// Mapeamento de URLs para códigos de idioma
export const pathToLanguage: Record<string, string> = {
  pt: "pt",
  en: "en",
  es: "es",
}

i18n
  // Carrega traduções usando http (pode ser usado para carregar traduções sob demanda)
  .use(Backend)
  // Detecta o idioma do usuário
  .use(LanguageDetector)
  // Passa o i18n para react-i18next
  .use(initReactI18next)
  // Inicializa i18next
  .init({
    resources,
    fallbackLng: "pt",
    debug: process.env.NODE_ENV === "development",

    detection: {
      // Ordem de detecção
      order: ["path", "localStorage", "navigator"],

      // Opções para detecção baseada em caminho
      lookupFromPathIndex: 0,

      // Salvar idioma detectado
      caches: ["localStorage"],

      // Nome da chave no localStorage
      lookupLocalStorage: "i18nextLng",
    },

    interpolation: {
      escapeValue: false, // não é necessário para React
    },
  })

// Função para obter o idioma atual
export const getCurrentLanguage = (): string => {
  return i18n.language.split("-")[0] // Remove a região, ex: 'pt-BR' -> 'pt'
}

// Função para mudar o idioma e redirecionar para a URL correta
export const changeLanguage = (language: string): void => {
  i18n.changeLanguage(language)
  localStorage.setItem("i18nextLng", language)

  // Redireciona para a URL correta
  const currentPath = window.location.pathname
  const pathSegments = currentPath.split("/").filter(Boolean)

  // Se já temos um código de idioma na URL, substituímos
  if (pathSegments.length > 0 && Object.values(pathToLanguage).includes(pathSegments[0])) {
    pathSegments[0] = languageToPath[language]
  } else {
    // Caso contrário, adicionamos o código de idioma no início
    pathSegments.unshift(languageToPath[language])
  }

  window.location.href = `/${pathSegments.join("/")}`
}

export default i18n
