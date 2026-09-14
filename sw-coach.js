/* PitchPro Coach — service worker (design preview).
   Keeps the app shell on the phone so it opens at the pitch without signal; nothing personal is cached
   (the page itself carries sample data only — a private setup is fetched after sign-in and never cached here). Network first for the page, cache first for the assets. */
var CACHE = 'ppcoach-v2';
var SHELL = ['./coach.html', './supabase.js', './site-nav.js', './icon-192.png', './icon-512.png', './coach-manifest.json'];
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(SHELL.map(function (u) { return fetch(u, { credentials: 'same-origin' }).then(function (r) { if (r.ok) return c.put(u, r); }).catch(function () {}); }));
  }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  var isPage = req.mode === 'navigate' || /\/coach\.html$/.test(new URL(req.url).pathname);
  if (isPage) {
    e.respondWith(fetch(req).then(function (r) { if (r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put('./coach.html', copy); }); } return r; })
      .catch(function () { return caches.match('./coach.html'); }));
    return;
  }
  e.respondWith(caches.match(req).then(function (hit) { return hit || fetch(req).then(function (r) { if (r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); } return r; }); }));
});
