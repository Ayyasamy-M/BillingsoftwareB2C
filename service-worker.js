const CACHE_NAME = "billing-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/PointOfSale.js",
  "/Receipt.js",
  "/PointOfSale.css",
  "/Receipt.css",
  "/utils/localStorage.js",
  "/images/icons/icon-192x192.png",
  // Add any other crucial files here, such as other JS or CSS files
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache opened successfully");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
