import { renderPoseClip, ROOT } from './poses.mjs'
import path from 'node:path'

const p = (...xs) => path.join(ROOT, ...xs)
const IDLE = p('flow/v3/ref-statue-1920.jpg')
const A = p('flow/v4/poses/pose-A-1920.jpg')   // 3/4 esquerda
const B = p('flow/v4/poses/pose-B-1920.jpg')   // braço erguido (apresentar)
const C = p('flow/v4/poses/pose-C-1920.jpg')   // mão no queixo (reflexão)

// Cada clipe tem movimento REAL: o busto muda de pose ao longo do scroll.
// O círculo e o fundo são idênticos em todas as poses, então o enquadramento
// continua travado — o que se move é o busto.
const clips = [
  // 03 Projetos→Stack: busto se vira e aponta/apresenta (a sessão de projetos)
  { id: '03-projects-to-stack', seconds: 7,
    poses: [{ f: IDLE, t: 0 }, { f: A, t: 0.45 }, { f: B, t: 1 }],
    from: 'idle (frente)', to: 'pose B (braço apresentando)' },

  // 04 Stack→Propósito: da apresentação volta à reflexão
  { id: '04-stack-to-purpose', seconds: 7,
    poses: [{ f: B, t: 0 }, { f: A, t: 0.5 }, { f: C, t: 1 }],
    from: 'pose B', to: 'pose C (mão no queixo)' },

  // 05 Propósito→Experiência: da reflexão volta ao idle de frente
  { id: '05-purpose-to-experience', seconds: 7,
    poses: [{ f: C, t: 0 }, { f: A, t: 0.5 }, { f: IDLE, t: 1 }],
    from: 'pose C', to: 'idle (frente)' },
]

for (const c of clips) {
  const r = await renderPoseClip(c)
  console.log(`${r.id.padEnd(26)} ${r.seconds}s  ${r.w}x${r.h}  ${r.mb}MB`)
}
