import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import type { CorporateProjectImage } from '@/types/content'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'

interface Props {
  images: CorporateProjectImage[]
  index: number | null
  onChange: (index: number | null) => void
}

export function ProjectViewerModal({ images, index, onChange }: Props) {
  const { language } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const copy = interfaceContent.projectViewer[language]
  const open = index !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (index === null) return
      if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
      if (event.key === 'ArrowRight') onChange((index + 1) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, index, onChange])

  const image = index === null ? null : images[index]
  return (
    <dialog ref={dialogRef} className="project-modal" onClose={() => onChange(null)} onCancel={() => onChange(null)}>
      {image && <>
        <button className="project-modal__close" type="button" onClick={() => onChange(null)} aria-label={copy.close}><X /></button>
        <img src={image.src} srcSet={image.srcSet} alt={image.alt[language]} />
        <div className="project-modal__controls">
          <button type="button" onClick={() => onChange((index! - 1 + images.length) % images.length)} aria-label={copy.previous}><ArrowLeft /></button>
          <span>{String(index! + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => onChange((index! + 1) % images.length)} aria-label={copy.next}><ArrowRight /></button>
        </div>
      </>}
    </dialog>
  )
}
