import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchPressFeature: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <motion.section
      id="reconhecimento-imprensa"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className="w-full py-6 sm:py-10 border-t border-white/15 scroll-mt-20"
    >
      <div className="flex flex-col gap-5">
        {/* Header da Seção */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-label-caps text-emerald-300 uppercase tracking-wider text-xs font-bold">
              RECONHECIMENTO &amp; IMPRENSA // EM DESTAQUE
            </span>
          </div>
          <span className="font-code-inline text-xs text-sky-200/80">
            JORNAL CORREIO DA MANHÃ &bull; PORTAL UNIFOA
          </span>
        </div>

        {/* Card Editorial Duplo Premium (Celestial Glass) */}
        <motion.div
          whileHover={{ borderColor: "rgba(255, 255, 255, 0.35)" }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white/[0.10] backdrop-blur-xl border border-white/20 p-6 sm:p-8 lg:p-9 shadow-[0_16px_40px_rgba(8,28,68,0.3)] relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
            
            {/* Lado Esquerdo: Manchete, Veículos, Citação e CTAs */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-white font-label-caps text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  CORREIO DA MANHÃ
                </span>
                <span className="px-2.5 py-1 rounded-full bg-sky-400/20 border border-sky-300/40 text-sky-200 font-label-caps text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  UNIFOA NOTÍCIAS
                </span>
                <span className="font-code-inline text-xs text-sky-200/80">JULHO/2026</span>
              </div>

              <h2 className="font-headline-lg text-white font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
                {isEn
                  ? "UniFOA Alumnus Pedro Lucas Creates Tech Platform to Support Children with Speech Delay"
                  : "Egresso do UniFOA cria plataforma para apoiar crianças com atraso de fala"}
              </h2>

              {/* Bloco de Citação Curto e Impactante */}
              <motion.blockquote
                whileHover={{ scale: 1.01 }}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border-l-4 border-l-emerald-400 border border-white/15 flex flex-col gap-1.5 backdrop-blur-md"
              >
                <p className="font-body-md text-white/95 italic text-sm sm:text-base leading-snug">
                  &ldquo;O FalaAtípica dá voz a quem ainda não pode falar, unindo a criança, a família e os terapeutas em uma jornada contínua e mensurável.&rdquo;
                </p>
                <cite className="font-code-inline text-xs text-emerald-300 not-italic font-semibold">
                  &mdash; Pedro Lucas Reis, entrevista ao Correio da Manhã &amp; UniFOA
                </cite>
              </motion.blockquote>

              <p className="font-body-md text-sky-100 text-sm leading-relaxed">
                Ecossistema multiplataforma desenvolvido para apoiar crianças com atraso de fala e TEA, com jogos clínicos de reforço positivo e telemetria para fonoaudiólogos e psicólogos.
              </p>

              {/* Botões de Ação para as Matérias Oficiais com Spring Micro-interactions */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  href="https://www.correiodamanha.com.br/sul-fluminense/educacao/2026/07/303632-egresso-do-unifoa-cria-plataforma-de-auxilio-infantil.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-sky-50 text-[#144b91] hover:text-[#0f3c78] font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-colors cursor-pointer border border-white/40"
                >
                  <span>Ler no Correio da Manhã</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/25 font-semibold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
                >
                  <span>Ler no Portal UniFOA</span>
                  <span className="material-symbols-outlined text-[16px] text-sky-200">open_in_new</span>
                </motion.a>
              </div>
            </div>

            {/* Lado Direito: Visual dos Módulos FalaAtípica & Métricas Leves */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/15 shadow-md flex flex-col gap-2.5 backdrop-blur-md">
                <div className="flex items-center justify-between pb-2 border-b border-white/15">
                  <span className="font-label-caps text-[11px] text-white/80 uppercase font-bold">
                    ESTRUTURA DA PLATAFORMA
                  </span>
                  <span className="font-code-inline text-[11px] text-emerald-300 font-semibold">SAÚDE &amp; IA</span>
                </div>

                <div className="flex flex-col gap-2 font-body-sm text-xs text-white/90">
                  <motion.div
                    whileHover={{ scale: 1.025, x: 3 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    className="p-2.5 rounded-xl bg-white/10 flex items-center gap-2.5 border border-white/10 cursor-default"
                  >
                    <span className="material-symbols-outlined text-emerald-300 text-[20px] shrink-0">child_care</span>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs">App Kids (4 Jogos Clínicos)</span>
                      <span className="text-sky-100 text-[11px]">Adivinha, Igual/Diferente, Cena Certa e Palavras</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.025, x: 3 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    className="p-2.5 rounded-xl bg-white/10 flex items-center gap-2.5 border border-white/10 cursor-default"
                  >
                    <span className="material-symbols-outlined text-sky-300 text-[20px] shrink-0">family_restroom</span>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs">Módulo Pais &amp; Tutores</span>
                      <span className="text-sky-100 text-[11px]">Progresso diário, rotina e estímulos guiados</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.025, x: 3 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    className="p-2.5 rounded-xl bg-white/10 flex items-center gap-2.5 border border-white/10 cursor-default"
                  >
                    <span className="material-symbols-outlined text-indigo-200 text-[20px] shrink-0">medical_services</span>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs">Painel de Terapeutas</span>
                      <span className="text-sky-100 text-[11px]">Relatórios clínicos para fonoaudiologia e psicologia</span>
                    </div>
                  </motion.div>
                </div>

                {/* Métricas do FalaAtípica (Cards com Micro-Hover) */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/15 text-center">
                  <motion.div
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    className="p-2 rounded-xl bg-white/10 border border-white/10 cursor-default"
                  >
                    <span className="font-headline-sm text-emerald-300 font-bold text-base block">100%</span>
                    <span className="font-code-inline text-[9px] text-sky-100 uppercase">Offline Ready</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    className="p-2 rounded-xl bg-white/10 border border-white/10 cursor-default"
                  >
                    <span className="font-headline-sm text-sky-200 font-bold text-base block">AAA</span>
                    <span className="font-code-inline text-[9px] text-sky-100 uppercase">WCAG 2.2</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    className="p-2 rounded-xl bg-white/10 border border-white/10 cursor-default"
                  >
                    <span className="font-headline-sm text-amber-300 font-bold text-base block">0.0ms</span>
                    <span className="font-code-inline text-[9px] text-sky-100 uppercase">Latency Audio</span>
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default StitchPressFeature
