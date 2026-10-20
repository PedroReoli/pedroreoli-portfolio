import React from "react"
import { useScroll, motion } from "framer-motion"

interface LiIconProps {
  reference: React.RefObject<HTMLElement | null>
}

export const LiIcon: React.FC<LiIconProps> = ({ reference }) => {
  const { scrollYProgress } = useScroll({
    target: reference as React.RefObject<HTMLElement>,
    offset: ["center end", "center center"],
  })

  return (
    <figure className="absolute left-[8px] sm:left-[16px] top-6 pointer-events-none select-none z-10 -translate-y-1/2">
      <svg
        className="-rotate-90 w-5 h-5 sm:w-6 sm:h-6"
        viewBox="0 0 24 24"
      >
        {/* Anel Externo Fixo estilo Git Commit */}
        <circle
          cx="12"
          cy="12"
          r="9"
          className="stroke-[#30363d] stroke-[2px] fill-[#0d1117]"
        />

        {/* Anel de Progresso Verde Commit GitHub */}
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          className="stroke-[2.5px] stroke-[#3fb950] fill-transparent"
          style={{
            pathLength: scrollYProgress,
          }}
        />

        {/* Ponto Central Sólido (Commit Node) */}
        <circle
          cx="12"
          cy="12"
          r="4"
          className="fill-[#238636] stroke-none"
        />
      </svg>
    </figure>
  )
}

export default LiIcon

