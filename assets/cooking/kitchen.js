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
  // png:  names the png outright (honey grows on beehive.png).
  // bare: no plant at all, the item just lies on the ground.
  const PLANTS = {};
  for (const p of DATA.plants || []) {
    const item = p.item || p.id;
    const png = p.bare ? item : p.png || (p.look || p.id) + 'plant';
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
      reported: s.reported || {},   // 'found:id' / 'made:id' -> true, once sent to the server
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
    scatterPlants();
    if (groundRow) alignToDevice(groundRow);
    if (!bar.hidden) alignToDevice(bar);
  }

  // A number from 0 to 1 that depends only on the text, so a plant's place
  // is rolled once and is the same on every visit.
  function roll(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
    h ^= h >>> 13;
    h = Math.imul(h, 0x5bd1e995);
    h ^= h >>> 15;
    return (h >>> 0) / 4294967296;
  }

  // Plants stand somewhere between the left corner and the middle of the
  // ground, each at its own place for its page, and clear of the inventory
  // (whose room is held even while it's hidden, so nothing jumps when it
  // appears). Stations stay in the corner. A plant's gap is a share of the
  // free room, so the gaps of a row of plants never add up to more than it.
  function scatterPlants() {
    if (!groundRow || !groundRow.isConnected) return;
    const kids = [...groundRow.children].filter(c => c !== bar && !c.hidden);
    const plants = kids.filter(c => c.classList.contains('k-plant'));
    if (!plants.length) return;
    for (const p of plants) p.style.marginLeft = '';
    const gap = 12 * PX;
    const width = groundRow.clientWidth;
    const used = kids.reduce((sum, c) => sum + c.offsetWidth, 0) + gap * (kids.length - 1);
    const inventory = 236 * HALF + gap;   // five tiles, the book and their margins
    const free = Math.max(0, Math.min(width / 2, width - inventory) - used);
    const count = {};
    for (const p of plants) {
      const kind = p.dataset.kind;
      count[kind] = (count[kind] || 0) + 1;
      const share = roll(`${location.pathname}|${kind}|${count[kind]}`) * free / plants.length;
      p.style.marginLeft = snap(share) + 'px';
    }
  }

  // Always shown at the png's own size, one art pixel per png pixel, so a
  // dish drawn 16x16 by accident just comes out small. w and h (art pixels)
  // are only the size to hold until the png loads, or the gray stand-in's
  // size when there's no png.
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
    else if (!drawn) size(32, 32);
    if (drawn) {
      const fit = () => {
        if (el.naturalWidth === w && el.naturalHeight === (h || w)) return;
        size(el.naturalWidth, el.naturalHeight);
        queueAlign();
      };
      if (el.complete && el.naturalWidth) fit();
      else el.addEventListener('load', fit, { once: true });
    }
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
  // Reaching for the button starts the pngs too, in case they aren't yet.
  dexBtn.addEventListener('pointerenter', warmDex);
  bar.append(dexBtn);

  // The dex shows every item's png at once, which is a lot of little
  // requests the first time. Once the button is showing, they're fetched in
  // the background when the page is idle, so the dex opens whole. Only for
  // players who have the dex, and once per page.
  let dexWarm = false;
  function warmDex() {
    if (dexWarm) return;
    dexWarm = true;
    for (const id of DEX.dishes.concat(DEX.ingredients)) new Image().src = ART + id + '.png';
  }
  const whenIdle = f => (window.requestIdleCallback ? window.requestIdleCallback(f) : setTimeout(f, 2000));

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

  // "eat" waits for the first dish, except on things listed in eat_from_start
  // (fruit), which can be eaten raw straight away.
  const EAT_EARLY = DATA.eat_from_start || [];
  const canEatNow = id => edible(id) && (state.flags.gotDish || ITEMS[id].tags.some(t => EAT_EARLY.includes(t)));

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
    if (selected != null && canEatNow(state.inv[selected])) slots[selected].append(pop);
    dexBtn.hidden = !state.flags.ate;
    if (state.flags.ate && !dexWarm) whenIdle(warmDex);
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
    state.inv[i] = null;
    selected = null;
    ate(id, slots[i]);
  }

  // Eating something, from the inventory or off the table. The words rise
  // over `over`.
  function ate(id, over) {
    const it = ITEMS[id];
    state.eaten[id] = (state.eaten[id] || 0) + 1;
    state.flags.ate = true;
    save();
    reportNew();
    renderInv();
    sound('chew.mp3', 1.2);
    floatText((DATA.eat_text || {})[it.eat] || '...', over);
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

  // For the cursor bunnies (_includes/cursor.html): they eat vegetables,
  // fruit and tea left on the floor. Positions are in the window; the point is the
  // item's lower middle, where a bunny's feet would meet it.
  // What they'll eat: anything with one of bunny_food's tags in the yml,
  // unless the item says bunnies: false (potatoes).
  const BUNNY_TAGS = DATA.bunny_food || ['veg', 'fruit', 'tea'];
  const bunnyFood = id => ITEMS[id].bunnies !== false && ITEMS[id].tags.some(t => BUNNY_TAGS.includes(t));
  window.kitchenFood = {
    find(x, y, range) {
      let best = null, bestD = range;
      for (const f of floor) {
        if (!bunnyFood(f.id)) continue;
        const box = itemBox(f);
        const fx = f.x + box.width / 2 - window.scrollX;
        const fy = f.y + box.height * 0.75 - window.scrollY;
        const d = Math.hypot(fx - x, fy - y);
        if (d < bestD) { best = { item: f, x: fx, y: fy }; bestD = d; }
      }
      return best;
    },
    eat(f) {
      if (!floor.includes(f)) return null;
      removeFloor(f);
      sound('chew.mp3', 0.4);
      return ITEMS[f.id].tags;
    },
  };

  function groundY(f) {
    const footer = document.querySelector('.site-footer');
    const ground = footer
      ? footer.getBoundingClientRect().top + window.scrollY
      : document.documentElement.scrollHeight;
    return ground - itemBox(f).height;
  }

  // The item's drawn size in css px (its png may not match the yml's size).
  function itemBox(f) {
    const w = f.el.offsetWidth ? f.el.getBoundingClientRect().width : ITEMS[f.id].size * PX;
    const h = f.el.offsetHeight ? f.el.getBoundingClientRect().height : ITEMS[f.id].size * PX;
    return { width: w, height: h };
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
    f.x = Math.max(0, Math.min(f.x, document.documentElement.clientWidth - itemBox(f).width));
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

  // Where an item can be picked up from: an inventory slot, a station's slot,
  // the finished dish floating over a station, the table, or the floor.
  // 'held' is something already taken off the table on the server, on its
  // way to wherever it was dropped.
  function itemAt(src) {
    if (src.type === 'inv') return state.inv[src.i];
    if (src.type === 'in') return state.st[src.kind].in[src.i];
    if (src.type === 'out') return state.st[src.kind].out;
    if (src.type === 'table') return tableDish;
    if (src.type === 'held') return src.id;
    return src.f.id;
  }

  function take(src) {
    if (src.type === 'inv') state.inv[src.i] = null;
    else if (src.type === 'in') state.st[src.kind].in[src.i] = null;
    else if (src.type === 'out') state.st[src.kind].out = null;
    else if (src.type === 'floor') removeFloor(src.f);
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
    const left = e.clientX - p.offX, top = e.clientY - p.offY;
    if (p.src.type === 'table') dragOffTable(p, e.clientX, e.clientY, left, top);
    else dropAt(p, e.clientX, e.clientY, left, top);
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
    } else if (src.type === 'floor' || src.type === 'out') {
      // Picking up: only with room for it, so a dish over the pot stays put.
      if (state.inv.indexOf(null) < 0) return shake(el);
      const id = itemAt(src);
      take(src);
      sound('pop.wav', 0.5);
      give(id, r.left, r.top);
      renderStations();
    } else if (src.type === 'table') {
      // "eat" over the dish, once eating is open to this player and the
      // inventory is out to drag it to. Otherwise a click takes it, like
      // picking a plant, which brings the inventory out.
      if (!bar.hidden && canEatNow(tableDish)) { tableEatOpen = !tableEatOpen; renderTable(); }
      else takeFromTable();
    } else {
      const id = itemAt(src);
      take(src);
      give(id, r.left, r.top);
      renderStations();
    }
  }

  // False when the drop was refused and the item stayed where it came from.
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
        return true;
      }
      if (i < 0 || state.inv[i]) i = state.inv.indexOf(null);
      if (i < 0) { shake(bar); return false; }
      take(p.src);
      putInSlot(i, p.id);
      renderStations();
      return true;
    }

    // Let go right on a station or one of its slots: straight in. Anywhere
    // else it falls, and can still fall into a pot on the way down.
    if (st && st._kind === 'table') {
      placeOnTable(p.src);
      return true;
    }
    if (st) {
      const into = target.closest('.k-in');
      if (putInStation(st, p.src, into ? +into.dataset.i : null)) return true;
      shakeSlots(st);
      return false;
    }

    take(p.src);
    dropToFloor(p.id, left, top);
    save();
    renderInv();
    renderStations();
    return true;
  }

  // The dish on the table is shared, so it's taken on the server first and
  // only then goes where it was dropped. Let go back on the table: nothing
  // happens. If the drop is refused (a full inventory, a pot that won't take
  // it) it lands on the floor there instead, since it's already off the table.
  function dragOffTable(p, cx, cy, left, top) {
    const target = document.elementFromPoint(cx, cy);
    if (target && target.closest('.k-table')) return;
    const id = p.id;
    claimTable(id).then(ok => {
      if (!ok) return;
      sound('pop.wav', 0.5);
      const held = Object.assign({}, p, { src: { type: 'held', id } });
      if (!dropAt(held, cx, cy, left, top)) {
        dropToFloor(id, left, top);
        save();
      }
    });
  }

  // Clicking anywhere that isn't part of the game lets go of the selection
  // and closes an open station.
  document.addEventListener('pointerdown', e => {
    if (tableEatOpen && !e.target.closest('.k-table-dish')) { tableEatOpen = false; renderTable(); }
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
    if (def.table) return buildTable(host, kind);
    host.hidden = false;
    host.classList.add('k-station');
    host._kind = kind;

    const body = document.createElement('div');
    body.className = 'k-station-body';
    // Drawn stations use the png's own size; size: is only for the stand-in.
    const [w, h] = def.size || [32, 32];
    const look = DRAWN.has(kind) ? sprite(kind) : sprite(kind, w, h);
    body.append(look);
    // While cooking it shows <kind>covered.png, the pot with its lid on.
    const covered = DRAWN.has(kind + 'covered') ? sprite(kind + 'covered') : null;
    if (covered) {
      covered.hidden = true;
      body.append(covered);
    }
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
    // Each puff has its own speed, and every time it goes round it starts
    // from a new spot, rises a different height and maybe hops a pixel
    // sideways. Open, it comes off the water; with the lid on, it escapes
    // at the lid's two corners (art pixels in pot.png / potcovered.png).
    if (kind === 'pot') {
      const between = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
      const reroll = puff => {
        const rise = between(6, 11);
        if (host.classList.contains('k-cooking')) {
          puff.style.left = art(Math.random() < 0.5 ? between(2, 5) : between(22, 25));
          puff.style.top = art(3);
        } else {
          puff.style.left = art(between(5, 21));
          puff.style.top = '';
        }
        puff.style.setProperty('--rise', art(rise));
        puff.style.setProperty('--drift', art(between(-1, 1)));
        puff.style.animationTimingFunction = `steps(${rise}), step-end`;
      };
      for (let i = 0; i < 8; i++) {
        const puff = document.createElement('span');
        puff.className = 'k-steam';
        const dur = 1.2 + Math.random();
        puff.style.setProperty('--dur', dur.toFixed(2) + 's');
        puff.style.animationDelay = -(Math.random() * dur).toFixed(2) + 's';
        reroll(puff);
        puff._reroll = () => reroll(puff);
        puff.addEventListener('animationiteration', e => { if (e.animationName === 'k-steam') reroll(puff); });
        body.append(puff);
      }
    }
    body.addEventListener('click', () => {
      if (pressed) return;
      const st = state.st[kind];
      if (selected != null) {
        if (!putInStation(host, { type: 'inv', i: selected }, null)) shakeSlots(host);
        selected = null;
        renderInv();
      } else if (st.in.some(Boolean) && !cooking(kind)) {
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

    // The finished dish, floating over the station until it's picked up.
    const ready = document.createElement('div');
    ready.className = 'k-ready';
    ready.addEventListener('pointerdown', e => {
      if (state.st[kind].out && !cooking(kind)) startPress(e, { type: 'out', kind }, ready);
    });

    host.append(body, ready, panel);
    stationEls.push({ host, kind, body, panel, ins, inside, look, covered, ready });
  }

  const cooking = kind => (cookingUntil[kind] || 0) > Date.now();
  const PEEK = 4;   // art rows of a waiting item that show over the rim

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
        // The top PEEK rows of what's drawn show above the station's rim:
        // the box ends at the rim, and the png is moved up by the empty rows
        // over its drawing, so a dish drawn low in its png sits as deep as
        // one drawn high. Hidden until the png can be measured.
        const el = itemSprite(waiting);
        const rim = STATIONS[s.kind].rim || 8;
        const place = () => {
          const e = edges(el) || { top: 0 };
          const peek = Math.min(PEEK, el.naturalHeight - e.top);
          s.inside.style.left = `calc(50% - ${art(Math.floor(el.naturalWidth / 2))})`;
          s.inside.style.width = art(el.naturalWidth);
          s.inside.style.top = art(rim - peek);
          s.inside.style.height = art(peek);
          el.style.marginTop = art(-e.top);
          s.inside.style.visibility = '';
        };
        s.inside.append(el);
        if (el.complete && el.naturalWidth) place();
        else {
          s.inside.style.visibility = 'hidden';
          decoded(el).then(() => { if (el.parentNode === s.inside) place(); });
        }
      }
      const busy = cooking(s.kind);
      if (s.host.classList.contains('k-cooking') !== busy) {
        s.host.classList.toggle('k-cooking', busy);
        // Steam moves to the lid's corners (or back) straight away.
        s.host.querySelectorAll('.k-steam').forEach(p => p._reroll());
      }
      if (s.covered) {
        s.covered.hidden = !busy;
        s.look.hidden = busy;
      }
      // A new dish rises out of the station (k-rising), then bobs over it.
      const dish = st.out && !busy ? st.out : null;
      if (s.ready.dataset.id !== (dish || '')) {
        s.ready.dataset.id = dish || '';
        s.ready.replaceChildren();
        s.ready.classList.remove('k-rising');
        if (dish) {
          s.ready.append(itemSprite(dish));
          void s.ready.offsetWidth;
          s.ready.classList.add('k-rising');
        }
      }
      s.host.classList.toggle('k-has-ready', !!dish);
    }
  }

  // The table has no slots to open.
  function openStation(host) {
    if (openEl === host || !host.querySelector('.k-panel')) return;
    closeStation();
    openEl = host;
    host.querySelector('.k-panel').hidden = false;
  }

  // A refusal shakes the station's slots, opening them first so it shows.
  // The table, with no slots, shakes itself.
  function shakeSlots(host) {
    const slots = host.querySelectorAll('.k-panel .k-slot');
    if (!slots.length) return shake(host.querySelector('.k-station-body'));
    openStation(host);
    slots.forEach(shake);
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
    sound('pop.wav', 0.5);
    save();
    renderInv();
    renderStations();
    openStation(host);
    if (st.in[0] && st.in[1] && !st.out) cookAt(kind);
    return true;
  }

  // A falling item whose bottom passes the rim, over the mouth, goes in.
  // The rim is a few art pixels below the top of the sprite.
  function fellIntoStation(f, before) {
    const { width, height: size } = itemBox(f);
    const cx = f.x + width / 2;
    for (const s of stationEls) {
      const r = s.body.getBoundingClientRect();
      const left = r.left + window.scrollX, top = r.top + window.scrollY;
      const rim = top + 6 * PX;
      if (cx < left + 3 * PX || cx > left + r.width - 3 * PX) continue;
      if (before + size > rim || f.y + size < rim) continue;
      if (putInStation(s.host, { type: 'floor', f }, null)) return true;
    }
    // The table catches anything it would take, when it lands on the top
    // (tableTop art pixels down its png). Anything else falls past.
    if (table && !tableDish && tableTakes(f.id)) {
      const r = table.body.getBoundingClientRect();
      const left = r.left + window.scrollX, top = r.top + window.scrollY + tableTop * PX;
      if (cx >= left + PX && cx <= left + r.width - PX && before + size <= top && f.y + size >= top) {
        placeOnTable({ type: 'floor', f });
        return true;
      }
    }
    return false;
  }

  // The dish waits over the station; until it's taken, nothing else cooks
  // (ingredients can still go in and wait).
  function cookAt(kind) {
    const st = state.st[kind];
    const s = stationEls.find(x => x.kind === kind);
    if (cooking(kind) || (!st.in[0] && !st.in[1])) return;
    if (st.out) return shake(s.ready);
    const result = recipe(kind, st.in[0], st.in[1]);
    if (!result) return shakeSlots(s.host);
    // Saved straight away, so leaving mid-cook doesn't lose the dish; it's
    // waiting on the next visit.
    st.in = [null, null];
    st.out = result;
    state.made[result] = (state.made[result] || 0) + 1;
    save();
    cookingUntil[kind] = Date.now() + COOK_MS;
    sound('boil.mp3', 0.6);
    closeStation();
    renderStations();
    setTimeout(renderStations, COOK_MS);
  }

  // ── the table ─────────────────────────────────────────────────────────────

  // One thing to eat, shared by every visitor through the server
  // (shonei-server's kitchen.go). Leave something for the next person, or take
  // what's there. It goes stale after 12 hours, on the server's side. Anything
  // edible goes on it except a bad dish (the ???). If the server can't be
  // reached the table just looks empty and won't take anything.
  // localStorage kitchenApi points it at a local server for testing,
  // e.g. http://127.0.0.1:8083.
  const KITCHEN_API = (() => {
    try { return (localStorage.getItem('kitchenApi') || 'https://market.anita.garden') + '/kitchen'; }
    catch (e) { return 'https://market.anita.garden/kitchen'; }
  })();
  const TABLE_API = KITCHEN_API + '/table';
  let table = null;          // { host, body, onTop, pop }
  let tableDish = null;
  let tableEatOpen = false;  // "eat" showing over the dish
  let tableTop = 14;         // the table top's row in table.png, read from the png once it loads

  // Anything you could eat, except a bad dish (the ???).
  function tableTakes(id) {
    const it = ITEMS[id];
    return !!(it && it.eat && !(it.kind === 'dish' && it.quality === 'bad'));
  }

  function buildTable(host, kind) {
    host.hidden = false;
    host.classList.add('k-station', 'k-table');
    host._kind = kind;
    const body = document.createElement('div');
    body.className = 'k-station-body';
    const look = sprite(kind);
    body.append(look);
    // The dish sitting on the table top. Click it for "eat", drag it off to
    // take it.
    const onTop = document.createElement('div');
    onTop.className = 'k-table-dish';
    const pop = document.createElement('div');
    pop.className = 'k-pop';
    const eatIt = document.createElement('button');
    eatIt.type = 'button';
    eatIt.textContent = 'eat';
    eatIt.addEventListener('click', eatFromTable);
    pop.append(eatIt);
    host.append(body, onTop);
    table = { host, body, onTop, pop };
    // The dish stands on the table's top row, wherever that is in the png.
    decoded(look).then(() => {
      const e = edges(look);
      if (!e) return;
      tableTop = e.top;
      onTop.style.bottom = art(look.naturalHeight - e.top);
    });

    onTop.addEventListener('pointerdown', e => {
      const el = e.target.closest('.k-sprite');
      if (tableDish && el) startPress(e, { type: 'table' }, el);
    });
    body.addEventListener('click', () => {
      if (pressed || selected == null) return;
      placeOnTable({ type: 'inv', i: selected });
      selected = null;
      renderInv();
    });

    fetchTable();
    setInterval(() => { if (!document.hidden) fetchTable(); }, 60000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) fetchTable(); });
  }

  function renderTable() {
    if (!table) return;
    table.onTop.replaceChildren();
    const dish = tableDish && ITEMS[tableDish] ? tableDish : null;
    if (!dish) tableEatOpen = false;
    if (dish) {
      // Sunk by the empty rows under its lowest pixel, so every dish sits
      // right on the table however it was drawn.
      const el = itemSprite(dish);
      table.onTop.append(el);
      decoded(el).then(() => {
        const e = edges(el);
        if (e) el.style.marginBottom = art(-(el.naturalHeight - 1 - e.bottom));
      });
    }
    if (tableEatOpen) table.onTop.append(table.pop);
  }

  function tableCall(path, body) {
    return fetch(TABLE_API + path, body ? {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    } : undefined).then(r => r.json().then(d => ({ ok: r.ok, status: r.status, d })));
  }

  function fetchTable() {
    tableCall('').then(({ ok, d }) => {
      if (!ok) return;
      tableDish = d.dish || null;
      renderTable();
    }).catch(() => {});
  }

  function placeOnTable(src) {
    const id = itemAt(src);
    const it = id && ITEMS[id];
    if (!it || !tableTakes(id) || tableDish) return shakeSlots(table.host);
    // Shown at once; put back in the inventory if the server says no.
    take(src);
    tableDish = id;
    sound('pop.wav', 0.5);
    save();
    renderInv();
    renderStations();
    renderTable();
    const putBack = () => {
      const r = table.body.getBoundingClientRect();
      // To the inventory, or the floor beside the table (not back onto it).
      if (state.inv.indexOf(null) >= 0) give(id, r.left, r.top);
      else dropToFloor(id, r.right + 2 * PX, r.top - ITEMS[id].size * PX).noCatch = true;
      save();
      shakeSlots(table.host);
    };
    tableCall('', { dish: id }).then(({ ok, status, d }) => {
      if (ok) return;
      tableDish = status === 409 ? d.dish || null : null;
      renderTable();
      putBack();
    }).catch(() => {
      tableDish = null;
      renderTable();
      putBack();
    });
  }

  // Takes the dish off the table on the server. Gone from the table at once;
  // back on it, with a shake, if someone else got there first or the server
  // can't be reached. Resolves to whether it's ours.
  function claimTable(id) {
    tableDish = null;
    renderTable();
    return tableCall('/take', { dish: id }).then(({ ok, d }) => {
      if (ok) return true;
      tableDish = d.dish || null;
      renderTable();
      shake(table.body);
      return false;
    }).catch(() => {
      tableDish = id;
      renderTable();
      shake(table.body);
      return false;
    });
  }

  function takeFromTable() {
    const id = tableDish;
    if (!id) return;
    if (state.inv.indexOf(null) < 0) return shake(table.body);
    claimTable(id).then(ok => {
      if (!ok) return;
      const r = table.body.getBoundingClientRect();
      sound('pop.wav', 0.5);
      give(id, r.left, r.top);
    });
  }

  function eatFromTable() {
    const id = tableDish;
    if (!id) return;
    claimTable(id).then(ok => { if (ok) ate(id, table.body); });
  }

  // ── sounds ────────────────────────────────────────────────────────────────

  // pop.wav (picking up, putting in a pot), boil.mp3 (cooking) and chew.mp3
  // (eating). Nothing is fetched until the first time a sound is wanted.
  let audio = null;
  const sounds = {};   // file -> AudioBuffer, or the promise of one
  const VOLUME = 0.35; // all the sounds together

  // Opens the audio (browsers only allow it during a click or tap) and starts
  // loading the file. Returns a promise of the decoded sound.
  function loadSound(file) {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
    if (!sounds[file]) {
      sounds[file] = fetch(ART + file).then(r => r.arrayBuffer())
        .then(b => new Promise((ok, bad) => audio.decodeAudioData(b, ok, bad)))
        .then(buf => (sounds[file] = buf));
      sounds[file].catch(() => {});
    }
    return Promise.resolve(sounds[file]);
  }

  function sound(file, level) {
    // Never from a tab nobody is looking at.
    if (document.hidden) return;
    try {
      const play = buf => {
        const src = audio.createBufferSource(), gain = audio.createGain();
        gain.gain.value = level * VOLUME;
        src.buffer = buf;
        src.connect(gain).connect(audio.destination);
        src.start();
      };
      if (sounds[file] instanceof AudioBuffer && audio) return play(sounds[file]);
      // Still loading: play when it arrives, if that's soon.
      const asked = Date.now();
      loadSound(file).then(buf => { if (Date.now() - asked < 400) play(buf); }, () => {});
    } catch (e) {}
  }

  // The pop is wanted on the first pick, so start loading it at the first
  // touch of anything in the game.
  document.addEventListener('pointerdown', e => {
    if (sounds['pop.wav'] || !e.target.closest('.k-plant, .k-station, #k-inv, .k-floor')) return;
    try { loadSound('pop.wav'); } catch (err) {}
  }, { capture: true, passive: true });

  // ── plants ────────────────────────────────────────────────────────────────

  // A "fruit" is anything picked: an item on a plant, or for pull: plants the
  // whole plant, which vanishes until it grows back.
  const fruits = [];

  // A repeat: plant is several copies side by side (a field), each picked on
  // its own.
  function buildPlants() {
    const seen = {};
    document.querySelectorAll('.k-plant').forEach(host => {
      const kind = host.dataset.kind;
      const def = PLANTS[kind];
      if (!def) return;
      host.hidden = false;
      const copies = Math.max(1, def.repeat || 1);
      for (let c = 0; c < copies; c++) {
        const n = seen[kind] = (seen[kind] || 0) + 1;
        buildPlant(host, def, `${location.pathname}|${kind}|${n}`, c);
      }
    });
  }

  // The first and last rows of a png with any pixel in them, read once per
  // png. Null if it can't be read.
  const edgeCache = {};
  function edges(img) {
    if (edgeCache[img.src] !== undefined) return edgeCache[img.src];
    let found = null;
    try {
      const w = img.naturalWidth, h = img.naturalHeight;
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const px = ctx.getImageData(0, 0, w, h).data;
      const filled = y => { for (let x = 0; x < w; x++) if (px[(y * w + x) * 4 + 3]) return true; return false; };
      let top = 0, bottom = h - 1;
      while (top < h && !filled(top)) top++;
      while (bottom > top && !filled(bottom)) bottom--;
      if (top < h) found = { top, bottom };
    } catch (e) {}
    return (edgeCache[img.src] = found);
  }

  const decoded = img => (img.decode ? img.decode() : Promise.resolve()).catch(() => {});

  function buildPlant(host, def, key, copy) {
    const regrow = (def.regrow || 5) * 60000;
    // One plant's picture, with its fruits and sway bands on top.
    const pic = document.createElement('span');
    pic.className = 'k-plant-art';
    if (def.lift) pic.style.top = `calc(${-def.lift} * var(--kpx))`;
    const plant = def.bare ? itemSprite(def.item) : sprite(def.png);
    pic.append(plant);
    host.append(pic);
    if (def.sway && plant.tagName === 'IMG') decoded(plant).then(() => sway(pic, plant, def.png, copy));
    if (def.bees && DRAWN.has('bee') && plant.tagName === 'IMG') decoded(plant).then(() => addBees(pic, plant, def.bees));

    if (def.stalks && DRAWN.has(def.item + 'onplant')) {
      buildStalks(pic, def, key, regrow);
      return;
    }

    if (def.pull || def.bare) {
      pic.classList.add('k-pull');
      const fr = { key, id: def.item, el: pic, regrow };
      pic.addEventListener('click', () => harvest(fr));
      fruits.push(fr);
      return;
    }

    // Spots are fruit centers. The fruit is <item>onplant.png if there is
    // one (any size), otherwise the item's own sprite.
    const onPlant = DRAWN.has(def.item + 'onplant') ? def.item + 'onplant' : null;
    const mine = [];
    (def.spots || []).forEach(([cx, cy], s) => {
      // The wrapper bobs; the sprite inside may be mirrored.
      const el = document.createElement('span');
      el.className = 'k-fruit';
      el.style.animationDelay = -(Math.random() * 2.4).toFixed(2) + 's';
      const img = onPlant ? sprite(onPlant) : itemSprite(def.item);
      el.append(img);
      const place = (w, h) => {
        el.style.left = art(cx - Math.floor(w / 2));
        el.style.top = art(cy - Math.floor(h / 2));
      };
      place(ITEMS[def.item].size, ITEMS[def.item].size);
      if (img.tagName === 'IMG') decoded(img).then(() => place(img.naturalWidth, img.naturalHeight));
      const fr = { key: `${key}|${s}`, id: def.item, el, regrow };
      el.addEventListener('click', () => harvest(fr));
      pic.append(el);
      fruits.push(fr);
      mine.push([cx, el]);
    });
    // Fruits are drawn with the stem to the top left, which suits the right
    // side of a plant. Left third: mirrored. Middle third: either.
    decoded(plant).then(() => {
      const third = plant.naturalWidth / 3;
      for (const [cx, el] of mine) {
        const flip = cx < third || (cx < 2 * third && Math.random() < 0.5);
        el.firstChild.classList.toggle('k-mirror', flip);
      }
    });
  }

  // stalks: <item>onplant.png is drawn the same size as the plant, with
  // separate stalks (pieces that don't touch). Each one is picked on its own
  // and sways on its own, some stiffer than others. The plant behind is still.
  function buildStalks(pic, def, key, regrow) {
    pic.classList.add('k-pull');
    // Held hidden in the row so the row waits for it to load.
    const src = sprite(def.item + 'onplant');
    src.style.display = 'none';
    pic.append(src);
    const mine = [];
    let label = null, width = 0;
    decoded(src).then(() => {
      const split = splitPieces(src);
      if (!split) return;
      ({ label, width } = split);
      split.pieces.forEach((p, i) => {
        const el = stalkElement(split, p);
        const fr = { key: `${key}|${i}`, id: def.item, el, regrow };
        pic.append(el);
        fruits.push(fr);
        mine.push(fr);
      });
      renderFruits();
    });
    // Clicks go by which stalk's pixels are under the pointer (or right next
    // to it), since their boxes overlap.
    pic.addEventListener('click', e => {
      if (!label) return;
      const r = pic.getBoundingClientRect();
      const x = Math.floor((e.clientX - r.left) / PX), y = Math.floor((e.clientY - r.top) / PX);
      for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
        const i = label[(y + dy) * width + (x + dx)];
        if (x + dx < 0 || x + dx >= width || i == null || i < 0) continue;
        if (grown(mine[i])) { harvest(mine[i]); return; }
      }
    });
  }

  // Splits a png into its separate pieces (pixels touching, corners count).
  // Specks of a few pixels join the nearest piece.
  function splitPieces(img) {
    let px;
    const w = img.naturalWidth, h = img.naturalHeight;
    try {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      px = ctx.getImageData(0, 0, w, h).data;
    } catch (e) { return null; }
    const label = new Int32Array(w * h).fill(-1);
    let pieces = [];
    for (let start = 0; start < w * h; start++) {
      if (!px[start * 4 + 3] || label[start] >= 0) continue;
      const piece = { cells: [], x0: w, y0: h, x1: 0, y1: 0 };
      const stack = [start];
      label[start] = pieces.length;
      while (stack.length) {
        const i = stack.pop();
        const x = i % w, y = (i - x) / w;
        piece.cells.push(i);
        piece.x0 = Math.min(piece.x0, x); piece.x1 = Math.max(piece.x1, x);
        piece.y0 = Math.min(piece.y0, y); piece.y1 = Math.max(piece.y1, y);
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx, ny = y + dy, n = ny * w + nx;
            if (nx < 0 || ny < 0 || nx >= w || ny >= h || label[n] >= 0 || !px[n * 4 + 3]) continue;
            label[n] = pieces.length;
            stack.push(n);
          }
        }
      }
      pieces.push(piece);
    }
    const big = pieces.filter(p => p.cells.length >= 8);
    for (const p of pieces) {
      if (p.cells.length >= 8 || !big.length) continue;
      const cx = (p.x0 + p.x1) / 2, cy = (p.y0 + p.y1) / 2;
      const near = big.reduce((a, b) =>
        Math.hypot((a.x0 + a.x1) / 2 - cx, (a.y0 + a.y1) / 2 - cy) <= Math.hypot((b.x0 + b.x1) / 2 - cx, (b.y0 + b.y1) / 2 - cy) ? a : b);
      near.cells.push(...p.cells);
      near.x0 = Math.min(near.x0, p.x0); near.x1 = Math.max(near.x1, p.x1);
      near.y0 = Math.min(near.y0, p.y0); near.y1 = Math.max(near.y1, p.y1);
    }
    if (big.length) pieces = big;
    pieces.forEach((p, i) => { for (const c of p.cells) label[c] = i; });
    return { px, width: w, label, pieces };
  }

  // One stalk: its pixels cut into a still bottom and one or two leaning
  // bands on top. Stiff stalks lean 1 pixel at the very top; loose ones 2.
  function stalkElement(split, p) {
    const { px, width: w } = split;
    const bw = p.x1 - p.x0 + 1, bh = p.y1 - p.y0 + 1;
    const stiff = Math.random() < 0.4;
    const cuts = stiff
      ? [[0, Math.round(bh * 0.35), 'k-sway-mid'], [Math.round(bh * 0.35), bh, '']]
      : [[0, Math.round(bh * 0.25), 'k-sway-top'], [Math.round(bh * 0.25), Math.round(bh * 0.5), 'k-sway-mid'], [Math.round(bh * 0.5), bh, '']];
    const mine = new Set(p.cells);
    const el = document.createElement('span');
    el.className = 'k-stalk';
    el.style.left = art(p.x0);
    el.style.top = art(p.y0);
    el.style.width = art(bw);
    el.style.height = art(bh);
    const duration = (3 + Math.random() * 2.5).toFixed(2) + 's';
    // Left to right, so a gust sweeps across the plant.
    const delay = (p.x0 * 0.03 + Math.random() * 0.3).toFixed(2) + 's';
    for (const [r0, r1, cls] of cuts) {
      if (r1 <= r0) continue;
      const c = document.createElement('canvas');
      c.width = bw;
      c.height = r1 - r0;
      const ctx = c.getContext('2d');
      const out = ctx.createImageData(bw, r1 - r0);
      for (let y = r0; y < r1; y++) {
        for (let x = 0; x < bw; x++) {
          const i = (p.y0 + y) * w + p.x0 + x;
          if (!mine.has(i)) continue;
          const o = ((y - r0) * bw + x) * 4;
          for (let k = 0; k < 4; k++) out.data[o + k] = px[i * 4 + k];
        }
      }
      ctx.putImageData(out, 0, 0);
      const band = document.createElement('span');
      band.className = ('k-band ' + cls).trim();
      band.style.top = art(r0);
      band.style.height = art(r1 - r0);
      band.style.animationDuration = duration;
      band.style.animationDelay = delay;
      c.className = 'k-sprite';
      c.style.width = art(bw);
      c.style.height = art(r1 - r0);
      band.append(c);
      el.append(band);
    }
    return el;
  }

  // ── bees ──────────────────────────────────────────────────────────────────

  // bee.png is two frames side by side. Bees start near their plant, drift
  // about at random with a light pull back toward it, and face the way they
  // fly. One loop for all of them, running only while a plant with bees is
  // on screen.
  const bees = [];
  let beesRunning = false, beeLast = 0;
  const beesShown = new Set();
  // The cursor pulls bees too, the same way, once it's within reach.
  const BEE_CURSOR_REACH = 80;   // art pixels
  let cursor = null;             // in the window
  document.addEventListener('pointermove', e => { cursor = { x: e.clientX, y: e.clientY }; }, { passive: true });
  document.addEventListener('pointerleave', () => { cursor = null; });

  // How far a pull reaches for: nothing within 16 art pixels, so bees mill
  // around a spot instead of sitting on it.
  const beePull = (dx, dy) => (Math.hypot(dx, dy) > 16 ? 0.5 : 0);

  function addBees(pic, plant, opts) {
    const count = typeof opts === 'object' ? opts.count || 3 : Number(opts) || 3;
    const facesLeft = typeof opts === 'object' && opts.faces === 'left';
    const home = { x: plant.naturalWidth / 2 - 4, y: plant.naturalHeight * 0.45 - 4 };
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'k-bee';
      el.style.animationDelay = -(Math.random() * 0.2).toFixed(2) + 's';
      pic.append(el);
      const a = Math.random() * Math.PI * 2;
      bees.push({
        el, pic, home, facesLeft, left: false,
        x: home.x + Math.cos(a) * 10, y: home.y + Math.sin(a) * 8,
        vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20,
      });
    }
    placeBees();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        for (const e of entries) {
          if (e.isIntersecting) beesShown.add(e.target); else beesShown.delete(e.target);
        }
        startBees();
      }).observe(pic);
    } else {
      beesShown.add(pic);
      startBees();
    }
  }

  function startBees() {
    if (beesRunning || !beesShown.size) return;
    beesRunning = true;
    beeLast = performance.now();
    requestAnimationFrame(beeFrame);
  }

  function beeFrame(now) {
    if (!beesShown.size) { beesRunning = false; return; }
    const dt = Math.min(0.05, (now - beeLast) / 1000);
    beeLast = now;
    const origins = new Map();
    for (const b of bees) {
      if (!beesShown.has(b.pic)) continue;
      // art pixels per second: a random jostle, drag, and pulls toward home
      // and toward the cursor when it's near
      let fx = (Math.random() - 0.5) * 320, fy = (Math.random() - 0.5) * 320;
      const hx = b.home.x - b.x, hy = b.home.y - b.y;
      fx += hx * beePull(hx, hy);
      fy += hy * beePull(hx, hy) * 1.3;
      if (cursor) {
        if (!origins.has(b.pic)) origins.set(b.pic, b.pic.getBoundingClientRect());
        const r = origins.get(b.pic);
        const cx = (cursor.x - r.left) / PX - 4 - b.x, cy = (cursor.y - r.top) / PX - 4 - b.y;
        if (Math.hypot(cx, cy) < BEE_CURSOR_REACH) {
          fx += cx * beePull(cx, cy);
          fy += cy * beePull(cx, cy) * 1.3;
        }
      }
      b.vx += fx * dt;
      b.vy += fy * dt;
      b.vx *= 1 - 1.2 * dt;
      b.vy *= 1 - 1.2 * dt;
      const speed = Math.hypot(b.vx, b.vy);
      if (speed > 28) { b.vx *= 28 / speed; b.vy *= 28 / speed; }
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      // Turn only on a clear change of direction, so it doesn't flicker.
      if (b.vx < -3) b.left = true;
      else if (b.vx > 3) b.left = false;
    }
    placeBees();
    requestAnimationFrame(beeFrame);
  }

  function placeBees() {
    for (const b of bees) {
      const flip = b.left !== b.facesLeft ? ' scaleX(-1)' : '';
      b.el.style.transform = `translate(${Math.round(b.x) * PX}px, ${Math.round(b.y) * PX}px)${flip}`;
    }
  }

  // Wind: the top quarter of what's drawn leans up to 2 art pixels, the next
  // quarter 1, the rest stays. Copies in a field start a little after one
  // another, so a gust sweeps across. The plant is redrawn as three stacked
  // bands (the original stays, hidden, for size and clicks).
  function sway(box, plant, png, copy) {
    const w = plant.naturalWidth, h = plant.naturalHeight;
    const top = firstDrawnRow(plant);
    const drawn = h - top;
    const cuts = [0, top + Math.round(drawn / 4), top + Math.round(drawn / 2), h];
    plant.style.visibility = 'hidden';
    ['k-sway-top', 'k-sway-mid', ''].forEach((cls, i) => {
      const band = document.createElement('span');
      band.className = ('k-band ' + cls).trim();
      band.style.top = art(cuts[i]);
      band.style.height = art(cuts[i + 1] - cuts[i]);
      band.style.animationDelay = (copy * 0.15) + 's';
      const img = sprite(png, w, h);
      img.style.top = art(-cuts[i]);
      band.append(img);
      box.append(band);
    });
  }

  function firstDrawnRow(img) {
    try {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const px = ctx.getImageData(0, 0, c.width, c.height).data;
      for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) if (px[(y * c.width + x) * 4 + 3]) return y;
      }
    } catch (e) {}
    return 0;
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
    sound('pop.wav', 0.5);
    give(fr.id, r.left, r.top);
    renderInv();
  }

  // ── how many people ate each item ─────────────────────────────────────────

  // The server (shonei-server's kitchen.go) keeps the counts. Each browser
  // reports an item once, the first time it eats it, so a count is people,
  // not bites. state.reported remembers what was sent; anything eaten before
  // this existed goes up on the next visit. A failed report is simply tried
  // again next time. (The server also counts found and made; the dex doesn't
  // show them, so nothing sends them now.)
  const SEEN_PER_REPORT = 40;   // the server's cap
  let reporting = false;
  function reportNew() {
    if (reporting) return;
    const todo = [];
    for (const kind of ['eaten']) {
      for (const id in state[kind]) {
        if (ITEMS[id] && state[kind][id] > 0 && !state.reported[kind + ':' + id]) todo.push([kind, id]);
      }
    }
    if (!todo.length) return;
    const batch = todo.slice(0, SEEN_PER_REPORT);
    const body = { eaten: [] };
    for (const [kind, id] of batch) body[kind].push(id);
    reporting = true;
    fetch(KITCHEN_API + '/seen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(r => {
      reporting = false;
      if (!r.ok) return;
      for (const [kind, id] of batch) state.reported[kind + ':' + id] = true;
      save();
      if (todo.length > batch.length) reportNew();
    }).catch(() => { reporting = false; });
  }

  // { eaten: {id: n}, ... }, or null while it hasn't come.
  let stats = null;
  function fetchStats() {
    return fetch(KITCHEN_API + '/stats')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d && d.eaten) stats = d; })
      .catch(() => {});
  }

  // ── dex ───────────────────────────────────────────────────────────────────

  const dex = document.createElement('div');
  dex.id = 'k-dex';
  dex.hidden = true;
  dex.addEventListener('pointerdown', e => { if (e.target === dex) closeDex(); });

  // Made (a dish) or found (an ingredient): what the star counts.
  function count(id) {
    return ITEMS[id].kind === 'dish' ? state.made[id] || 0 : state.found[id] || 0;
  }
  // In the dex once it's been made, found or eaten: a dish taken off the
  // table and eaten counts, though this player never cooked it.
  const known = id => count(id) > 0 || (state.eaten[id] || 0) > 0;

  // Known ones first, then silhouettes, each group in the yml's order.
  function dexGrid(ids, detail) {
    const grid = document.createElement('div');
    grid.className = 'k-grid';
    const seen = ids.filter(known);
    const unseen = ids.filter(id => !known(id));
    for (const id of seen.concat(unseen)) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'k-cell';
      cell.append(itemSprite(id));
      if (!known(id)) {
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

  // What the detail box is showing, so the people count can be added when it
  // arrives after the box opened.
  let shown = null;
  function showDetail(detail, id) {
    shown = { detail, id };
    const it = ITEMS[id];
    const n = count(id);
    const verb = it.kind === 'dish' ? 'made' : 'found';
    const name = document.createElement('div');
    name.className = 'k-name';
    name.textContent = it.name;
    const words = document.createElement('div');
    words.append(name);
    // Only the counts this player has: a dish they only ate shows "eaten".
    const ate = state.eaten[id] || 0;
    if (n > 0 || !ate) {
      const line = document.createElement('div');
      line.textContent = verb + ': ' + n;
      if (it.kind === 'dish' && n >= 3) line.append(' ', star());
      words.append(line);
    }
    if (ate) {
      const line = document.createElement('div');
      line.textContent = 'eaten: ' + ate;
      words.append(line);
    }
    // Only for things that can be eaten, or that someone has eaten anyway.
    if (stats && (edible(id) || stats.eaten[id])) {
      // This player counts even if their report hasn't got through yet.
      const people = Math.max(stats.eaten[id] || 0, state.eaten[id] ? 1 : 0);
      const all = document.createElement('div');
      all.className = 'k-people';
      all.textContent = `${people} ${people === 1 ? 'person has' : 'people have'} eaten this`;
      words.append(all);
    }
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
    // "?" swaps the grids for a few lines on how the game works, and back.
    const help = document.createElement('button');
    help.type = 'button';
    help.className = 'k-close k-helpbtn';
    help.setAttribute('aria-label', 'help');
    help.textContent = '?';
    const about = helpText();
    about.hidden = true;
    const grids = [dexGrid(DEX.dishes, detail), dexGrid(DEX.ingredients, detail)];
    help.addEventListener('click', () => {
      about.hidden = !about.hidden;
      for (const g of grids) g.hidden = !about.hidden;
      detail.hidden = !about.hidden || !shown;
    });
    box.append(close, help, about, ...grids, detail);
    dex.replaceChildren(box);
    dex.hidden = false;
    fetchStats().then(() => { if (shown && !dex.hidden && dex.contains(shown.detail)) showDetail(shown.detail, shown.id); });
  }

  function helpText() {
    const el = document.createElement('div');
    el.className = 'k-about';
    const title = document.createElement('div');
    title.className = 'k-name';
    title.textContent = 'cooking!';
    const find = document.createElement('p');
    const home = document.createElement('a');
    home.href = '/';
    home.textContent = 'home';
    find.append('find ingredients scattered around anita.garden and cook them at ', home, '.');
    const shared = document.createElement('p');
    shared.textContent = 'the table is shared. so if you put something on the table someone else may eat it.';
    el.append(title, find, shared);
    return el;
  }

  function closeDex() {
    dex.hidden = true;
    dex.replaceChildren();
    shown = null;
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
  // The room drawn behind the stations (room: in the yml). Stations listed in
  // its at: stand on its floor (floor: rows up from the bottom), that many
  // art pixels from its left edge, and decor pngs stand on the floor behind
  // them. Null when there's no room png, or none of these stations has a
  // place in it.
  function buildRoom(stations) {
    const def = DATA.room;
    if (!def || !DRAWN.has(def.png)) return null;
    const placed = stations.filter(h => def.at && def.at[h._kind] != null);
    if (!placed.length) return null;
    const room = document.createElement('div');
    room.className = 'k-room';
    room.style.setProperty('--k-floor', art(def.floor || 0));
    room.append(sprite(def.png));
    for (const d of def.decor || []) {
      if (!DRAWN.has(d.png)) continue;
      const el = sprite(d.png);
      el.classList.add('k-room-thing');
      el.style.left = art(d.at);
      room.append(el);
    }
    for (const h of placed) {
      h.classList.add('k-room-thing');
      h.style.left = art(def.at[h._kind]);
      room.append(h);
    }
    return room;
  }

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
    // Stations first, so they stay in the corner whatever the page order.
    // The ones with a place in the room go into it, and the room goes first.
    const sorted = [...hosts].sort((a, b) => a.classList.contains('k-plant') - b.classList.contains('k-plant'));
    const room = buildRoom(sorted.filter(h => h.classList.contains('k-station')));
    if (room) groundRow.append(room);
    sorted.forEach(h => { if (!h.parentNode || !h.parentNode.classList || !h.parentNode.classList.contains('k-room')) groundRow.append(h); });
    groundRow.append(bar);
    wrap.append(groundRow);
    ground.append(wrap);
    return () => footer.before(ground);
  }

  // The row goes into the page only once its pngs have loaded and sized
  // themselves, so the page changes height once instead of jumping as each
  // one arrives.
  function whenLoaded(root, then) {
    const waits = [...root.querySelectorAll('img')].filter(i => !i.complete).map(i =>
      new Promise(r => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }));
    const timeout = new Promise(r => setTimeout(r, 2000));
    // The setTimeout lets each sprite's own load handler (which sets its
    // size) run first.
    Promise.race([Promise.all(waits), timeout]).then(() => setTimeout(then, 0));
  }

  function start() {
    setScale();
    document.body.append(floorLayer, layer, dex);
    buildPlants();
    document.querySelectorAll('.k-station-host').forEach(buildStation);
    const placeGround = buildGround();
    renderFruits();
    renderInv();
    renderStations();
    reportNew();
    if (placeGround) {
      whenLoaded(groundRow, () => {
        placeGround();
        align();
      });
    }
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
