if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/sw.js', {
		scope: '/'
	}).then((reg) => {
		reg.installing?.postMessage({
			type: "CACHE_URLS",
			data: [
				...performance.getEntriesByType('resource').filter((entry) => {
					return entry.name.indexOf('/_frsh/') !== -1;
				}).map((entry) => {
					return entry.name;
				}),
			]
		});
		console.log(reg.scope, 'register');
		console.log('Service worker change, registered the service worker');
	});
}

if (window.matchMedia("(display-mode: standalone)").matches) {
	console.log("Don't worry about this message, we are just checking if the app is running in standalone mode");
}
