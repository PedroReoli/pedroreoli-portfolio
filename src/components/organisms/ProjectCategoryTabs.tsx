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
    className="archive-category-tabs"
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
          className={`archive-category-button ${
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
