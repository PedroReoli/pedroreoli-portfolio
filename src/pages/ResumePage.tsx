import { useEffect } from 'react'
import { ArrowUpRight, Download, FileText } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { siteContent } from '@/data/content'
import '@/styles/resume-page.css'

const resumeHref = '/resume/curriculo.pdf'
const copy = {
  pt: {
    title: 'Currículo',
    role: 'Full Stack Developer e AI Engineer',
    open: 'Abrir PDF',
    download: 'Baixar PDF',
    preview: 'Prévia do currículo',
    fileDetails: 'PDF · 2 páginas · Português',
    openPreview: 'Abrir currículo em PDF (nova aba)',
  },
  en: {
    title: 'Resume',
    role: 'Full Stack Developer and AI Engineer',
    open: 'Open PDF',
    download: 'Download PDF',
    preview: 'Resume preview',
    fileDetails: 'PDF · 2 pages · Portuguese',
    openPreview: 'Open resume PDF (new tab)',
  },
}

export function ResumePage() {
  const { language } = useLanguage()
  const text = copy[language]

  useEffect(() => {
    document.title = `${text.title} | ${siteContent.name}`
  }, [text.title])

  return (
    <div className="resume-page">
      <div className="shell resume-page__shell">
        <header className="resume-page__intro">
          <h1>{text.title}</h1>
          <p className="resume-page__name">{siteContent.legalName}</p>
          <p className="resume-page__role">{text.role}</p>

          <div className="resume-page__actions">
            <a className="resume-page__button resume-page__button--primary" href={resumeHref} target="_blank" rel="noopener noreferrer">
              {text.open}<ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="resume-page__button" href={resumeHref} download="curriculo.pdf">
              <Download size={16} aria-hidden="true" />{text.download}
            </a>
          </div>
        </header>

        <a className="resume-preview" href={resumeHref} target="_blank" rel="noopener noreferrer" aria-label={text.openPreview}>
          <span className="resume-preview__image">
            <img src="/resume/curriculo-preview.webp" alt="" width={708} height={1000} />
          </span>
          <span className="resume-preview__caption">
            <FileText size={19} aria-hidden="true" />
            <span>
              <strong>{text.preview}</strong>
              <small>{text.fileDetails}</small>
            </span>
            <ArrowUpRight className="resume-preview__arrow" size={17} aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  )
}
