const CACHE_NAME = 'sound-effects-v1';
const urlsToCache = [
  '/cat-button/',
  '/cat-button/index.html',
  '/cat-button/cat.jpg',
  '/cat-button/cat-meow.mp3',
  '/cat-button/style.css',
  '/cat-button/script.js',
  '/cat-button/favicon.ico',
  '/cat-button/manifest.json',
  '/cat-button/sw.js',
  '/cat-button/hub.jpg',
  '/cat-button/hub-intro.mp3',
];
 
// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});
 
// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
 
// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});