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
</style>

<form class="notes-form" id="notesForm" onsubmit="return false;">
  <div class="notes-row">
    <input type="password" id="tokenInput" placeholder="token" autocomplete="off" style="flex:1; min-width: 12em;">
    <label><input type="checkbox" id="rememberToken"> remember </label>
  </div>
  <textarea id="noteInput" placeholder="thought..." autofocus></textarea>
  <div class="notes-row">
    <button id="submitBtn" type="button">append</button>
    <span class="notes-status" id="statusMsg"></span>
  </div>
</form>

<script>
(function () {
  const REPO = 'circularsquare/circularsquare.github.io';
  const PATH = 'pendingnotes.md';
  const API = `https://api.github.com/repos/${REPO}/contents/${PATH}`;
  const LS_KEY = 'notes_pat';

  const tokenInput = document.getElementById('tokenInput');
  const remember = document.getElementById('rememberToken');
  const noteInput = document.getElementById('noteInput');
  const submitBtn = document.getElementById('submitBtn');
  const status = document.getElementById('statusMsg');

  const saved = localStorage.getItem(LS_KEY);
  if (saved) { tokenInput.value = saved; remember.checked = true; }

  function setStatus(msg, kind) {
    status.textContent = msg || '';
    status.className = 'notes-status' + (kind ? ' ' + kind : '');
  }

  function encodeB64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (const b of bytes) bin += String.fromCharCode(b);
    return btoa(bin);
  }
  function decodeB64(b64) {
    const bin = atob(b64.replace(/\s/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

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
    return { content: decodeB64(data.content), sha: data.sha };
  }

  async function putUpdated(token, newContent, sha) {
    const body = { message: 'note', content: encodeB64(newContent) };
    if (sha) body.sha = sha;
    const res = await fetch(API, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PUT ${res.status}: ${await res.text()}`);
  }

  async function submit() {
    const token = tokenInput.value.trim();
    const note = noteInput.value.trim();
    if (!token) { setStatus('need a token', 'err'); return; }
    if (!note) { setStatus('empty', 'err'); return; }

    submitBtn.disabled = true;
    setStatus('saving...');
    try {
      const { content, sha } = await fetchExisting(token);
      const entry = `\n\n---\n[${stamp()}]\n${note}\n`;
      await putUpdated(token, (content || '') + entry, sha);
      noteInput.value = '';
      if (remember.checked) localStorage.setItem(LS_KEY, token);
      else localStorage.removeItem(LS_KEY);
      setStatus('saved ✓', 'ok');
    } catch (e) {
      setStatus(e.message, 'err');
    } finally {
      submitBtn.disabled = false;
    }
  }

  submitBtn.addEventListener('click', submit);
  noteInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submit();
  });
})();
</script>
