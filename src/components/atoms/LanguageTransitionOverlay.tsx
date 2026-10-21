import React from "react"
import { AnimatePresence, m } from "framer-motion"
import { useLanguage } from "../../i18n/useLanguage"
import FlagIcon from "./FlagIcon"

export const LanguageTransitionOverlay: React.FC = () => {
  const { isSwitching, switchingTo } = useLanguage()

  const isPt = switchingTo === "pt"

  return (
    <AnimatePresence>
      {isSwitching && (
        <m.div
          key="language-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
          className="pointer-events-none fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#111010]/95 backdrop-blur-3xl"
          aria-live="assertive"
          aria-atomic="true"
        >
          <m.div
            initial={{ scale: 0.85, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 text-center select-none"
          >
            {/* Vector Flag Graphic */}
            <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(130,170,255,0.3)]">
              <FlagIcon
                country={isPt ? "br" : "us"}
                aspect="4x3"
                className="h-16 w-24 object-cover"
              />
            </div>

            {/* Language Text */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-2xl font-black uppercase tracking-[0.2em] text-white">
                {isPt ? "PT-BR" : "EN-US"}
              </span>
              <span className="editorial-label text-xs tracking-[0.18em] text-[#82aaff]">
                {isPt ? "PORTUGUÊS / BRASIL" : "ENGLISH / GLOBAL"}
              </span>
            </div>

            {/* Fast Loading Bar */}
            <div className="mt-2 h-1 w-36 overflow-hidden rounded-full bg-white/10">
              <m.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full bg-[#82aaff] shadow-[0_0_12px_#82aaff]"
              />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default LanguageTransitionOverlay
