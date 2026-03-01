const CACHE_NAME = 'guide-v2';
const urls = ['./', './index.html', './words.js', './manifest.json'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urls))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
