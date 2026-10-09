/* noritetsu — the poster (spec §10).

   ONE IMAGE OF EVERYTHING RIDDEN, AT EVERY SCALE AT ONCE, made to be shared: pasted into a
   chat or posted, not printed (Anita, 2026-10-07: "these aren't really for printing ...
   they're more just like shareable pastable images"). A fixed width (OUT_W px), the height
   whatever the layout needs. From the top: a title and a few figures; the starred
   statistics as rings (starredStats, from the page); a main map cropped to all the riding;
   then a grid of insets, a map of each region where several lines were ridden and of each
   city with a fair amount of riding in it.

   Loaded after the page's own script, and reads its globals (map, RIDES, here, rideGids,
   geomFor, sliceLine, mergeSpans, spanOf, lineColour, stats, THEME, REGIONS, loadRegion ...).
   It changes none of them.

   HOW A PANEL IS DRAWN. A second MapLibre map, off screen, with the page's own basemap style
   (labels off), every country's track in the held-back Ridden colours, and the ridden lines
   on top, wider than on screen. It is pointed at each panel in turn and its canvas copied
   into one 2D canvas, which is the image. A panel bigger than one WebGL canvas is drawn in
   chunks.

   UNITS. The layout is in "sheet px", SHEET_W across; the image is drawn at OUT_W / SHEET_W
   device px per sheet px. Line widths and text sizes are in sheet px.

   TYPE. Three sizes and no capitals-only headings (Anita, 2026-10-07): TITLE_PX for the title,
   MID_PX for the numbers (the figures line and the numbers inside the rings), SMALL_PX for
   everything else. */
(() => {
'use strict';

// ---------------------------------------------------------------- the constants

const SHEET_W = 1200;
const OUT_W = 2400;                  // px across the saved image: sharp on a phone, pasteable
const MARGIN = 40, GAP = 14;
const TITLE_PX = 44, MID_PX = 22, SMALL_PX = 14;

/* WHICH RIDES MAKE A CITY. A ride is a city ride when its whole extent (the diagonal of its
   bounding box) is under CITY_RIDE_MAX_KM, or under CITY_KIND_MAX_KM for metro, tram, light
   rail, monorail and funicular lines. City rides whose extents come within CITY_JOIN_KM of
   each other are one city. */
const CITY_KINDS = new Set(['subway', 'light_rail', 'tram', 'monorail', 'funicular']);
const CITY_RIDE_MAX_KM = 50;
const CITY_KIND_MAX_KM = 120;
const CITY_JOIN_KM = 8;
/* EVERY CITY WITH A FAIR AMOUNT OF RIDING GETS ITS OWN MAP (Anita, 2026-10-07: "add city maps
   zoomed in on the cities that are big"): CITY_BIG_KM of riding or more, unless the city is
   most of the main map already (over CITY_OF_MAIN of its extent: a poster of one city).
   A smaller city still gets one when it holds CITY_MIN_KM and is under CITY_TRIGGER of the
   panel it would otherwise be read on (a region inset holding it, or the main map). */
const CITY_BIG_KM = 15;
const CITY_OF_MAIN = 0.5;
const CITY_MIN_KM = 4;
const CITY_TRIGGER = 0.2;
/* AND A TRIP OF ITS OWN (Anita, 2026-10-07): either way, a city gets a map only when at least
   one trip (trips(): rides saved as one journey) both began and ended inside it, "in the rough
   area that is in the inset". Inside is the city's box (its city rides' extent, widened to
   MIN_CITY_KM) padded by CITY_TRIP_PAD_KM on every side. So riding through a city, a
   Shinkansen through Nagoya, makes no city map however many km it adds. */
const CITY_TRIP_PAD_KM = 5;
/* WHICH RIDES MAKE A REGION: every ride, joined when their extents come within REGION_JOIN_KM.
   A region gets an inset when it has at least REGION_MIN_LINES lines, is under REGION_TRIGGER
   of the main map's extent, and is more than one city (its extent at least REGION_OVER_CITY
   times its biggest city's; otherwise the city's map does the job). */
const REGION_JOIN_KM = 250;
const REGION_MIN_LINES = 3;
const REGION_TRIGGER = 0.12;
const REGION_OVER_CITY = 2.5;
/* A region of fewer lines (a lone line) still gets one when it is under LONE_TRIGGER of the
   main map: one line in Virginia on a map from Tokyo to St Louis is a smudge, one line in
   Spain on a map of Europe is not. It is named after its line. */
const LONE_TRIGGER = 0.03;
/* NEIGHBOURING CITIES ARE ONE MAP (Anita, 2026-10-07: Osaka "should include kyoto ... its
   really close"). Cities whose boxes come within METRO_JOIN_KM of each other are drawn as one
   map, so long as the two together stay under METRO_MAX_KM across (corner to corner): Osaka,
   Kobe and Kyoto are one; Amsterdam and Rotterdam, 57 km apart, are two. The biggest goes
   first and takes in its neighbours, small ones included, so a city with too little riding
   for a map of its own is drawn on its neighbour's rather than left out. The map is named
   after its cities ("Osaka and Kyoto"), and the trip rule asks of the whole of it. */
const METRO_JOIN_KM = 35;
const METRO_MAX_KM = 90;
/* At most MAX_INSETS insets by the automatic rule: cities and regions first, the most ridden
   first, then lone lines. The dialog can ask for any number from 0 to INSET_CHOICE_MAX instead;
   asked for more than the rule finds, the next best come in, the most ridden first (smaller
   cities, regions of fewer lines, cities with no trip of their own), and no more than there
   are. */
const MAX_INSETS = 9;
const INSET_CHOICE_MAX = 25;
const LINE_MAP_GAIN = 2;

const FIT_PAD = 0.07;                // each side of a panel kept clear around what is ridden
const MAX_PANEL_ZOOM = 13.5;         // a tiny city inset stops zooming here
const MIN_CITY_KM = 3;               // and is never framed narrower than this
const MAIN_ASPECT = [0.42, 0.85];    // the main map's height over its width, at least and most
const INSET_ASPECT = 0.75;           // an inset's height over the width of a cell in a full row

/* Ridden track, sheet px by zoom, and a casing in the theme's background so crossings read. */
const RIDDEN_W = [1, 2.2, 5, 2.8, 8, 3.4, 11, 4.0, 14, 5.0];
const CASING_EXTRA = 2.0;

/* The starred statistics as rings, noritsubushi's way: a ring filled clockwise to the
   percentage over a faint ring of the same colour, the number inside. */
const RING_D = 92, RING_STROKE = 9, RING_CELL_W = 150, RING_TRACK_ALPHA = 0.2;
const FLAG_URL = cc => `https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${cc}.svg`;

// ---------------------------------------------------------------- geometry

const D2R = Math.PI / 180;
const mercX = lng => (lng + 180) / 360;
const mercY = lat => {
  const s = Math.sin(Math.max(-85.05, Math.min(85.05, lat)) * D2R);
  return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
};
const lngOf = x => x * 360 - 180;
const latOf = y => Math.atan(Math.sinh(Math.PI * (1 - 2 * y))) / D2R;

// Km between two lng/lat boxes [w, s, e, n] (0 where they touch), on a flat local projection.
function boxGapKm(a, b) {
  const lat = ((a[1] + a[3]) / 2 + (b[1] + b[3]) / 2) / 2;
  const dx = Math.max(0, b[0] - a[2], a[0] - b[2]) * 111.32 * Math.cos(lat * D2R);
  const dy = Math.max(0, b[1] - a[3], a[1] - b[3]) * 110.57;
  return Math.hypot(dx, dy);
}
function boxDiagKm(b) {
  const lat = (b[1] + b[3]) / 2;
  return Math.hypot((b[2] - b[0]) * 111.32 * Math.cos(lat * D2R), (b[3] - b[1]) * 110.57);
}
const boxUnion = (a, b) => (a ? [Math.min(a[0], b[0]), Math.min(a[1], b[1]),
  Math.max(a[2], b[2]), Math.max(a[3], b[3])] : b.slice());

/* Merc extent {x0, y0, x1, y1} of a lng/lat box, its west edge moved east of `west` (the main
   map's west edge, which may be east of the box when the main map crosses 180°). */
function mercExt(b, west) {
  let w = b[0], e = b[2];
  if (west != null && w < west - 1e-9) { w += 360; e += 360; }
  return { x0: mercX(w), y0: mercY(b[3]), x1: mercX(e), y1: mercY(b[1]) };
}
const extSpan = x => Math.max(x.x1 - x.x0, x.y1 - x.y0);

/* The narrowest band of longitude holding every ride: the complement of the widest gap
   between them, so a poster of Japan and California crosses the Pacific, not Europe. */
function lngBand(boxes) {
  const iv = boxes.map(b => [b[0], b[2]]).sort((p, q) => p[0] - q[0]);
  const m = [];
  for (const [w, e] of iv) {
    const last = m[m.length - 1];
    if (last && w <= last[1]) last[1] = Math.max(last[1], e);
    else m.push([w, e]);
  }
  let best = -1, at = m.length - 1;
  for (let i = 0; i < m.length; i++) {
    const next = i + 1 < m.length ? m[i + 1][0] : m[0][0] + 360;
    if (next - m[i][1] > best) { best = next - m[i][1]; at = i; }
  }
  if (at === m.length - 1) return [m[0][0], m[m.length - 1][1]];
  return [m[at + 1][0], m[at][1] + 360];
}

// ---------------------------------------------------------------- the rides

/* Every ride's drawn pieces, and the ridden features to draw (merged per line exactly as
   paintRidden does, so the poster draws what the map draws). */
async function rideRecords() {
  const rides = here();
  const ids = [...new Set(rides.map(r => r.line).filter(id => LINE_BY_ID.has(id)))];
  const geo = new Map(await Promise.all(ids.map(async id => [id, await geomFor(id)])));
  const recs = [];
  const wanted = new Map();
  for (const ride of rides) {
    const line = LINE_BY_ID.get(ride.line);
    if (!line) continue;
    const g = geo.get(line.id) || {};
    const bySec = new Map(line.sections.map(s => [s[3], s]));
    if (!wanted.has(line.id)) wanted.set(line.id, new Map());
    const m = wanted.get(line.id);
    let box = null;
    for (const vg of rideGids(ride)) {
      const [gid, lo, hi] = spanOf(vg);
      const sec = bySec.get(gid);
      const pts = sec && g[`${sec[0]}|${sec[1]}`];
      if (!pts || pts.length < 2 || !(hi > lo)) continue;
      if (!m.has(gid)) m.set(gid, []);
      m.get(gid).push([lo, hi]);
      const piece = sliceLine(pts, lo, hi);
      if (!piece) continue;
      for (const [x, y] of piece) box = boxUnion(box, [x, y, x, y]);
    }
    if (!box) continue;
    recs.push({ ride, line, box, km: rideKm(ride), cc: rideRegion(ride),
                kind: line.kind, ends: [ride.from, ride.to] });
  }
  // Heavy rail under metro, so a city's own lines read over the trunk lines through it.
  const kindRank = k => (CITY_KINDS.has(k) ? 1 : 0);
  const features = [];
  for (const [lineId, gids] of wanted) {
    const line = LINE_BY_ID.get(lineId);
    const g = geo.get(lineId) || {};
    const colour = lineColour(line);
    for (const [a, b, km, gid] of line.sections) {
      if (!gids.has(gid)) continue;
      const pts = g[`${a}|${b}`];
      if (!pts || pts.length < 2) continue;
      for (const [lo, hi] of mergeSpans(gids.get(gid), 0)) {
        const piece = hi > lo && sliceLine(pts, lo, hi);
        if (piece) features.push({ type: 'Feature',
          properties: { c: colour, l: lineId, o: kindRank(line.kind) },
          geometry: { type: 'LineString', coordinates: piece } });
      }
    }
  }
  features.sort((p, q) => p.properties.o - q.properties.o);
  return { recs, features };
}

// Single-linkage over boxes: groups of records whose boxes come within `km` of each other.
function cluster(recs, km) {
  const parent = recs.map((_, i) => i);
  const find = i => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  for (let i = 0; i < recs.length; i++)
    for (let j = i + 1; j < recs.length; j++)
      if (boxGapKm(recs[i].box, recs[j].box) <= km) parent[find(i)] = find(j);
  const groups = new Map();
  recs.forEach((r, i) => {
    const k = find(i);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(r);
  });
  return [...groups.values()].map(rs => ({
    recs: rs,
    box: rs.reduce((b, r) => boxUnion(b, r.box), null),
    km: rs.reduce((s, r) => s + r.km, 0),
    lines: new Set(rs.map(r => r.line.id)),
  }));
}

const isCityRide = r => boxDiagKm(r.box) <= (CITY_KINDS.has(r.kind) ? CITY_KIND_MAX_KM : CITY_RIDE_MAX_KM);
const contains = (outer, inner) => inner[0] >= outer[0] - 1e-9 && inner[2] <= outer[2] + 1e-9
  && inner[1] >= outer[1] - 1e-9 && inner[3] <= outer[3] + 1e-9;

// A box widened to at least `km` across each way, about its centre.
function atLeast(b, km) {
  const lat = (b[1] + b[3]) / 2;
  const dLng = km / (111.32 * Math.cos(lat * D2R)), dLat = km / 110.57;
  const cx = (b[0] + b[2]) / 2, cy = (b[1] + b[3]) / 2;
  const hw = Math.max((b[2] - b[0]) / 2, dLng / 2), hh = Math.max((b[3] - b[1]) / 2, dLat / 2);
  return [cx - hw, cy - hh, cx + hw, cy + hh];
}

function regionLabel(recs) {
  const by = new Map();
  for (const r of recs) by.set(r.cc, (by.get(r.cc) || 0) + r.km);
  const ccs = [...by.entries()].sort((a, b) => b[1] - a[1]).map(([cc]) => regionName(cc));
  return ccs.length <= 3 ? ccs.join(', ') : `${ccs.slice(0, 3).join(', ')} and ${ccs.length - 3} more`;
}
// The station most often got on or off at, the name of a city inset when the basemap gives none.
function busiestStation(recs) {
  const n = new Map();
  for (const r of recs) for (const id of r.ends) n.set(id, (n.get(id) || 0) + 1);
  const best = [...n.entries()].sort((a, b) => b[1] - a[1])[0];
  return best ? stName(best[0]) : '';
}

/* Cities joined into metro maps (METRO_JOIN_KM, METRO_MAX_KM): the biggest first, each next
   one into the first map it is near enough to, without making it too big. */
function metros(clusters) {
  const out = [];
  for (const c of [...clusters].sort((a, b) => b.km - a.km)) {
    const g = out.find(m => boxGapKm(m.box, c.box) <= METRO_JOIN_KM
      && boxDiagKm(boxUnion(m.box, c.box)) <= METRO_MAX_KM);
    if (!g) { out.push({ ...c, parts: [c], lines: new Set(c.lines) }); continue; }
    g.parts.push(c);
    g.recs = g.recs.concat(c.recs);
    g.box = boxUnion(g.box, c.box);
    g.km += c.km;
    for (const l of c.lines) g.lines.add(l);
  }
  return out;
}

/* THE PANELS: the main map, and the insets, chosen by the rules at the top. `want` is the
   number of insets asked for, or null for the automatic rule. */
function planPanels(recs, want = null) {
  const band = lngBand(recs.map(r => r.box));
  const west = band[0];
  let all = null;
  for (const r of recs) all = boxUnion(all, r.box);
  const main = { kind: 'main', ext: mercExt([band[0], all[1], band[1], all[3]]), recs };
  main.ext.x1 = mercX(band[1]);
  const mainSpan = extSpan(main.ext);

  // Every city, small ones too, joined with its neighbours; those under CITY_MIN_KM after that
  // are only ever extras.
  const cities = metros(cluster(recs.filter(isCityRide), CITY_JOIN_KM))
    .map(c => ({ ...c, kind: 'city', core: c.box, box: atLeast(c.box, MIN_CITY_KM) }));
  const regions = cluster(recs, REGION_JOIN_KM).map(c => ({ ...c, kind: 'region' }));

  const picked = [], extra = [];
  const coversMain = p => extSpan(p.ext) >= 0.9 * mainSpan;   // a second copy of the main map
  for (const g of regions) {
    g.ext = mercExt(g.box, west);
    const inside = cities.filter(c => contains(g.box, c.core));
    const biggest = Math.max(0, ...inside.map(c => extSpan(mercExt(c.box, west))));
    g.lone = g.lines.size < REGION_MIN_LINES;
    // A lone line is named after its line; several, after their countries.
    if (g.lone) {
      const top = [...g.lines].map(id => LINE_BY_ID.get(id)).filter(Boolean)
        .sort((a, b) => b.km - a.km)[0];
      g.name = top ? lineName(top) : regionLabel(g.recs);
    } else g.name = regionLabel(g.recs);
    // No more than one city: the city's map is the same map.
    if (coversMain(g) || (biggest && extSpan(g.ext) < REGION_OVER_CITY * biggest)) continue;
    const auto = !(g.lone && extSpan(g.ext) >= LONE_TRIGGER * mainSpan)
      && extSpan(g.ext) < REGION_TRIGGER * mainSpan;
    (auto ? picked : extra).push(g);
  }
  // The map a city is framed on: a region of several lines holding it, or the main map.
  const parentOf = (c, pool) => pool.find(g => g.kind === 'region' && !g.lone && contains(g.box, c.core)) || main;
  // Each trip's two ends: where its first ride got on and its last got off.
  const tripEnds = [];
  for (const t of trips()) {
    const a = STATIONS[t.rides[0].from], b = STATIONS[t.rides[t.rides.length - 1].to];
    if (a && b) tripEnds.push([a, b]);
  }
  const tripInside = c => {
    const lat = (c.box[1] + c.box[3]) / 2;
    const dx = CITY_TRIP_PAD_KM / (111.32 * Math.cos(lat * D2R)), dy = CITY_TRIP_PAD_KM / 110.57;
    const inn = s => s.x >= c.box[0] - dx && s.x <= c.box[2] + dx && s.y >= c.box[1] - dy && s.y <= c.box[3] + dy;
    return tripEnds.some(([a, b]) => inn(a) && inn(b));
  };
  for (const c of cities) {
    c.ext = mercExt(c.box, west);
    c.fallbackName = busiestStation(c.recs);
    if (coversMain(c)) continue;
    const big = c.km >= CITY_BIG_KM && extSpan(c.ext) < CITY_OF_MAIN * mainSpan;
    const small = c.km >= CITY_MIN_KM
      && extSpan(c.ext) < CITY_TRIGGER * extSpan(parentOf(c, picked).ext);
    ((big || small) && tripInside(c) ? picked : extra).push(c);
  }
  /* Last of all, when more are asked for: each intercity line ridden (not a city ride) as a
     map of its own, the longest first, unless a map already in the list shows it nearly as
     well: holds it (with a tenth's slack) and is under LINE_MAP_GAIN times its size. */
  const same = (o, c) => {
    const s = 0.1 * extSpan(o.ext);
    return c.ext.x0 >= o.ext.x0 - s && c.ext.x1 <= o.ext.x1 + s && c.ext.y0 >= o.ext.y0 - s
      && c.ext.y1 <= o.ext.y1 + s && extSpan(o.ext) < LINE_MAP_GAIN * extSpan(c.ext);
  };
  const lines = [];
  for (const g of cluster(recs.filter(r => !isCityRide(r)), 0)) {
    // One per line: its rides' extent. cluster() at 0 km would join touching lines, so split.
    for (const id of g.lines) {
      const rs = g.recs.filter(r => r.line.id === id);
      const c = { recs: rs, box: rs.reduce((b, r) => boxUnion(b, r.box), null),
                  km: rs.reduce((s, r) => s + r.km, 0), lines: new Set([id]), kind: 'region',
                  lone: true, name: lineName(LINE_BY_ID.get(id)) };
      c.ext = mercExt(c.box, west);
      if (!coversMain(c)) lines.push(c);
    }
  }
  // The cap: cities and regions of several lines before lone lines, the most ridden first;
  // asked for more, the extras, the most ridden first, then single lines.
  const order = picked.sort((a, b) => ((a.lone ? 1 : 0) - (b.lone ? 1 : 0)) || (b.km - a.km))
    .concat(extra.sort((a, b) => b.km - a.km));
  for (const c of lines.sort((a, b) => b.km - a.km))
    if (!order.some(o => same(o, c))) order.push(c);
  const n = want == null ? Math.min(MAX_INSETS, picked.length)
    : Math.max(0, Math.min(INSET_CHOICE_MAX, want));
  const keep = order.slice(0, n);
  // Shown regions first, then cities, so each region comes before the cities it holds.
  const insets = keep.sort((a, b) => ((a.kind === 'city' ? 1 : 0) - (b.kind === 'city' ? 1 : 0))
    || (b.km - a.km));
  for (const c of insets) c.parent = c.kind === 'city' ? parentOf(c, insets) : main;
  insets.forEach((p, i) => { p.n = i + 1; });
  return { main, insets, west };
}

// ---------------------------------------------------------------- layout

// The zoom fitting a merc extent in a w x h panel with FIT_PAD each side.
function fitZoom(ext, w, h) {
  const ew = Math.max(ext.x1 - ext.x0, 1e-9), eh = Math.max(ext.y1 - ext.y0, 1e-9);
  return Math.log2(Math.min(w * (1 - 2 * FIT_PAD) / (512 * ew), h * (1 - 2 * FIT_PAD) / (512 * eh)));
}

/* The main map across the full width, its height from the shape of what it holds; under it a
   grid of insets, two or three to a row, a short last row's cells widened to fill it. Every
   panel has its own cell, so nothing covers anything. Returns the rects and the bottom. */
function layoutPanels(plan, top) {
  const CW = SHEET_W - 2 * MARGIN;
  const e = plan.main.ext;
  const aspect = Math.max(MAIN_ASPECT[0], Math.min(MAIN_ASPECT[1],
    (e.y1 - e.y0) / Math.max(e.x1 - e.x0, 1e-9)));
  const main = { x: MARGIN, y: top, w: CW, h: Math.round(CW * aspect) };
  const n = plan.insets.length;
  const cells = [];
  let y = main.y + main.h + GAP;
  if (n) {
    const cols = n === 1 ? 1 : n === 2 || n === 4 ? 2 : n <= 9 ? 3 : n <= 16 ? 4 : 5;
    const fullW = (CW - (cols - 1) * GAP) / cols;
    const rowH = Math.round(Math.min(fullW * INSET_ASPECT, CW * 0.5));
    for (let i = 0; i < n; i += cols) {
      const cnt = Math.min(cols, n - i);
      const w = (CW - (cnt - 1) * GAP) / cnt;
      for (let c = 0; c < cnt; c++)
        cells.push({ x: Math.round(MARGIN + c * (w + GAP)), y, w: Math.round(w), h: rowH });
      y += rowH + GAP;
    }
  }
  return { main, cells, bottom: y - GAP };
}

/* A panel's camera: the zoom that fits what it holds, the centre, both kept so the panel lies
   inside the world vertically (MapLibre would otherwise shift a view off the edge of it and
   the chunks would no longer meet). */
function camera(ext, rect, topBand = 0) {
  // What is ridden is fitted below `topBand` (an inset's caption), the panel drawn whole.
  let z = Math.min(MAX_PANEL_ZOOM, fitZoom(ext, rect.w, rect.h - topBand));
  z = Math.max(z, Math.log2(rect.h / 512) + 0.001);
  const ws = 512 * 2 ** z;
  let cx = (ext.x0 + ext.x1) / 2, cy = (ext.y0 + ext.y1) / 2 - topBand / 2 / ws;
  const half = rect.h / 2 / ws;
  cy = Math.max(half, Math.min(1 - half, cy));
  return { z, cx, cy, ws };
}
// Where a merc point falls in a panel, in sheet px.
function toSheet(p, x, y) {
  // Every extent is already on the main map's side of 180° (mercExt's `west`).
  const c = p.cam;
  return [p.rect.x + p.rect.w / 2 + (x - c.cx) * c.ws, p.rect.y + p.rect.h / 2 + (y - c.cy) * c.ws];
}

// ---------------------------------------------------------------- the offscreen map

function posterStyle(features, ccs) {
  const s = map.getStyle();
  const ownSource = id => OWN_SOURCES.has(id) || String(id || '').startsWith('rail-');
  const sources = {}, layers = [];
  for (const [id, src] of Object.entries(s.sources)) if (!ownSource(id)) sources[id] = src;
  for (const l of s.layers) {
    if (ownSource(l.source)) continue;
    const c = JSON.parse(JSON.stringify(l));
    // No labels on the poster: the basemap's names fight the lines.
    if (c.type === 'symbol' || BASEMAP_RAIL.includes(c.id))
      c.layout = { ...(c.layout || {}), visibility: 'none' };
    layers.push(c);
  }
  for (const cc of ccs) {
    sources[`rail-${cc}`] = { type: 'vector', url: `pmtiles://${dataUrl(`data/${cc}.pmtiles`)}` };
    layers.push({
      id: `p-edge-${cc}`, type: 'line', source: `rail-${cc}`, 'source-layer': 'track',
      filter: THEME.cased, layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': THEME.edgeRidden, 'line-width': THEME.width, 'line-opacity': TRACK_OPACITY },
    });
    layers.push({
      id: `p-track-${cc}`, type: 'line', source: `rail-${cc}`, 'source-layer': 'track',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': THEME.ridden, 'line-width': THEME.width, 'line-opacity': TRACK_ALPHA },
    });
  }
  const w = ['interpolate', ['linear'], ['zoom']], cw = ['interpolate', ['linear'], ['zoom']];
  for (let i = 0; i < RIDDEN_W.length; i += 2) {
    w.push(RIDDEN_W[i], RIDDEN_W[i + 1]);
    cw.push(RIDDEN_W[i], RIDDEN_W[i + 1] + CASING_EXTRA);
  }
  sources['poster-ridden'] = { type: 'geojson', data: { type: 'FeatureCollection', features } };
  layers.push({ id: 'poster-casing', type: 'line', source: 'poster-ridden',
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: { 'line-color': THEME.casing, 'line-width': cw, 'line-opacity': 0.9 } });
  layers.push({ id: 'poster-ridden', type: 'line', source: 'poster-ridden',
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: { 'line-color': ['get', 'c'], 'line-width': w } });
  return { ...s, sources, layers, transition: { duration: 0, delay: 0 } };
}

// Resolves once the map has drawn everything for where it now is.
function settle(pm, ms = 60000) {
  return new Promise(res => {
    let done = false;
    const fin = () => { if (!done) { done = true; clearTimeout(t); res(); } };
    const t = setTimeout(() => { console.warn('poster: a panel timed out waiting for tiles'); fin(); }, ms);
    pm.once('idle', fin);
    pm.triggerRepaint();
  });
}

/* The device px one WebGL canvas may be: MapLibre's own cap (maxCanvasSize) and the GPU's. */
function glLimit() {
  try {
    const gl = document.createElement('canvas').getContext('webgl');
    const v = Math.min(gl.getParameter(gl.MAX_RENDERBUFFER_SIZE), gl.getParameter(gl.MAX_TEXTURE_SIZE),
                       ...gl.getParameter(gl.MAX_VIEWPORT_DIMS));
    const lose = gl.getExtension('WEBGL_lose_context');
    if (lose) lose.loseContext();
    return Math.min(4096, v || 4096);
  } catch (e) { return 2048; }
}

const ceil8 = v => Math.ceil(v / 8) * 8;

/* One panel, chunk by chunk. Chunk offsets step by the chunk size and the last one is pulled
   back to end at the panel's edge, so no chunk ever looks past the panel (or the world). */
async function drawPanel(pm, box, p, ctx, ratio, chunk) {
  const { x, y, w, h } = p.rect;
  const cw = Math.min(chunk, ceil8(w)), ch = Math.min(chunk, ceil8(h));
  box.style.width = cw + 'px';
  box.style.height = ch + 'px';
  pm.resize();
  const offs = (len, c) => {
    const o = [];
    for (let v = 0; v < len; v += c) o.push(Math.min(v, Math.max(0, len - c)));
    return [...new Set(o)];
  };
  const left = p.cam.cx * p.cam.ws - w / 2, top = p.cam.cy * p.cam.ws - h / 2;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x * ratio, y * ratio, w * ratio, h * ratio);
  ctx.clip();
  for (const oy of offs(h, ch)) for (const ox of offs(w, cw)) {
    const mx = (left + ox + cw / 2) / p.cam.ws, my = (top + oy + ch / 2) / p.cam.ws;
    pm.jumpTo({ center: [lngOf(mx), latOf(my)], zoom: p.cam.z });
    await settle(pm);
    ctx.drawImage(pm.getCanvas(), Math.round((x + ox) * ratio), Math.round((y + oy) * ratio),
                  Math.round(cw * ratio), Math.round(ch * ratio));
  }
  ctx.restore();
}

/* The basemap's name for a city inset: the most important city or town place within its
   frame (openmaptiles `rank`, then a capital, then nearest the riding's centre). */
function placeName(pm, p) {
  const src = Object.entries(pm.getStyle().sources)
    .find(([id, s]) => s.type === 'vector' && !id.startsWith('rail-'));
  if (!src) return '';
  let feats = [];
  try {
    feats = pm.querySourceFeatures(src[0], { sourceLayer: 'place',
      filter: ['in', ['get', 'class'], ['literal', ['city', 'town']]] });
  } catch (e) { return ''; }
  const [w, s, e, n] = p.box;
  const mx = (e - w) * 0.15, my = (n - s) * 0.15;
  let cx = 0, cy = 0, tot = 0;
  for (const r of p.recs) {
    cx += (r.box[0] + r.box[2]) / 2 * r.km; cy += (r.box[1] + r.box[3]) / 2 * r.km; tot += r.km;
  }
  cx /= tot || 1; cy /= tot || 1;
  const seen = new Map();
  for (const f of feats) {
    const [x, y] = f.geometry.coordinates || [];
    if (!(x >= w - mx && x <= e + mx && y >= s - my && y <= n + my)) continue;
    const pr = f.properties;
    const name = pr['name:en'] || pr.name_en || pr['name:latin'] || pr.name_int || pr.name;
    if (!name) continue;
    const key = [pr.rank == null ? 99 : pr.rank, pr.capital ? 0 : 1, pr.class === 'city' ? 0 : 1,
                 Math.hypot(x - cx, y - cy)];
    if (!seen.has(name) || cmp(key, seen.get(name)) < 0) seen.set(name, key);
  }
  const best = [...seen.entries()].sort((a, b) => cmp(a[1], b[1]))[0];
  return best ? best[0] : '';
}
/* A city map's name: its city's, or for cities joined into one map the names of the ones with
   a real share of its riding (a tenth or more, three at most), "Osaka and Kyoto". */
function cityName(pm, p) {
  const parts = (p.parts || [p]).filter(c => c.km >= 0.1 * p.km).sort((a, b) => b.km - a.km);
  const names = [];
  for (const c of parts) {
    const nm = placeName(pm, { box: atLeast(c.box, MIN_CITY_KM), recs: c.recs })
      || busiestStation(c.recs);
    if (nm && !names.includes(nm)) names.push(nm);
  }
  const top = names.slice(0, 3);
  if (!top.length) return p.fallbackName || 'City';
  return top.length === 1 ? top[0] : `${top.slice(0, -1).join(', ')} and ${top[top.length - 1]}`;
}
function cmp(a, b) {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] - b[i];
  return 0;
}

// ---------------------------------------------------------------- the sheet

function figures() {
  const s = stats();
  let km = 0, countries = 0;
  for (const r of s.byRegion.values()) if (r.done > 0.001) { km += r.done; countries++; }
  const rides = here();
  const lines = new Set(rides.map(r => r.line).filter(id => LINE_BY_ID.has(id))).size;
  const dates = rides.map(r => r.date).filter(Boolean).sort();
  const y0 = dates.length ? dates[0].slice(0, 4) : '', y1 = dates.length ? dates[dates.length - 1].slice(0, 4) : '';
  const parts = [`${Math.round(km).toLocaleString('en-GB')} km`,
    `${lines} line${lines === 1 ? '' : 's'}`,
    `${countries} countr${countries === 1 ? 'y' : 'ies'}`];
  if (y0) parts.push(y0 === y1 ? y0 : `${y0}–${y1}`);
  return parts.join('  ·  ');
}

// The page's starred statistics (starredStats, in index.html), or none.
function stars() {
  try {
    if (typeof starredStats !== 'function') return [];
    const s = starredStats();
    return Array.isArray(s) ? s.filter(x => x && x.name) : [];
  } catch (e) {
    console.warn('poster: starredStats failed', e);
    return [];
  }
}

function ink() {
  return THEME_NAME === 'dark'
    ? { sheet: THEME.panel, text: '#eeeeee', sub: '#8a8a8a', rule: '#2c2c2c', frame: '#d0d0d0',
        halo: 'rgba(13,13,13,0.85)' }
    : { sheet: THEME.panel, text: '#1a1a18', sub: '#6a6a66', rule: '#c8c8c4', frame: '#33332f',
        halo: 'rgba(250,250,248,0.9)' };
}

const FONT = "Nunito, 'Helvetica Neue', Arial, sans-serif";

// An image, or null if it does not come in time. CORS-clean, so the canvas can still be saved.
function loadImage(url, ms = 6000) {
  return new Promise(res => {
    const im = new Image();
    im.crossOrigin = 'anonymous';
    const t = setTimeout(() => res(null), ms);
    im.onload = () => { clearTimeout(t); res(im); };
    im.onerror = () => { clearTimeout(t); res(null); };
    im.src = url;
  });
}

// Words into at most `max` lines no wider than `w` (device px), the last cut with an ellipsis.
function wrap(ctx, text, w, max) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = '';
  for (let i = 0; i < words.length; i++) {
    const t = cur ? `${cur} ${words[i]}` : words[i];
    if (ctx.measureText(t).width <= w || !cur) { cur = t; continue; }
    lines.push(cur);
    cur = words[i];
    if (lines.length === max) { cur = words.slice(i).join(' '); break; }
  }
  if (cur) lines.push(cur);
  if (lines.length > max) lines.length = max;
  const last = lines.length - 1;
  if (last >= 0 && (ctx.measureText(lines[last]).width > w || lines.join(' ').length < words.join(' ').length)) {
    let s = lines[last];
    while (s.length > 1 && ctx.measureText(s + '…').width > w) s = s.slice(0, -1);
    lines[last] = s.replace(/[\s,·]+$/, '') + '…';
  }
  return lines;
}

const ringRows = n => Math.ceil(n / Math.max(1, Math.floor((SHEET_W - 2 * MARGIN + GAP) / (RING_CELL_W + GAP))));
const RING_ROW_H = RING_D + 12 + SMALL_PX * 1.35 * 3 + 16;

/* The rings, centred in rows across the sheet, from `top`. */
function drawRings(ctx, R, list, flags, top, k) {
  const CW = SHEET_W - 2 * MARGIN;
  const per = Math.max(1, Math.floor((CW + GAP) / (RING_CELL_W + GAP)));
  list.forEach((st, i) => {
    const row = Math.floor(i / per), inRow = Math.min(per, list.length - row * per);
    const rowW = inRow * RING_CELL_W + (inRow - 1) * GAP;
    const x0 = MARGIN + (CW - rowW) / 2 + (i % per) * (RING_CELL_W + GAP);
    const cx = x0 + RING_CELL_W / 2, cy = top + row * RING_ROW_H + RING_D / 2;
    const r = RING_D / 2 - RING_STROKE / 2;
    const colour = st.colour || k.text;
    const frac = st.frac == null ? null : Math.max(0, Math.min(1, +st.frac || 0));
    ctx.save();
    ctx.strokeStyle = colour;
    if (frac == null) {
      // A trip has no percentage: a thin full ring in its colour, its km inside.
      ctx.lineWidth = R(3);
      ctx.beginPath(); ctx.arc(R(cx), R(cy), R(r), 0, 2 * Math.PI); ctx.stroke();
    } else {
      ctx.lineWidth = R(RING_STROKE);
      ctx.globalAlpha = RING_TRACK_ALPHA;
      ctx.beginPath(); ctx.arc(R(cx), R(cy), R(r), 0, 2 * Math.PI); ctx.stroke();
      ctx.globalAlpha = 1;
      if (frac > 0) {
        ctx.lineCap = frac >= 0.999 ? 'butt' : 'round';
        ctx.beginPath();
        ctx.arc(R(cx), R(cy), R(r), -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * Math.min(frac, 1));
        ctx.stroke();
      }
    }
    ctx.restore();

    // The number inside: "21%" whole; "123.4 km" as the number, and "km" under it.
    const v = String(st.value == null ? '' : st.value).trim();
    const m = /^(.*?)\s*km$/i.exec(v);
    const num = m ? m[1] : v;
    const inner = 2 * (r - RING_STROKE / 2) * 0.86;
    ctx.fillStyle = k.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let px = MID_PX;
    ctx.font = `700 ${R(px)}px ${FONT}`;
    // Only a long figure is set smaller, to stay inside the ring.
    while (px > SMALL_PX && ctx.measureText(num).width > R(inner)) {
      px -= 1;
      ctx.font = `700 ${R(px)}px ${FONT}`;
    }
    const pm = /^(.*?)%$/.exec(num);
    if (m) {
      ctx.fillText(num, R(cx), R(cy - SMALL_PX * 0.35));
      ctx.font = `400 ${R(SMALL_PX)}px ${FONT}`;
      ctx.fillStyle = k.sub;
      ctx.fillText('km', R(cx), R(cy + px * 0.6));
    } else if (pm) {
      // The % smaller than the figure, as noritsubushi sets it (Anita, 2026-10-07).
      const big = ctx.measureText(pm[1]).width;
      const font2 = `700 ${R(SMALL_PX)}px ${FONT}`;
      const saved = ctx.font;
      ctx.font = font2;
      const pw = ctx.measureText('%').width;
      ctx.font = saved;
      const x0 = R(cx) - (big + pw) / 2;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      const base = R(cy) + R(px) * 0.36;
      ctx.fillText(pm[1], x0, base);
      ctx.font = font2;
      ctx.fillText('%', x0 + big + R(1), base);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    } else {
      ctx.fillText(num, R(cx), R(cy));
    }

    // The name under it, two lines at most, the country's flag before the first; the detail.
    const lh = SMALL_PX * 1.35;
    let ty = top + row * RING_ROW_H + RING_D + 12 + lh / 2;
    const flag = st.flag && flags.get(String(st.flag).toLowerCase());
    const fw = flag ? SMALL_PX * 4 / 3 * 0.9 : 0, fh = flag ? SMALL_PX * 0.9 : 0;
    ctx.font = `600 ${R(SMALL_PX)}px ${FONT}`;
    ctx.fillStyle = k.text;
    const names = wrap(ctx, st.name, R(RING_CELL_W - 6 - (flag ? fw + 5 : 0)), 2);
    names.forEach((t, j) => {
      const tw = ctx.measureText(t).width / R(1);
      if (j === 0 && flag) {
        const all = fw + 5 + tw, left = cx - all / 2;
        ctx.drawImage(flag, R(left), R(ty - fh / 2), R(fw), R(fh));
        // An edge, so a mostly white flag (Japan's) still reads as a flag on a light sheet.
        ctx.strokeStyle = k.rule;
        ctx.lineWidth = R(0.75);
        ctx.strokeRect(R(left), R(ty - fh / 2), R(fw), R(fh));
        ctx.textAlign = 'left';
        ctx.fillText(t, R(left + fw + 5), R(ty));
        ctx.textAlign = 'center';
      } else ctx.fillText(t, R(cx), R(ty));
      ty += lh;
    });
    if (st.detail) {
      ctx.font = `400 ${R(SMALL_PX)}px ${FONT}`;
      ctx.fillStyle = k.sub;
      ctx.fillText(wrap(ctx, st.detail, R(RING_CELL_W - 4), 1)[0], R(cx), R(ty));
    }
  });
  ctx.textAlign = 'left';
}

/* Renders the image. opts: {title, status: fn(text), insets: 'auto' or a number 0 to
   INSET_CHOICE_MAX, scale: device px per sheet px (default OUT_W / SHEET_W)}. Resolves with
   {canvas, plan, layout, ratio, insets, ...}. */
async function renderPoster(opts = {}) {
  const status = opts.status || (() => {});
  await REGIONS_READY;
  const need = [...new Set(RIDES.flatMap(rideRegions))].filter(cc => REGIONS[cc] || !Object.keys(REGIONS).length);
  const missing = need.filter(cc => !LOADED.has(cc));
  if (missing.length) {
    status(`Loading the lines of ${missing.length > 3 ? `${missing.length} countries` : missing.map(regionName).join(', ')}`);
    await Promise.all(missing.map(cc => loadRegion(cc).catch(() => null)));
  }
  status('Working out the ridden lines');
  const { recs, features } = await rideRecords();
  if (!recs.length) throw new Error('There are no rides to draw yet.');
  const plan = planPanels(recs, opts.insets == null || opts.insets === 'auto' ? null : +opts.insets);
  const starList = stars();

  // Down the sheet: title, figures, rings, maps, credits.
  const titleY = MARGIN + TITLE_PX * 0.8;
  const figY = titleY + MID_PX * 1.7;
  let top = figY + MID_PX * 1.1;
  const ringsTop = top + 22;
  if (starList.length) top = ringsTop + ringRows(starList.length) * RING_ROW_H;
  top = Math.round(top + 10);
  const layout = layoutPanels(plan, top);
  const H = Math.round(layout.bottom + SMALL_PX * 2.6 + MARGIN * 0.6);
  const W = SHEET_W;
  plan.main.rect = layout.main;
  plan.insets.forEach((p, i) => { p.rect = layout.cells[i]; });
  const panels = [plan.main, ...plan.insets];
  const capH = Math.round(SMALL_PX * 1.8);
  for (const p of panels) p.cam = camera(p.ext, p.rect, p.kind === 'main' ? 0 : capH);

  const ratio = opts.scale || OUT_W / SHEET_W;
  const limit = glLimit();
  const chunk = Math.max(64, Math.min(2048, Math.floor(limit / ratio / 8) * 8));

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(W * ratio);
  canvas.height = Math.round(H * ratio);
  const ctx = canvas.getContext('2d');
  const k = ink();
  ctx.fillStyle = k.sheet;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Flags come in while the maps are drawn.
  const flagCodes = [...new Set(starList.map(s => s.flag).filter(Boolean).map(f => String(f).toLowerCase()))];
  const flagsP = Promise.all(flagCodes.map(async cc => [cc, await loadImage(FLAG_URL(cc))]))
    .then(es => new Map(es.filter(([, im]) => im)));

  // Every country any panel looks at gets its track drawn.
  const ccs = Object.keys(REGIONS).filter(cc => {
    const b = REGIONS[cc].bbox;
    if (!b) return false;
    return panels.some(p => {
      const ws = p.cam.ws, hw = p.rect.w / 2 / ws, hh = p.rect.h / 2 / ws;
      const x0 = p.cam.cx - hw, x1 = p.cam.cx + hw, y0 = p.cam.cy - hh, y1 = p.cam.cy + hh;
      const bx0 = mercX(b[0]), bx1 = mercX(b[2]), by0 = mercY(b[3]), by1 = mercY(b[1]);
      if (by1 < y0 || by0 > y1) return false;
      return [-1, 0, 1].some(s => bx1 + s >= x0 && bx0 + s <= x1);
    });
  });

  const box = document.createElement('div');
  box.style.cssText = 'position:fixed;left:-40000px;top:0;width:512px;height:512px;';
  document.body.appendChild(box);
  const pm = new maplibregl.Map({
    container: box, style: posterStyle(features, ccs), interactive: false,
    attributionControl: false, preserveDrawingBuffer: true, fadeDuration: 0,
    pixelRatio: ratio, maxCanvasSize: [limit, limit], renderWorldCopies: true,
    center: [0, 0], zoom: 1,
  });
  try {
    await new Promise((res, rej) => {
      pm.once('load', res);
      pm.on('error', e => console.warn('poster map:', e && e.error && e.error.message));
      setTimeout(() => rej(new Error('The map for the image did not load.')), 60000);
    });
    for (const p of panels) {
      status(p.kind === 'main' ? 'Drawing the main map' : `Drawing map ${p.n} of ${plan.insets.length}`);
      await drawPanel(pm, box, p, ctx, ratio, chunk);
      if (p.kind === 'city') p.name = cityName(pm, p);
    }
  } finally {
    pm.remove();
    box.remove();
  }

  status('Adding the text');
  try {
    await Promise.all([`700 ${TITLE_PX}px Nunito`, `700 ${MID_PX}px Nunito`, `400 ${MID_PX}px Nunito`,
      `600 ${SMALL_PX}px Nunito`, `400 ${SMALL_PX}px Nunito`].map(f => document.fonts.load(f)));
  } catch (e) { /* the fallback font */ }
  const R = v => v * ratio;
  const font = (wgt, px) => `${wgt} ${R(px)}px ${FONT}`;

  // Header.
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.fillStyle = k.text;
  ctx.font = font(700, TITLE_PX);
  ctx.fillText(opts.title == null ? 'Rides' : String(opts.title), R(MARGIN), R(titleY));
  ctx.fillStyle = k.sub;
  ctx.font = font(400, MID_PX);
  ctx.fillText(figures(), R(MARGIN), R(figY));

  if (starList.length) drawRings(ctx, R, starList, await flagsP, ringsTop, k);

  // Frames: each inset outlined on the panel it enlarges, with its number.
  ctx.lineJoin = 'round';
  for (const p of plan.insets) {
    const par = p.parent;
    const [ax, ay] = toSheet(par, p.ext.x0, p.ext.y0), [bx, by] = toSheet(par, p.ext.x1, p.ext.y1);
    const minS = 8, cx = (ax + bx) / 2, cy = (ay + by) / 2;
    const hw = Math.max((bx - ax) / 2, minS / 2), hh = Math.max((by - ay) / 2, minS / 2);
    const r = par.rect;
    if (cx < r.x || cx > r.x + r.w || cy < r.y || cy > r.y + r.h) continue;
    ctx.save();
    ctx.beginPath();
    ctx.rect(R(r.x), R(r.y), R(r.w), R(r.h));
    ctx.clip();
    ctx.strokeStyle = k.halo;
    ctx.lineWidth = R(3);
    ctx.strokeRect(R(cx - hw), R(cy - hh), R(2 * hw), R(2 * hh));
    ctx.strokeStyle = k.frame;
    ctx.lineWidth = R(1.2);
    ctx.strokeRect(R(cx - hw), R(cy - hh), R(2 * hw), R(2 * hh));
    ctx.font = font(700, SMALL_PX);
    ctx.textBaseline = 'bottom';
    const lx = cx - hw, ly = cy - hh - 2;
    ctx.lineWidth = R(3);
    ctx.strokeStyle = k.halo;
    ctx.strokeText(String(p.n), R(lx), R(ly));
    ctx.fillStyle = k.text;
    ctx.fillText(String(p.n), R(lx), R(ly));
    ctx.restore();
  }

  // Panel edges and the insets' captions.
  ctx.strokeStyle = k.rule;
  ctx.lineWidth = R(1);
  for (const p of panels) ctx.strokeRect(R(p.rect.x), R(p.rect.y), R(p.rect.w), R(p.rect.h));
  ctx.textBaseline = 'middle';
  for (const p of plan.insets) {
    ctx.font = font(700, SMALL_PX);
    const numW = ctx.measureText(String(p.n)).width / ratio;
    ctx.font = font(600, SMALL_PX);
    const text = wrap(ctx, p.name || '', R(p.rect.w - numW - 26), 1)[0] || '';
    const tw = ctx.measureText(text).width / ratio;
    const bw = numW + tw + 18;
    ctx.fillStyle = k.sheet;
    ctx.fillRect(R(p.rect.x), R(p.rect.y), R(bw), R(capH));
    ctx.strokeStyle = k.rule;
    ctx.strokeRect(R(p.rect.x), R(p.rect.y), R(bw), R(capH));
    ctx.fillStyle = k.text;
    ctx.font = font(700, SMALL_PX);
    ctx.fillText(String(p.n), R(p.rect.x + 6), R(p.rect.y + capH / 2));
    ctx.font = font(600, SMALL_PX);
    ctx.fillText(text, R(p.rect.x + 6 + numW + 6), R(p.rect.y + capH / 2));
  }

  // Credits.
  ctx.fillStyle = k.sub;
  ctx.font = font(400, SMALL_PX);
  ctx.textBaseline = 'alphabetic';
  const cy = layout.bottom + SMALL_PX * 1.9;
  ctx.textAlign = 'right';
  ctx.fillText('Rail and map data © OpenStreetMap contributors. Basemap © OpenMapTiles, OpenFreeMap.',
               R(W - MARGIN), R(cy));
  ctx.textAlign = 'left';
  ctx.fillText('noritetsu', R(MARGIN), R(cy));

  status('');
  return { canvas, plan, layout, ratio, chunk, limit, stars: starList.length,
           insets: plan.insets.map(p => ({ n: p.n, kind: p.kind, name: p.name, km: Math.round(p.km),
                                           lines: p.lines.size, zoom: +p.cam.z.toFixed(2) })),
           mainZoom: +plan.main.cam.z.toFixed(2) };
}

// ---------------------------------------------------------------- PNG colour chunk

/* sRGB declared in the file (../posters/ conventions), so viewers do not guess. Any colour or
   size chunk the browser wrote is replaced. */
const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunkBytes(type, data) {
  const out = new Uint8Array(12 + data.length);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  dv.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}
async function withSrgb(blob) {
  const src = new Uint8Array(await blob.arrayBuffer());
  const dv = new DataView(src.buffer);
  const parts = [src.subarray(0, 8)];
  const drop = new Set(['pHYs', 'sRGB', 'iCCP', 'gAMA', 'cHRM']);
  let at = 8;
  while (at < src.length) {
    const len = dv.getUint32(at);
    const type = String.fromCharCode(...src.subarray(at + 4, at + 8));
    const end = at + 12 + len;
    if (!drop.has(type)) parts.push(src.subarray(at, end));
    if (type === 'IHDR') parts.push(chunkBytes('sRGB', new Uint8Array([0])));
    at = end;
  }
  return new Blob(parts, { type: 'image/png' });
}
const toBlob = canvas => new Promise((res, rej) =>
  canvas.toBlob(b => (b ? res(b) : rej(new Error('The browser could not make the image.'))), 'image/png'));

// ---------------------------------------------------------------- the dialog

const CSS = `
  #poster-dlg { position: fixed; inset: 0; z-index: 20; display: none; align-items: center;
                justify-content: center; background: rgba(0,0,0,0.45); }
  #poster-dlg.open { display: flex; }
  #poster-dlg .pd { background: var(--g0d); border: 1px solid var(--g26); color: var(--gee);
                    width: min(920px, calc(100% - 24px)); max-height: calc(100% - 24px);
                    overflow: auto; padding: 14px 16px 16px; font-size: 13px; }
  #poster-dlg .pd-head { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
  #poster-dlg .pd-head b { font-size: 15px; flex: 1; }
  #poster-dlg label { color: var(--g9a); font-size: 12px; display: flex; align-items: center; gap: 6px; }
  #poster-dlg input.fld { width: 260px; }
  #poster-dlg .pd-row { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; }
  #pd-status { min-height: 18px; margin-top: 8px; }
  #pd-out { margin-top: 10px; }
  #pd-view { position: relative; height: 68vh; overflow: hidden; border: 1px solid var(--g26);
             background: var(--g12); touch-action: none; cursor: grab; user-select: none; }
  #pd-view.drag { cursor: grabbing; }
  #pd-view img { position: absolute; left: 0; top: 0; transform-origin: 0 0; max-width: none;
                 -webkit-user-drag: none; pointer-events: none; }
  #pd-fit { position: absolute; right: 8px; top: 8px; z-index: 1; background: var(--g0d); }
  #pd-hint { margin-top: 4px; }
`;

const canCopy = () => !!(navigator.clipboard && navigator.clipboard.write && window.ClipboardItem
  && window.isSecureContext);

const INSETS_KEY = 'noritetsu.poster.insets';
let BUSY = false;
function dialog() {
  let el = document.getElementById('poster-dlg');
  if (el) return el;
  const st = document.createElement('style');
  st.textContent = CSS;
  document.head.appendChild(st);
  el = document.createElement('div');
  el.id = 'poster-dlg';
  el.innerHTML = `<div class="pd">
    <div class="pd-head"><b>Image of your rides</b>
      <button class="act" id="pd-close">close</button></div>
    <div class="pd-row">
      <label>Title <input class="fld" id="pd-title" value="Rides" maxlength="80" /></label>
      <label>Smaller maps <select class="fld" id="pd-insets">
        <option value="auto">as many as needed</option>
        ${Array.from({ length: INSET_CHOICE_MAX + 1 }, (_, i) => `<option value="${i}">${i}</option>`).join('')}
      </select></label>
    </div>
    <div class="btnrow">
      <button class="act" id="pd-preview">Preview</button>
      <button class="act go" id="pd-download">Download PNG</button>
      <button class="act" id="pd-copy">Copy image</button>
    </div>
    <div class="muted" id="pd-status"></div>
    <div id="pd-out"></div>
  </div>`;
  document.body.appendChild(el);
  if (!canCopy()) el.querySelector('#pd-copy').style.display = 'none';
  // The number of smaller maps is remembered in this browser.
  const sel = el.querySelector('#pd-insets');
  try {
    const v = localStorage.getItem(INSETS_KEY);
    if (v && [...sel.options].some(o => o.value === v)) sel.value = v;
  } catch (e) { /* not remembered */ }
  sel.onchange = () => { try { localStorage.setItem(INSETS_KEY, sel.value); } catch (e) { } };
  el.addEventListener('click', e => { if (e.target === el && !BUSY) closePoster(); });
  el.querySelector('#pd-close').onclick = () => { if (!BUSY) closePoster(); };
  el.querySelector('#pd-preview').onclick = () => run('preview');
  el.querySelector('#pd-download').onclick = () => run('download');
  el.querySelector('#pd-copy').onclick = () => run('copy');
  return el;
}

function closePoster() {
  const el = document.getElementById('poster-dlg');
  if (el) el.classList.remove('open');
}

/* The last image made, kept while nothing it shows has changed, so Download and Copy after a
   Preview do not draw it all again. */
let LAST = null;
function imageSig(title) {
  let st = '';
  try { st = JSON.stringify(stars()); } catch (e) { }
  return [title, THEME_NAME, DATA_GEN, RIDES.map(rideSig).join(';'), st].join('#');
}

let PREVIEW_URL = null;
function run(mode) {
  if (BUSY) return;
  BUSY = true;
  const el = dialog();
  const say = t => { el.querySelector('#pd-status').textContent = t; };
  const btns = el.querySelectorAll('button');
  btns.forEach(b => { b.disabled = true; });
  const title = el.querySelector('#pd-title').value.trim();
  const insets = el.querySelector('#pd-insets').value;
  const sig = imageSig(title) + '#' + insets;
  const made = LAST && LAST.sig === sig ? Promise.resolve(LAST)
    : renderPoster({ title, insets, status: say })
      .then(out => toBlob(out.canvas).then(withSrgb).then(blob => {
        LAST = { sig, blob, w: out.canvas.width, h: out.canvas.height };
        return LAST;
      }));
  const blobP = made.then(x => x.blob);
  /* The clipboard write is started inside the click, with the image still to come: Safari
     refuses one started later, and Chrome takes a promise just as well. */
  const copied = mode === 'copy'
    ? navigator.clipboard.write([new ClipboardItem({ 'image/png': blobP })]) : null;
  Promise.all([made, copied]).then(([res]) => {
    if (PREVIEW_URL) URL.revokeObjectURL(PREVIEW_URL);
    PREVIEW_URL = URL.createObjectURL(res.blob);
    showPreview(el.querySelector('#pd-out'), PREVIEW_URL);
    if (mode === 'download') {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(res.blob);
      a.download = `noritetsu-${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 60000);
    }
    say(`${res.w} by ${res.h} px` + (mode === 'download' ? ', saved.' : mode === 'copy' ? ', copied.' : '.'));
  }).catch(e => {
    console.error(e);
    say(e && e.message ? e.message : 'The image could not be made.');
  }).finally(() => {
    btns.forEach(b => { b.disabled = false; });
    BUSY = false;
  });
}

/* THE PREVIEW ZOOMS AND PANS (Anita, 2026-10-07). The image shown is the saved one, full size
   (OUT_W px across), scaled by a CSS transform: from the whole image fitted in the box up to
   one image pixel per screen pixel. The wheel zooms about the cursor, a drag pans, two fingers
   pinch, a double click or "fit" goes back to the whole image. Instant, no transitions. */
let VIEW_STATE = null;
function showPreview(out, url) {
  out.innerHTML = `<div id="pd-view"><button class="act" id="pd-fit">fit</button>`
    + `<img alt="Your rides" draggable="false" /></div>`
    + `<div class="muted" id="pd-hint">Scroll or pinch to zoom, drag to move, double click to see it whole.</div>`;
  const view = out.querySelector('#pd-view'), img = view.querySelector('img');
  const v = VIEW_STATE = { s: 1, x: 0, y: 0, fit: 1, iw: 0, ih: 0 };
  const box = () => view.getBoundingClientRect();
  const apply = () => { img.style.transform = `translate(${v.x}px, ${v.y}px) scale(${v.s})`; };
  // Kept on screen: centred where smaller than the box, edge to edge where larger.
  const clamp = () => {
    const b = box(), w = v.iw * v.s, h = v.ih * v.s;
    v.x = w <= b.width ? (b.width - w) / 2 : Math.min(0, Math.max(b.width - w, v.x));
    v.y = h <= b.height ? (b.height - h) / 2 : Math.min(0, Math.max(b.height - h, v.y));
  };
  const fit = () => {
    const b = box();
    if (!v.iw || !b.width) return;
    v.fit = Math.min(b.width / v.iw, b.height / v.ih);
    v.s = v.fit;
    clamp();
    apply();
  };
  // Zoom to scale `s` keeping the image point under (px, py), box coordinates, where it is.
  const zoomAt = (s, px, py) => {
    const ns = Math.max(v.fit, Math.min(Math.max(1, v.fit), s));
    v.x = px - (px - v.x) * ns / v.s;
    v.y = py - (py - v.y) * ns / v.s;
    v.s = ns;
    clamp();
    apply();
  };
  img.onload = () => { v.iw = img.naturalWidth; v.ih = img.naturalHeight; fit(); };
  img.src = url;
  view.querySelector('#pd-fit').onclick = e => { e.stopPropagation(); fit(); };
  view.querySelector('#pd-fit').onpointerdown = e => e.stopPropagation();
  view.addEventListener('dblclick', fit);
  view.addEventListener('wheel', e => {
    e.preventDefault();
    const b = box();
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    zoomAt(v.s * Math.exp(-dy * 0.0015), e.clientX - b.left, e.clientY - b.top);
  }, { passive: false });
  // Pointers down, by id: one is a pan, two a pinch about their midpoint.
  const pts = new Map();
  let last = null;
  const gesture = () => {
    const p = [...pts.values()], b = box();
    if (p.length === 1) return { x: p[0].x - b.left, y: p[0].y - b.top, d: 0 };
    return { x: (p[0].x + p[1].x) / 2 - b.left, y: (p[0].y + p[1].y) / 2 - b.top,
             d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) };
  };
  view.addEventListener('pointerdown', e => {
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { view.setPointerCapture(e.pointerId); } catch (err) { /* a pointer already gone */ }
    view.classList.add('drag');
    last = gesture();
  });
  view.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture();
    if (last && pts.size >= 2 && last.d > 0 && g.d > 0) zoomAt(v.s * g.d / last.d, g.x, g.y);
    if (last) { v.x += g.x - last.x; v.y += g.y - last.y; clamp(); apply(); }
    last = g;
  });
  const up = e => {
    pts.delete(e.pointerId);
    if (!pts.size) view.classList.remove('drag');
    last = pts.size ? gesture() : null;
  };
  view.addEventListener('pointerup', up);
  view.addEventListener('pointercancel', up);
  v.refit = () => { if (view.isConnected) fit(); };
  v.zoomAt = zoomAt;              // for tests
}
window.addEventListener('resize', () => { if (VIEW_STATE) VIEW_STATE.refit(); });

function openPoster() {
  dialog().classList.add('open');
}

window.openPoster = openPoster;
window.closePoster = closePoster;
window.renderPoster = renderPoster;
window.posterPngBlob = async canvas => withSrgb(await toBlob(canvas));
})();
