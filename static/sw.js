const cacheName = "my-cache-name";
const filesToCache = ["/library", ""];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log("Cache opened");
		return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener("activate", event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
	return event.respondWith(
		// If fetch fails, try to get from cache
		// If request tries to access index.html, get library from cache
		fetch(event.request).catch(() => {
			if (event.request.url.endsWith("index.html")) {
				return caches.match("/library");
			}
			return caches.match(event.request);
		})
	);
});
