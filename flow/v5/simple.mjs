import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

// MediaForge v5 — modelo SIMPLES, como o Pedro pediu:
//
//   "seja apenas a troca entre os bustos" + "o fundo continua estatico com a foto da estatua"
//
// Então: o FUNDO (círculo amarelo + preto) é UMA imagem fixa, nunca se move.
// Só o BUSTO troca, com um dissolve curto entre duas poses.
// Todas as poses são alinhadas ao MESMO enquadramento antes de entrar.

const require = createRequire(import.meta.url)
const ff = require('ffmpeg-static')
const probe = require('ffprobe-static').path

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '../..')
const p = (...xs) => path.join(ROOT, ...xs)

const W = 1920, H = 1080
const OUT = p('flow/v5/out')
const BGCOLOR = { r: 6, g: 10, b: 14 } // #060a0e

const smooth = (t) => { const x = Math.max(0, Math.min(1, t)); return x * x * (3 - 2 * x) }

const cache = new Map()
async function raw(file) {
  if (!cache.has(file)) {
    const { data } = await sharp(file).removeAlpha().resize(W, H, { fit: 'cover', position: 'center' })
      .raw().toBuffer({ resolveWithObject: true })
    if (data.length !== W * H * 3) throw new Error(`${file}: ${data.length}`)
    cache.set(file, data)
  }
  return cache.get(file)
}

/**
 * Fundo fixo: pega o círculo amarelo da referência e zera o resto para #060a0e.
 * Esse buffer é usado em TODOS os frames de TODOS os clipes — o fundo literalmente
 * não se move.
 */
let BG = null
async function background() {
  if (BG) return BG
  const src = await raw(p('flow/v3/ref-statue-1920.jpg'))
  BG = Buffer.alloc(W * H * 3)
  for (let i = 0; i < src.length; i += 3) {
    const r = src[i], g = src[i + 1], b = src[i + 2]
    const isYellow = r > 190 && g > 135 && g < 230 && b < 95
    if (isYellow) { BG[i] = r; BG[i + 1] = g; BG[i + 2] = b }
    else { BG[i] = BGCOLOR.r; BG[i + 1] = BGCOLOR.g; BG[i + 2] = BGCOLOR.b }
  }
  return BG
}

/** busto é tudo que NÃO é o fundo (nem preto, nem amarelo do círculo) */
async function bustMask(file) {
  const src = await raw(file)
  const mask = new Uint8Array(W * H)
  for (let i = 0, j = 0; i < src.length; i += 3, j++) {
    const r = src[i], g = src[i + 1], b = src[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    const isYellow = r > 190 && g > 135 && g < 230 && b < 95
    mask[j] = (!isYellow && lum > 42) ? 1 : 0
  }
  return mask
}

/** um frame: fundo fixo + busto base, com o busto `to` dissolvido por `mix` */
async function frame(fromFile, toFile, mix) {
  const bg = await background()
  const a = await raw(fromFile)
  const b = await raw(toFile)
  const ma = await bustMask(fromFile)
  const mb = await bustMask(toFile)
  const k = Math.max(0, Math.min(1, mix))

  const out = Buffer.from(bg)
  for (let i = 0, j = 0; i < a.length; i += 3, j++) {
    const wa = ma[j] ? (1 - k) : 0
    const wb = mb[j] ? k : 0
    const w = wa + wb
    if (w <= 0) continue // fica o fundo
    out[i]     = (a[i]     * wa + b[i]     * wb) / w
    out[i + 1] = (a[i + 1] * wa + b[i + 1] * wb) / w
    out[i + 2] = (a[i + 2] * wa + b[i + 2] * wb) / w
  }
  return out
}

export async function renderSimple({ id, seconds = 7, fps = 24, fromFile, toFile, hold = 0.42, dir = OUT }) {
  fs.mkdirSync(dir, { recursive: true })
  const total = Math.round(seconds * fps)
  const framesDir = `${dir}/${id}`
  fs.rmSync(framesDir, { recursive: true, force: true })
  fs.mkdirSync(framesDir, { recursive: true })

  // dissolve acontece na janela central; antes e depois fica 100% num busto só
  const start = 0.5 - hold / 2
  const end = 0.5 + hold / 2

  for (let i = 0; i < total; i++) {
    const t = i / (total - 1)
    const mix = t <= start ? 0 : t >= end ? 1 : smooth((t - start) / (end - start))
    const buf = await frame(fromFile, toFile, mix)
    const png = await sharp(buf, { raw: { width: W, height: H, channels: 3 } })
      .png({ compressionLevel: 3 }).toBuffer()
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
  return {
    id, file: mp4, seconds: +(+o.format.duration).toFixed(2), frames: total,
    w: v.width, h: v.height, fps: v.r_frame_rate,
    mb: +(fs.statSync(mp4).size / 1048576).toFixed(2),
  }
}

export { W, H, ROOT, p }
