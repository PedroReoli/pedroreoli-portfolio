import React, { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
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
        <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-5 sm:mb-20">
          <div>
            <p className="editorial-label mb-3 text-[#82aaff]">{isEn ? "Selected work" : "Trabalhos selecionados"}</p>
            <h2 className="section-display text-[#edeae4]">PROJETOS</h2>
          </div>
          <span className="editorial-label hidden text-[#77736f] sm:block">03 / 2024—2026</span>
        </div>

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
            <div className="sticky top-24 aspect-[4/5] overflow-hidden bg-[#1b1a19]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={projects[activeProject].image}
                  src={projects[activeProject].image}
                  alt={projects[activeProject].imageAlt}
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

        <div className="mt-8 grid gap-5 lg:hidden">
          {projects.slice(0, 1).map((project) => (
            <figure key={project.title} className="aspect-[4/3] overflow-hidden bg-[#1b1a19]">
              <img src={project.image} alt={project.imageAlt} loading="lazy" className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </section>

      <section className="editorial-section overflow-hidden border-y border-white/10 bg-[#151413]">
        <div className="editorial-container grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="editorial-label mb-6 text-[#82aaff]">{isEn ? "Hello" : "Olá"}</p>
            <h2 className="text-[clamp(2.8rem,7vw,7.2rem)] font-bold leading-[0.94] tracking-[-0.065em] text-[#d8d4ce]">
              {isEn ? (
                <>I build software that <em className="font-normal text-[#77736f]">moves</em> ideas into the real world.</>
              ) : (
                <>Construo software que leva <em className="font-normal text-[#77736f]">ideias</em> para o mundo real.</>
              )}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-md text-base leading-relaxed text-[#9a9690] sm:text-lg">
              {isEn
                ? "From interface to architecture, I like making complex things feel inevitable."
                : "Da interface à arquitetura, gosto de fazer o complexo parecer simples e inevitável."}
            </p>
          </div>
        </div>
      </section>

      <section className="relative min-h-[72svh] overflow-hidden">
        <img
          src="/TCC-img2.png"
          alt="Pedro apresentando o FalaAtípica no UniFOA"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-black/10" />
        <div className="editorial-container relative flex min-h-[72svh] items-end py-12 sm:py-20">
          <div className="max-w-3xl">
            <p className="editorial-label mb-5 text-[#b8caff]">FalaAtípica / UniFOA</p>
            <h2 className="text-[clamp(2.7rem,7vw,6.8rem)] font-bold leading-[0.92] tracking-[-0.06em] text-white">
              {isEn ? "Technology with a reason to exist." : "Tecnologia com razão para existir."}
            </h2>
            <a
              href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-b border-white pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white"
            >
              {isEn ? "Read the story" : "Ler a história"}<ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-container">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="editorial-label mb-4 text-[#82aaff]">{isEn ? "Experience" : "Experiência"}</p>
            <h2 className="text-[clamp(2.8rem,5.4vw,5.8rem)] font-black leading-[0.84] tracking-[-0.075em] text-[#edeae4]">TRAJETÓRIA</h2>
          </div>
          <div className="lg:col-span-8">
            {experience.map(([period, company, role]) => (
              <div key={`${period}-${company}`} className="grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[8rem_1fr_1fr] sm:items-baseline sm:gap-5">
                <span className="editorial-label text-[#77736f]">{period}</span>
                <strong className="text-xl tracking-[-0.035em] text-[#edeae4] sm:text-2xl">{company}</strong>
                <span className="text-sm text-[#8d8984] sm:text-right">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10">
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
