---
layout: page
title: shop
permalink: /shop/
---

these are prints of my maps! made to order by lumaprints on semi-gloss fine art paper. the full size files are free to download as well, if you'd rather print one yourself. i ship within US only.

<div class="shop-grid">
{%- for p in site.data.shop %}
  <div class="shop-item box">
    {%- if p.zoomable %}{% assign view = p.page %}{% else %}{% assign view = p.download %}{% endif %}
    <a href="{{ view }}"><img src="{{ p.thumb }}" alt="{{ p.title }}" loading="lazy"></a>
    <div class="shop-title"><a href="{{ view }}">{{ p.title }}</a></div>
    <div>{{ p.size }}, ${{ p.price }}</div>
    {%- if p.note %}<div class="shop-note">{{ p.note }}</div>{% endif %}
    <div class="shop-links">
      {%- if p.buy != "" %}
      <a href="{{ p.buy }}">buy a print</a>
      {%- else %}
      <span class="shop-note">not available yet</span>
      {%- endif %}
      · <a href="{{ p.download }}">free file</a>
      {%- if p.download_alt %} (<a href="{{ p.download_alt }}">english</a>){% endif %}
      {%- unless p.zoomable %} · <a href="{{ p.page }}">interactive map</a>{% endunless %}
    </div>
  </div>
{%- endfor %}
</div>

### shipping and returns

- prices include shipping.
- every map after the first map (added at checkout) is $10 off each, since they ship in the same tube.
- shipping to US usually arrives in less than two weeks.
- if a print arrives damaged or misprinted and you email me a photo within 30 days, i can send a replacement.
- you can send questions to [{{ site.email }}](mailto:{{ site.email }}).

### something else?

<div id="shop-interest" class="box">
  <p>if you'd like to order print maps and are not in the US, please let me know here!</p>
  <form id="interest-form">
    <label>country <select id="interest-country" required><option value="">pick one</option></select></label>
    <label>email (optional) <input id="interest-email" type="email" maxlength="200"></label>
    <label>maps you'd want (optional) <textarea id="interest-wants" rows="2" maxlength="500"></textarea></label>
    <button type="submit">interested</button>
    <span id="interest-status" role="status"></span>
  </form>
  <p id="interest-done" hidden>thanks!</p>
</div>

<script>
(function () {
  const ENDPOINT = 'https://market.anita.garden/shop/interest';
  const DONE_KEY = 'shopInterestSent';
  const form = document.getElementById('interest-form');
  const select = document.getElementById('interest-country');
  const status = document.getElementById('interest-status');
  const done = document.getElementById('interest-done');

  function showDone() { form.hidden = true; done.hidden = false; }
  try { if (localStorage.getItem(DONE_KEY)) showDone(); } catch (e) {}

  // Guess the visitor's country from their timezone, then their browser
  // language. No IP lookup. A US guess is left blank: this form is for
  // everyone else.
  function guessCountry(tzMap) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tzMap[tz]) return tzMap[tz];
    } catch (e) {}
    for (const lang of navigator.languages || [navigator.language]) {
      const m = /-([A-Z]{2})\b/.exec(lang || '');
      if (m) return m[1];
    }
    return '';
  }

  fetch('/assets/shop/tz_country.json').then(r => r.json()).then(tzMap => {
    let names;
    try { names = new Intl.DisplayNames(['en'], { type: 'region' }); } catch (e) {}
    const codes = [...new Set(Object.values(tzMap))];
    const rows = codes.map(c => [c, (names && names.of(c)) || c])
      .sort((a, b) => a[1].localeCompare(b[1]));
    for (const [code, name] of rows) {
      const o = document.createElement('option');
      o.value = code;
      o.textContent = name.toLowerCase();
      select.appendChild(o);
    }
    const guess = guessCountry(tzMap);
    if (guess && guess !== 'US') select.value = guess;
  }).catch(() => {});

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const body = {
      country: select.value,
      email: document.getElementById('interest-email').value.trim(),
      wants: document.getElementById('interest-wants').value.trim(),
    };
    status.textContent = 'sending...';
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || 'that did not go through, try again in a bit');
      try { localStorage.setItem(DONE_KEY, '1'); } catch (e) {}
      showDone();
    } catch (err) {
      status.textContent = err.message === 'Failed to fetch'
        ? 'that did not go through, try again in a bit' : err.message;
    }
  });
})();
</script>
