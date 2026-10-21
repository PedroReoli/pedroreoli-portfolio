import React from "react"
import ExperienceSection from "./ExperienceSection"
import ExpertiseSection from "./ExpertiseSection"
import PurposeStorySection from "./PurposeStorySection"
import SelectedProjectsSection from "./SelectedProjectsSection"
import StitchStackSection from "./StitchStackSection"

export const StitchDossierSection: React.FC = () => (
  <div className="w-full">
    <SelectedProjectsSection />
    <StitchStackSection />
    <PurposeStorySection />
    <ExperienceSection />
    <ExpertiseSection />
  </div>
)

export default StitchDossierSection
