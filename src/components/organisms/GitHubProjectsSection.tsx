import React, { useState } from "react"
import { motion } from "framer-motion"
import * as portfolioPT from "../../data/portfolio"
import * as portfolioEN from "../../data/portfolio.en"
import GitHubProjectPopup from "../molecules/GitHubProjectPopup"
import { 
  FiExternalLink, 
  FiGithub, 
  FiLayers, 
  FiCheckCircle, 
  FiLock,
  FiPlay,
  FiVideo,
  FiMaximize2
} from "react-icons/fi"
import { useLanguage } from "../../i18n/useLanguage"
import type { PortfolioProject } from "../../types/portfolio"

export const GitHubProjectsSection: React.FC = () => {
  const { language } = useLanguage()
  const projects: readonly PortfolioProject[] = language === "pt" ? portfolioPT.projects : portfolioEN.projects
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)

  const flagshipProjects = projects.filter((p) => p.group === "flagship" || (p.flagship && !p.group))
  const freelanceProjects = projects.filter((p) => p.group === "freelance")
  const corporateProjects = projects.filter((p) => p.group === "modules")

  const labels = language === "pt"
    ? {
        flagshipKicker: "ENGENHARIA DE SISTEMAS // FLAGSHIP SHOWCASE",
        flagshipTitle: "Sistemas Principais em Produção",
        flagshipDescription: "Plataformas de alta escala, aplicações desktop e motores de inteligência artificial autônomos com arquitetura de missão crítica.",
        viewArch: "Arquitetura & Especificações",
        visitSite: "Acessar Projeto",
        viewGithub: "Código no GitHub",
        proprietaryBadge: "Código Proprietário Corporativo",
        internalBadge: "Ambiente Corporativo Interno",
        videoSlotLabel: "Espaço de Demonstração em Vídeo",
        playVideo: "Assistir Demonstração",
        videoFormat: "MP4 // 1080p",
        
        corporateKicker: "AUTOMAÇÃO COMERCIAL // ENGENHARIA ERP",
        corporateTitle: "Projetos Corporativos",
        corporateDescription: "Módulos de retaguarda, autoatendimento e mensageria distribuída integrados ao ecossistema ERP, atendendo mais de 20 organizações ativas.",
        
        freelanceKicker: "PROJETOS SOB DEMANDA // FRONT-END & ACESSIBILIDADE",
        freelanceTitle: "Aplicações Web & Interfaces",
        freelanceDescription: "Aplicações web modernas desenvolvidas com foco em acessibilidade (WCAG), alta fidelidade visual e carregamento instantâneo.",
      }
    : {
        flagshipKicker: "SYSTEMS ENGINEERING // FLAGSHIP SHOWCASE",
        flagshipTitle: "Core Production Systems",
        flagshipDescription: "Large-scale platforms, desktop applications, and autonomous AI engines built with mission-critical architecture.",
        viewArch: "Architecture & Specs",
        visitSite: "Visit Project",
        viewGithub: "Code on GitHub",
        proprietaryBadge: "Proprietary Enterprise Code",
        internalBadge: "Internal Corporate Environment",
        videoSlotLabel: "Video Showcase Frame",
        playVideo: "Watch Demonstration",
        videoFormat: "MP4 // 1080p",
        
        corporateKicker: "ENTERPRISE AUTOMATION // ERP ARCHITECTURE",
        corporateTitle: "Corporate Projects",
        corporateDescription: "Backoffice, self-service, and distributed messaging modules integrated into the ERP ecosystem, serving 20+ active organizations.",
        
        freelanceKicker: "CLIENT PROJECTS // FRONTEND & ACCESSIBILITY",
        freelanceTitle: "Web Applications & Interfaces",
        freelanceDescription: "Modern web applications built with a focus on WCAG accessibility guidelines, visual fidelity, and instant load times.",
      }

  return (
    <>
      {/* =========================================================================
          SEÇÃO 1: SISTEMAS PRINCIPAIS / FLAGSHIPS (OCUPA A TELA INDIVIDUALMENTE)
          ========================================================================= */}
      <section 
        id="projects" 
        className="w-full min-h-[100dvh] flex flex-col justify-center py-20 sm:py-28 bg-[#07080b] text-[#ffffff] border-b border-white/[0.06] relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      >
        {/* Luz ambiente sutil */}
        <div 
          className="absolute top-1/4 right-0 w-[550px] h-[450px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full my-auto">
          {/* Header da Seção */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] uppercase tracking-wider font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              {labels.flagshipKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
              {labels.flagshipTitle}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 font-sans leading-relaxed">
              {labels.flagshipDescription}
            </p>
          </motion.div>

          {/* Cards dos Flagships (2 Sistemas Principais: Organon e Achilles) */}
          <div className="space-y-16 sm:space-y-20">
            {flagshipProjects.map((project, idx) => {
              const hasValidGithub = Boolean(project.githubUrl && project.githubUrl.length > 0)
              const hasValidLive = Boolean(project.liveUrl && project.liveUrl.length > 0)

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-9 rounded-3xl bg-[#0c0f16] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-2xl"
                >
                  {/* Lado Esquerdo: Engenharia, Métricas e Arquitetura */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="text-xs font-mono font-bold text-[#10b981] tracking-wider">
                          SISTEMA 0{idx + 1} //
                        </span>
                        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wide">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight leading-tight mb-3">
                        {project.name}
                      </h3>

                      <p className="text-sm text-zinc-300 font-sans leading-relaxed mb-5">
                        {project.shortDescription}
                      </p>

                      {/* Lista de Recursos Técnicos Reais */}
                      <div className="space-y-2.5 mb-6">
                        {project.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                            <FiCheckCircle className="text-[#10b981] w-4 h-4 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Métricas Reais do Projeto */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {project.metrics.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-3 rounded-xl bg-black/40 border border-white/[0.06]"
                            >
                              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-0.5">
                                {m.label}
                              </span>
                              <strong className="text-sm font-heading font-bold text-white block">
                                {m.value}
                              </strong>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Stack em linha tipográfica limpa (sem poluição de badges) */}
                      <div className="text-xs font-mono text-zinc-400 mb-6 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-zinc-500 uppercase text-[11px] font-semibold">Stack:</span>
                        <span className="text-zinc-200">{project.stack.slice(0, 6).join(" • ")}</span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.06]">
                      {hasValidGithub && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium text-xs sm:text-sm flex items-center gap-2 border border-white/10 transition-colors"
                        >
                          <FiGithub className="text-sm" />
                          <span>{labels.viewGithub}</span>
                        </a>
                      )}

                      {hasValidLive && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                        >
                          <FiExternalLink className="text-sm" />
                          <span>{labels.visitSite}</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 border border-white/10 transition-colors"
                      >
                        <FiLayers className="text-sm text-[#10b981]" />
                        <span>{labels.viewArch}</span>
                      </button>
                    </div>
                  </div>

                  {/* Lado Direito: Preview Visual / Terminal Executivo */}
                  <div className="lg:col-span-6">
                    <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl relative group">
                      <div className="px-4 py-2.5 bg-[#0f131c] border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                          <span className="ml-2 text-[11px] font-mono text-zinc-400">
                            {project.domain}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#10b981] uppercase tracking-wide">
                          produção // live
                        </span>
                      </div>

                      <div className="relative aspect-[16/10] overflow-hidden bg-[#07090e]">
                        <img
                          src={project.image}
                          alt={project.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: PROJETOS CORPORATIVOS (AUTOCOM3) - OCUPA A TELA INDIVIDUALMENTE
          Contém exatamente os 6 sistemas solicitados com espaço dedicado para vídeos:
          1. Portal do Contador, 2. Portal do Cliente, 3. Mobile, 4. AC3 Flex, 5. Gestão de Propostas, 6. Admin
          ========================================================================= */}
      <section 
        id="corporate" 
        className="w-full min-h-[100dvh] flex flex-col justify-center py-20 sm:py-28 bg-[#07080b] text-[#ffffff] border-b border-white/[0.06] relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      >
        {/* Luz ambiente sutil */}
        <div 
          className="absolute bottom-1/4 left-0 w-[550px] h-[450px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full my-auto">
          {/* Header da Seção */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] uppercase tracking-wider font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              {labels.corporateKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
              {labels.corporateTitle}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 font-sans leading-relaxed">
              {labels.corporateDescription}
            </p>
          </motion.div>

          {/* Grid dos 6 Projetos Corporativos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {corporateProjects.map((project, idx) => {
              const isPlaying = playingVideoId === project.id
              const videoSource = project.videoUrl || (idx % 2 === 0 ? "/a.mp4" : "/a-cartao.mp4")

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: idx * 0.05, ease: "easeOut" }}
                  className="rounded-2xl sm:rounded-3xl bg-[#0c0f16] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* =========================================================
                        ESPAÇO DEDICADO PARA VÍDEOS (SHOWCASE FRAME)
                        ========================================================= */}
                    <div className="relative aspect-[16/10] bg-black/80 border-b border-white/[0.08] overflow-hidden">
                      {isPlaying ? (
                        <video
                          src={videoSource}
                          poster={project.image}
                          controls
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="relative w-full h-full group/video">
                          <img
                            src={project.image}
                            alt={project.name}
                            loading="lazy"
                            className="w-full h-full object-cover object-top opacity-75 group-hover/video:opacity-90 group-hover/video:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

                          {/* Header do Player */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 backdrop-blur-md text-zinc-300">
                              <FiVideo className="text-[#10b981]" />
                              <span>{labels.videoFormat}</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 backdrop-blur-md text-zinc-400">
                              {project.domain}
                            </span>
                          </div>

                          {/* Botão de Play Central */}
                          <button
                            type="button"
                            onClick={() => setPlayingVideoId(project.id)}
                            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#10b981] hover:bg-[#059669] text-black flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.7)] group-hover/video:scale-110 transition-all duration-200 z-10"
                            title={labels.playVideo}
                            aria-label={`${labels.playVideo}: ${project.name}`}
                          >
                            <FiPlay className="text-black text-lg ml-0.5 fill-black" />
                          </button>

                          {/* Legenda de Ação no Rodapé do Vídeo */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 z-10">
                            <span className="text-zinc-400">{labels.videoSlotLabel}</span>
                            <span className="text-[#10b981] font-semibold flex items-center gap-1">
                              <FiMaximize2 className="text-xs" /> Demo
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Informações Técnicas e Funcionais do Módulo */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono text-[#10b981] uppercase tracking-wider font-semibold">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                          <FiLock className="text-zinc-600 text-xs" /> Corporativo
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white group-hover:text-[#10b981] transition-colors leading-snug mb-2.5">
                        {project.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-4">
                        {project.shortDescription}
                      </p>

                      {/* Métricas Principais */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {project.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase block">{m.label}</span>
                              <strong className="text-xs font-heading font-bold text-white block mt-0.5">{m.value}</strong>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Stack em linha tipográfica limpa */}
                      <div className="text-xs font-mono text-zinc-400">
                        <span className="text-zinc-500 text-[10px] uppercase font-semibold mr-1.5">Stack:</span>
                        <span className="text-zinc-300">{project.stack.slice(0, 4).join(" • ")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ações no Rodapé do Card */}
                  <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-200 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
                    >
                      <FiLayers className="text-xs text-[#10b981]" />
                      <span>{labels.viewArch}</span>
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-[#10b981] hover:text-[#34d399] flex items-center gap-1.5 transition-colors"
                      >
                        <span>{labels.visitSite}</span>
                        <FiExternalLink className="text-xs" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: APLICAÇÕES WEB FREELANCE (OCUPA A TELA INDIVIDUALMENTE)
          Fala Atípica e GeoAmbiental VR (Doce Norte completamente removido)
          ========================================================================= */}
      <section 
        id="freelance" 
        className="w-full min-h-[100dvh] flex flex-col justify-center py-20 sm:py-28 bg-[#07080b] text-[#ffffff] border-b border-white/[0.06] relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full my-auto">
          {/* Header da Seção */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] uppercase tracking-wider font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              {labels.freelanceKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
              {labels.freelanceTitle}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 font-sans leading-relaxed">
              {labels.freelanceDescription}
            </p>
          </motion.div>

          {/* Grid Simétrico de 2 Colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
            {freelanceProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                className="p-6 sm:p-8 rounded-3xl bg-[#0c0f16] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-[#10b981] uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {project.domain}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white group-hover:text-[#10b981] transition-colors leading-snug mb-3">
                    {project.name}
                  </h3>

                  <p className="text-sm text-zinc-300 font-sans leading-relaxed mb-5">
                    {project.shortDescription}
                  </p>

                  {/* Entregáveis Técnicos */}
                  <div className="space-y-2 mb-5">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                        <FiCheckCircle className="text-[#10b981] w-4 h-4 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Métricas */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-0.5">{m.label}</span>
                          <strong className="text-xs font-heading font-bold text-white block">{m.value}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stack */}
                  <div className="text-xs font-mono text-zinc-400 mb-6">
                    <span className="text-zinc-500 text-[11px] uppercase font-semibold mr-1.5">Stack:</span>
                    <span className="text-zinc-200">{project.stack.join(" • ")}</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-200 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <FiLayers className="text-xs text-[#10b981]" />
                    <span>{labels.viewArch}</span>
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <FiGithub className="text-xs" />
                      <span>{labels.viewGithub}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pop-up Flutuante com Especificações Técnicas (Zero modal pesado) */}
      <GitHubProjectPopup
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}

export default GitHubProjectsSection
