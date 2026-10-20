import React from "react"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"

export const StitchFooter: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <footer id="contato" className="footer-stage min-h-[100svh] bg-[#edeae4] text-[#111010]">
      <div className="editorial-container flex min-h-[100svh] flex-col justify-between py-8 sm:py-12">
        <Reveal className="flex items-start justify-between border-b border-black/20 pb-5">
          <div>
            <p className="editorial-label text-[#57534e]">{isEn ? "Start a conversation" : "Comece uma conversa"}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#6b6761] sm:text-base">
              {isEn ? "A good idea deserves to leave the screen." : "Uma boa ideia merece sair da tela."}
            </p>
          </div>
          <p className="editorial-label text-right text-[#57534e]">Volta Redonda<br />BR / 2026</p>
        </Reveal>

        <Reveal className="my-10 sm:my-14" distance={48}>
          <a
            href="mailto:pedrosousa2160@gmail.com"
            className="group block border-b-2 border-[#111010] pb-5"
          >
            <span className="footer-cta flex items-end justify-between font-black uppercase leading-[0.76] tracking-[-0.085em]">
              <span>{isEn ? <>LET&apos;S<br />TALK.</> : <>VAMOS<br />CRIAR.</>}</span>
              <ArrowUpRight className="mb-1 h-[0.52em] w-[0.52em] shrink-0 transition-transform duration-300 group-hover:-translate-y-3 group-hover:translate-x-3" />
            </span>
          </a>
        </Reveal>

        <div>
          <Reveal className="grid gap-6 border-b border-black/20 pb-8 sm:grid-cols-3">
            <a href="mailto:pedrosousa2160@gmail.com" className="footer-link">E-mail <ArrowUpRight /></a>
            <a href="https://github.com/PedroReoli" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub <ArrowUpRight /></a>
            <a href="https://www.linkedin.com/in/pedro-lucas-reis-a93945171/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn <ArrowUpRight /></a>
          </Reveal>

          <div className="flex flex-col gap-4 pt-6 text-[10px] font-semibold uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Pedro Lucas Reis</span>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 self-start uppercase">
              {isEn ? "Back to top" : "Voltar ao topo"}<ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default StitchFooter
