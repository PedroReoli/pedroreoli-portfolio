import React, { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchHeroProjects: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [copied, setCopied] = useState(false)

  const emailToCopy = "pedrosousa2160@gmail.com"

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy)
      } else {
        const temp = document.createElement("input")
        temp.value = emailToCopy
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      id="hero"
      className="w-full min-h-[calc(100dvh-5rem)] flex flex-col justify-center py-6 sm:py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        
        {/* COLUNA ESQUERDA: FOTO COMPACTA (SQUIRCLE 3XL) + CONTROLES RÁPIDOS */}
        <motion.div variants={itemVariants} className="lg:col-span-4 xl:col-span-4 flex flex-col items-center gap-4">
          <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none aspect-[4/5] rounded-[2rem] overflow-hidden bg-surface-container shadow-[0_16px_40px_rgba(0,0,0,0.6)] border border-white/10 group">
            <img
              alt="Pedro Lucas Reis - Full Stack Architect"
              className="w-full h-full object-cover object-top filter grayscale contrast-[1.05] brightness-[0.95] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              src="/eu-profissional.png"
              onError={(e) => {
                const target = e.currentTarget
                target.onerror = null
                target.src =
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBtxYDrcM1Qy-1E_8i5XEtqLBXfxC-nfmr2bWSoBDeLxNRDIKnqG6Cb0HjTebAtdmDlKV2pgKz4RrFg1jPQki67K4EAM5K2Ns5qoSobeVk95EbeCRrlRVt1OqVKSgrkYWPjpsJP7OIGFYL-S8r_E97TiZxs194cTKwJuTeArEUiwXQDFnF63JyHrVPm1jBLV9KNi_Bc2l0F1yL8Q5dY1X8ZdIiumZ_CgKvfcmQKWp8--BYN_AHNaTV9"
              }}
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15] via-[#0d0f15]/30 to-transparent pointer-events-none" />

            {/* Status HUD Badge (Top-Left) */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute left-3" />
              <span className="font-label-caps text-[10px] tracking-wider uppercase ml-1 font-semibold text-emerald-300">
                SYS_ONLINE // ACTIVE
              </span>
            </div>

            {/* Localidade (Top-Right) */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-zinc-300 border border-white/10 text-[11px] font-code-inline">
              <span className="material-symbols-outlined text-[13px] text-cyan-400">near_me</span>
              <span>VR // RJ</span>
            </div>

            {/* Nome e Cargo ancorados no rodapé da foto */}
            <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-0.5">
              <span className="px-2 py-0.5 w-fit rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-label-caps text-[9px] uppercase tracking-wider">
                LEAD FULL STACK &amp; AI
              </span>
              <span className="font-headline-sm text-white font-bold text-lg leading-tight">
                Pedro Lucas Reis
              </span>
              <span className="font-body-sm text-zinc-400 text-xs">
                {isEn ? "Enterprise Systems Architect" : "Arquiteto de Sistemas Corporativos"}
              </span>
            </div>
          </div>

          {/* Ações Rápidas Diretas sob a foto */}
          <div className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none flex flex-col gap-2">
            <a
              className="w-full h-11 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 hover:text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
              href="https://wa.me/5524993264040?text=Ol%C3%A1%20Pedro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp (+55 24 99326-4040)</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full h-10 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white font-code-inline text-xs flex items-center justify-between transition-all cursor-pointer"
              title="Copiar e-mail"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="material-symbols-outlined text-[15px] text-cyan-400">mail</span>
                <span className="truncate">{emailToCopy}</span>
              </div>
              <span className={`font-label-caps text-[10px] uppercase font-bold ml-2 ${copied ? "text-emerald-400" : "text-zinc-400"}`}>
                {copied ? (isEn ? "COPIED!" : "COPIADO!") : (isEn ? "COPY" : "COPIAR")}
              </span>
            </button>
          </div>
        </motion.div>

        {/* COLUNA DIREITA: CONTEÚDO PUXADO À DIREITA, TELEMETRIA & PITCH */}
        <motion.div variants={itemVariants} className="lg:col-span-8 xl:col-span-8 flex flex-col gap-5">
          
          {/* Badges de Especialidade & Telemetria */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-label-caps text-[10px] tracking-wider uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SYS_VERIFIED // 2026
            </span>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-label-caps text-[10px] tracking-wider uppercase font-semibold">
              FULL STACK &amp; DISTRIBUTED
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-label-caps text-[10px] tracking-wider uppercase font-semibold">
              AGENTIC AI &amp; CDP
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-label-caps text-[10px] tracking-wider uppercase font-semibold">
              LOCAL-FIRST ARCHITECTURE
            </span>
          </div>

          {/* Título Monumental & Subtítulo */}
          <div className="flex flex-col gap-1.5">
            <h1 className="font-headline-lg text-white font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Pedro Lucas Reis
            </h1>
            <p className="font-headline-sm text-zinc-300 font-medium text-base sm:text-lg leading-relaxed">
              {isEn
                ? "Full Stack Software Engineer & Systems Architect specialized in high-scale ERP ecosystems, resilient microservices, and autonomous AI agents."
                : "Engenheiro de Software Full Stack & Arquiteto de Sistemas corporativos de alta escala, microsserviços tolerantes a falhas e interfaces densas de alto desempenho."}
            </p>
          </div>

          {/* Sumário Executivo de Engenharia */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container border border-white/10 shadow-sm flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="font-label-caps text-zinc-400 uppercase tracking-wider text-[11px] font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">verified</span>
                {isEn ? "EXECUTIVE OVERVIEW // 4+ YEARS EXP" : "VISÃO EXECUTIVA // 4+ ANOS DE ATUAÇÃO"}
              </span>
              <span className="font-code-inline text-[11px] text-cyan-400 font-medium">CORE VITALS 100</span>
            </div>
            <p className="font-body-md text-zinc-200 text-sm sm:text-base leading-relaxed">
              {isEn
                ? "4+ years engineering robust B2B platforms, SaaS multi-tenancy, and desktop-web integrations. Key expertise in Design Systems (500+ tokens), Core Web Vitals optimization, strict compiler-level TypeScript typing, and autonomous agent systems that reduce token costs by up to 92.2% via Chromium Accessibility Tree (AXTree) and Model Context Protocol (MCP)."
                : "Especialista em governança de código, Design Systems corporativos com mais de 500 tokens, otimização de render loops e arquitetura Clean/DDD. Ampla experiência na liderança técnica de soluções de faturamento, licenciamento SGSH de missão crítica e automações inteligentes com Chromium DevTools Protocol."}
            </p>
          </div>

          {/* Grid 2x2 Telemetria Arquitetural de Produção */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-surface-container border border-emerald-500/20 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">UPTIME HA</span>
                <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
              </div>
              <span className="font-headline-md text-emerald-400 font-bold text-xl sm:text-2xl">99.98%</span>
              <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">SLA Corporativo</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container border border-cyan-500/20 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">RENDER FCP</span>
                <span className="material-symbols-outlined text-[16px] text-cyan-400">bolt</span>
              </div>
              <span className="font-headline-md text-cyan-400 font-bold text-xl sm:text-2xl">&lt; 120ms</span>
              <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">V8 Optimized</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container border border-indigo-500/20 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">RECORDS DB</span>
                <span className="material-symbols-outlined text-[16px] text-indigo-400">database</span>
              </div>
              <span className="font-headline-md text-indigo-300 font-bold text-xl sm:text-2xl">12M+</span>
              <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">PostgreSQL Sync</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container border border-amber-500/20 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">STRICT TS</span>
                <span className="material-symbols-outlined text-[16px] text-amber-400">code</span>
              </div>
              <span className="font-headline-md text-amber-400 font-bold text-xl sm:text-2xl">100.0%</span>
              <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">Zero Any Policy</span>
            </div>
          </div>

          {/* Botões de Ação com Alto Contraste */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/projetos"
              className="flex-1 h-12 px-5 rounded-xl bg-white hover:bg-emerald-400 text-zinc-950 hover:text-zinc-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-white/5 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>{isEn ? "Explore Projects (Enterprise & AI)" : "Explorar Projetos (Corporativo & IA)"}</span>
            </Link>

            <a
              href="#dossie-tecnico"
              className="flex-1 h-12 px-5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 hover:border-white/25 text-zinc-100 hover:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-cyan-400">data_object</span>
              <span>{isEn ? "View Technical Dossier" : "Ver Dossiê Técnico"}</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Sutil indicador de scroll down */}
      <div className="hidden lg:flex items-center justify-center pt-8 text-zinc-500 hover:text-zinc-300 transition-colors">
        <a href="#dossie-tecnico" className="flex items-center gap-2 text-xs font-code-inline">
          <span>Rolar para Dossiê &amp; Destaques</span>
          <span className="material-symbols-outlined text-[16px] animate-bounce">arrow_downward</span>
        </a>
      </div>
    </motion.div>
  )
}

export default StitchHeroProjects
