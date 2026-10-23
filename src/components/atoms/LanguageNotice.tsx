import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"

/** Confirma o idioma sem cobrir o conteúdo nem bloquear a próxima ação. */
export default function LanguageNotice() {
  const { switchingTo } = useLanguage()
  const reduceMotion = useReducedMotion()

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-5 right-4 z-[60] max-w-[calc(100%-2rem)]"
    >
      <AnimatePresence>
        {switchingTo && (
          <m.div
            key={switchingTo}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-[#111010] px-4 py-3 text-xs text-[#edeae4] shadow-lg"
          >
            <Check className="h-3.5 w-3.5 text-[#82aaff]" aria-hidden="true" />
            <span lang={switchingTo === "pt" ? "pt-BR" : "en"}>
              {switchingTo === "pt" ? "Idioma: Português" : "Language: English"}
            </span>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
