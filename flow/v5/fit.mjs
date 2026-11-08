import sharp from 'sharp'

// Ajuste fino: casa o círculo da nova imagem real com o da estátua (745px, centro 959,405)
const SRC = 'flow/v5/poses/real-v3-1920.jpg'
const OUT = 'flow/v5/poses/real-v3-fit.jpg'
const W = 1920, H = 1080
const T = { cx: 959, cy: 405, d: 745 }
const S = { cx: 959, cy: 410, d: 757 }

const k = T.d / S.d
const big = await sharp(SRC).resize(Math.round(W * k), Math.round(H * k), { fit: 'fill' }).png().toBuffer()
const m = await sharp(big).metadata()
const left = Math.max(0, Math.min(m.width - W, Math.round(T.cx - S.cx * k)))
const top = Math.max(0, Math.min(m.height - H, Math.round(T.cy - S.cy * k)))

await sharp(big).extract({ left, top, width: W, height: H }).jpeg({ quality: 96 }).toFile(OUT)

const { data, info } = await sharp(OUT).raw().toBuffer({ resolveWithObject: true })
let cMinX = 1e9, cMaxX = -1, cMinY = 1e9, cMaxY = -1, mnY = 1e9, mxY = -1
for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  const i = (y * info.width + x) * info.channels
  const r = data[i], g = data[i + 1], b = data[i + 2]
  const isY = r > 185 && g > 130 && g < 235 && b < 100
  if (isY) { if (x < cMinX) cMinX = x; if (x > cMaxX) cMaxX = x; if (y < cMinY) cMinY = y; if (y > cMaxY) cMaxY = y }
  else if ((r + g + b) / 3 > 85) { if (y < mnY) mnY = y; if (y > mxY) mxY = y }
}
console.log('real-v3-fit: circulo d=', Math.round(((cMaxX - cMinX) + (cMaxY - cMinY)) / 2),
  'c', Math.round((cMinX + cMaxX) / 2) + ',' + Math.round((cMinY + cMaxY) / 2),
  '| sujeito y', mnY, '-', mxY, '(h', mxY - mnY + ')')
