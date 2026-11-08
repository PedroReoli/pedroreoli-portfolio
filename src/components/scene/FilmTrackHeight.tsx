import { useEffect } from 'react'
import { sceneClips } from '@/data/content'
import { totalSliceWeight } from './slices'

/**
 * Escreve `--film-count` a partir das fatias reais.
 *
 * O CSS usa `calc(100svh * var(--film-count))` para a altura da fita e da camada de
 * texto. Antes o valor era o fallback fixo do CSS (7) enquanto os helpers de JS já
 * calculavam alturas diferentes por fatia — ou seja, a altura da página e o mapa de
 * scroll podiam discordar, e era isso que fazia a imagem "não encaixar" na troca.
 * Agora existe uma fonte só: `slices.ts`.
 */
export function FilmTrackHeight() {
  useEffect(() => {
    const ids = sceneClips.clips.map((clip) => clip.id)
    const apply = () => {
      document.documentElement.style.setProperty('--film-count', String(totalSliceWeight(ids)))
    }

    apply()
    window.addEventListener('resize', apply)

    return () => window.removeEventListener('resize', apply)
  }, [])

  return null
}
