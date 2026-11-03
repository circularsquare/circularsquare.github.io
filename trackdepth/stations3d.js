// stations3d.js: station boxes for trackdepth's CesiumJS page. A classic script (no module); it
// defines window.initStationBoxes.
//
// Use, once data/tracks.json and data/platforms.json have loaded (the page already has DATA,
// GEOID, S(), view and stationPts):
//
//   <script src="stations3d.js"></script>
//   const boxes = initStationBoxes(widget, {        // a Cesium.Viewer or CesiumWidget (anything with .scene)
//     platforms: await (await fetch('data/platforms.json')).json(),   // make_platforms.py
//     geoid: GEOID,                                // ellipsoid height of NAVD88 0, m
//     getExaggeration: () => S(),                  // read every frame: boxes follow the slider live
//     getZoom: () => view.zoom,                    // the page's zoom (512 px tiles); boxes fade in z14.6-15.4
//     dots: stationPts,                            // optional: the station dots, faded out as boxes fade in
//     stations: DATA.stations,                     // optional: checks each box's dot index against tracks.json
//     pickId: b => b.dot == null ? null : { kind: 'station', k: b.dot },
//                                                  // optional: a hover over a box reports its station dot
//                                                  // (a few boxes have no dot: stations build.py gives none)
//     tracks: DATA.tracks,                         // optional, with trackColour: tint each box the colour
//     trackColour: (ti, i) => pointRGB(DATA.tracks[ti], i, ti),   // its tracks are drawn in (0-255 RGB)
//   });
//   boxes.recolour();                              // after the page's colouring changes (Depth/Elevation/Line)
//   boxes.setVisible(document.getElementById('show-stations').checked);   // tie to "Show stations"
//   boxes.dispose();
//   boxes.stats                                    // { boxes, fallback, platforms, vertices }
//
// Each box is one station level of one line (make_platforms.py merges the platforms of one level
// and the tracks beside them): its footprint ring in lon/lat, the rail height (NAVD88 m) at each
// ring vertex, drawn from BELOW m under the rail to TOP m over it, both times the vertical scale,
// so it stretches with the tracks and the two levels of a stacked station stay apart. Platforms
// from OSM are drawn as a faint slab at rail + 1.1 m inside their box. With trackColour, a box is
// mixed from its light neutral toward its tracks' colour (35% faces, 40% platforms, 55% edges):
// the colour shared by most of its tracks at the point nearest its middle, else their mean.
//
// Drawing: one static vertex buffer for every box, two draw calls (faces and edges) in the
// translucent pass, no depth writes, so the tracks and trains inside stay visible. The vertex
// shader lifts each vertex by its NAVD88 height x the exaggeration uniform, read every frame. Below
// the fade range nothing is drawn. The page renders on request: the fade follows camera moves,
// which already request renders.
(function () {
'use strict';

const TOP = 4.0;          // m from the rail to the roof (stacked levels are >= 5 m apart rail to rail,
                          // build.py STACK_SEP, so the two boxes of a two-level station don't touch)
const BELOW = 0.3;        // m from the rail to the floor (a hair under, so the track is not coplanar)
const FADE = [14.6, 15.4];  // page zoom: boxes fade in and dots fade out across this range
const FILL = [222, 226, 232];      // light neutral
// alpha by face (before the fade)
const A_WALL = 0.10, A_ROOF = 0.08, A_FLOOR = 0.05, A_PLAT = 0.16, A_EDGE = 0.42, A_PEDGE = 0.22;
// how far each part is mixed from FILL toward its tracks' colour (trackColour option)
const T_FACE = 0.35, T_PLAT = 0.4, T_EDGE = 0.55;
const CORNER_DEG = 25;    // a vertical edge where the footprint turns by more than this
const NV = 14;            // floats per vertex: pos 3, z 1, tone 3, pick 4, tint 3

const VS = `
in vec3 a_pos;      // on NAVD88 0, relative to the centre
in float a_z;       // NAVD88 height of this vertex, m
in vec3 a_tone;     // colour factor, alpha, mix toward the tint
in vec4 a_pick;
in vec3 a_tint;     // the colour of the box's tracks, 0-1
uniform float u_exag;
uniform vec3 u_centre;
out vec3 v_tone;
out vec4 v_pick;
out vec3 v_tint;
void main() {
  vec3 up = normalize((u_centre + a_pos) * vec3(1.0 / 40680631590769.0, 1.0 / 40680631590769.0, 1.0 / 40408299984661.445));
  vec3 p = a_pos + up * (a_z * u_exag);
  gl_Position = czm_modelViewProjection * vec4(p, 1.0);
  v_tone = a_tone;
  v_pick = a_pick;
  v_tint = a_tint;
}`;
const FS = `
uniform vec3 u_fill;
uniform float u_alpha;
in vec3 v_tone;
in vec4 v_pick;
in vec3 v_tint;
void main() {
  out_FragColor = vec4(mix(u_fill, v_tint, v_tone.z) * v_tone.x, v_tone.y * u_alpha);
}`;
const PICK_FS = `
in vec3 v_tone;
in vec4 v_pick;
in vec3 v_tint;
void main() {
  // a box with no pick id (all zero; Cesium's pick keys start at 1, and small keys have alpha 0,
  // so alpha alone can't tell): let picks through to what is inside
  if (dot(v_pick, vec4(1.0)) == 0.0) discard;
  out_FragColor = v_pick;
}`;

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function initStationBoxes(viewer, opts) {
  const C = window.Cesium, scene = viewer.scene || viewer, camera = scene.camera;
  const data = opts.platforms, geoid = opts.geoid;
  const getExag = opts.getExaggeration || (() => scene.verticalExaggeration);
  const fade = opts.fade || FADE;
  const getZoom = opts.getZoom || (() => {
    // camera height above NAVD88 0 read as the range of a top-down view (a fallback only)
    const c = camera.positionCartographic, H = scene.canvas.clientHeight || 1;
    const mpp = Math.max(1, c.height - geoid) * Math.tan((camera.frustum.fovy || 0.64) / 2) / (H / 2);
    return Math.log2(2 * Math.PI * 6378137 * Math.cos(c.latitude) / (512 * mpp));
  });
  const boxes = data.boxes || [];
  const plats = data.platforms || [];
  const stats = { boxes: boxes.length, fallback: boxes.filter(b => b.fallback).length, platforms: 0, vertices: 0 };

  // box -> station dot index, checked against tracks.json's stations if given
  if (opts.stations) {
    const S = opts.stations;
    for (const b of boxes) {
      if (b.dot != null && S[b.dot] && S[b.dot].name === b.station) continue;
      const k = S.findIndex(s => s.name === b.station && s.line === b.line);
      b.dot = k >= 0 ? k : null;
    }
  }

  // ----- geometry, relative to a centre on NAVD88 0 -----
  const centre = C.Cartesian3.fromDegrees(-73.95, 40.73, geoid);
  const cart = new C.Cartesian3();
  const rel = (lon, lat) => { C.Cartesian3.fromDegrees(lon, lat, geoid, C.Ellipsoid.WGS84, cart); return [cart.x - centre.x, cart.y - centre.y, cart.z - centre.z]; };
  const F = [], Fi = [], E = [], Ei = [];   // faces: vertices (NV floats), indices; edges
  const boxOfVertex = [], boxOfEdge = [];   // vertex -> box (pick colours, tints)
  const fr = FILL.map(v => v / 255);
  const vert = (arr, p, z, tone, a, bi, mix) => {
    arr.push(p[0], p[1], p[2], z, tone, a, mix, 0, 0, 0, 0, fr[0], fr[1], fr[2]);
    (arr === F ? boxOfVertex : boxOfEdge).push(bi);
    return arr.length / NV - 1;
  };
  // indices of a polygon's triangles (ring in lon/lat, not closed)
  function triangulate(ring) {
    const lat0 = ring[0][1] * Math.PI / 180, kx = 111320 * Math.cos(lat0), ky = 110540;
    const pts = ring.map(([lon, lat]) => new C.Cartesian2((lon - ring[0][0]) * kx, (lat - ring[0][1]) * ky));
    try { return C.PolygonPipeline.triangulate(pts) || []; } catch (e) { return []; }
  }
  function corners(ring) {
    const n = ring.length, lat0 = ring[0][1] * Math.PI / 180, kx = Math.cos(lat0), out = [];
    for (let i = 0; i < n; i++) {
      const a = ring[(i + n - 1) % n], b = ring[i], c = ring[(i + 1) % n];
      const h1 = Math.atan2((b[1] - a[1]), (b[0] - a[0]) * kx), h2 = Math.atan2((c[1] - b[1]), (c[0] - b[0]) * kx);
      let d = Math.abs(h2 - h1) * 180 / Math.PI;
      if (d > 180) d = 360 - d;
      if (d > CORNER_DEG) out.push(i);
    }
    return out;
  }
  boxes.forEach((b, bi) => {
    const ring = b.ring, n = ring.length;
    if (n < 3) return;
    const P = ring.map(([lon, lat]) => rel(lon, lat)), z = b.z;
    const lo = i => z[i] - BELOW, hi = i => z[i] + TOP;
    // walls
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const a = vert(F, P[i], lo(i), 0.9, A_WALL, bi, T_FACE), bb = vert(F, P[j], lo(j), 0.9, A_WALL, bi, T_FACE);
      const c = vert(F, P[j], hi(j), 1.0, A_WALL, bi, T_FACE), d = vert(F, P[i], hi(i), 1.0, A_WALL, bi, T_FACE);
      Fi.push(a, bb, c, a, c, d);
    }
    // roof and floor
    const tri = triangulate(ring);
    const roof = P.map((p, i) => vert(F, p, hi(i), 1.0, A_ROOF, bi, T_FACE));
    const floor = P.map((p, i) => vert(F, p, lo(i), 0.85, A_FLOOR, bi, T_FACE));
    for (const k of tri) Fi.push(roof[k]);
    for (const k of tri) Fi.push(floor[k]);
    // edges: both rings, and the uprights at corners
    const er = P.map((p, i) => vert(E, p, hi(i), 1.0, A_EDGE, bi, T_EDGE)), ef = P.map((p, i) => vert(E, p, lo(i), 1.0, A_EDGE * 0.7, bi, T_EDGE));
    for (let i = 0; i < n; i++) { const j = (i + 1) % n; Ei.push(er[i], er[j], ef[i], ef[j]); }
    for (const i of corners(ring)) Ei.push(er[i], ef[i]);
  });
  // platform slabs inside their boxes
  for (const p of plats) {
    if (!p.slab || p.slab.length < 3 || p.box == null) continue;
    stats.platforms++;
    const P = p.slab.map(([lon, lat]) => rel(lon, lat)), z = p.slab_z;
    const ids = P.map((q, i) => vert(F, q, z[i], 1.0, A_PLAT, p.box, T_PLAT));
    for (const k of triangulate(p.slab)) Fi.push(ids[k]);
    const e = P.map((q, i) => vert(E, q, z[i], 1.0, A_PEDGE, p.box, T_EDGE));
    for (let i = 0; i < e.length; i++) Ei.push(e[i], e[(i + 1) % e.length]);
  }
  const faces = new Float32Array(F), edges = new Float32Array(E);
  stats.vertices = faces.length / NV + edges.length / NV;

  // ----- tints: each box takes the colour its tracks are drawn in now -----
  // per box, the point of each of its tracks nearest the box's middle ([ti, i] into opts.tracks)
  const tiOf = new Map((opts.tracks || []).map((t, ti) => [t.id, ti]));
  const samples = boxes.map(b => {
    const n = b.ring.length, lon = b.ring.reduce((s, p) => s + p[0], 0) / n, lat = b.ring.reduce((s, p) => s + p[1], 0) / n;
    const k = Math.cos(lat * Math.PI / 180) ** 2;
    return (b.tracks || []).map(id => tiOf.get(id)).filter(ti => ti != null).map(ti => {
      const t = opts.tracks[ti];
      let best = 0, bd = Infinity;
      for (let i = 0; i < t.lon.length; i++) { const d = (t.lon[i] - lon) ** 2 * k + (t.lat[i] - lat) ** 2; if (d < bd) { bd = d; best = i; } }
      return [ti, best];
    });
  });
  // the colour shared by the most of a box's tracks (Line mode: two lines through one box don't
  // turn muddy); where every track differs (Depth, Elevation), their mean
  function tintOf(bi) {
    const cols = samples[bi].map(([ti, i]) => opts.trackColour(ti, i)).filter(Boolean);
    if (!cols.length) return fr;
    const count = new Map();
    for (const c of cols) { const key = c.join(','); count.set(key, (count.get(key) || 0) + 1); }
    const [key, n] = [...count.entries()].sort((a, b) => b[1] - a[1])[0];
    const c = n > 1 ? key.split(',').map(Number) : [0, 1, 2].map(j => cols.reduce((s, c) => s + c[j], 0) / cols.length);
    return c.map(v => v / 255);
  }
  function recolour() {
    if (!opts.trackColour) return;
    const tints = boxes.map((b, bi) => tintOf(bi));
    for (const [arr, of] of [[faces, boxOfVertex], [edges, boxOfEdge]]) {
      for (let v = 0; v < of.length; v++) { const t = tints[of[v]]; if (t) arr.set(t, v * NV + 11); }
    }
    if (gpu) { gpu.vbF.copyFromArrayView(faces, 0); gpu.vbE.copyFromArrayView(edges, 0); }
    scene.requestRender();
  }

  // bounding sphere, padded for the heights at any scale
  let bs = new C.BoundingSphere(centre, 1);
  if (boxes.length) {
    const pts = [];
    for (let i = 0; i < faces.length; i += NV * 37) pts.push(new C.Cartesian3(faces[i] + centre.x, faces[i + 1] + centre.y, faces[i + 2] + centre.z));
    bs = C.BoundingSphere.fromPoints(pts);
    bs.radius += 1500;
  }
  const modelMatrix = C.Matrix4.fromTranslation(centre);

  let gpu = null, visible = true, disposed = false, alpha = 0, dotAlpha = -1;
  const fill = new C.Cartesian3(FILL[0] / 255, FILL[1] / 255, FILL[2] / 255);
  const uniforms = { u_exag: () => getExag(), u_centre: () => centre, u_fill: () => fill, u_alpha: () => alpha };

  function createGpu(context) {
    // pick colours, one per box
    const pickIds = boxes.map(b => {
      const id = opts.pickId ? opts.pickId(b) : null;   // null: this box is not picked
      return id != null ? context.createPickId({ primitive: prim, id }) : null;
    });
    if (opts.pickId) {
      for (let v = 0; v < boxOfVertex.length; v++) {
        const pid = pickIds[boxOfVertex[v]];
        if (!pid) continue;
        const c = pid.color;
        faces.set([c.red, c.green, c.blue, c.alpha], v * NV + 7);
      }
    }
    const big = Math.max(faces.length, edges.length) / NV > 65535;
    const IT = big ? C.IndexDatatype.UNSIGNED_INT : C.IndexDatatype.UNSIGNED_SHORT;
    const mkIdx = a => big ? new Uint32Array(a) : new Uint16Array(a);
    const Fl = C.ComponentDatatype.FLOAT;
    const loc = { a_pos: 0, a_z: 1, a_tone: 2, a_pick: 3, a_tint: 4 };
    const S4 = NV * 4;
    const mkVa = (vb, idx) => {
      const ib = C.Buffer.createIndexBuffer({ context, typedArray: mkIdx(idx), usage: C.BufferUsage.STATIC_DRAW, indexDatatype: IT });
      return new C.VertexArray({ context, indexBuffer: ib, attributes: [
        { index: 0, vertexBuffer: vb, componentsPerAttribute: 3, componentDatatype: Fl, offsetInBytes: 0, strideInBytes: S4 },
        { index: 1, vertexBuffer: vb, componentsPerAttribute: 1, componentDatatype: Fl, offsetInBytes: 12, strideInBytes: S4 },
        { index: 2, vertexBuffer: vb, componentsPerAttribute: 3, componentDatatype: Fl, offsetInBytes: 16, strideInBytes: S4 },
        { index: 3, vertexBuffer: vb, componentsPerAttribute: 4, componentDatatype: Fl, offsetInBytes: 28, strideInBytes: S4 },
        { index: 4, vertexBuffer: vb, componentsPerAttribute: 3, componentDatatype: Fl, offsetInBytes: 44, strideInBytes: S4 },
      ] });
    };
    // tints change with the page's colouring (recolour), so these two buffers are rewritten then
    const vbF = C.Buffer.createVertexBuffer({ context, typedArray: faces, usage: C.BufferUsage.DYNAMIC_DRAW });
    const vbE = C.Buffer.createVertexBuffer({ context, typedArray: edges, usage: C.BufferUsage.DYNAMIC_DRAW });
    const vaF = mkVa(vbF, Fi), vaE = mkVa(vbE, Ei);
    const sp = C.ShaderProgram.fromCache({ context, vertexShaderSource: VS, fragmentShaderSource: FS, attributeLocations: loc });
    const rs = C.RenderState.fromCache({ depthTest: { enabled: true }, depthMask: false, blending: C.BlendingState.ALPHA_BLEND, cull: { enabled: false } });
    const common = { shaderProgram: sp, renderState: rs, pass: C.Pass.TRANSLUCENT, modelMatrix, boundingVolume: bs, uniformMap: uniforms, owner: prim, cull: true };
    const cmdF = new C.DrawCommand({ ...common, vertexArray: vaF, primitiveType: C.PrimitiveType.TRIANGLES, count: Fi.length });
    const cmdE = new C.DrawCommand({ ...common, vertexArray: vaE, primitiveType: C.PrimitiveType.LINES, count: Ei.length });
    let pickCmd = null, spPick = null;
    if (opts.pickId) {
      spPick = C.ShaderProgram.fromCache({ context, vertexShaderSource: VS, fragmentShaderSource: PICK_FS, attributeLocations: loc });
      const rsPick = C.RenderState.fromCache({ depthTest: { enabled: true }, depthMask: true, cull: { enabled: false } });
      pickCmd = new C.DrawCommand({ ...common, shaderProgram: spPick, renderState: rsPick, pass: C.Pass.OPAQUE, vertexArray: vaF,
        primitiveType: C.PrimitiveType.TRIANGLES, count: Fi.length, pickOnly: true });
    }
    return { vaF, vaE, vbF, vbE, sp, spPick, cmdF, cmdE, pickCmd, pickIds };
  }

  // the station dots fade out as the boxes fade in (only dots that have a box); re-applied when
  // the page rewrites the dots' colours (buildStations sets alpha 1)
  const dotsWithBox = [...new Set(boxes.map(b => b.dot).filter(k => k != null))];
  function fadeDots(a) {
    const d = opts.dots;
    if (!d || !dotsWithBox.length || dotsWithBox[0] >= d.length) return;
    const want = 1 - a, first = d.get(dotsWithBox[0]);
    if (Math.abs(want - dotAlpha) < 0.01 && Math.abs(first.color.alpha - want) < 0.01) return;
    dotAlpha = want;
    for (const k of dotsWithBox) {
      if (k >= d.length) continue;
      const p = d.get(k), c = p.color, o = p.outlineColor;
      p.color = new C.Color(c.red, c.green, c.blue, want);
      p.outlineColor = new C.Color(o.red, o.green, o.blue, want);
      p.show = want > 0.01;
    }
    if (opts.onFade) opts.onFade(a);
  }

  const prim = {
    show: true,
    update(frameState) {
      if (disposed) return;
      alpha = visible ? smooth(fade[0], fade[1], getZoom()) : 0;
      fadeDots(alpha);
      if (!visible || !this.show || alpha < 0.01 || !boxes.length) return;
      if (!gpu) gpu = createGpu(frameState.context);
      if (frameState.passes.render) frameState.commandList.push(gpu.cmdF, gpu.cmdE);
      if (frameState.passes.pick && gpu.pickCmd) frameState.commandList.push(gpu.pickCmd);
    },
    isDestroyed: () => disposed,
    destroy() {
      if (gpu) {
        gpu.vaF.destroy(); gpu.vaE.destroy(); gpu.sp.destroy(); if (gpu.spPick) gpu.spPick.destroy();
        gpu.pickIds.forEach(p => p && p.destroy());
        gpu = null;
      }
      disposed = true;
    },
  };
  scene.primitives.add(prim);
  recolour();
  scene.requestRender();

  return {
    stats,
    setVisible(on) { visible = !!on; scene.requestRender(); },
    recolour,   // call after the page's colouring changes (mode); cheap (~600 lookups, one upload)
    dispose() {
      if (disposed) return;
      visible = false; fadeDots(0);
      scene.primitives.remove(prim);   // destroys it (primitives.destroyPrimitives is true by default)
      if (!prim.isDestroyed()) prim.destroy();
      scene.requestRender();
    },
    get alpha() { return alpha; },
    _boxes: boxes,
    get _gpu() { return gpu; },
    _faces: faces,
  };
}

window.initStationBoxes = initStationBoxes;
})();
