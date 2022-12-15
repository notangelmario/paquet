const cacheName = "v1";
const filesToCache = [
	"/registerSw.js",
	"/library?offline=true", 
	"/manifest.json",
	"/global.css",
	"/fonts.css",
	"/fonts/poppins-v20-latin-100.woff",
	"/fonts/poppins-v20-latin-100.woff2",
	"/fonts/poppins-v20-latin-300.woff",
	"/fonts/poppins-v20-latin-300.woff2",
	"/fonts/poppins-v20-latin-500.woff",
	"/fonts/poppins-v20-latin-500.woff2",
	"/fonts/poppins-v20-latin-700.woff",
	"/fonts/poppins-v20-latin-700.woff2",
	"/fonts/poppins-v20-latin-regular.woff",
	"/fonts/poppins-v20-latin-regular.woff2",
	"/favicon-32x32.png",
	"/favicon-16x16.png",
	"/icons/dashboard.svg",
	"/icons/info.svg",
	"/icons/github.svg",
	"/icons/supabase.svg",
	"/icons/paquet.svg",
	"/illustrations/void.svg"
];

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
		// If request tries to access homepage, get library from cache
		fetch(event.request).catch(() => {
			console.log(event.request.url);
			if (event.request.url.endsWith("/")) {
				console.log(localStorage.getItem("library"));
				return caches.match("/library?offline=true");
			}
			return caches.match(event.request);
		})
	);
});

self.addEventListener("message", event => {
	if (event.data.type === "CACHE_URLS") {
		caches.open(cacheName).then(cache => {
			return cache.addAll(event.data.data);
		});
	}
	if (event.data.type === "WIPE_URLS") {
		caches.open(cacheName).then(cache => {
			return cache.delete(event.data.data);
		});
	}
});
