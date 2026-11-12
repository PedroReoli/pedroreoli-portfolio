import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const images = new URL('../public/images/', import.meta.url)
const source = await readFile(new URL('hero-bg.png', images))
const { width } = await sharp(source).metadata()
const widths = [480, 640, 800, 1200, width]

function visiblePixelsMatch(sourcePixels, outputPixels) {
  if (sourcePixels.length !== outputPixels.length) return false
  for (let pixel = 0; pixel < sourcePixels.length; pixel += 4) {
    const alpha = sourcePixels[pixel + 3]
    if (alpha !== outputPixels[pixel + 3]) return false
    if (alpha === 0) continue
    if (sourcePixels[pixel] !== outputPixels[pixel] ||
        sourcePixels[pixel + 1] !== outputPixels[pixel + 1] ||
        sourcePixels[pixel + 2] !== outputPixels[pixel + 2]) return false
  }
  return true
}

for (const targetWidth of widths) {
  const resized = sharp(source).toColourspace('srgb').ensureAlpha().resize({
    width: targetWidth,
    kernel: sharp.kernel.lanczos3,
    withoutEnlargement: true,
  })
  const pixels = await resized.clone().raw().toBuffer()
  const webp = await resized.webp({ lossless: true, effort: 6 }).toBuffer()
  const decoded = await sharp(webp).ensureAlpha().raw().toBuffer()

  assert.ok(visiblePixelsMatch(pixels, decoded), `Visible pixels differ at ${targetWidth}px`)
  const filename = `hero-bg-${targetWidth}.webp`
  await writeFile(new URL(filename, images), webp)
  console.log(`${filename} ${webp.length} bytes (original PNG: ${source.length} bytes)`)
}
