---
layout: page
title: cities
permalink: /thoughts/cities/
---

<div class="cities">
<div class="cities-text" markdown="1">

i write this while looking up at the tower of [seybrook](/places/seybrook/). it was put up five years ago. from my home, it looks like a hazy distant anachronism, intruding into my [dreams](/thoughts/internalworld/). from here, it looks like a shimmering god in the twilight. 

i like cities. most of my [maps](/projects/) are essentially dedicated to illustrating the shape of cities. which for most people, means the shape of people. the shape of [population](/na1m/) or [demographics](/languagedots/) or [motion](/nycriders/). in my opinion, a [travel demand matrix](/trainsworld/) is one of the closest things we can get to the true shape of a city.

the approach to the tower of seybrook, the valley formed by the nearby smaller towers, feels surprisingly light. there are few people on the street. there are empty [chipotles](/thoughts/food/) and cavas. it is glittering, scintillating, celadon. there is no outward suggestion of the overhelming gravity that this place holds. 

this gravity exists only in higher planes. which is why it was so confusing for me as a child to visit downtown [lindor](/places/lindor/). now that i'm older and have spent more of my life immersed in data, i can finally answer the question of "what is it that people actually *do* in these buildings?" and i like it, and i make maps of it.

but now is a time of extrapolating curves. let's extrapolate this curve too. as everything flows [upstream](/thoughts/trancin/), and smaller, lower cities disintegrate, high cities grow ever taller. my home city of [lindor](/places/lindor/) once seemed to me like the highest of them all, and thus immune. but as cities grow taller, they also get further away, more rarified, more abstract. their shapes will not occupy storefronts, train tracks, or websites. [their inhabitants](/thoughts/ai/) will be incomprehensible. 

and i will be like a child again.


</div>
<div class="tower" id="tower" aria-hidden="true"></div>
</div>

<style>
  /* text on the left, tower beside it; on a narrow screen the tower drops below */
  .cities { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 1em 3em; }
  /* the text takes whatever width the tower leaves */
  .cities-text { flex: 1 1 20em; }
  .tower {
    font-family: Georgia, serif;
    font-size: 14px;
    line-height: 1;
    user-select: none;
  }
  .tower div { text-align: center; white-space: pre; }
  /* every letter gets the same box, so the outline stays straight */
  .tower span { display: inline-block; width: 0.75em; text-align: center; opacity: 0; }
</style>

<script>
(function () {
  const WORDS = ('glittering gleaming glowing glinting glass glossy glistening green ' +
    'crystal shimmering sparkling shining shattering scintillating searing lucent ' +
    'prismatic celadon opalescent').split(' ');
  const SHORTEST = Math.min(...WORDS.map((w) => w.length));
  // light blue, blue green, dark blue, dark blue green
  const COLORS = ['#7db9e3', '#3aa59c', '#1f4c8a', '#195a55'];

  // Row widths from the top: [width, how many rows]. A trapezoid, half as wide
  // at the top as at the base.
  const ROWS = [[5, 10], [7, 10], [9, 10], [11, 10]]
    .flatMap(([w, n]) => Array(n).fill(w));
  const MAXW = Math.max(...ROWS);

  // How hard a letter pulls each neighbour's phase toward its own.
  const PULL_V = 0.35;  // the letters above and below
  const PULL_H = 0.02;  // the letters left and right
  const SWAP_EVERY = 0.6; // seconds between word replacements

  const tower = document.getElementById('tower');
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Fill exactly n letters with whole words. The list has every length from
  // the shortest up to double it, so any n from SHORTEST up can be made and
  // only a remainder shorter than SHORTEST is a dead end.
  function fillExact(n) {
    const out = [];
    while (n > 0) {
      const ok = WORDS.filter((w) => w.length === n || n - w.length >= SHORTEST);
      const w = pick(ok);
      out.push(w);
      n -= w.length;
    }
    return out;
  }

  // At least n letters of words; the last one gets cut off at the bottom.
  function fillAtLeast(n) {
    const out = [];
    while (n > 0) {
      const w = pick(WORDS);
      out.push(w);
      n -= w.length;
    }
    return out;
  }

  // The text is one long run of words with no spaces, running down each
  // column, left to right. Words never wrap: every column starts on a first
  // letter, and the last word in a column is cut off at the bottom.
  // words[k] = { start, word, end }, where end is where its column stops.
  const cells = [];
  ROWS.forEach((w, r) => {
    const row = document.createElement('div');
    const x0 = (MAXW - w) / 2;
    for (let c = 0; c < w; c++) {
      const span = document.createElement('span');
      row.appendChild(span);
      const x = x0 + c;
      // left facet in shade, right facet catching the light
      const side = (x + 0.5) / MAXW;
      cells.push({
        span, r, x, side,
        theta: rand(0, Math.PI * 2),
        omega: rand(0.5, 1.5),
        letter: '', next: '',
        shown: false,
      });
    }
    tower.appendChild(row);
  });
  const N = cells.length;

  const at = new Map(cells.map((c, i) => [c.r + ',' + c.x, i]));
  const near = (c, pairs) => pairs
    .map(([dr, dx]) => at.get((c.r + dr) + ',' + (c.x + dx)))
    .filter((i) => i !== undefined);
  cells.forEach((c) => {
    c.vert = near(c, [[-1, 0], [1, 0]]);
    c.horiz = near(c, [[0, -1], [0, 1]]);
  });

  // reading order: down each column, columns left to right
  const order = cells.map((c, i) => i).sort((a, b) => cells[a].x - cells[b].x || cells[a].r - cells[b].r);

  const words = [];
  for (let pos = 0; pos < N;) {
    const col = cells[order[pos]].x;
    let height = 0;
    while (pos + height < N && cells[order[pos + height]].x === col) height++;
    const end = pos + height;
    for (const word of fillAtLeast(height)) {
      words.push({ start: pos, word, end });
      pos += word.length;
    }
    pos = end;
  }
  function writeWords(from, to) {
    for (let k = from; k < to; k++) {
      const { start, word, end } = words[k];
      // one colour per word, picked by where the word starts
      const color = pickColor(cells[order[start]]);
      for (let j = 0; j < word.length && start + j < end; j++) {
        const c = cells[order[start + j]];
        c.next = word[j];
        c.nextColor = color;
      }
    }
  }
  writeWords(0, words.length);
  cells.forEach((c) => {
    c.letter = c.next; c.span.textContent = c.letter;
    c.color = c.nextColor; c.span.style.color = c.color;
  });

  // Swap a run of one or two words in the same column for different words.
  // In the middle of a column they have to fill the same total length; at the
  // bottom anything long enough will do, since it gets cut off. Letters pick
  // up their new value the next time they go dark, so a new word surfaces a
  // few letters at a time.
  function swapWords() {
    const k = Math.floor(Math.random() * words.length);
    const { start, end } = words[k];
    const sameCol = (i) => words[i] && words[i].end === end;
    const run = Math.random() < 0.5 && sameCol(k + 1) ? 2 : 1;
    const old = words.slice(k, k + run);
    const atBottom = !sameCol(k + run);
    const len = old.reduce((s, w) => s + w.word.length, 0);
    let fresh;
    for (let tries = 0; tries < 5; tries++) {
      fresh = atBottom ? fillAtLeast(end - start) : fillExact(len);
      if (fresh.join('') !== old.map((w) => w.word).join('')) break;
    }
    let pos = start;
    const repl = fresh.map((word) => { const w = { start: pos, word, end }; pos += word.length; return w; });
    words.splice(k, run, ...repl);
    writeWords(k, k + repl.length);
  }

  function pickColor(c) {
    // shaded side leans dark, lit side leans light
    const lit = Math.random() < c.side;
    return COLORS[(lit ? 0 : 2) + (Math.random() < 0.5 ? 0 : 1)];
  }

  function draw(c) {
    const s = Math.sin(c.theta);
    if (s <= 0) {
      if (c.shown) { c.shown = false; c.span.style.opacity = 0; }
      // dark: safe to change what this letter is
      if (c.letter !== c.next) { c.letter = c.next; c.span.textContent = c.letter; }
      if (c.color !== c.nextColor) { c.color = c.nextColor; c.span.style.color = c.color; }
      return;
    }
    c.shown = true;
    c.span.style.opacity = Math.pow(s, 1.6).toFixed(3);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cells.forEach((c) => { c.theta = rand(0.2, Math.PI - 0.2); draw(c); });
    return;
  }

  let last = performance.now();
  let swapClock = 0;
  const pull = new Float32Array(N);
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;

    // Each letter runs its own clock, nudged toward its neighbours' (Kuramoto
    // coupling), so short vertical streaks glint together and then drift apart.
    for (let i = 0; i < N; i++) {
      const c = cells[i];
      let p = 0;
      for (const j of c.vert) p += PULL_V * Math.sin(cells[j].theta - c.theta);
      for (const j of c.horiz) p += PULL_H * Math.sin(cells[j].theta - c.theta);
      pull[i] = p;
    }
    for (let i = 0; i < N; i++) {
      const c = cells[i];
      c.theta += dt * (c.omega + pull[i]);
      draw(c);
    }

    swapClock += dt;
    while (swapClock > SWAP_EVERY) { swapClock -= SWAP_EVERY; swapWords(); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
</script>

