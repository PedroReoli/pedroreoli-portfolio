import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const require = createRequire(import.meta.url)
const ff = require('ffmpeg-static')
const probe = require('ffprobe-static').path

// Raiz do repo — funciona em qualquer máquina que clone o projeto.
const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '../..')

const SRC = path.join(ROOT, 'flow/v3/out')
const BACK = path.join(ROOT, 'public/media/backdrop')
const BUST = path.join(ROOT, 'public/media/busto')

const W = 1920, H = 1080

// poster = PRIMEIRO frame de cada clipe (o que se vê ao chegar na seção)
const clips = [
  { id: '01-hero-to-about',         poster: '01-hero-poster.png' },
  { id: '02-about-to-projects',     poster: '02-about-poster.png' },
  { id: '03-projects-to-stack',     poster: '03-projects-poster.png' },
  { id: '04-stack-to-purpose',      poster: '04-stack-poster.png' },
  { id: '05-purpose-to-experience', poster: '05-purpose-poster.png' },
  { id: '06-experience-loop',       poster: '06-experience-poster.png' },
]

fs.mkdirSync(BACK, { recursive: true })
fs.mkdirSync(BUST, { recursive: true })

const rows = []
for (const c of clips) {
  const src = path.join(SRC, `${c.id}.mp4`)
  const dst = path.join(BACK, `${c.id}.mp4`)
  // copia o mp4 (já está 1920x1080 h264 24fps, GOP 12, faststart)
  fs.copyFileSync(src, dst)

  const png = path.join(BACK, c.poster)
  fs.rmSync(png, { force: true })
  execFileSync(ff, ['-y', '-v', 'error', '-ss', '0', '-i', dst, '-frames:v', '1', png])

  const o = JSON.parse(execFileSync(probe, ['-v', 'error', '-print_format', 'json', '-show_format', '-show_streams', dst]).toString())
  const v = o.streams.find((s) => s.codec_type === 'video')
  rows.push({
    clip: c.id,
    dur: +(+o.format.duration).toFixed(2),
    size: `${(fs.statSync(dst).size / 1048576).toFixed(2)}MB`,
    poster: c.poster,
    posterKB: `${Math.round(fs.statSync(png).size / 1024)}KB`,
    fmt: `${v.width}x${v.height}@${v.r_frame_rate}`,
  })
}

// referências canônicas ficam no repo também, para regenerar isolado
for (const [src, dst] of [
  [path.join(ROOT, 'flow/v3/ref-statue-1920.jpg'), path.join(BUST, 'ref-statue-1920.jpg')],
  [path.join(ROOT, 'flow/v3/ref-real-1920.jpg'), path.join(BUST, 'ref-real-1920.jpg')],
]) fs.copyFileSync(src, dst)

console.table(rows)
