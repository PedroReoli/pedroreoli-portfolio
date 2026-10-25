import { useContext } from "react"
import { AnimatePresence, m, useIsPresent } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { ExperienceItem } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import { chapterMotion, chapterItemMotion, stillMotion } from "../../motion/choreography"
import { SlideEntranceContext } from "../atoms/slideEntranceContext"

interface ExperienceChapterProps {
  item: ExperienceItem
  index: number
  total: number
  direction: number
}

function ChapterContent({ item, index, total, direction }: ExperienceChapterProps) {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = useReducedMotion()
  const present = useIsPresent()
  const itemVariants = reduceMotion ? stillMotion : chapterItemMotion
  return (
    <m.article
      id="experience-detail"
      custom={direction}
      variants={reduceMotion ? stillMotion : chapterMotion}
      initial={reduceMotion ? false : "enter"}
      animate={present ? "visible" : "exit"}
      exit="exit"
      className="flex h-full min-h-0 flex-col justify-center"
      aria-live="polite"
    >
      <m.p variants={itemVariants} className="editorial-label text-[#82aaff]">
        0{index + 1} / {item.period[language]}
      </m.p>
      <m.h3
        variants={itemVariants}
        className="experience-detail-company mt-2 font-black tracking-[-0.055em] text-white"
      >
        {item.company}
      </m.h3>
      <m.p variants={itemVariants} className="experience-detail-role mt-1 text-[#a39e98]">
        {item.role[language]}
      </m.p>
      <m.p
        variants={itemVariants}
        className="experience-detail-copy mt-3 max-w-xl leading-relaxed text-white/75"
      >
        {item.description[language]}
      </m.p>
      {item.technologies && (
        <m.div
          variants={itemVariants}
          className="experience-technologies mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-white/10 pt-3"
        >
          {item.technologies.slice(0, 5).map((technology) => (
            <span
              key={typeof technology === "string" ? technology : technology.pt}
              className="editorial-label inline-flex items-center gap-2 text-[#9b9690]"
            >
              <span className="text-[#82aaff]" aria-hidden="true">
                •
              </span>
              {typeof technology === "string" ? technology : technology[language]}
            </span>
          ))}
        </m.div>
      )}
      <m.span
        variants={itemVariants}
        className="experience-detail-hint mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/45"
      >
        {index === total - 1
          ? isEn
            ? "End of journey"
            : "Fim da trajetória"
          : isEn
          ? "Keep scrolling"
          : "Continue rolando"}
        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
      </m.span>
    </m.article>
  )
}

export default function ExperienceChapter(props: ExperienceChapterProps) {
  const visible = useContext(SlideEntranceContext)
  const reducedMotion = useReducedMotion()
  const { language } = useLanguage()
  return (
    <AnimatePresence mode="wait" custom={props.direction}>
      {(reducedMotion || visible !== false) && (
        <ChapterContent
          key={`${props.item.company}-${props.item.period.pt}-${language}`}
          {...props}
        />
      )}
    </AnimatePresence>
  )
}
