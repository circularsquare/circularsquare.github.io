---
layout: page
title: thoughts
permalink: /thoughts/
---

assorted word vomit

- [lists](/lists/)

- [time](time/)
- [temperature](temperature/)
- [mean reversion](meanreversion/)
- [momentum](momentum/)
- [internal world](internalworld/)
- [simulations](fidelity/)
- [normalness](normalness/)
- [fairness](fairness/)
- [mantras](mantras/)
- [community](community/)
- [aloneness](aloneness/)
- [beauty](beauty/)
- [reasons](reasons/)
- [documentation](documentation/)
- [roadsides](roadsides/)
- [words](words/)
- [winter](winter/)
- [chapters](chapters/)
- [pain](pain/)
- [ai](ai/)
- [being seen](beingseen/)
- [language](language/)
- [achievement](achievement/)
- [apocalypse](apocalypse/)
{: #thought-list}

<script>
// Shuffle the thoughts on every visit. The first item (lists) stays on top.
(function () {
  const list = document.getElementById('thought-list');
  const items = [...list.children].slice(1);
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  list.append(...items);
})();
</script>
