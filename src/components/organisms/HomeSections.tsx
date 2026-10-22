import React from "react"
import AboutSection from "./AboutSection"
import ExperienceSection from "./ExperienceSection"
import PurposeStorySection from "./PurposeStorySection"
import SelectedProjectsSection from "./SelectedProjectsSection"
import TechnologyStackSection from "./TechnologyStackSection"

export const HomeSections: React.FC = () => (
  <div className="w-full">
    <AboutSection />
    <SelectedProjectsSection />
    <TechnologyStackSection />
    <PurposeStorySection />
    <ExperienceSection />
  </div>
)

export default HomeSections
