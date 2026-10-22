import React from "react"

export type ProjectCategory = "corporativo" | "gerais"

interface ProjectCategoryTabsProps {
  activeCategory: ProjectCategory
  isEn: boolean
  onChange: (category: ProjectCategory) => void
}

const categories: Array<{
  id: ProjectCategory
  label: { pt: string; en: string }
}> = [
  { id: "corporativo", label: { pt: "Corporativo", en: "Enterprise" } },
  { id: "gerais", label: { pt: "Independentes", en: "Independent" } },
]

export const ProjectCategoryTabs: React.FC<ProjectCategoryTabsProps> = ({
  activeCategory,
  isEn,
  onChange,
}) => (
  <div
    className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b border-white/10 sm:mt-8"
    role="group"
    aria-label={isEn ? "Project categories" : "Categorias de projetos"}
  >
    {categories.map((category) => {
      const isActive = activeCategory === category.id

      return (
        <button
          key={category.id}
          type="button"
          aria-pressed={isActive}
          aria-controls={isActive ? `${category.id}-projects` : undefined}
          onClick={() => onChange(category.id)}
          className={`min-h-11 border-b-2 pb-3 pt-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
            isActive
              ? "border-[#82aaff] text-white"
              : "border-transparent text-[#aaa6a0] hover:text-[#edeae4]"
          }`}
        >
          {isEn ? category.label.en : category.label.pt}
        </button>
      )
    })}
  </div>
)

export default ProjectCategoryTabs
