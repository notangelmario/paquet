if (navigator.serviceWorker) {
	navigator.serviceWorker.register('sw.js', {
		scope: './'
	}).then(function(reg) {
		console.log(reg.scope, 'register');
		console.log('Service worker change, registered the service worker');
	});
}
