import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

// MediaForge v4 — clipes com movimento REAL do busto entre poses.
//
// O problema da v3: os clipes 03/04/05 só tinham "respiro" de ~1.8%, o que na
// prática é imagem parada. Pedro pediu busto se mexendo de verdade em cada sessão.
//
// Solução: gerar poses diferentes do MESMO busto no Gemini (mesmo rosto, mesmo
// círculo, mesma escala) e interpolar entre elas com smoothstep. O movimento é real
// (a pose muda), o enquadramento continua travado (círculo e fundo são os mesmos
// pixels em todos os frames).

const require = createRequire(import.meta.url)
const ff = require('ffmpeg-static')
const probe = require('ffprobe-static').path

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '../..')
const p = (...xs) => path.join(ROOT, ...xs)

const W = 1920, H = 1080
const OUT = p('flow/v4/out')
const IDLE = p('flow/v3/ref-statue-1920.jpg')

const clamp01 = (t) => Math.max(0, Math.min(1, t))
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x) }
// ease in-out mais lento nas pontas: o busto "acorda" e "repousa"
const ease = (t) => { const x = clamp01(t); return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2 }

const cache = new Map()
async function raw(file) {
  if (!cache.has(file)) {
    const { data } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true })
    if (data.length !== W * H * 3) throw new Error(`${file}: esperado ${W * H * 3}, veio ${data.length}`)
    cache.set(file, data)
  }
  return cache.get(file)
}

/** blend de N imagens com pesos; os pesos são normalizados */
async function blend(list) {
  const sum = list.reduce((a, b) => a + b.w, 0)
  const imgs = await Promise.all(list.map((x) => raw(x.f)))
  const out = Buffer.alloc(W * H * 3)
  for (let i = 0; i < out.length; i++) {
    let v = 0
    for (let k = 0; k < imgs.length; k++) v += imgs[k][i] * (list[k].w / sum)
    out[i] = v
  }
  return out
}

/**
 * Cadeia de poses: [{f: arquivo, t: instante 0..1}, ...]
 * Em cada instante t, mistura as duas poses vizinhas com ease().
 */
function chainAt(poses, t) {
  const x = ease(t)
  for (let i = 0; i < poses.length - 1; i++) {
    const a = poses[i], b = poses[i + 1]
    if (x <= b.t || i === poses.length - 2) {
      const span = b.t - a.t
      const local = span <= 0 ? 1 : smooth((x - a.t) / span)
      return [{ f: a.f, w: 1 - local }, { f: b.f, w: local }]
    }
  }
  return [{ f: poses[poses.length - 1].f, w: 1 }]
}

export async function renderPoseClip({ id, seconds = 7, fps = 24, poses, from, to, dir = OUT }) {
  fs.mkdirSync(dir, { recursive: true })
  const total = Math.round(seconds * fps)
  const framesDir = `${dir}/${id}`
  fs.rmSync(framesDir, { recursive: true, force: true })
  fs.mkdirSync(framesDir, { recursive: true })

  for (let i = 0; i < total; i++) {
    const t = i / (total - 1)
    const buf = await blend(chainAt(poses, t))
    const png = await sharp(buf, { raw: { width: W, height: H, channels: 3 } }).png({ compressionLevel: 3 }).toBuffer()
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
    mb: +(fs.statSync(mp4).size / 1048576).toFixed(2), from, to,
  }
}

export { IDLE, W, H, ROOT, p }
