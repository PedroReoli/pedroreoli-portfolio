import type { ReactNode } from "react"
import Reveal from "../atoms/Reveal"
import SlideSection from "../atoms/SlideSection"

interface ArchiveHeadingProps {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}

export default function ArchiveHeading({
  eyebrow,
  title,
  description,
  children,
}: ArchiveHeadingProps) {
  return (
    <SlideSection className="archive-container archive-heading">
      <Reveal distance={12} duration={0.5}>
        <p className="editorial-label mb-4 text-[#82aaff]">{eyebrow}</p>
      </Reveal>
      <div className="archive-heading-grid">
        <div className="archive-title-mask">
          <Reveal distance={48} delay={0.06} duration={0.85}>
            <h1 className="archive-title">{title}</h1>
          </Reveal>
        </div>
        {description && (
          <Reveal delay={0.18} distance={20} duration={0.65}>
            <p className="archive-description">{description}</p>
          </Reveal>
        )}
      </div>
      {children && (
        <Reveal delay={0.26} distance={12} duration={0.6}>
          {children}
        </Reveal>
      )}
    </SlideSection>
  )
}
