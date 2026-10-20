import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import SEOHead from "../components/atoms/SEOHead"
import StitchHeader from "../components/organisms/StitchHeader"
import StitchAutocom3Section from "../components/organisms/StitchAutocom3Section"
import StitchFooter from "../components/organisms/StitchFooter"
import TransitionEffect from "../components/atoms/TransitionEffect"
import CelestialHireMe from "../components/molecules/CelestialHireMe"
import { useLanguage } from "../i18n/useLanguage"
import { Briefcase, Rocket } from "lucide-react"
import { FaGithub } from "react-icons/fa6"

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
    <div className="min-h-screen bg-[#0d1117] font-body text-[#f0f6fc] antialiased flex flex-col relative overflow-x-hidden">
      {/* Metatags e SEO Dinâmico */}
      <SEOHead
        title={
          isEn
            ? "Engineering Projects & Architecture | Pedro Lucas Reis"
            : "Projetos de Engenharia & Arquitetura | Pedro Lucas Reis"
        }
        description={
          isEn
            ? "Production-grade software systems: Autocom3 enterprise ERP with 25+ submodules, local-first architectures, and autonomous AI agent tooling."
            : "Sistemas corporativos em produção: ERP Autocom3 com mais de 25 submódulos integrados, arquiteturas local-first com SQLite WAL e agentes autônomos."
        }
        canonicalUrl="https://pedroreis.vercel.app/projetos"
      />

      <TransitionEffect />
      <StitchHeader />

      <main className="flex-1 flex flex-col relative w-full pt-24 pb-8 px-4 sm:px-8 max-w-6xl mx-auto gap-8">
        {/* Título da Página (Único H1 Semântico de /projetos) */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#21262d] text-[#58a6ff] font-mono text-xs font-semibold border border-[#30363d]">
                PORTFÓLIO DE PROJETOS
              </span>
              <span className="font-mono text-xs text-[#8b949e]">EM PRODUÇÃO</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#f0f6fc] tracking-tight">
              {isEn ? "Engineering Projects & Architecture" : "Projetos de Engenharia & Arquitetura"}
            </h1>
            <p className="text-sm sm:text-base text-[#8b949e] max-w-3xl leading-relaxed">
              {isEn
                ? "Explore mission-critical enterprise systems in production and open-source systems across autonomous agents, local-first platforms, and distributed backends."
                : "Explore sistemas corporativos de retaguarda em produção e projetos de arquitetura de software com foco em agentes autônomos, sistemas locais e alta densidade."}
            </p>
          </div>

          {/* Abas de Navegação dos Projetos */}
          <div className="flex flex-wrap items-center gap-2 p-1 rounded-lg bg-[#161b22] border border-[#30363d] w-fit">
            <button
              type="button"
              onClick={() => handleTabChange("corporativo")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === "corporativo"
                  ? "bg-[#21262d] text-[#f0f6fc] border border-[#30363d]"
                  : "text-[#8b949e] hover:text-[#f0f6fc]"
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#58a6ff]" />
              <span>Projetos Corporativos (Autocom3)</span>
              <span className="px-1.5 py-0.5 rounded bg-[#0d1117] text-[10px] font-mono text-[#8b949e] border border-[#30363d]">
                6 Módulos
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("gerais")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === "gerais"
                  ? "bg-[#21262d] text-[#f0f6fc] border border-[#30363d]"
                  : "text-[#8b949e] hover:text-[#f0f6fc]"
              }`}
            >
              <Rocket className="w-4 h-4 text-[#3fb950]" />
              <span>Projetos Gerais &amp; Flagship</span>
              <span className="px-1.5 py-0.5 rounded bg-[#0d1117] text-[10px] font-mono text-[#8b949e] border border-[#30363d]">
                Open Source
              </span>
            </button>
          </div>
        </section>

        {/* Conteúdo: Corporativo (Autocom3) */}
        {activeTab === "corporativo" && (
          <section className="w-full">
            <StitchAutocom3Section />
          </section>
        )}

        {/* Conteúdo: Projetos Gerais */}
        {activeTab === "gerais" && (
          <section className="w-full flex flex-col gap-6 pb-12">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
              <span className="font-mono text-xs text-[#8b949e] font-semibold uppercase tracking-wider">
                SISTEMAS OPEN SOURCE &amp; ARQUITETURA
              </span>
              <span className="font-mono text-xs text-[#3fb950]">4 REPOSITÓRIOS PÚBLICOS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ORGANON OS */}
              <article className="rounded-xl bg-[#161b22] border border-[#30363d] p-5 sm:p-6 flex flex-col justify-between hover:border-[#58a6ff]/40 transition-colors">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-[#21262d] text-[#a371f7] font-mono text-xs border border-[#30363d]">
                      LOCAL-FIRST OS
                    </span>
                    <span className="font-mono text-xs text-[#3fb950]">SQLITE WAL</span>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#f0f6fc]">
                    Organon OS
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                    Sistema operacional de conhecimento local-first com grafo bidirecional, sincronização CRDT offline, SQLite WAL e persistência segura em Tauri v2 com Rust.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">Tauri v2</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">Rust</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">React 19</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">CRDT Sync</span>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-[#21262d] flex items-center justify-between">
                  <a
                    href="https://github.com/PedroReoli/organon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] font-medium text-xs transition-colors border border-[#30363d]"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Ver no GitHub</span>
                  </a>
                  <span className="font-mono text-xs text-[#3fb950]">100% Offline</span>
                </div>
              </article>

              {/* ACHILLES CDP AGENT */}
              <article className="rounded-xl bg-[#161b22] border border-[#30363d] p-5 sm:p-6 flex flex-col justify-between hover:border-[#58a6ff]/40 transition-colors">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-[#21262d] text-[#58a6ff] font-mono text-xs border border-[#30363d]">
                      AGENTIC PROTOCOL
                    </span>
                    <span className="font-mono text-xs text-[#3fb950]">-92.2% TOKENS</span>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#f0f6fc]">
                    Achilles CDP Agent
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                    Motor autônomo de navegação web via Chrome DevTools Protocol (CDP) e AXTree, reduzindo tokens em 92.2% com ferramentas determinísticas e baixa latência.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">Chrome CDP</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">AXTree</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">MCP Server</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">TypeScript</span>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-[#21262d] flex items-center justify-between">
                  <a
                    href="https://github.com/PedroReoli/Achilles-CDP-Agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] font-medium text-xs transition-colors border border-[#30363d]"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Ver no GitHub</span>
                  </a>
                  <span className="font-mono text-xs text-[#58a6ff]">41ms Latência</span>
                </div>
              </article>

              {/* FALA ATÍPICA */}
              <article className="rounded-xl bg-[#161b22] border border-[#30363d] p-5 sm:p-6 flex flex-col justify-between hover:border-[#3fb950]/40 transition-colors">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-[#21262d] text-[#3fb950] font-mono text-xs border border-[#30363d]">
                      SAÚDE &amp; NEURODIVERSIDADE
                    </span>
                    <span className="font-mono text-xs text-[#8b949e]">SÍNTESE DE VOZ</span>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#f0f6fc]">
                    Fala Atípica
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                    Plataforma de CAA para pessoas neurodivergentes com síntese de voz local, símbolos pictográficos ARASAAC, banco IndexedDB offline e conformidade WCAG 2.2 AAA.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">Next.js</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">Web Audio API</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">IndexedDB</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">WAI-ARIA AAA</span>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-[#21262d] flex items-center justify-between">
                  <a
                    href="https://github.com/PedroReoli/Fala-Atipica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] font-medium text-xs transition-colors border border-[#30363d]"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Ver no GitHub</span>
                  </a>
                  <span className="font-mono text-xs text-[#3fb950]">WCAG AAA</span>
                </div>
              </article>

              {/* GEOAMBIENTAL VR */}
              <article className="rounded-xl bg-[#161b22] border border-[#30363d] p-5 sm:p-6 flex flex-col justify-between hover:border-[#f0883e]/40 transition-colors">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-[#21262d] text-[#f0883e] font-mono text-xs border border-[#30363d]">
                      COMPUTAÇÃO ESPACIAL &amp; 3D
                    </span>
                    <span className="font-mono text-xs text-[#8b949e]">WEBGL 60 FPS</span>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#f0f6fc]">
                    GeoAmbiental VR
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                    Simulador espacial 3D para dados climáticos de alta densidade com renderização WebGL em 60 FPS contínuos, shaders GLSL e telemetria interativa.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">Three.js</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">WebGL</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#0d1117] text-[#c9d1d9] font-mono text-[11px] border border-[#30363d]">GLSL Shaders</span>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-[#21262d] flex items-center justify-between">
                  <a
                    href="https://github.com/PedroReoli/GeoAmbientalVR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] font-medium text-xs transition-colors border border-[#30363d]"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Ver no GitHub</span>
                  </a>
                  <span className="font-mono text-xs text-[#f0883e]">WebGL 60FPS</span>
                </div>
              </article>
            </div>
          </section>
        )}
      </main>

      <StitchFooter />
      <CelestialHireMe />
    </div>
  )
}

export default ProjectsPage
