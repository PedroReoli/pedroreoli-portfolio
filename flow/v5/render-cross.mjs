import { renderCross, p } from './simple2.mjs'

// Pedro aprovou o busto PENSATIVO (mão no rosto) e pediu um na POSE DO BOLT
// (braço esticado em diagonal, "fazendo o raio").
//
// Regra mantida: fundo estático, só a troca entre os bustos.
const S  = p('flow/v5/poses/statue.jpg')
const A  = p('flow/v5/poses/pose-A-1920.jpg')      // 3/4 esquerda
const C  = p('flow/v5/poses/pose-C-1920.jpg')      // pensativo (mão no rosto) ✅ aprovado
const BT = p('flow/v5/poses/pose-BOLT-1920.jpg')   // pose do Bolt (raio) ✅ novo
const R  = p('flow/v5/poses/real-final.jpg')

const clips = [
  // 01 Hero: estátua -> Pedro real
  { id: '01-hero-to-about',         seconds: 6.5, fromFile: S,  toFile: R },
  // 02 Sobre -> Projetos: real -> 3/4
  { id: '02-about-to-projects',     seconds: 6.5, fromFile: R,  toFile: A },
  // 03 Projetos: 3/4 -> POSE DO BOLT (o "raio", apresentando os projetos)
  { id: '03-projects-to-stack',     seconds: 7,   fromFile: A,  toFile: BT },
  // 04 Stack -> Propósito: Bolt -> PENSATIVO (mão no rosto)
  { id: '04-stack-to-purpose',      seconds: 7,   fromFile: BT, toFile: C },
  // 05 Propósito -> Experiência: pensativo -> estátua de frente
  { id: '05-purpose-to-experience', seconds: 7,   fromFile: C,  toFile: S },
  // 06 Experiência: estátua -> real
  { id: '06-experience-loop',       seconds: 7,   fromFile: S,  toFile: R },
]

for (const c of clips) {
  const r = await renderCross(c)
  console.log(`${r.id.padEnd(26)} ${r.seconds}s  ${r.w}x${r.h}  ${r.mb}MB`)
}
