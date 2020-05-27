const CACHE_NAME = 'bfma';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                `/`,
                `/index.html`,
                `/favicon.ico`,
                `/manifest.json`,
                `/fonts/`,
                `/libs/`,
                `/static/`,
                `/content/`
            ]).then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            let fetchRequest = e.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    // Check if we received a valid response
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    let responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(e.request, responseToCache);
                        });

                    return response;
                }
            ).catch(() => {
                if(response){return response;}
            });
        })
    );
});

self.addEventListener("push", e => {
    //let data = e.data.json();
    console.log("Push received...");

    self.registration.showNotification("Bergflix", {
        body: "Bergflix test notification",
        icon: "https://share.bergflix.de/logo/light.png"
    });
});