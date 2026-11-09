import { FilmSlide } from '@/components/scene/FilmSlide'
import { sceneClips } from '@/data/content'

/** Catálogo de desenvolvimento que consome os mesmos estilos/componentes reais. */
export function DesignSystemPreview() {
  return (
    <section className="shell design-system-preview">
      <p>Catálogo de desenvolvimento</p>
      <h1>Interface editorial</h1>
      <p>Instrument Sans para conteúdo e navegação. Superfícies estáveis para leitura, vidro localizado e foco visível.</p>
      <div className="design-system-preview__tokens">
        {['--color-bg', '--color-surface', '--color-surface-raised', '--color-paper', '--color-accent'].map(token => (
          <div key={token}><span style={{ background: `var(${token})` }} /><code>{token}</code></div>
        ))}
      </div>
      <div className="hero__actions-group">
        <a className="hero__btn-primary" href="/#projetos-selecionados">Ver projetos</a>
        <a className="hero__btn-secondary" href="/#contato">Contato</a>
      </div>
      <h2>Mídia e fallback</h2>
      <FilmSlide clip={sceneClips.clips[0]} index={0} />
      <p>A navbar e o rodapé desta página são os componentes reais. Navegue com Tab para conferir foco e idioma.</p>
    </section>
  )
}
