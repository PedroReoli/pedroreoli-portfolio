import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchHeroProjects: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden select-none"
    >
      {/* =========================================================================
          ATMOSFERA CELESTIAL & NUVENS VOLUMÉTRICAS (ESTILO THE LUÉ STUDIO)
          ========================================================================= */}
      
      {/* Gradiente Radial de Luz Celestial Central */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[600px] sm:h-[800px] bg-gradient-radial from-white/20 via-sky-300/10 to-transparent rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true" 
      />

      {/* Camadas de Nuvens Especiais com Blur e Transparência */}
      <div 
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-72 sm:h-96 bg-gradient-to-t from-white/30 via-white/15 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 -left-20 w-80 sm:w-[480px] h-64 sm:h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 -right-20 w-80 sm:w-[480px] h-64 sm:h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Linhas de Coordenadas e Círculos Geométricos Astrológicos/Cartográficos */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] sm:w-[780px] md:w-[980px] h-[580px] sm:h-[780px] md:h-[980px] rounded-full border border-white/10 pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[520px] md:w-[680px] h-[380px] sm:h-[520px] md:h-[680px] rounded-full border border-dashed border-white/15 pointer-events-none"
        aria-hidden="true"
      />

      {/* Coordenadas Flutuantes nas Laterais (Inspirado no print Lué Studio) */}
      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-start gap-1 font-code-inline text-[11px] text-white/60 tracking-widest pointer-events-none">
        <span>22.5235° S</span>
        <span>44.1041° W</span>
        <span className="text-[9px] text-white/40 uppercase mt-1">VOLTA REDONDA // BR</span>
      </div>

      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-1 font-code-inline text-[11px] text-white/60 tracking-widest pointer-events-none">
        <span>UTC-3 // BRT</span>
        <span className="text-emerald-300 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          DISPONÍVEL
        </span>
        <span className="text-[9px] text-white/40 uppercase mt-1">FULL STACK &amp; AI</span>
      </div>

      {/* =========================================================================
          CONTEÚDO CENTRAL: FOTO EM CÍRCULO CENTRALIZADO + NOME MONUMENTAL + CARGO
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center justify-center max-w-5xl mx-auto my-auto py-8 sm:py-12"
      >
        {/* FOTO DENTRO DE UM CÍRCULO CENTRALIZADO COM HALO CELESTIAL */}
        <div className="relative mb-6 sm:mb-8 group">
          
          {/* Arco Crescente / Halo Celestial ao redor do círculo */}
          <div 
            className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-white/30 border-t-white/80 border-r-transparent animate-[spin_24s_linear_infinite] pointer-events-none" 
            aria-hidden="true"
          />
          <div 
            className="absolute -inset-8 rounded-full border border-dashed border-white/20 pointer-events-none" 
            aria-hidden="true"
          />

          {/* Brilho Suave e Sombra do Círculo */}
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity" 
            aria-hidden="true"
          />

          {/* O Círculo Principal da Imagem */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full p-1.5 sm:p-2 bg-gradient-to-b from-white/80 via-white/30 to-white/60 shadow-[0_0_60px_rgba(255,255,255,0.45),0_18px_45px_rgba(8,28,68,0.45)] backdrop-blur-md">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#164e9a] border border-white/40 relative">
              <img
                src="/eu-profissional.png"
                alt="Pedro Lucas Reis"
                className="w-full h-full object-cover object-top contrast-[1.03] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.currentTarget
                  target.onerror = null
                  target.src =
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBtxYDrcM1Qy-1E_8i5XEtqLBXfxC-nfmr2bWSoBDeLxNRDIKnqG6Cb0HjTebAtdmDlKV2pgKz4RrFg1jPQki67K4EAM5K2Ns5qoSobeVk95EbeCRrlRVt1OqVKSgrkYWPjpsJP7OIGFYL-S8r_E97TiZxs194cTKwJuTeArEUiwXQDFnF63JyHrVPm1jBLV9KNi_Bc2l0F1yL8Q5dY1X8ZdIiumZ_CgKvfcmQKWp8--BYN_AHNaTV9"
                }}
              />
            </div>
          </div>
        </div>

        {/* NOME MONUMENTAL ESTILO DISPLAY SERIF (THE LUÉ STUDIO) */}
        <h1 className="font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none drop-shadow-[0_12px_45px_rgba(8,28,68,0.45)]">
          Pedro Lucas Reis
        </h1>

        {/* CARGO ELEGANTE EMBAIXO DO NOME ESTILO "ALCHEMISTS OF THE INTERNET" */}
        <p className="font-serif italic font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/95 tracking-wide drop-shadow-[0_6px_25px_rgba(8,28,68,0.4)] mt-3 sm:mt-5 max-w-3xl">
          {isEn
            ? "Full Stack Software Engineer & Systems Architect"
            : "Engenheiro de Software Full Stack & Arquiteto de Sistemas"}
        </p>

        {/* CONTROLES SUTIS DE AÇÃO & SCROLL EM PÍLULAS DE VIDRO */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8 sm:mt-10 pointer-events-auto"
        >
          <a
            href="#reconhecimento-imprensa"
            className="px-6 py-2.5 rounded-full bg-white text-[#144b91] hover:bg-sky-50 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-950/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>{isEn ? "Explore Engineering" : "Explorar Engenharia"}</span>
            <span className="material-symbols-outlined text-[16px] animate-bounce">arrow_downward</span>
          </a>

          <a
            href="https://wa.me/5524993264040?text=Ol%C3%A1%20Pedro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-300">chat</span>
            <span>WhatsApp Direct</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default StitchHeroProjects
