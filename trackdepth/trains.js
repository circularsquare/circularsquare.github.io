// trains.js: animated trains for trackdepth's CesiumJS page. A classic script (no module).
//
// On index.html it attaches by itself: put a script tag for trains.js after the page's main
// script; once the page fires 'trackdepth:ready' the trains are window.trackdepth.trains (see
// autoAttach at the bottom: heights follow trackdepth.scale, latched in trackdepth.onScale).
// Anywhere else, call it yourself once tracks.json and services.json are in:
//
//   const trains = initTrains(viewer, {          // a Cesium.Viewer, CesiumWidget or Scene
//     tracks: DATA.tracks,                       // data/tracks.json (the object or its .tracks)
//     services: SERVICES,                        // data/services.json (the object or its .services)
//     geoid: GEOID,                              // ellipsoid height of NAVD88 0, m
//     getExaggeration: () => exag,               // read every frame: heights follow it at once
//     lineColour: c => [r, g, b],                // optional: '#rrggbb' -> 0-255 RGB (default lifts dark blues)
//     speed: 1,                                  // optional: time factor (1 = real time)
//   });
//   trains.setVisible(false);    // hidden: nothing drawn or computed, the page renders on demand again
//   trains.dispose();
//   trains.stats                 // { trains, cars, variants, pieces, breaks, bridged, shortPieces }
//   (clock, paused, _car, _place, _runs are for tests)
//
// How it works. Each service variant (services.json: one direction of one route, as runs of
// tracks.json ways) is laid out as a polyline of rail points, split into pieces where the ways
// don't join (a jump over 60 m; up to 260 m where ways are missing from tracks.json, the main-line
// crossovers, it is bridged with a straight line). Each piece gets a timetable: accelerate,
// cruise, brake into each stop (the variant's stops projected onto the piece, or for a variant
// that lists none, any stop of its system within 40 m), dwell 15-30 s, and at the last stop vanish
// and start again from the first, so trains of a variant always run one way; the other direction
// is its own variant. Variants drawn as both ways ("<=>" in the name: LIRR, Metro-North) also get
// trains running backwards on the same polyline. Part-time variants are left out where a service
// has full-time ones. Near the camera a headway rule keeps trains apart on shared track (see
// headway); trains running opposite ways on one polyline still pass through each other.
//
// Drawing: instanced draws over the same per-car data (the boxes, the ribbons' cores and edges). Each frame the CPU works out each
// car's front and back point on its polyline (one binary search per train, about 0.25 ms for all
// of them) and uploads 8 floats per car; the vertex shaders lift both points to rail height x
// exaggeration. A car at least NEAR_PX wide on screen is a shaded box built between the two
// points (so it follows curves and grades), lightly shaded by face. A narrower car is a soft screen-space ribbon (an
// antialiased line, edges faded over a pixel, the cars of a train joined into one streak),
// blended, drawn as a core that writes depth (so the tracks can't draw over it) and soft edges
// that don't; ribbon and box cross-fade over NEAR_BLEND pixels. Only trains near the camera are
// drawn: cars fade out with distance (a few times the view range), all of them fade out as the
// view zooms out past about z15, and past z14.5 (HIDE_RANGE) nothing is drawn or computed at
// all. All in the opaque pass, like the tracks, so tunnels show through the translucent
// ground. While trains are on screen the scene renders every frame; the
// clock only advances while frames are drawn (at most 0.1 s per frame), so trains pause in a
// hidden tab.
(function () {
'use strict';

// ---------- constants ----------
const SPEED = 1;            // time factor; initTrains({ speed }) overrides it
// Only trains near the camera are drawn (Anita, 2026-11-02: "only show trains that are close").
// "View range" is the camera's distance to the ground at the centre of the view: about 2.4 km at
// z15 and 3.5 km at z14.5 on the page's zoom scale, whatever the pitch.
const SHOW_RANGE = 2400;    // m of view range: trains at full strength below this...
const HIDE_RANGE = 3500;    // ...faded out by this; above it nothing is drawn or computed
const DIST_K = 2.5;         // cars further from the camera than this x the view range are not drawn
                            // (fading from 0.35 of that), within MIN_DIST..MAX_DIST
const MIN_DIST = 1500, MAX_DIST = 6000;
const NEAR_PX = 3.5;        // a car this many pixels wide or more is a box; narrower, a soft ribbon
const DYN = 9;              // floats per car updated each frame: front xyz, back xyz, rail z front/back, underground
const UNDER_BOOST = 0.45;   // underground, the translucent copy's colour x (1 + this): about the
                            // ground's front-face alpha, which is the share it takes in the blend
const NEAR_BLEND = 2.5;    // px over which the ribbon fades out over the box
const RIBBON_PX = 3.6;      // the ribbon is at least this wide (plus a pixel of soft edge)
const GAP = 1.2;            // m between cars
const RAIL_LIFT = 0.35;     // m from the rail to the bottom of a car body
const BREAK_M = 60;         // a jump this long between consecutive points ends a piece
const BRIDGE_M = 260;       // ...unless ways are missing from tracks.json there: up to this, a straight line
const MIN_PIECE = 300;      // m: shorter pieces get no trains (nor any under 4 train lengths)
const STOP_SNAP = 90;       // m: a stop further than this from the polyline is skipped
const DWELL = [6, 12];      // s at each stop (picked per stop, steady between reloads); halved
                            // with the doubled speeds, so the whole timetable runs at 2x
const TERMINAL_DWELL = 10;  // s at each end of a piece
const HEADWAY = 200;        // m: a train slows when another's car is this close ahead on its track
const HEADWAY_STOP = 70;    // m: ...and stands at this gap (0 HEADWAY turns the rule off)
const LIMIT = [-74.258, 40.510, -73.647, 40.973];   // W S E N: index.html's LIMIT, if the page doesn't expose it
const MAX_HOLD = 30;       // s: a train held this long by headway drives on regardless (see headway)
const LATERAL = 1.6;       // m: how close to its track a car must be to count (tracks are ~4 m apart)

// Train kinds: car length / width / height (m), cars, cruise speed (km/h), acceleration (m/s^2),
// km of route per train. Speeds and acceleration are twice real ones (Anita, 2026-11-02: "2x
// faster"); she tried half this density and asked for the plentiful trains back.
const KINDS = {
  adiv:    { len: 15.6, w: 2.7, h: 3.6, cars: 10, kmh: 100, acc: 2.0, every: 4 },
  bdiv:    { len: 18.3, w: 3.05, h: 3.7, cars: 10, kmh: 100, acc: 2.0, every: 4 },
  sir:     { len: 22.9, w: 3.05, h: 3.7, cars: 4, kmh: 130, acc: 2.0, every: 5 },
  path:    { len: 15.6, w: 2.8, h: 3.6, cars: 7, kmh: 110, acc: 2.0, every: 4 },
  lirr:    { len: 25.9, w: 3.2, h: 4.1, cars: 10, kmh: 200, acc: 1.6, every: 7 },
  mnr:     { len: 25.9, w: 3.2, h: 4.1, cars: 10, kmh: 200, acc: 1.6, every: 7 },
  amtrak:  { len: 26, w: 3.2, h: 4.3, cars: 8, kmh: 240, acc: 1.2, every: 16 },
  airtrain:{ len: 17.7, w: 2.8, h: 3.5, cars: 3, kmh: 120, acc: 2.0, every: 3 },
};
const CARS_BY_REF = { L: 8, G: 5, M: 8, J: 8, Z: 8, GS: 3, FS: 2, H: 5 };
function kindOf(s) {
  const sys = s.system || '';
  if (sys === 'PATH') return 'path';
  if (sys === 'LIRR') return 'lirr';
  if (sys === 'Metro-North') return 'mnr';
  if (sys === 'Amtrak' || sys === 'NJ Transit') return 'amtrak';
  if (sys === 'AirTrain') return 'airtrain';
  if (s.ref === 'SIR') return 'sir';
  return /^(1|2|3|4|5|6|6X|7|7X|GS)$/.test(s.ref) ? 'adiv' : 'bdiv';
}

const hexRGB = c => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
function defaultLineColour(c) {
  const [r, g, b] = hexRGB(c), lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 90 ? [r, g, b].map(v => Math.round(v + (255 - v) * 0.35)) : [r, g, b];
}
const smoothstep = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const metres = (lon0, lat0, lon1, lat1) => Math.hypot((lon1 - lon0) * 84300, (lat1 - lat0) * 111000);
// a steady pseudo-random number in [0, 1) from a few integers
function hash(...k) {
  let h = 2166136261;
  for (const v of k) { h ^= v | 0; h = Math.imul(h, 16777619); h ^= h >>> 13; }
  return ((h >>> 0) % 100000) / 100000;
}

// ---------- paths ----------
// A track's points from fraction f0 to f1 of its length (f0 > f1: backwards), ends interpolated.
function slice(t, f0, f1) {
  if (!t._cum) {
    const c = new Float64Array(t.lon.length);
    for (let i = 1; i < t.lon.length; i++) c[i] = c[i - 1] + metres(t.lon[i - 1], t.lat[i - 1], t.lon[i], t.lat[i]);
    t._cum = c;
  }
  const c = t._cum, tot = c[c.length - 1] || 1, n = c.length;
  const at = d => {
    let i = 1;
    while (i < n - 1 && c[i] < d) i++;
    const u = Math.max(0, Math.min(1, (d - c[i - 1]) / Math.max(1e-9, c[i] - c[i - 1])));
    return [t.lon[i - 1] + (t.lon[i] - t.lon[i - 1]) * u, t.lat[i - 1] + (t.lat[i] - t.lat[i - 1]) * u, t.z[i - 1] + (t.z[i] - t.z[i - 1]) * u, t.ground[i - 1] + (t.ground[i] - t.ground[i - 1]) * u];
  };
  const a = Math.min(f0, f1) * tot, b = Math.max(f0, f1) * tot, out = [at(a)];
  for (let i = 0; i < n; i++) if (c[i] > a + 0.5 && c[i] < b - 0.5) out.push([t.lon[i], t.lat[i], t.z[i], t.ground[i]]);
  out.push(at(b));
  return f0 > f1 ? out.reverse() : out;
}
// A variant's runs laid end to end, split into continuous pieces: [[lon, lat, z], ...] each.
function pieces(variant, byId, stats) {
  const out = [];
  let cur = [], missing = 0;
  const close = () => { if (cur.length > 1) out.push(cur); cur = []; };
  for (const [w, f0, f1] of variant.ways) {
    const t = byId.get(w);
    if (!t || t.lon.length < 2) { missing++; continue; }
    for (const p of slice(t, f0, f1)) {
      const last = cur[cur.length - 1];
      if (last) {
        const m = metres(last[0], last[1], p[0], p[1]);
        if (m < 0.5) continue;
        // a short stretch of ways left out of tracks.json (crossovers on the main lines) is
        // bridged with a straight line; anything else ends the piece
        if (m > (missing ? BRIDGE_M : BREAK_M)) { stats.breaks++; close(); }
        else if (missing) stats.bridged++;
      }
      missing = 0;
      cur.push(p);
    }
  }
  close();
  return out;
}

// ---------- timetable ----------
// Segments of one piece: { t0, dur, h0, d, v, a } (d = 0: a dwell). h is the head's distance along
// the piece; it runs from the train's length to the end.
function timetable(L, trainLen, stopS, k, seed) {
  const hMin = Math.min(trainLen, L), v = k.kmh / 3.6, a = k.acc;
  // head positions to stop at: the train centred on the stop, within [hMin, L]
  let hs = stopS.map(s => Math.max(hMin, Math.min(L, s + trainLen / 2)));
  hs = hs.filter((h, i) => i === 0 || h - hs[i - 1] > 30);
  if (!hs.length || hs[0] - hMin > 30) hs.unshift(hMin);
  if (L - hs[hs.length - 1] > 30) hs.push(L);
  const seg = [];
  let t = 0;
  const dwell = dur => { seg.push({ t0: t, dur, h0: hs.length ? cur : hMin, d: 0, v: 0, a }); t += dur; };
  let cur = hs[0];
  dwell(TERMINAL_DWELL);
  for (let i = 1; i < hs.length; i++) {
    const d = hs[i] - cur;
    const vp = Math.min(v, Math.sqrt(a * d));       // peak speed reached
    const dur = 2 * vp / a + (d - vp * vp / a) / vp;
    seg.push({ t0: t, dur, h0: cur, d, v: vp, a });
    t += dur; cur = hs[i];
    dwell(i === hs.length - 1 ? TERMINAL_DWELL : DWELL[0] + (DWELL[1] - DWELL[0]) * hash(seed, i));
  }
  return { seg, T: t };
}
function headAt(tt, tau) {
  const s = tt.seg;
  let lo = 0, hi = s.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (s[m].t0 <= tau) lo = m; else hi = m - 1; }
  const g = s[lo], x = Math.max(0, Math.min(g.dur, tau - g.t0));
  if (g.d === 0) return g.h0;
  const ta = g.v / g.a, da = 0.5 * g.a * ta * ta;
  if (x < ta) return g.h0 + 0.5 * g.a * x * x;
  if (x > g.dur - ta) { const r = g.dur - x; return g.h0 + g.d - 0.5 * g.a * r * r; }
  return g.h0 + da + g.v * (x - ta);
}

// ---------- shaders ----------
// Two looks, by how wide a car is on screen (its true width in pixels, wpx):
// - near (wpx >= u_nearPx): a shaded box;
// - far: a soft screen-space ribbon along the car, at least u_ribPx wide, its edges faded over a
//   pixel like an antialiased line, cars of a train joined end to end (only the train's two ends
//   are softened, so the train reads as one soft streak). It fades out as the box comes in.
// Ribbons fade with distance (over u_maxDist) and zoom (u_fade); boxes hand over to ribbons
// sooner as u_fade drops (u_nearPx grows), so nothing opaque pops off.
const COMMON = `
in vec3 a_front;    // front of the car on NAVD88 0, relative to the centre
in vec3 a_back;
in vec2 a_z;        // rail height (NAVD88 m) at front and back; a_z.x < -9000: not drawn
in vec4 a_col;      // body colour, width (m)
in vec2 a_dim;      // height (m), ends: 1 lead car, 2 last car, 3 both
in float a_under;   // 0 above ground .. 1 a few metres under it
uniform float u_boost;    // the translucent copy's lift underground (see createGpu), 0 for the opaque one
uniform float u_exag;
uniform vec3 u_centre;
uniform float u_pxk;      // metres per pixel per metre of eye depth
uniform float u_maxDist;
uniform float u_lift;
uniform float u_nearPx;
uniform float u_blendPx;
uniform float u_fade;
vec3 g_up, g_f, g_b, g_fwd;
float g_len, g_d, g_mpp, g_wpx;
// false: not drawn
bool carSetup() {
  g_up = normalize((u_centre + a_back) * vec3(1.0 / 40680631590769.0, 1.0 / 40680631590769.0, 1.0 / 40408299984661.445));
  g_f = a_front + g_up * (a_z.x * u_exag + u_lift);
  g_b = a_back + g_up * (a_z.y * u_exag + u_lift);
  g_fwd = g_f - g_b;
  g_len = length(g_fwd);
  vec4 ec = czm_modelView * vec4(0.5 * (g_f + g_b), 1.0);
  g_d = -ec.z;
  if (a_z.x < -9000.0 || g_len < 0.05 || g_d > u_maxDist || g_d <= 0.0) return false;
  g_fwd /= g_len;
  g_mpp = g_d * u_pxk;
  g_wpx = a_col.a / g_mpp;
  return true;
}
`;
const VS = COMMON + `
in vec3 a_box;      // unit box: x across [-0.5, 0.5], y along [0, 1], z up [0, 1]
in vec3 a_nrm;      // its face normal, same axes
out vec3 v_col;
out vec3 v_nrm;
out float v_up;
out float v_boost;
void main() {
  v_boost = 1.0 + u_boost * a_under;
  if (!carSetup() || g_wpx < u_nearPx) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec3 right = normalize(cross(g_fwd, g_up));
  vec3 top = cross(right, g_fwd);
  float w = a_col.a, h = a_dim.x;
  vec3 p = g_b + g_fwd * (a_box.y * g_len) + right * (a_box.x * w) + top * (a_box.z * h);
  gl_Position = czm_modelViewProjection * vec4(p, 1.0);
  v_col = a_col.rgb;
  v_nrm = a_nrm;
  v_up = a_box.z;
}`;
const RIBBON_VS = COMMON + `
const float HALO = 1.0;   // px of soft edge
in vec2 a_q;       // x across [-1, 1], y: 0 back end, 1 front end
uniform float u_ribPx;
uniform float u_gap;
out vec3 v_col;
out float v_across;
out float v_half;
out float v_t;
out float v_lenPx;
out vec2 v_ends;
out float v_alpha;
out float v_boost;
void main() {
  v_boost = 1.0 + u_boost * a_under;
  if (!carSetup() || g_wpx >= u_nearPx + u_blendPx) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float lead = mod(a_dim.y, 2.0) >= 1.0 ? 1.0 : 0.0, tail = a_dim.y >= 2.0 ? 1.0 : 0.0;
  // a car's front reaches the back of the car ahead, so a train is one unbroken streak
  vec3 lift = g_up * (0.6 * a_dim.x);
  vec4 cb = czm_modelViewProjection * vec4(g_b + lift, 1.0);
  vec4 cf = czm_modelViewProjection * vec4(g_f + g_fwd * (u_gap * (1.0 - lead)) + lift, 1.0);
  if (cb.w <= 0.0 || cf.w <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec2 hv = 0.5 * czm_viewport.zw;
  vec2 sb = cb.xy / cb.w * hv, sf = cf.xy / cf.w * hv, dv = sf - sb;
  float lpx = length(dv);
  vec2 dir = lpx > 1e-4 ? dv / lpx : vec2(1.0, 0.0), n = vec2(-dir.y, dir.x);
  // Fading out (with distance and zoom) thins the streak and only then lowers its alpha: a
  // half-transparent streak over the near-black ground reads as a dark smudge, a thin one in
  // full colour still reads as the line's colour.
  float f = u_fade * (1.0 - smoothstep(0.35 * u_maxDist, u_maxDist, g_d));
  float halfW = 0.5 * max(g_wpx, u_ribPx) * mix(0.4, 1.0, f);
  // room around the streak (and past the train's two ends) for its soft edge
  float ext = (a_q.y > 0.5 ? lead : -tail) * HALO;
  vec4 c = a_q.y > 0.5 ? cf : cb;
  c.xy += (n * a_q.x * (halfW + HALO) + dir * ext) / hv * c.w;
  gl_Position = c;
  v_col = mix(a_col.rgb, vec3(1.0), 0.35);
  v_across = a_q.x * (halfW + HALO);
  v_half = halfW;
  v_t = a_q.y > 0.5 ? lpx + ext : ext;
  v_lenPx = lpx;
  v_ends = vec2(lead, tail);
  v_alpha = smoothstep(0.0, 0.3, f) * (1.0 - smoothstep(u_nearPx, u_nearPx + u_blendPx, g_wpx));
}`;
const RIBBON_FS = `
in vec3 v_col;
in float v_across;
in float v_half;
in float v_t;
in float v_lenPx;
in vec2 v_ends;
in float v_alpha;
in float v_boost;
uniform float u_part;     // 0 the core, 1 the edges
void main() {
  // coverage of the coloured streak, antialiased over a pixel
  float a = clamp(v_half + 0.5 - abs(v_across), 0.0, 1.0);
  if (v_ends.x > 0.5) a *= clamp(v_lenPx + 0.5 - v_t, 0.0, 1.0);
  if (v_ends.y > 0.5) a *= clamp(v_t + 0.5, 0.0, 1.0);
  // (no dark halo: at a few pixels wide it outweighed the colour and far trains read as black)
  // drawn twice: the core (pixels at least half covered) writing depth, so the tracks behind it
  // can't draw over it, then the soft edges without writing depth
  bool core = a >= 0.5 && v_alpha >= 0.5;   // a faint streak must not hide the track behind it
  // u_part 0: the core only (opaque pass, writing depth); 2: all of it (translucent pass)
  if (u_part < 0.5 ? !core : a * v_alpha < 0.004) discard;
  out_FragColor = vec4(v_col * v_boost, a * v_alpha);
}`;
const FS = `
in vec3 v_col;
in vec3 v_nrm;
in float v_up;
in float v_boost;
void main() {
  // the line colour lifted a little (the translucent ground dims everything underground), with
  // light face shading so a box still reads as a box (2026-11-02: brighter, no dark outline)
  vec3 c = mix(v_col, vec3(1.0), 0.12);
  if (v_nrm.z > 0.5) c = mix(c, vec3(1.0), 0.3);               // roof
  else if (abs(v_nrm.y) > 0.5) c *= 0.86;                      // ends
  else c *= v_nrm.x > 0.0 ? 1.0 : 0.9;                         // sides
  if (v_nrm.z < 0.5 && v_up < 0.15) c *= 0.75;                 // underframe
  out_FragColor = vec4(c * v_boost, 1.0);
}`;

// unit box, 24 vertices (4 per face, own normal), 36 indices
function boxGeometry() {
  const faces = [
    [[0, 0, 1], [[-.5, 0, 1], [.5, 0, 1], [.5, 1, 1], [-.5, 1, 1]]],
    [[0, 0, -1], [[-.5, 0, 0], [-.5, 1, 0], [.5, 1, 0], [.5, 0, 0]]],
    [[1, 0, 0], [[.5, 0, 0], [.5, 1, 0], [.5, 1, 1], [.5, 0, 1]]],
    [[-1, 0, 0], [[-.5, 0, 0], [-.5, 0, 1], [-.5, 1, 1], [-.5, 1, 0]]],
    [[0, 1, 0], [[-.5, 1, 0], [-.5, 1, 1], [.5, 1, 1], [.5, 1, 0]]],
    [[0, -1, 0], [[-.5, 0, 0], [.5, 0, 0], [.5, 0, 1], [-.5, 0, 1]]],
  ];
  const v = [], idx = [];
  faces.forEach(([n, q], f) => {
    for (const p of q) v.push(...p, ...n);
    idx.push(f * 4, f * 4 + 1, f * 4 + 2, f * 4, f * 4 + 2, f * 4 + 3);
  });
  return { v: new Float32Array(v), idx: new Uint16Array(idx) };
}

// ---------- init ----------
function initTrains(viewer, opts) {
  const C = window.Cesium, scene = viewer.scene || viewer, camera = scene.camera;
  const tracks = opts.tracks.tracks || opts.tracks, services = opts.services.services || opts.services;
  const geoid = opts.geoid, getExag = opts.getExaggeration || (() => scene.verticalExaggeration);
  const lineColour = opts.lineColour || defaultLineColour, speed = opts.speed || SPEED;
  const byId = new Map(tracks.map(t => [t.id, t]));
  const centre = C.Cartesian3.fromDegrees(-73.95, 40.73, geoid);
  // the page's square [W, S, E, N]: index.html clips everything at it and offers it as
  // trackdepth.LIMIT; opts.limit overrides, LIMIT below is the fallback
  const limit = opts.limit || (window.trackdepth && window.trackdepth.LIMIT) || LIMIT;
  const stats = { trains: 0, cars: 0, variants: 0, pieces: 0, breaks: 0, bridged: 0, shortPieces: 0, boxStops: 0, nodeStops: 0 };

  // platform boxes (opts.platforms: data/platforms.json), for where trains stand at a stop
  const boxIndex = ((opts.platforms && opts.platforms.boxes) || []).filter(b => b.ring && b.ring.length >= 3).map(b => {
    const n = b.ring.length;
    return { ring: b.ring, tracks: new Set(b.tracks || []), lon: b.ring.reduce((a, p) => a + p[0], 0) / n, lat: b.ring.reduce((a, p) => a + p[1], 0) / n };
  });
  // the middle of the platform box at a stop, as a distance along the piece, or null: a box within
  // 300 m of the stop beside one of the variant's own tracks; its extent along the piece is the
  // range of its ring's corners projected onto the piece (all within 40 m of it)
  function platformCentre(pts, cum, s, wayIds) {
    const i0 = indexAt(cum, s), p = pts[i0];
    let best = null, bestM = 300;
    for (const b of boxIndex) {
      const m = metres(p[0], p[1], b.lon, b.lat);
      if (m >= bestM) continue;
      let ours = false;
      for (const w of b.tracks) if (wayIds.has(w)) { ours = true; break; }
      if (!ours) continue;
      let lo = Infinity, hi = -Infinity, ok = true;
      for (const [lon, lat] of b.ring) {
        const q = nearestSeg(pts, cum, lon, lat, s - 500, s + 500);
        if (q.m > 40) { ok = false; break; }
        lo = Math.min(lo, q.s); hi = Math.max(hi, q.s);
      }
      if (ok && hi - lo > 30) { best = (lo + hi) / 2; bestM = m; }
    }
    return best;
  }

  // stops of each system, for variants that list none (most LIRR ones)
  const pool = {};
  for (const s of services) for (const v of s.variants) {
    const key = s.system || 'subway';
    for (const st of v.stops) (pool[key] = pool[key] || []).push(st);
  }

  // ----- build every piece's polyline (relative to the centre) and its trains -----
  const runs = [];   // { px, py, pz, z, cum, L, tt, trains: [{ phase }], k, nCars, col, carLen, w, h, firstCar }
  let carTotal = 0;
  const cart = new C.Cartesian3();
  services.forEach((s, si) => {
    const full = s.variants.filter(v => !v.when);
    // a part-time service runs its am rush variants only: its am and pm variants are often the two
    // directions on one track (the <6> and <7> expresses on their middle track), never at once
    const am = s.variants.filter(v => /\bam\b/.test(v.when || ''));
    const vs = full.length ? full : am.length ? am : s.variants;
    const k = KINDS[kindOf(s)], nCars = CARS_BY_REF[s.ref] || k.cars;
    // fewer trains where a service has many overlapping variants (Amtrak) or runs part time only
    const every = k.every * (full.length ? 1 : 2) * Math.max(1, vs.length / (s.system ? 2 : 4));
    const col = lineColour(s.colour);
    const rgb = (Array.isArray(col) ? col : hexRGB(col)).map(x => x / 255);
    vs.forEach((v, vi) => {
      stats.variants++;
      // a "<=>" relation runs backwards on its own tracks only if services.json has no variant of
      // its own for the other direction ("paired": fetch_routes.py routes that one on the
      // right-hand track)
      const both = /<=>/.test(v.name) && !v.paired;
      for (const pts of pieces(v, byId, stats)) {
        const n = pts.length, px = new Float32Array(n), py = new Float32Array(n), pz = new Float32Array(n);
        const z = new Float32Array(n), g = new Float32Array(n), cum = new Float64Array(n);
        for (let i = 0; i < n; i++) {
          C.Cartesian3.fromDegrees(pts[i][0], pts[i][1], geoid, C.Ellipsoid.WGS84, cart);
          px[i] = cart.x - centre.x; py[i] = cart.y - centre.y; pz[i] = cart.z - centre.z; z[i] = pts[i][2]; g[i] = pts[i][3];
          if (i) cum[i] = cum[i - 1] + metres(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1]);
        }
        const L = cum[n - 1];
        if (L < Math.max(MIN_PIECE, 4 * nCars * (k.len + GAP))) { stats.shortPieces++; continue; }
        stats.pieces++;
        // points inside the page's square (cars outside it are not drawn)
        const inside = Uint8Array.from(pts, p => p[0] >= limit[0] && p[0] <= limit[2] && p[1] >= limit[1] && p[1] <= limit[3] ? 1 : 0);
        // a piece that comes back to where it started (an out-and-back relation, NJ Transit's and
        // Metro-North's) already runs both ways: no extra reversed trains on it
        const roundTrip = metres(pts[0][0], pts[0][1], pts[n - 1][0], pts[n - 1][1]) < 500 && L > 2000;
        // stops along the piece, in order
        let stops = v.stops;
        if (stops.length < 2) stops = (pool[s.system || 'subway'] || []).filter(st => nearest(pts, cum, st, 0).m < 40);
        const stopS = [];
        let from = 0;
        for (const st of stops) {
          const q = nearest(pts, cum, st, from);
          if (q.m > STOP_SNAP) continue;
          if (stopS.length && q.s <= stopS[stopS.length - 1] + 1) continue;
          stopS.push(q.s); from = q.s;
        }
        if (stops.length < 2) stopS.sort((a, b) => a - b);
        // Where a station has a platform box (data/platforms.json) on this variant's tracks, the
        // train stands centred in the box: OSM's stop node is often at one end of the platform (5 Av
        // on the 7: its west end), so a train centred on the node overhung the platform by half.
        if (boxIndex.length) {
          const wayIds = new Set(v.ways.map(r => r[0]));
          for (let k2 = 0; k2 < stopS.length; k2++) {
            const c = platformCentre(pts, cum, stopS[k2], wayIds);
            if (c != null) { stopS[k2] = c; stats.boxStops++; } else stats.nodeStops++;
          }
          stopS.sort((a, b) => a - b);
        }
        for (const dir of both && !roundTrip ? [1, -1] : [1]) {
          const run = dir === 1 ? { px, py, pz, z, g, cum, inside } : reverseRun(px, py, pz, z, g, cum, inside);
          const ss = dir === 1 ? stopS : stopS.map(x => L - x).reverse();
          const carsHere = Math.max(1, Math.min(nCars, Math.floor((L + GAP) / (k.len + GAP))));
          const trainLen = carsHere * k.len + (carsHere - 1) * GAP;
          const seed = si * 1000 + vi * 10 + (dir === 1 ? 0 : 5);
          const tt = timetable(L, trainLen, ss, k, seed);
          const nt = Math.max(1, Math.round(L / 1000 / every));
          const off = hash(seed, 7) * tt.T, trains = [];
          for (let j = 0; j < nt; j++) trains.push({ phase: off + j * tt.T / nt });
          Object.assign(run, { L, tt, trains, nCars: carsHere, carLen: k.len, w: k.w, h: k.h, rgb, firstCar: carTotal,
            label: (dir === 1 ? '' : 'reversed ') + v.name, stops: ss.length, listed: stops.length });
          runs.push(run);
          carTotal += nt * carsHere;
          stats.trains += nt;
        }
      }
    });
  });
  stats.cars = carTotal;

  // ----- GPU buffers -----
  const box = boxGeometry();
  const dyn = new Float32Array(carTotal * DYN);       // front xyz, back xyz, z front, z back, underground 0-1
  const stat = new Float32Array(carTotal * 6);      // r g b width, height, ends (1 lead, 2 last)
  for (const r of runs) {
    let c = r.firstCar;
    for (let j = 0; j < r.trains.length; j++) for (let k = 0; k < r.nCars; k++, c++) {
      stat.set([r.rgb[0], r.rgb[1], r.rgb[2], r.w, r.h, (k === 0 ? 1 : 0) + (k === r.nCars - 1 ? 2 : 0)], c * 6);
      dyn[c * DYN + 6] = -10000;
    }
  }
  // bounding sphere of every polyline, padded for heights
  let bs = C.BoundingSphere.fromPoints(runs.flatMap(r => [0, r.px.length >> 1, r.px.length - 1].map(i => new C.Cartesian3(r.px[i], r.py[i], r.pz[i]))));
  bs = new C.BoundingSphere(C.Cartesian3.add(bs.center, centre, new C.Cartesian3()), bs.radius + 3000);   // world coordinates
  const modelMatrix = C.Matrix4.fromTranslation(centre);

  let gpu = null, visible = true, active = false, disposed = false, clock = 0, lastNow = 0, paused = false, placed = false;
  const uniforms = {
    u_exag: () => getExag(),
    u_centre: () => centre,
    u_pxk: () => pxk,
    u_maxDist: () => maxDist,
    u_lift: () => RAIL_LIFT,
    // as the trains fade out, boxes hand over to the (fading) ribbons sooner, so none pops off
    u_nearPx: () => NEAR_PX / Math.max(fade, 0.05),
    u_blendPx: () => NEAR_BLEND,
    u_fade: () => fade,
    u_ribPx: () => RIBBON_PX,
    u_gap: () => GAP,
    u_boost: () => 0,
  };
  const overUniforms = Object.assign({}, uniforms, { u_boost: () => UNDER_BOOST });
  let pxk = 0.001, fade = 1, maxDist = MAX_DIST;

  function createGpu(context) {
    const vb = C.Buffer.createVertexBuffer({ context, typedArray: box.v, usage: C.BufferUsage.STATIC_DRAW });
    const ib = C.Buffer.createIndexBuffer({ context, typedArray: box.idx, usage: C.BufferUsage.STATIC_DRAW, indexDatatype: C.IndexDatatype.UNSIGNED_SHORT });
    const db = C.Buffer.createVertexBuffer({ context, typedArray: dyn, usage: C.BufferUsage.DYNAMIC_DRAW });
    const sb = C.Buffer.createVertexBuffer({ context, typedArray: stat, usage: C.BufferUsage.STATIC_DRAW });
    db.vertexArrayDestroyable = false; sb.vertexArrayDestroyable = false;   // shared by two vertex arrays
    const F = C.ComponentDatatype.FLOAT;
    const loc = { a_box: 0, a_nrm: 1, a_front: 2, a_back: 3, a_z: 4, a_col: 5, a_dim: 6, a_under: 7 };
    const perCar = () => [   // the per-car (instanced) attributes, shared by both vertex arrays
      { index: 2, vertexBuffer: db, componentsPerAttribute: 3, componentDatatype: F, offsetInBytes: 0, strideInBytes: DYN * 4, instanceDivisor: 1 },
      { index: 3, vertexBuffer: db, componentsPerAttribute: 3, componentDatatype: F, offsetInBytes: 12, strideInBytes: DYN * 4, instanceDivisor: 1 },
      { index: 4, vertexBuffer: db, componentsPerAttribute: 2, componentDatatype: F, offsetInBytes: 24, strideInBytes: DYN * 4, instanceDivisor: 1 },
      { index: 7, vertexBuffer: db, componentsPerAttribute: 1, componentDatatype: F, offsetInBytes: 32, strideInBytes: DYN * 4, instanceDivisor: 1 },
      { index: 5, vertexBuffer: sb, componentsPerAttribute: 4, componentDatatype: F, offsetInBytes: 0, strideInBytes: 24, instanceDivisor: 1 },
      { index: 6, vertexBuffer: sb, componentsPerAttribute: 2, componentDatatype: F, offsetInBytes: 16, strideInBytes: 24, instanceDivisor: 1 },
    ];
    const va = new C.VertexArray({ context, indexBuffer: ib, attributes: [
      { index: 0, vertexBuffer: vb, componentsPerAttribute: 3, componentDatatype: F, offsetInBytes: 0, strideInBytes: 24 },
      { index: 1, vertexBuffer: vb, componentsPerAttribute: 3, componentDatatype: F, offsetInBytes: 12, strideInBytes: 24 },
      ...perCar(),
    ] });
    const sp = C.ShaderProgram.fromCache({ context, vertexShaderSource: VS, fragmentShaderSource: FS, attributeLocations: loc });
    const command = (face, uniformMap) => new C.DrawCommand({ vertexArray: va, shaderProgram: sp, primitiveType: C.PrimitiveType.TRIANGLES,
      renderState: C.RenderState.fromCache({ depthTest: { enabled: true }, depthMask: true, cull: { enabled: true, face } }),
      pass: C.Pass.OPAQUE, modelMatrix, boundingVolume: bs, uniformMap, count: box.idx.length, instanceCount: carTotal, owner: prim, cull: true });
    // far: the soft ribbons, a quad per car sharing the per-car buffers. Blended in the opaque
    // pass (so the translucent ground dims them as it dims the tracks); the core writes depth.
    const qb = C.Buffer.createVertexBuffer({ context, typedArray: new Float32Array([-1, 0, 1, 0, 1, 1, -1, 1]), usage: C.BufferUsage.STATIC_DRAW });
    const qi = C.Buffer.createIndexBuffer({ context, typedArray: new Uint16Array([0, 1, 2, 0, 2, 3]), usage: C.BufferUsage.STATIC_DRAW, indexDatatype: C.IndexDatatype.UNSIGNED_SHORT });
    const rloc = { a_q: 0, a_front: 2, a_back: 3, a_z: 4, a_col: 5, a_dim: 6, a_under: 7 };
    const rva = new C.VertexArray({ context, indexBuffer: qi, attributes: [
      { index: 0, vertexBuffer: qb, componentsPerAttribute: 2, componentDatatype: F, offsetInBytes: 0, strideInBytes: 8 },
      ...perCar(),
    ] });
    const rsp = C.ShaderProgram.fromCache({ context, vertexShaderSource: RIBBON_VS, fragmentShaderSource: RIBBON_FS, attributeLocations: rloc });
    const ribbon = (part, depthMask, pass) => new C.DrawCommand({ vertexArray: rva, shaderProgram: rsp, primitiveType: C.PrimitiveType.TRIANGLES,
      renderState: C.RenderState.fromCache({ depthTest: { enabled: true, func: C.DepthFunction.LESS_OR_EQUAL }, depthMask, blending: C.BlendingState.ALPHA_BLEND }),
      pass, modelMatrix, boundingVolume: bs, uniformMap: Object.assign({}, pass === C.Pass.TRANSLUCENT ? overUniforms : uniforms, { u_part: () => part }),
      count: 6, instanceCount: carTotal, owner: prim, cull: true });
    // Bright through the ground. The translucent ground is drawn in Cesium's translucent pass, and
    // is laid over everything in the opaque pass: an opaque train underground came out at about
    // half brightness. The tracks are translucent primitives, blended with the ground in the same
    // pass (order-independent translucency), which keeps them bright. So each train is drawn twice:
    // in the opaque pass, writing depth (the tracks behind it don't show through, and it hides the
    // ground beyond it), and again in the translucent pass at full alpha, where it is blended with
    // the ground in front of it as the tracks are. Above ground nothing is in front of it: it shows
    // as drawn. The blend still gives the ground in front some say, so underground the copy's
    // colour is lifted by UNDER_BOOST (more than 1 is fine: Cesium blends these in float buffers),
    // which brings it to about its own colour.
    const boxOver = new C.DrawCommand({ vertexArray: va, shaderProgram: sp, primitiveType: C.PrimitiveType.TRIANGLES,
      renderState: C.RenderState.fromCache({ depthTest: { enabled: true, func: C.DepthFunction.LESS_OR_EQUAL }, depthMask: false,
        blending: C.BlendingState.ALPHA_BLEND, cull: { enabled: true, face: C.CullFace.BACK } }),
      pass: C.Pass.TRANSLUCENT, modelMatrix, boundingVolume: bs, uniformMap: overUniforms, count: box.idx.length, instanceCount: carTotal, owner: prim, cull: true });
    // the cars and the ribbons' cores (opaque), then both again over the ground (translucent)
    return { va, sp, rva, rsp, db, sb, cmds: [command(C.CullFace.BACK, uniforms), ribbon(0, true, C.Pass.OPAQUE), boxOver, ribbon(2, false, C.Pass.TRANSLUCENT)] };
  }

  // positions of every car at the current clock, into dyn. Each train runs its timetable at
  // clock - its delay (seconds of timetable it has lost waiting behind other trains).
  function place() {
    const t = clock * speed;
    for (const r of runs) {
      const { cum, px, py, pz, z, tt, nCars, carLen } = r, n = cum.length;
      let c = r.firstCar;
      for (const tr of r.trains) {
        const tau = ((t - tr.delay + tr.phase) % tt.T + tt.T) % tt.T;
        const h = headAt(tt, tau);
        // index of the segment holding the head
        let lo = 0, hi = n - 2;
        while (lo < hi) { const m = (lo + hi + 1) >> 1; if (cum[m] <= h) lo = m; else hi = m - 1; }
        tr.h = h; tr.hi = lo;
        let i = lo;
        for (let k = 0; k < nCars; k++, c++) {
          const sf = h - k * (carLen + GAP), sb = sf - carLen, o = c * DYN;
          while (i > 0 && cum[i] > sf) i--;
          pointAt(r, i, sf, dyn, o, o + 6);
          const iFront = i + 1;
          // how far underground the car is: 0 down to 2 m under the street, 1 from 6 m
          const gF = r.g[i] + (r.g[i + 1] - r.g[i]) * Math.max(0, Math.min(1, (sf - cum[i]) / Math.max(1e-6, cum[i + 1] - cum[i])));
          dyn[o + 8] = Math.max(0, Math.min(1, (gF - dyn[o + 6] - 2) / 4));
          while (i > 0 && cum[i] > sb) i--;
          pointAt(r, i, sb, dyn, o + 3, o + 7);
          // outside the page's square: not drawn (nor seen by headway)
          if (!r.inside[iFront] || !r.inside[i]) dyn[o + 6] = -10000;
        }
      }
    }
  }

  // Headway: a train with another train's car on its own track within HEADWAY m ahead (same
  // direction, the car's axis within LATERAL m of the track) slows, and stands at HEADWAY_STOP m,
  // by losing timetable time (its delay grows) until the way clears. Cars are bucketed in a
  // 30 m grid on their points (front, middle, back); a train looks ahead every 15 m. Trains on
  // the same polyline running the other way (the "<=>" variants) still pass through each other.
  const trainOfCar = new Int32Array(carTotal);
  { let ti = 0;
    for (const r of runs) r.trains.forEach((tr, j) => {
      for (let k = 0; k < r.nCars; k++) trainOfCar[r.firstCar + j * r.nCars + k] = ti;
      Object.assign(tr, { id: ti++, delay: 0, h: 0, hi: 0, held: 0, ignoreUntil: -Infinity, blocker: -1 });
    });
  }
  // Only trains within `reach` m of `cam` (relative to the centre) take part: unseen ones pass
  // through each other, which keeps the cost down (about 4 ms a frame for all of them).
  const CELL = 30, grid = new Map(), probe = new Float32Array(4), head = new Float32Array(4);
  const cellKey = (x, y, zz) => (Math.floor(x / CELL) * 73856093) ^ (Math.floor(y / CELL) * 19349663) ^ (Math.floor(zz / CELL) * 83492791);
  const near = (x, y, zz, cam, reach) => !cam || Math.abs(x - cam.x) + Math.abs(y - cam.y) + Math.abs(zz - cam.z) < reach;
  function addToGrid(x, y, zz, c) {
    const key = cellKey(x, y, zz);
    const b = grid.get(key);
    if (!b) grid.set(key, [c]); else if (b[b.length - 1] !== c) b.push(c);
  }
  function headway(dt, cam, reach) {
    grid.clear();
    for (let c = 0; c < carTotal; c++) {
      const o = c * DYN;
      if (dyn[o + 6] < -9000 || !near(dyn[o], dyn[o + 1], dyn[o + 2], cam, reach + 300)) continue;
      addToGrid(dyn[o], dyn[o + 1], dyn[o + 2], c);
      addToGrid(dyn[o + 3], dyn[o + 4], dyn[o + 5], c);
    }
    for (const r of runs) {
      const { cum } = r, n = cum.length;
      for (const tr of r.trains) {
        pointAt(r, tr.hi, tr.h, head, 0, 3);
        if (!near(head[0], head[1], head[2], cam, reach) || clock * speed < tr.ignoreUntil) continue;
        let gap = Infinity, i = tr.hi;
        for (let d = 15; d <= HEADWAY && gap === Infinity; d += 15) {
          const s = tr.h + d;
          if (s > r.L) break;
          while (i < n - 2 && cum[i + 1] < s) i++;
          pointAt(r, i, s, probe, 0, 3);
          const ux = r.px[i + 1] - r.px[i], uy = r.py[i + 1] - r.py[i], uz = r.pz[i + 1] - r.pz[i];
          const ul = Math.hypot(ux, uy, uz) || 1;
          const b = grid.get(cellKey(probe[0], probe[1], probe[2]));
          if (!b) continue;
          for (const c of b) {
            if (trainOfCar[c] === tr.id) continue;
            const o = c * DYN;
            const vx = dyn[o] - dyn[o + 3], vy = dyn[o + 1] - dyn[o + 4], vz = dyn[o + 2] - dyn[o + 5];
            const vl2 = vx * vx + vy * vy + vz * vz;
            if (vl2 < 1e-6 || (vx * ux + vy * uy + vz * uz) / (Math.sqrt(vl2) * ul) < 0.5) continue;   // other way
            // only a car whose back is ahead of this train's head (two overlapping trains would
            // otherwise each wait for the other for ever)
            if ((dyn[o + 3] - head[0]) * ux + (dyn[o + 4] - head[1]) * uy + (dyn[o + 5] - head[2]) * uz <= 0) continue;
            // distance from the probe to the car's axis
            const wx = probe[0] - dyn[o + 3], wy = probe[1] - dyn[o + 4], wz = probe[2] - dyn[o + 5];
            const f = Math.max(0, Math.min(1, (wx * vx + wy * vy + wz * vz) / vl2));
            if (Math.hypot(wx - vx * f, wy - vy * f, wz - vz * f) < LATERAL) { gap = d; tr.blocker = trainOfCar[c]; break; }
          }
        }
        // slow from HEADWAY down to standing at HEADWAY_STOP
        const k = 1 - smoothstep(HEADWAY_STOP, HEADWAY, gap);
        if (k > 0) tr.delay += dt * k;
        // Trains can wait on each other in a ring (variants whose polyline runs out and back over
        // the same track, Metro-North's and NJ Transit's "<=>" ones): one held for MAX_HOLD s
        // stops looking for 20 s and drives through.
        tr.held = k > 0.9 ? tr.held + dt : 0;
        if (tr.held > MAX_HOLD) { tr.held = 0; tr.ignoreUntil = clock * speed + 20; }
      }
    }
  }
  // advance the simulation by dt real seconds (headway every other call, on the time since)
  let hwDt = 0, hwTurn = 0;
  const camRTC = new C.Cartesian3();
  function step(dt, all) {
    if (paused || dt <= 0) return;
    clock += dt;
    hwDt += dt;
    if (HEADWAY > 0 && (all || (hwTurn++ & 1) === 0)) {
      C.Cartesian3.subtract(camera.positionWC, centre, camRTC);
      headway(hwDt * speed, all ? null : camRTC, maxDist + HEADWAY);
      hwDt = 0;
    }
    place();
  }

  const prim = {
    show: true,
    update(frameState) {
      if (disposed || !visible || !carTotal || !frameState.passes.render) return;
      const h = camera.positionCartographic.height - geoid;
      const range = h / Math.max(0.15, Math.sin(-camera.pitch));   // to the ground at the view centre
      active = range < HIDE_RANGE;
      if (!active) return;
      // zooming out, all trains fade away before they are dropped
      fade = 1 - smoothstep(SHOW_RANGE, HIDE_RANGE, range);
      maxDist = Math.max(MIN_DIST, Math.min(MAX_DIST, DIST_K * range));
      if (!gpu) gpu = createGpu(frameState.context);
      const now = performance.now();
      const dt = lastNow && !document.hidden ? Math.min(0.1, (now - lastNow) / 1000) : 0;
      lastNow = now;
      if (!placed) { place(); placed = true; }
      step(dt);
      gpu.db.copyFromArrayView(dyn, 0);
      const fr = camera.frustum, fovy = fr.fovy || fr.fov || 0.64;
      pxk = 2 * Math.tan(fovy / 2) / Math.max(1, frameState.context.drawingBufferHeight);
      frameState.commandList.push(...gpu.cmds);
    },
    isDestroyed: () => disposed,
    destroy() {
      if (gpu) { for (const o of [gpu.va, gpu.rva, gpu.sp, gpu.rsp, gpu.db, gpu.sb]) o.destroy(); gpu = null; }
      disposed = true;
    },
  };
  scene.primitives.add(prim);
  // keep rendering while trains are on screen (the page renders on demand otherwise)
  // (not while paused: nothing moves, so the page goes idle; a camera move still redraws them)
  const onPost = () => { if (active && visible && !paused && !document.hidden) scene.requestRender(); else lastNow = 0; };
  scene.postRender.addEventListener(onPost);
  const onVis = () => { lastNow = 0; if (!document.hidden) scene.requestRender(); };
  document.addEventListener('visibilitychange', onVis);
  scene.requestRender();

  return {
    stats,
    setVisible(on) { visible = !!on; active = false; lastNow = 0; scene.requestRender(); },
    dispose() {
      if (disposed) return;
      scene.postRender.removeEventListener(onPost);
      document.removeEventListener('visibilitychange', onVis);
      scene.primitives.remove(prim);   // destroys it (primitives.destroyPrimitives is true by default)
      if (!prim.isDestroyed()) prim.destroy();
      scene.requestRender();
    },
    // paused: the trains stand where they are (the page renders on demand again)
    setPaused(on) { paused = !!on; lastNow = 0; scene.requestRender(); },
    get paused() { return paused; },
    set paused(v) { this.setPaused(v); },
    // for tests: the clock (s); where car k's front is ([lon, lat, rail z] or null if not placed);
    // _step(dt) advances it as a frame would (headway included), _place() places at the clock
    get clock() { return clock; },
    set clock(v) { clock = v; scene.requestRender(); },
    _step(dt, all = true) { const p = paused; paused = false; step(dt, all); paused = p; },
    _delays() { return runs.flatMap(r => r.trains.map(tr => tr.delay)); },
    _car(k) {
      if (dyn[k * DYN + 6] < -9000) return null;
      const p = new C.Cartesian3(centre.x + dyn[k * DYN], centre.y + dyn[k * DYN + 1], centre.z + dyn[k * DYN + 2]);
      const c = C.Cartographic.fromCartesian(p);
      return [C.Math.toDegrees(c.longitude), C.Math.toDegrees(c.latitude), dyn[k * DYN + 6]];
    },
    _runs: runs,
    _place: place,
    get _gpu() { return gpu; },
    get _active() { return active; },
  };
}

// the point at distance s on segment j of a run, into out[o..o+2] and its rail height into out[oz]
function pointAt(r, j, s, out, o, oz) {
  const { cum, px, py, pz, z } = r;
  const u = Math.max(0, Math.min(1, (s - cum[j]) / Math.max(1e-6, cum[j + 1] - cum[j])));
  out[o] = px[j] + (px[j + 1] - px[j]) * u;
  out[o + 1] = py[j] + (py[j + 1] - py[j]) * u;
  out[o + 2] = pz[j] + (pz[j + 1] - pz[j]) * u;
  out[oz] = z[j] + (z[j + 1] - z[j]) * u;
}
// index of the point at or before distance s
function indexAt(cum, s) {
  let lo = 0, hi = cum.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (cum[m] <= s) lo = m; else hi = m - 1; }
  return lo;
}
// the nearest point of a piece's segments to (lon, lat), between distances s0 and s1: { s, m }
function nearestSeg(pts, cum, lon, lat, s0, s1) {
  const kx = 84300, ky = 111000;
  let best = { s: 0, m: Infinity };
  for (let i = Math.max(0, indexAt(cum, s0)); i < pts.length - 1 && cum[i] <= s1; i++) {
    const ax = pts[i][0] * kx, ay = pts[i][1] * ky, bx = pts[i + 1][0] * kx, by = pts[i + 1][1] * ky;
    const px = lon * kx, py = lat * ky, dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
    const f = l2 ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2)) : 0;
    const m = Math.hypot(px - ax - dx * f, py - ay - dy * f);
    if (m < best.m) best = { s: cum[i] + (cum[i + 1] - cum[i]) * f, m };
  }
  return best;
}
// the point of a piece nearest a stop, searching from distance `from` on: { s, m }
function nearest(pts, cum, st, from) {
  let best = { s: 0, m: Infinity };
  for (let i = 0; i < pts.length; i++) {
    if (cum[i] < from - 50) continue;
    const m = metres(pts[i][0], pts[i][1], st[0], st[1]);
    if (m < best.m) best = { s: cum[i], m };
  }
  return best;
}
function reverseRun(px, py, pz, z, g, cum, inside) {
  const n = cum.length, L = cum[n - 1], r = a => Float32Array.from(a).reverse();
  const c = new Float64Array(n);
  for (let i = 0; i < n; i++) c[i] = L - cum[n - 1 - i];
  return { px: r(px), py: r(py), pz: r(pz), z: r(z), g: r(g), cum: c, inside: Uint8Array.from(inside).reverse() };
}

window.initTrains = initTrains;

// On index.html, which offers window.trackdepth to plug-ins, attach by itself once the data is in:
// heights follow the page's vertical scale (latched when the page has redrawn the tracks at a new
// scale, so the trains move with the tracks), the result is window.trackdepth.trains.
// window.TRAINS_MANUAL = true before this script turns that off.
// The platform boxes (data/platforms.json, where the page loads it from: window.__base) are
// fetched first, for where trains stand at stations; without them trains centre on OSM's stop nodes.
let attaching = false;
async function autoAttach() {
  const td = window.trackdepth;
  if (!td || window.TRAINS_MANUAL || td.trains || attaching) return;
  attaching = true;
  let scale = td.scale;
  td.onScale(s => { scale = s; td.requestRender(); });
  const speed = +(/trainspeed=([\d.]+)/.exec(location.hash) || [0, 0])[1] || undefined;
  const platforms = await fetch((window.__base || 'data/') + 'platforms.json').then(r => r.ok ? r.json() : null).catch(() => null);
  td.trains = initTrains(td.scene, { tracks: td.data, services: td.services, geoid: td.GEOID, getExaggeration: () => scale, speed, platforms });
  // (the page's "Show trains" box may have been unticked while the boxes loaded)
  const cb = document.getElementById('show-trains');
  if (/notrains/.test(location.hash) || (cb && !cb.checked)) td.trains.setVisible(false);
}
if (window.trackdepth) {
  if (window.trackdepth.ready) autoAttach();
  else window.addEventListener('trackdepth:ready', autoAttach, { once: true });
}
})();
