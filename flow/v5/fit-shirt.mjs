import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(HERE, 'unified', 'real-shirt.jpg')
const OUT = path.join(HERE, 'unified', 'real-shirt-fit.jpg')
const W = 1920, H = 1080

// Alvo: círculo da estátua (746) centrado em 959,405
const T = { cx: 959, cy: 405, d: 746 }
// Medido na real-shirt atual
const S = { cx: 959, cy: 418, d: 807 }

const k = T.d / S.d
const nw = Math.round(W * k), nh = Math.round(H * k)
const big = await sharp(SRC).resize(nw, nh, { fit: 'fill' }).png().toBuffer()

const left = Math.max(0, Math.min(nw - W, Math.round(T.cx - S.cx * k)))
const top = Math.max(0, Math.min(nh - H, Math.round(T.cy - S.cy * k)))
await sharp(big).extract({ left, top, width: W, height: H }).jpeg({ quality: 96 }).toFile(OUT)

const { data, info } = await sharp(OUT).raw().toBuffer({ resolveWithObject: true })
let cMinX = 1e9, cMaxX = -1, cMinY = 1e9, cMaxY = -1
for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  const i = (y * info.width + x) * info.channels
  const r = data[i], g = data[i + 1], b = data[i + 2]
  if (r > 175 && g > 125 && g < 240 && b < 105) {
    if (x < cMinX) cMinX = x; if (x > cMaxX) cMaxX = x
    if (y < cMinY) cMinY = y; if (y > cMaxY) cMaxY = y
  }
}
console.log('real-shirt-fit: circulo d=', Math.round(((cMaxX - cMinX) + (cMaxY - cMinY)) / 2),
  'centro', Math.round((cMinX + cMaxX) / 2) + ',' + Math.round((cMinY + cMaxY) / 2))
