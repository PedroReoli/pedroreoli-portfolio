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
  ["2024—Agora", "Autocom3 Tecnologia", "Full Stack Software Engineer"],
  ["2025—Agora", "Domus", "Full Stack Engineer"],
  ["2022—2025", "SIVIS Tecnologia", "Software Engineer"],
  ["2024", "UniFOA", "Mentor de tecnologia"],
]

export const StitchDossierSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState(0)

  return (
    <div className="w-full">
      <section id="projetos-selecionados" className="editorial-section editorial-container">
        <Reveal className="mb-12 flex items-end justify-between border-b border-white/10 pb-5 sm:mb-20">
          <div>
            <p className="editorial-label mb-3 text-[#82aaff]">{isEn ? "Selected work" : "Trabalhos selecionados"}</p>
            <h2 className="section-display text-[#edeae4]">PROJETOS</h2>
          </div>
          <Link
            to="/projetos"
            className="group mb-1 inline-flex items-center gap-2 border-b border-[#edeae4] pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#edeae4] sm:text-xs"
          >
            {isEn ? "View all work" : "Ver todos os projetos"}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {projects.map((project, index) => {
              const content = (
                <article className="group grid grid-cols-[2.2rem_1fr_auto] gap-3 border-b border-white/10 py-7 sm:grid-cols-[3rem_1fr_auto] sm:py-9">
                  <span className="editorial-label pt-2 text-[#77736f]">{project.number}</span>
                  <div>
                    <h3 className={`text-[clamp(2.25rem,6vw,5.6rem)] font-bold leading-[0.9] tracking-[-0.065em] transition-colors ${activeProject === index ? "text-[#edeae4]" : "text-[#696662] group-hover:text-[#edeae4]"}`}>
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#8d8984] sm:text-base">
                      {isEn ? project.descriptionEn : project.descriptionPt}
                    </p>
                    <p className="editorial-label mt-4 text-[#aaa6a0]">{project.category}</p>
                    <figure className="mt-5 aspect-[4/3] overflow-hidden rounded-lg bg-[#1b1a19] lg:hidden">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                    </figure>
                  </div>
                  <div className="flex flex-col items-end justify-between py-1">
                    <span className="editorial-label text-[#77736f]">{project.year}</span>
                    <ArrowUpRight className="h-5 w-5 text-[#82aaff] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </article>
              )

              return project.external ? (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveProject(index)}
                  onFocus={() => setActiveProject(index)}
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={project.title}
                  to={project.href}
                  onMouseEnter={() => setActiveProject(index)}
                  onFocus={() => setActiveProject(index)}
                >
                  {content}
                </Link>
              )
            })}
          </div>

          <div className="relative hidden min-h-[36rem] lg:col-span-5 lg:block">
            <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-xl bg-[#1b1a19]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={projects[activeProject].image}
                  src={projects[activeProject].image}
                  alt={projects[activeProject].imageAlt}
                  loading="lazy"
                  decoding="async"
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span className="editorial-label absolute bottom-5 left-5 text-white">{projects[activeProject].number} / {projects[activeProject].title}</span>
            </div>
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
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
        <div className="editorial-container relative grid h-full min-h-0 grid-rows-[auto_1fr_auto] py-8 sm:py-12">
          <Reveal className="flex items-start justify-between">
            <p className="editorial-label text-[#c7d3ff]">FalaAtípica / UniFOA</p>
            <p className="editorial-label text-right text-white/70">Produto assistivo<br />2026</p>
          </Reveal>

          <Reveal className="flex min-h-0 items-center" distance={50}>
            <h2 className="technology-display max-w-6xl font-black uppercase text-white">
              {isEn ? (
                <>Technology<br /><span className="technology-outline">with purpose.</span></>
              ) : (
                <>Tecnologia<br /><span className="technology-outline">com razão.</span></>
              )}
            </h2>
          </Reveal>

          <Reveal className="grid gap-6 border-t border-white/30 pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
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

      <section className="trajectory-stage flex min-h-[100svh] items-center py-16 sm:py-20">
        <div className="editorial-container grid w-full gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <p className="editorial-label mb-4 text-[#82aaff]">{isEn ? "Experience" : "Experiência"}</p>
            <h2 className="text-[clamp(2.8rem,5.4vw,5.8rem)] font-black leading-[0.84] tracking-[-0.075em] text-[#edeae4]">TRAJETÓRIA</h2>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-[#8d8984]">
              {isEn
                ? "A path shaped by products in production, multidisciplinary teams and real constraints."
                : "Uma jornada construída com produtos em produção, times multidisciplinares e restrições reais."}
            </p>
          </Reveal>
          <div className="lg:col-span-8 lg:border-t lg:border-white/10">
            {experience.map(([period, company, role], index) => (
              <Reveal key={`${period}-${company}`} delay={index * 0.06} distance={22}>
                <div className="trajectory-row group grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[8rem_1fr_1fr] sm:items-baseline sm:gap-5 sm:py-8">
                  <span className="editorial-label text-[#77736f]">{period}</span>
                  <strong className="text-2xl tracking-[-0.045em] text-[#edeae4] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">{company}</strong>
                  <span className="text-sm text-[#8d8984] sm:text-right">{role}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10" aria-label={isEn ? "Areas of expertise" : "Áreas de atuação"}>
        <div className="editorial-container grid md:grid-cols-4">
          {["Interfaces", "Back-end", "AI agents", "Systems"].map((item, index) => (
            <div key={item} className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
              <span className="editorial-label text-[#77736f]">0{index + 1}</span>
              <h3 className="mt-12 text-2xl font-bold tracking-[-0.045em] text-[#edeae4]">{item}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default StitchDossierSection
