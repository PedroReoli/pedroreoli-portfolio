import sharp from 'sharp'

// Padroniza o círculo da pose do Bolt em 753px, centro 959,406
// (mesmos valores das poses A/B/C que o Pedro aprovou).
const SRC = 'flow/v5/poses/pose-BOLT-1920.jpg'
const OUT = 'flow/v5/poses/pose-BOLT-matched.jpg'
const W = 1920, H = 1080
const TARGET = { cx: 959, cy: 406, d: 753 }
const SRC_C = { cx: 959, cy: 417, d: 764 }

const scale = TARGET.d / SRC_C.d
const nw = Math.round(W * scale), nh = Math.round(H * scale)
const scaled = await sharp(SRC).resize(nw, nh, { fit: 'fill' }).toBuffer()
const left = Math.round(TARGET.cx - SRC_C.cx * scale)
const top = Math.round(TARGET.cy - SRC_C.cy * scale)

await sharp(scaled)
  .extract({
    left: Math.max(0, Math.min(nw - W, -left)),
    top: Math.max(0, Math.min(nh - H, -top)),
    width: W, height: H,
  })
  .jpeg({ quality: 96 })
  .toFile(OUT)

const { data, info } = await sharp(OUT).raw().toBuffer({ resolveWithObject: true })
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
console.log('BOLT matched: d=', Math.round(((maxX - minX) + (maxY - minY)) / 2),
  'centro', Math.round((minX + maxX) / 2) + ',' + Math.round((minY + maxY) / 2))
