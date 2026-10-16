import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import StitchHeader from "../components/organisms/StitchHeader"
import StitchAutocom3Section from "../components/organisms/StitchAutocom3Section"
import { useLanguage } from "../i18n/useLanguage"

interface ProjectsPageProps {
  defaultTab?: "corporativo" | "gerais"
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ defaultTab }) => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [searchParams, setSearchParams] = useSearchParams()

  const tabFromQuery = searchParams.get("tipo")
  const initialTab =
    defaultTab ||
    (tabFromQuery === "gerais" ? "gerais" : "corporativo")

  const [activeTab, setActiveTab] = useState<"corporativo" | "gerais">(initialTab)

  useEffect(() => {
    if (tabFromQuery === "corporativo" || tabFromQuery === "corporativos") {
      setActiveTab("corporativo")
    } else if (tabFromQuery === "gerais") {
      setActiveTab("gerais")
    }
  }, [tabFromQuery])

  const handleTabChange = (tab: "corporativo" | "gerais") => {
    setActiveTab(tab)
    setSearchParams({ tipo: tab })
  }

  return (
    <div className="min-h-screen bg-[#0d0f15] font-body-md text-zinc-100 antialiased flex flex-col selection:bg-emerald-400 selection:text-zinc-950 relative overflow-x-hidden">
      {/* Navbar Superior Limpa */}
      <StitchHeader />

      {/* Main Container Widescreen */}
      <main className="flex-1 flex flex-col relative w-full pt-24 pb-16 px-4 sm:px-8 max-w-6xl mx-auto gap-8">
        {/* Page Title & Segmented Control */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 font-label-caps text-xs font-bold uppercase tracking-wider border border-cyan-500/30">
                PORTFÓLIO DE ENGENHARIA
              </span>
              <span className="font-code-inline text-xs text-zinc-400">PROD_REPOSITORIES</span>
            </div>
            <h1 className="font-headline-lg text-white font-bold text-3xl sm:text-4xl tracking-tight">
              {isEn ? "Engineering Projects & Architecture" : "Projetos de Engenharia & Arquitetura"}
            </h1>
            <p className="font-body-md text-zinc-300 text-sm sm:text-base max-w-3xl">
              {isEn
                ? "Explore mission-critical enterprise systems in production and advanced open-source research across autonomous agents and local-first platforms."
                : "Explore sistemas corporativos de missão crítica em produção e projetos avançados de pesquisa de código aberto em agentes autônomos e arquiteturas local-first."}
            </p>
          </div>

          {/* Segmented Control de Alto Contraste */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-surface-container border border-white/10 w-fit">
            <button
              type="button"
              onClick={() => handleTabChange("corporativo")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-headline-sm text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "corporativo"
                  ? "bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-md shadow-cyan-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">business</span>
              <span>Projetos Corporativos (Autocom3)</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold font-code-inline ${
                activeTab === "corporativo" ? "bg-zinc-950/20 text-zinc-950" : "bg-white/10 text-cyan-300"
              }`}>
                6 Módulos
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("gerais")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-headline-sm text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "gerais"
                  ? "bg-emerald-400 hover:bg-emerald-300 text-zinc-950 shadow-md shadow-emerald-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              <span>Projetos Gerais &amp; Flagship</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold font-code-inline ${
                activeTab === "gerais" ? "bg-zinc-950/20 text-zinc-950" : "bg-white/10 text-emerald-300"
              }`}>
                IA &amp; OS
              </span>
            </button>
          </div>
        </section>

        {/* Tab Content: Corporativo (Autocom3) */}
        {activeTab === "corporativo" && (
          <section className="w-full animate-in fade-in duration-300">
            <StitchAutocom3Section />
          </section>
        )}

        {/* Tab Content: Gerais (Flagship, IA, Local-First) */}
        {activeTab === "gerais" && (
          <section className="w-full flex flex-col gap-8 animate-in fade-in duration-300 pb-16">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-label-caps text-xs text-zinc-400 font-bold uppercase tracking-wider">
                FLAGSHIP &amp; OPEN SOURCE SYSTEMS
              </span>
              <span className="font-code-inline text-xs text-emerald-400">4 REPOSITÓRIOS OFICIAIS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* ORGANON OS */}
              <article className="rounded-3xl bg-surface-container border border-indigo-500/20 p-5 sm:p-6 flex flex-col justify-between shadow-xl hover:border-indigo-500/50 transition-all">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-label-caps text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                      LOCAL-FIRST OS
                    </span>
                    <span className="font-code-inline text-xs text-emerald-400 font-semibold">SQLITE WAL</span>
                  </div>
                  <h3 className="font-headline-lg text-white font-bold text-xl sm:text-2xl">
                    Organon OS
                  </h3>
                  <p className="font-body-md text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    Sistema operacional de conhecimento local-first com grafo bidirecional, sincronização CRDT offline, SQLite WAL e privacidade absoluta em Tauri v2 com Rust.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">Tauri v2</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">Rust</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">React 19</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">CRDT Sync</span>
                  </div>
                </div>
                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="https://github.com/PedroReoli/organon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-indigo-300 text-zinc-950 font-bold text-xs transition-all cursor-pointer shadow-md"
                  >
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    <span>Ver Repositório GitHub</span>
                  </a>
                  <span className="font-code-inline text-xs text-emerald-400 font-semibold">100% Offline</span>
                </div>
              </article>

              {/* ACHILLES CDP AGENT */}
              <article className="rounded-3xl bg-surface-container border border-cyan-500/20 p-5 sm:p-6 flex flex-col justify-between shadow-xl hover:border-cyan-500/50 transition-all">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-label-caps text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-cyan-500/30">
                      AGENTIC PROTOCOL
                    </span>
                    <span className="font-code-inline text-xs text-emerald-400 font-bold">-92.2% TOKENS</span>
                  </div>
                  <h3 className="font-headline-lg text-white font-bold text-xl sm:text-2xl">
                    Achilles CDP Agent
                  </h3>
                  <p className="font-body-md text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    Motor autônomo de navegação web via Chrome DevTools Protocol (CDP) e AXTree, reduzindo tokens em 92.2% com ferramentas determinísticas e 41ms de latência.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">Chrome CDP</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">AXTree</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">MCP Server</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">TypeScript</span>
                  </div>
                </div>
                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="https://github.com/PedroReoli/Achilles-CDP-Agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-cyan-300 text-zinc-950 font-bold text-xs transition-all cursor-pointer shadow-md"
                  >
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    <span>Ver Repositório GitHub</span>
                  </a>
                  <span className="font-code-inline text-xs text-cyan-400 font-semibold">41ms Avg Latency</span>
                </div>
              </article>

              {/* FALA ATÍPICA */}
              <article className="rounded-3xl bg-surface-container border border-emerald-500/20 p-5 sm:p-6 flex flex-col justify-between shadow-xl hover:border-emerald-500/50 transition-all">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-label-caps text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                      HEALTHCARE &amp; NEURODIVERSITY
                    </span>
                    <span className="font-code-inline text-xs text-zinc-400 font-semibold">LOCAL SPEECH</span>
                  </div>
                  <h3 className="font-headline-lg text-white font-bold text-xl sm:text-2xl">
                    Fala Atípica
                  </h3>
                  <p className="font-body-md text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    Plataforma de CAA para pessoas neurodivergentes com síntese de voz local, símbolos pictográficos ARASAAC, banco IndexedDB offline e conformidade WCAG 2.2 AAA.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">Next.js App Router</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">Web Audio API</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">IndexedDB</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">WAI-ARIA AAA</span>
                  </div>
                </div>
                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="https://github.com/PedroReoli/Fala-Atipica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-emerald-300 text-zinc-950 font-bold text-xs transition-all cursor-pointer shadow-md"
                  >
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    <span>Ver Repositório GitHub</span>
                  </a>
                  <span className="font-code-inline text-xs text-emerald-400 font-semibold">Acessibilidade AAA</span>
                </div>
              </article>

              {/* GEOAMBIENTAL VR */}
              <article className="rounded-3xl bg-surface-container border border-amber-500/20 p-5 sm:p-6 flex flex-col justify-between shadow-xl hover:border-amber-500/50 transition-all">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-label-caps text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                      SPATIAL COMPUTING &amp; 3D
                    </span>
                    <span className="font-code-inline text-xs text-zinc-400 font-semibold">60 FPS WEBGL</span>
                  </div>
                  <h3 className="font-headline-lg text-white font-bold text-xl sm:text-2xl">
                    GeoAmbiental VR
                  </h3>
                  <p className="font-body-md text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    Simulador espacial 3D para dados climáticos de alta densidade com renderização WebGL em 60 FPS contínuos, shaders GLSL e telemetria microclimática interativa.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">Three.js</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">WebGL</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">GLSL Shaders</span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-zinc-200 font-code-inline text-[11px]">Spatial Math</span>
                  </div>
                </div>
                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="https://github.com/PedroReoli/GeoAmbientalVR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-amber-300 text-zinc-950 font-bold text-xs transition-all cursor-pointer shadow-md"
                  >
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    <span>Ver Repositório GitHub</span>
                  </a>
                  <span className="font-code-inline text-xs text-amber-400 font-semibold">60 FPS Smooth</span>
                </div>
              </article>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default ProjectsPage
