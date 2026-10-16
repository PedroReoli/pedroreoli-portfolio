import React, { useEffect, useState } from "react"
import { useLanguage } from "../../i18n/useLanguage"

export interface NavSection {
  id: string
  labelPT: string
  labelEN: string
  topicPT: string
  topicEN: string
}

const DEFAULT_SECTIONS: NavSection[] = [
  {
    id: "about",
    labelPT: "01. Visão Geral",
    labelEN: "01. Overview",
    topicPT: "Perfil & Especialidades",
    topicEN: "Profile & Specialties",
  },
  {
    id: "projects",
    labelPT: "02. Sistemas Flagship",
    labelEN: "02. Flagship Systems",
    topicPT: "Organon & Achilles",
    topicEN: "Organon & Achilles",
  },
  {
    id: "corporate",
    labelPT: "03. Projetos Corporativos",
    labelEN: "03. Corporate Projects",
    topicPT: "Autocom3 ERP & Vídeos",
    topicEN: "Autocom3 ERP & Videos",
  },
  {
    id: "freelance",
    labelPT: "04. Aplicações Web",
    labelEN: "04. Web Applications",
    topicPT: "Sites & Acessibilidade",
    topicEN: "Web & Accessibility",
  },
  {
    id: "experience",
    labelPT: "05. Experiência",
    labelEN: "05. Experience",
    topicPT: "Trajetória Profissional",
    topicEN: "Career Timeline",
  },
  {
    id: "education",
    labelPT: "06. Formação & Idiomas",
    labelEN: "06. Education & Languages",
    topicPT: "Academia & Idiomas",
    topicEN: "Academia & Languages",
  },
  {
    id: "skills",
    labelPT: "07. Stack & Engenharia",
    labelEN: "07. Tech Stack & AI",
    topicPT: "Frontend, APIs & Cloud",
    topicEN: "Architecture & AI",
  },
]

export const FloatingSectionNav: React.FC<{ sections?: NavSection[] }> = ({
  sections = DEFAULT_SECTIONS,
}) => {
  const { language } = useLanguage()
  const [activeId, setActiveId] = useState<string>("about")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250
      let currentSection = sections[0].id

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = section.id
            break
          }
        }
      }

      setActiveId(currentSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav
      aria-label={language === "pt" ? "Índice de Seções da Página" : "Page Section Index"}
      className="ds-index"
    >
      <ul className="ds-index-list">
        {sections.map((section) => {
          const isActive = activeId === section.id
          const label = language === "pt" ? section.labelPT : section.labelEN
          const topic = language === "pt" ? section.topicPT : section.topicEN

          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollTo(section.id)}
                className={`ds-index-item ${isActive ? "active" : ""}`}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="ds-index-dot" />
                <div className="ds-index-label flex flex-col items-start text-left">
                  <span className="font-heading font-bold text-[11px] tracking-tight text-white">
                    {label}
                  </span>
                  <span className="text-[10px] font-body text-[#a1a1aa] normal-case">
                    {topic}
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default FloatingSectionNav
