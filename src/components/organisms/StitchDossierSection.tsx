import React, { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import Reveal from "../atoms/Reveal"
import StitchStackSection from "./StitchStackSection"
import { useLanguage } from "../../i18n/useLanguage"

type Project = {
  number: string
  title: string
  category: string
  year: string
  descriptionPt: string
  descriptionEn: string
  image: string
  imageAlt: string
  href: string
  external?: boolean
}

const projects: Project[] = [
  {
    number: "01",
    title: "FalaAtípica",
    category: "Produto assistivo",
    year: "2026",
    descriptionPt: "Tecnologia para aproximar crianças, famílias e profissionais na jornada de desenvolvimento da fala.",
    descriptionEn: "Technology connecting children, families and professionals throughout speech development.",
    image: "/TCC-img2.png",
    imageAlt: "Pedro apresentando o projeto FalaAtípica no UniFOA",
    href: "https://github.com/PedroReoli/Fala-Atipica",
    external: true,
  },
  {
    number: "02",
    title: "Autocom3",
    category: "Software corporativo",
    year: "2024—26",
    descriptionPt: "Produtos internos e fluxos de operação para um ecossistema empresarial de alta complexidade.",
    descriptionEn: "Internal products and operating flows for a highly complex enterprise ecosystem.",
    image: "/portfolio-autocom3/01-painel-operacoes-visao-geral.png",
    imageAlt: "Interface do painel de operações Autocom3",
    href: "/projetos?tipo=corporativo",
  },
  {
    number: "03",
    title: "Achilles",
    category: "Agentes & browser",
    year: "2026",
    descriptionPt: "Automação de navegador orientada por CDP, acessibilidade e ferramentas determinísticas.",
    descriptionEn: "Browser automation shaped by CDP, accessibility and deterministic tools.",
    image: "/portfolio-autocom3/01-formulario-oportunidade-comercial.png",
    imageAlt: "Interface de produto digital em desenvolvimento",
    href: "https://github.com/PedroReoli/Achilles-CDP-Agent",
    external: true,
  },
]

const experience = [
  {
    period: "2024—Agora",
    company: "Autocom3 Tecnologia",
    role: "Full Stack Software Engineer",
    descriptionPt: "Evolução de produtos corporativos e fluxos críticos, conectando interface, arquitetura e operação.",
    descriptionEn: "Evolving enterprise products and critical flows across interface, architecture and operations.",
  },
  {
    period: "2025—Agora",
    company: "Domus",
    role: "Full Stack Engineer",
    descriptionPt: "Construção de experiências digitais e serviços full stack orientados a produto.",
    descriptionEn: "Building product-led digital experiences and full-stack services.",
  },
  {
    period: "2022—2025",
    company: "SIVIS Tecnologia",
    role: "Software Engineer",
    descriptionPt: "Desenvolvimento de sistemas web, integrações e bases técnicas para produtos em produção.",
    descriptionEn: "Developing web systems, integrations and technical foundations for production products.",
  },
  {
    period: "2024",
    company: "UniFOA",
    role: "Mentor de tecnologia",
    descriptionPt: "Mentoria prática para transformar problemas reais em protótipos e soluções digitais.",
    descriptionEn: "Hands-on mentoring to turn real problems into prototypes and digital solutions.",
  },
]

const expertise = [
  {
    title: "Interfaces",
    descriptionPt: "Produtos claros, acessíveis e consistentes — do sistema visual à interação.",
    descriptionEn: "Clear, accessible and consistent products — from visual systems to interaction.",
  },
  {
    title: "Back-end",
    descriptionPt: "APIs, integrações e dados preparados para sustentar a operação real.",
    descriptionEn: "APIs, integrations and data foundations built for real operations.",
  },
  {
    title: "AI agents",
    descriptionPt: "Agentes úteis, observáveis e conectados às ferramentas certas.",
    descriptionEn: "Useful, observable agents connected to the right tools.",
  },
  {
    title: "Systems",
    descriptionPt: "Arquitetura e automação para transformar complexidade em fluxo.",
    descriptionEn: "Architecture and automation that turn complexity into flow.",
  },
]

export const StitchDossierSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState(0)
  const [activeExperience, setActiveExperience] = useState<number | null>(null)

  return (
    <div className="w-full">
      <section id="projetos-selecionados" className="project-stage h-[100svh] overflow-hidden">
        <div className="editorial-container project-stage-layout">
          <Reveal className="flex items-end justify-between border-b border-white/10 pb-3 sm:pb-4">
            <div>
              <p className="editorial-label mb-2 text-[#82aaff]">{isEn ? "Selected work" : "Trabalhos selecionados"}</p>
              <h2 className="project-stage-title font-black uppercase text-[#edeae4]">PROJETOS</h2>
            </div>
            <Link
              to="/projetos"
              className="group mb-1 inline-flex items-center gap-2 border-b border-[#edeae4] pb-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#edeae4] sm:text-xs"
            >
              {isEn ? "View all" : "Ver todos"}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="project-switcher flex items-center gap-5 overflow-x-auto border-b border-white/10 pb-3">
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                onClick={() => setActiveProject(index)}
                className={`editorial-label shrink-0 transition-colors ${activeProject === index ? "text-[#edeae4]" : "text-[#66625e] hover:text-[#aaa6a0]"}`}
                aria-pressed={activeProject === index}
              >
                {project.number} / {project.title}
              </button>
            ))}
          </div>

          <div className="project-feature min-h-0">
            <figure className="relative min-h-0 overflow-hidden rounded-xl bg-[#1b1a19]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={projects[activeProject].image}
                  src={projects[activeProject].image}
                  alt={projects[activeProject].imageAlt}
                  loading="lazy"
                  decoding="async"
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="editorial-label absolute bottom-3 left-3 text-white sm:bottom-5 sm:left-5">
                {projects[activeProject].category} / {projects[activeProject].year}
              </span>
            </figure>

            <AnimatePresence mode="wait">
              <motion.article
                key={projects[activeProject].title}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="project-feature-copy flex min-h-0 flex-col justify-end"
              >
                <p className="editorial-label mb-2 text-[#77736f]">{projects[activeProject].number} / {projects[activeProject].year}</p>
                <h3 className="project-feature-title font-bold text-[#edeae4]">{projects[activeProject].title}</h3>
                <p className="project-feature-description mt-3 max-w-lg leading-relaxed text-[#9a9690]">
                  {isEn ? projects[activeProject].descriptionEn : projects[activeProject].descriptionPt}
                </p>
                {projects[activeProject].external ? (
                  <a href={projects[activeProject].href} target="_blank" rel="noopener noreferrer" className="project-feature-link mt-4 inline-flex w-fit items-center gap-2 border-b border-white pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]">
                    {isEn ? "Open project" : "Abrir projeto"}<ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link to={projects[activeProject].href} className="project-feature-link mt-4 inline-flex w-fit items-center gap-2 border-b border-white pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]">
                    {isEn ? "Open project" : "Abrir projeto"}<ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <StitchStackSection />

      <section className="technology-story relative h-[100svh] overflow-hidden">
        <img
          src="/TCC-img2.png"
          alt="Pedro apresentando o FalaAtípica no UniFOA"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45" />
        <div className="editorial-container technology-stage-layout relative">
          <Reveal className="flex items-start justify-between">
            <p className="editorial-label text-[#c7d3ff]">FalaAtípica / UniFOA</p>
            <p className="editorial-label text-right text-white/70">Produto assistivo<br />2026</p>
          </Reveal>

          <Reveal className="flex min-h-0 items-end pb-7 sm:pb-10" distance={42}>
            <h2 className="technology-title max-w-5xl font-black uppercase text-white">
              {isEn ? (
                <>TECHNOLOGY<br /><span className="text-[#b8caff]">WITH PURPOSE.</span></>
              ) : (
                <>TECNOLOGIA<br /><span className="text-[#b8caff]">COM PROPÓSITO.</span></>
              )}
            </h2>
          </Reveal>

          <Reveal className="grid gap-3 border-t border-white/30 pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-6 sm:pt-6">
            <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-xl">
              {isEn
                ? "A platform designed to bring children, families and speech professionals closer together."
                : "Uma plataforma criada para aproximar crianças, famílias e profissionais da fala."}
            </p>
            <a
              href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 border-b border-white pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white"
            >
              {isEn ? "Read the story" : "Ler a história"}<ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="trajectory-stage h-[100svh] overflow-hidden">
        <div className="editorial-container trajectory-stage-layout">
          <Reveal className="grid gap-3 border-b border-white/15 pb-3 sm:gap-5 sm:pb-5 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
            <div>
              <p className="editorial-label mb-2 text-[#82aaff] sm:mb-4">{isEn ? "Experience" : "Experiência"}</p>
              <h2 className="trajectory-title font-black uppercase text-[#edeae4]">TRAJETÓRIA</h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-[#8d8984] lg:pb-1">
              {isEn
                ? "A path shaped by products in production, multidisciplinary teams and real constraints."
                : "Uma jornada construída com produtos em produção, times multidisciplinares e restrições reais."}
            </p>
          </Reveal>

          <div className="ml-auto mt-3 w-full lg:w-[82%]">
            {experience.map((item, index) => (
              <Reveal key={`${item.period}-${item.company}`} delay={index * 0.05} distance={20}>
                <div
                  className="trajectory-row group relative border-b border-white/10"
                  onMouseEnter={() => setActiveExperience(index)}
                  onMouseLeave={() => setActiveExperience(null)}
                  onFocus={() => setActiveExperience(index)}
                  onBlur={() => setActiveExperience(null)}
                >
                  <button
                    type="button"
                    className="relative grid w-full gap-1 py-2 pr-5 text-left sm:grid-cols-[8rem_1fr_1fr_auto] sm:items-center sm:gap-5 sm:py-5 sm:pr-0"
                    aria-expanded={activeExperience === index}
                    onClick={() => setActiveExperience(index)}
                  >
                    <span className="editorial-label text-[#77736f]">{item.period}</span>
                    <strong className="text-xl tracking-[-0.045em] text-[#edeae4] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl lg:text-4xl">{item.company}</strong>
                    <span className="text-xs text-[#8d8984] sm:text-right sm:text-sm">{item.role}</span>
                    <span className="editorial-label absolute right-0 top-1/2 -translate-y-1/2 text-[#82aaff] sm:static sm:translate-y-0">+</span>
                  </button>

                  <AnimatePresence>
                    {activeExperience === index && (
                      <motion.aside
                        initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        className={`experience-popover z-20 bg-[#edeae4] p-4 text-[#111010] shadow-2xl ${index > 1 ? "experience-popover-up" : ""}`}
                      >
                        <p className="editorial-label mb-2 text-[#5f5b56]">{item.company} / {item.period}</p>
                        <p className="text-sm leading-relaxed">
                          {isEn ? item.descriptionEn : item.descriptionPt}
                        </p>
                      </motion.aside>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="expertise-stage h-[100svh] overflow-hidden border-y border-white/10" aria-label={isEn ? "Areas of expertise" : "Áreas de atuação"}>
        <div className="editorial-container expertise-stage-layout">
          <Reveal className="expertise-intro flex flex-col justify-between border-b border-white/15 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            <div className="flex items-start justify-between gap-5 lg:block">
              <p className="editorial-label text-[#82aaff]">{isEn ? "What I build" : "O que eu construo"}</p>
              <p className="editorial-label text-right text-[#77736f] lg:mt-4 lg:text-left">04 / {isEn ? "disciplines" : "disciplinas"}</p>
            </div>
            <div>
              <h2 className="expertise-heading font-black uppercase text-[#edeae4]">
                {isEn ? <>FROM CODE<br /><span className="text-outline">TO PRODUCT.</span></> : <>DO CÓDIGO<br /><span className="text-outline">AO PRODUTO.</span></>}
              </h2>
              <p className="expertise-summary mt-4 max-w-md text-[#96918b]">
                {isEn
                  ? "I connect design, engineering and intelligence to put complete products into motion."
                  : "Conecto design, engenharia e inteligência para colocar produtos completos em movimento."}
              </p>
            </div>
          </Reveal>

          <div className="expertise-list min-h-0">
            {expertise.map((item, index) => (
              <Reveal key={item.title} className="expertise-row group" delay={index * 0.05} distance={18}>
                <span className="editorial-label text-[#77736f] transition-colors group-hover:text-[#82aaff]">0{index + 1}</span>
                <h3 className="expertise-title font-bold tracking-[-0.055em] text-[#edeae4] transition-transform duration-300 group-hover:translate-x-2">{item.title}</h3>
                <p className="expertise-description text-[#8f8a84]">
                  {isEn ? item.descriptionEn : item.descriptionPt}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default StitchDossierSection
