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

globalThis.addEventListener('beforeinstallprompt', (e) => {
	globalThis.installPrompt = e;
});
