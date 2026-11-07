import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const require = createRequire(import.meta.url)
const ff = require('ffmpeg-static')
const probe = require('ffprobe-static').path
const sharp = require('sharp')

const HERE = path.dirname(fileURLToPath(import.meta.url))
const TMP = path.join(HERE, 'tmp')
fs.mkdirSync(TMP, { recursive: true })

export const prov = (f) =>
  JSON.parse(execFileSync(probe, ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', f]).toString())

export const dur = (f) => {
  const o = prov(f)
  return +o.format.duration
}

export const grab = (src, t, out) => {
  execFileSync(ff, ['-y', '-v', 'error', '-ss', String(t), '-i', src, '-frames:v', '1', out], { stdio: 'pipe' })
  return out
}

/** diâmetro e centro do círculo amarelo (#FFC900) */
export async function circle(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true })
  let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1, n = 0
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels
      const r = data[i], g = data[i + 1], b = data[i + 2]
      if (r > 195 && g > 140 && g < 225 && b < 90) {
        n++
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  if (n < 1000) return { d: 0, n, cx: -1, cy: -1 }
  return { d: ((maxX - minX) + (maxY - minY)) / 2, n, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 }
}

/** diferença média (0..255) na região da cabeça vs referência */
export async function faceDiff(file, refFile) {
  const W = 240, H = 240
  const a = await sharp(file).extract({ left: 660, top: 60, width: 600, height: 600 }).resize(W, H).greyscale().raw().toBuffer()
  const b = await sharp(refFile).extract({ left: 660, top: 60, width: 600, height: 600 }).resize(W, H).greyscale().raw().toBuffer()
  let s = 0
  for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i])
  return s / a.length
}

/** fração de pixels "cinza/mármore" (saturacao absoluta baixa) na regiao da CABECA */
export async function neutralRatio(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true })
  let neutral = 0, total = 0
  // janela que cobre so o rosto/marmore, longe da borda do circulo amarelo
  for (let y = 260; y < 780; y += 2) {
    for (let x = 800; x < 1130; x += 2) {
      const i = (y * info.width + x) * info.channels
      const r = data[i], g = data[i + 1], b = data[i + 2]
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b)
      if (mx < 45) continue // fundo preto
      // descarta amarelo do circulo
      if (r > 195 && g > 140 && g < 225 && b < 90) continue
      total++
      const sat = (mx - mn) / mx
      if (sat < 0.30) neutral++
    }
  }
  return total ? neutral / total : 0
}

/**
 * Valida UM clipe. Retorna { ok, fails:[], metrics }.
 * mode: 'statue' | 'real'
 */
export async function validate(file, canonRef, { mode = 'statue', circleTol = 0.06 } = {}) {
  const fails = []
  const m = {}

  if (!fs.existsSync(file)) return { ok: false, fails: ['arquivo nao existe'], metrics: m }

  const o = prov(file)
  const v = o.streams.find((s) => s.codec_type === 'video')
  m.w = v.width; m.h = v.height; m.fps = v.r_frame_rate; m.dur = +o.format.duration
  m.mb = +(fs.statSync(file).size / 1048576).toFixed(2)

  if (v.width !== 1920 || v.height !== 1080) fails.push(`formato ${v.width}x${v.height} (esperado 1920x1080)`)
  if (m.dur < 2 || m.dur > 8.2) fails.push(`duracao ${m.dur.toFixed(2)}s fora de 2.0-8.2s`)

  const d = m.dur
  const ts = [0.1, d * 0.28, d * 0.5, d * 0.72, d - 0.15].filter((t) => t > 0 && t < d)
  const ds = []
  for (let k = 0; k < ts.length; k++) {
    const f = path.join(TMP, `v${k}.jpg`); fs.rmSync(f, { force: true }); grab(file, ts[k], f)
    const c = await circle(f)
    if (c.n < 30000) { fails.push(`sem circulo amarelo em t=${ts[k].toFixed(2)}s`); continue }
    ds.push(c.d)
  }
  if (ds.length) {
    const mn = Math.min(...ds), mx = Math.max(...ds)
    m.circleMin = Math.round(mn)
    m.circleMax = Math.round(mx)
    const varPct = (mx - mn) / mn
    m.circleVar = +(varPct * 100).toFixed(1)
    if (varPct > circleTol) fails.push(`enquadramento variou ${(varPct * 100).toFixed(1)}% (max ${(circleTol * 100).toFixed(0)}%) => zoom/pan`)
  }

  const first = path.join(TMP, 'first.jpg'); fs.rmSync(first, { force: true }); grab(file, Math.min(0.1, d / 4), first)
  const fd = await faceDiff(first, canonRef)
  m.faceDiff = +fd.toFixed(1)
  if (fd > 26) fails.push(`rosto divergiu (diff ${fd.toFixed(1)} > 26)`)

  const neutral = await neutralRatio(first)
  m.neutral = +neutral.toFixed(2)
  // Calibrado com amostras reais: marmore ~0.57, pele real ~0.32. Corte em 0.45.
  if (mode === 'statue' && neutral < 0.45) fails.push(`modo estatua esperado, mas neutral=${neutral.toFixed(2)} (<0.45)`)
  if (mode === 'real' && neutral >= 0.45) fails.push(`modo real esperado, mas neutral=${neutral.toFixed(2)} (>=0.45)`)

  return { ok: fails.length === 0, fails, metrics: m }
}
