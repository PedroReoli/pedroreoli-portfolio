import { describe, it, expect, vi } from 'vitest'
import fs from 'fs'
import path from 'path'
import { render } from '@testing-library/react'
import { ProjectViewerModal } from '../components/projects/ProjectViewerModal'
import { LanguageProvider } from '../context/LanguageContext'
import type { CorporateProjectImage } from '../types/content'
const pagesCss = fs.readFileSync(path.resolve(__dirname, '../styles/pages.css'), 'utf8').replace(/\r/g, '')
// Regressao de modal preservada; requisitos de paineis foram migrados para as suites de fluxo normal.
describe('Modal existente: integridade de carregamento', () => {
  describe('4. R2: Modal Image Preloading & Transition States', () => {
    const mockImages: CorporateProjectImage[] = [
      { src: '/images/projects/p1-1.jpg', srcSet: '', alt: { pt: 'Imagem 1', en: 'Image 1' } },
      { src: '/images/projects/p1-2.jpg', srcSet: '', alt: { pt: 'Imagem 2', en: 'Image 2' } },
      { src: '/images/projects/p1-3.jpg', srcSet: '', alt: { pt: 'Imagem 3', en: 'Image 3' } },
    ]

    it('verifies modal preloads adjacent images (next and previous) on display', () => {
      // Mock HTMLDialogElement methods in jsdom
      HTMLDialogElement.prototype.showModal = vi.fn()
      HTMLDialogElement.prototype.close = vi.fn()

      // Mock Image constructor
      const createdImages: { src: string; srcset?: string }[] = []
      const originalImage = global.Image
      global.Image = class {
        _src = ''
        set src(val: string) {
          this._src = val
          createdImages.push({ src: val })
        }
        get src() {
          return this._src
        }
      } as unknown as typeof Image

      const onChange = vi.fn()
      render(
        <LanguageProvider>
          <ProjectViewerModal images={mockImages} index={1} onChange={onChange} />
        </LanguageProvider>
      )

      // index 1: next should be 2, prev should be 0
      expect(createdImages.some((img) => img.src === '/images/projects/p1-3.jpg')).toBe(true)
      expect(createdImages.some((img) => img.src === '/images/projects/p1-1.jpg')).toBe(true)

      // Restore
      global.Image = originalImage
    })

    it('verifies pages.css contains smooth opacity transition for modal images without pops', () => {
      expect(pagesCss).toContain('.project-modal__img { width: 100%; max-height: 78vh; object-fit: contain; transition: opacity 0.25s ease-out; }')
      expect(pagesCss).toContain('.project-modal__img.is-loading { opacity: 0.6; }')
      expect(pagesCss).toContain('.project-modal__img.is-loaded { opacity: 1; }')
    })
  })

})
