import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'

// O fundo tem que ser IDÊNTICO em todas as imagens, senão na troca ele "pula".
// Medido: estátua com círculo de 745px, real 779px, poses 753px.
// Aqui eu reconstruo um fundo canônico e coloco cada busto em cima dele,
// escalando o busto para casar com o círculo alvo.

const W = 1920, H = 1080
const BG = { r: 6, g: 10, b: 14 }
const YELLOW = { r: 255, g: 201, b: 0 }

// alvo: o círculo da estátua (referência aprovada pelo Pedro)
const TARGET = { cx: 959, cy: 405, d: 745 }

const DIR = 'flow/v5/poses'
const OUT = 'flow/v5/aligned'
fs.mkdirSync(OUT, { recursive: true })

async function circleOf(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true })
  let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels
      const r = data[i], g = data[i + 1], b = data[i + 2]
      if (r > 190 && g > 135 && g < 230 && b < 95) {
        if (x < minX) minX = x; if (x > maxX) maxX = x
        if (y < minY) minY = y; if (y > maxY) maxY = y
      }
    }
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, d: ((maxX - minX) + (maxY - minY)) / 2 }
}

// fundo canônico: preto do site + círculo amarelo no alvo
const svg = `<svg width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="rgb(${BG.r},${BG.g},${BG.b})"/>
  <circle cx="${TARGET.cx}" cy="${TARGET.cy}" r="${TARGET.d / 2}" fill="rgb(${YELLOW.r},${YELLOW.g},${YELLOW.b})"/>
</svg>`
const bgBuf = await sharp(Buffer.from(svg)).png().toBuffer()

const files = ['statue', 'real-aligned', 'pose-A-1920', 'pose-B-1920', 'pose-C-1920']

for (const name of files) {
  const src = path.join(DIR, name + '.jpg')
  const c = await circleOf(src)

  // 1) recorta o busto: tudo que NÃO é amarelo nem o preto do fundo de origem
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const rgba = Buffer.alloc(W * H * 4)
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    const isYellow = r > 185 && g > 130 && g < 235 && b < 100
    const isDarkBg = lum < 34
    const keep = !isYellow && !isDarkBg
    rgba[j] = r; rgba[j + 1] = g; rgba[j + 2] = b; rgba[j + 3] = keep ? 255 : 0
  }
  const cut = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer()

  // 2) escala o busto para o círculo alvo e reposiciona o centro
  const scale = TARGET.d / c.d
  const nw = Math.round(W * scale), nh = Math.round(H * scale)
  const scaled = await sharp(cut).resize(nw, nh, { fit: 'fill' }).png().toBuffer()
  const left = Math.round(TARGET.cx - c.cx * scale)
  const top = Math.round(TARGET.cy - c.cy * scale)

  await sharp(bgBuf)
    .composite([{ input: scaled, left, top }])
    .jpeg({ quality: 96 })
    .toFile(path.join(OUT, name + '.jpg'))

  const after = await circleOf(path.join(OUT, name + '.jpg'))
  console.log(name.padEnd(15), 'antes d=' + Math.round(c.d), '-> depois d=' + Math.round(after.d), 'centro', after.cx.toFixed(0) + ',' + after.cy.toFixed(0))
}
