import type { Variants } from "framer-motion"

export const filmEase = [0.22, 1, 0.36, 1] as const

export const chapterMotion: Variants = {
  enter: (direction: number = 1) => ({ opacity: 0, x: 16 * direction, filter: "blur(4px)" }),
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: filmEase, staggerChildren: 0.035, delayChildren: 0.02 },
  },
  exit: (direction: number = 1) => ({
    opacity: 0,
    x: -12 * direction,
    filter: "blur(4px)",
    transition: { duration: 0.14, ease: filmEase },
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
