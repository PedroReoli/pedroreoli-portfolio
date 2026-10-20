import React, { useState } from "react"
import { useLanguage } from "../../i18n/useLanguage"
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6"
import { MdEmail, MdContentCopy, MdCheck } from "react-icons/md"
import { ArrowUp, ArrowUpRight } from "lucide-react"

export const StitchFooter: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [copied, setCopied] = useState(false)

  const email = "pedrosousa2160@gmail.com"

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email)
      } else {
        const temp = document.createElement("input")
        temp.value = email
        document.body.appendChild(temp)
        temp.select()
        document.execCommand("copy")
        document.body.removeChild(temp)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer id="contato" className="w-full mt-16 border-t border-[#30363d] bg-[#0d1117] text-[#f0f6fc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 flex flex-col gap-10">
        {/* Bloco Superior: Chamada Executiva de Contato */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#21262d]">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950] animate-pulse" />
              <span className="text-xs font-mono text-[#3fb950] font-semibold tracking-wide uppercase">
                {isEn ? "Available for New Opportunities" : "Disponível para Novos Projetos & Posições"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#f0f6fc]">
              {isEn ? "Let's build something solid together." : "Vamos conversar sobre o seu próximo projeto?"}
            </h2>
            <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
              {isEn
                ? "Open to strategic engineering positions, technical leadership, and scalable software architecture."
                : "Aberto a posições de engenharia sênior, liderança técnica e consultoria em arquitetura de software."}
            </p>
          </div>

          {/* Botão de WhatsApp em Destaque */}
          <a
            href="https://wa.me/5524993264040?text=Ol%C3%A1%20Pedro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20uma%20oportunidade."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm transition-colors shadow-sm shrink-0"
          >
            <FaWhatsapp className="w-5 h-5 text-white" />
            <span>{isEn ? "Start Conversation on WhatsApp" : "Conversar via WhatsApp"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Bloco Central: Canais de Contato e Redes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* E-mail (Link mailto + botão copiar) */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/40 transition-colors">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2.5 text-sm text-[#f0f6fc] hover:text-[#58a6ff] transition-colors truncate"
              title="Enviar e-mail direto"
            >
              <MdEmail className="w-5 h-5 text-[#58a6ff] shrink-0" />
              <span className="truncate font-mono text-xs sm:text-sm">{email}</span>
            </a>
            <button
              onClick={handleCopyEmail}
              type="button"
              className="p-1.5 ml-2 rounded-md hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] transition-colors shrink-0"
              title={copied ? "E-mail copiado!" : "Copiar e-mail"}
              aria-label="Copiar endereço de e-mail"
            >
              {copied ? (
                <MdCheck className="w-4 h-4 text-[#3fb950]" />
              ) : (
                <MdContentCopy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* GitHub Oficial */}
          <a
            href="https://github.com/PedroReoli"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/40 text-[#f0f6fc] hover:text-[#58a6ff] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <FaGithub className="w-5 h-5 text-[#f0f6fc]" />
              <span className="text-xs sm:text-sm font-medium">GitHub (@PedroReoli)</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#8b949e]" />
          </a>

          {/* LinkedIn Oficial */}
          <a
            href="https://www.linkedin.com/in/pedro-lucas-reis-a93945171/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/40 text-[#f0f6fc] hover:text-[#58a6ff] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <FaLinkedin className="w-5 h-5 text-[#0a66c2]" />
              <span className="text-xs sm:text-sm font-medium">LinkedIn (Pedro Lucas Reis)</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#8b949e]" />
          </a>
        </div>

        {/* Bloco Inferior: Assinatura e Voltar ao Topo */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-[#8b949e]">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Pedro Lucas Reis</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Volta Redonda, RJ &bull; Brasil</span>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs text-[#8b949e] hover:text-[#f0f6fc] transition-colors py-1 px-2.5 rounded-md hover:bg-[#161b22]"
            aria-label="Voltar ao topo da página"
          >
            <span>{isEn ? "Back to top" : "Voltar ao topo"}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default StitchFooter
