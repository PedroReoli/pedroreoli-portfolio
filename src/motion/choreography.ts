import type { Variants } from "framer-motion"

export const filmEase = [0.16, 1, 0.3, 1] as const

export const chapterMotion: Variants = {
  enter: (direction: number = 1) => ({ opacity: 0, x: 18 * direction }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: filmEase, staggerChildren: 0.04, delayChildren: 0.02 },
  },
  exit: (direction: number = 1) => ({
    opacity: 0,
    x: -14 * direction,
    transition: { duration: 0.15, ease: filmEase },
  }),
}

export const chapterItemMotion: Variants = {
  enter: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: filmEase } },
}

export const staggerMotion: Variants = {
  enter: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
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
