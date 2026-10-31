---
---
// The cooking game. Loaded by _includes/kitchen.html, and only when the kitchen
// is switched on. Its data is _data/kitchen.yml; the notes at the top of that
// file say how items, plants, stations and recipes are written.
//
// Nothing here says a word until someone has picked something, cooked it and
// taken the dish: then "eat" appears, then what eating it was like, then the
// dex button. Every word is real DOM text so page translation reaches it.
{% assign cooking_files = site.static_files | where_exp: "f", "f.path contains '/assets/cooking/'" | map: "name" %}
(function () {
  'use strict';

  const DATA = {{ site.data.kitchen | jsonify }};
  // Which pngs exist. An entry with no png is left out of the game.
  const DRAWN = new Set({{ cooking_files | jsonify }}.map(n => n.replace(/\.png$/, '')));
  const ART = '/assets/cooking/';

  const SLOTS = 5;
  const INGREDIENT_SIZE = 16;   // sprites are 16x16 unless the yml says size:
  const DISH_SIZE = 20;
  const BASE_SCALE = 2;         // one art pixel is about this many css pixels
  const GRAVITY = 1500;         // css px/s², for dropped items
  const COOK_MS = 1500;
  const TRIP_MS = 60000;
  const KEY = 'kitchen';

  // A little pixel icon, one string per row, '#' filled.
  const STAR_ICON = [
    '..#..',
    '.###.',
    '#####',
    '.#.#.',
    '#...#',
  ];

  // ── data ──────────────────────────────────────────────────────────────────

  const ITEMS = {};
  const DEX = { dishes: [], ingredients: [] };
  for (const it of DATA.ingredients || []) {
    if (!DRAWN.has(it.id)) continue;
    ITEMS[it.id] = Object.assign({ size: INGREDIENT_SIZE }, it, { kind: 'ingredient', tags: it.tags || [], cookable: true });
    DEX.ingredients.push(it.id);
  }
  // A dish can go back in the pot only if it has tags.
  for (const d of DATA.dishes || []) {
    if (!DRAWN.has(d.id)) continue;
    ITEMS[d.id] = Object.assign({ size: DISH_SIZE }, d, { kind: 'dish', eat: d.quality, tags: d.tags || [], cookable: !!d.tags });
    DEX.dishes.push(d.id);
  }

  // look: borrows another plant's png (tomato grows on potatoplant.png).
  // bare: no plant at all, the item just lies on the ground.
  const PLANTS = {};
  for (const p of DATA.plants || []) {
    const item = p.item || p.id;
    const png = p.bare ? item : (p.look || p.id) + 'plant';
    if (DRAWN.has(png) && ITEMS[item]) PLANTS[p.id] = Object.assign({}, p, { item, png });
  }

  // Stations show a gray stand-in until their png exists.
  const STATIONS = {};
  for (const s of DATA.stations || []) STATIONS[s.id] = s;

  function matches(token, id) {
    if (token === 'anything') return true;
    if (token === 'nothing') return id == null;
    if (id == null) return false;
    if (token.startsWith('any ')) return ITEMS[id].tags.includes(token.slice(4));
    return token === id;
  }

  // First recipe that fits, in either order. Recipes for undrawn dishes are
  // skipped, so they fall through to the catch-alls at the end of the yml.
  // cooking/combos.py does the same matching; keep the two in step.
  function recipe(station, a, b) {
    for (const r of DATA.recipes || []) {
      if (r.at !== station || !ITEMS[r.out]) continue;
      const p = r.in[0], q = r.in.length > 1 ? r.in[1] : 'nothing';
      if ((matches(p, a) && matches(q, b)) || (matches(p, b) && matches(q, a))) return r.out;
    }
    return null;
  }

  // ── saved state ───────────────────────────────────────────────────────────

  function load() {
    let s = {};
    try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
    const known = id => (id && ITEMS[id] ? id : null);
    const inv = Array.isArray(s.inv) ? s.inv : [];
    const st = {};
    for (const kind in STATIONS) {
      const old = (s.st && s.st[kind]) || {};
      const ins = Array.isArray(old.in) ? old.in : [];
      st[kind] = { in: [known(ins[0]), known(ins[1])], out: known(old.out) };
    }
    return {
      inv: Array.from({ length: SLOTS }, (_, i) => known(inv[i])),
      st,
      picked: s.picked || {},   // plant spot -> when it was picked
      made: s.made || {},
      found: s.found || {},
      eaten: s.eaten || {},
      flags: s.flags || {},     // harvested, gotDish, ate
    };
  }

  const state = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  // ── pixels ────────────────────────────────────────────────────────────────

  // One art pixel (--kpx) is an even number of device pixels. The inventory
  // slot png is drawn at half-art-pixel detail (--khalf), and this keeps both
  // crisp on screens scaled to 125% or 150%.
  let PX = BASE_SCALE, HALF = BASE_SCALE / 2;
  function setScale() {
    const dpr = window.devicePixelRatio || 1;
    HALF = Math.max(1, Math.round(dpr * BASE_SCALE / 2)) / dpr;
    PX = HALF * 2;
    document.documentElement.style.setProperty('--kpx', PX + 'px');
    document.documentElement.style.setProperty('--khalf', HALF + 'px');
  }
  const snap = v => Math.round(v / PX) * PX;
  const toDevice = v => { const dpr = window.devicePixelRatio || 1; return Math.round(v * dpr) / dpr; };
  const art = n => `calc(${n} * var(--kpx))`;

  // Elements in the page flow can land between device pixels; this nudges one
  // onto the grid.
  function alignToDevice(el) {
    el.style.transform = '';
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${toDevice(r.left) - r.left}px, ${toDevice(r.top) - r.top}px)`;
  }
  // Pngs load after layout and shift things, so aligning happens again then.
  let alignQueued = false;
  function queueAlign() {
    if (alignQueued) return;
    alignQueued = true;
    requestAnimationFrame(() => { alignQueued = false; align(); });
  }
  // The bar too: it's pushed to the right end of the row, which can leave it
  // half a pixel off and blurry.
  function align() {
    if (groundRow) alignToDevice(groundRow);
    if (!bar.hidden) alignToDevice(bar);
  }

  // w and h in art pixels. Left out, the png's own size is used.
  function sprite(name, w, h) {
    const drawn = DRAWN.has(name);
    const el = document.createElement(drawn ? 'img' : 'span');
    el.className = 'k-sprite' + (drawn ? '' : ' k-missing');
    if (drawn) {
      el.src = ART + name + '.png';
      el.alt = '';
      el.draggable = false;
    }
    const size = (cw, ch) => {
      el.style.width = art(cw);
      el.style.height = art(ch);
    };
    if (w) size(w, h || w);
    else if (drawn) el.addEventListener('load', () => { size(el.naturalWidth, el.naturalHeight); queueAlign(); }, { once: true });
    else size(32, 32);
    return el;
  }

  const itemSprite = id => sprite(id, ITEMS[id].size);

  function wiggle(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 400);
  }
  const bounce = el => wiggle(el, 'k-bounce');
  const shake = el => wiggle(el, 'k-shake');

  // ── inventory ─────────────────────────────────────────────────────────────

  const layer = document.createElement('div');
  layer.id = 'k-layer';
  const bar = document.createElement('div');
  bar.id = 'k-inv';
  bar.hidden = true;
  const slots = [];
  for (let i = 0; i < SLOTS; i++) {
    const slot = document.createElement('div');
    slot.className = 'k-tile k-slot';
    slot.dataset.i = i;
    slot.addEventListener('pointerdown', e => {
      if (state.inv[i] && !e.target.closest('.k-pop')) startPress(e, { type: 'inv', i }, slot);
    });
    slots.push(slot);
    bar.append(slot);
  }
  const dexBtn = document.createElement('button');
  dexBtn.type = 'button';
  dexBtn.className = 'k-dexbtn';   // infobook.png, drawn at 2x like the slots
  dexBtn.setAttribute('aria-label', 'dex');
  dexBtn.addEventListener('click', openDex);
  bar.append(dexBtn);

  const pop = document.createElement('div');
  pop.className = 'k-pop';
  const eatBtn = document.createElement('button');
  eatBtn.type = 'button';
  eatBtn.textContent = 'eat';
  eatBtn.addEventListener('click', () => { if (selected != null) eat(selected); });
  pop.append(eatBtn);

  let selected = null;   // inventory slot index
  // The bar only shows on a page where it has held something, so leaving it
  // empty switches the whole thing off. Once shown it stays for that page.
  let barShown = false;

  function edible(id) {
    return !!(id && ITEMS[id].eat);
  }

  function renderInv() {
    const wasHidden = bar.hidden;
    if (state.inv.some(Boolean)) barShown = true;
    bar.hidden = !barShown;
    // The bar can make the ground row taller, which moves the ground.
    if (bar.hidden !== wasHidden) {
      for (const f of floor) fall(f);
      queueAlign();
    }
    if (selected != null && !state.inv[selected]) selected = null;
    slots.forEach((slot, i) => {
      slot.replaceChildren();
      const id = state.inv[i];
      if (id) slot.append(itemSprite(id));
      slot.classList.toggle('k-selected', selected === i);
    });
    if (selected != null && state.flags.gotDish && edible(state.inv[selected])) slots[selected].append(pop);
    dexBtn.hidden = !state.flags.ate;
  }

  function putInSlot(i, id) {
    state.inv[i] = id;
    // The first dish to reach the inventory is what brings out "eat".
    if (ITEMS[id].kind === 'dish' && !state.flags.gotDish) {
      state.flags.gotDish = true;
      selected = i;
    }
    save();
    renderInv();
    bounce(slots[i]);
  }

  // Into the first free slot, or onto the floor when full. (x, y) is where it
  // comes from, in the window.
  function give(id, x, y) {
    const i = state.inv.indexOf(null);
    if (i < 0) {
      dropToFloor(id, x, y);
      save();
      return;
    }
    putInSlot(i, id);
  }

  function eat(i) {
    const id = state.inv[i];
    const it = ITEMS[id];
    state.inv[i] = null;
    selected = null;
    state.eaten[id] = (state.eaten[id] || 0) + 1;
    state.flags.ate = true;
    save();
    renderInv();
    floatText((DATA.eat_text || {})[it.eat] || '...', slots[i]);
    if (it.effect === 'trip') trip(Date.now());
  }

  // Rises in whole art pixels above `over`, then goes.
  function floatText(text, over) {
    const r = over.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'k-float';
    el.textContent = text;
    layer.append(el);
    const x = snap(r.left + r.width / 2 - el.offsetWidth / 2);
    let y = snap(r.top - el.offsetHeight - 2 * PX);
    let step = 0;
    const place = () => { el.style.transform = `translate(${x}px, ${y}px)`; };
    place();
    const timer = setInterval(() => {
      step++;
      if (step <= 8) { y -= PX; place(); }
      if (step > 28) { clearInterval(timer); el.remove(); }
    }, 70);
  }

  // ── items on the floor ────────────────────────────────────────────────────

  // Dropped items fall to the ground (the top of the footer) and are gone when
  // the page is left. They're never saved. They live in page coordinates, so
  // they scroll with the page.
  const floor = [];
  const floorLayer = document.createElement('div');
  floorLayer.id = 'k-floor-layer';

  // x, y are in the window.
  function dropToFloor(id, x, y) {
    const el = itemSprite(id);
    el.classList.add('k-floor');
    floorLayer.append(el);
    const f = { id, el, x: x + window.scrollX, y: y + window.scrollY, vy: 0, resting: false };
    el.addEventListener('pointerdown', e => startPress(e, { type: 'floor', f }, el));
    floor.push(f);
    fall(f);
    return f;
  }

  function removeFloor(f) {
    f.el.remove();
    floor.splice(floor.indexOf(f), 1);
  }

  function groundY(f) {
    const footer = document.querySelector('.site-footer');
    const ground = footer
      ? footer.getBoundingClientRect().top + window.scrollY
      : document.documentElement.scrollHeight;
    return ground - ITEMS[f.id].size * PX;
  }

  // Height is counted in whole art pixels up from the ground, so a resting
  // item sits right on it.
  function placeFloor(f) {
    const g = groundY(f);
    f.el.style.transform = `translate(${toDevice(snap(f.x))}px, ${toDevice(g - snap(g - f.y))}px)`;
  }

  // Falling runs every frame; only the sprite animations are kept choppy.
  let falling = false, lastFrame = 0;
  function fall(f) {
    f.resting = false;
    f.vy = 0;
    f.x = Math.max(0, Math.min(f.x, document.documentElement.clientWidth - ITEMS[f.id].size * PX));
    f.y = Math.min(f.y, groundY(f));
    placeFloor(f);
    if (falling) return;
    falling = true;
    lastFrame = performance.now();
    requestAnimationFrame(fallFrame);
  }

  function fallFrame(now) {
    const dt = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;
    let moving = false;
    for (const f of floor.slice()) {
      if (f.resting) continue;
      const g = groundY(f);
      const before = f.y;
      f.vy += GRAVITY * dt;
      f.y += f.vy * dt;
      if (!f.noCatch && fellIntoStation(f, before)) continue;
      if (f.y >= g) { f.y = g; f.resting = true; } else moving = true;
      placeFloor(f);
    }
    if (moving) requestAnimationFrame(fallFrame);
    else falling = false;
  }

  // ── dragging and clicking items ───────────────────────────────────────────

  // A press on an item becomes a drag once it moves a few pixels; otherwise
  // letting go counts as a click.
  let press = null;
  let pressed = false;   // a press just ended; swallow its click

  function itemAt(src) {
    if (src.type === 'inv') return state.inv[src.i];
    if (src.type === 'in') return state.st[src.kind].in[src.i];
    return src.f.id;
  }

  function take(src) {
    if (src.type === 'inv') state.inv[src.i] = null;
    else if (src.type === 'in') state.st[src.kind].in[src.i] = null;
    else removeFloor(src.f);
  }

  function startPress(e, src, el) {
    if (e.button !== 0) return;
    e.preventDefault();
    // Grab the sprite, not the slot around it.
    if (!el.classList.contains('k-sprite')) el = el.querySelector('.k-sprite') || el;
    const r = el.getBoundingClientRect();
    press = { src, el, id: itemAt(src), x0: e.clientX, y0: e.clientY, offX: e.clientX - r.left, offY: e.clientY - r.top, ghost: null };
  }

  document.addEventListener('pointermove', e => {
    if (!press) return;
    if (!press.ghost) {
      if (Math.hypot(e.clientX - press.x0, e.clientY - press.y0) < 5) return;
      press.ghost = itemSprite(press.id);
      press.ghost.classList.add('k-ghost');
      layer.append(press.ghost);
      press.el.style.visibility = 'hidden';
      selected = null;
      renderInv();
    }
    press.ghost.style.transform = `translate(${snap(e.clientX - press.offX)}px, ${snap(e.clientY - press.offY)}px)`;
    // Dragging over a station opens it.
    const over = document.elementFromPoint(e.clientX, e.clientY);
    const st = over && over.closest('.k-station');
    if (st) openStation(st);
  });

  document.addEventListener('pointerup', e => {
    if (!press) return;
    const p = press;
    press = null;
    pressed = true;
    setTimeout(() => { pressed = false; }, 0);
    if (!p.ghost) { clickItem(p.src, p.el); return; }
    p.ghost.remove();
    p.el.style.visibility = '';
    dropAt(p, e.clientX, e.clientY, e.clientX - p.offX, e.clientY - p.offY);
  });

  document.addEventListener('pointercancel', () => {
    if (!press) return;
    if (press.ghost) press.ghost.remove();
    press.el.style.visibility = '';
    press = null;
  });

  function clickItem(src, el) {
    const r = el.getBoundingClientRect();
    if (src.type === 'inv') {
      selected = selected === src.i ? null : src.i;
      renderInv();
    } else if (src.type === 'floor') {
      if (state.inv.indexOf(null) < 0) return shake(el);
      take(src);
      give(src.f.id, r.left, r.top);
    } else {
      const id = itemAt(src);
      take(src);
      give(id, r.left, r.top);
      renderStations();
    }
  }

  function dropAt(p, cx, cy, left, top) {
    const target = document.elementFromPoint(cx, cy);
    const slot = target && target.closest('.k-slot');
    const inBar = target && target.closest('#k-inv');
    const st = target && target.closest('.k-station');

    if (inBar) {
      let i = slot ? +slot.dataset.i : state.inv.indexOf(null);
      if (i >= 0 && state.inv[i] && p.src.type === 'inv') {
        state.inv[p.src.i] = state.inv[i];
        state.inv[i] = p.id;
        selected = null;
        save();
        renderInv();
        return;
      }
      if (i < 0 || state.inv[i]) i = state.inv.indexOf(null);
      if (i < 0) return shake(bar);
      take(p.src);
      putInSlot(i, p.id);
      renderStations();
      return;
    }

    // Let go right on a station or one of its slots: straight in. Anywhere
    // else it falls, and can still fall into a pot on the way down.
    if (st) {
      const into = target.closest('.k-in');
      if (!putInStation(st, p.src, into ? +into.dataset.i : null)) shake(st.querySelector('.k-station-body'));
      return;
    }

    take(p.src);
    dropToFloor(p.id, left, top);
    save();
    renderInv();
    renderStations();
  }

  // Clicking anywhere that isn't part of the game lets go of the selection
  // and closes an open station.
  document.addEventListener('pointerdown', e => {
    if (e.target.closest('#k-inv, .k-station, .k-floor, #k-dex')) return;
    if (selected != null) { selected = null; renderInv(); }
    closeStation();
  }, true);

  // ── stations ──────────────────────────────────────────────────────────────

  // A station has two slots floating above it. One item can be cooked alone
  // by clicking the station; a second item starts cooking by itself. The dish
  // goes to the inventory, or onto the floor next to the station when full.
  const stationEls = [];
  let openEl = null;
  const cookingUntil = {};   // kind -> when the dish comes out

  function buildStation(host) {
    const kind = host.dataset.kind;
    const def = STATIONS[kind];
    if (!def) return;
    host.hidden = false;
    host.classList.add('k-station');
    host._kind = kind;

    const body = document.createElement('div');
    body.className = 'k-station-body';
    // Drawn stations use the png's own size; size: is only for the stand-in.
    const [w, h] = def.size || [32, 32];
    body.append(DRAWN.has(kind) ? sprite(kind) : sprite(kind, w, h));
    // An animated strip over the station, like the fire under the pot.
    const fire = def.fire;
    if (fire && DRAWN.has(fire.png)) {
      const [fw, fh] = fire.size;
      const el = document.createElement('span');
      el.className = 'k-fire';
      el.style.left = art(fire.at[0]);
      el.style.top = art(fire.at[1]);
      el.style.width = art(fw);
      el.style.height = art(fh);
      el.style.backgroundImage = `url('${ART}${fire.png}.png')`;
      el.style.backgroundSize = `${art(fw * fire.frames)} ${art(fh)}`;
      el.style.setProperty('--strip', art(fw * fire.frames));
      el.style.animationTimingFunction = `steps(${fire.frames})`;
      el.style.animationDuration = (fire.frames / (fire.fps || 2)) + 's';
      body.append(el);
    }
    // What's waiting inside, top half showing over the rim.
    const inside = document.createElement('div');
    inside.className = 'k-inside';
    body.append(inside);
    // The pot always looks like it's cooking.
    if (kind === 'pot') {
      for (let i = 0; i < 3; i++) {
        const puff = document.createElement('span');
        puff.className = 'k-steam';
        puff.style.left = `calc(50% + ${art(i * 5 - 6)})`;
        puff.style.animationDelay = (i * 0.6) + 's';
        body.append(puff);
      }
    }
    body.addEventListener('click', () => {
      if (pressed) return;
      const st = state.st[kind];
      if (selected != null) {
        if (!putInStation(host, { type: 'inv', i: selected }, null)) shake(body);
        selected = null;
        renderInv();
      } else if (st.in.filter(Boolean).length === 1 && !cooking(kind)) {
        cookAt(kind);
      } else if (openEl === host) {
        closeStation();
      } else {
        openStation(host);
      }
    });

    const panel = document.createElement('div');
    panel.className = 'k-panel';
    panel.hidden = true;
    const ins = [0, 1].map(i => {
      const s = document.createElement('div');
      s.className = 'k-tile k-potslot k-slot k-in';
      s.dataset.i = i;
      s.addEventListener('pointerdown', e => {
        if (state.st[kind].in[i]) startPress(e, { type: 'in', kind, i }, s);
      });
      return s;
    });
    panel.append(ins[0], ins[1]);

    host.append(body, panel);
    stationEls.push({ host, kind, body, panel, ins, inside });
  }

  const cooking = kind => (cookingUntil[kind] || 0) > Date.now();

  function renderStations() {
    for (const s of stationEls) {
      const st = state.st[s.kind];
      s.ins.forEach((el, i) => {
        el.replaceChildren();
        if (st.in[i]) el.append(itemSprite(st.in[i]));
      });
      const waiting = st.in.find(Boolean);
      s.inside.replaceChildren();
      if (waiting) {
        const size = ITEMS[waiting].size;
        s.inside.style.left = `calc(50% - ${art(size / 2)})`;
        s.inside.style.width = art(size);
        s.inside.style.height = art(Math.floor(size / 2));
        s.inside.append(itemSprite(waiting));
      }
      s.host.classList.toggle('k-cooking', cooking(s.kind));
    }
  }

  function openStation(host) {
    if (openEl === host) return;
    closeStation();
    openEl = host;
    host.querySelector('.k-panel').hidden = false;
  }

  function closeStation() {
    if (!openEl) return;
    openEl.querySelector('.k-panel').hidden = true;
    openEl = null;
  }

  // Into slot i, or the first free one. False if it can't go in.
  function putInStation(host, src, i) {
    const kind = host._kind;
    const st = state.st[kind];
    const id = itemAt(src);
    if (!id || !ITEMS[id].cookable || cooking(kind)) return false;
    if (i == null) i = st.in.indexOf(null);
    else if (st.in[i] && src.type === 'in' && src.kind === kind) {
      st.in[src.i] = st.in[i];
      st.in[i] = id;
      save();
      renderStations();
      return true;
    } else if (st.in[i]) i = st.in.indexOf(null);
    if (i < 0) return false;
    take(src);
    st.in[i] = id;
    save();
    renderInv();
    renderStations();
    openStation(host);
    if (st.in[0] && st.in[1]) cookAt(kind);
    return true;
  }

  // A falling item whose bottom passes the rim, over the mouth, goes in.
  // The rim is a few art pixels below the top of the sprite.
  function fellIntoStation(f, before) {
    const size = ITEMS[f.id].size * PX;
    const cx = f.x + size / 2;
    for (const s of stationEls) {
      const r = s.body.getBoundingClientRect();
      const left = r.left + window.scrollX, top = r.top + window.scrollY;
      const rim = top + 6 * PX;
      if (cx < left + 3 * PX || cx > left + r.width - 3 * PX) continue;
      if (before + size > rim || f.y + size < rim) continue;
      if (putInStation(s.host, { type: 'floor', f }, null)) return true;
    }
    return false;
  }

  function cookAt(kind) {
    const st = state.st[kind];
    if (cooking(kind) || (!st.in[0] && !st.in[1])) return;
    const result = recipe(kind, st.in[0], st.in[1]);
    const s = stationEls.find(x => x.kind === kind);
    if (!result) return shake(s.body);
    // Saved straight away, so leaving mid-cook doesn't lose the dish; it
    // comes out on the next visit.
    st.in = [null, null];
    st.out = result;
    state.made[result] = (state.made[result] || 0) + 1;
    save();
    cookingUntil[kind] = Date.now() + COOK_MS;
    closeStation();
    renderStations();
    setTimeout(() => serve(kind), COOK_MS);
  }

  function serve(kind) {
    const st = state.st[kind];
    const s = stationEls.find(x => x.kind === kind);
    if (!st.out || !s) return;
    const id = st.out;
    st.out = null;
    renderStations();
    const r = s.body.getBoundingClientRect();
    const i = state.inv.indexOf(null);
    if (i >= 0) putInSlot(i, id);
    else {
      // Next to the station, and not back into it.
      dropToFloor(id, r.right + 2 * PX, r.top).noCatch = true;
      save();
    }
  }

  // ── plants ────────────────────────────────────────────────────────────────

  // A "fruit" is anything picked: an item on a plant, or for pull: plants the
  // whole plant, which vanishes until it grows back.
  const fruits = [];

  function buildPlants() {
    const seen = {};
    document.querySelectorAll('.k-plant').forEach(host => {
      const kind = host.dataset.kind;
      const def = PLANTS[kind];
      if (!def) return;
      const n = seen[kind] = (seen[kind] || 0) + 1;
      host.hidden = false;
      const plant = def.bare ? itemSprite(def.item) : sprite(def.png);
      host.append(plant);
      if (def.pull || def.bare) {
        plant.classList.add('k-pull');
        const fr = { key: `${location.pathname}|${kind}|${n}`, id: def.item, el: plant, regrow: (def.regrow || 5) * 60000 };
        plant.addEventListener('click', () => harvest(fr));
        fruits.push(fr);
        return;
      }
      const mine = [];
      (def.spots || []).forEach(([x, y], s) => {
        // The wrapper bobs; the sprite inside may be mirrored.
        const el = document.createElement('span');
        el.className = 'k-fruit';
        el.style.left = art(x);
        el.style.top = art(y);
        el.style.animationDelay = -(Math.random() * 2.4).toFixed(2) + 's';
        el.append(itemSprite(def.item));
        const fr = { key: `${location.pathname}|${kind}|${n}|${s}`, id: def.item, el, regrow: (def.regrow || 5) * 60000 };
        el.addEventListener('click', () => harvest(fr));
        host.append(el);
        fruits.push(fr);
        mine.push([x, el]);
      });
      // Fruits are drawn with the stem to the top left, which suits the right
      // side of a plant. Left third: mirrored. Middle third: either.
      const mirror = () => {
        const third = plant.naturalWidth / 3;
        const size = ITEMS[def.item].size;
        for (const [x, el] of mine) {
          const cx = x + size / 2;
          const flip = cx < third || (cx < 2 * third && Math.random() < 0.5);
          el.firstChild.classList.toggle('k-mirror', flip);
        }
      };
      if (plant.complete) mirror();
      else plant.addEventListener('load', mirror, { once: true });
    });
  }

  function grown(fr) {
    const t = state.picked[fr.key];
    return !t || Date.now() - t >= fr.regrow;
  }

  function renderFruits() {
    for (const fr of fruits) fr.el.style.visibility = grown(fr) ? '' : 'hidden';
  }

  function harvest(fr) {
    if (!grown(fr)) return;
    state.picked[fr.key] = Date.now();
    state.found[fr.id] = (state.found[fr.id] || 0) + 1;
    state.flags.harvested = true;
    const r = fr.el.getBoundingClientRect();
    renderFruits();
    give(fr.id, r.left, r.top);
    renderInv();
  }

  // ── dex ───────────────────────────────────────────────────────────────────

  const dex = document.createElement('div');
  dex.id = 'k-dex';
  dex.hidden = true;
  dex.addEventListener('pointerdown', e => { if (e.target === dex) closeDex(); });

  function count(id) {
    return ITEMS[id].kind === 'dish' ? state.made[id] || 0 : state.found[id] || 0;
  }

  // Found ones first, then silhouettes, each group in the yml's order.
  function dexGrid(ids, detail) {
    const grid = document.createElement('div');
    grid.className = 'k-grid';
    const known = ids.filter(id => count(id) > 0);
    const unknown = ids.filter(id => count(id) === 0);
    for (const id of known.concat(unknown)) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'k-cell';
      cell.append(itemSprite(id));
      if (count(id) === 0) {
        cell.classList.add('k-unknown');
        cell.disabled = true;
        const q = document.createElement('span');
        q.className = 'k-q';
        q.textContent = '?';
        cell.append(q);
      } else {
        if (ITEMS[id].kind === 'dish' && count(id) >= 3) cell.append(star());
        cell.addEventListener('click', () => {
          grid.parentNode.querySelectorAll('.k-cell').forEach(c => c.classList.toggle('k-picked', c === cell));
          showDetail(detail, id);
        });
      }
      grid.append(cell);
    }
    return grid;
  }

  function showDetail(detail, id) {
    const it = ITEMS[id];
    const n = count(id);
    const name = document.createElement('div');
    name.className = 'k-name';
    name.textContent = it.name;
    const line = document.createElement('div');
    line.textContent = (it.kind === 'dish' ? 'made: ' : 'found: ') + n;
    if (it.kind === 'dish' && n >= 3) line.append(' ', star());
    const words = document.createElement('div');
    words.append(name, line);
    detail.replaceChildren(itemSprite(id), words);
    detail.hidden = false;
  }

  function star() {
    const s = pixelIcon(STAR_ICON);
    s.classList.add('k-star');
    return s;
  }

  function openDex() {
    const box = document.createElement('div');
    box.className = 'k-box';
    const detail = document.createElement('div');
    detail.className = 'k-detail';
    detail.hidden = true;
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'k-close';
    close.setAttribute('aria-label', 'close');
    close.textContent = '×';
    close.addEventListener('click', closeDex);
    box.append(close, dexGrid(DEX.dishes, detail), dexGrid(DEX.ingredients, detail), detail);
    dex.replaceChildren(box);
    dex.hidden = false;
  }

  function closeDex() {
    dex.hidden = true;
    dex.replaceChildren();
  }

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeDex();
    closeStation();
  });

  // ── effects ───────────────────────────────────────────────────────────────

  // The russula: the page goes red, yellow, green, blue, black, then back.
  // Carries on across pages until it's done.
  function trip(start) {
    const left = TRIP_MS - (Date.now() - start);
    if (left <= 0) return;
    try { sessionStorage.setItem('kitchenTrip', start); } catch (e) {}
    document.querySelectorAll('.k-trip').forEach(el => el.remove());
    const el = document.createElement('div');
    el.className = 'k-trip';
    el.style.animationDuration = TRIP_MS + 'ms';
    el.style.animationDelay = -(TRIP_MS - left) + 'ms';
    el.addEventListener('animationend', () => {
      el.remove();
      try { sessionStorage.removeItem('kitchenTrip'); } catch (e) {}
    });
    document.body.append(el);
  }

  // ── icons ─────────────────────────────────────────────────────────────────

  function pixelIcon(rows) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    const w = rows[0].length, h = rows.length;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('shape-rendering', 'crispEdges');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('k-icon');
    svg.style.width = art(w);
    svg.style.height = art(h);
    rows.forEach((row, y) => {
      for (let x = 0; x < w; x++) {
        if (row[x] !== '#') continue;
        const r = document.createElementNS(ns, 'rect');
        r.setAttribute('x', x);
        r.setAttribute('y', y);
        r.setAttribute('width', 1);
        r.setAttribute('height', 1);
        svg.append(r);
      }
    });
    return svg;
  }

  // ── start ─────────────────────────────────────────────────────────────────

  // Plants and stations don't sit in the text: wherever their include is,
  // they're moved into one row standing on the ground, the top of the footer.
  // The inventory stands at the right end of the same row.
  let groundRow = null;
  function buildGround() {
    const hosts = document.querySelectorAll('.k-plant:not([hidden]), .k-station');
    const footer = document.querySelector('.site-footer');
    if (!footer) {
      document.body.append(bar);
      return;
    }
    const ground = document.createElement('div');
    ground.className = 'k-ground';
    const wrap = document.createElement('div');
    wrap.className = 'wrapper';
    groundRow = document.createElement('div');
    groundRow.className = 'k-ground-row';
    hosts.forEach(h => groundRow.append(h));
    groundRow.append(bar);
    wrap.append(groundRow);
    ground.append(wrap);
    footer.before(ground);
  }

  function start() {
    setScale();
    document.body.append(floorLayer, layer, dex);
    buildPlants();
    document.querySelectorAll('.k-station-host').forEach(buildStation);
    buildGround();
    renderFruits();
    renderInv();
    renderStations();
    for (const s of stationEls) serve(s.kind);   // a dish left mid-cook
    align();
    if (fruits.length) setInterval(renderFruits, 5000);
    window.addEventListener('resize', () => {
      setScale();
      align();
      for (const f of floor) fall(f);
    });
    let t = 0;
    try { t = Number(sessionStorage.getItem('kitchenTrip')); } catch (e) {}
    if (t) trip(t);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
