import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

// Modelo SIMPLES (pedido do Pedro): o fundo é estático, só o busto troca.
//
// Sem máscara, sem recorte, sem zoom: as duas imagens já têm o MESMO fundo
// (preto #060a0e + círculo amarelo). Então um crossfade de imagem inteira
// faz o fundo ficar parado e apenas o busto mudar. É o que "troca entre os
// bustos" significa, e não introduz artefato de borda.

const require = createRequire(import.meta.url)
const ff = require('ffmpeg-static')
const probe = require('ffprobe-static').path

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '../..')
const p = (...xs) => path.join(ROOT, ...xs)

const W = 1920, H = 1080
const OUT = p('flow/v5/out')
const smooth = (t) => { const x = Math.max(0, Math.min(1, t)); return x * x * (3 - 2 * x) }

const cache = new Map()
async function raw(file) {
  if (!cache.has(file)) {
    const { data } = await sharp(file).removeAlpha().resize(W, H, { fit: 'cover', position: 'center' })
      .raw().toBuffer({ resolveWithObject: true })
    cache.set(file, data)
  }
  return cache.get(file)
}

export async function renderCross({ id, seconds = 7, fps = 24, fromFile, toFile, hold = 0.16, dir = OUT }) {
  fs.mkdirSync(dir, { recursive: true })
  const total = Math.round(seconds * fps)
  const framesDir = `${dir}/${id}`
  fs.rmSync(framesDir, { recursive: true, force: true })
  fs.mkdirSync(framesDir, { recursive: true })

  const a = await raw(fromFile)
  const b = await raw(toFile)
  const start = 0.5 - hold / 2, end = 0.5 + hold / 2

  // dissolve curto no meio; antes e depois é 100% uma das imagens
  for (let i = 0; i < total; i++) {
    const t = i / (total - 1)
    const k = t <= start ? 0 : t >= end ? 1 : smooth((t - start) / (end - start))
    const out = k === 0 ? a : k === 1 ? b : (() => {
      const o = Buffer.alloc(a.length)
      for (let j = 0; j < a.length; j++) o[j] = a[j] + (b[j] - a[j]) * k
      return o
    })()
    const png = await sharp(out, { raw: { width: W, height: H, channels: 3 } }).png({ compressionLevel: 3 }).toBuffer()
    fs.writeFileSync(`${framesDir}/f${String(i).padStart(4, '0')}.png`, png)
  }

  const mp4 = `${dir}/${id}.mp4`
  execFileSync(ff, [
    '-y', '-v', 'error', '-framerate', String(fps), '-i', `${framesDir}/f%04d.png`,
    '-c:v', 'libx264', '-crf', '19', '-preset', 'medium',
    '-pix_fmt', 'yuv420p', '-g', '12', '-sc_threshold', '0',
    '-movflags', '+faststart', '-an', mp4,
  ])
  fs.rmSync(framesDir, { recursive: true, force: true })

  const o = JSON.parse(execFileSync(probe, ['-v', 'error', '-print_format', 'json', '-show_format', '-show_streams', mp4]).toString())
  const v = o.streams.find((s) => s.codec_type === 'video')
  return { id, seconds: +(+o.format.duration).toFixed(2), w: v.width, h: v.height, mb: +(fs.statSync(mp4).size / 1048576).toFixed(2) }
}

export { p }
