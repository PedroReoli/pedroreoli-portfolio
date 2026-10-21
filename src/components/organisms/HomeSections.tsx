import React from "react"
import ExperienceSection from "./ExperienceSection"
import PurposeStorySection from "./PurposeStorySection"
import SelectedProjectsSection from "./SelectedProjectsSection"
import TechnologyStackSection from "./TechnologyStackSection"
import WorkingMethodSection from "./WorkingMethodSection"

export const HomeSections: React.FC = () => (
  <div className="w-full">
    <SelectedProjectsSection />
    <TechnologyStackSection />
    <PurposeStorySection />
    <ExperienceSection />
    <WorkingMethodSection />
  </div>
)

export default HomeSections
