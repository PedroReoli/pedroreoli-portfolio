import React from "react"
import { useLanguage } from "../../i18n/useLanguage"
import { FaWhatsapp } from "react-icons/fa6"

export const CelestialHireMe: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <aside
      aria-label="Canal de contato flutuante"
      className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex items-center justify-center pointer-events-auto"
    >
      <a
        href="https://wa.me/5524993264040?text=Ol%C3%A1%20Pedro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#238636] hover:bg-[#2ea043] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 border border-[#3fb950]/30"
        title="Falar diretamente com Pedro via WhatsApp"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <FaWhatsapp className="w-4 h-4 text-white" />
        <span className="font-medium text-xs hidden sm:inline">
          {isEn ? "WhatsApp Direct" : "Falar no WhatsApp"}
        </span>
      </a>
    </aside>
  )
}

export default CelestialHireMe
