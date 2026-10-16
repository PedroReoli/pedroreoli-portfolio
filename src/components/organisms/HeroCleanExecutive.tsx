import React from "react"
import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"
import { FiGithub, FiLinkedin, FiMapPin } from "react-icons/fi"
import { useLanguage } from "../../i18n/useLanguage"
import * as portfolioPT from "../../data/portfolio"
import * as portfolioEN from "../../data/portfolio.en"

export const HeroCleanExecutive: React.FC = () => {
  const { language } = useLanguage()
  const profile = language === "pt" ? portfolioPT.profile : portfolioEN.profile

  const content = language === "pt"
    ? {
        role: "Full Stack Software Engineer & Tech Lead",
        tagline: "Frontend Architecture • APIs REST • Cloud & AWS • Sistemas de IA",
        summary: "Engenheiro Full Stack com 4 anos de experiência na concepção e escala de ecossistemas corporativos ERP, plataformas SaaS multi-tenant e agentes de IA autônomos. Especialista em Design Systems escaláveis (-70% no ciclo de dev) e interfaces de alta performance.",
        whatsappCta: "Conversar no WhatsApp",
        githubCta: "GitHub",
        linkedinCta: "LinkedIn",
      }
    : {
        role: "Full Stack Software Engineer & Tech Lead",
        tagline: "Frontend Architecture • REST APIs • Cloud & AWS • AI Systems",
        summary: "Full Stack Software Engineer with ~4 years of experience architecting enterprise ERP ecosystems, multi-tenant SaaS platforms, and autonomous AI agents. Specialist in unified Design Systems (-70% dev cycle) and high-performance web applications.",
        whatsappCta: "Chat on WhatsApp",
        githubCta: "GitHub",
        linkedinCta: "LinkedIn",
      }

  return (
    <section id="about" className="relative w-full min-h-[100dvh] flex flex-col justify-center py-20 sm:py-24 overflow-hidden bg-[#07080b] border-b border-white/[0.06] scroll-mt-16 sm:scroll-mt-20">
      {/* Luz ambiente sutil monocromática/esmeralda */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-gradient-to-b from-emerald-500/[0.04] via-transparent to-transparent blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full my-auto">
        
        {/* =========================================================================
            BLOCO PRINCIPAL DA HERO: FOTO MAIOR, HIERARQUIA RÁPIDA E CLARA
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Lado Esquerdo: Tipografia Direta e Apresentação Executiva */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
            
            {/* Tag / Role */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono font-medium text-zinc-300 tracking-wider uppercase mb-4 sm:mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>{content.role}</span>
            </motion.div>

            {/* Título Monumental e Limpo */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
              className="text-4xl sm:text-6xl md:text-7xl font-heading font-black text-white tracking-tight leading-[0.95] mb-3.5 uppercase"
            >
              Pedro Lucas Reis
            </motion.h1>

            {/* Tagline / Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl font-heading font-semibold text-zinc-200 mb-3 max-w-2xl leading-snug"
            >
              {content.tagline}
            </motion.p>

            {/* Bio Direta e Focada em Resultados */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12, ease: "easeOut" }}
              className="text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed max-w-2xl mb-6"
            >
              {content.summary}
            </motion.p>

            {/* Core Tech Stack - Tipografia Limpa sem Badges Poluídos */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-7 text-xs sm:text-sm font-mono text-zinc-300"
            >
              <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[11px] mr-1">
                Core Stack:
              </span>
              <span className="text-zinc-200 font-medium">TypeScript</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-200 font-medium">React & Next.js</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-200 font-medium">Node.js & NestJS</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-200 font-medium">PostgreSQL</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-200 font-medium">AWS & MCP IA</span>
            </motion.div>

            {/* CTAs Diretos */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.18, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 w-full sm:w-auto"
            >
              <a
                href={profile.phoneHref}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] min-h-[44px]"
              >
                <FaWhatsapp className="text-black text-lg" />
                <span>{content.whatsappCta}</span>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/10 transition-all min-h-[44px]"
              >
                <FiGithub className="text-base" />
                <span>{content.githubCta}</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/10 transition-all min-h-[44px]"
              >
                <FiLinkedin className="text-base text-zinc-300" />
                <span>{content.linkedinCta}</span>
              </a>
            </motion.div>

          </div>

          {/* Lado Direito: Foto de Perfil Maior e Destaque Executivo */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="relative"
            >
              {/* Foto com proporção maior e acabamento refinado */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-84 lg:h-84 xl:w-96 xl:h-96 rounded-3xl overflow-hidden border border-white/[0.15] bg-[#0c0f16] shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative group">
                <img
                  src="/eu-profissional.png"
                  alt={profile.name}
                  loading="eager"
                  className="w-full h-full object-cover object-center contrast-[1.05] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080b]/70 via-transparent to-transparent opacity-50" />
              </div>

              {/* Badge com localização e status */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
                <FiMapPin className="text-[#10b981] text-xs shrink-0" />
                <span>{profile.location}</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default HeroCleanExecutive
