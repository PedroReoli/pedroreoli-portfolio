import { renderClip, STATUE, REAL, smooth } from './chain.mjs'

// Movimento interno sutil do busto; círculo e fundo FIXOS (sem zoom de enquadramento).
const breathe = (t, amp = 0.012) => 1 + Math.sin(t * Math.PI * 2) * amp
const drift = (t, amp = 6) => Math.sin(t * Math.PI) * amp

const clips = [
  { id: '01-hero-to-about', seconds: 6.5, from: 'ref-statue (amarelo)', to: 'ref-real (preto)',
    fn: (t) => ({ base: STATUE, overlay: REAL, mix: smooth(t), zoom: breathe(t), dy: drift(t) }) },

  { id: '02-about-to-projects', seconds: 6.5, from: 'ref-real (preto)', to: 'ref-statue (amarelo)',
    fn: (t) => ({ base: REAL, overlay: STATUE, mix: smooth(t), zoom: breathe(t, 0.010), dy: drift(t) }) },

  // 03: gesto "mostrar projetos" — busto inclina/avança levemente enquanto se aproxima
  { id: '03-projects-to-stack', seconds: 7, from: 'ref-statue', to: 'ref-statue (leve aproximação)',
    fn: (t) => ({ base: STATUE, overlay: STATUE, mix: 0, zoom: 1 + smooth(t) * 0.022, dx: drift(t, 10) }) },

  // 04: respiro largo, fundo fixo
  { id: '04-stack-to-purpose', seconds: 7, from: 'ref-statue', to: 'ref-statue',
    fn: (t) => ({ base: STATUE, overlay: STATUE, mix: 0, zoom: breathe(t, 0.018), dy: drift(t, 8) }) },

  // 05: idem, fase oposta para não repetir 04
  { id: '05-purpose-to-experience', seconds: 7, from: 'ref-statue', to: 'ref-statue',
    fn: (t) => ({ base: STATUE, overlay: STATUE, mix: 0, zoom: breathe(t + 0.5, 0.016), dx: drift(t, 8) }) },

  // 06: estátua -> metade -> real (fecha o ciclo)
  { id: '06-experience-loop', seconds: 7, from: 'ref-statue', to: 'ref-real',
    fn: (t) => ({ base: STATUE, overlay: REAL, mix: smooth(t), zoom: breathe(t, 0.014), dy: drift(t, 6) }) },
]

for (const c of clips) {
  const r = await renderClip({ id: c.id, seconds: c.seconds, from: c.from, to: c.to, fn: c.fn })
  console.log(`${r.id.padEnd(26)} ${r.seconds}s  ${r.w}x${r.h}  ${r.mb}MB`)
}
