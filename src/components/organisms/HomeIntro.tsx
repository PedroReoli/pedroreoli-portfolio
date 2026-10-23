import { useRef } from "react"
import { m, useScroll, useTransform } from "framer-motion"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import AboutSection from "./AboutSection"
import PortfolioHero from "./PortfolioHero"

export default function HomeIntro() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const backgroundColor = useTransform(scrollYProgress, [0, 0.5], ["#111010", "#edeae4"])

  return (
    <m.div
      ref={ref}
      className="relative"
      style={{ backgroundColor: reduceMotion ? "#111010" : backgroundColor }}
    >
      <PortfolioHero />
      <AboutSection blendBackground={!reduceMotion} />
    </m.div>
  )
}
