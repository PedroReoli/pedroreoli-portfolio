import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const p = (...xs) => path.join(HERE, ...xs)

const W = 1920, H = 1080
// alvo = círculo da estátua (aprovada pelo Pedro)
const TARGET = { cx: 959, cy: 405, d: 745 }

async function circleOf(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true })
  let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels
      const r = data[i], g = data[i + 1], b = data[i + 2]
      if (r > 185 && g > 130 && g < 235 && b < 100) {
        if (x < minX) minX = x; if (x > maxX) maxX = x
        if (y < minY) minY = y; if (y > maxY) maxY = y
      }
    }
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, d: ((maxX - minX) + (maxY - minY)) / 2, minX, maxX, minY, maxY }
}

// 1) apaga o círculo da ref-real (vira preto do site)
const src = p('poses', 'real-aligned.jpg')
const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const ch = info.channels
const noCircle = Buffer.alloc(data.length)
for (let i = 0; i < data.length; i += ch) {
  const r = data[i], g = data[i + 1], b = data[i + 2]
  const isY = r > 185 && g > 130 && g < 235 && b < 100
  noCircle[i] = isY ? 6 : r
  noCircle[i + 1] = isY ? 10 : g
  noCircle[i + 2] = isY ? 14 : b
}
const noCirclePng = await sharp(noCircle, { raw: { width: W, height: H, channels: 3 } }).png().toBuffer()

// 2) desenha o círculo canônico por baixo
const svg = `<svg width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="rgb(6,10,14)"/>
  <circle cx="${TARGET.cx}" cy="${TARGET.cy}" r="${TARGET.d / 2}" fill="rgb(255,201,0)"/>
</svg>`
const bg = await sharp(Buffer.from(svg)).png().toBuffer()

// 3) o busto da ref-real entra por cima, mas só onde não é fundo
//    (usamos o busto como está: o que era círculo agora é a cor do site, então
//     o círculo canônico aparece exatamente onde deve)
await sharp(bg)
  .composite([{ input: noCirclePng, blend: 'over' }])
  .jpeg({ quality: 96 })
  .toFile(p('poses', 'real-fixed.jpg'))

const c = await circleOf(p('poses', 'real-fixed.jpg'))
console.log('real-fixed: circulo d=', Math.round(c.d), 'centro', c.cx.toFixed(0) + ',' + c.cy.toFixed(0), '(alvo', TARGET.d + ',' + TARGET.cx + ',' + TARGET.cy + ')')
