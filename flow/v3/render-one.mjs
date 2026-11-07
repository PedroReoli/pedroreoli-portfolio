// Regera UM clipe isolado. Uso: node flow/v3/render-one.mjs 03
import { renderClip, STATUE, REAL, smooth } from './chain.mjs'

const breathe = (t, amp = 0.012) => 1 + Math.sin(t * Math.PI * 2) * amp
const drift = (t, amp = 6) => Math.sin(t * Math.PI) * amp

const RECIPES = {
  '01': { id: '01-hero-to-about', seconds: 6.5, from: 'ref-statue (amarelo)', to: 'ref-real (preto)',
          fn: (t) => ({ base: STATUE, overlay: REAL, mix: smooth(t), zoom: breathe(t), dy: drift(t) }) },
  '02': { id: '02-about-to-projects', seconds: 6.5, from: 'ref-real (preto)', to: 'ref-statue (amarelo)',
          fn: (t) => ({ base: REAL, overlay: STATUE, mix: smooth(t), zoom: breathe(t, 0.010), dy: drift(t) }) },
  '03': { id: '03-projects-to-stack', seconds: 7, from: 'ref-statue', to: 'ref-statue (leve aproximação)',
          fn: (t) => ({ base: STATUE, overlay: STATUE, mix: 0, zoom: 1 + smooth(t) * 0.022, dx: drift(t, 10) }) },
  '04': { id: '04-stack-to-purpose', seconds: 7, from: 'ref-statue', to: 'ref-statue',
          fn: (t) => ({ base: STATUE, overlay: STATUE, mix: 0, zoom: breathe(t, 0.018), dy: drift(t, 8) }) },
  '05': { id: '05-purpose-to-experience', seconds: 7, from: 'ref-statue', to: 'ref-statue',
          fn: (t) => ({ base: STATUE, overlay: STATUE, mix: 0, zoom: breathe(t + 0.5, 0.016), dx: drift(t, 8) }) },
  '06': { id: '06-experience-loop', seconds: 7, from: 'ref-statue', to: 'ref-real',
          fn: (t) => ({ base: STATUE, overlay: REAL, mix: smooth(t), zoom: breathe(t, 0.014), dy: drift(t, 6) }) },
}

const key = process.argv[2]
const e = RECIPES[key]
if (!e) {
  console.error(`Uso: node flow/v3/render-one.mjs <${Object.keys(RECIPES).join('|')}>`)
  process.exit(1)
}
const r = await renderClip({ id: e.id, seconds: e.seconds, from: e.from, to: e.to, fn: e.fn })
console.log(`${r.id}  ${r.seconds}s  ${r.w}x${r.h}  ${r.mb}MB`)
console.log('Agora rode: node flow/v3/install.mjs')
