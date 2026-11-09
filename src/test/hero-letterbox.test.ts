import { describe, expect, it } from 'vitest'
import sharp from 'sharp'
import { resolve } from 'node:path'
import { sceneClips } from '../data/content'
import { css } from './home-fixture'

describe('superfície visual com geometria deliberada', () => {
  it.each(sceneClips.clips)('poster $id tem a proporção do palco, sem distorção/crop', async clip => {
    const metadata = await sharp(resolve(__dirname, '../../public', clip.poster.slice(1))).metadata()
    expect(metadata.width! / metadata.height!).toBeCloseTo(16 / 9, 3)
    for (const width of [320, 390, 768, 1886, 1920]) {
      const stageHeight = width * 9 / 16
      const scaleX = width / metadata.width!
      const scaleY = stageHeight / metadata.height!
      expect(scaleX).toBeCloseTo(scaleY, 6)
    }
  })
  it('o palco reserva tamanho antes da carga e possui fundo independente', () => {
    expect(css('film')).toMatch(/aspect-ratio:\s*16\s*\/\s*9/)
    expect(css('film')).toMatch(/background:\s*#060a0e/)
    expect(css('film')).not.toMatch(/#2596be|var\(--color-bg/)
  })
})
