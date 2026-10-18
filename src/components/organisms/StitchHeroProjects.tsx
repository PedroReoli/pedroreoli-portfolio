import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchHeroProjects: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  // Relógio de telemetria ao vivo estilo cockpit / observatório
  const [timeStr, setTimeStr] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Partículas celestiais estelares geradas com posições estáticas determinísticas
  const stars = [
    { top: "12%", left: "15%", size: 3, delay: 0, duration: 2.8 },
    { top: "18%", left: "28%", size: 2, delay: 0.5, duration: 3.2 },
    { top: "22%", left: "78%", size: 4, delay: 0.2, duration: 2.5 },
    { top: "15%", left: "85%", size: 2, delay: 0.8, duration: 3.6 },
    { top: "35%", left: "8%", size: 3, delay: 1.1, duration: 3.0 },
    { top: "42%", left: "92%", size: 3, delay: 0.7, duration: 2.7 },
    { top: "68%", left: "12%", size: 2, delay: 0.3, duration: 3.4 },
    { top: "72%", left: "88%", size: 3, delay: 0.9, duration: 3.1 },
    { top: "80%", left: "22%", size: 4, delay: 1.4, duration: 2.9 },
    { top: "82%", left: "75%", size: 2, delay: 0.4, duration: 3.5 },
  ]

  const headlineWords = ["Pedro", "Lucas", "Reis"]

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 sm:px-8 py-12 overflow-hidden select-none"
    >
      {/* =========================================================================
          ATMOSFERA CELESTIAL & NUVENS VOLUMÉTRICAS (ESTILO THE LUÉ STUDIO)
          ========================================================================= */}

      {/* Partículas / Estrelas com Twinkle Cintilante Rápido e Fluido */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(186, 230, 253, 0.6)",
          }}
          animate={{
            opacity: [0.2, 0.95, 0.2],
            scale: [0.8, 1.3, 0.8],
            y: [0, -6, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      ))}

      {/* Brilho Radial Central Volumétrico */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] lg:w-[1300px] h-[500px] sm:h-[750px] bg-gradient-radial from-white/20 via-sky-300/10 to-transparent rounded-full blur-[100px] pointer-events-none"
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* Nuvens Suaves com Animação de Derivação Contínua Fluida */}
      <motion.div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[140%] h-80 sm:h-96 bg-gradient-to-t from-white/35 via-white/15 to-transparent blur-3xl pointer-events-none"
        animate={{
          x: ["-50%", "-48%", "-52%", "-50%"],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* Círculos Geométricos Cartográficos Celestes */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] lg:w-[1100px] h-[600px] sm:h-[850px] lg:h-[1100px] rounded-full border border-white/10 pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[600px] lg:w-[780px] h-[420px] sm:h-[600px] lg:h-[780px] rounded-full border border-dashed border-white/15 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {/* =========================================================================
          COORDENADAS FLUTUANTES NAS LATERAIS (ALTURA ELEVADA PARA NUNCA COLIDIR)
          ========================================================================= */}
      
      {/* Flanco Esquerdo: Coordenadas Cartográficas de Volta Redonda */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.2 }}
        className="absolute left-4 sm:left-8 xl:left-14 top-28 sm:top-36 hidden lg:flex flex-col items-start gap-1 font-code-inline text-[11px] text-white/70 tracking-widest pointer-events-none backdrop-blur-sm p-3 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm"
      >
        <div className="flex items-center gap-1.5 text-sky-200 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>LAT // 22.5235° S</span>
        </div>
        <span>LON // 44.1041° W</span>
        <span className="text-[9px] text-white/50 uppercase mt-0.5 tracking-wider font-semibold">
          VOLTA REDONDA &bull; BR
        </span>
      </motion.div>

      {/* Flanco Direito: Status Operacional & Relógio Telemetria Ao Vivo */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.2 }}
        className="absolute right-4 sm:right-8 xl:right-14 top-28 sm:top-36 hidden lg:flex flex-col items-end gap-1 font-code-inline text-[11px] text-white/70 tracking-widest pointer-events-none backdrop-blur-sm p-3 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm"
      >
        <span className="text-emerald-300 font-bold flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          DISPONÍVEL // FULL STACK
        </span>
        <div className="flex items-center gap-1 text-sky-200">
          <span className="text-white/60">BRT:</span>
          <span className="font-bold text-white tracking-wider">{timeStr || "17:30:00"}</span>
        </div>
        <span className="text-[9px] text-white/50 uppercase mt-0.5 tracking-wider font-semibold">
          UTC-3 // GLOBAL READY
        </span>
      </motion.div>

      {/* =========================================================================
          CONTEÚDO CENTRAL: FOTO EM CÍRCULO CENTRALIZADO + NOME MONUMENTAL + CARGO
          ========================================================================= */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto py-6 sm:py-8">
        
        {/* FOTO DENTRO DE UM CÍRCULO CENTRALIZADO COM HALO CELESTIAL DINÂMICO */}
        <motion.div
          initial={{ scale: 0.65, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 24, mass: 0.8 }}
          className="relative mb-6 sm:mb-8 cursor-pointer group"
        >
          {/* Brilho Pulsante Suave de Fundo */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-b from-white/50 via-sky-300/30 to-transparent blur-2xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />

          {/* Anel Externo Giratório: Arco Crescente Celestial */}
          <motion.div
            className="absolute -inset-4 sm:-inset-5 rounded-full border-2 border-white/20 border-t-white/90 border-r-transparent pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />

          {/* Anel Interno Pontilhado Contra-giratório */}
          <motion.div
            className="absolute -inset-7 sm:-inset-8 rounded-full border border-dashed border-white/25 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />

          {/* O Círculo Principal da Foto com Física de Hover Fluida */}
          <motion.div
            whileHover={{ scale: 1.06, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full p-2 bg-gradient-to-b from-white/90 via-white/35 to-white/70 shadow-[0_0_50px_rgba(255,255,255,0.45),0_20px_45px_rgba(8,28,68,0.5)] backdrop-blur-md"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[#164e9a] border-2 border-white/50 relative shadow-inner">
              <img
                src="/eu-profissional.png"
                alt="Pedro Lucas Reis"
                className="w-full h-full object-cover object-top contrast-[1.03] brightness-[1.02] group-hover:scale-108 transition-transform duration-500 ease-out"
                onError={(e) => {
                  const target = e.currentTarget
                  target.onerror = null
                  target.src =
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBtxYDrcM1Qy-1E_8i5XEtqLBXfxC-nfmr2bWSoBDeLxNRDIKnqG6Cb0HjTebAtdmDlKV2pgKz4RrFg1jPQki67K4EAM5K2Ns5qoSobeVk95EbeCRrlRVt1OqVKSgrkYWPjpsJP7OIGFYL-S8r_E97TiZxs194cTKwJuTeArEUiwXQDFnF63JyHrVPm1jBLV9KNi_Bc2l0F1yL8Q5dY1X8ZdIiumZ_CgKvfcmQKWp8--BYN_AHNaTV9"
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* NOME MONUMENTAL ESTILO DISPLAY SERIF (THE LUÉ STUDIO) — STAGGERED & INTERACTIVE */}
        <h1 className="font-serif font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-tight leading-none drop-shadow-[0_12px_45px_rgba(8,28,68,0.5)] flex flex-wrap justify-center items-center">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 28,
                delay: 0.12 + i * 0.08,
              }}
              whileHover={{
                y: -4,
                scale: 1.03,
                transition: { type: "spring", stiffness: 450, damping: 15 },
              }}
              className="inline-block transition-transform cursor-default"
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </h1>

        {/* CARGO ELEGANTE EMBAIXO DO NOME ESTILO "ALCHEMISTS OF THE INTERNET" */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.38 }}
          whileHover={{ scale: 1.01 }}
          className="font-serif italic font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 tracking-wide drop-shadow-[0_6px_25px_rgba(8,28,68,0.4)] mt-3 sm:mt-5 max-w-4xl px-4 cursor-default"
        >
          {isEn
            ? "Full Stack Software Engineer & Systems Architect"
            : "Engenheiro de Software Full Stack & Arquiteto de Sistemas"}
        </motion.p>

        {/* CONTROLES SUTIS DE AÇÃO COM FÍSICA SPRING RÁPIDA E MAGNÉTICA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 450, damping: 28, delay: 0.48 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mt-8 sm:mt-10 pointer-events-auto"
        >
          {/* Botão Explorar Engenharia */}
          <motion.a
            href="#reconhecimento-imprensa"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="px-6 py-3 rounded-full bg-white text-[#144b91] hover:bg-sky-50 font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-blue-950/30 active:scale-95 transition-colors cursor-pointer flex items-center gap-2 group border border-white/50"
          >
            <span>{isEn ? "Explore Engineering" : "Explorar Engenharia"}</span>
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="material-symbols-outlined text-[17px] text-[#144b91]"
            >
              arrow_downward
            </motion.span>
          </motion.a>

          {/* Botão WhatsApp Direct */}
          <motion.a
            href="https://wa.me/5524993264040?text=Ol%C3%A1%20Pedro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/35 font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-950/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>WhatsApp Direct</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Indicador Sutil de Rolagem Inferior estilo Mouse/Pill com Ponto Animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 pointer-events-none text-white/50 text-[10px] font-code-inline tracking-widest uppercase"
      >
        <span>SCROLL</span>
        <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-white"
            animate={{
              y: [0, 10, 0],
              opacity: [1, 0.2, 1],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default StitchHeroProjects
