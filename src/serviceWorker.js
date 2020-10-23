const isLocalhost = ["localhost", "[::1]"].includes(window.location.hostname) || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/);

export function register(config) {
    if(process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) return;

    window.addEventListener('load', async () => {
        const swUrl = `${process.env.PUBLIC_URL}/offline.js`;

        if(isLocalhost) {
            await checkValidServiceWorker(swUrl, config);
            await navigator.serviceWorker.ready;
        } else await registerValidSW(swUrl, config);
    });
}

async function checkValidServiceWorker(swUrl, config) {
    let response = await fetch(swUrl, {headers: { 'Service-Worker': 'script' }});
    const contentType = response.headers.get('content-type');

    if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
        let registration = await navigator.serviceWorker.ready;
        await registration.unregister();
        window.location.reload();
    } else await registerValidSW(swUrl, config);
}

async function registerValidSW(swUrl, config) {
    let registration = await navigator.serviceWorker.register(swUrl);
    registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if(installingWorker == null) return;

        installingWorker.onstatechange = () => {
            if(installingWorker.state !== 'installed') return;
            if(navigator.serviceWorker.controller) config && config.onUpdate && config.onUpdate(registration);
            else config && config.onSuccess && config.onSuccess(registration);
        };
    };
}
