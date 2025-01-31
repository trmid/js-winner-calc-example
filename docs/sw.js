/* WARNING!!! THIS FILE WAS AUTO-GENERATED BY rollup.config.js AND WAS COPIED FROM "src/sw.template.js". ANY CHANGES TO THIS FILE WILL BE OVERWRITTEN ON THE NEXT BUILD!!! */

const cacheName = `0.1.1`; // Change value to force update
const essentialFilesToCache = `["./","build/main.js","build/main-0f4d5dd6.js","build/ccip-13ec2f09.js","build/bundle.css"]`; // Generated filenames as string array
const secondaryFilesToCache = `["main.css","index.html","favicon.svg","icofont/icofont.min.css","icofont/fonts/icofont.woff2","icofont/fonts/icofont.woff"]`; // Generated filenames as string array

self.addEventListener("install", event => {

	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => 
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		)
	);
	
	// Kick out the old service worker
	self.skipWaiting();

  // Wait for essential file installation:
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll(JSON.parse(essentialFilesToCache));
		})
	);

  // Trigger async, non-essential file installation:
  caches.open(cacheName).then(cache => {
    return Promise.allSettled(
      JSON.parse(secondaryFilesToCache).map(file => cache.add(file).catch(console.warn))
    );
  }).catch(console.error);

});

// Get data on screen as quickly as possible, then update once the network has returned the latest data. 
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => 
			cache.match(event.request).then(response => {
        const networkResponse = fetch(event.request).then(networkResponse => {
					if(event.request.method === "GET" && Math.floor(networkResponse.status / 100) == 2) {
						cache.put(event.request, networkResponse.clone());
					}
					return networkResponse;
				}).catch(console.warn);
				return response ?? networkResponse;
			})
		)
	);
});