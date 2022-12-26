if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/sw.js', {
		scope: '/'
	}).then((reg) => {

		reg.installing?.postMessage({
			type: "CACHE_URLS",
			data: [
				...performance.getEntriesByType("resource")
					.filter(entry => entry.name.includes("/_frsh/"))
					.map(entry => entry.name)
			]
		});

		// If service worker updates
		// Get apps from library localstorage
		// And cache them to the new service worker
		reg.onupdatefound = () => {
			const installingWorker = reg.installing;

			installingWorker.onstatechange = () => {
				if (installingWorker.state !== 'installed') return;

				if (navigator.serviceWorker.controller) {
					// If there is a controller, then the page isn't loaded for the first time
					// So we can send a message to the service worker to cache the apps
					// And wipe the old cache
					const apps = JSON.parse(localStorage.getItem('library'))["apps"];

					if (apps) {
						// Send message to service worker to cache the apps
						installingWorker.postMessage({
							type: "CACHE_URLS",
							data: apps.map(app => app.icon)
						});
					}

					installingWorker.postMessage({
						type: "CACHE_URLS",
						data: [
							...performance.getEntriesByType("resource")
								.filter(entry => entry.name.includes("/_frsh/"))
								.map(entry => entry.name)
						]
					});
				}
			};
		};

		console.log(reg.scope, 'register');
		console.log('Service worker change, registered the service worker');
	});
}

if (window.matchMedia("(display-mode: standalone)").matches) {
	console.log("Don't worry about this message, we are just checking if the app is running in standalone mode");
}

window.addEventListener('beforeinstallprompt', (e) => {
	window.installPrompt = e;
});
