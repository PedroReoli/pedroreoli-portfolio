import React from "react"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchPressFeature: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <section className="w-full py-12 border-t border-white/10">
      <div className="flex flex-col gap-6">
        {/* Header da Seção */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-label-caps text-emerald-400 uppercase tracking-wider text-xs font-bold">
              RECONHECIMENTO &amp; IMPRENSA // EM DESTAQUE
            </span>
          </div>
          <span className="font-code-inline text-xs text-zinc-400">
            JORNAL CORREIO DA MANHÃ &bull; PORTAL UNIFOA
          </span>
        </div>

        {/* Card Editorial Duplo Premium */}
        <div className="rounded-3xl bg-surface-container border border-emerald-500/20 p-6 sm:p-8 lg:p-9 shadow-xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
            
            {/* Lado Esquerdo: Manchete, Veículos, Citação e CTAs */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 font-label-caps text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  CORREIO DA MANHÃ
                </span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-label-caps text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  UNIFOA NOTÍCIAS
                </span>
                <span className="font-code-inline text-xs text-zinc-400">JULHO/2026</span>
              </div>

              <h2 className="font-headline-lg text-white font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
                {isEn
                  ? "UniFOA Alumnus Pedro Lucas Creates Tech Platform to Support Children with Speech Delay"
                  : "Egresso do UniFOA cria plataforma para apoiar crianças com atraso de fala"}
              </h2>

              {/* Bloco de Citação Curto e Impactante */}
              <blockquote className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-lowest/80 border-l-4 border-l-emerald-400 border border-white/5 flex flex-col gap-1.5">
                <p className="font-body-md text-zinc-200 italic text-sm sm:text-base leading-snug">
                  &ldquo;O FalaAtípica dá voz a quem ainda não pode falar, unindo a criança, a família e os terapeutas em uma jornada contínua e mensurável.&rdquo;
                </p>
                <cite className="font-code-inline text-xs text-emerald-400 not-italic font-semibold">
                  &mdash; Pedro Lucas Reis, entrevista ao Correio da Manhã &amp; UniFOA
                </cite>
              </blockquote>

              <p className="font-body-md text-zinc-300 text-sm leading-relaxed">
                Ecossistema multiplataforma desenvolvido para apoiar crianças com atraso de fala e TEA, com jogos clínicos de reforço positivo e telemetria para fonoaudiólogos e psicólogos.
              </p>

              {/* Botões de Ação para as Matérias Oficiais */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href="https://www.correiodamanha.com.br/sul-fluminense/educacao/2026/07/303632-egresso-do-unifoa-cria-plataforma-de-auxilio-infantil.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <span>Ler no Correio da Manhã</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>

                <a
                  href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-zinc-100 hover:text-white border border-white/10 hover:border-white/25 font-semibold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
                >
                  <span>Ler no Portal UniFOA</span>
                  <span className="material-symbols-outlined text-[16px] text-cyan-400">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Lado Direito: Visual dos Módulos FalaAtípica & Métricas Leves */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-white/10 shadow-md flex flex-col gap-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="font-label-caps text-[11px] text-zinc-400 uppercase font-bold">
                    ESTRUTURA DA PLATAFORMA
                  </span>
                  <span className="font-code-inline text-[11px] text-emerald-400 font-semibold">SAÚDE &amp; IA</span>
                </div>

                <div className="flex flex-col gap-2 font-body-sm text-xs text-zinc-300">
                  <div className="p-2.5 rounded-xl bg-surface-container flex items-center gap-2.5 border border-white/5">
                    <span className="material-symbols-outlined text-emerald-400 text-[20px] shrink-0">child_care</span>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs">App Kids (4 Jogos Clínicos)</span>
                      <span className="text-zinc-400 text-[11px]">Adivinha, Igual/Diferente, Cena Certa e Palavras</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-surface-container flex items-center gap-2.5 border border-white/5">
                    <span className="material-symbols-outlined text-cyan-400 text-[20px] shrink-0">family_restroom</span>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs">Módulo Pais &amp; Tutores</span>
                      <span className="text-zinc-400 text-[11px]">Progresso diário, rotina e estímulos guiados</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-surface-container flex items-center gap-2.5 border border-white/5">
                    <span className="material-symbols-outlined text-indigo-400 text-[20px] shrink-0">medical_services</span>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs">Painel de Terapeutas</span>
                      <span className="text-zinc-400 text-[11px]">Relatórios clínicos para fonoaudiologia e psicologia</span>
                    </div>
                  </div>
                </div>

                {/* Métricas do FalaAtípica (Cards Leves) */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
                  <div className="p-2 rounded-xl bg-surface-container border border-white/5">
                    <span className="font-headline-sm text-emerald-400 font-bold text-base block">100%</span>
                    <span className="font-code-inline text-[9px] text-zinc-400 uppercase">Offline Ready</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface-container border border-white/5">
                    <span className="font-headline-sm text-cyan-400 font-bold text-base block">AAA</span>
                    <span className="font-code-inline text-[9px] text-zinc-400 uppercase">WCAG 2.2</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface-container border border-white/5">
                    <span className="font-headline-sm text-amber-400 font-bold text-base block">0.0ms</span>
                    <span className="font-code-inline text-[9px] text-zinc-400 uppercase">Latency Audio</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default StitchPressFeature
