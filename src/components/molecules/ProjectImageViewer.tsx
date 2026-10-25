import { useEffect, useRef, useState } from "react"
import { m, useIsPresent } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react"
import type { ProjectImage } from "../../content/projectsContent"
import { useLanguage } from "../../i18n/useLanguage"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import { filmEase } from "../../motion/choreography"

interface ProjectImageViewerProps {
  images: ProjectImage[]
  initialIndex: number
  onClose: () => void
}

/** O dialog nativo mantém foco e conteúdo de fundo inerte sem um focus trap próprio. */
export default function ProjectImageViewer({
  images,
  initialIndex,
  onClose,
}: ProjectImageViewerProps) {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = useReducedMotion()
  const present = useIsPresent()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(initialIndex)
  const [failedImage, setFailedImage] = useState<string | null>(null)
  const [loadedImage, setLoadedImage] = useState<string | null>(null)
  const image = images[index]
  const caption = image.alt[language]
  useEffect(() => {
    if (dialogRef.current) dialogRef.current.inert = !present
  }, [present])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const focused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.documentElement.style.overflow
    const onBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return
      const rect = dialog.getBoundingClientRect()
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        onClose()
    }
    const onArrowKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault()
        const direction = event.key === "ArrowRight" ? 1 : -1
        setIndex((current) => (current + direction + images.length) % images.length)
      }
    }
    dialog.addEventListener("click", onBackdropClick)
    dialog.addEventListener("keydown", onArrowKey)
    dialog.showModal()
    document.documentElement.style.overflow = "hidden"
    return () => {
      dialog.removeEventListener("click", onBackdropClick)
      dialog.removeEventListener("keydown", onArrowKey)
      dialog.close()
      document.documentElement.style.overflow = previousOverflow
      if (focused?.isConnected) focused.focus({ preventScroll: true })
    }
  }, [onClose, images.length])

  const move = (direction: number) =>
    setIndex((current) => (current + direction + images.length) % images.length)

  return (
    <m.dialog
      ref={dialogRef}
      className="project-viewer"
      aria-labelledby="project-viewer-title"
      initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.99 }}
      transition={{ duration: reduceMotion ? 0 : present ? 0.28 : 0.16, ease: filmEase }}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className="project-viewer-layout">
        <header className="project-viewer-header">
          <div aria-live="polite" aria-atomic="true">
            <p className="editorial-label">
              AUTOCOM3 / {String(index + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </p>
            <h2 id="project-viewer-title">{caption}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? "Close gallery" : "Fechar galeria"}
          >
            <X aria-hidden="true" />
          </button>
        </header>
        <div
          className="project-viewer-image"
          aria-busy={failedImage !== image.src && loadedImage !== image.src}
        >
          {failedImage === image.src ? (
            <p role="status">
              {isEn
                ? "This image couldn't load. Try another image or open the original."
                : "Não foi possível carregar esta imagem. Veja outra captura ou abra o arquivo original."}
            </p>
          ) : (
            <>
              {loadedImage !== image.src && (
                <p className="project-viewer-loading" role="status">
                  {isEn ? "Loading image" : "Carregando imagem"}
                </p>
              )}
              <img
                key={image.src}
                src={image.src}
                alt={caption}
                width={2880}
                height={1800}
                className={loadedImage === image.src ? "is-loaded" : undefined}
                decoding="async"
                onLoad={() => setLoadedImage(image.src)}
                onError={() => setFailedImage(image.src)}
              />
            </>
          )}
        </div>
        <footer className="project-viewer-controls">
          <div className="project-viewer-pagination">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={isEn ? "Previous image" : "Imagem anterior"}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <span aria-hidden="true">
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={isEn ? "Next image" : "Próxima imagem"}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <a
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isEn ? "Open original in a new tab" : "Abrir original em nova aba"}
          >
            {isEn ? "Open original" : "Abrir original"}
            <ExternalLink aria-hidden="true" />
          </a>
        </footer>
      </div>
    </m.dialog>
  )
}
