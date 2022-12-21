const cacheName = "v3";
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
	"/illustrations/apps.svg"
];

self.addEventListener('install', event => {
  	// Perform install steps
	// And skip waiting to activate the service worker immediately
	event.waitUntil(
		caches.open(cacheName)
    		.then(cache => {
				return cache.addAll(filesToCache);
      		})
			.then(() => self.skipWaiting())
			.catch(err => console.log(err))
	);
});

self.addEventListener("activate", event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cache !== cacheName) {
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

self.addEventListener("fetch", event => {
	return event.respondWith(
		// If fetch fails, try to get from cache
		// If request tries to access homepage, get library from cache
		fetch(event.request).catch(() => {
			// if request tries to get any html page, get library from cache
			// pages do not have .html extension, check for accept header
			if (event.request.headers.get("accept").includes("text/html")) {
				return caches.match("/library?offline=true");
			}
			return caches.match(event.request);
		})
	);
});

self.addEventListener("message", event => {
	if (event.data.type === "CACHE_URLS") {
		caches.open(cacheName).then(cache => {
			console.log("Caching urls", event.data.data);
			return cache.addAll(event.data.data);
		});
	}
	if (event.data.type === "WIPE_URLS") {
		caches.open(cacheName).then(cache => {
			console.log("Wiping urls", event.data.data);
			return cache.delete(event.data.data);
		});
	}
});
