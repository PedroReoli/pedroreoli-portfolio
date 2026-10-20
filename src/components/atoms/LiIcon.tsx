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
    <figure className="absolute left-0 stroke-white/80 pointer-events-none select-none z-10">
      <svg
        className="-rotate-90 w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] lg:w-[75px] lg:h-[75px] drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]"
        viewBox="0 0 100 100"
      >
        {/* Anel Externo Fixo */}
        <circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-cyan-400/40 stroke-[2px] fill-transparent"
        />

        {/* Anel de Progresso Conectado ao Scroll da Linha */}
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-[4px] stroke-cyan-300 fill-white/15 backdrop-blur-sm"
          style={{
            pathLength: scrollYProgress,
          }}
        />

        {/* Núcleo Pulsante Celestial */}
        <circle
          cx="75"
          cy="50"
          r="9"
          className="animate-pulse stroke-1 stroke-white fill-cyan-400"
        />
      </svg>
    </figure>
  )
}

export default LiIcon
