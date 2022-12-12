const cacheName = 'my-cache-name';
const pagesToCache = ['/library', '/settings'];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Cache opened');
		return cache.addAll(pagesToCache);
      })
  );
});

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

// Fetch and cache only image files
self.addEventListener('fetch', event => {
	if (!event.request.url.startsWith("http")) return;
	
	if (event.request.url.endsWith(".jpg") || event.request.url.endsWith(".png")) {
		// If so, fetch from the network
		// and cache the response
		return event.respondWith(
			caches.open(cacheName).then(async cache => {
				return fetch(event.request).then(response => {
					cache.put(event.request, response.clone());
					console.log('Cached image: ' + event.request.url);
					return response;
				});
			})
		);
	}

	// Otherwise, fetch from network
	// and respond with library.html instead of index.html when offline
	return event.respondWith(
		fetch(event.request).catch(() => {
			return caches.match("/library?offline=true");
		})
	);
});
