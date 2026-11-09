import type { MediaNote } from '@/types/content'

// Public destinations reviewed for this page. Unreviewed global entries stay
// outside the selection until their public source and destination are confirmed.
const publicRepositoryUrls = new Set(['https://github.com/PedroReoli/Achilles-CDP-Agent'])
const publicProfileUrl = 'https://github.com/PedroReoli'

export function selectPublicReferences(notes: MediaNote[]) {
  const seen = new Set<string>()
  const references = notes.filter((note) => {
    if (!publicRepositoryUrls.has(note.href) || seen.has(note.href)) return false
    seen.add(note.href)
    return true
  })
  return { references, profile: notes.find((note) => note.href === publicProfileUrl) }
}

// Local copy while shared content files remain globally owned. No article bodies,
// private notes, inferred dates or performance claims.
export const notesCopy = {
  pt: {
    intro: 'Reportagens e referências públicas para conhecer meu trabalho, das ideias ao código.',
    indexLabel: 'Nesta página',
    referencesNav: 'Código e referências',
    pressKind: 'Reportagem',
    pressSource: 'UniFOA',
    pressSummary: 'Uma reportagem do UniFOA sobre o FalaAtípica, plataforma desenvolvida por Pedro Lucas.',
    referenceSingular: 'referência',
    repositoryKind: 'Código e documentação',
    profileAction: 'Explorar repositórios públicos',
    empty: 'Ainda não há referências públicas disponíveis nesta seleção.',
    imageUnavailable: 'A imagem não carregou. A reportagem continua disponível no link.',
  },
  en: {
    intro: 'Press coverage and public references to explore my work, from ideas to code.',
    indexLabel: 'On this page',
    referencesNav: 'Code and references',
    pressKind: 'Press feature',
    pressSource: 'UniFOA',
    pressSummary: 'A UniFOA feature about FalaAtípica, a platform developed by Pedro Lucas.',
    referenceSingular: 'reference',
    repositoryKind: 'Code and documentation',
    profileAction: 'Explore public repositories',
    empty: 'There are no public references available in this selection yet.',
    imageUnavailable: 'The image could not load. You can still open the press feature.',
  },
} as const
