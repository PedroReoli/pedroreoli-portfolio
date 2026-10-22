import type { ReactNode } from "react"
import Reveal from "../atoms/Reveal"

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
    <section className="archive-container archive-heading">
      <Reveal distance={24}>
        <p className="editorial-label mb-4 text-[#82aaff]">{eyebrow}</p>
        <h1 className="archive-title">{title}</h1>
      </Reveal>
      {description && (
        <Reveal delay={0.12} distance={20}>
          <p className="archive-description">{description}</p>
        </Reveal>
      )}
      {children}
    </section>
  )
}
