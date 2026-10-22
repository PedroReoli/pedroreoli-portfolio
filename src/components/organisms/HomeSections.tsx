import React from "react"
import ExperienceSection from "./ExperienceSection"
import PurposeStorySection from "./PurposeStorySection"
import SelectedProjectsSection from "./SelectedProjectsSection"
import TechnologyStackSection from "./TechnologyStackSection"

export const HomeSections: React.FC = () => (
  <div className="w-full">
    <SelectedProjectsSection />
    <TechnologyStackSection />
    <PurposeStorySection />
    <ExperienceSection />
  </div>
)

export default HomeSections
