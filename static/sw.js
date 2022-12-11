self.addEventListener('install', function(event) {
	var offlineRequest = new Request('offline.html');
	event.waitUntil(
		fetch(offlineRequest).then(async function(response) {
			return caches.open('offline').then(function(cache) {
				console.log('[oninstall] Cached offline page', response.url);
				return cache.put(offlineRequest, response);
			});
		})
	);
});

self.addEventListener('fetch', function(event) {
	var request = event.request;
	
	if (request.method === 'GET') {
	
	event.respondWith(
		fetch(request).catch(async function(error) {
			console.error(
				'[onfetch] Failed. Serving cached offline fallback ' +
				error
			);
			return caches.open('offline').then(function(cache) {
				return cache.match('offline.html');
			});
		})
	)}
});
	
