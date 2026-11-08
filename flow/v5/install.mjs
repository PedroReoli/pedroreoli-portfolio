import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import fs from 'node:fs'

const require = createRequire(import.meta.url)
const ff = require('ffmpeg-static')
const probe = require('ffprobe-static').path

const SRC = 'flow/v5/out'
const BACK = 'public/media/backdrop'
const BUST = 'public/media/busto'

const map = [
  ['01-hero-to-about',         '01-hero-poster.png'],
  ['02-about-to-projects',     '02-about-poster.png'],
  ['03-projects-to-stack',     '03-projects-poster.png'],
  ['04-stack-to-purpose',      '04-stack-poster.png'],
  ['05-purpose-to-experience', '05-purpose-poster.png'],
  ['06-experience-loop',       '06-experience-poster.png'],
]

for (const [id, poster] of map) {
  const src = path.join(SRC, id + '.mp4')
  const dst = path.join(BACK, id + '.mp4')
  fs.copyFileSync(src, dst)
  const png = path.join(BACK, poster)
  fs.rmSync(png, { force: true })
  execFileSync(ff, ['-y', '-v', 'error', '-ss', '0', '-i', dst, '-frames:v', '1', png])
  const d = +JSON.parse(execFileSync(probe, ['-v','error','-print_format','json','-show_streams',dst]).toString()).streams.find(s=>s.codec_type==='video').duration
  console.log(id.padEnd(26), d.toFixed(2) + 's', (fs.statSync(dst).size / 1048576).toFixed(2) + 'MB', '-> poster', poster)
}

// poses aprovadas vão para o repo também
for (const n of ['pose-C-1920.jpg', 'pose-BOLT-1920.jpg']) {
  fs.copyFileSync(path.join('flow/v5/poses', n), path.join(BUST, n))
}
console.log('poses copiadas para public/media/busto/')
