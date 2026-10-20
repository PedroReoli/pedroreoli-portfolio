import React, { useState } from "react"
import { useLanguage } from "../../i18n/useLanguage"
import {
  Clock,
  CheckCircle2,
  Mail,
  ExternalLink,
} from "lucide-react"
import { FaGithub } from "react-icons/fa6"

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
        { label: "ECONOMIA DE TOKENS", value: "-92.2%" },
        { label: "LATÊNCIA MÉDIA CDP", value: "41ms" },
        { label: "PRECISÃO DE FERRAMENTAS", value: "99.4%" },
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
        { label: "FPS CONTÍNUO", value: "60.0 FPS" },
        { label: "LCP MÉDIO", value: "0.7s" },
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
        { label: "LATÊNCIA DE ESCRITA", value: "0.2ms" },
        { label: "MODO OFFLINE", value: "100%" },
        { label: "CONFLITOS CRDT", value: "Zero Divergência" },
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
        { label: "ERROS NÃO CAPTURADOS", value: "0.0%" },
        { label: "BUILD MONOREPO", value: "2.1s" },
        { label: "OVERHEAD DE PARSING", value: "< 0.4ms" },
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
    <div id="midia-e-blog" className="flex flex-col w-full gap-8 pb-12">
      {/* Cabeçalho da Página com H1 Semântico */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
          <span className="font-mono text-xs text-[#3fb950] uppercase tracking-wider font-semibold">
            PUBLICAÇÕES &amp; RECONHECIMENTO
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-[#f0f6fc] tracking-tight">
          {isEn
            ? "Technical Publications & Media"
            : "Mídia, Publicações & Ensaios Técnicos"}
        </h1>

        <p className="text-sm sm:text-base text-[#8b949e] max-w-3xl leading-relaxed">
          {isEn
            ? "Technical essays, open-source documentation, and media coverage regarding healthcare technology, AI agents, and systems architecture."
            : "Ensaios técnicos, documentação de código aberto e repercussão na imprensa sobre tecnologia assistiva, agentes autônomos e arquitetura de software."}
        </p>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {["ALL", "AGENTES & IA", "WEB VITALS", "LOCAL-FIRST"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors border ${
                filter === cat
                  ? "bg-[#21262d] text-[#f0f6fc] border-[#58a6ff] font-semibold"
                  : "bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc]"
              }`}
              type="button"
            >
              {cat === "ALL" ? "Todos os Ensaios" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de Artigos Técnicos */}
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="bg-[#161b22] rounded-xl p-5 sm:p-6 border border-[#30363d] flex flex-col justify-between hover:border-[#58a6ff]/40 transition-colors"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-[#21262d] text-[#58a6ff] font-mono text-[11px] border border-[#30363d]">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#8b949e]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.time}</span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#f0f6fc] tracking-tight leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                  {art.body}
                </p>

                {/* Métricas do Artigo */}
                <div className="grid grid-cols-3 gap-2 py-2 my-1 border-y border-[#21262d]">
                  {art.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#8b949e] uppercase truncate">
                        {m.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#3fb950] mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ação com Link para o Repositório / Documento */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-2 border-t border-[#21262d]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {art.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[#0d1117] font-mono text-[10px] text-[#8b949e] border border-[#30363d]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <a
                  href={art.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] font-medium text-xs transition-colors border border-[#30363d] self-start sm:self-auto"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>Ver Documentação</span>
                  <ExternalLink className="w-3 h-3 text-[#8b949e]" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Formulário de Newsletter com Label Acessível */}
      <section className="rounded-xl bg-[#161b22] p-6 sm:p-8 border border-[#30363d] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#3fb950]" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight">
            Despachos Técnicos de Engenharia
          </h2>
        </div>
        <p className="text-sm text-[#8b949e] max-w-2xl leading-relaxed">
          Receba notas de arquitetura, análises de desempenho e novos artigos diretamente no seu e-mail. Sem spam, apenas conteúdo técnico relevante.
        </p>

        {subscribed ? (
          <div className="p-3.5 rounded-lg bg-[#238636]/15 border border-[#238636]/30 text-[#3fb950] font-mono text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
            <span>Inscrição confirmada com sucesso. Obrigado!</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-1 max-w-xl">
            <div className="flex items-center rounded-lg bg-[#0d1117] px-3.5 py-2.5 border border-[#30363d] flex-1">
              <Mail className="w-4 h-4 text-[#8b949e] mr-2 shrink-0" />
              {/* Label acessível para atender WCAG / axe-core */}
              <label htmlFor="newsletter-email" className="sr-only">
                Endereço de e-mail para despachos técnicos
              </label>
              <input
                id="newsletter-email"
                className="bg-transparent text-[#f0f6fc] font-mono placeholder:text-[#8b949e] w-full focus:outline-none text-xs sm:text-sm"
                placeholder="seu.email@empresa.com.br"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </div>
            <button
              className="py-2.5 px-5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-xs sm:text-sm active:scale-95 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
              type="submit"
            >
              Assinar Feed
            </button>
          </form>
        )}

        <div className="flex items-center justify-between text-[#8b949e] font-mono pt-2 text-xs border-t border-[#21262d]">
          <span>Cancelamento em 1-clique</span>
          <span>Zero Trackers</span>
        </div>
      </section>
    </div>
  )
}

export default StitchMediaBlogSection
