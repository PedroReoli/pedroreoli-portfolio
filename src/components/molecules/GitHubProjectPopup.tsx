import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiX, FiExternalLink, FiGithub, FiCheckCircle, FiCpu, FiStar, FiLock } from "react-icons/fi"
import { useLanguage } from "../../i18n/useLanguage"
import type { PortfolioProject } from "../../types/portfolio"

interface GitHubProjectPopupProps {
  project: PortfolioProject | null
  onClose: () => void
}

export const GitHubProjectPopup: React.FC<GitHubProjectPopupProps> = ({ project, onClose }) => {
  const { language } = useLanguage()
  const popupRef = useRef<HTMLDivElement>(null)

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (project) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [project, onClose])

  if (!project) return null

  const isFlagship = Boolean(project.flagship)
  const hasValidGithub = Boolean(project.githubUrl && project.githubUrl.length > 0)
  const hasValidLive = Boolean(project.liveUrl && project.liveUrl.length > 0)

  const labels = language === "pt"
    ? {
        features: "Especificações & Arquitetura",
        metrics: "Indicadores Técnicos",
        technologies: "Stack Tecnológica",
        close: "Fechar",
        visit: "Acessar Projeto",
        github: "Ver Código",
        flagship: "Sistema Flagship",
        proprietary: "Código Proprietário Corporativo",
      }
    : {
        features: "Architecture & Specs",
        metrics: "Technical Metrics",
        technologies: "Tech Stack",
        close: "Close",
        visit: "Visit Project",
        github: "View Code",
        flagship: "Flagship System",
        proprietary: "Proprietary Enterprise Code",
      }

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#0e111a] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-5 sm:p-7 text-white"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label={labels.close}
          >
            <FiX className="text-base" />
          </button>

          {/* Header */}
          <div className="pr-10 mb-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {isFlagship ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-[11px] font-mono font-bold">
                  <FiStar className="text-xs fill-[#10b981]" />
                  {labels.flagship}
                </span>
              ) : null}
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-zinc-300">
                {project.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight leading-tight">
              {project.name}
            </h3>

            <p className="text-xs font-mono text-[#38bdf8] mt-1">
              {project.domain}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-5">
            {project.shortDescription}
          </p>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block mb-2">
                {labels.metrics}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#090b10] border border-white/[0.08]"
                  >
                    <span className="block text-[10px] font-mono text-zinc-500 uppercase">
                      {m.label}
                    </span>
                    <strong className="block text-xs font-heading text-white mt-0.5">
                      {m.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Deliverables */}
          {project.features && project.features.length > 0 && (
            <div className="mb-5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block mb-2 flex items-center gap-1.5">
                <FiCpu className="text-xs text-[#10b981]" />
                {labels.features}
              </span>
              <ul className="space-y-2">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans leading-relaxed">
                    <FiCheckCircle className="text-[#10b981] w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-6">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block mb-2">
              {labels.technologies}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {hasValidLive && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 font-heading text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <FiExternalLink className="text-xs" />
                  <span>{labels.visit}</span>
                </a>
              )}

              {hasValidGithub && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#141824] hover:bg-[#1c2234] text-white border border-white/20 text-xs font-mono font-medium transition-all flex items-center gap-1.5"
                >
                  <FiGithub className="text-xs" />
                  <span>{labels.github}</span>
                </a>
              )}

              {project.isProprietary && !hasValidGithub && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] text-[11px] font-mono text-zinc-400 border border-white/[0.08]">
                  <FiLock className="text-amber-400 text-xs" />
                  {labels.proprietary}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              {labels.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default GitHubProjectPopup
