import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(HERE, 'unified', 'real-shirt.jpg')
const OUT = path.join(HERE, 'unified', 'real-shirt-fit.jpg')
const W = 1920, H = 1080

// A cabeça da camisa preta está maior. Reduzo para casar com a estátua.
// fator medido comparando a largura do rosto nas duas.
const K = 0.80

const nw = Math.round(W * K), nh = Math.round(H * K)
const resized = await sharp(SRC).resize(nw, nh, { fit: 'fill' }).png().toBuffer()

const left = Math.round((W - nw) / 2)
const top = Math.round((H - nh) / 2)

// fundo canônico + imagem reduzida centralizada, preenchendo com #060a0e
await sharp({ create: { width: W, height: H, channels: 3, background: { r: 6, g: 10, b: 14 } } })
  .composite([{ input: resized, left: Math.max(0, left), top: Math.max(0, top) }])
  .jpeg({ quality: 96 })
  .toFile(OUT)

const px = async (f) => {
  const { data, info } = await sharp(f).raw().toBuffer({ resolveWithObject: true })
  const at = (x, y) => { const k2 = (y * info.width + x) * info.channels; return `${data[k2]},${data[k2+1]},${data[k2+2]}` }
  return `cantos ${at(8,8)} | ${at(8, info.height-8)} | ${at(info.width-8, 8)}`
}
console.log('real-shirt-fit:', await px(OUT))
