---
layout: page
title: notes
permalink: /notes/
sitemap: false
---

<meta name="robots" content="noindex,nofollow">

<style>
  .notes-form { display: flex; flex-direction: column; gap: 0.6em; max-width: 40em; }
  .notes-form input, .notes-form textarea { font-family: inherit; font-size: 1em; padding: 0.4em; }
  .notes-form textarea { min-height: 8em; resize: vertical; }
  .notes-row { display: flex; gap: 0.6em; align-items: center; flex-wrap: wrap; }
  .notes-status { min-height: 1.2em; font-size: 0.9em; }
  .notes-status.ok { color: green; }
  .notes-status.err { color: #c33; }
  .notes-setup { margin-top: 2em; max-width: 40em; font-size: 0.9em; }
  .notes-setup textarea { width: 100%; min-height: 5em; font-family: monospace; font-size: 0.8em; }
  .notes-setup .row { display: flex; flex-direction: column; gap: 0.4em; margin: 0.6em 0; }
</style>

<form class="notes-form" id="notesForm" onsubmit="return false;">
  <div class="notes-row">
    <input type="text" id="passwordInput" placeholder="password" autocomplete="current-password" style="flex:1; min-width: 12em;">
  </div>
  <textarea id="noteInput" placeholder="thought..." autofocus></textarea>
  <div class="notes-row">
    <button id="submitBtn" type="button">append</button>
    <span class="notes-status" id="statusMsg"></span>
  </div>
</form>

<!-- First-time setup UI. Uncomment to re-key the encrypted PAT.
<details class="notes-setup">
  <summary>first-time setup</summary>
  <p>encrypt a github PAT with a password. paste the resulting blob into the <code>ENCRYPTED_PAT</code> constant in <code>pages/notes.md</code> and commit. use a strong password — the ciphertext is public so a weak one is brute-forceable offline.</p>
  <div class="row">
    <input type="password" id="setupPat" placeholder="github PAT" autocomplete="off">
    <input type="password" id="setupPassword" placeholder="new password" autocomplete="new-password">
    <button id="setupBtn" type="button">generate</button>
  </div>
  <textarea id="setupOutput" readonly placeholder="encrypted blob will appear here"></textarea>
  <div class="notes-status" id="setupStatus"></div>
</details>
-->


<script>
(function () {
  const REPO = 'circularsquare/circularsquare.github.io';
  const PATH = 'pendingnotes.md';
  const API = `https://api.github.com/repos/${REPO}/contents/${PATH}`;
  const LS_KEY = 'notes_password';
  const PBKDF2_ITERS = 250000;

  // Paste the output of "first-time setup" between the quotes below.
  // Format: base64(salt[16] || iv[12] || AES-GCM ciphertext+tag)
  const ENCRYPTED_PAT = 'sK1a7BJkibrdx5ZCvoi3lmiym44pLzp8YgHBYe2B2dnv+HB4f9gGG+vLRWP08ecZuiu+4YRbPnWGQcRu1UF1P9+ZDin6WVEH5r4fPr2tyRvaCBC2ZEYJnyHkH3pu9kYPfSjggQrVwcuOOiPsPBIvNg/6/giZUtbtcs53HgL4emxJnccd1H8+J6Q=';

  // Clear any old plaintext-PAT cache left over from the previous version.
  localStorage.removeItem('notes_pat');

  const passwordInput = document.getElementById('passwordInput');
  const noteInput = document.getElementById('noteInput');
  const submitBtn = document.getElementById('submitBtn');
  const status = document.getElementById('statusMsg');

  // Setup-mode elements only exist if the first-time setup <details> block
  // above is uncommented. The setup wiring below is skipped when they're absent.
  const setupPat = document.getElementById('setupPat');
  const setupPassword = document.getElementById('setupPassword');
  const setupBtn = document.getElementById('setupBtn');
  const setupOutput = document.getElementById('setupOutput');
  const setupStatus = document.getElementById('setupStatus');

  const saved = localStorage.getItem(LS_KEY);
  if (saved) passwordInput.value = saved;

  function setMainStatus(msg, kind) {
    status.textContent = msg || '';
    status.className = 'notes-status' + (kind ? ' ' + kind : '');
  }
  function setSetupStatus(msg, kind) {
    if (!setupStatus) return;
    setupStatus.textContent = msg || '';
    setupStatus.className = 'notes-status' + (kind ? ' ' + kind : '');
  }

  function b64encode(bytes) {
    let bin = '';
    for (const b of bytes) bin += String.fromCharCode(b);
    return btoa(bin);
  }
  function b64decode(b64) {
    const bin = atob(b64.replace(/\s/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }
  function utf8Encode(str) { return new TextEncoder().encode(str); }
  function utf8Decode(bytes) { return new TextDecoder().decode(bytes); }

  async function deriveKey(password, salt) {
    const baseKey = await crypto.subtle.importKey(
      'raw', utf8Encode(password), 'PBKDF2', false, ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: PBKDF2_ITERS, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function encryptPAT(pat, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);
    const ct = new Uint8Array(await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv }, key, utf8Encode(pat)
    ));
    const blob = new Uint8Array(salt.length + iv.length + ct.length);
    blob.set(salt, 0);
    blob.set(iv, salt.length);
    blob.set(ct, salt.length + iv.length);
    return b64encode(blob);
  }

  async function decryptPAT(blobB64, password) {
    const blob = b64decode(blobB64);
    const salt = blob.slice(0, 16);
    const iv = blob.slice(16, 28);
    const ct = blob.slice(28);
    const key = await deriveKey(password, salt);
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    return utf8Decode(new Uint8Array(pt));
  }

  function encodeContentB64(str) { return b64encode(utf8Encode(str)); }
  function decodeContentB64(b64) { return utf8Decode(b64decode(b64)); }

  function pad(n) { return String(n).padStart(2, '0'); }
  function stamp() {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  async function fetchExisting(token) {
    const res = await fetch(API, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } });
    if (res.status === 404) return { content: '', sha: null };
    if (!res.ok) throw new Error(`GET ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return { content: decodeContentB64(data.content), sha: data.sha };
  }

  async function putUpdated(token, newContent, sha) {
    const body = { message: 'note', content: encodeContentB64(newContent) };
    if (sha) body.sha = sha;
    const res = await fetch(API, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PUT ${res.status}: ${await res.text()}`);
  }

  async function submit() {
    const password = passwordInput.value;
    const note = noteInput.value.trim();
    if (!password) { setMainStatus('need a password', 'err'); return; }
    if (!note) { setMainStatus('empty', 'err'); return; }
    if (!ENCRYPTED_PAT) { setMainStatus('no encrypted PAT set up yet — see first-time setup', 'err'); return; }

    submitBtn.disabled = true;
    setMainStatus('decrypting...');
    let token;
    try {
      token = await decryptPAT(ENCRYPTED_PAT, password);
    } catch (e) {
      setMainStatus('wrong password', 'err');
      submitBtn.disabled = false;
      return;
    }
    setMainStatus('saving...');
    try {
      const { content, sha } = await fetchExisting(token);
      const entry = `\n\n---\n[${stamp()}]\n${note}\n`;
      await putUpdated(token, (content || '') + entry, sha);
      noteInput.value = '';
      localStorage.setItem(LS_KEY, password);
      setMainStatus('saved ✓', 'ok');
    } catch (e) {
      setMainStatus(e.message, 'err');
    } finally {
      submitBtn.disabled = false;
    }
  }

  async function runSetup() {
    const pat = setupPat.value.trim();
    const password = setupPassword.value;
    if (!pat) { setSetupStatus('need a PAT', 'err'); return; }
    if (!password) { setSetupStatus('need a password', 'err'); return; }
    setupBtn.disabled = true;
    setSetupStatus('encrypting...');
    try {
      const blob = await encryptPAT(pat, password);
      setupOutput.value = blob;
      setupOutput.select();
      setSetupStatus('done — copy this into the ENCRYPTED_PAT constant in pages/notes.md', 'ok');
    } catch (e) {
      setSetupStatus(e.message, 'err');
    } finally {
      setupBtn.disabled = false;
    }
  }

  submitBtn.addEventListener('click', submit);
  noteInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submit();
  });
  if (setupBtn) setupBtn.addEventListener('click', runSetup);
})();
</script>
