import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import fs from 'node:fs'

const require = createRequire(import.meta.url)
const ff = require('ffmpeg-static')
const ROOT = 'F:/Projetos/Pessoais/portfolios/pedroreoli-portfolio'
const BACK = path.join(ROOT, 'public/media/backdrop')

// Fundo oficial do site: #060a0e
const BG = { r: 6, g: 10, b: 14 }

const files = [
  '01-hero-to-about','02-about-to-projects','03-projects-to-stack',
  '04-stack-to-purpose','05-purpose-to-experience','06-experience-loop',
]

const W = 1920, H = 1080
for (const id of files) {
  const src = path.join(BACK, id + '.mp4')
  const tmp = path.join(BACK, '_tmp_' + id + '.mp4')

  // filtro: tudo que é preto/quase-preto vira #060a0e uniforme
  const vf = [
    `colorchannelmixer=rr=1:gg=1:bb=1`,
    `lutrgb=r='if(lt(val,18),${BG.r},val)':g='if(lt(val,22),${BG.g},val)':b='if(lt(val,26),${BG.b},val)'`,
  ].join(',')

  execFileSync(ff, [
    '-y','-v','error','-i',src,'-vf',vf,
    '-c:v','libx264','-crf','19','-preset','medium',
    '-pix_fmt','yuv420p','-g','12','-sc_threshold','0',
    '-movflags','+faststart','-an',tmp,
  ])
  fs.rmSync(src)
  fs.renameSync(tmp, src)
  console.log(id.padEnd(26), (fs.statSync(src).size / 1048576).toFixed(2) + 'MB')
}
