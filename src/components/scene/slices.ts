/**
 * Altura de cada fatia da fita.
 *
 * A fita é uma tela de rolagem por seção — até que uma seção precise de mais espaço.
 * A sessão de Experiência (02–05 caem fora) tem 5 capítulos com descrição e stack, e
 * Pedro pediu "o tamanho da sessão de experiência tem que ser mais alto": ela ganha
 * `TALL_SLICES` telas de rolagem em vez de uma.
 *
 * Isto existe em um lugar só de propósito. Antes essa conta estava repetida em quatro
 * pontos (`index * innerHeight` no FilmSlide, no useFrameScroll e no CSS), e mexer em
 * um deles desalinhava o frame, a visibilidade do painel e a altura da página — a
 * imagem "não encaixava" na troca de seção.
 */

/** Quantas telas de rolagem cada fatia ocupa, por id de clipe. */
export const TALL_SLICES: Record<string, number> = {
  'experience-loop': 3.3,
}

export function sliceWeight(clipId: string | undefined): number {
  if (!clipId) return 1
  return TALL_SLICES[clipId] ?? 1
}

/** Soma das telas de rolagem da fita inteira (vai para `--film-count`). */
export function totalSliceWeight(clipIds: string[]): number {
  return clipIds.reduce((sum, id) => sum + sliceWeight(id), 0)
}

/**
 * Deslocamento de scroll onde a fatia `index` começa, em px.
 * `viewportHeight` é passado por parâmetro para a função ficar pura e testável.
 */
export function sliceStart(clipIds: string[], index: number, viewportHeight: number): number {
  let offset = 0
  for (let i = 0; i < index; i += 1) offset += sliceWeight(clipIds[i]) * viewportHeight
  return offset
}

/** Altura da fatia `index`, em px. */
export function sliceHeight(clipIds: string[], index: number, viewportHeight: number): number {
  return sliceWeight(clipIds[index]) * viewportHeight
}
