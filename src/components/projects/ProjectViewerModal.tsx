import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { interfaceContent, getLocalized } from '@/data/content';
import { Icon } from '@/components/common/Icon';
import type { CorporateProjectImage } from '@/types/content';

interface ProjectViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: CorporateProjectImage[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const ProjectViewerModal: React.FC<ProjectViewerModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex,
}) => {
  const { language } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const t = interfaceContent.projectViewer[language];
  const activeImage = images[currentIndex];

  // Open/close native dialog and handle focus management
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) {
        dialog.showModal();
      }
      closeButtonRef.current?.focus();
    } else {
      if (dialog.open) {
        dialog.close();
      }
      previousActiveElementRef.current?.focus();
    }
  }, [isOpen]);

  // Handle native cancel event (Escape key)
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  // Keyboard navigation for arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onSelectIndex((currentIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onSelectIndex((currentIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onSelectIndex]);

  // Modern web guidance fallback: click outside to close dialog
  const handlePointerDown = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const r = dialog.getBoundingClientRect();
    const isOutside =
      e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    if (isOutside) {
      onClose();
    }
  };

  if (!isOpen || !activeImage) return null;

  const altText = getLocalized(activeImage.alt, language);

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onPointerDown={handlePointerDown}
      aria-labelledby="viewer-image-title"
      className="p-0 bg-transparent border-0 max-w-6xl w-full m-auto focus:outline-none backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
    >
      <div
        className="relative bg-paper border border-line rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh] m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-paper-light">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-signal font-semibold">
              {currentIndex + 1} / {images.length}
            </span>
            <h2 id="viewer-image-title" className="text-sm font-mono font-medium text-ink">
              {altText}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={activeImage.src}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-ink-soft hover:text-ink border border-line rounded bg-paper hover:bg-paper-muted transition-colors min-h-[44px]"
              aria-label={`${t.openAria} (${altText})`}
            >
              <span>{t.open}</span>
              <Icon name="external-link" size={14} />
            </a>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2 text-ink-soft hover:text-signal border border-line rounded bg-paper hover:bg-paper-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={t.close}
            >
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>

        {/* Modal Image Body with Prev/Next Controls */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 bg-paper-muted/30 overflow-auto">
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => onSelectIndex((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-paper/90 hover:bg-paper text-ink border border-line rounded-full shadow-md hover:scale-105 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={t.previous}
          >
            <Icon name="arrow-left" size={18} />
          </button>

          <img
            src={activeImage.src}
            srcSet={activeImage.srcSet}
            sizes="90vw"
            alt={altText}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded border border-line shadow-sm"
          />

          {/* Next Button */}
          <button
            type="button"
            onClick={() => onSelectIndex((currentIndex + 1) % images.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-paper/90 hover:bg-paper text-ink border border-line rounded-full shadow-md hover:scale-105 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={t.next}
          >
            <Icon name="arrow-right" size={18} />
          </button>
        </div>

        {/* Modal Footer Thumbnail Strip */}
        <div className="flex items-center gap-3 px-6 py-3 border-t border-line bg-paper-light overflow-x-auto">
          {images.map((img, idx) => {
            const isSelected = idx === currentIndex;
            const thumbAlt = getLocalized(img.alt, language);
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`relative shrink-0 rounded overflow-hidden border-2 transition-all min-w-[44px] min-h-[44px] ${
                  isSelected ? 'border-cobalt ring-2 ring-cobalt/20' : 'border-line opacity-60 hover:opacity-100'
                }`}
                aria-label={`Ver imagem ${idx + 1}: ${thumbAlt}`}
                aria-current={isSelected ? 'true' : undefined}
              >
                <img src={img.src} alt="" className="w-16 h-10 object-cover" />
              </button>
            );
          })}
        </div>
      </div>
    </dialog>
  );
};
