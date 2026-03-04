const CACHE_NAME = 'guide-smart-v2'; // Versiyonu v2 yaptık tertemiz başlasın

const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/words.js',
  '/icon.png',
  '/manifest.json'
];

// Kurulum
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Temizlik
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      );
    })
  );
  self.clients.claim();
});

// Akıllı Yakalama (Sihir Burada)
self.addEventListener('fetch', event => {
  if (!(event.request.url.startsWith('http'))) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200) return networkResponse;

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});
