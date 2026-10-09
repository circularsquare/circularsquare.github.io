/* noritetsu — sharing a view-only map by link.

   THE RIDES TRAVEL IN THE LINK ITSELF (Anita, 2026-10-07: "if long link is viable lets try
   that first"). The site is static, so there is nowhere to store a shared set; instead the
   rides, stars and list orders are packed as JSON, deflated (CompressionStream), and put in
   the URL's hash as base64url: index.html#s=<data>. The hash never reaches a server. A few
   hundred rides come to a few KB of link. A short link (?s=abc12) would need a small store
   (a Cloudflare Worker); this file keeps the packing so that can be added later.

   OPENING A LINK is view-only: the shared rides replace the reader's in memory only, every
   save is switched off (so the reader's own rides in this browser are untouched), and the
   controls that change rides are hidden (body.viewonly). Notes are left out of the link;
   they may be private. Loaded after the main script, whose top-level names it uses. */
(function () {
  const HASH_KEY = 's';

  const toB64 = bytes => {
    let s = '';
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  const fromB64 = s => {
    const b = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
    const out = new Uint8Array(b.length);
    for (let i = 0; i < b.length; i++) out[i] = b.charCodeAt(i);
    return out;
  };
  async function through(stream, bytes) {
    const res = new Response(new Blob([bytes]).stream().pipeThrough(stream));
    return new Uint8Array(await res.arrayBuffer());
  }

  // One ride, short keys, nothing the build can work out again.
  const pack1 = r => {
    const o = { l: r.line, f: r.from, t: r.to, g: r.region };
    if (r.date) o.d = r.date;
    if (r.whole) o.w = 1;
    if (r.around) o.a = 1;
    if (r.regions) o.gs = r.regions;
    if (r.cuts) o.c = r.cuts;
    if (r.wholeOf) o.wo = r.wholeOf;
    if (r.added) o.ad = r.added.slice(0, 16);   // keeps trips grouped as they were
    return o;
  };
  const unpack1 = (o, i) => {
    const r = { id: 'x' + i, line: o.l, from: o.f, to: o.t, region: o.g, date: o.d || '',
                note: '', added: o.ad ? o.ad + ':00.000Z' : '' };
    if (o.w) r.whole = true;
    if (o.a) r.around = true;
    if (o.gs) r.regions = o.gs;
    if (o.c) r.cuts = o.c;
    if (o.wo) r.wholeOf = o.wo;
    return r;
  };

  async function packAll() {
    const json = JSON.stringify({ v: 1, r: RIDES.map(pack1), s: STARS, o: ORDERS });
    const bytes = new TextEncoder().encode(json);
    return toB64(await through(new CompressionStream('deflate-raw'), bytes));
  }

  // The link for this browser's rides, copied, and shown so it can be copied by hand too.
  async function shareLink() {
    if (typeof CompressionStream === 'undefined') {
      alert('This browser cannot make a share link.');
      return;
    }
    const data = await packAll();
    const url = `${location.origin}${location.pathname}#${HASH_KEY}=${data}`;
    let copied = false;
    try { await navigator.clipboard.writeText(url); copied = true; } catch (e) { }
    let box = document.getElementById('sharebox');
    if (!box) {
      box = document.createElement('div');
      box.id = 'sharebox';
      document.body.appendChild(box);
    }
    box.innerHTML = `<p>${copied ? 'Link copied.' : 'Copy this link.'} Anyone with it can see `
      + `your rides and percentages, but not change them. Notes are left out.</p>`
      + `<textarea readonly rows="4"></textarea>`
      + `<p class="muted">${(url.length / 1024).toFixed(1)} KB, ${RIDES.length} rides.</p>`
      + `<div class="btnrow"><button class="act" onclick="document.getElementById('sharebox').remove()">close</button></div>`;
    const ta = box.querySelector('textarea');
    ta.value = url;
    ta.focus();
    ta.select();
  }
  window.shareLink = shareLink;

  const style = document.createElement('style');
  style.textContent = `
    #sharebox { position: absolute; top: 60px; right: 354px; z-index: 6; width: 360px;
      background: var(--glass-strong); border: 1px solid var(--g2c); padding: 10px 12px;
      font-size: 12.5px; color: var(--gcc); }
    #sharebox p { margin: 0 0 8px; }
    #sharebox textarea { width: 100%; font: 11px monospace; background: var(--g14);
      color: var(--gdd); border: 1px solid var(--g2c); resize: none; }
    #viewbar { display: none; padding: 8px 14px; border-bottom: 1px solid var(--g1e);
      font-size: 12px; color: var(--g9a); }
    #viewbar a { color: var(--gee); }
    body.viewonly #viewbar { display: block; }
    body.viewonly button.star, body.viewonly #addbar, body.viewonly #undobar,
    body.viewonly button.act.del, body.viewonly .ride .edit,
    body.viewonly [onclick^="rideWhole"], body.viewonly [onclick^="startTrace"],
    body.viewonly [onclick^="exportRides"], body.viewonly [onclick*="importfile"],
    body.viewonly [onclick^="rideOperator"], body.viewonly [onclick^="shareLink"],
    body.viewonly #opdate { display: none !important; }
    @media (max-width: 720px) { #sharebox { right: 14px; left: 14px; width: auto; } }`;
  document.head.appendChild(style);

  // ---- opening a shared link
  const m = new RegExp(`[#&]${HASH_KEY}=([A-Za-z0-9_-]+)`).exec(location.hash);
  if (!m) return;
  window.VIEW_ONLY = true;
  document.body.classList.add('viewonly');
  // Nothing the reader does here is kept: their own rides in this browser stay as they were.
  saveRides = function () { };
  saveStars = function () { };
  saveOrders = function () { };
  RIDES = [];
  STARS = [];
  const bar = document.createElement('div');
  bar.id = 'viewbar';
  bar.innerHTML = `Someone's shared rides, to look at. <a href="${location.pathname}">Open your own map</a>`;
  const head = document.getElementById('panel-head');
  head.parentNode.insertBefore(bar, head.nextSibling);
  render();

  (async () => {
    try {
      const bytes = await through(new DecompressionStream('deflate-raw'), fromB64(m[1]));
      const d = JSON.parse(new TextDecoder().decode(bytes));
      RIDES = (d.r || []).map(unpack1);
      STARS = Array.isArray(d.s) ? d.s : [];
      ORDERS = d.o && typeof d.o === 'object' ? d.o : {};
    } catch (e) {
      bar.textContent = 'This share link could not be read. It may have been cut short when it was copied.';
      return;
    }
    await REGIONS_READY;
    const ccs = [...new Set(RIDES.flatMap(rideRegions))].filter(cc => REGIONS[cc]);
    await Promise.all(ccs.map(cc => loadRegion(cc).catch(() => null)));
    for (const r of RIDES) migrateRide(r);
    // The camera goes to the shared rides: the box round every ride's two ends.
    let w = 180, s = 90, e = -180, n = -90;
    for (const r of RIDES) for (const id of [r.from, r.to]) {
      const st = STATIONS[id];
      if (!st) continue;
      w = Math.min(w, st.x); e = Math.max(e, st.x); s = Math.min(s, st.y); n = Math.max(n, st.y);
    }
    const go = () => { if (w < e) map.fitBounds([[w, s], [e, n]], { padding: 60, duration: 0, maxZoom: 12 }); };
    if (mapReady) go(); else map.once('load', go);
    HOME_TAB = 'country';
    afterChange();
  })();
})();
