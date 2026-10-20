import React, { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { useLanguage } from "../../i18n/useLanguage"
import LiIcon from "../atoms/LiIcon"
import TechStackGrid from "../molecules/TechStackGrid"
import {
  Layers,
  Server,
  Database,
  Bot,
  Milestone,
  GraduationCap,
  Terminal,
  ExternalLink,
  BookOpen,
} from "lucide-react"
import { FaOrcid } from "react-icons/fa6"

/* =========================================================================
   SUB-COMPONENTE: ITEM DE EXPERIÊNCIA COM BULLETS DETALHADOS
   ========================================================================= */
interface ExperienceDetailProps {
  position: string
  company: string
  companyLink?: string
  time: string
  isCurrent?: boolean
  summary: string
  bullets: string[]
  techs: string
}

const ExperienceDetail: React.FC<ExperienceDetailProps> = ({
  position,
  company,
  companyLink,
  time,
  isCurrent,
  summary,
  bullets,
  techs,
}) => {
  const itemRef = useRef<HTMLLIElement>(null)

  return (
    <li
      ref={itemRef}
      className="my-6 first:mt-2 last:mb-2 w-full flex flex-col relative pl-10 sm:pl-16"
    >
      <LiIcon reference={itemRef} />
      <div className="bg-[#161b22] hover:bg-[#21262d] rounded-xl p-5 sm:p-6 border border-[#30363d] transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 mb-2">
          <div>
            <h3 className="font-bold text-[#f0f6fc] text-base sm:text-lg tracking-tight">
              {companyLink ? (
                <a
                  href={companyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3fb950] transition-colors"
                >
                  {company}
                </a>
              ) : (
                company
              )}
            </h3>
            <span className="text-[#3fb950] text-xs sm:text-sm font-medium">
              {position}
            </span>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium self-start ${
              isCurrent
                ? "bg-[#238636]/20 border border-[#238636]/40 text-[#3fb950]"
                : "bg-[#21262d] border border-[#30363d] text-[#8b949e]"
            }`}
          >
            {time}
          </span>
        </div>

        <p className="text-[#c9d1d9] text-xs sm:text-sm mt-1 mb-3 leading-relaxed font-medium">
          {summary}
        </p>

        {/* Bullets com resultados concretos de engenharia */}
        <ul className="flex flex-col gap-2 mb-4">
          {bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="text-xs sm:text-sm text-[#8b949e] flex items-start gap-2 leading-relaxed"
            >
              <span className="text-[#3fb950] mt-1 shrink-0">&bull;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-[#8b949e] font-mono text-xs flex-wrap pt-2.5 border-t border-[#21262d]">
          <Terminal className="w-3.5 h-3.5 text-[#8b949e] shrink-0" />
          <span>{techs}</span>
        </div>
      </div>
    </li>
  )
}

/* =========================================================================
   COMPONENTE PRINCIPAL DO DOSSIÊ TÉCNICO
   ========================================================================= */
export const StitchDossierSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  const careerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: careerScrollProgress } = useScroll({
    target: careerRef,
    offset: ["start end", "center start"],
  })

  const educationRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: educationScrollProgress } = useScroll({
    target: educationRef,
    offset: ["start end", "center start"],
  })

  return (
    <section id="dossie-tecnico" className="flex flex-col w-full pb-8 gap-12 pt-2">
      {/* =========================================================================
          1. EXPERIÊNCIA PROFISSIONAL (DESTAQUE DIRETO NO TOPO)
          ========================================================================= */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
          <div className="flex items-center gap-2">
            <Milestone className="w-5 h-5 text-[#3fb950]" />
            <h2 className="font-bold text-[#f0f6fc] text-xl sm:text-2xl tracking-tight">
              {isEn ? "Professional Experience" : "Experiência Profissional"}
            </h2>
          </div>
          <span className="font-mono text-xs text-[#3fb950]">~4 ANOS DE ATUAÇÃO</span>
        </div>

        <div ref={careerRef} className="w-full relative">
          <div
            className="absolute left-[18px] sm:left-[26px] top-6 w-[2px] h-[calc(100%-3rem)] bg-[#30363d] pointer-events-none"
            aria-hidden="true"
          />

          <motion.div
            style={{ scaleY: careerScrollProgress }}
            className="absolute left-[17px] sm:left-[25px] top-6 w-[4px] h-[calc(100%-3rem)] bg-[#238636] origin-top pointer-events-none rounded-full"
            aria-hidden="true"
          />

          <ul className="w-full flex flex-col">
            {/* 1. AUTOCOM3 */}
            <ExperienceDetail
              company="Autocom3 Tecnologia"
              position="Full Stack Software Engineer"
              time={isEn ? "11/2024 — Present" : "11/2024 — Presente"}
              isCurrent={true}
              summary="Evolução e desenvolvimento de ecossistema ERP, portais corporativos unificados e aplicações de retaguarda utilizadas por mais de 20 organizações operacionais."
              bullets={[
                "Arquitetou e liderou a biblioteca de componentes e Design System corporativo com mais de 500 itens reutilizáveis, padronizando a interface e acelerando em até 70% o ciclo de desenvolvimento de novos módulos.",
                "Desenvolveu APIs REST e serviços de backend em Node.js e NestJS, implementando autenticação JWT, permissões granulares RBAC, rate limiting e Webhooks assíncronos para operações cadastrais e financeiras.",
                "Otimizou o pipeline de renderização e carregamento de telas densas de ERP, reduzindo em até 40% a latência percebida pelo usuário em produção.",
                "Colaborou na infraestrutura cloud em AWS e na transição de ferramentas corporativas desktop de Electron para Tauri.",
              ]}
              techs="React, Next.js, TypeScript, Node.js, NestJS, PostgreSQL, AWS, Tauri, Tailwind CSS"
            />

            {/* 2. DOMUS */}
            <ExperienceDetail
              company="Domus — Sua Solução Digital"
              position="Full Stack Engineer"
              time={isEn ? "10/2025 — Present" : "10/2025 — Presente"}
              isCurrent={true}
              summary="Engenharia de software e desenvolvimento de produtos digitais sob demanda e plataformas administrativas web."
              bullets={[
                "Conduziu o ciclo completo de engenharia de ponta a ponta: levantamento de requisitos com clientes, modelagem de dados, desenvolvimento de front-end responsivo e deploy.",
                "Desenvolveu o Propose SaaS, gerador NoCode de propostas comerciais com editor drag-and-drop e renderização baseada em esquemas dinâmicos JSON.",
                "Implementou integrações com bancos relacionais PostgreSQL e APIs de pagamento e automação de negócios.",
              ]}
              techs="React, Next.js, TypeScript, Node.js, Fastify, PostgreSQL, Supabase"
            />

            {/* 3. SIVIS TECNOLOGIA */}
            <ExperienceDetail
              company="SIVIS Tecnologia"
              position="Software Engineer (Full Stack & Integrações)"
              time="08/2022 — 06/2024 e 11/2025 — Presente"
              isCurrent={true}
              summary="Desenvolvimento de módulos de gestão, dashboards analíticos e integrações de sistemas para associações e empresas de proteção veicular."
              bullets={[
                "Construiu módulos operacionais e dashboards de controle financeiro com regras de negócio complexas em React e TypeScript.",
                "Realizou integrações seguras entre interfaces web e APIs REST de meios de pagamento, serviços de cobrança e mensageria externa.",
                "Refatorou módulos legados para arquitetura componentizada, elevando a manutenibilidade do código e a previsibilidade das entregas.",
              ]}
              techs="React, TypeScript, Node.js, PostgreSQL, MySQL, APIs REST"
            />

            {/* 4. UNIFOA / EVATECH */}
            <ExperienceDetail
              company="Centro Universitário de Volta Redonda (UniFOA)"
              position="Mentor de Tecnologia (Programa EvaTech / SEBRAE)"
              time="06/2024 — 12/2024"
              summary="Mentoria técnica em desenvolvimento de software, lógica de programação e ferramentas digitais para produtividade."
              bullets={[
                "Capacitou mais de 30 profissionais em competências digitais, desenvolvimento de aplicações web e boas práticas com ferramentas de IA.",
                "Elaborou trilhas práticas de aprendizagem técnica e liderou workshops práticos focados em impacto social e inclusão.",
              ]}
              techs="JavaScript, React, Prompt Engineering, Ferramentas de IA"
            />
          </ul>
        </div>
      </div>

      {/* =========================================================================
          2. MINHA STACK EM GRID ABERTO (SEM DESCRIÇÕES, SÓ ÍCONES E NOMES)
          ========================================================================= */}
      <TechStackGrid />

      {/* =========================================================================
          3. PILARES DE ENGENHARIA & ESPECIALIDADES (RESUMIDO, SEM TAGS, SÓ CARDS)
          ========================================================================= */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
          <h2 className="font-bold text-[#f0f6fc] text-xl sm:text-2xl tracking-tight">
            {isEn ? "Engineering Specialties" : "Pilares de Engenharia & Especialidades"}
          </h2>
          <span className="font-mono text-xs text-[#8b949e]">FOCO TÉCNICO</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] flex flex-col gap-1.5 hover:border-[#3fb950]/40 transition-colors">
            <div className="flex items-center gap-2 text-[#3fb950]">
              <Layers className="w-4 h-4" />
              <h3 className="font-semibold text-xs sm:text-sm text-[#f0f6fc]">
                Frontend &amp; Design Systems
              </h3>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Interfaces corporativas reativas com governança de mais de 500 componentes reutilizáveis.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] flex flex-col gap-1.5 hover:border-[#3fb950]/40 transition-colors">
            <div className="flex items-center gap-2 text-[#3fb950]">
              <Server className="w-4 h-4" />
              <h3 className="font-semibold text-xs sm:text-sm text-[#f0f6fc]">
                Backend &amp; Microsserviços
              </h3>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              APIs REST/GraphQL escaláveis em NestJS e Fastify com autenticação JWT e RBAC.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] flex flex-col gap-1.5 hover:border-[#3fb950]/40 transition-colors">
            <div className="flex items-center gap-2 text-[#3fb950]">
              <Database className="w-4 h-4" />
              <h3 className="font-semibold text-xs sm:text-sm text-[#f0f6fc]">
                Dados &amp; Local-First
              </h3>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Modelagem relacional em PostgreSQL, SQLite WAL e sincronização offline com baixa latência.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] flex flex-col gap-1.5 hover:border-[#3fb950]/40 transition-colors">
            <div className="flex items-center gap-2 text-[#3fb950]">
              <Bot className="w-4 h-4" />
              <h3 className="font-semibold text-xs sm:text-sm text-[#f0f6fc]">
                Engenharia de IA &amp; MCP
              </h3>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Servidores com Model Context Protocol (MCP), Chrome CDP e automação para modelos de linguagem.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. FORMAÇÃO ACADÊMICA & PUBLICAÇÕES CIENTÍFICAS (COM ORCID & TUDO É CIÊNCIA)
          ========================================================================= */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#3fb950]" />
            <h2 className="font-bold text-[#f0f6fc] text-xl sm:text-2xl tracking-tight">
              {isEn ? "Formal Education & Research" : "Formação Acadêmica & Pesquisa Científica"}
            </h2>
          </div>
          <span className="font-mono text-xs text-[#8b949e]">ACADÊMICO &amp; PESQUISA</span>
        </div>

        <div ref={educationRef} className="w-full relative">
          <div
            className="absolute left-[18px] sm:left-[26px] top-6 w-[2px] h-[calc(100%-3rem)] bg-[#30363d] pointer-events-none"
            aria-hidden="true"
          />

          <motion.div
            style={{ scaleY: educationScrollProgress }}
            className="absolute left-[17px] sm:left-[25px] top-6 w-[4px] h-[calc(100%-3rem)] bg-[#238636] origin-top pointer-events-none rounded-full"
            aria-hidden="true"
          />

          <ul className="w-full flex flex-col gap-6">
            {/* 1. PUBLICAÇÃO CIENTÍFICA: CONGRESSO TUDO É CIÊNCIA & ORCID */}
            <li className="w-full flex flex-col relative pl-10 sm:pl-16">
              <LiIcon reference={educationRef} />
              <div className="bg-[#161b22] rounded-xl p-5 sm:p-6 border border-[#30363d] flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40 font-mono text-xs font-semibold">
                      ARTIGO EM CONGRESSO &bull; 2025
                    </span>
                    <span className="font-mono text-xs text-[#8b949e]">
                      3º Congresso Tudo é Ciência (UniFOA)
                    </span>
                  </div>

                  {/* Botão Oficial do ORCID */}
                  <a
                    href="https://orcid.org/0009-0001-7369-1768"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0d1117] hover:bg-[#21262d] text-[#a6ce39] font-mono text-xs font-semibold border border-[#30363d] transition-colors"
                    title="Ver registro acadêmico ORCID"
                  >
                    <FaOrcid className="w-3.5 h-3.5 text-[#a6ce39]" />
                    <span>ORCID: 0009-0001-7369-1768</span>
                    <ExternalLink className="w-3 h-3 text-[#8b949e]" />
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-[#f0f6fc] text-base sm:text-lg">
                    EVA.Tech — Empoderamento digital para mães solos negras
                  </h3>
                  <span className="text-xs font-mono text-[#8b949e] block mt-0.5">
                    Autores: Pedro Lucas Reis de Oliveira Sousa; Mylena Vieira de Assis; Ana Carolina Callegario Pereira; Luciane Jasmin de Deus; Rogério Nogueira Pereira
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                  O artigo discute a situação das mulheres no Brasil e os desafios enfrentados por mães solteiras negras em relação à equidade e à ODS 5 (Meta 5.b). O projeto Eva.Tech capacita mulheres em tecnologias da informação através de workshops, mentorias e seminários práticos, fortalecendo a autonomia profissional e comunitária.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#21262d]">
                  <a
                    href="https://doi.org/10.47385/tudoeciencia.1904.2024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#58a6ff] hover:underline"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>DOI: 10.47385/tudoeciencia.1904.2024</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-xs font-mono text-[#3fb950]">&bull; Indexado Crossref</span>
                </div>
              </div>
            </li>

            {/* 2. GRADUAÇÃO SUPERIOR */}
            <li className="w-full flex flex-col relative pl-10 sm:pl-16">
              <LiIcon reference={educationRef} />
              <div className="bg-[#161b22] rounded-xl p-5 sm:p-6 border border-[#30363d] flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#21262d] text-[#c9d1d9] font-mono text-xs border border-[#30363d]">
                      GRADUAÇÃO (BACHARELADO)
                    </span>
                    <span className="font-mono text-xs text-[#8b949e]">2022 — 2025</span>
                  </div>
                  <h3 className="font-bold text-[#f0f6fc] text-base sm:text-lg">
                    Bacharelado em Sistemas de Informação
                  </h3>
                  <p className="text-[#3fb950] text-xs sm:text-sm font-medium">
                    Centro Universitário de Volta Redonda (UniFOA)
                  </p>
                  <p className="text-[#8b949e] text-xs sm:text-sm leading-relaxed">
                    Formação com sólida base em Engenharia de Software Moderna, Estruturas de Dados Avançadas, Redes, Sistemas Distribuídos e Modelagem de Bancos de Dados Relacionais. TCC com foco em tecnologia assistiva infantil (FalaAtípica).
                  </p>
                </div>
                <div className="md:w-48 shrink-0 flex flex-col p-3 rounded-lg bg-[#0d1117] border border-[#30363d]">
                  <span className="text-[#8b949e] font-mono uppercase text-[10px] tracking-wider">
                    DURAÇÃO
                  </span>
                  <span className="text-[#f0f6fc] font-semibold text-xs sm:text-sm mt-0.5">
                    4 Anos (Concluído)
                  </span>
                  <span className="text-[#8b949e] font-mono uppercase text-[10px] tracking-wider mt-2">
                    STATUS
                  </span>
                  <span className="text-[#3fb950] font-mono text-xs font-bold mt-0.5">
                    Graduado (B.S.)
                  </span>
                </div>
              </div>
            </li>

            {/* 3. FORMAÇÃO FRONT-END E UX/UI DESIGN (ORIGAMID) */}
            <li className="w-full flex flex-col relative pl-10 sm:pl-16">
              <LiIcon reference={educationRef} />
              <div className="bg-[#161b22] rounded-xl p-5 sm:p-6 border border-[#30363d] flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#21262d] text-[#c9d1d9] font-mono text-xs border border-[#30363d]">
                      ESPECIALIZAÇÃO
                    </span>
                    <span className="font-mono text-xs text-[#8b949e]">200 HORAS &bull; 2026</span>
                  </div>
                  <h3 className="font-bold text-[#f0f6fc] text-base sm:text-lg">
                    Formação Front-end e UX/UI Design
                  </h3>
                  <p className="text-[#3fb950] text-xs sm:text-sm font-medium">
                    Origamid Brasil
                  </p>
                  <p className="text-[#8b949e] text-xs sm:text-sm leading-relaxed">
                    Especialização em arquitetura de interfaces orientada a design systems, acessibilidade WAI-ARIA (WCAG 2.2), otimização de renderização e boas práticas modernas de JavaScript/TypeScript.
                  </p>
                </div>
                <div className="md:w-48 shrink-0 flex flex-col p-3 rounded-lg bg-[#0d1117] border border-[#30363d]">
                  <span className="text-[#8b949e] font-mono uppercase text-[10px] tracking-wider">
                    CARGA HORÁRIA
                  </span>
                  <span className="text-[#f0f6fc] font-semibold text-xs sm:text-sm mt-0.5">
                    200 Horas
                  </span>
                  <span className="text-[#8b949e] font-mono uppercase text-[10px] tracking-wider mt-2">
                    CERTIFICAÇÃO
                  </span>
                  <span className="text-[#3fb950] font-mono text-xs font-bold mt-0.5">
                    Concluído &amp; Emitido
                  </span>
                </div>
              </div>
            </li>

            {/* 4. IDIOMAS */}
            <li className="w-full flex flex-col relative pl-10 sm:pl-16">
              <LiIcon reference={educationRef} />
              <div className="bg-[#161b22] rounded-xl p-5 sm:p-6 border border-[#30363d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-[#8b949e] uppercase">
                    Proficiência Linguística
                  </span>
                  <h3 className="font-bold text-[#f0f6fc] text-sm sm:text-base">
                    Português (Nativo) &bull; Inglês (Intermediário Funcional B2)
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    Leitura técnica fluida, elaboração de documentações (RFCs, ADRs) e conversação profissional para atuação em times remotos.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-md bg-[#21262d] text-[#3fb950] font-mono text-xs border border-[#30363d] shrink-0 font-medium">
                  Global Ready
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default StitchDossierSection
