// Loads pages with the kitchen on in a separate headless Chrome, reports what
// the game built on each, and saves a zoomed screenshot of its ground row.
//
//   node cooking/check-page.mjs friends/clementine/ thoughts/temperature/
//
// Needs the site built and served on port 4000 first (see README.md). Paths go
// without a leading slash (Git Bash rewrites "/friends/..." into a Windows path).
// Screenshots land in <temp>/kitchen-check/; the script prints where.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const DIR = join(tmpdir(), 'kitchen-check');
const PORT = 9350;
const BASE = 'http://localhost:4000/';
mkdirSync(DIR, { recursive: true });

spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${join(DIR, 'profile')}`,
  '--window-size=900,700', 'about:blank',
]);
const wait = ms => new Promise(r => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) {
  try { targets = await (await fetch(`http://localhost:${PORT}/json/list`)).json(); break; } catch { await wait(200); }
}
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = {};
const errors = [];
ws.addEventListener('message', ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; }
  if (m.method === 'Runtime.exceptionThrown') errors.push(JSON.stringify(m.params.exceptionDetails).slice(0, 400));
});
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => {
  const r = await send('Runtime.evaluate', { expression: `JSON.stringify(${expr})`, returnByValue: true });
  return r.result.result.value === undefined ? undefined : JSON.parse(r.result.result.value);
};

await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: BASE + '?kitchen=on' });
await wait(1000);
// Something in the inventory so the bar shows too. Never set kitchenApi here:
// with it unset the table reads the LIVE shared table, and this script only reads.
await ev(`localStorage.setItem('kitchen', JSON.stringify({ inv: ['potato', null, null, null, null] }))`);

for (const path of process.argv.slice(2)) {
  errors.length = 0;
  await send('Page.navigate', { url: BASE + path });
  await wait(2500);
  await ev(`void window.scrollTo(0, document.body.scrollHeight)`);
  await wait(500);
  const info = await ev(`({
    plants: [...document.querySelectorAll('.k-plant:not([hidden])')].map(p => p.dataset.kind),
    placedButNotDrawn: [...document.querySelectorAll('.k-plant[hidden]')].map(p => p.dataset.kind),
    fruits: document.querySelectorAll('.k-fruit').length,
    stalks: document.querySelectorAll('.k-stalk').length,
    stations: [...document.querySelectorAll('.k-station')].map(s => s.dataset.kind),
    bees: document.querySelectorAll('.k-bee').length,
  })`);
  console.log(path, JSON.stringify(info));
  if (errors.length) console.log('  ERRORS', errors.join('\n  '));
  const r = await ev(`(() => { const g = document.querySelector('.k-ground'); if (!g) return null; const b = g.getBoundingClientRect(); return [b.left + scrollX, b.top + scrollY - 60, b.width, b.height + 60]; })()`);
  if (!r) { console.log('  no ground row on this page'); continue; }
  const s = await send('Page.captureScreenshot', { format: 'png', clip: { x: r[0], y: r[1], width: r[2], height: r[3], scale: 3 } });
  const file = join(DIR, (path.replace(/\W+/g, '_') || 'home') + '.png');
  writeFileSync(file, Buffer.from(s.result.data, 'base64'));
  console.log('  screenshot', file);
}
await send('Browser.close');
process.exit(0);
