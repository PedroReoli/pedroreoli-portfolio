import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const DIR = path.join(HERE, 'poses')
const OUT = path.join(HERE, 'final')
fs.mkdirSync(OUT, { recursive: true })

const W = 1920, H = 1080
const BG = { r: 6, g: 10, b: 14 }

// Mapa: nome de saída -> arquivo de entrada
const map = {
  statue: 'statue',
  'real-shirt': 'real-shirt2',
  'pose-A': 'pose-A-1920',
  'pose-B': 'pose-B-1920',
  'pose-C': 'pose-C-1920',
  'pose-BOLT': 'pose-BOLT-1920',
}

for (const [outName, inName] of Object.entries(map)) {
  const src = path.join(DIR, inName + '.jpg')
  const { data, info } = await sharp(src).resize(W, H, { fit: 'cover' }).removeAlpha()
    .raw().toBuffer({ resolveWithObject: true })
  const ch = info.channels
  const out = Buffer.alloc(data.length)

  for (let i = 0; i < data.length; i += ch) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    const isYellow = r > 175 && g > 125 && g < 240 && b < 105
    // Só o PRE-BLACK uniforme do fundo vira BG exato (limiar baixo: não pega
    // cabelo, camisa preta nem sombra do rosto). Camisa/cabelo ficam como estão.
    if (!isYellow && lum < 18) {
      out[i] = BG.r; out[i + 1] = BG.g; out[i + 2] = BG.b
    } else {
      out[i] = r; out[i + 1] = g; out[i + 2] = b
    }
  }

  await sharp(out, { raw: { width: W, height: H, channels: ch } })
    .jpeg({ quality: 96 }).toFile(path.join(OUT, outName + '.jpg'))

  // confere cantos + círculo
  const { data: d2, info: i2 } = await sharp(path.join(OUT, outName + '.jpg')).raw().toBuffer({ resolveWithObject: true })
  const at = (x, y) => { const k = (y * i2.width + x) * i2.channels; return `${d2[k]},${d2[k+1]},${d2[k+2]}` }
  let mnX = 1e9, mxX = -1, mnY = 1e9, mxY = -1
  for (let y = 0; y < i2.height; y++) for (let x = 0; x < i2.width; x++) {
    const k = (y * i2.width + x) * i2.channels
    const r = d2[k], g = d2[k + 1], b = d2[k + 2]
    if (r > 175 && g > 125 && g < 240 && b < 105) {
      if (x < mnX) mnX = x; if (x > mxX) mxX = x; if (y < mnY) mnY = y; if (y > mxY) mxY = y
    }
  }
  console.log(outName.padEnd(12), 'fundo', at(8, 8), '| circulo d', Math.round(((mxX - mnX) + (mxY - mnY)) / 2), 'centro y', Math.round((mnY + mxY) / 2))
}
