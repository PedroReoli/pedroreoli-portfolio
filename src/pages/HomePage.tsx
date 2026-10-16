import React, { useState } from "react"
import StitchHeader from "../components/organisms/StitchHeader"
import StitchHeroProjects from "../components/organisms/StitchHeroProjects"
import StitchBottomNav from "../components/molecules/StitchBottomNav"
import { useLanguage } from "../i18n/useLanguage"

export const HomePage: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0d0f15] font-body-md text-zinc-100 antialiased flex flex-col selection:bg-emerald-400 selection:text-zinc-950 relative overflow-x-hidden">
      {/* Stitch Fixed Header */}
      <StitchHeader onOpenDiagnostics={() => setDiagnosticsOpen((prev) => !prev)} />

      {/* Diagnostics HUD Panel (Slide-over drawer, Non-blocking) */}
      {diagnosticsOpen && (
        <aside
          role="complementary"
          aria-label="System Diagnostics HUD"
          className="fixed top-20 right-4 sm:right-8 z-50 w-[92vw] max-w-sm rounded-3xl bg-surface-container/95 backdrop-blur-2xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.85)] p-5 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-label-caps text-xs text-white uppercase tracking-wider font-bold">
                SYS_DIAGNOSTICS // PROD_NODE
              </span>
            </div>
            <button
              onClick={() => setDiagnosticsOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fechar Diagnósticos"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-2 font-code-inline text-xs text-zinc-300">
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-400">SYSTEM STATUS:</span>
              <span className="text-emerald-400 font-bold">ONLINE (CARBON_2026)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-400">RUNTIME:</span>
              <span className="text-white font-medium">REACT 19 / VITE 5.4</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-400">RENDER LOOP:</span>
              <span className="text-cyan-400 font-medium">&lt; 140ms (FCP 100)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-400">MEMORY FOOTPRINT:</span>
              <span className="text-indigo-300 font-medium">~28.4 MB</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-400">CONTAINER WIDTH:</span>
              <span className="text-amber-400 font-medium">MAX-W-6XL WIDESCREEN</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">
              {isEn ? "AUDITED BY REOLI_OS" : "AUDITADO POR REOLI_OS"}
            </span>
            <span className="font-telemetry-tag text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-semibold">
              100% OK
            </span>
          </div>
        </aside>
      )}

      {/* Main Single Stream Container */}
      <main className="flex-1 flex flex-col relative w-full pt-24 pb-safe px-4 sm:px-8 max-w-6xl mx-auto">
        <StitchHeroProjects />
      </main>

      {/* Stitch Floating Bottom Navigation Capsule Dock */}
      <StitchBottomNav />
    </div>
  )
}

export default HomePage
