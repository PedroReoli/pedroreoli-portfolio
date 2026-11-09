import { render } from '@testing-library/react'
import { LanguageProvider } from '../context/LanguageContext'
import { HomePage } from '../pages/HomePage'
import { Footer } from '../components/layout/Footer'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export function renderHome() {
  return render(<LanguageProvider><main id="main-content"><HomePage /></main><Footer /></LanguageProvider>)
}
export const sectionIds = ['hero', 'sobre', 'projetos-selecionados', 'stack', 'proposito', 'experiencia']
export const css = (name: string) => readFileSync(resolve(__dirname, '../styles', name + '.css'), 'utf8')
