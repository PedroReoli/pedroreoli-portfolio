import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// MediaForge v3 — cadeia determinística.
//
// Por que não Flow/Veo: o seletor de frames do Flow não registra frames e o Veo
// ignora "enquadramento travado" (medido: círculo 646->903px). Compondo aqui,
// enquadramento e rosto são garantidos POR CONSTRUÇÃO.
//
// Movimento: cada clipe tem parallax/zoom INTERNO aplicado à ARTE (o busto), com o
// CÍRCULO AMARELO e o FUNDO fixos. Assim há movimento real sem violar "sem zoom"
// no enquadramento — a moldura não muda, só o busto respira.

const require = createRequire(import.meta.url)
const ff = require('ffmpeg-static')
const probe = require('ffprobe-static').path

// Caminhos relativos à RAIZ DO REPO. Rode sempre de dentro do repositório:
//   node flow/v3/render-all.mjs
const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '../..')
const p = (...xs) => path.join(ROOT, ...xs)
const W = 1920, H = 1080
const STATUE = p('flow/v3/ref-statue-1920.jpg')
const REAL = p('flow/v3/ref-real-1920.jpg')
const OUT = p('flow/v3/out')

const clamp01 = (t) => Math.max(0, Math.min(1, t))
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x) }

const cache = new Map()
async function refRaw(file) {
  if (!cache.has(file)) {
    const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true })
    if (data.length !== W * H * 3) throw new Error(`${file}: esperado ${W * H * 3}, veio ${data.length}`)
    cache.set(file, { data, channels: info.channels })
  }
  return cache.get(file)
}

/** fundo canônico: preto + círculo amarelo, extraído da própria referência (áreas que não mudam) */
let BG = null
async function background() {
  if (BG) return BG
  const { data } = await refRaw(STATUE)
  // mantém só o que é preto ou amarelo puro; o resto vira preto (a arte cobre depois)
  const out = Buffer.alloc(data.length)
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const isYellow = r > 195 && g > 140 && g < 225 && b < 90
    if (isYellow) { out[i] = r; out[i + 1] = g; out[i + 2] = b }
    else { out[i] = 5; out[i + 1] = 6; out[i + 2] = 9 }
  }
  BG = out
  return BG
}

/**
 * Desenha um quadro:
 *  - bg fixo (círculo idêntico sempre)
 *  - arte = blend(base, overlay, mix) com zoom/offset interno aplicado
 * Arte é recortada numa elipse que cobre cabeça+ombros, então o círculo não é comido.
 */
async function frame({ base, overlay, mix, zoom = 1, dx = 0, dy = 0 }) {
  const bg = await background()
  const b = (await refRaw(base)).data
  const o = mix > 0 ? (await refRaw(overlay)).data : b
  const k = clamp01(mix)

  // arte composta
  const art = Buffer.alloc(W * H * 3)
  for (let i = 0; i < art.length; i += 3) {
    art[i] = Math.round(b[i] * (1 - k) + o[i] * k)
    art[i + 1] = Math.round(b[i + 1] * (1 - k) + o[i + 1] * k)
    art[i + 2] = Math.round(b[i + 2] * (1 - k) + o[i + 2] * k)
  }


  const artImg = sharp(art, { raw: { width: W, height: H, channels: 3 } })
  let artBuf
  if (zoom > 1.0005) {
    const zw = Math.round(W * zoom), zh = Math.round(H * zoom)
    const big = await sharp(art, { raw: { width: W, height: H, channels: 3 } })
      .resize(zw, zh, { fit: 'fill' })
      .png()
      .toBuffer()
    const src = await sharp(big).metadata()
    const maxL = Math.max(0, src.width - W)
    const maxT = Math.max(0, src.height - H)
    const left = Math.min(maxL, Math.max(0, Math.round(maxL / 2 + dx)))
    const top = Math.min(maxT, Math.max(0, Math.round(maxT / 2 + dy)))
    artBuf = await sharp(big).extract({ left, top, width: W, height: H }).raw().toBuffer()
  } else if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
    const left = Math.min(W - 2, Math.max(0, Math.round(dx)))
    const top = Math.min(H - 2, Math.max(0, Math.round(dy)))
    artBuf = await sharp(art, { raw: { width: W, height: H, channels: 3 } })
      .extract({ left, top, width: W - left, height: H - top })
      .extend({ top, left, bottom: 0, right: 0, background: { r: 5, g: 6, b: 9 } })
      .raw()
      .toBuffer()
  } else {
    artBuf = art
  }

  // Sem máscara: as duas referências já têm o MESMO fundo (preto + círculo amarelo)
  // e o mesmo alinhamento, então o blend cobre o quadro inteiro sem costura. Antes eu
  // recortava uma elipse e ela aparecia como anel escuro por cima do círculo.
  return artBuf
}

export async function renderClip({ id, seconds = 7, fps = 24, fn, from, to, dir = OUT }) {
  fs.mkdirSync(dir, { recursive: true })
  const total = Math.round(seconds * fps)
  const framesDir = `${dir}/${id}`
  fs.rmSync(framesDir, { recursive: true, force: true })
  fs.mkdirSync(framesDir, { recursive: true })

  const out0 = Buffer.alloc(W * H * 3)
  const tmp = sharp(out0, { raw: { width: W, height: H, channels: 3 } })
  await tmp.png().toBuffer() // aquece libvips

  for (let i = 0; i < total; i++) {
    const t = i / (total - 1)
    const buf = await frame(fn(t))
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

export { STATUE, REAL, smooth, clamp01, W, H }
