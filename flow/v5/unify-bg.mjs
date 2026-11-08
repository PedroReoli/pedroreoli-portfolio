import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const DIR = path.join(HERE, 'poses')
const OUT = path.join(HERE, 'unified')
fs.mkdirSync(OUT, { recursive: true })

const W = 1920, H = 1080
// Fundo canônico: a estátua (a que o Pedro aprovou)
const BG = { r: 6, g: 10, b: 14 }

// Tudo que é "preto de fundo" (baixo brilho E sem cor de amarelo) vira BG exato.
// O mármore, a pele e o círculo ficam intactos.
const files = ['statue', 'real-shirt', 'pose-A-1920', 'pose-B-1920', 'pose-C-1920', 'pose-BOLT-1920']

for (const name of files) {
  const src = path.join(DIR, name + '.jpg')
  if (!fs.existsSync(src)) { console.log(name, 'ausente'); continue }

  const base = await sharp(src).resize(W, H, { fit: 'cover' }).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { data, info } = base
  const ch = info.channels
  const out = Buffer.alloc(data.length)

  for (let i = 0; i < data.length; i += ch) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    const isYellow = r > 175 && g > 125 && g < 240 && b < 105
    // fundo = escuro e não-amarelo
    if (!isYellow && lum < 30) {
      out[i] = BG.r; out[i + 1] = BG.g; out[i + 2] = BG.b
    } else {
      out[i] = r; out[i + 1] = g; out[i + 2] = b
    }
  }

  await sharp(out, { raw: { width: W, height: H, channels: ch } })
    .jpeg({ quality: 96 })
    .toFile(path.join(OUT, name + '.jpg'))

  const px = async (f) => {
    const { data: d, info: i2 } = await sharp(f).raw().toBuffer({ resolveWithObject: true })
    const at = (x, y) => { const k = (y * i2.width + x) * i2.channels; return `${d[k]},${d[k+1]},${d[k+2]}` }
    return [at(8, 8), at(8, i2.height - 8), at(i2.width - 8, 8)].join(' | ')
  }
  console.log(name.padEnd(16), 'cantos:', await px(path.join(OUT, name + '.jpg')))
}
