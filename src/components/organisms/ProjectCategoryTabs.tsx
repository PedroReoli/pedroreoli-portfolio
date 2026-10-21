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
    className="mt-16 flex flex-wrap gap-8 border-b border-white/10 sm:mt-24"
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
          aria-controls={`${category.id}-projects`}
          onClick={() => onChange(category.id)}
          className={`pb-4 text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
            isActive
              ? "border-b-2 border-[#82aaff] text-white"
              : "text-[#8d8984] hover:text-[#edeae4]"
          }`}
        >
          {isEn ? category.label.en : category.label.pt}
        </button>
      )
    })}
  </div>
)

export default ProjectCategoryTabs
