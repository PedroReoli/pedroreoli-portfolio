import { useEffect } from 'react'
import { ArrowLeft, ExternalLink, Download, FileText } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'
import '@/styles/resume-page.css'

export function ResumePage() {
  const { language } = useLanguage()
  const { navigate } = useRouter()
  const resumeHref = '/resume/curriculo.pdf'

  useEffect(() => {
    document.title = language === 'pt' ? 'Currículo | Pedro Reoli' : 'Resume | Pedro Reoli'
    window.scrollTo(0, 0)
  }, [language])

  return (
    <div className="resume-page">
      <div className="shell resume-page__shell">
        <header className="resume-page__header">
          <button
            type="button"
            className="resume-page__back-btn"
            onClick={() => navigate('/')}
            aria-label={language === 'pt' ? 'Voltar para o início' : 'Back to home'}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {language === 'pt' ? 'Início' : 'Home'}
          </button>

          <div className="resume-page__heading">
            <p className="overline">{language === 'pt' ? 'Documento Profissional' : 'Professional Document'}</p>
            <h1>{language === 'pt' ? 'Currículo Profissional' : 'Professional Resume'}</h1>
            <p className="resume-page__subtitle">
              {language === 'pt'
                ? 'Full Stack Developer e AI Engineer · LLMs, RAG e MCP'
                : 'Full Stack Developer and AI Engineer · LLMs, RAG and MCP'}
            </p>
          </div>

          <div className="resume-page__actions">
            <a
              className="resume-page__btn-primary"
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={18} aria-hidden="true" />
              {language === 'pt' ? 'Abrir PDF em nova aba' : 'Open PDF in new tab'}
            </a>
            <a
              className="resume-page__btn-secondary"
              href={resumeHref}
              download="curriculo.pdf"
            >
              <Download size={18} aria-hidden="true" />
              {language === 'pt' ? 'Baixar PDF' : 'Download PDF'}
            </a>
          </div>
        </header>

        <section className="resume-page__viewer" aria-label={language === 'pt' ? 'Visualizador do currículo' : 'Resume viewer'}>
          <div className="resume-page__frame-wrap">
            <object
              data={resumeHref}
              type="application/pdf"
              className="resume-page__frame"
              aria-label={language === 'pt' ? 'Visualização do currículo em PDF' : 'PDF Resume view'}
            >
              <div className="resume-page__fallback">
                <FileText size={48} aria-hidden="true" />
                <p>
                  {language === 'pt'
                    ? 'Seu navegador não suporta visualização direta de PDF nesta tela.'
                    : 'Your browser does not support embedded PDF viewing.'}
                </p>
                <a
                  className="resume-page__btn-primary"
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={18} aria-hidden="true" />
                  {language === 'pt' ? 'Visualizar PDF em nova aba' : 'View PDF in new tab'}
                </a>
              </div>
            </object>
          </div>
        </section>
      </div>
    </div>
  )
}

