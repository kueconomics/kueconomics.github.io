/* KU Ekonomi Kulübü — offline cache.
   Bump CACHE when you publish a change so visitors get it. */
const VERSION = 'v2';
const CACHE   = 'kuecon-' + VERSION;
const FONTS   = 'kuecon-fonts-' + VERSION;
const KEEP    = [CACHE, FONTS];

const ASSETS = [
  './', './index.html',
  './manifest.webmanifest',
  './favicon.png', './apple-touch-icon.png',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(ASSETS.map((u) => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // Google Fonts: cache-first, so the page keeps its typefaces offline
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONTS).then((c) =>
        c.match(req).then((hit) =>
          hit || fetch(req).then((res) => { c.put(req, res.clone()); return res; }).catch(() => hit)
        )
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // The page itself: network-first, so edits show up on the next visit
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html').then((hit) => hit || caches.match('./')))
    );
    return;
  }

  // Everything else we ship: cache-first
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
