if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/sw.js', {
		scope: '/'
	}).then(function(reg) {
		console.log(reg.scope, 'register');
		console.log('Service worker change, registered the service worker');
	});
}

window.addEventListener("beforeinstallprompt", (e) => {
	e.preventDefault();
	console.log("beforeinstallprompt");
	window.installPrompt = e;
})

if (window.matchMedia("(display-mode: standalone)").matches) {
	console.log("Don't worry about this message, we are just checking if the app is running in standalone mode");
}