import React from "react"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchFooter: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <footer id="contato" className="bg-[#82aaff] text-[#111010]">
      <div className="editorial-container py-12 sm:py-20">
        <div className="flex items-center justify-between">
          <p className="editorial-label">{isEn ? "Have a project?" : "Tem um projeto?"}</p>
          <p className="editorial-label">Volta Redonda / BR</p>
        </div>

        <a
          href="mailto:pedrosousa2160@gmail.com"
          className="group my-14 flex items-end justify-between border-b-2 border-[#111010] pb-5 sm:my-20"
        >
          <span className="text-[clamp(3.5rem,13vw,12rem)] font-black leading-[0.78] tracking-[-0.08em]">
            {isEn ? "LET'S TALK" : "VAMOS FALAR"}
          </span>
          <ArrowUpRight className="mb-1 h-9 w-9 shrink-0 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 sm:mb-3 sm:h-16 sm:w-16" />
        </a>

        <div className="grid gap-10 border-b border-black/25 pb-10 sm:grid-cols-3">
          <a href="mailto:pedrosousa2160@gmail.com" className="footer-link">E-mail <ArrowUpRight /></a>
          <a href="https://github.com/PedroReoli" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub <ArrowUpRight /></a>
          <a href="https://www.linkedin.com/in/pedro-lucas-reis-a93945171/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn <ArrowUpRight /></a>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-[10px] font-semibold uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Pedro Lucas Reis</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 self-start uppercase">
            {isEn ? "Back to top" : "Voltar ao topo"}<ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default StitchFooter
