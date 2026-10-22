import React from "react"
import { useReducedMotion } from "framer-motion"
import { ArrowUp, Mail } from "lucide-react"
import { SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si"
import { getMailtoUrl, siteConfig } from "../../config/site"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"
import SectionCurtain from "../atoms/SectionCurtain"

export const SiteFooter: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = useReducedMotion()
  const contactLinks = [
    {
      label: "E-mail",
      detail: isEn ? "Start a conversation" : "Vamos conversar",
      href: getMailtoUrl(),
      icon: Mail,
      color: "#82aaff",
      external: false,
    },
    {
      label: "WhatsApp",
      detail: isEn ? "Send a message" : "Me mande uma mensagem",
      href: siteConfig.social.whatsapp,
      icon: SiWhatsapp,
      color: "#25d366",
      external: true,
    },
    {
      label: "GitHub",
      detail: isEn ? "Explore my code" : "Explore meu código",
      href: siteConfig.social.github,
      icon: SiGithub,
      color: "#edeae4",
      external: true,
    },
    {
      label: "LinkedIn",
      detail: isEn ? "Connect with me" : "Vamos nos conectar",
      href: siteConfig.social.linkedin,
      icon: SiLinkedin,
      color: "#70b5f9",
      external: true,
    },
  ]

  return (
    <footer
      id="contato"
      className="viewport-stage footer-stage min-h-screen min-h-[100svh] min-h-[100dvh] border-t border-white/10 bg-[#111010] text-[#edeae4]"
    >
      <SectionCurtain variant="split" duration={0.9} />
      <div className="editorial-container footer-stage-layout h-full">
        <Reveal className="border-b border-white/15 pb-4 sm:pb-5">
          <div>
            <p className="editorial-label text-[#82aaff]">07 / {isEn ? "Contact" : "Contato"}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#8f8a84] sm:mt-3 sm:text-base">
              {isEn
                ? "Available for ambitious, useful work."
                : "Disponível para trabalhos ambiciosos e úteis."}
            </p>
          </div>
        </Reveal>

        <Reveal
          className="footer-cta-stage flex min-h-0 flex-col justify-center"
          distance={48}
          delay={0.08}
        >
          <p className="editorial-label mb-4 text-[#8d8984]">
            {isEn ? "Have a project in mind?" : "Tem um projeto em mente?"}
          </p>
          <a href={getMailtoUrl()} className="group block border-b border-white/25 pb-5 sm:pb-7">
            <span className="footer-cta relative block font-black uppercase leading-[0.76] tracking-[-0.085em]">
              <span className="footer-cta-word">{isEn ? "LET'S" : "VAMOS"}</span>
              <span className="footer-cta-word footer-cta-outline">
                {isEn ? "TALK." : "CONVERSAR."}
              </span>
            </span>
          </a>
        </Reveal>

        <div className="footer-bottom">
          <Reveal className="border-b border-white/15 pb-4 sm:pb-6" delay={0.14}>
            <nav
              className="footer-links"
              aria-label={isEn ? "Contact and social profiles" : "Contato e redes sociais"}
            >
              {contactLinks.map(({ label, detail, href, icon: Icon, color, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="footer-link"
                  style={{ "--contact-color": color } as React.CSSProperties}
                >
                  <Icon className="footer-link-icon" aria-hidden="true" />
                  <span className="footer-link-copy">
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </span>
                  {external && (
                    <span className="sr-only">
                      {isEn ? " (opens in a new tab)" : " (abre em nova aba)"}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </Reveal>

          <div className="flex items-center justify-between gap-4 pt-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8d8984] sm:pt-5 sm:text-[10px]">
            <span>
              © {new Date().getFullYear()} {siteConfig.legalName}
            </span>
            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
              }
              className="inline-flex min-h-11 shrink-0 items-center gap-2 uppercase transition-colors hover:text-white"
            >
              {isEn ? "Back to top" : "Voltar ao topo"}
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
