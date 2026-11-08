import sharp from 'sharp'

const dir = 'flow/v5/poses'
const files = ['statue', 'real-aligned', 'pose-A-1920', 'pose-B-1920', 'pose-C-1920', 'pose-BOLT-1920']

for (const n of files) {
  const { data, info } = await sharp(`${dir}/${n}.jpg`).raw().toBuffer({ resolveWithObject: true })
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
  const d = ((maxX - minX) + (maxY - minY)) / 2
  console.log(n.padEnd(18), 'd=', Math.round(d), ' centro', Math.round((minX + maxX) / 2) + ',' + Math.round((minY + maxY) / 2))
}
