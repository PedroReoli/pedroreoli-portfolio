// Shared headless browser driver for the frontend-squad.
// Rules enforced here: no visible window, isolated profile, dedicated port.
// Usage: import { launch, setup, goto, evaluate, shot } from './cdp.mjs'
// Requires a preview server already running (npm run preview -- --port 4174).
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
// One port per agent avoids clashing when two run at the same time.
const PORT = Number(process.env.CDP_PORT || 9333)
const OUT = process.argv[2] || 'out'
const BASE = 'http://localhost:4174/'

export async function launch({ width = 1440, height = 900, motion = 'no-preference' } = {}) {
  // Isolated profile: never reattach to Pedro's open Chrome (that would reopen his tabs).
  const userDir = `${process.env.TEMP || '/tmp'}/cdp-guard-${Date.now()}`
  mkdirSync(userDir, { recursive: true })
  const args = [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${userDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${width},${height}`,
    '--autoplay-policy=no-user-gesture-required',
    '--disable-features=CalculateNativeWinOcclusion',
    'about:blank',
  ]
  const proc = spawn(CHROME, args, { stdio: 'ignore', windowsHide: true })
  await sleep(2500)
  const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
  const page = list.find((t) => t.type === 'page')
  return { proc, ws: await connect(page.webSocketDebuggerUrl), userDir, motion }
}

async function connect(url) {
  const ws = new WebSocket(url)
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })
  let id = 0
  const pending = new Map()
  const events = []
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data)
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result)
    } else if (msg.method) events.push(msg)
  }
  return {
    send(method, params = {}) {
      const mid = ++id
      ws.send(JSON.stringify({ id: mid, method, params }))
      return new Promise((res, rej) => pending.set(mid, { res, rej }))
    },
    events,
    close: () => ws.close(),
  }
}

export async function setup(ws, { width, height, motion }) {
  await ws.send('Page.enable')
  await ws.send('Runtime.enable')
  await ws.send('Emulation.setDeviceMetricsOverride', {
    width, height, deviceScaleFactor: 1, mobile: width < 800,
  })
  await ws.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: motion }],
  })
}

export async function goto(ws, url = BASE) {
  await ws.send('Page.navigate', { url })
  await sleep(2500)
}

export async function evaluate(ws, expression) {
  const r = await ws.send('Runtime.evaluate', {
    expression, returnByValue: true, awaitPromise: true, userGesture: true,
  })
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception?.description || r.exceptionDetails))
  return r.result.value
}

export async function shot(ws, file) {
  const r = await ws.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  writeFileSync(file, Buffer.from(r.data, 'base64'))
  return file
}

export function ensureDir(d) { mkdirSync(d, { recursive: true }); return d }
export { sleep, existsSync }
