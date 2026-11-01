import { useRef } from "react"
import AboutSection from "./AboutSection"
import PortfolioHero from "./PortfolioHero"

export default function HomeIntro() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className="relative bg-transparent">
      <PortfolioHero />
      <AboutSection blendBackground={true} />
    </div>
  )
}
