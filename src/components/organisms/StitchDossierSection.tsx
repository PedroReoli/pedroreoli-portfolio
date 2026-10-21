import React from "react"
import ExperienceSection from "./ExperienceSection"
import PurposeStorySection from "./PurposeStorySection"
import SelectedProjectsSection from "./SelectedProjectsSection"
import StitchStackSection from "./StitchStackSection"
import WorkingMethodSection from "./WorkingMethodSection"

export const StitchDossierSection: React.FC = () => (
  <div className="w-full">
    <SelectedProjectsSection />
    <StitchStackSection />
    <PurposeStorySection />
    <ExperienceSection />
    <WorkingMethodSection />
  </div>
)

export default StitchDossierSection
