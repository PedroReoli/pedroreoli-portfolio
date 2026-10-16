import React, { useState } from "react"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchAutocom3Section: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [activeStage, setActiveStage] = useState("stage-01")

  const scrollToStage = (stageId: string) => {
    setActiveStage(stageId)
    const el = document.getElementById(stageId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      el.classList.add("ring-2", "ring-cyan-400")
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-cyan-400")
      }, 1200)
    }
  }

  return (
    <div id="autocom3" className="flex flex-col w-full pb-16 space-y-8">
      {/* Top Telemetry Banner & Case Status */}
      <section className="w-full bg-surface-container rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-4 border border-cyan-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-500/30 w-fit">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-telemetry-tag text-cyan-300 tracking-wider uppercase text-xs font-bold">
              CORE ENTERPRISE ENGINE: ACTIVE
            </span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 font-code-inline text-xs">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">terminal</span>
            <span className="font-label-caps">REL_v3.4.8-ENTERPRISE-PROD</span>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="font-headline-lg text-white tracking-tight font-bold text-2xl sm:text-3xl lg:text-4xl">
            ECOSSISTEMA CORPORATIVO ERP AUTOCOM3
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-zinc-400">
            <span className="font-telemetry-tag tracking-wider text-cyan-400 font-semibold">
              ENGENHARIA DE MISSÃO CRÍTICA
            </span>
            <span>•</span>
            <span className="font-label-caps text-emerald-400 font-semibold">25+ MÓDULOS UNIFICADOS</span>
            <span>•</span>
            <span className="font-label-caps text-indigo-300 font-semibold">MULTI-TENANT FABRIC</span>
          </div>
        </div>

        <p className="font-body-md text-zinc-300 text-sm sm:text-base leading-relaxed relative z-10 max-w-4xl">
          {isEn
            ? "Unified enterprise ERP platform powering retail, wholesale, and logistics. Multi-module operations center integrating support, commercial, billing, tax engines, and critical licensing lifecycle (SGSH) with sub-second synchronization."
            : "Plataforma corporativa de retaguarda e licenciamento de missão crítica que unifica mais de 25 submódulos integrados (Operações, Propostas, Licenças SGSH, Catálogo de SKUs e Ferramentas Fiscais), conectando retaguardas em nuvem com terminais de vendas locais (PDVs) em todo o território nacional."}
        </p>

        {/* Operational Visual Telemetry Bar with Sparkline */}
        <div className="relative w-full h-24 rounded-2xl overflow-hidden bg-surface-container-lowest mt-2 border border-white/10 relative z-10">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
              backgroundSize: "8px 8px",
            }}
          />
          <div className="relative h-full flex flex-col justify-between p-3.5">
            <div className="flex items-center justify-between text-zinc-300">
              <span className="font-label-caps tracking-widest text-emerald-400 flex items-center gap-1.5 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                TELEMETRIA DE CARGA EM TEMPO REAL
              </span>
              <span className="font-code-inline text-emerald-400 font-bold text-xs">SLA 99.98%</span>
            </div>

            {/* Inline SVG Sparkline */}
            <svg className="w-full h-9 stroke-cyan-400 fill-none" preserveAspectRatio="none" viewBox="0 0 300 32">
              <path
                d="M0,24 L20,22 L45,26 L60,18 L90,20 L120,8 L140,16 L175,10 L205,14 L235,5 L260,12 L285,7 L300,9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                className="fill-cyan-500/10 stroke-none"
                d="M0,24 L20,22 L45,26 L60,18 L90,20 L120,8 L140,16 L175,10 L205,14 L235,5 L260,12 L285,7 L300,9 L300,32 L0,32 Z"
              />
            </svg>

            <div className="flex justify-between items-center text-zinc-400 font-label-caps text-xs">
              <span className="text-zinc-300">TX: 4.8M REQUISIÇÕES/DIA</span>
              <span className="text-emerald-400 font-semibold">LATÊNCIA MÉDIA: 18ms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Matrices: 4 Key Metric Displays */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-surface-container p-5 rounded-2xl flex flex-col justify-between shadow-md border border-white/10 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-zinc-400 text-xs font-semibold uppercase">PDVS ATIVOS</span>
            <span className="material-symbols-outlined text-[18px] text-cyan-400">point_of_sale</span>
          </div>
          <div className="mt-2">
            <span className="font-headline-md text-white font-bold text-2xl sm:text-3xl">15k+</span>
            <p className="font-body-sm text-zinc-400 text-xs mt-0.5">Terminais em produção</p>
          </div>
        </div>

        <div className="bg-surface-container p-5 rounded-2xl flex flex-col justify-between shadow-md border border-white/10 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-zinc-400 text-xs font-semibold uppercase">GMV AUDITADO</span>
            <span className="material-symbols-outlined text-[18px] text-emerald-400">payments</span>
          </div>
          <div className="mt-2">
            <span className="font-headline-md text-emerald-400 font-bold text-2xl sm:text-3xl">R$ 42M+</span>
            <p className="font-body-sm text-zinc-400 text-xs mt-0.5">Transacionados/mês</p>
          </div>
        </div>

        <div className="bg-surface-container p-5 rounded-2xl flex flex-col justify-between shadow-md border border-white/10 hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-zinc-400 text-xs font-semibold uppercase">SUBMÓDULOS</span>
            <span className="material-symbols-outlined text-[18px] text-indigo-400">widgets</span>
          </div>
          <div className="mt-2">
            <span className="font-headline-md text-indigo-300 font-bold text-2xl sm:text-3xl">25+</span>
            <p className="font-body-sm text-zinc-400 text-xs mt-0.5">Operações unificadas</p>
          </div>
        </div>

        <div className="bg-surface-container p-5 rounded-2xl flex flex-col justify-between shadow-md border border-white/10 hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-zinc-400 text-xs font-semibold uppercase">PERFORMANCE</span>
            <span className="material-symbols-outlined text-[18px] text-amber-400">speed</span>
          </div>
          <div className="mt-2">
            <span className="font-headline-md text-amber-400 font-bold text-2xl sm:text-3xl">-40%</span>
            <p className="font-body-sm text-zinc-400 text-xs mt-0.5">Latência percebida em tela</p>
          </div>
        </div>
      </section>

      {/* Stage Navigator: Horizontal Tabs with High-Contrast Buttons */}
      <section className="w-full">
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="font-label-caps text-zinc-400 uppercase tracking-wider text-xs font-semibold">
            MAPA DOS 6 MÓDULOS ESSENCIAIS
          </span>
          <span className="font-label-caps text-emerald-400 flex items-center gap-1.5 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            TODOS EM PRODUÇÃO
          </span>
        </div>

        {/* Micro Tabs Switcher Container */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1" id="stageTabs">
          {[
            { id: "stage-01", num: "01", label: "PAINEL DE OPERAÇÕES" },
            { id: "stage-02", num: "02", label: "PROPOSTAS COMERCIAIS" },
            { id: "stage-03", num: "03", label: "OPORTUNIDADES" },
            { id: "stage-04", num: "04", label: "LICENÇAS SGSH" },
            { id: "stage-05", num: "05", label: "CATÁLOGO DE SKUS" },
            { id: "stage-06", num: "06", label: "FERRAMENTAS FISCAIS" },
          ].map((tab) => {
            const isActive = activeStage === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all text-xs border cursor-pointer ${
                  isActive
                    ? "bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20"
                    : "bg-surface-container hover:bg-surface-container-high text-zinc-300 hover:text-white border-white/10"
                }`}
                onClick={() => scrollToStage(tab.id)}
              >
                <span className={`font-code-inline text-xs ${isActive ? "text-zinc-950 font-bold" : "text-cyan-400"}`}>
                  {tab.num}
                </span>
                <span className="font-label-caps whitespace-nowrap">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* 6 Stacked Real Enterprise Modules (Deep Technical Breakdown) */}
      <section className="flex flex-col space-y-6 w-full">
        
        {/* MÓDULO 01: Painel Central de Operações Multissetorial */}
        <article
          className="w-full bg-surface-container rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col gap-3.5 border border-white/10 hover:border-cyan-500/40 transition-all"
          id="stage-01"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-code-inline text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-md font-bold">
                01 // MÓDULO
              </span>
              <span className="font-label-caps text-zinc-400 text-xs">/admin/modulo/operacoes</span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-cyan-400">dashboard_customize</span>
          </div>

          <div>
            <h2 className="font-headline-lg text-white tracking-tight font-bold text-lg sm:text-xl">
              PAINEL CENTRAL DE OPERAÇÕES MULTISSETORIAL
            </h2>
            <p className="font-body-md text-zinc-300 mt-1 leading-relaxed text-xs sm:text-sm">
              Unificação de mais de 25 submódulos antes dispersos em um hub com controle RBAC, filtros inteligentes por áreas transversais e sistema de favoritos com persistência local.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">React 19</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Filtros Transversais</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Persistência Local</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Controle RBAC</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-cyan-400">Zero Reflow</span>
          </div>

          {/* Screenshots Reais do Módulo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-1">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md bg-surface-container-lowest">
              <img
                src="/portfolio-autocom3/01-painel-operacoes-visao-geral.png"
                alt="Painel de Operações - Visão Geral"
                className="w-full h-52 object-cover object-top hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2.5 bg-surface-container-lowest border-t border-white/5">
                <span className="font-label-caps text-[11px] text-zinc-300 font-semibold">VISÃO GERAL DO GRID DE SETORES</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md bg-surface-container-lowest">
              <img
                src="/portfolio-autocom3/02-painel-operacoes-dropdown-filtros.png"
                alt="Dropdown de Filtros Avançados"
                className="w-full h-52 object-cover object-top hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2.5 bg-surface-container-lowest border-t border-white/5">
                <span className="font-label-caps text-[11px] text-zinc-300 font-semibold">DROPDOWN DE FILTROS POR ÁREAS</span>
              </div>
            </div>
          </div>
        </article>

        {/* MÓDULO 02: Motor de Propostas Comerciais & Precificação */}
        <article
          className="w-full bg-surface-container rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col gap-3.5 border border-white/10 hover:border-emerald-500/40 transition-all"
          id="stage-02"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-code-inline text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-md font-bold">
                02 // MÓDULO
              </span>
              <span className="font-label-caps text-zinc-400 text-xs">/admin/modulo/propostas</span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-emerald-400">request_quote</span>
          </div>

          <div>
            <h2 className="font-headline-lg text-white tracking-tight font-bold text-lg sm:text-xl">
              MOTOR DE PROPOSTAS COMERCIAIS &amp; PRECIFICAÇÃO
            </h2>
            <p className="font-body-md text-zinc-300 mt-1 leading-relaxed text-xs sm:text-sm">
              Simulação analítica de propostas corporativas, precificação flexível de planos SaaS e cálculo automatizado de margens para canais de revenda com faturamento recorrente.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Motor de Preços</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Planos SaaS</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Emissão Contratual</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-emerald-400">Margens Dinâmicas</span>
          </div>

          {/* Screenshot Real */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md bg-surface-container-lowest mt-1">
            <img
              src="/portfolio-autocom3/01-propostas-comerciais-listagem.png"
              alt="Listagem de Propostas Comerciais"
              className="w-full max-h-[340px] object-cover object-top hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="p-2.5 bg-surface-container-lowest border-t border-white/5">
              <span className="font-label-caps text-[11px] text-zinc-300 font-semibold">LISTAGEM DE PROPOSTAS CORPORATIVAS</span>
            </div>
          </div>
        </article>

        {/* MÓDULO 03: Pipeline de Oportunidades Comerciais */}
        <article
          className="w-full bg-surface-container rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col gap-3.5 border border-white/10 hover:border-indigo-500/40 transition-all"
          id="stage-03"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-code-inline text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-md font-bold">
                03 // MÓDULO
              </span>
              <span className="font-label-caps text-zinc-400 text-xs">/admin/modulo/propostas=oportunidade</span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-indigo-400">handshake</span>
          </div>

          <div>
            <h2 className="font-headline-lg text-white tracking-tight font-bold text-lg sm:text-xl">
              PIPELINE DE OPORTUNIDADES &amp; QUALIFICAÇÃO
            </h2>
            <p className="font-body-md text-zinc-300 mt-1 leading-relaxed text-xs sm:text-sm">
              Captação comercial de alto valor com formulários multi-etapas, validações assíncronas de conformidade cadastral e qualificação automática de leads B2B.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Formulários Complexos</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Validação Zod / React Hook Form</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-indigo-300">Esteira de Qualificação</span>
          </div>

          {/* Screenshot Real */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md bg-surface-container-lowest mt-1">
            <img
              src="/portfolio-autocom3/01-formulario-oportunidade-comercial.png"
              alt="Formulário de Oportunidade Comercial"
              className="w-full max-h-[340px] object-cover object-top hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="p-2.5 bg-surface-container-lowest border-t border-white/5">
              <span className="font-label-caps text-[11px] text-zinc-300 font-semibold">FORMULÁRIO DE OPORTUNIDADE COMERCIAL</span>
            </div>
          </div>
        </article>

        {/* MÓDULO 04: Ecossistema SGSH & Licenciamento de Missão Crítica */}
        <article
          className="w-full bg-surface-container rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col gap-3.5 border border-white/10 hover:border-cyan-500/40 transition-all"
          id="stage-04"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-code-inline text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-md font-bold">
                04 // MÓDULO
              </span>
              <span className="font-label-caps text-zinc-400 text-xs">/admin/modulo/licencas</span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-cyan-400">verified_user</span>
          </div>

          <div>
            <h2 className="font-headline-lg text-white tracking-tight font-bold text-lg sm:text-xl">
              ECOSSISTEMA SGSH &amp; CICLO DE VIDA DE LICENCIAMENTO
            </h2>
            <p className="font-body-md text-zinc-300 mt-1 leading-relaxed text-xs sm:text-sm">
              Gestão de ciclo de vida completo de licenças: ativação, liberação emergencial com tolerância de +4 dias, prorrogação e modal de consulta rápida &ldquo;Ficha do Cliente&rdquo; somente leitura com cópia atômica.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Ciclo de Vida SGSH</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Liberação Emergencial +4D</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Dupla Confirmação</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-cyan-400">Ficha do Cliente View-Only</span>
          </div>

          {/* 3 Screenshots Reais do SGSH */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-1">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md bg-surface-container-lowest">
              <img
                src="/portfolio-autocom3/01-licencas-sgsh-painel-central.png"
                alt="Painel Central de Licenças SGSH"
                className="w-full h-44 object-cover object-top hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2.5 bg-surface-container-lowest border-t border-white/5">
                <span className="font-label-caps text-[11px] text-zinc-300 font-semibold">PAINEL CENTRAL DE LICENÇAS</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md bg-surface-container-lowest">
              <img
                src="/portfolio-autocom3/02-licenca-detalhes-frames-ciclo-de-vida.png"
                alt="Detalhes e Frames de Ciclo de Vida"
                className="w-full h-44 object-cover object-top hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2.5 bg-surface-container-lowest border-t border-white/5">
                <span className="font-label-caps text-[11px] text-zinc-300 font-semibold">CICLO DE VIDA &amp; PRAZOS</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md bg-surface-container-lowest">
              <img
                src="/portfolio-autocom3/03-modal-dados-cliente-somente-leitura.png"
                alt="Modal Ficha do Cliente"
                className="w-full h-44 object-cover object-top hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2.5 bg-surface-container-lowest border-t border-white/5">
                <span className="font-label-caps text-[11px] text-zinc-300 font-semibold">FICHA DO CLIENTE VIEW-ONLY</span>
              </div>
            </div>
          </div>
        </article>

        {/* MÓDULO 05: Catálogo de SKUs, Módulos & Categorias */}
        <article
          className="w-full bg-surface-container rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col gap-3.5 border border-white/10 hover:border-amber-500/40 transition-all"
          id="stage-05"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-code-inline text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-md font-bold">
                05 // MÓDULO
              </span>
              <span className="font-label-caps text-zinc-400 text-xs">/admin/modulo/skus</span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-amber-400">category</span>
          </div>

          <div>
            <h2 className="font-headline-lg text-white tracking-tight font-bold text-lg sm:text-xl">
              CATÁLOGO DE SKUS, MÓDULOS &amp; CATEGORIAS
            </h2>
            <p className="font-body-md text-zinc-300 mt-1 leading-relaxed text-xs sm:text-sm">
              Estruturação granular do catálogo SaaS: composição modular de pacotes, recursos bloqueados por plano e gerenciamento de SKUs de liberação imediata sem necessidade de redeploy.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Catálogo de SKUs</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Composição Modular</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Provisionamento</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-amber-300">Feature Toggles</span>
          </div>

          {/* Screenshots Reais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-1">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md bg-surface-container-lowest">
              <img
                src="/portfolio-autocom3/01-catalogo-skus-tabela.png"
                alt="Tabela de SKUs"
                className="w-full h-52 object-cover object-top hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2.5 bg-surface-container-lowest border-t border-white/5">
                <span className="font-label-caps text-[11px] text-zinc-300 font-semibold">TABELA DE SKUS &amp; COMPOSIÇÃO</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md bg-surface-container-lowest">
              <img
                src="/portfolio-autocom3/02-categorias-produtos-skus.png"
                alt="Categorias de Produtos"
                className="w-full h-52 object-cover object-top hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2.5 bg-surface-container-lowest border-t border-white/5">
                <span className="font-label-caps text-[11px] text-zinc-300 font-semibold">CATEGORIAS DE PRODUTOS</span>
              </div>
            </div>
          </div>
        </article>

        {/* MÓDULO 06: Ferramentas Tributárias & Parcerias White Label */}
        <article
          className="w-full bg-surface-container rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col gap-3.5 border border-white/10 hover:border-emerald-500/40 transition-all"
          id="stage-06"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-code-inline text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-md font-bold">
                06 // MÓDULO
              </span>
              <span className="font-label-caps text-zinc-400 text-xs">/admin/modulo/ferramentas-tributarias</span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-emerald-400">account_balance</span>
          </div>

          <div>
            <h2 className="font-headline-lg text-white tracking-tight font-bold text-lg sm:text-xl">
              FERRAMENTAS TRIBUTÁRIAS &amp; WHITE LABEL
            </h2>
            <p className="font-body-md text-zinc-300 mt-1 leading-relaxed text-xs sm:text-sm">
              Diagnóstico e parametrização fiscal interestadual (ICMS, PIS/COFINS, substituição tributária) e personalização de identidade para parceiros White Label com isolamento contábil.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Diagnóstico Fiscal</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">White Label</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-zinc-200">Isolamento Contábil</span>
            <span className="font-code-inline text-[11px] bg-surface-container-high px-2.5 py-0.5 rounded-md text-emerald-400">SEFAZ Ready</span>
          </div>

          {/* Screenshot Real */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md bg-surface-container-lowest mt-1">
            <img
              src="/portfolio-autocom3/01-ferramentas-tributarias.png"
              alt="Ferramentas Tributárias e Diagnósticos Fiscais"
              className="w-full max-h-[340px] object-cover object-top hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="p-2.5 bg-surface-container-lowest border-t border-white/5">
              <span className="font-label-caps text-[11px] text-zinc-300 font-semibold">PARAMETRIZAÇÃO TRIBUTÁRIA &amp; DIAGNÓSTICOS</span>
            </div>
          </div>
        </article>
      </section>

      {/* Enterprise Specs Table */}
      <section className="bg-surface-container rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl overflow-x-auto">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400 text-[20px]">tune</span>
            <span className="font-label-caps text-zinc-300 uppercase tracking-wider text-xs font-bold">
              ESPECIFICAÇÕES DE ENGENHARIA CORPORATIVA
            </span>
          </div>
          <span className="font-code-inline text-xs text-cyan-400">STACK VERIFICADA</span>
        </div>

        <table className="w-full text-left font-code-inline text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px]">
              <th className="py-2.5 px-3">Camada / Domínio</th>
              <th className="py-2.5 px-3">Tecnologia Primária</th>
              <th className="py-2.5 px-3">SLA / Métrica de Produção</th>
              <th className="py-2.5 px-3">Propósito Arquitetural</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-200">
            <tr>
              <td className="py-3 px-3 text-cyan-400 font-semibold">Frontend Web &amp; Portal</td>
              <td className="py-3 px-3">React 19, TypeScript, Vite, Tailwind Tokens</td>
              <td className="py-3 px-3 text-emerald-400">&lt; 140ms FCP / 100% Strict TS</td>
              <td className="py-3 px-3 text-zinc-400">Portal corporativo unificado com 25+ submódulos e filtros por área</td>
            </tr>
            <tr>
              <td className="py-3 px-3 text-cyan-400 font-semibold">Backend &amp; Microsserviços</td>
              <td className="py-3 px-3">Node.js, NestJS, Fastify, C# .NET Interop</td>
              <td className="py-3 px-3 text-emerald-400">99.98% Uptime / HA Cluster</td>
              <td className="py-3 px-3 text-zinc-400">Isolamento de domínio, RBAC com JWT rotativo e mensageria distribuída</td>
            </tr>
            <tr>
              <td className="py-3 px-3 text-cyan-400 font-semibold">Banco de Dados &amp; Sync</td>
              <td className="py-3 px-3">PostgreSQL Multi-Tenant, SQLite WAL, Redis</td>
              <td className="py-3 px-3 text-emerald-400">12M+ Registros / &lt; 320ms Sync</td>
              <td className="py-3 px-3 text-zinc-400">Particionamento relacional, cache de alta frequência e conformidade ACID</td>
            </tr>
            <tr>
              <td className="py-3 px-3 text-cyan-400 font-semibold">Segurança &amp; Licenças</td>
              <td className="py-3 px-3">SGSH Licensing Engine, Criptografia SHA-256</td>
              <td className="py-3 px-3 text-emerald-400">Zero Invasões / Tolerância +4D</td>
              <td className="py-3 px-3 text-zinc-400">Ciclo de vida de licenças, contingência offline e dupla confirmação</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default StitchAutocom3Section
