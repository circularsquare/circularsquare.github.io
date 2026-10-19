/* noritetsu — signing in, keeping rides on an account, short share links, compare, and
   leaderboards (Anita, 2026-10-19). Loaded after the main script and share.js, whose
   top-level names it uses. The server is shonei-server; every route and the rules this file
   follows are in its docs/noritetsu-api.md.

   SIGNING IN IS OPTIONAL. Signed out, the page is exactly as before: rides in localStorage,
   Export/Import, the long #s= share link. Signed in (Google, or a username and password),
   the rides in this browser stay the working copy and the account's copy is synced to them:
   pulled and merged on sign-in and on every load, pushed about 5 s after each change.

   THE MERGE is by ride id, as importRides is. A ride changed on two devices keeps the one
   with the later `edited || added`; `edited` is stamped here whenever an existing ride
   changes (saveRides is wrapped, and the rides are compared with what they were at the last
   save). A ride removed here, undo included, goes on a `deleted` list ({id, at}) that travels
   with the save, so a merge elsewhere does not bring it back; a ride that comes back through
   undo is stamped `edited` after that, so it outlives the deletion everywhere.

   A SHORT LINK (?p=<id>) shows someone's rides view-only, the way share.js shows a #s= link:
   saves off, the reader's own rides untouched. The server leaves out dates, notes and when
   rides were logged. When the reader has rides of their own, a Compare tab draws theirs and
   the reader's in two colours (theirs / yours / both, side by side where both rode) with each
   one's km and per-country percentages.

   LEADERBOARDS: total km and % of each country, opt-in under a name the person picks. The
   numbers are the panel's own (stats(): the Countries tab's percentages), sent with every save. */
(function () {
  const LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const API = LOCAL ? 'http://127.0.0.1:8083/noritetsu/' : 'https://market.anita.garden/noritetsu/';
  const AUTH_KEY = 'noritetsu.auth.v1';     // {token, account}
  const SYNC_KEY = 'noritetsu.sync.v1';     // {acct, rev, deleted: [{id, at}]}
  const PUSH_DELAY_MS = 5000;
  const DELETED_KEEP_MS = 365 * 24 * 3600 * 1000;
  const DELETED_MAX = 20000;

  const lsGet = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
  const lsSet = (k, v) => {
    try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); }
    catch (e) { /* this page only */ }
  };

  let CFG = null;                           // GET config; null until it answers, or if it cannot
  let AUTH = lsGet(AUTH_KEY);
  if (!AUTH || !AUTH.token) AUTH = null;
  let SYNC = lsGet(SYNC_KEY) || {};
  if (!Array.isArray(SYNC.deleted)) SYNC.deleted = [];
  const saveSync = () => lsSet(SYNC_KEY, SYNC);

  const signedIn = () => !!(AUTH && AUTH.token);
  const viewOnly = () => !!window.VIEW_ONLY;
  const syncOn = () => signedIn() && !viewOnly();
  const acct = () => (AUTH && AUTH.account) || {};
  const isPassword = () => (acct().logins || []).includes('password');

  // ------------------------------------------------------------------ the server

  async function api(method, path, body, opts = {}) {
    const headers = {};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (opts.auth !== false && AUTH) headers.Authorization = 'Bearer ' + AUTH.token;
    let r;
    try {
      r = await fetch(API + path, { method, headers,
                                    body: body === undefined ? undefined : JSON.stringify(body) });
    } catch (e) {
      const err = new Error('Could not reach the server.');
      err.status = 0;
      throw err;
    }
    let j = null;
    if (r.status !== 204) { try { j = await r.json(); } catch (e) { } }
    if (!r.ok) {
      const err = new Error((j && j.error) || `The server answered ${r.status}.`);
      err.status = r.status;
      err.body = j || {};
      // A dead token means signed out; a wrong current password (keep401) does not.
      if (r.status === 401 && opts.auth !== false && !opts.keep401) tokenGone();
      throw err;
    }
    return j;
  }

  function storeSession(j) {
    AUTH = { token: j.token, account: j.account };
    lsSet(AUTH_KEY, AUTH);
  }
  function tokenGone() {
    AUTH = null;
    lsSet(AUTH_KEY, null);
    SYNC.acct = null;
    SYNC.rev = 0;
    saveSync();
    setStatus('');
    refreshUi();
  }

  // ------------------------------------------------------------------ noticing changes

  const sigOf = r => JSON.stringify(r, (k, v) => (k.startsWith('_') || k === 'edited' ? undefined : v));
  let SNAP = new Map(RIDES.map(r => [r.id, sigOf(r)]));
  const delIds = () => new Set(SYNC.deleted.map(d => (typeof d === 'string' ? d : d.id)));

  // What changed since the last save: new edits get `edited`, gone rides go on `deleted`.
  function noteChanges() {
    const now = new Date().toISOString();
    const seen = new Set();
    let dels = null;
    for (const r of RIDES) {
      seen.add(r.id);
      const s = sigOf(r), was = SNAP.get(r.id);
      if (was === undefined) {
        dels = dels || delIds();
        if (dels.has(r.id)) {               // back through undo (or an import): it outlives that
          r.edited = now;
          SYNC.deleted = SYNC.deleted.filter(d => (typeof d === 'string' ? d : d.id) !== r.id);
        }
      } else if (was !== s) {
        r.edited = now;
      }
      SNAP.set(r.id, s);
    }
    for (const id of [...SNAP.keys()]) {
      if (seen.has(id)) continue;
      SNAP.delete(id);
      SYNC.deleted.push({ id, at: now });
    }
    if (SYNC.deleted.length > DELETED_MAX) SYNC.deleted = SYNC.deleted.slice(-DELETED_MAX);
    saveSync();
  }

  const clean = rides => JSON.parse(JSON.stringify(rides, dropCache));
  function localSet() {
    return { v: 1, rides: clean(RIDES), stars: [...STARS], orders: { ...ORDERS },
             deleted: SYNC.deleted.slice() };
  }

  // ------------------------------------------------------------------ merging

  const rideTime = r => Date.parse(r.edited || r.added || '') || 0;
  function merge(L, S) {
    if (!S) return L;
    // Deleted: both lists; a plain string (no time) deletes whatever its ride's time.
    const del = new Map();
    for (const d of [...(L.deleted || []), ...(Array.isArray(S.deleted) ? S.deleted : [])]) {
      const id = typeof d === 'string' ? d : d && d.id;
      if (!id) continue;
      const at = typeof d === 'string' ? Infinity : Date.parse(d.at || '') || Infinity;
      if (!del.has(id) || at > del.get(id)) del.set(id, at);
    }
    const cutoff = Date.now() - DELETED_KEEP_MS;
    for (const [id, at] of del) if (at !== Infinity && at < cutoff) del.delete(id);
    const byId = new Map(L.rides.map(r => [r.id, r]));
    const fromServer = [];
    for (const r of Array.isArray(S.rides) ? S.rides : []) {
      if (!r || !r.id || !r.line || !r.from || !r.to) continue;
      const here = byId.get(r.id);
      if (!here) { byId.set(r.id, r); fromServer.push(r); }
      else if (rideTime(r) > rideTime(here)) byId.set(r.id, r);
    }
    const alive = r => !del.has(r.id) || rideTime(r) > del.get(r.id);
    let rides = [...L.rides.map(r => byId.get(r.id)), ...fromServer].filter(alive);
    // Rides from elsewhere go in by when they were added; this browser's order otherwise stays.
    if (fromServer.length) {
      rides = rides.map((r, i) => [r, i])
        .sort((a, b) => ((Date.parse(a[0].added || '') || 0) - (Date.parse(b[0].added || '') || 0)) || a[1] - b[1])
        .map(x => x[0]);
    }
    const deleted = [...del].map(([id, at]) => (at === Infinity ? id : { id, at: new Date(at).toISOString() }))
      .slice(-DELETED_MAX);
    const stars = [...new Set([...L.stars, ...(Array.isArray(S.stars) ? S.stars : [])
      .filter(k => typeof k === 'string')])];
    const orders = { ...(S.orders && typeof S.orders === 'object' ? S.orders : {}), ...L.orders };
    return { v: 1, rides, stars, orders, deleted };
  }
  const canon = d => JSON.stringify(d ? { r: d.rides || [], s: d.stars || [], o: d.orders || {},
                                          d: d.deleted || [] } : null, dropCache);

  // The merge (or the account's copy) becomes this browser's. Rides from elsewhere are
  // migrated as importRides migrates a file's.
  function applyLocal(D) {
    const before = canon(localSet());
    SYNC.deleted = (D.deleted || []).slice();
    saveSync();
    if (canon(D) === before) return;
    RIDES = clean(D.rides || []);
    STARS = (D.stars || []).slice();
    ORDERS = { ...(D.orders || {}) };
    UNDO.length = 0;                       // an undo from before would put back the old list
    EDITING = null;
    for (const r of RIDES) {
      const ccs = rideRegions(r);
      if (ccs.every(cc => LOADED.has(cc))) migrateRide(r);
      else for (const cc of ccs) if (REGIONS[cc]) loadRegion(cc);
    }
    baseSaveRides();
    baseSaveStars();
    baseSaveOrders();
    SNAP = new Map(RIDES.map(r => [r.id, sigOf(r)]));
    afterChange();
  }

  // ------------------------------------------------------------------ the stats blob

  const clampKm = v => Math.max(0, Math.min(1e7, Math.round(v * 10) / 10));
  // The percentage the Countries tab's ring shows (pctLabel), as a number.
  function pctValue(frac) {
    const lab = pctLabel(frac);
    if (lab !== '<0.1') return +lab;
    return Math.max(0.01, +(100 * frac).toFixed(2));
  }
  async function statsBlob() {
    await REGIONS_READY;
    const ccs = [...new Set(RIDES.flatMap(rideRegions))].filter(cc => REGIONS[cc]);
    await Promise.all(ccs.map(cc => loadRegion(cc).catch(() => null)));
    // A country that will not load would read 0: send nothing rather than a wrong number.
    if (!ccs.every(cc => LOADED.has(cc))) return undefined;
    const s = stats();
    let km = 0;
    const countries = {};
    for (const [cc, r] of s.byRegion) {
      if (!(r.done > 0.001) || !/^[a-z]{2}(-[a-z0-9]{1,3})?$/.test(cc)) continue;
      km += r.done;
      countries[cc] = { km: clampKm(r.done), pct: pctValue(Math.min(1, r.done / Math.max(r.total, 0.001))) };
    }
    return { totals: { km: clampKm(km) }, countries };
  }

  // ------------------------------------------------------------------ syncing

  let STATUS = '';          // '', 'saving', 'saved', or a sentence saying what went wrong
  let SHOWN_ERR = '';       // the 413/503/507 error said once, until a save goes through
  let TIMER = null;
  let QUEUE = Promise.resolve();

  function setStatus(s) {
    STATUS = s;
    if (VIEW.kind === 'home' && HOME_TAB === 'rides') render();
    if (BOX === 'account') drawBox();
  }
  // One sync at a time, in order.
  function run(fn) {
    QUEUE = QUEUE.then(fn).catch(e => {
      setStatus(e.status === 0 ? 'Not saved to your account: the server could not be reached.'
        : `Not saved to your account: ${e.message}`);
    });
    return QUEUE;
  }
  function changed() {
    if (!syncOn()) return;
    clearTimeout(TIMER);
    STATUS = 'saving';
    TIMER = setTimeout(() => { TIMER = null; run(push); }, PUSH_DELAY_MS);
  }

  async function put(baseRev, data) {
    const stats = await statsBlob();
    const r = await api('PUT', 'rides', { baseRev, data, ...(stats ? { stats } : {}) });
    SYNC.rev = r.rev;
    saveSync();
    BOARDS.at = 0;                         // the boards may have moved with these numbers
    SHOWN_ERR = '';
    setStatus('saved');
  }

  async function push() {
    if (!syncOn()) return;
    if (SYNC.acct !== acct().id) return pull();
    try {
      await put(SYNC.rev || 0, localSet());
    } catch (e) {
      if (e.status === 409) return pull();
      if ([413, 503, 507].includes(e.status)) {
        // Said once; the rides stay here and the next change tries again.
        if (SHOWN_ERR !== e.message) { SHOWN_ERR = e.message; alert(`Not saved to your account: ${e.message}`); }
        setStatus(`Not saved to your account: ${e.message}`);
        return;
      }
      throw e;
    }
  }

  // Fetch the account's copy, merge, and save the merge back where it differs (doc: Sync).
  async function pull() {
    if (!syncOn()) return;
    await REGIONS_READY;
    for (let i = 0; i < 3; i++) {
      const s = await api('GET', 'rides');
      if (!syncOn()) return;
      const server = s.data || null;
      const id = acct().id;
      const firstHere = SYNC.acct !== id;
      if (firstHere && s.rev > 0 && server) {
        const on = new Set((server.rides || []).map(r => r.id));
        const extra = RIDES.filter(r => !on.has(r.id)).length;
        if (extra) {
          const add = await ask(`Add the ${extra.toLocaleString()} ride${extra === 1 ? '' : 's'} in this browser to your account?`,
                                'add', 'don’t add');
          if (!syncOn() || acct().id !== id) return;
          if (!add) {
            SYNC = { acct: id, rev: s.rev, deleted: [] };
            applyLocal({ v: 1, rides: server.rides || [], stars: server.stars || [],
                         orders: server.orders || {}, deleted: server.deleted || [] });
            saveSync();
            setStatus('saved');
            return;
          }
        }
      }
      const merged = merge(localSet(), server);
      applyLocal(merged);
      SYNC.acct = id;
      SYNC.rev = s.rev;
      saveSync();
      if (canon(merged) === canon(server)) { setStatus('saved'); return; }
      try {
        await put(s.rev, merged);
        return;
      } catch (e) {
        if (e.status !== 409) throw e;
      }
    }
    setStatus('Not saved to your account: another device was saving at the same time.');
  }

  // ------------------------------------------------------------------ hooks into the page

  const baseSaveRides = saveRides, baseSaveStars = saveStars, baseSaveOrders = saveOrders;

  // ------------------------------------------------------------------ the account box

  let BOX = null;           // null, 'account' or 'share'
  let FORM = 'login';       // signed out: 'login', 'register' or 'forgot'
  let MSG = '';             // a line under the forms: what happened
  let ASK = null;           // {q, yes, no, done}: a question in the box
  let PANEL = null;         // signed in: null (the account) or 'password'
  let GIS = null, GIS_INIT = false;

  function boxEl() {
    let b = document.getElementById('acctbox');
    if (!b) {
      b = document.createElement('div');
      b.id = 'acctbox';
      document.body.appendChild(b);
    }
    return b;
  }
  function closeBox() {
    if (ASK) return;                       // a question waits for its answer
    BOX = null;
    PANEL = null;
    MSG = '';
    const b = document.getElementById('acctbox');
    if (b) b.remove();
  }
  function openAccount() {
    const sb = document.getElementById('sharebox');
    if (sb) sb.remove();
    BOX = 'account';
    PANEL = null;
    MSG = '';
    drawBox();
  }
  // The person icon: opens the box, or closes it when it is open.
  function toggleAccount() {
    if (BOX) closeBox();
    else openAccount();
  }

  function ask(q, yes, no) {
    return new Promise(done => {
      ASK = { q, yes, no, done };
      if (!BOX) BOX = 'account';
      drawBox();
    });
  }
  function answer(v) {
    const a = ASK;
    ASK = null;
    if (a) a.done(v);
    drawBox();
  }

  const val = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  const pass = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  const shortLink = id => `${location.origin}${location.pathname}?p=${id}`;

  function drawBox() {
    if (!BOX) return;
    const b = boxEl();
    let h = '';
    if (ASK) {
      h = `<p>${esc(ASK.q)}</p><div class="btnrow">`
        + `<button class="act go" onclick="NT.answer(true)">${esc(ASK.yes)}</button>`
        + `<button class="act" onclick="NT.answer(false)">${esc(ASK.no)}</button></div>`;
      b.innerHTML = h;
      return;
    }
    const title = BOX === 'share' ? 'Share link' : PANEL === 'password' ? 'Change password'
      : signedIn() ? 'Account' : 'Sign in';
    h = `<div class="ahead"><span>${title}</span>`
      + `<button class="aclose" title="Close" onclick="NT.close()">&#10005;</button></div>`;
    if (BOX === 'share') h += shareHtml();
    else if (signedIn()) h += PANEL === 'password' ? passwordHtml() : accountHtml();
    else h += signInHtml();
    h += MSG ? `<p class="msg">${esc(MSG)}</p>` : '';
    b.innerHTML = h;
    const g = document.getElementById('gsi');
    if (g) drawGoogle(g);
  }

  function signInHtml() {
    if (!CFG || !CFG.signIn) return `<p>Signing in is not available right now.</p>`;
    let h = '';
    if (CFG.googleClientId) h += `<div id="gsi" class="gsi"></div>`;
    if (CFG.dev) {
      h += `<div class="row"><input class="fld" id="nt-dev" placeholder="made-up id (dev server)" />`
        + `<button class="act" onclick="NT.devSignIn()">sign in</button></div>`;
    }
    if (CFG.password) {
      if (h) h += `<div class="sec"></div>`;
      if (FORM === 'forgot') {
        h += `<input class="fld" id="nt-email" type="email" placeholder="recovery email" autocomplete="email" />`
          + `<div class="btnrow"><button class="act go" onclick="NT.forgot()">send reset link</button>`
          + `<button class="act" onclick="NT.form('login')">back</button></div>`;
      } else {
        const reg = FORM === 'register';
        h += `<input class="fld" id="nt-user" placeholder="username" autocomplete="username" `
          + `autocapitalize="none" spellcheck="false" />`
          + `<input class="fld" id="nt-pass" type="password" placeholder="password" `
          + `autocomplete="${reg ? 'new-password' : 'current-password'}" `
          + `onkeydown="if(event.key==='Enter')NT.${reg ? 'register' : 'login'}()" />`;
        if (reg) {
          h += `<input class="fld" id="nt-email" type="email" placeholder="recovery email (optional)" autocomplete="email" />`
            + `<div class="btnrow"><button class="act go" onclick="NT.register()">create account</button>`
            + `<button class="act" onclick="NT.form('login')">log in instead</button></div>`;
        } else {
          h += `<div class="btnrow"><button class="act go" onclick="NT.login()">log in</button>`
            + `<button class="act" onclick="NT.form('register')">create an account</button>`
            + `<button class="act" onclick="NT.form('forgot')">forgot password</button></div>`;
        }
      }
    }
    h += `<p class="legal"><a href="privacy.html" target="_blank">Privacy</a> &middot; `
      + `<a href="terms.html" target="_blank">Terms</a></p>`;
    return h;
  }

  function accountHtml() {
    const a = acct();
    const who = a.username ? `Signed in as <b>${esc(a.username)}</b>.`
      : (a.logins || []).includes('google') ? 'Signed in with Google.' : 'Signed in.';
    let h = `<p>${who}</p>`;
    if (statusShown()) h += `<p class="muted">${esc(statusText())}</p>`;
    if (isPassword()) {
      h += `<div class="sec"><input class="fld" id="nt-email" type="email" autocomplete="email" `
        + `placeholder="recovery email" value="${esc(a.pendingEmail || a.email || '')}" />`;
      if (a.pendingEmail) h += `<p class="muted">Confirm your email at ${esc(a.pendingEmail)}.</p>`;
      h += `<div class="btnrow"><button class="act" onclick="NT.setEmail()">save email</button>`
        + (a.email || a.pendingEmail ? `<button class="act" onclick="NT.setEmail('')">remove</button>` : '')
        + `<button class="act" onclick="NT.panel('password')">change password</button></div></div>`;
    }
    h += `<div class="sec btnrow"><button class="act" onclick="NT.signOut()">sign out</button>`
      + `<button class="act del" onclick="NT.deleteAccount()">delete account</button></div>`;
    return h;
  }

  function passwordHtml() {
    return `<input class="fld" id="nt-old" type="password" placeholder="current password" autocomplete="current-password" />`
      + `<input class="fld" id="nt-new" type="password" placeholder="new password" autocomplete="new-password" `
      + `onkeydown="if(event.key==='Enter')NT.setPassword()" />`
      + `<div class="btnrow"><button class="act go" onclick="NT.setPassword()">save</button>`
      + `<button class="act" onclick="NT.panel(null)">back</button></div>`;
  }

  function shareHtml() {
    const a = acct();
    if (!a.share) {
      return `<p>Sharing is off.</p><div class="btnrow"><button class="act" onclick="NT.newShare()">make a share link</button></div>`;
    }
    return `<input class="fld" readonly value="${esc(shortLink(a.share))}" onclick="this.select()" />`
      + `<div class="btnrow"><button class="act" onclick="NT.copyShare()">copy link</button>`
      + `<button class="act" onclick="NT.newShare()">new link</button>`
      + `<button class="act" onclick="NT.stopShare()">turn off</button></div>`;
  }

  // Only a save under way or one that went wrong is said; a saved state says nothing.
  const statusShown = () => !!STATUS && STATUS !== 'saved';
  function statusText() {
    if (STATUS === 'saving') return 'Saving…';
    return STATUS;
  }

  function loadGis() {
    if (!GIS) {
      GIS = new Promise((ok, fail) => {
        const s = document.createElement('script');
        s.src = 'https://accounts.google.com/gsi/client';
        s.async = true;
        s.onload = ok;
        s.onerror = fail;
        document.head.appendChild(s);
      });
      GIS.catch(() => { GIS = null; });
    }
    return GIS;
  }
  async function drawGoogle(el) {
    try { await loadGis(); } catch (e) { el.textContent = 'Google sign-in could not load.'; return; }
    if (!window.google || !google.accounts || !el.isConnected) return;
    if (!GIS_INIT) {
      // The credential goes straight to the server: it holds the person's email and name.
      google.accounts.id.initialize({ client_id: CFG.googleClientId,
                                      callback: r => signIn('signin', { provider: 'google', credential: r.credential }) });
      GIS_INIT = true;
    }
    /* NOT SHOWN UNTIL IT IS GOOGLE'S OWN BUTTON (Anita, 2026-10-19: it drew in a plain
       style, then changed). renderButton puts a plain stand-in first and its styled iframe
       over it when that has loaded; the space is kept (min-height) and the box shows it
       only then, in one frame. A stand-in left after 4 s is shown rather than nothing. */
    el.style.visibility = 'hidden';
    const show = () => { el.style.visibility = ''; mo.disconnect(); };
    const mo = new MutationObserver(() => {
      const f = el.querySelector('iframe');
      if (f && !f.dataset.nt) {
        f.dataset.nt = '1';
        f.addEventListener('load', () => requestAnimationFrame(() => requestAnimationFrame(show)));
      }
    });
    mo.observe(el, { childList: true, subtree: true });
    setTimeout(show, 4000);
    google.accounts.id.renderButton(el, { type: 'standard', size: 'medium', text: 'signin_with',
                                          theme: THEME_NAME === 'dark' ? 'filled_black' : 'outline' });
  }

  async function signIn(path, body) {
    MSG = '';
    try {
      const j = await api('POST', path, body, { auth: false });
      storeSession(j);
      FORM = 'login';
      refreshUi();
      run(pull);
    } catch (e) {
      MSG = e.message;
      drawBox();
    }
  }

  // ------------------------------------------------------------------ actions

  async function newShare() {
    try {
      const j = await api('POST', 'share');
      AUTH.account.share = j.share;
      lsSet(AUTH_KEY, AUTH);
      copy(shortLink(j.share));
    } catch (e) { MSG = e.message; }
    drawBox();
  }
  async function stopShare() {
    try {
      await api('DELETE', 'share');
      AUTH.account.share = '';
      lsSet(AUTH_KEY, AUTH);
      MSG = '';
    } catch (e) { MSG = e.message; }
    drawBox();
  }
  async function copy(url) {
    try { await navigator.clipboard.writeText(url); MSG = 'Link copied.'; }
    catch (e) { MSG = ''; }
  }

  async function signOut() {
    const keep = await ask('Keep this browser’s copy of your rides?', 'keep them', 'clear them');
    // Anything not yet sent goes first, so signing out loses nothing from the account.
    if (TIMER) { clearTimeout(TIMER); TIMER = null; await run(push); }
    AUTH = null;
    lsSet(AUTH_KEY, null);
    SYNC = { acct: null, rev: 0, deleted: keep ? SYNC.deleted : [] };
    saveSync();
    STATUS = '';
    if (!keep) {
      RIDES = [];
      STARS = [];
      ORDERS = {};
      UNDO.length = 0;
      EDITING = null;
      baseSaveRides();
      baseSaveStars();
      baseSaveOrders();
      SNAP = new Map();
      afterChange();
    }
    closeBox();
    refreshUi();
  }

  const NT = window.NT = {
    open: openAccount,
    close: closeBox,
    answer,
    form(f) { FORM = f; MSG = ''; drawBox(); },
    devSignIn() { const s = val('nt-dev'); if (s) signIn('signin', { provider: 'dev', sub: s }); },
    login() { signIn('login', { username: val('nt-user'), password: pass('nt-pass') }); },
    register() {
      const email = val('nt-email');
      signIn('register', { username: val('nt-user'), password: pass('nt-pass'), ...(email ? { email } : {}) });
    },
    async forgot() {
      try { const j = await api('POST', 'forgot', { email: val('nt-email') }, { auth: false }); MSG = j.message || 'Link sent.'; }
      catch (e) { MSG = e.message; }
      drawBox();
    },
    async setEmail(v) {
      const email = v === undefined ? val('nt-email') : v;
      try {
        const j = await api('PUT', 'email', { email });
        AUTH.account = j.account;
        lsSet(AUTH_KEY, AUTH);
        MSG = '';
      } catch (e) { MSG = e.message; }
      drawBox();
    },
    async setPassword() {
      try {
        const j = await api('PUT', 'password', { old: pass('nt-old'), new: pass('nt-new') }, { keep401: true });
        storeSession(j);
        PANEL = null;
        MSG = 'Password changed.';
      } catch (e) { MSG = e.message; }
      drawBox();
    },
    panel(p) { PANEL = p; MSG = ''; drawBox(); },
    toggle: toggleAccount,
    newShare,
    stopShare,
    async copyShare() { await copy(shortLink(acct().share)); drawBox(); },
    signOut,
    async deleteAccount() {
      if (!confirm('Delete your account? Local saves will stay.')) return;
      try {
        await api('DELETE', 'account');
        tokenGone();
        closeBox();
      } catch (e) { MSG = e.message; drawBox(); }
    },
    async optIn() {
      const name = val('nt-board-name');
      if (!name) return;
      try {
        const j = await api('PUT', 'optin', { on: true, name });
        AUTH.account.board = j.board;
        lsSet(AUTH_KEY, AUTH);
        BOARD_MSG = '';
        if (syncOn()) await run(push);      // the numbers on the boards are the latest
        BOARDS.at = 0;
      } catch (e) { BOARD_MSG = e.message; }
      render();
    },
    async optOut() {
      try {
        const j = await api('PUT', 'optin', { on: false });
        AUTH.account.board = j.board;
        lsSet(AUTH_KEY, AUTH);
        BOARDS.at = 0;
      } catch (e) { BOARD_MSG = e.message; }
      render();
    },
    board(k) { BOARDS.key = k; BOARDS.at = 0; render(); },
    compare(show) { setCompare(show); },
  };

  /* THE PERSON ICON beside the theme button in the title box (Anita, 2026-10-19: the
     account was hard to find under Trips). Hidden on someone else's map and when the server
     has no sign-in. */
  const ICON = '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">'
    + '<circle cx="8" cy="5.2" r="2.9" fill="none" stroke="currentColor" stroke-width="1.4" />'
    + '<path d="M2.4 14.2c.6-3 2.9-4.6 5.6-4.6s5 1.6 5.6 4.6" fill="none" stroke="currentColor" '
    + 'stroke-width="1.4" stroke-linecap="round" /></svg>';
  function drawIcon() {
    let b = document.getElementById('acctbtn');
    const show = !viewOnly() && (signedIn() || !!(CFG && CFG.signIn));
    if (!show) { if (b) b.remove(); return; }
    if (!b) {
      b = document.createElement('button');
      b.id = 'acctbtn';
      b.innerHTML = ICON;
      b.onclick = toggleAccount;
      const theme = document.getElementById('theme-btn');
      theme.parentNode.insertBefore(b, theme.nextSibling);
    }
    b.title = signedIn() ? 'Account' : 'Sign in';
  }
  // Under the trips: only a save that went wrong.
  window.accountFooter = () => (viewOnly() || !statusShown() || STATUS === 'saving' ? ''
    : `<p class="muted" style="margin-top:10px">${esc(statusText())}</p>`);

  // A click anywhere outside the box closes it, as the About panel's does.
  document.addEventListener('pointerdown', e => {
    const b = document.getElementById('acctbox'), icon = document.getElementById('acctbtn');
    if (!BOX || !b || ASK || b.contains(e.target) || (icon && icon.contains(e.target))) return;
    // The panel's own Share link button opens the share box: leave that click to it.
    if (e.target.closest && e.target.closest('[onclick^="shareLink"], [onclick^="NT.open"]')) return;
    closeBox();
  }, true);

  // Signed in, Share link makes the short link; signed out it is the long one, as before.
  const longShare = window.shareLink;
  window.shareLink = function () {
    if (!syncOn()) return longShare();
    BOX = 'share';
    MSG = '';
    if (!acct().share) return newShare();
    copy(shortLink(acct().share)).then(drawBox);
    drawBox();
  };

  function refreshUi() {
    drawIcon();
    if (VIEW.kind === 'home') render();
    if (BOX) drawBox();
  }

  // ------------------------------------------------------------------ leaderboards

  const BOARDS = { key: 'total_km', list: null, data: null, at: 0, loading: false };
  let BOARD_MSG = '';
  async function fetchBoards() {
    if (BOARDS.loading) return;
    BOARDS.loading = true;
    try {
      const [list, data] = await Promise.all([api('GET', 'boards', undefined, { auth: false }),
                                              api('GET', `board?board=${encodeURIComponent(BOARDS.key)}`)]);
      BOARDS.list = list.boards || {};
      BOARDS.data = data;
      BOARD_MSG = '';
    } catch (e) {
      BOARD_MSG = e.message;
    }
    BOARDS.at = Date.now();
    BOARDS.loading = false;
    if (VIEW.kind === 'home' && HOME_TAB === 'board') render();
  }
  const boardValue = (key, v) => (key.startsWith('country_pct_')
    ? `${v < 0.1 ? '<0.1' : v >= 100 ? '100' : (+v).toFixed(1)}%`
    : `${Math.round(v).toLocaleString()} km`);

  function boardHtml() {
    if (Date.now() - BOARDS.at > 60000 && !BOARDS.loading) setTimeout(fetchBoards, 0);
    const key = BOARDS.key;
    const ccs = Object.keys(BOARDS.list || {}).filter(k => k.startsWith('country_pct_'))
      .map(k => k.slice(12)).sort((a, b) => regionName(a).localeCompare(regionName(b)));
    let h = `<select class="fld board" onchange="NT.board(this.value)">`
      + `<option value="total_km"${key === 'total_km' ? ' selected' : ''}>Total km</option>`
      + (ccs.length ? `<optgroup label="Share of a country">` + ccs.map(cc =>
        `<option value="country_pct_${esc(cc)}"${key === `country_pct_${cc}` ? ' selected' : ''}>${esc(regionName(cc))}</option>`
      ).join('') + `</optgroup>` : '')
      + `</select>`;
    const d = BOARDS.data;
    if (!d || d.board !== key) {
      h += `<p class="muted">${BOARD_MSG ? esc(BOARD_MSG) : 'Loading…'}</p>`;
    } else {
      if (!d.rows || !d.rows.length) h += `<p class="muted">Nobody here yet.</p>`;
      const me = d.me;
      const row = (r, mine) => `<div class="brow${mine ? ' me' : ''}"><span class="rk">${r.rank}</span>`
        + `<span class="nm">${r.p ? `<a href="${esc(location.pathname)}?p=${esc(r.p)}" title="Open their map">${esc(r.name)}</a>` : esc(r.name)}</span>`
        + `<span class="v">${boardValue(key, r.value)}</span></div>`;
      const meIn = me && d.rows.some(r => r.rank === me.rank && r.name === me.name);
      for (const r of d.rows || []) h += row(r, meIn && r.rank === me.rank && r.name === me.name);
      if (me && !meIn) h += `<div class="brow gap"></div>` + row(me, true);
    }
    if (!viewOnly()) {
      const b = acct().board || {};
      h += `<div class="optin">`;
      if (!signedIn()) {
        h += `<div class="btnrow"><button class="act" onclick="NT.open()">sign in to be listed</button></div>`;
      } else if (b.on) {
        h += `<div class="btnrow"><button class="act" onclick="NT.optOut()">leave the leaderboards</button></div>`;
      } else if (RIDES.length) {               // nothing to list before a first ride
        h += `<div class="row"><input class="fld" id="nt-board-name" maxlength="24" placeholder="name to show" `
          + `value="${esc(b.name || '')}" onkeydown="if(event.key==='Enter')NT.optIn()" />`
          + `<button class="act" onclick="NT.optIn()">join</button></div>`;
      }
      if (BOARD_MSG && d && d.board === key) h += `<p class="warn">${esc(BOARD_MSG)}</p>`;
      h += `</div>`;
    }
    return h;
  }

  EXTRA_TABS.push({ key: 'board', label: () => 'Leaderboards', html: boardHtml,
                    shown: () => MODE === 'ridden' && !!CFG && !!CFG.signIn });

  // ------------------------------------------------------------------ compare

  let CMP = null;           // {name, theirs, mine, show: 'theirs' | 'mine' | 'both', cache}
  let CMP_GEN = 0;
  const CMP_COLOURS = { dark: { theirs: '#ff8c42', mine: '#4a9eff' },
                        light: { theirs: '#d9480f', mine: '#1f6fd1' } };
  const cmpColour = who => (CMP_COLOURS[THEME_NAME] || CMP_COLOURS.dark)[who];
  // Side by side where both rode: each set a little to one side of the track.
  const OFFSET_THEIRS = ['interpolate', ['linear'], ['zoom'], 1, -0.7, 8, -1.3, 11, -1.7, 14, -2.3, 17, -3.3];
  const OFFSET_MINE = ['interpolate', ['linear'], ['zoom'], 1, 0.7, 8, 1.3, 11, 1.7, 14, 2.3, 17, 3.3];

  function cmpLayers() {
    if (!mapReady || !map.getLayer('ridden')) return false;
    if (!map.getSource('cmp-mine')) {
      map.addSource('cmp-mine', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      OWN_SOURCES.add('cmp-mine');           // kept over a theme switch (carryOver)
    }
    const before = map.getLayer('sel-done-casing') ? 'sel-done-casing' : undefined;
    if (!map.getLayer('cmp-mine-casing')) {
      map.addLayer({ id: 'cmp-mine-casing', type: 'line', source: 'cmp-mine',
                     layout: { 'line-cap': 'round', 'line-join': 'round' },
                     paint: { 'line-color': THEME.casing, 'line-width': RIDDEN_CASING, 'line-opacity': 0.85 } }, before);
      map.addLayer({ id: 'cmp-mine', type: 'line', source: 'cmp-mine',
                     layout: { 'line-cap': 'round', 'line-join': 'round' },
                     paint: { 'line-color': ['get', 'c'], 'line-width': RIDDEN_WIDTH, 'line-opacity': 1 } }, before);
    }
    return true;
  }

  // The ridden overlay's features for a set of rides, all in one colour (paintRidden's way).
  async function riddenFeatures(rides, colour, gen) {
    const wanted = new Map();
    for (const ride of rides) {
      if (!LOADED.has(rideRegion(ride))) continue;
      const line = LINE_BY_ID.get(ride.line);
      if (!line) continue;
      if (!wanted.has(line.id)) wanted.set(line.id, new Map());
      const m = wanted.get(line.id);
      for (const vg of rideGids(ride)) {
        const [gid, lo, hi] = spanOf(vg);
        if (!m.has(gid)) m.set(gid, []);
        m.get(gid).push([lo, hi]);
      }
    }
    const features = [];
    for (const [lineId, gids] of wanted) {
      const line = LINE_BY_ID.get(lineId);
      const g = await geomFor(lineId);
      if (gen !== CMP_GEN) return null;
      for (const [a, b, km, gid] of line.sections) {
        if (!gids.has(gid)) continue;
        const pts = g[`${a}|${b}`];
        if (!pts || pts.length < 2) continue;
        for (const [lo, hi] of mergeSpans(gids.get(gid), 0)) {
          const piece = hi > lo && sliceLine(pts, lo, hi);
          if (piece) features.push({ type: 'Feature', properties: { c: colour, l: lineId },
                                     geometry: { type: 'LineString', coordinates: piece } });
        }
      }
    }
    return features;
  }

  async function paintCompare() {
    if (!cmpLayers()) return;
    const gen = ++CMP_GEN, show = CMP.show;
    const a = show !== 'mine' ? await riddenFeatures(CMP.theirs, cmpColour('theirs'), gen) : [];
    if (!a) return;
    const b = show !== 'theirs' ? await riddenFeatures(CMP.mine, cmpColour('mine'), gen) : [];
    if (!b || gen !== CMP_GEN) return;
    map.getSource('ridden').setData({ type: 'FeatureCollection', features: a });
    map.getSource('cmp-mine').setData({ type: 'FeatureCollection', features: b });
    const both = show === 'both';
    for (const id of ['ridden', 'ridden-casing']) map.setPaintProperty(id, 'line-offset', both ? OFFSET_THEIRS : 0);
    for (const id of ['cmp-mine', 'cmp-mine-casing']) map.setPaintProperty(id, 'line-offset', both ? OFFSET_MINE : 0);
    cmpShown();
  }
  // The second overlay follows the first one's muting and the mode (riddenShown).
  function cmpShown() {
    if (!mapReady || !map.getLayer('cmp-mine')) return;
    const off = MODE !== 'ridden';
    map.setPaintProperty('cmp-mine', 'line-opacity', off ? 0 : MUTED_NOW ? 0.25 : 1);
    map.setPaintProperty('cmp-mine-casing', 'line-opacity', off ? 0 : MUTED_NOW ? 0.2 : 0.85);
    map.setPaintProperty('cmp-mine-casing', 'line-color', THEME.casing);
  }

  const basePaintRidden = paintRidden;
  paintRidden = function () { return CMP ? paintCompare() : basePaintRidden(); };
  const baseRiddenShown = riddenShown;
  riddenShown = function () { baseRiddenShown(); cmpShown(); };
  const baseApplyTheme = applyTheme;
  applyTheme = function () { baseApplyTheme(); if (CMP) paintCompare(); };

  // stats() for another set of rides: the same crediting, swapped in for the moment.
  function statsFor(rides) {
    const keep = RIDES;
    RIDES = rides;
    try { return stats(); } finally { RIDES = keep; }
  }
  function cmpStats() {
    const sig = `${DATA_GEN}#${GAPS_GEN}#${OWN_GEN}`;
    if (!CMP.cache || CMP.cache.sig !== sig) {
      CMP.cache = { sig, t: statsFor(CMP.theirs), m: statsFor(CMP.mine) };
    }
    return CMP.cache;
  }

  function setCompare(show) {
    CMP.show = show;
    RIDES = show === 'mine' ? CMP.mine : CMP.theirs;
    EDITING = null;
    afterChange();
  }

  function cmpHtml() {
    const { t, m } = cmpStats();
    const them = CMP.name || 'Theirs';
    const sw = who => `<i class="cmpsw" style="background:${cmpColour(who)}"></i>`;
    let h = `<div class="tabs cmptoggle">`
      + [['theirs', sw('theirs') + esc(them)], ['mine', sw('mine') + 'You'], ['both', 'Both']].map(([k, l]) =>
        `<button class="${CMP.show === k ? 'on' : ''}" onclick="NT.compare('${k}')">${l}</button>`).join('')
      + `</div>`;
    const total = s => [...s.byRegion.values()].reduce((x, r) => x + (r.done > 0.001 ? r.done : 0), 0);
    h += `<div class="cmprow head"><span></span><span>${esc(them)}</span><span>You</span></div>`
      + `<div class="cmprow"><span>Total</span><span>${Math.round(total(t)).toLocaleString()} km</span>`
      + `<span>${Math.round(total(m)).toLocaleString()} km</span></div>`;
    const ccs = [...new Set([...t.byRegion.keys(), ...m.byRegion.keys()])]
      .map(cc => {
        const a = t.byRegion.get(cc) || { done: 0, total: 0 }, b = m.byRegion.get(cc) || { done: 0, total: 0 };
        return { cc, a, b, top: Math.max(a.done, b.done) };
      })
      .filter(x => x.top > 0.001)
      .sort((x, y) => y.top - x.top);
    const cell = r => {
      const f = Math.min(1, r.done / Math.max(r.total, 0.001));
      return `<span title="${r.done.toFixed(1)} km">${r.done > 0.001 ? `${pctLabel(f)}%` : ''}</span>`;
    };
    for (const { cc, a, b } of ccs) {
      h += `<div class="cmprow"><span>${flagHtml(cc)}${esc(regionName(cc))}</span>${cell(a)}${cell(b)}</div>`;
    }
    return h;
  }

  EXTRA_TABS.push({ key: 'cmp', label: () => 'Compare', html: cmpHtml, first: true, shown: () => !!CMP });

  // Their rides and the reader's, both loaded and migrated, then the Compare tab.
  async function startCompare(theirs, mine, name) {
    await REGIONS_READY;
    const ccs = [...new Set([...theirs, ...mine].flatMap(rideRegions))].filter(cc => REGIONS[cc]);
    await Promise.all(ccs.map(cc => loadRegion(cc).catch(() => null)));
    for (const r of [...theirs, ...mine]) { migrateRide(r); delete r._gids; }
    CMP = { name, theirs, mine, show: 'both', cache: null };
    RIDES = theirs;
    HOME_TAB = 'cmp';
    afterChange();
  }
  const ownRides = () => {
    const d = lsGet(STORE_KEY);
    return d && Array.isArray(d.rides) ? d.rides : [];
  };

  // ------------------------------------------------------------------ opening ?p=

  const P = new URLSearchParams(location.search).get('p');
  if (P && !viewOnly()) openPublic(P);
  else if (viewOnly() && window.SHARE_READY) {
    // A long #s= link (share.js): compare with the reader's own rides, if there are any.
    window.SHARE_READY.then(ok => {
      const mine = ownRides();
      if (ok && mine.length) startCompare(RIDES, mine, null);
    });
  }

  function openPublic(id) {
    window.VIEW_ONLY = true;
    document.body.classList.add('viewonly');
    const mine = RIDES.slice();
    // Nothing the reader does here is kept: their own rides in this browser stay as they were.
    saveRides = function () { };
    saveStars = function () { };
    saveOrders = function () { };
    RIDES = [];
    STARS = [];
    let bar = document.getElementById('viewbar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'viewbar';
      const head = document.getElementById('panel-head');
      head.parentNode.insertBefore(bar, head.nextSibling);
    }
    const setBar = text => {
      bar.innerHTML = `${esc(text)} <a href="${esc(location.pathname)}">Open your own map</a>`;
    };
    setBar('Shared rides.');
    render();
    (async () => {
      let j;
      try {
        j = await api('GET', `public?p=${encodeURIComponent(id)}`, undefined, { auth: false });
      } catch (e) {
        setBar(e.status === 404 ? 'This share link has been turned off.' : e.message);
        return;
      }
      if (j.name) setBar(`${j.name}’s rides.`);
      const d = j.data || {};
      // `trip` stands in for `added`: one made-up time per trip keeps a journey's legs together.
      const theirs = (Array.isArray(d.rides) ? d.rides : []).filter(r => r && r.line && r.from && r.to)
        .map((r, i) => {
          const o = { ...r, id: r.id || `p${i}`, date: '', note: '',
                      added: r.trip ? new Date(Date.UTC(2000, 0, 1) + r.trip * 86400000).toISOString() : '' };
          delete o.trip;
          return o;
        });
      STARS = Array.isArray(d.stars) ? d.stars : [];
      ORDERS = d.orders && typeof d.orders === 'object' ? d.orders : {};
      await REGIONS_READY;
      const ccs = [...new Set(theirs.flatMap(rideRegions))].filter(cc => REGIONS[cc]);
      await Promise.all(ccs.map(cc => loadRegion(cc).catch(() => null)));
      for (const r of theirs) migrateRide(r);
      RIDES = theirs;
      // The camera goes to the shared rides: the box round every ride's two ends.
      let w = 180, s = 90, e = -180, n = -90;
      for (const r of theirs) for (const sid of [r.from, r.to]) {
        const st = STATIONS[sid];
        if (!st) continue;
        w = Math.min(w, st.x); e = Math.max(e, st.x); s = Math.min(s, st.y); n = Math.max(n, st.y);
      }
      const go = () => { if (w < e) map.fitBounds([[w, s], [e, n]], { padding: 60, duration: 0, maxZoom: 12 }); };
      if (mapReady) go(); else map.once('load', go);
      if (mine.length) return startCompare(theirs, mine, j.name || null);
      HOME_TAB = 'country';
      afterChange();
    })();
  }

  // ------------------------------------------------------------------ wiring

  if (!viewOnly()) {
    saveRides = function () { noteChanges(); baseSaveRides(); changed(); };
    saveStars = function () { baseSaveStars(); changed(); };
    saveOrders = function () { baseSaveOrders(); changed(); };
  }

  // Back on the page: another device may have saved since.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible' || !syncOn() || TIMER) return;
    run(async () => {
      const me = await api('GET', 'me');
      if (me.account) { AUTH.account = me.account; lsSet(AUTH_KEY, AUTH); }
      if (me.save && me.save.rev !== SYNC.rev) await pull();
      if (BOX) drawBox();
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    #acctbox { position: absolute; top: 60px; right: 354px; z-index: 6; width: 330px;
      max-height: calc(100% - 80px); overflow-y: auto; background: var(--g0d);
      border: 1px solid var(--g2c); padding: 10px 12px; font-size: 12.5px; color: var(--gcc); }
    #acctbox p { margin: 0 0 8px; }
    #acctbox p.muted { font-size: 12px; }
    #acctbox .warn, .optin .warn { color: var(--warn); font-size: 12px; margin: 0 0 8px; }
    #acctbox .msg { margin: 8px 0 0; color: var(--gdd); }
    #acctbox input.fld { display: block; width: 100%; margin: 0 0 6px; font-size: 12.5px; padding: 5px 7px; }
    #acctbox .row, .optin .row { display: flex; gap: 6px; }
    #acctbox .row input.fld { margin: 0; flex: 1; }
    #acctbox .btnrow { margin: 0 0 6px; }
    #acctbox .ahead { display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 8px; color: var(--g8a); }
    #acctbox .aclose { background: none; border: none; color: var(--g8a); font-size: 16px;
      cursor: pointer; padding: 0; line-height: 1; }
    #acctbox .aclose:hover { color: var(--gff); }
    #modes #acctbtn { display: inline-flex; align-items: center; justify-content: center;
                      padding: 0 4px; }
    /* As tall as the text buttons beside it (the row stretches it); 14 px icon + 2 x 4 px +
       the border makes it as wide as it is tall. */
    #modes button { white-space: nowrap; }
    @media (min-width: 721px) { #title { max-width: none; } }
    #acctbox .sec { border-top: 1px solid var(--g1e); margin-top: 10px; padding-top: 10px; }
    #acctbox .gsi { min-height: 32px; margin-bottom: 4px; }
    #acctbox .legal { margin: 10px 0 0; font-size: 11.5px; color: var(--g7a); }
    #acctbox .legal a { color: inherit; }
    select.fld.board { width: 100%; margin: 0 0 8px; }
    .brow { display: flex; gap: 10px; padding: 5px 0; border-bottom: 1px solid var(--g17);
      font-variant-numeric: tabular-nums; }
    .brow .rk { width: 26px; text-align: right; color: var(--g7a); flex: none; }
    .brow .nm { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      color: var(--gdd); }
    .brow .nm a { color: inherit; }
    .brow .nm a:hover { color: var(--gff); }
    .brow .v { color: var(--g9a); flex: none; }
    .brow.me .nm { font-weight: 600; color: var(--gff); }
    .brow.gap { border-bottom: 1px dashed var(--g26); padding: 0; height: 6px; }
    .optin { margin-top: 12px; }
    .optin .row input.fld { flex: 1; min-width: 0; }
    .cmptoggle button { display: inline-flex; align-items: center; gap: 6px; }
    .cmpsw { display: inline-block; width: 10px; height: 4px; border-radius: 2px; }
    .cmprow { display: grid; grid-template-columns: minmax(0, 1fr) 76px 76px; gap: 8px; padding: 5px 0;
      border-bottom: 1px solid var(--g17); font-variant-numeric: tabular-nums; }
    .cmprow span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--gdd); }
    .cmprow span + span { text-align: right; color: var(--gc8); }
    .cmprow.head span { color: var(--g7a); font-size: 12px; overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap; }
    body.viewonly #acctbtn { display: none !important; }
    @media (max-width: 720px) { #acctbox { right: 14px; left: 14px; width: auto; } }`;
  document.head.appendChild(style);

  // ------------------------------------------------------------------ start

  drawIcon();
  (async () => {
    try { CFG = await api('GET', 'config', undefined, { auth: false }); } catch (e) { CFG = null; }
    // Google's script ahead of the first open, so its button is there sooner.
    if (!signedIn() && CFG && CFG.googleClientId) loadGis().catch(() => { });
    if (signedIn()) {
      try { storeSession(await api('POST', 'refresh')); }
      catch (e) { /* 401 has signed out; offline keeps the token for next time */ }
    }
    refreshUi();
    if (syncOn()) run(pull);
  })();
})();
