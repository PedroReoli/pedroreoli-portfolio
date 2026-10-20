import React, { useState } from "react"
import { useLanguage } from "../../i18n/useLanguage"
import {
  Terminal,
  CreditCard,
  Coins,
  Boxes,
  Activity,
  LayoutDashboard,
  FileSpreadsheet,
  TrendingUp,
  Key,
  Package,
  Receipt,
  SlidersHorizontal,
} from "lucide-react"

export const StitchAutocom3Section: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [activeStage, setActiveStage] = useState("stage-01")

  const scrollToStage = (stageId: string) => {
    setActiveStage(stageId)
    const el = document.getElementById(stageId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      el.classList.add("ring-2", "ring-[#58a6ff]")
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-[#58a6ff]")
      }, 1200)
    }
  }

  return (
    <div id="autocom3" className="flex flex-col w-full pb-16 space-y-8">
      {/* Top Banner & Case Status */}
      <section className="w-full bg-[#161b22] rounded-xl p-6 sm:p-8 border border-[#30363d] flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 bg-[#21262d] px-3 py-1 rounded-md border border-[#30363d] w-fit">
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
            <span className="font-mono text-[#3fb950] tracking-wider uppercase text-xs font-semibold">
              SISTEMA EM PRODUÇÃO &bull; AUTOCOM3
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#8b949e] font-mono text-xs">
            <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>ERP_PROD_v3.4</span>
          </div>
        </div>

        <div>
          {/* H2 Semântico garantindo hierarquia correta de 1 único H1 por página */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#f0f6fc]">
            Ecossistema Corporativo ERP Autocom3
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-mono text-[#8b949e]">
            <span className="text-[#58a6ff] font-semibold">
              Arquitetura de Alta Disponibilidade
            </span>
            <span>&bull;</span>
            <span className="text-[#3fb950] font-semibold">25+ Módulos Unificados</span>
            <span>&bull;</span>
            <span className="text-[#c9d1d9]">Multi-Tenant SaaS</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed max-w-4xl">
          {isEn
            ? "Enterprise web portal unifying retail operations, commercial quotes, licensing lifecycle, SKU cataloging, and tax diagnostic engines. Connected to local point-of-sale terminals nationwide."
            : "Portal corporativo unificado com mais de 25 submódulos integrados (Operações, Propostas, Licenças SGSH, Catálogo de SKUs e Ferramentas Tributárias), conectando a nuvem aos terminais de vendas em todo o Brasil."}
        </p>

        {/* Resumo de Responsabilidade Técnica */}
        <div className="pt-2 border-t border-[#21262d] flex flex-wrap gap-4 text-xs font-mono text-[#8b949e]">
          <div>
            <span className="text-[#f0f6fc] font-semibold">Papel: </span>
            <span>Full Stack Software Engineer</span>
          </div>
          <div>
            <span className="text-[#f0f6fc] font-semibold">Período: </span>
            <span>2024 &ndash; Presente</span>
          </div>
          <div>
            <span className="text-[#f0f6fc] font-semibold">Stack: </span>
            <span>React, TypeScript, NestJS, PostgreSQL, Docker</span>
          </div>
        </div>
      </section>

      {/* Métricas do ERP Autocom3 */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-[#161b22] p-5 rounded-xl border border-[#30363d] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[#8b949e] text-xs font-semibold uppercase">PDVS ATENDIDOS</span>
            <CreditCard className="w-4 h-4 text-[#58a6ff]" />
          </div>
          <div className="mt-2">
            <span className="font-bold text-[#f0f6fc] text-2xl sm:text-3xl font-mono">15k+</span>
            <p className="text-xs text-[#8b949e] mt-0.5">Terminais na base ativa</p>
          </div>
        </div>

        <div className="bg-[#161b22] p-5 rounded-xl border border-[#30363d] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[#8b949e] text-xs font-semibold uppercase">VOLUME MENSAL</span>
            <Coins className="w-4 h-4 text-[#3fb950]" />
          </div>
          <div className="mt-2">
            <span className="font-bold text-[#3fb950] text-2xl sm:text-3xl font-mono">R$ 42M+</span>
            <p className="text-xs text-[#8b949e] mt-0.5">Transacionados na rede</p>
          </div>
        </div>

        <div className="bg-[#161b22] p-5 rounded-xl border border-[#30363d] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[#8b949e] text-xs font-semibold uppercase">MÓDULOS WEB</span>
            <Boxes className="w-4 h-4 text-[#a371f7]" />
          </div>
          <div className="mt-2">
            <span className="font-bold text-[#a371f7] text-2xl sm:text-3xl font-mono">25+</span>
            <p className="text-xs text-[#8b949e] mt-0.5">Telas e fluxos unificados</p>
          </div>
        </div>

        <div className="bg-[#161b22] p-5 rounded-xl border border-[#30363d] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[#8b949e] text-xs font-semibold uppercase">DESEMPENHO</span>
            <Activity className="w-4 h-4 text-[#f0883e]" />
          </div>
          <div className="mt-2">
            <span className="font-bold text-[#f0883e] text-2xl sm:text-3xl font-mono">-40%</span>
            <p className="text-xs text-[#8b949e] mt-0.5">Latência percebida em tela</p>
          </div>
        </div>
      </section>

      {/* Navegador dos 6 Módulos */}
      <section className="w-full">
        <div className="flex items-center justify-between px-1 mb-3">
          <span className="font-mono text-[#8b949e] uppercase tracking-wider text-xs font-semibold">
            ESTRUTURA DOS 6 PRINCIPAIS MÓDULOS
          </span>
          <span className="font-mono text-[#3fb950] flex items-center gap-1.5 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
            EM PRODUÇÃO ATIVA
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "stage-01", label: "01. Operações", icon: LayoutDashboard },
            { id: "stage-02", label: "02. Propostas", icon: FileSpreadsheet },
            { id: "stage-03", label: "03. Pipeline", icon: TrendingUp },
            { id: "stage-04", label: "04. Licenças SGSH", icon: Key },
            { id: "stage-05", label: "05. Catálogo SKUs", icon: Package },
            { id: "stage-06", label: "06. Tributário", icon: Receipt },
          ].map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => scrollToStage(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-colors border ${
                  activeStage === item.id
                    ? "bg-[#21262d] text-[#f0f6fc] border-[#58a6ff] font-semibold"
                    : "bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#21262d]"
                }`}
                type="button"
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Módulos com Imagens Reais (lazy loaded) */}
      <section className="flex flex-col gap-6">
        {/* MÓDULO 01 */}
        <article
          className="w-full bg-[#161b22] rounded-xl p-5 sm:p-7 flex flex-col gap-3.5 border border-[#30363d] hover:border-[#58a6ff]/40 transition-colors"
          id="stage-01"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-[#21262d] text-[#58a6ff] border border-[#30363d] px-2.5 py-0.5 rounded-md font-semibold">
                01 // MÓDULO
              </span>
              <span className="font-mono text-[#8b949e] text-xs">/admin/modulo/operacoes</span>
            </div>
            <LayoutDashboard className="w-4 h-4 text-[#58a6ff]" />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#f0f6fc]">
              Painel Central de Operações Multissetorial
            </h3>
            <p className="text-xs sm:text-sm text-[#8b949e] mt-1 leading-relaxed">
              Unificação de mais de 25 submódulos antes dispersos em um hub com controle RBAC, filtros inteligentes por áreas transversais e sistema de favoritos com persistência local.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="font-mono text-[11px] bg-[#0d1117] px-2.5 py-0.5 rounded-md text-[#c9d1d9] border border-[#30363d]">React 19</span>
            <span className="font-mono text-[11px] bg-[#0d1117] px-2.5 py-0.5 rounded-md text-[#c9d1d9] border border-[#30363d]">Filtros Transversais</span>
            <span className="font-mono text-[11px] bg-[#0d1117] px-2.5 py-0.5 rounded-md text-[#c9d1d9] border border-[#30363d]">Persistência Local</span>
            <span className="font-mono text-[11px] bg-[#0d1117] px-2.5 py-0.5 rounded-md text-[#c9d1d9] border border-[#30363d]">Controle RBAC</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2">
            <div className="rounded-lg overflow-hidden border border-[#30363d] bg-[#0d1117]">
              <img
                src="/portfolio-autocom3/01-painel-operacoes-visao-geral.png"
                alt="Painel de Operações - Visão Geral do Grid"
                loading="lazy"
                decoding="async"
                className="w-full h-52 object-cover object-top hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="p-2.5 bg-[#0d1117] border-t border-[#21262d]">
                <span className="font-mono text-[11px] text-[#8b949e]">VISÃO GERAL DO GRID DE SETORES</span>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-[#30363d] bg-[#0d1117]">
              <img
                src="/portfolio-autocom3/02-painel-operacoes-dropdown-filtros.png"
                alt="Dropdown de Filtros Avançados"
                loading="lazy"
                decoding="async"
                className="w-full h-52 object-cover object-top hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="p-2.5 bg-[#0d1117] border-t border-[#21262d]">
                <span className="font-mono text-[11px] text-[#8b949e]">DROPDOWN DE FILTROS POR ÁREAS</span>
              </div>
            </div>
          </div>
        </article>

        {/* MÓDULO 02 */}
        <article
          className="w-full bg-[#161b22] rounded-xl p-5 sm:p-7 flex flex-col gap-3.5 border border-[#30363d] hover:border-[#3fb950]/40 transition-colors"
          id="stage-02"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-[#21262d] text-[#3fb950] border border-[#30363d] px-2.5 py-0.5 rounded-md font-semibold">
                02 // MÓDULO
              </span>
              <span className="font-mono text-[#8b949e] text-xs">/admin/modulo/propostas</span>
            </div>
            <FileSpreadsheet className="w-4 h-4 text-[#3fb950]" />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#f0f6fc]">
              Motor de Propostas Comerciais &amp; Precificação
            </h3>
            <p className="text-xs sm:text-sm text-[#8b949e] mt-1 leading-relaxed">
              Simulação analítica de propostas corporativas, precificação flexível de planos SaaS e cálculo automatizado de margens para canais de revenda com faturamento recorrente.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="font-mono text-[11px] bg-[#0d1117] px-2.5 py-0.5 rounded-md text-[#c9d1d9] border border-[#30363d]">Motor de Preços</span>
            <span className="font-mono text-[11px] bg-[#0d1117] px-2.5 py-0.5 rounded-md text-[#c9d1d9] border border-[#30363d]">Planos SaaS</span>
            <span className="font-mono text-[11px] bg-[#0d1117] px-2.5 py-0.5 rounded-md text-[#c9d1d9] border border-[#30363d]">Margens Dinâmicas</span>
          </div>

          <div className="rounded-lg overflow-hidden border border-[#30363d] bg-[#0d1117] mt-2">
            <img
              src="/portfolio-autocom3/01-propostas-comerciais-listagem.png"
              alt="Listagem de Propostas Comerciais"
              loading="lazy"
              decoding="async"
              className="w-full max-h-[340px] object-cover object-top hover:scale-[1.01] transition-transform duration-300"
            />
            <div className="p-2.5 bg-[#0d1117] border-t border-[#21262d]">
              <span className="font-mono text-[11px] text-[#8b949e]">LISTAGEM DE PROPOSTAS CORPORATIVAS</span>
            </div>
          </div>
        </article>

        {/* MÓDULO 04: Licenciamento SGSH */}
        <article
          className="w-full bg-[#161b22] rounded-xl p-5 sm:p-7 flex flex-col gap-3.5 border border-[#30363d] hover:border-[#58a6ff]/40 transition-colors"
          id="stage-04"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-[#21262d] text-[#58a6ff] border border-[#30363d] px-2.5 py-0.5 rounded-md font-semibold">
                04 // MÓDULO
              </span>
              <span className="font-mono text-[#8b949e] text-xs">/admin/modulo/licencas-sgsh</span>
            </div>
            <Key className="w-4 h-4 text-[#58a6ff]" />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#f0f6fc]">
              Ciclo de Vida de Licenças de Software (SGSH)
            </h3>
            <p className="text-xs sm:text-sm text-[#8b949e] mt-1 leading-relaxed">
              Gestão de licenças, sincronização criptografada com retaguardas locais e liberação remota de recursos com tolerância para contingência offline.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="font-mono text-[11px] bg-[#0d1117] px-2.5 py-0.5 rounded-md text-[#c9d1d9] border border-[#30363d]">Criptografia SHA-256</span>
            <span className="font-mono text-[11px] bg-[#0d1117] px-2.5 py-0.5 rounded-md text-[#c9d1d9] border border-[#30363d]">Contingência Offline</span>
            <span className="font-mono text-[11px] bg-[#0d1117] px-2.5 py-0.5 rounded-md text-[#c9d1d9] border border-[#30363d]">Auditoria de Ativações</span>
          </div>

          <div className="rounded-lg overflow-hidden border border-[#30363d] bg-[#0d1117] mt-2">
            <img
              src="/portfolio-autocom3/01-licencas-sgsh-ativacao.png"
              alt="Painel de Licenças SGSH"
              loading="lazy"
              decoding="async"
              className="w-full max-h-[340px] object-cover object-top hover:scale-[1.01] transition-transform duration-300"
            />
            <div className="p-2.5 bg-[#0d1117] border-t border-[#21262d]">
              <span className="font-mono text-[11px] text-[#8b949e]">GERENCIAMENTO E AUDITORIA DE LICENÇAS</span>
            </div>
          </div>
        </article>

        {/* MÓDULO 06: Tributário */}
        <article
          className="w-full bg-[#161b22] rounded-xl p-5 sm:p-7 flex flex-col gap-3.5 border border-[#30363d] hover:border-[#3fb950]/40 transition-colors"
          id="stage-06"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-[#21262d] text-[#3fb950] border border-[#30363d] px-2.5 py-0.5 rounded-md font-semibold">
                06 // MÓDULO
              </span>
              <span className="font-mono text-[#8b949e] text-xs">/admin/modulo/tributario</span>
            </div>
            <Receipt className="w-4 h-4 text-[#3fb950]" />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#f0f6fc]">
              Ferramentas Tributárias &amp; Parametrização Fiscal
            </h3>
            <p className="text-xs sm:text-sm text-[#8b949e] mt-1 leading-relaxed">
              Diagnóstico e parametrização fiscal interestadual (ICMS, PIS/COFINS, substituição tributária) e personalização para canais White Label.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden border border-[#30363d] bg-[#0d1117] mt-2">
            <img
              src="/portfolio-autocom3/01-ferramentas-tributarias.png"
              alt="Ferramentas Tributárias e Diagnósticos Fiscais"
              loading="lazy"
              decoding="async"
              className="w-full max-h-[340px] object-cover object-top hover:scale-[1.01] transition-transform duration-300"
            />
            <div className="p-2.5 bg-[#0d1117] border-t border-[#21262d]">
              <span className="font-mono text-[11px] text-[#8b949e]">PARAMETRIZAÇÃO TRIBUTÁRIA E FISCAL</span>
            </div>
          </div>
        </article>
      </section>

      {/* Tabela de Especificações */}
      <section className="bg-[#161b22] rounded-xl p-6 sm:p-8 border border-[#30363d] overflow-x-auto">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#21262d]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#58a6ff]" />
            <span className="font-mono text-[#f0f6fc] uppercase tracking-wider text-xs font-semibold">
              Especificações Técnicas de Engenharia
            </span>
          </div>
          <span className="font-mono text-xs text-[#3fb950]">PRODUÇÃO</span>
        </div>

        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#21262d] text-[#8b949e] uppercase text-[11px]">
              <th className="py-2.5 px-3">Camada / Domínio</th>
              <th className="py-2.5 px-3">Tecnologia</th>
              <th className="py-2.5 px-3">Métrica / SLA</th>
              <th className="py-2.5 px-3">Propósito Arquitetural</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d] text-[#c9d1d9]">
            <tr>
              <td className="py-3 px-3 text-[#58a6ff] font-semibold">Frontend Web</td>
              <td className="py-3 px-3">React 19, TypeScript, Tailwind</td>
              <td className="py-3 px-3 text-[#3fb950]">100% Strict TS</td>
              <td className="py-3 px-3 text-[#8b949e]">Portal unificado com 25+ submódulos e filtros reativos</td>
            </tr>
            <tr>
              <td className="py-3 px-3 text-[#58a6ff] font-semibold">Backend &amp; APIs</td>
              <td className="py-3 px-3">Node.js, NestJS, Fastify</td>
              <td className="py-3 px-3 text-[#3fb950]">Alta Disponibilidade</td>
              <td className="py-3 px-3 text-[#8b949e]">Isolamento de domínio, RBAC com JWT e mensageria</td>
            </tr>
            <tr>
              <td className="py-3 px-3 text-[#58a6ff] font-semibold">Banco de Dados</td>
              <td className="py-3 px-3">PostgreSQL Multi-Tenant</td>
              <td className="py-3 px-3 text-[#3fb950]">ACID Compliant</td>
              <td className="py-3 px-3 text-[#8b949e]">Particionamento relacional e cache de alta frequência</td>
            </tr>
            <tr>
              <td className="py-3 px-3 text-[#58a6ff] font-semibold">Licenciamento</td>
              <td className="py-3 px-3">SGSH Licensing Engine</td>
              <td className="py-3 px-3 text-[#3fb950]">SHA-256</td>
              <td className="py-3 px-3 text-[#8b949e]">Ciclo de vida de licenças e contingência offline</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default StitchAutocom3Section
