import { renderSimple, p } from './simple.mjs'

// Pedro: "seja apenas a troca entre os bustos" — fundo fixo, só o busto troca.
const S = p('flow/v5/poses/statue.jpg')
const A = p('flow/v5/poses/pose-A-1920.jpg')
const B = p('flow/v5/poses/pose-B-1920.jpg')
const C = p('flow/v5/poses/pose-C-1920.jpg')
const R = p('flow/v5/poses/real-aligned.jpg')

const clips = [
  { id: '01-hero-to-about',         seconds: 6.5, fromFile: S, toFile: R },
  { id: '02-about-to-projects',     seconds: 6.5, fromFile: R, toFile: A },
  { id: '03-projects-to-stack',     seconds: 7,   fromFile: A, toFile: B },
  { id: '04-stack-to-purpose',      seconds: 7,   fromFile: B, toFile: C },
  { id: '05-purpose-to-experience', seconds: 7,   fromFile: C, toFile: S },
  { id: '06-experience-loop',       seconds: 7,   fromFile: S, toFile: R },
]

for (const c of clips) {
  const r = await renderSimple(c)
  console.log(`${r.id.padEnd(26)} ${r.seconds}s  ${r.w}x${r.h}  ${r.mb}MB`)
}
