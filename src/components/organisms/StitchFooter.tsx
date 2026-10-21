import React from "react"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"

export const StitchFooter: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <footer id="contato" className="viewport-stage footer-stage border-t border-white/10 bg-[#111010] text-[#edeae4]">
      <div className="editorial-container footer-stage-layout h-full">
        <Reveal className="flex items-start justify-between border-b border-white/15 pb-4 sm:pb-5">
          <div>
            <p className="editorial-label text-[#82aaff]">07 / {isEn ? "Contact" : "Contato"}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#8f8a84] sm:mt-3 sm:text-base">
              {isEn ? "Available for ambitious, useful work." : "Disponível para trabalhos ambiciosos e úteis."}
            </p>
          </div>
          <p className="editorial-label text-right text-[#8d8984]">Volta Redonda<br />BR / 2026</p>
        </Reveal>

        <Reveal className="footer-cta-stage flex min-h-0 flex-col justify-center" distance={48}>
          <p className="editorial-label mb-4 text-[#8d8984]">{isEn ? "Have a project in mind?" : "Tem um projeto em mente?"}</p>
          <a
            href="mailto:pedrosousa2160@gmail.com"
            className="group block border-b border-white/25 pb-5 sm:pb-7"
          >
            <span className="footer-cta relative block font-black uppercase leading-[0.76] tracking-[-0.085em]">
              <span className="footer-cta-word">{isEn ? "LET'S" : "VAMOS"}</span>
              <span className="footer-cta-word footer-cta-outline">{isEn ? "TALK." : "CONVERSAR."}</span>
              <span className="footer-cta-arrow absolute bottom-[0.08em] right-0 grid place-items-center rounded-full bg-[#82aaff] text-[#111010] transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2">
                <ArrowUpRight className="h-[0.38em] w-[0.38em]" />
              </span>
            </span>
          </a>
          <a href="mailto:pedrosousa2160@gmail.com" className="editorial-label mt-4 w-fit border-b border-white/30 pb-1 text-[#aaa6a0] transition-colors hover:text-white">
            pedrosousa2160@gmail.com
          </a>
        </Reveal>

        <div className="footer-bottom">
          <Reveal className="grid grid-cols-3 gap-3 border-b border-white/15 pb-4 sm:gap-6 sm:pb-6">
            <a href="mailto:pedrosousa2160@gmail.com" className="footer-link"><span><small>01</small>E-mail</span><ArrowUpRight /></a>
            <a href="https://github.com/PedroReoli" target="_blank" rel="noopener noreferrer" className="footer-link"><span><small>02</small>GitHub</span><ArrowUpRight /></a>
            <a href="https://www.linkedin.com/in/pedro-lucas-reis-a93945171/" target="_blank" rel="noopener noreferrer" className="footer-link"><span><small>03</small>LinkedIn</span><ArrowUpRight /></a>
          </Reveal>

          <div className="flex items-center justify-between gap-4 pt-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8d8984] sm:pt-5 sm:text-[10px]">
            <span>© {new Date().getFullYear()} Pedro Lucas Reis</span>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex shrink-0 items-center gap-2 uppercase transition-colors hover:text-white">
              {isEn ? "Back to top" : "Voltar ao topo"}<ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default StitchFooter
