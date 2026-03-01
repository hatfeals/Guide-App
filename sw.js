const CACHE_NAME = 'rehber-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './words.js',
  './manifest.json'
];

// Uygulama yüklendiğinde dosyaları hafızaya (cache) al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// İnternet yokken hafızadaki dosyaları göster
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
