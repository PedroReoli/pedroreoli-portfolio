import sharp from 'sharp'

const W = 1920, H = 1080
const BG = { r: 6, g: 10, b: 14 }

// Mede o círculo amarelo de cada referência para o fundo ser idêntico nelas
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
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, d: Math.round(((maxX - minX) + (maxY - minY)) / 2) }
}

for (const f of ['statue', 'real-aligned', 'pose-A-1920', 'pose-B-1920', 'pose-C-1920']) {
  const c = await circleOf(`flow/v5/poses/${f}.jpg`)
  console.log(f.padEnd(16), 'circulo centro', c.cx.toFixed(0) + ',' + c.cy.toFixed(0), 'diametro', c.d)
}
