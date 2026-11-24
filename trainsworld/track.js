// T-4126: on 8800, ?track opens the track branch's build, served beside this one at /trainworld-track/
// (tools/ops/snaptrack.py). A classic script in the head, so the page stops before the game starts.
(function () {
  var q = new URLSearchParams(location.search);
  if (!q.has("track") || !/^(localhost|127\.0\.0\.1)$/.test(location.hostname) || !/^\/trainworld\//.test(location.pathname)) return;
  q.delete("track");
  var rest = q.toString();
  window.stop();
  location.replace(new URL("/trainworld-track/" + (rest ? "?" + rest : "") + location.hash, location.href).href);
})();
