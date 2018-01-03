const staticRoot = 'https://static-1252458005.cosgz.myqcloud.com/';
const cacheStorageKey = 'minimal-pwa-1';
const cacheList = [
	'/log/',
	`${staticRoot}log/index.js.gz`,
	`${staticRoot}icon.woff`
];

self.addEventListener('install', (e) => {
	e.waitUntil(caches.open(cacheStorageKey)
		.then(cache => cache.addAll(cacheList))
		.then(() => self.skipWaiting()));
});

self.addEventListener('fetch', (e) => {
	e.respondWith(caches.match(e.request).then((response) => {
		if (response != null) {
			return response;
		}
		if (isGetPage(e)) {
			return caches.match(cacheList[0]);
		}
		if (e.request.url.includes('index.js.gz')) {
			return caches.match(cacheList[1]);
		}
		return fetch(e.request.url, {
			headers: new Headers({
				'Access-Control-Allow-Origin': '*'
			})
		});
	}));
});

function isGetPage(e) {
	const { method, url } = e.request;
	const { pathname, href } = self.location;
	const path = href.replace('sw.js', '');
	const pathName = url.replace(path, '').replace('.html', '');
	return method === 'GET' && !/[./]/.test(pathName);
}

