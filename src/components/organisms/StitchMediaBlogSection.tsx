import React, { useState } from "react"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchMediaBlogSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [filter, setFilter] = useState<string>("ALL")
  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState("")

  const articles = [
    {
      id: "2026-03A",
      category: "AGENTES & IA",
      tag: "AGENTES & IA",
      time: "12 MIN",
      date: "MAR/2026",
      title: "Reduzindo em 92.2% o Custo de Tokens de Agentes de IA Web Utilizando AXTree",
      body: "Interceptação direta da árvore de acessibilidade do Chromium via protocolo CDP, reduzindo o payload de 240k para 18.7k tokens por passo com ferramentas determinísticas.",
      metrics: [
        { label: "TOKEN REDUCTION", value: "-92.2%" },
        { label: "CDP LATENCY", value: "41ms AVG" },
        { label: "TOOL PRECISION", value: "99.4% HIT" },
      ],
      tags: ["CDP", "A11Y", "TOKENS"],
      link: "https://github.com/PedroReoli/Achilles-CDP-Agent",
    },
    {
      id: "2026-02B",
      category: "WEB VITALS",
      tag: "PERFORMANCE",
      time: "15 MIN",
      date: "FEV/2026",
      title: "Arquitetura Zero-CLS em Aplicações Densas com 500+ Tokens e Dados em Tempo Real",
      body: "Como manter Cumulative Layout Shift (CLS) em 0.000 absoluto em dashboards corporativos com centenas de atualizações via WebSocket por segundo, CSS subgrid e content-visibility.",
      metrics: [
        { label: "CLS MEDIDO", value: "0.000" },
        { label: "FPS CONTINUO", value: "60.0 FPS" },
        { label: "LCP TIME", value: "0.7s" },
      ],
      tags: ["LAYOUT", "CSS", "VITALS"],
      link: "https://github.com/PedroReoli",
    },
    {
      id: "2026-01C",
      category: "LOCAL-FIRST",
      tag: "ARQUITETURA",
      time: "10 MIN",
      date: "JAN/2026",
      title: "Design de Sistemas Local-First com SQLite WAL e Resolução de Conflitos CRDT em Rust",
      body: "Estrutura do Organon OS: como o log Write-Ahead (WAL) do SQLite combinado com árvores de estado em memória e sincronização assíncrona P2P viabiliza latência zero de escrita.",
      metrics: [
        { label: "WRITE LATENCY", value: "0.2ms" },
        { label: "OFFLINE DURATION", value: "INFINITA" },
        { label: "CRDT CONFLICTS", value: "0 DIVERGÊNCIA" },
      ],
      tags: ["PRIVACY", "CRDT", "SQLITE"],
      link: "https://github.com/PedroReoli/organon",
    },
    {
      id: "2025-12D",
      category: "AGENTES & IA",
      tag: "TYPESCRIPT",
      time: "8 MIN",
      date: "DEZ/2025",
      title: "Padronização de Contratos de API com TypeScript Estrito e Validação Zod",
      body: "Esteira de geração automática de contratos de rede com Zod e TypeScript strict-mode, erradicando discrepâncias de runtime entre microsserviços Node e endpoints Python.",
      metrics: [
        { label: "RUNTIME ERRORS", value: "0.0% UNCAUGHT" },
        { label: "GEN BUILD", value: "2.1s MONO" },
        { label: "PARSING OVERHEAD", value: "< 0.4ms" },
      ],
      tags: ["TYPESCRIPT", "ZOD", "CONTRACTS"],
      link: "https://github.com/PedroReoli",
    },
  ]

  const filteredArticles =
    filter === "ALL"
      ? articles
      : articles.filter((art) => art.category === filter || art.tag === filter)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <div id="midia-e-blog" className="flex flex-col w-full gap-10 pb-16">
      {/* TOP TELEMETRY STRIP & RADIAL BEACON */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container shadow-sm border border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="font-telemetry-tag text-emerald-400 tracking-wider uppercase text-xs font-semibold">
              BROADCAST NODE // 0x4F9B — TRANSMISSÃO TÉCNICA
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-zinc-300 font-label-caps text-xs border border-white/10">
            <span className="material-symbols-outlined text-[15px] text-cyan-400">rss_feed</span>
            <span>LATÊNCIA: 18ms</span>
          </div>
        </div>
      </section>

      {/* SECTION 1: YOUTUBE TECHNICAL BROADCAST (WIDESCREEN 3 COLUNAS) */}
      <section className="flex flex-col rounded-3xl bg-surface-container p-6 sm:p-8 shadow-xl gap-6 border border-white/10">
        {/* Channel Header Metadata */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 font-label-caps text-xs font-bold uppercase tracking-wider">
              // CANAL TÉCNICO NO YOUTUBE
            </span>
            <span className="font-code-inline text-xs text-zinc-400">BASTIDORES DE ENGENHARIA</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
            <div>
              <h2 className="font-headline-lg text-white tracking-tight font-bold text-2xl sm:text-3xl">
                DISSECANDO SISTEMAS REAIS, IA E ARQUITETURA
              </h2>
              <p className="font-body-md text-zinc-300 text-sm sm:text-base mt-1">
                {isEn
                  ? "Production code teardowns, model instrumentation, and low-latency system design recorded directly from the terminal."
                  : "Teardowns de código de produção, instrumentação de modelos e designs de baixa latência gravados direto do terminal."}
              </p>
            </div>

            <a
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-lg shadow-red-600/25 shrink-0 self-start sm:self-auto cursor-pointer"
              href="https://www.youtube.com/@PedroReoli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>INSCREVER-SE NO CANAL</span>
            </a>
          </div>
        </div>

        {/* 3 Widescreen Video Cards (Grid 3 Colunas no Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* EPISODE 1 */}
          <article className="flex flex-col rounded-2xl bg-surface-container-low overflow-hidden group border border-white/10 hover:border-cyan-500/40 transition-all shadow-md">
            <div className="relative w-full aspect-video bg-surface-container-high overflow-hidden">
              <img
                className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-500 group-hover:scale-105"
                alt="Como Construir um Servidor MCP"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNpFuj5rzK6RzJ_GyX5BHTcpx6qDMJBRl9X-4W9NJAivqzr1aci5M09fqSMc5Pma-6lMQWx-ZzOoW0jPhFSIgAyKS6QmCOrN0-OsVIYCT1kxGACRj1BDioCDJVwQfwlDjFUKj2qlVZR8h_7DsBAUlYAhIxAhZLgLJKT0rMApFo8kv77JP4aTCtuXPBu7Gad2UdmTGjXSkLLz6DWVW3quHCT4HTfJRt_K7YWmZtq8SkZQdhDpLBMlGs"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15] via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-surface-container-lowest/90 backdrop-blur-md text-cyan-400 font-code-inline text-[11px] font-bold border border-white/10">
                  EP // 042
                </span>
              </div>
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-lowest/95 backdrop-blur-md text-zinc-300 font-code-inline text-[11px] border border-white/10">
                <span className="material-symbols-outlined text-[13px] text-cyan-400">schedule</span>
                <span>28:45</span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
              <div>
                <span className="font-label-caps text-cyan-400 text-[10px] uppercase font-bold tracking-wider">
                  ARQUITETURA DE AGENTES
                </span>
                <h3 className="font-headline-sm text-white font-bold text-base mt-1 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                  Construindo Servidores MCP de Alta Performance em TypeScript
                </h3>
                <p className="font-body-sm text-zinc-300 text-xs mt-1 line-clamp-2">
                  Implementação do Model Context Protocol do zero com validação JSON-RPC estrita e isolamento de runtime.
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="font-code-inline text-[10px] text-zinc-400">Terminal Deep Dive</span>
                <span className="material-symbols-outlined text-[16px] text-cyan-400 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </article>

          {/* EPISODE 2 */}
          <article className="flex flex-col rounded-2xl bg-surface-container-low overflow-hidden group border border-white/10 hover:border-emerald-500/40 transition-all shadow-md">
            <div className="relative w-full aspect-video bg-surface-container-high overflow-hidden">
              <img
                className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-500 group-hover:scale-105"
                alt="Navegação Headless com AXTree"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhBLBGJhaPoMI4wPlqPu-o1jfGnAxj6cAcwyaQmtg21R8L9GnYaCZ3LTYWY_Mu0Lf5xmM9gQAkgKNTqhq6AL4BTIZlUwWZrH7FP-xW6QxkzMxHT8NH12soGDFd-mXVKuN-ufclkBnL8lndeX6HdPpw57ssgw4fmhLZ-o6WivwgGPwM4OY4PHsAcXBr5Ojn_-euIVh_MnH4m7N31NEIuubk6hj6NRsXWP7mguz1ydOSbnkS7Ghswg0r"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15] via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-surface-container-lowest/90 backdrop-blur-md text-emerald-400 font-code-inline text-[11px] font-bold border border-white/10">
                  EP // 041
                </span>
              </div>
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-lowest/95 backdrop-blur-md text-zinc-300 font-code-inline text-[11px] border border-white/10">
                <span className="material-symbols-outlined text-[13px] text-emerald-400">schedule</span>
                <span>34:12</span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
              <div>
                <span className="font-label-caps text-emerald-400 text-[10px] uppercase font-bold tracking-wider">
                  AUTOMAÇÃO DE BROWSERS
                </span>
                <h3 className="font-headline-sm text-white font-bold text-base mt-1 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                  Como Cortamos 92% dos Tokens Usando AXTree e Chrome CDP
                </h3>
                <p className="font-body-sm text-zinc-300 text-xs mt-1 line-clamp-2">
                  Interceptação de nós semânticos no Chromium para navegação autônoma com custo ínfimo de contexto.
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="font-code-inline text-[10px] text-zinc-400">Benchmarks Reais</span>
                <span className="material-symbols-outlined text-[16px] text-emerald-400 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </article>

          {/* EPISODE 3 */}
          <article className="flex flex-col rounded-2xl bg-surface-container-low overflow-hidden group border border-white/10 hover:border-indigo-500/40 transition-all shadow-md">
            <div className="relative w-full aspect-video bg-surface-container-high overflow-hidden">
              <img
                className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-500 group-hover:scale-105"
                alt="Governança de Design Systems"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtxYDrcM1Qy-1E_8i5XEtqLBXfxC-nfmr2bWSoBDeLxNRDIKnqG6Cb0HjTebAtdmDlKV2pgKz4RrFg1jPQki67K4EAM5K2Ns5qoSobeVk95EbeCRrlRVt1OqVKSgrkYWPjpsJP7OIGFYL-S8r_E97TiZxs194cTKwJuTeArEUiwXQDFnF63JyHrVPm1jBLV9KNi_Bc2l0F1yL8Q5dY1X8ZdIiumZ_CgKvfcmQKWp8--BYN_AHNaTV9"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15] via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-surface-container-lowest/90 backdrop-blur-md text-indigo-300 font-code-inline text-[11px] font-bold border border-white/10">
                  EP // 040
                </span>
              </div>
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-lowest/95 backdrop-blur-md text-zinc-300 font-code-inline text-[11px] border border-white/10">
                <span className="material-symbols-outlined text-[13px] text-indigo-400">schedule</span>
                <span>22:05</span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
              <div>
                <span className="font-label-caps text-indigo-400 text-[10px] uppercase font-bold tracking-wider">
                  DESIGN SYSTEMS &amp; TOKENS
                </span>
                <h3 className="font-headline-sm text-white font-bold text-base mt-1 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                  Governança de Design Systems com 500+ Tokens
                </h3>
                <p className="font-body-sm text-zinc-300 text-xs mt-1 line-clamp-2">
                  Prevenção de layout shifts (CLS 0.000) e pipelines de CI com testes visuais automatizados sem penalizar a DX.
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="font-code-inline text-[10px] text-zinc-400">CI/CD &amp; Testing</span>
                <span className="material-symbols-outlined text-[16px] text-indigo-400 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION 2: CADERNOS DE ENGENHARIA (BLOG TÉCNICO & ENSAIOS) */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400 text-[20px]">article</span>
              <h2 className="font-headline-lg text-white tracking-tight font-bold text-2xl sm:text-3xl">
                CADERNOS DE ENGENHARIA
              </h2>
            </div>
            <span className="font-code-inline text-xs text-zinc-400">4 ENSAIOS ARQUIVADOS</span>
          </div>
          <p className="font-body-md text-zinc-300 text-sm sm:text-base">
            Investigações empíricas sobre sistemas distribuídos, custo de inferência, compilação estática e arquiteturas operacionais.
          </p>
        </div>

        {/* Filter chips com Alto Contraste */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {["ALL", "AGENTES & IA", "WEB VITALS", "LOCAL-FIRST"].map((item) => {
            const isSelected = filter === item
            return (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 rounded-xl font-code-inline text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold border-emerald-400 shadow-md shadow-emerald-500/20"
                    : "bg-surface-container hover:bg-surface-container-high text-zinc-300 hover:text-white border-white/10"
                }`}
                onClick={() => setFilter(item)}
              >
                {item === "ALL" ? "TODOS (04)" : item}
              </button>
            )
          })}
        </div>

        {/* Articles List */}
        <div className="flex flex-col gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="flex flex-col rounded-3xl bg-surface-container p-6 sm:p-7 shadow-md gap-4 border border-white/10 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="font-telemetry-tag text-cyan-400 uppercase tracking-wider text-xs font-bold">
                    DOC_ID // {art.id}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 font-code-inline text-xs">
                  <span className="material-symbols-outlined text-[14px] text-zinc-400">timer</span>
                  <span>{art.time}</span>
                  <span className="mx-1">•</span>
                  <span>{art.date}</span>
                </div>
              </div>

              <h3 className="font-headline-md text-white tracking-tight font-bold text-lg sm:text-xl">
                {art.title}
              </h3>

              <p className="font-body-md text-zinc-300 leading-relaxed text-sm sm:text-base">
                {art.body}
              </p>

              {/* Metrics pill bar */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-surface-container-lowest font-code-inline text-xs border border-white/5">
                {art.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className="text-zinc-400 font-label-caps text-[10px]">{m.label}</span>
                    <span className="text-emerald-400 font-bold text-sm mt-0.5">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Read Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {art.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-surface-container-high font-code-inline text-xs text-zinc-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <a
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-white text-zinc-100 hover:text-zinc-950 font-bold text-xs transition-all border border-white/10 cursor-pointer self-start sm:self-auto"
                  href={art.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>LER ENSAIO COMPLETO</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NEWSLETTER COM BOTÃO DE ALTO CONTRASTE */}
      <section className="rounded-3xl bg-surface-container p-6 sm:p-8 shadow-xl flex flex-col gap-4 border border-white/10 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[22px] text-emerald-400">mark_email_read</span>
          <span className="font-headline-lg text-white font-bold text-xl sm:text-2xl tracking-tight">
            Despachos Técnicos de Engenharia
          </span>
        </div>
        <p className="font-body-md text-zinc-300 text-sm sm:text-base max-w-2xl">
          Receba logs de arquitetura brutos, snippets validados e análises de desempenho diretamente no seu e-mail. Zero marketing, apenas código e arquitetura.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-code-inline text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>FEED CONECTADO COM SUCESSO // CHAVE DE DISPATCH: 2026-OK</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-2 max-w-xl">
            <div className="flex items-center rounded-2xl bg-surface-container-lowest px-4 py-3 border border-white/10 flex-1">
              <span className="material-symbols-outlined text-[18px] text-zinc-400 mr-2">mail</span>
              <input
                className="bg-transparent text-white font-code-inline placeholder:text-zinc-500 w-full focus:outline-none text-sm"
                placeholder="seu.email@empresa.com.br"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </div>
            <button
              className="py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
              type="submit"
            >
              ASSINAR FEED
            </button>
          </form>
        )}

        <div className="flex items-center justify-between text-zinc-400 font-label-caps pt-2 text-xs border-t border-white/5">
          <span>PGP SIGNED: KEY_0x82DE</span>
          <span>SEM TRACKERS // CANCELAMENTO EM 1-CLIQUE</span>
        </div>
      </section>
    </div>
  )
}

export default StitchMediaBlogSection
