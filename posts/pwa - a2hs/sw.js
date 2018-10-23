var cacheName = 'lichcuatoi-20180726-0823';

var filesToCache = [
  '/',
  '/a2hs.html',
  '/a2hs.js',
  "/images/pwa.png"
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  // If we can fetch latest version, then do so
  var responsePromise = fetch(event.request)
    .then(function(response) {
      // Don't cache response unless it's 2xx status
      if (!response || !response.ok) {
        return response;
      }

      // Clone it to allow us to cache it
      var responseToCache = response.clone();
      caches.open(cacheName)
        .then(function(cache) {
          cache.put(event.request, responseToCache);
        });

      return response;
    })
    .catch(function(err) {
      // Fetch failed, maybe we are offline. Try cache...
      // NOTE: On a patchy network, it could take a long time for the fetch
      // to fail and for us to get here. TO DO: introduce a timeout.
      return caches.match(event.request)
        .then(function(response) {
          return response;
        });
    });

  event.respondWith(responsePromise);

  /*
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );*/
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key != cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
