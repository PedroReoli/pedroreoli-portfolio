import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(HERE, 'final', 'real-shirt.jpg')
const OUT = path.join(HERE, 'final', 'real-shirt-ok.jpg')
const W = 1920, H = 1080

const T = { cx: 959, cy: 406, d: 746 }
const S = { cx: 959, cy: 451, d: 805 }

const k = T.d / S.d
const nw = Math.round(W * k), nh = Math.round(H * k)
const small = await sharp(SRC).resize(nw, nh, { fit: 'fill' }).png().toBuffer()

// centro do círculo na imagem reduzida
const scx = S.cx * k, scy = S.cy * k
const left = Math.round(T.cx - scx)
const dyFix = 0
const top = Math.round(T.cy - scy) + dyFix

await sharp({ create: { width: W, height: H, channels: 3, background: { r: 6, g: 10, b: 14 } } })
  .composite([{ input: small, left: Math.max(0, left), top: Math.max(0, top) }])
  .jpeg({ quality: 96 })
  .toFile(OUT)

const { data, info } = await sharp(OUT).raw().toBuffer({ resolveWithObject: true })
const at = (x, y) => { const k2 = (y * info.width + x) * info.channels; return `${data[k2]},${data[k2+1]},${data[k2+2]}` }
let mnX = 1e9, mxX = -1, mnY = 1e9, mxY = -1
for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  const k3 = (y * info.width + x) * info.channels
  const r = data[k3], g = data[k3 + 1], b = data[k3 + 2]
  if (r > 175 && g > 125 && g < 240 && b < 105) {
    if (x < mnX) mnX = x; if (x > mxX) mxX = x; if (y < mnY) mnY = y; if (y > mxY) mxY = y
  }
}
console.log('real-shirt-ok: fundo', at(8,8), '| circulo d', Math.round(((mxX-mnX)+(mxY-mnY))/2), 'centro', Math.round((mnX+mxX)/2)+','+Math.round((mnY+mxY)/2))
