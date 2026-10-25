import type { Variants } from "framer-motion"

export const filmEase = [0.16, 1, 0.3, 1] as const

export const chapterMotion: Variants = {
  enter: (direction: number = 1) => ({ opacity: 0, x: 28 * direction }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.46, ease: filmEase, staggerChildren: 0.055, delayChildren: 0.04 },
  },
  exit: (direction: number = 1) => ({
    opacity: 0,
    x: -16 * direction,
    transition: { duration: 0.16, ease: filmEase },
  }),
}

export const chapterItemMotion: Variants = {
  enter: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: filmEase } },
}

export const staggerMotion: Variants = {
  enter: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.06 } },
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
