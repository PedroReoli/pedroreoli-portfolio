import React, { useState } from "react"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchDossierSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [copied, setCopied] = useState(false)

  const emailToCopy = "pedrosousa2160@gmail.com"

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy)
      } else {
        const tempInput = document.createElement("input")
        tempInput.value = emailToCopy
        document.body.appendChild(tempInput)
        tempInput.select()
        document.execCommand("copy")
        document.body.removeChild(tempInput)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <section id="dossie-tecnico" className="flex flex-col w-full pb-16 gap-8">
      {/* MANIFESTO TÉCNICO DE ENGENHARIA */}
      <div className="flex flex-col bg-surface-container rounded-3xl p-6 sm:p-8 shadow-lg border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-space-sm mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-telemetry-tag text-emerald-400 uppercase tracking-wider text-xs font-semibold">
              REF_CODE // ENG-DOSSIER-2026
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-300 font-label-caps text-xs uppercase font-bold">
            <span className="material-symbols-outlined text-[15px] text-emerald-400">verified</span>
            <span>{isEn ? "STATUS: VERIFIED" : "STATUS: VERIFICADO"}</span>
          </div>
        </div>

        <h1 className="font-headline-lg text-white tracking-tight font-bold text-2xl sm:text-3xl lg:text-4xl mb-3">
          {isEn
            ? "Competency Matrix & Engineering Architecture"
            : "Matriz de Competências & Arquitetura de Engenharia"}
        </h1>
        <p className="font-body-md text-zinc-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          {isEn
            ? "“Software engineering is not about collecting trendy buzzwords, but about making sustainable architectural decisions under real constraints of time, compute resources, and enterprise goals.”"
            : "“Engenharia de software não consiste em colecionar siglas tecnológicas na moda, mas em tomar decisões arquiteturais sustentáveis sob restrições reais de prazo, recursos computacionais e metas corporativas.”"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-col">
            <span className="font-label-caps text-zinc-400 uppercase tracking-wider text-xs font-semibold">
              {isEn ? "OPERATIONAL PHILOSOPHY" : "FILOSOFIA OPERACIONAL"}
            </span>
            <span className="font-code-inline text-emerald-300 mt-1 font-bold text-sm">
              Deterministic First
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-zinc-400 uppercase tracking-wider text-xs font-semibold">
              {isEn ? "DOMINANT PARADIGM" : "PARADIGMA DOMINANTE"}
            </span>
            <span className="font-code-inline text-cyan-300 mt-1 font-bold text-sm">
              Domain-Driven &amp; Clean Architecture
            </span>
          </div>
        </div>
      </div>

      {/* MATRIZ DE 4 QUADRANTES TÉCNICOS WIDESCREEN */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400 text-[20px]">hub</span>
            <h2 className="font-headline-lg text-white font-bold text-xl sm:text-2xl tracking-tight">
              {isEn ? "4 Analytical Engineering Quadrants" : "4 Quadrantes Analíticos de Engenharia"}
            </h2>
          </div>
          <span className="font-code-inline text-xs text-zinc-400">Q1-Q4 // FULL DENSITY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QUADRANTE 1: Frontend & Alta Densidade */}
          <article className="flex flex-col bg-surface-container rounded-3xl p-6 shadow-md border-t-2 border-t-cyan-500 border border-white/10 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <span className="material-symbols-outlined text-[22px]">layers</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-cyan-400 uppercase tracking-wider text-[10px] font-bold">
                    Q1 // CLIENT-SIDE &amp; DESIGN SYSTEM
                  </span>
                  <h3 className="font-headline-sm text-white font-bold text-lg tracking-tight">
                    {isEn ? "Frontend & High Density" : "Frontend & Alta Densidade"}
                  </h3>
                </div>
              </div>
              <span className="font-telemetry-tag text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
                99.8% Perf
              </span>
            </div>
            <p className="font-body-sm text-zinc-300 text-sm mb-4 leading-relaxed">
              {isEn
                ? "Reactive systems with millisecond-optimized render cycles, strict compiler-level typing, and scalable visual governance."
                : "Sistemas reativos com ciclos de render otimizados em milissegundos, tipagem estrita no nível de compilador e governança visual escalável."}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/5">
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">React 19 / 18</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Next.js App Router</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Strict TypeScript</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">DS 500+ Tokens</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">TanStack React Query</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Zustand Slices</span>
            </div>
          </article>

          {/* QUADRANTE 2: Backend Corporativo & Microsserviços */}
          <article className="flex flex-col bg-surface-container rounded-3xl p-6 shadow-md border-t-2 border-t-emerald-500 border border-white/10 hover:border-emerald-500/50 transition-all">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <span className="material-symbols-outlined text-[22px]">dns</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-emerald-400 uppercase tracking-wider text-[10px] font-bold">
                    Q2 // DISTRIBUTED LOGIC &amp; APIS
                  </span>
                  <h3 className="font-headline-sm text-white font-bold text-lg tracking-tight">
                    {isEn ? "Backend & Microservices" : "Backend & Microsserviços"}
                  </h3>
                </div>
              </div>
              <span className="font-telemetry-tag text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
                HA 99.9%
              </span>
            </div>
            <p className="font-body-sm text-zinc-300 text-sm mb-4 leading-relaxed">
              {isEn
                ? "Domain isolation via Clean Architecture, cryptographic security pipelines, and reliable communication bridges for legacy enterprise C# backends."
                : "Isolamento de domínio via Clean Architecture, pipelines de autenticação com segurança criptográfica e pontes para backends legados em C#."}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/5">
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Node.js Runtime</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">NestJS Core</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Clean Architecture</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Fastify Engines</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">RBAC + Rotating JWT</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">C# / .NET Interop</span>
            </div>
          </article>

          {/* QUADRANTE 3: Infraestrutura de Dados & Nuvem */}
          <article className="flex flex-col bg-surface-container rounded-3xl p-6 shadow-md border-t-2 border-t-indigo-500 border border-white/10 hover:border-indigo-500/50 transition-all">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <span className="material-symbols-outlined text-[22px]">database</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-indigo-400 uppercase tracking-wider text-[10px] font-bold">
                    Q3 // PERSISTENCE &amp; CLOUD
                  </span>
                  <h3 className="font-headline-sm text-white font-bold text-lg tracking-tight">
                    {isEn ? "Data Infrastructure & Cloud" : "Infraestrutura & Nuvem"}
                  </h3>
                </div>
              </div>
              <span className="font-telemetry-tag text-indigo-400 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
                ACID Sync
              </span>
            </div>
            <p className="font-body-sm text-zinc-300 text-sm mb-4 leading-relaxed">
              {isEn
                ? "Partitioned relational models for multi-tenant SaaS, Local-First offline resilience strategies, and automated container deployment pipelines."
                : "Modelagem relacional particionada para multi-inquilinos, estratégias Local-First de resiliência e esteiras de containerização serverless."}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/5">
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">PostgreSQL Multi-Tenant</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">SQLite WAL Local-First</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Supabase RLS</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Docker Pods</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">AWS ECS</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">AWS S3 &amp; Lambda</span>
            </div>
          </article>

          {/* QUADRANTE 4: IA, Agentes & Desktop OS */}
          <article className="flex flex-col bg-surface-container rounded-3xl p-6 shadow-md border-t-2 border-t-amber-500 border border-white/10 hover:border-amber-500/50 transition-all">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <span className="material-symbols-outlined text-[22px]">neurology</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-amber-400 uppercase tracking-wider text-[10px] font-bold">
                    Q4 // AI RUNTIMES &amp; LOCAL OS
                  </span>
                  <h3 className="font-headline-sm text-white font-bold text-lg tracking-tight">
                    {isEn ? "AI Engineering & Desktop OS" : "Engenharia de IA & Desktop"}
                  </h3>
                </div>
              </div>
              <span className="font-telemetry-tag text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
                Low-Latency
              </span>
            </div>
            <p className="font-body-sm text-zinc-300 text-sm mb-4 leading-relaxed">
              {isEn
                ? "Universal context protocols (MCP) for autonomous agents, headless DOM automation via Chrome DevTools Protocol, and local audio speech inference."
                : "Protocolos universais de contexto para agentes autônomos, automação headless de árvore DOM e inferência de áudio executada no hardware local."}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/5">
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Model Context Protocol (MCP)</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Chrome AXTree CDP</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Whisper Local C++</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Tauri v2</span>
              <span className="bg-surface-container-high text-zinc-200 font-code-inline text-xs px-2.5 py-1 rounded-lg">Rust FFI</span>
            </div>
          </article>
        </div>
      </div>

      {/* BENCHMARK TELEMETRIA RÁPIDA */}
      <div className="bg-surface-container rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-[20px]">speed</span>
            <span className="font-label-caps text-zinc-300 uppercase tracking-wider text-xs font-bold">
              {isEn ? "PRODUCTION ARCHITECTURAL BENCHMARKS" : "BENCHMARKS ARQUITETURAIS DE PRODUÇÃO"}
            </span>
          </div>
          <span className="font-code-inline text-xs text-emerald-400 font-semibold">AUDITED_ENV</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5 flex flex-col">
            <span className="font-label-caps text-zinc-400 block uppercase text-[10px]">Render Loop (FCP)</span>
            <span className="font-headline-md text-cyan-400 font-bold text-2xl mt-1">&lt; 140ms</span>
            <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">Lighthouse 100</span>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5 flex flex-col">
            <span className="font-label-caps text-zinc-400 block uppercase text-[10px]">
              {isEn ? "Strict TS Coverage" : "Cobertura Estrita TS"}
            </span>
            <span className="font-headline-md text-emerald-400 font-bold text-2xl mt-1">100.0%</span>
            <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">Zero Any Policy</span>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5 flex flex-col">
            <span className="font-label-caps text-zinc-400 block uppercase text-[10px]">Memory Footprint</span>
            <span className="font-headline-md text-indigo-300 font-bold text-2xl mt-1">&lt; 38MB</span>
            <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">Heap Snapshot</span>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5 flex flex-col">
            <span className="font-label-caps text-zinc-400 block uppercase text-[10px]">Cold Start Lambda</span>
            <span className="font-headline-md text-amber-400 font-bold text-2xl mt-1">&lt; 92ms</span>
            <span className="font-code-inline text-[10px] text-zinc-400 mt-0.5">Edge Optimized</span>
          </div>
        </div>
      </div>

      {/* TRAJETÓRIA DE CARREIRA EM PRODUÇÃO */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400 text-[20px]">timeline</span>
            <h2 className="font-headline-lg text-white font-bold text-xl sm:text-2xl tracking-tight">
              {isEn ? "Professional Career in Production" : "Trajetória Profissional em Produção"}
            </h2>
          </div>
          <span className="font-code-inline text-xs text-zinc-400">HISTÓRICO</span>
        </div>

        <div className="flex flex-col gap-4">
          {/* ITEM 1: Autocom3 */}
          <div className="bg-surface-container rounded-3xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-headline-sm text-white font-bold text-lg">Autocom3 Tecnologia</h3>
                <span className="font-body-sm text-cyan-300 text-sm font-medium">Full Stack Engineer</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-label-caps text-xs font-bold uppercase self-start">
                {isEn ? "CURRENT // 2024 - PRESENT" : "ATUAL // 2024 - PRESENTE"}
              </span>
            </div>
            <p className="font-body-sm text-zinc-300 text-sm mt-1 mb-4 leading-relaxed">
              {isEn
                ? "Development of high-scalability operational ecosystems, direct desktop-web communication bridges, critical infrastructure refactoring with clean architecture, and SGSH licensing lifecycle."
                : "Desenvolvimento de ecossistemas operacionais de alta escalabilidade, unificação do portal principal com mais de 25 submódulos, barramento de eventos seguro desktop-web e refatoração de infraestrutura crítica com arquitetura limpa."}
            </p>
            <div className="flex items-center gap-2 text-zinc-400 font-code-inline text-xs">
              <span className="material-symbols-outlined text-[15px] text-emerald-400">terminal</span>
              <span>NestJS, TypeScript, React 19, PostgreSQL, WebSocket, Docker, Clean Architecture</span>
            </div>
          </div>

          {/* ITEM 2: Domus */}
          <div className="bg-surface-container rounded-3xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-headline-sm text-white font-bold text-lg">Domus</h3>
                <span className="font-body-sm text-cyan-300 text-sm font-medium">Tech Lead &amp; Full Stack</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-high border border-white/10 text-zinc-300 font-label-caps text-xs font-semibold uppercase self-start">
                2023 - 2024
              </span>
            </div>
            <p className="font-body-sm text-zinc-300 text-sm mt-1 mb-4 leading-relaxed">
              {isEn
                ? "Technical leadership delivering digital products with dense UI, centralized design systems, end-to-end version control, and automated deployment pipelines."
                : "Liderança técnica na entrega de produtos digitais com interface densa, design systems centralizados, controle de versão de ponta a ponta e automação de deployment."}
            </p>
            <div className="flex items-center gap-2 text-zinc-400 font-code-inline text-xs">
              <span className="material-symbols-outlined text-[15px] text-cyan-400">terminal</span>
              <span>Next.js App Router, Tailwind tokens, Supabase, Jest, CI/CD</span>
            </div>
          </div>

          {/* ITEM 3: SIVIS */}
          <div className="bg-surface-container rounded-3xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-headline-sm text-white font-bold text-lg">SIVIS Tecnologia</h3>
                <span className="font-body-sm text-cyan-300 text-sm font-medium">Software Engineer</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-high border border-white/10 text-zinc-300 font-label-caps text-xs font-semibold uppercase self-start">
                2022 - 2023
              </span>
            </div>
            <p className="font-body-sm text-zinc-300 text-sm mt-1 mb-4 leading-relaxed">
              {isEn
                ? "Fault-tolerant microservices engineering, internal event-bus implementation, and I/O bottleneck mitigation across relational databases."
                : "Engenharia de microsserviços tolerantes a falhas, implementação de barramento de eventos internos e mitigação de gargalos de I/O em bancos relacionais."}
            </p>
            <div className="flex items-center gap-2 text-zinc-400 font-code-inline text-xs">
              <span className="material-symbols-outlined text-[15px] text-indigo-400">terminal</span>
              <span>Node.js, Docker, C# .NET, Redis Cache, SQL Tuning</span>
            </div>
          </div>

          {/* ITEM 4: UniFOA / EvaTech / SEBRAE */}
          <div className="bg-surface-container rounded-3xl p-6 border border-white/10 hover:border-amber-500/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-headline-sm text-white font-bold text-lg">UniFOA / EvaTech / SEBRAE</h3>
                <span className="font-body-sm text-cyan-300 text-sm font-medium">
                  {isEn ? "AI & Tech Innovation Mentor" : "Mentor de IA & Inovação Tecnológica"}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-high border border-white/10 text-zinc-300 font-label-caps text-xs font-semibold uppercase self-start">
                2022 - 2025
              </span>
            </div>
            <p className="font-body-sm text-zinc-300 text-sm mt-1 mb-4 leading-relaxed">
              {isEn
                ? "Technical training on practical application of language models, autonomous agents, graph-based knowledge structuring, and business-focused software engineering."
                : "Capacitação técnica em aplicação prática de modelos de linguagem, agentes autônomos, estruturação de dados em grafos e engenharia de software aplicada a negócios."}
            </p>
            <div className="flex items-center gap-2 text-zinc-400 font-code-inline text-xs">
              <span className="material-symbols-outlined text-[15px] text-amber-400">terminal</span>
              <span>Agentic Workflows, LLM Tools, RAG Architectures, Graph DBs</span>
            </div>
          </div>
        </div>
      </div>

      {/* CREDENCIAIS ACADÊMICAS & FORMAÇÃO — STACKED FULL-WIDTH (UM EM CIMA DO OUTRO) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-[20px]">school</span>
            <h2 className="font-headline-lg text-white font-bold text-xl sm:text-2xl tracking-tight">
              {isEn ? "Formal Education & Credentials" : "Formação & Credenciais Formais"}
            </h2>
          </div>
          <span className="font-code-inline text-xs text-zinc-400">ACADEMIC_ID</span>
        </div>

        {/* CARDS STACKED VERTICALMENTE COM LARGURA TOTAL */}
        <div className="grid grid-cols-1 gap-5 w-full">
          
          {/* CARD 1: BACHARELADO (FULL-WIDTH) */}
          <div className="bg-surface-container rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-start justify-between gap-5 border border-white/10 shadow-md hover:border-emerald-500/30 transition-all">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-label-caps text-xs font-bold uppercase tracking-wider">
                  {isEn ? "HIGHER EDUCATION (B.S.)" : "GRADUAÇÃO SUPERIOR (BACHARELADO)"}
                </span>
                <span className="font-code-inline text-xs text-zinc-400">CONCLUÍDO // 2022 - 2025</span>
              </div>
              <h3 className="font-headline-md text-white font-bold text-xl sm:text-2xl mt-1">
                Bacharelado em Sistemas de Informação
              </h3>
              <p className="font-body-md text-cyan-300 text-sm font-medium">
                Centro Universitário de Volta Redonda (UniFOA)
              </p>
              <p className="font-body-sm text-zinc-300 text-sm mt-1 leading-relaxed">
                Formação com ênfase rigorosa em Fundamentos de Computação, Engenharia de Software Moderna, Arquitetura de Redes &amp; Sistemas Operacionais, Algoritmos Avançados e Estruturas de Dados Particionadas. Trabalho de Conclusão de Curso (TCC) voltado à IA generativa e aplicações clínicas inclusivas.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-high text-zinc-200 font-code-inline text-xs">Engenharia de Software</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-high text-zinc-200 font-code-inline text-xs">Algoritmos &amp; Complexidade</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-high text-zinc-200 font-code-inline text-xs">Bancos de Dados Relacionais</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-high text-zinc-200 font-code-inline text-xs">Arquitetura de Computadores</span>
              </div>
            </div>
            <div className="md:w-56 flex-shrink-0 flex flex-col p-4 rounded-2xl bg-surface-container-low border border-white/5">
              <span className="font-label-caps text-zinc-400 uppercase text-[10px] tracking-wider">INSTITUIÇÃO</span>
              <span className="font-headline-sm text-white font-bold text-base mt-0.5">UniFOA</span>
              <span className="font-body-sm text-zinc-400 text-xs mt-2">Duração: 4 Anos</span>
              <span className="font-code-inline text-emerald-400 text-xs font-semibold mt-1">Status: Graduado</span>
            </div>
          </div>

          {/* CARD 2: ESPECIALIZAÇÃO FRONTEND (FULL-WIDTH) */}
          <div className="bg-surface-container rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-start justify-between gap-5 border border-white/10 shadow-md hover:border-cyan-500/30 transition-all">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-label-caps text-xs font-bold uppercase tracking-wider">
                  {isEn ? "ADVANCED SPECIALIZATION (200 HOURS)" : "ESPECIALIZAÇÃO AVANÇADA (200 HORAS)"}
                </span>
                <span className="font-code-inline text-xs text-zinc-400">PROFISSIONAL // ORIGAMID</span>
              </div>
              <h3 className="font-headline-md text-white font-bold text-xl sm:text-2xl mt-1">
                Frontend &amp; UI/UX Architecture
              </h3>
              <p className="font-body-md text-cyan-300 text-sm font-medium">
                Origamid Brasil
              </p>
              <p className="font-body-sm text-zinc-300 text-sm mt-1 leading-relaxed">
                Imersão intensiva em arquitetura de interfaces orientada a tokens, engenharia de layout com TailwindCSS e CSS nativo, performance de execução no motor V8 (JavaScript avançado), acessibilidade WAI-ARIA (WCAG 2.2), isolamento de estados complexos e padrões de renderização reativa.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-high text-zinc-200 font-code-inline text-xs">Design Tokens</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-high text-zinc-200 font-code-inline text-xs">Acessibilidade WAI-ARIA</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-high text-zinc-200 font-code-inline text-xs">V8 Runtime Performance</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-high text-zinc-200 font-code-inline text-xs">State Machines &amp; Slices</span>
              </div>
            </div>
            <div className="md:w-56 flex-shrink-0 flex flex-col p-4 rounded-2xl bg-surface-container-low border border-white/5">
              <span className="font-label-caps text-zinc-400 uppercase text-[10px] tracking-wider">CARGA HORÁRIA</span>
              <span className="font-headline-sm text-white font-bold text-base mt-0.5">200 Horas</span>
              <span className="font-body-sm text-zinc-400 text-xs mt-2">Certificação Técnica</span>
              <span className="font-code-inline text-cyan-400 text-xs font-semibold mt-1">Emitido &amp; Verificado</span>
            </div>
          </div>

          {/* CARD 3: IDIOMAS & PROFICIÊNCIA (FULL-WIDTH) */}
          <div className="bg-surface-container rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-start justify-between gap-5 border border-white/10 shadow-md hover:border-indigo-500/30 transition-all">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-label-caps text-xs font-bold uppercase tracking-wider">
                  {isEn ? "LINGUISTIC PROFICIENCY" : "PROFICIÊNCIA LINGUÍSTICA"}
                </span>
                <span className="font-code-inline text-xs text-zinc-400">GLOBAL READINESS</span>
              </div>
              <h3 className="font-headline-md text-white font-bold text-xl sm:text-2xl mt-1">
                Comunicação Técnica &amp; Internacional
              </h3>
              <p className="font-body-sm text-zinc-300 text-sm mt-1 leading-relaxed">
                Capacidade comprovada para atuar em times globais e remotos, redação de documentações técnicas de alto nível (RFCs, ADRs, contratos de API) e colaboração ágil com stakeholders internacionais.
              </p>
            </div>
            <div className="md:w-72 flex-shrink-0 grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col">
                <span className="font-label-caps text-zinc-400 uppercase text-[10px]">PORTUGUÊS</span>
                <span className="font-headline-sm text-white font-bold text-sm mt-1">Nativo (C2)</span>
                <span className="font-code-inline text-emerald-400 text-[10px] mt-0.5">Língua Materna</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col">
                <span className="font-label-caps text-zinc-400 uppercase text-[10px]">INGLÊS</span>
                <span className="font-headline-sm text-white font-bold text-sm mt-1">Intermediário (B2)</span>
                <span className="font-code-inline text-cyan-400 text-[10px] mt-0.5">Comunicação Técnica</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RODAPÉ DE CONVERSÃO & CONTATO EXECUTIVO COM ALTO CONTRASTE */}
      <footer className="bg-surface-container rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-label-caps text-emerald-400 uppercase tracking-wider text-xs font-bold">
              {isEn ? "DIRECT CHANNEL // READY FOR CRITICAL DEMANDS" : "CANAL DIRETO // PRONTO PARA DEMANDAS CRÍTICAS"}
            </span>
          </div>
          <h3 className="font-headline-lg text-white font-bold text-2xl sm:text-3xl tracking-tight">
            {isEn ? "Initiate Technical Conversation" : "Iniciar Conversação Técnica"}
          </h3>
          <p className="font-body-md text-zinc-300 text-sm sm:text-base mt-1 max-w-2xl">
            {isEn
              ? "Available for strategic engineering positions, architectural leadership, and high-scale challenges."
              : "Disponível para posições estratégicas de engenharia, liderança arquitetural e desafios de alta escala."}
          </p>
        </div>

        {/* BOTÃO WHATSAPP ALTO CONTRASTE */}
        <a
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 hover:text-zinc-950 font-bold text-base py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-[0.99] transition-all cursor-pointer relative z-10"
          href="https://wa.me/5524993264040?text=Ol%C3%A1%2C%20visualizei%20o%20Dossi%C3%AA%20T%C3%A9cnico%20e%20gostaria%20de%20conversar%20sobre%20uma%20oportunidade."
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="material-symbols-outlined text-[24px]">chat</span>
          <span>{isEn ? "Connect via WhatsApp (+55 24 99326-4040)" : "Conectar via WhatsApp (+55 24 99326-4040)"}</span>
        </a>

        {/* AÇÕES RÁPIDAS DE CONTATO */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
          {/* CÓPIA DE E-MAIL COM FEEDBACK */}
          <button
            onClick={handleCopyEmail}
            className="sm:col-span-1 w-full flex items-center justify-between bg-surface-container-high hover:bg-surface-bright text-zinc-100 hover:text-white font-code-inline text-xs py-3.5 px-4 rounded-xl transition-all border border-white/10 hover:border-white/20 cursor-pointer"
            type="button"
            title="Clique para copiar e-mail"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="material-symbols-outlined text-[18px] text-cyan-400">mail</span>
              <span className="truncate">{emailToCopy}</span>
            </div>
            <span className={`font-label-caps text-[10px] uppercase font-bold ml-2 flex-shrink-0 ${copied ? "text-emerald-400" : "text-zinc-400"}`}>
              {copied ? (isEn ? "COPIED!" : "COPIADO!") : (isEn ? "COPY" : "COPIAR")}
            </span>
          </button>

          {/* BOTÕES DE PERFIL EXTERNO */}
          <a
            className="flex items-center justify-center gap-2 bg-surface-container-high hover:bg-white text-zinc-100 hover:text-zinc-950 font-bold text-xs py-3.5 px-4 rounded-xl transition-all border border-white/10 cursor-pointer"
            href="https://github.com/PedroReoli"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            <span>GitHub (@PedroReoli)</span>
          </a>

          <a
            className="flex items-center justify-center gap-2 bg-surface-container-high hover:bg-white text-zinc-100 hover:text-zinc-950 font-bold text-xs py-3.5 px-4 rounded-xl transition-all border border-white/10 cursor-pointer"
            href="https://www.linkedin.com/in/pedro-lucas-reis-a93945171/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>LinkedIn (Pedro Lucas Reis)</span>
          </a>
        </div>

        {/* ASSINATURA INDUSTRIAL */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-400 font-label-caps text-xs uppercase border-t border-white/10 relative z-10">
          <span>PEDRO LUCAS REIS // LEAD FULL STACK &amp; AI ENGINEER</span>
          <span>SISTEMA 2026 // DOSSIÊ COMPLETO</span>
        </div>
      </footer>
    </section>
  )
}

export default StitchDossierSection
