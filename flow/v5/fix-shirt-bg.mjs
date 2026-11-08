import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(HERE, 'unified', 'real-shirt.jpg')
const OUT = path.join(HERE, 'unified', 'real-shirt-final.jpg')

const W = 1920, H = 1080
// círculo canônico = o da estátua
const T = { cx: 959, cy: 406, d: 746 }

// 1) apaga o círculo amarelo da imagem (vira preto) — a camisa preta se funde
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const ch = info.channels
const noYellow = Buffer.alloc(data.length)
for (let i = 0; i < data.length; i += ch) {
  const r = data[i], g = data[i + 1], b = data[i + 2]
  const isY = r > 150 && g > 105 && g < 250 && b < 120
  noYellow[i] = isY ? 6 : r
  noYellow[i + 1] = isY ? 10 : g
  noYellow[i + 2] = isY ? 14 : b
}
const artPng = await sharp(noYellow, { raw: { width: W, height: H, channels: 3 } }).png().toBuffer()

// 2) fundo canônico com o círculo exato da estátua
const svg = `<svg width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="rgb(6,10,14)"/>
  <circle cx="${T.cx}" cy="${T.cy}" r="${T.d / 2}" fill="rgb(255,201,0)"/>
</svg>`
const bg = await sharp(Buffer.from(svg)).png().toBuffer()

// 3) arte por cima: onde a arte é "preto de fundo" ela não cobre o círculo;
//    onde é pessoa (pele/cabelo/olhos), cobre.
const { data: art, info: ai } = await sharp(artPng).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const comp = Buffer.alloc(art.length)
const bgs = await sharp(bg).removeAlpha().raw().toBuffer()
for (let i = 0; i < art.length; i += 3) {
  const r = art[i], g = art[i + 1], b = art[i + 2]
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  // preto de fundo / camisa preta muito escura: deixa o fundo canônico aparecer
  const isBg = lum < 34
  if (isBg) { comp[i] = bgs[i]; comp[i + 1] = bgs[i + 1]; comp[i + 2] = bgs[i + 2] }
  else { comp[i] = r; comp[i + 1] = g; comp[i + 2] = b }
}

await sharp(comp, { raw: { width: W, height: H, channels: 3 } }).jpeg({ quality: 96 }).toFile(OUT)

const { data: d2, info: i2 } = await sharp(OUT).raw().toBuffer({ resolveWithObject: true })
let mnX = 1e9, mxX = -1, mnY = 1e9, mxY = -1
for (let y = 0; y < i2.height; y++) for (let x = 0; x < i2.width; x++) {
  const k = (y * i2.width + x) * i2.channels
  const r = d2[k], g = d2[k + 1], b = d2[k + 2]
  if (r > 175 && g > 125 && g < 240 && b < 105) {
    if (x < mnX) mnX = x; if (x > mxX) mxX = x; if (y < mnY) mnY = y; if (y > mxY) mxY = y
  }
}
console.log('real-shirt-final: circulo d=', Math.round(((mxX - mnX) + (mxY - mnY)) / 2), 'centro y', Math.round((mnY + mxY) / 2))
