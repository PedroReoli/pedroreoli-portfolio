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
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      id="hero-projetos"
      className="flex flex-col w-full pb-12 gap-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* SECTION: HERO WIDESCREEN MONUMENTAL (HORIZONTAL GRID) */}
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* COLUNA ESQUERDA: FOTO COMPACTA (SQUIRCLE 3XL) + CONTROLES RÁPIDOS */}
          <motion.div variants={itemVariants} className="lg:col-span-4 xl:col-span-4 flex flex-col items-center gap-4">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none aspect-[4/5] rounded-[2rem] overflow-hidden bg-surface-container shadow-[0_16px_40px_rgba(0,0,0,0.6)] border border-white/10 group">
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
            <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none flex flex-col gap-2">
              <a
                className="w-full h-11 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 hover:text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
                href="https://wa.me/5524993264040?text=Ol%C3%A1%20Pedro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>WhatsApp (+55 24 99326-4040)</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full h-10 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white font-code-inline text-xs flex items-center justify-between transition-all cursor-pointer"
                title="Copiar e-mail"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="material-symbols-outlined text-[16px] text-cyan-400">mail</span>
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
              {/* Telemetria 1: Uptime */}
              <div className="p-3.5 rounded-2xl bg-surface-container border border-emerald-500/20 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">UPTIME HA</span>
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
                </div>
                <span className="font-headline-md text-emerald-400 font-bold text-xl sm:text-2xl">99.98%</span>
                <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">SLA Corporativo</span>
              </div>

              {/* Telemetria 2: Latência */}
              <div className="p-3.5 rounded-2xl bg-surface-container border border-cyan-500/20 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">RENDER FCP</span>
                  <span className="material-symbols-outlined text-[16px] text-cyan-400">bolt</span>
                </div>
                <span className="font-headline-md text-cyan-400 font-bold text-xl sm:text-2xl">&lt; 120ms</span>
                <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">V8 Optimized</span>
              </div>

              {/* Telemetria 3: Volume de Dados */}
              <div className="p-3.5 rounded-2xl bg-surface-container border border-indigo-500/20 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">RECORDS DB</span>
                  <span className="material-symbols-outlined text-[16px] text-indigo-400">database</span>
                </div>
                <span className="font-headline-md text-indigo-300 font-bold text-xl sm:text-2xl">12M+</span>
                <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">PostgreSQL Sync</span>
              </div>

              {/* Telemetria 4: Tipagem Estrita */}
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
                <span>{isEn ? "Explore All Projects" : "Explorar Todos os Projetos"}</span>
              </Link>

              <Link
                to="/dossie-tecnico"
                className="flex-1 h-12 px-5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 hover:border-white/25 text-zinc-100 hover:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-cyan-400">data_object</span>
                <span>{isEn ? "View Technical Dossier" : "Ver Dossiê Técnico"}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO RESUMO AUTOCOM3 CORPORATIVO NA HOME */}
      <motion.section variants={itemVariants} className="w-full">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-surface-container via-surface-container-low to-surface border border-cyan-500/20 shadow-xl flex flex-col gap-6 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-label-caps text-[10px] uppercase font-bold tracking-wider border border-cyan-500/30">
                  CASE DE ENGENHARIA CORPORATIVA
                </span>
                <span className="font-code-inline text-[11px] text-zinc-400">PROD_SCALE</span>
              </div>
              <h2 className="font-headline-lg text-white font-bold text-2xl sm:text-3xl tracking-tight">
                Ecossistema Corporativo Autocom3
              </h2>
            </div>

            <Link
              to="/projetos?tipo=corporativo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm shadow-md shadow-cyan-500/20 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
            >
              <span>{isEn ? "View Complete Case" : "Ver Case Completo (6 Módulos)"}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <p className="font-body-md text-zinc-300 text-sm sm:text-base leading-relaxed relative z-10">
            {isEn
              ? "Multi-module enterprise ERP platform powering retail and wholesale operations. Unified operations center with 25+ submodules, mission-critical license lifecycle (SGSH), automated pricing pipelines, and sub-second multi-tenant data synchronization."
              : "Plataforma corporativa de gestão e licenciamento multi-setorial que gerencia 25+ submódulos essenciais de retaguarda, controle de licenças em tempo real (SGSH), propostas comerciais e barramento de eventos entre desktop e nuvem com zero downtime."}
          </p>

          {/* 4 Métricas de Destaque */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-white/5 flex flex-col">
              <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">PDVs Ativos</span>
              <span className="font-headline-md text-cyan-400 font-bold text-2xl sm:text-3xl mt-1">15k+</span>
              <span className="font-code-inline text-[10px] text-zinc-400">Em produção nacional</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-white/5 flex flex-col">
              <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">GMV Transacionado</span>
              <span className="font-headline-md text-emerald-400 font-bold text-2xl sm:text-3xl mt-1">R$ 42M+</span>
              <span className="font-code-inline text-[10px] text-zinc-400">Por mês auditado</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-white/5 flex flex-col">
              <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">Módulos Unificados</span>
              <span className="font-headline-md text-indigo-300 font-bold text-2xl sm:text-3xl mt-1">25+</span>
              <span className="font-code-inline text-[10px] text-zinc-400">Operações integradas</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-white/5 flex flex-col">
              <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">Latência de Sync</span>
              <span className="font-headline-md text-amber-400 font-bold text-2xl sm:text-3xl mt-1">&lt; 320ms</span>
              <span className="font-code-inline text-[10px] text-zinc-400">WebSocket / DB ACID</span>
            </div>
          </div>

          {/* Preview Screenshot com Moldura Industrial */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-surface-container-lowest relative group">
            <img
              src="/portfolio-autocom3/01-painel-operacoes-visao-geral.png"
              alt="Autocom3 - Painel Central de Operações"
              className="w-full h-auto object-cover max-h-[380px] group-hover:scale-[1.01] transition-transform duration-300"
              onError={(e) => {
                const target = e.currentTarget
                target.onerror = null
                target.src = "/portal-cliente.png"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15]/90 via-transparent to-transparent flex items-end p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2">
                <div>
                  <span className="font-label-caps text-cyan-300 uppercase text-xs font-semibold">
                    PAINEL CENTRAL DE OPERAÇÕES &amp; LICENCIAMENTO
                  </span>
                  <p className="font-body-sm text-zinc-300 text-xs">
                    Interface modularizada com filtros por semelhança de áreas e controle RBAC.
                  </p>
                </div>
                <Link
                  to="/projetos?tipo=corporativo"
                  className="px-4 py-2 rounded-xl bg-white hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  Ver Todos os 6 Módulos &amp; Blueprints →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SEÇÃO PROJETOS GERAIS & FLAGSHIP (2 COLUNAS WIDESCREEN) */}
      <motion.section variants={itemVariants} className="w-full flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-[22px]">rocket_launch</span>
            <h2 className="font-headline-lg text-white font-bold text-2xl sm:text-3xl tracking-tight">
              {isEn ? "Flagship & Open Source Projects" : "Projetos de Destaque & Inovação"}
            </h2>
          </div>
          <span className="font-code-inline text-xs text-zinc-400 hidden sm:inline">
            CORE_REPOS // 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PROJETO 1: Organon OS */}
          <article className="rounded-3xl bg-surface-container border border-indigo-500/20 p-6 flex flex-col justify-between shadow-lg hover:border-indigo-500/50 transition-all group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-label-caps text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30">
                  LOCAL-FIRST OS
                </span>
                <span className="font-code-inline text-[11px] text-zinc-400">OFFLINE CRDT</span>
              </div>
              <h3 className="font-headline-md text-white font-bold text-xl group-hover:text-indigo-300 transition-colors">
                Organon OS
              </h3>
              <p className="font-body-md text-zinc-300 text-sm leading-relaxed">
                {isEn
                  ? "Local-first operational knowledge system with bidirectional graph synchronization, native SQLite WAL, and zero third-party cloud telemetry."
                  : "Sistema operacional de conhecimento local-first com grafo bidirecional de notas, sincronização CRDT offline, banco SQLite WAL local e privacidade criptográfica absoluta."}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">Tauri v2</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">Rust</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">React 19</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">SQLite WAL</span>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
              <a
                href="https://github.com/PedroReoli/organon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high hover:bg-white text-zinc-200 hover:text-zinc-950 font-bold text-xs transition-all cursor-pointer border border-white/10"
              >
                <span className="material-symbols-outlined text-[16px]">code</span>
                <span>GitHub Repo</span>
              </a>
              <span className="font-code-inline text-[11px] text-emerald-400">100% Privacy</span>
            </div>
          </article>

          {/* PROJETO 2: Achilles CDP Agent */}
          <article className="rounded-3xl bg-surface-container border border-cyan-500/20 p-6 flex flex-col justify-between shadow-lg hover:border-cyan-500/50 transition-all group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-label-caps text-[10px] font-bold uppercase tracking-wider border border-cyan-500/30">
                  AI AGENTIC PROTOCOL
                </span>
                <span className="font-code-inline text-[11px] text-emerald-400 font-semibold">-92.2% TOKENS</span>
              </div>
              <h3 className="font-headline-md text-white font-bold text-xl group-hover:text-cyan-300 transition-colors">
                Achilles CDP Agent
              </h3>
              <p className="font-body-md text-zinc-300 text-sm leading-relaxed">
                {isEn
                  ? "Autonomous browser navigation engine that bypasses raw HTML and directly intercepts Chromium's Accessibility Tree (AXTree), drastically cutting token overhead."
                  : "Motor autônomo de navegação web que intercepta a Árvore de Acessibilidade (AXTree) via protocolo CDP, reduzindo o payload de 240k para 18.7k tokens por passo."}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">Chrome DevTools Protocol</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">Node.js</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">MCP Server</span>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
              <a
                href="https://github.com/PedroReoli/Achilles-CDP-Agent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high hover:bg-white text-zinc-200 hover:text-zinc-950 font-bold text-xs transition-all cursor-pointer border border-white/10"
              >
                <span className="material-symbols-outlined text-[16px]">code</span>
                <span>GitHub Repo</span>
              </a>
              <span className="font-code-inline text-[11px] text-cyan-400">41ms Avg Latency</span>
            </div>
          </article>

          {/* PROJETO 3: Fala Atípica */}
          <article className="rounded-3xl bg-surface-container border border-emerald-500/20 p-6 flex flex-col justify-between shadow-lg hover:border-emerald-500/50 transition-all group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-label-caps text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  HEALTHCARE &amp; NEURODIVERSITY
                </span>
                <span className="font-code-inline text-[11px] text-zinc-400">LOCAL SPEECH</span>
              </div>
              <h3 className="font-headline-md text-white font-bold text-xl group-hover:text-emerald-300 transition-colors">
                Fala Atípica
              </h3>
              <p className="font-body-md text-zinc-300 text-sm leading-relaxed">
                {isEn
                  ? "Augmentative and Alternative Communication (AAC) platform for non-verbal individuals, featuring on-device speech synthesis and offline storage."
                  : "Plataforma de Comunicação Alternativa e Aumentativa (CAA) para pessoas neurodivergentes com síntese de voz local, símbolos pictográficos e zero latência."}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">Next.js</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">Web Audio API</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">IndexedDB</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">WAI-ARIA AAA</span>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
              <a
                href="https://github.com/PedroReoli/Fala-Atipica"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high hover:bg-white text-zinc-200 hover:text-zinc-950 font-bold text-xs transition-all cursor-pointer border border-white/10"
              >
                <span className="material-symbols-outlined text-[16px]">code</span>
                <span>GitHub Repo</span>
              </a>
              <span className="font-code-inline text-[11px] text-emerald-400">Acessível AAA</span>
            </div>
          </article>

          {/* PROJETO 4: GeoAmbiental VR */}
          <article className="rounded-3xl bg-surface-container border border-amber-500/20 p-6 flex flex-col justify-between shadow-lg hover:border-amber-500/50 transition-all group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-label-caps text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                  SPATIAL COMPUTING &amp; 3D
                </span>
                <span className="font-code-inline text-[11px] text-zinc-400">60 FPS WEBGL</span>
              </div>
              <h3 className="font-headline-md text-white font-bold text-xl group-hover:text-amber-300 transition-colors">
                GeoAmbiental VR
              </h3>
              <p className="font-body-md text-zinc-300 text-sm leading-relaxed">
                {isEn
                  ? "Interactive spatial environmental simulation engine with real-time geospatial rendering, shaders, and microclimate forecasting visualizations."
                  : "Simulador espacial 3D para dados climáticos e ambientais de alta densidade com renderização WebGL em 60 FPS e shaders customizados."}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">Three.js</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">WebGL</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">GLSL Shaders</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-300 font-code-inline text-[11px]">TypeScript</span>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
              <a
                href="https://github.com/PedroReoli/GeoAmbientalVR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high hover:bg-white text-zinc-200 hover:text-zinc-950 font-bold text-xs transition-all cursor-pointer border border-white/10"
              >
                <span className="material-symbols-outlined text-[16px]">code</span>
                <span>GitHub Repo</span>
              </a>
              <span className="font-code-inline text-[11px] text-amber-400">Zero Framedrop</span>
            </div>
          </article>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default StitchHeroProjects
