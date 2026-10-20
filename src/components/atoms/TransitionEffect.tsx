import React from "react"
import { motion } from "framer-motion"

export const TransitionEffect: React.FC = () => {
  return (
    <div className="pointer-events-none select-none">
      {/* Camada 1: Ciano Celeste Límpido */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-50 bg-[#38bdf8]"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Camada 2: Azul Meia-Noite Profundo */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-40 bg-[#0a1626]"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.15, duration: 0.6, ease: "easeInOut" }}
      />

      {/* Camada 3: Marinho Cósmico Escuro */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-[#050a12]"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
      />
    </div>
  )
}

export default TransitionEffect
