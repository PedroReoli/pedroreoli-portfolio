import type { Variants } from "framer-motion"

export const filmEase = [0.22, 1, 0.36, 1] as const

export const chapterMotion: Variants = {
  enter: (direction: number = 1) => ({
    opacity: 0,
    x: 28 * direction,
    scale: 0.96,
    filter: "blur(8px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.38,
      ease: filmEase,
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
  exit: (direction: number = 1) => ({
    opacity: 0,
    x: -24 * direction,
    scale: 0.96,
    filter: "blur(8px)",
    transition: { duration: 0.2, ease: filmEase },
  }),
}

export const chapterItemMotion: Variants = {
  enter: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: filmEase } },
}

export const staggerMotion: Variants = {
  enter: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.02 } },
}

export const stillMotion: Variants = {
  enter: { opacity: 1, x: 0, y: 0, scale: 1 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0, staggerChildren: 0, delayChildren: 0 },
  },
  exit: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0 } },
}
