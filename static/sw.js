const cacheStorageKey = 'minimal-pwa-1';
const cacheList = [
	'/log/',
	'https://static-1252458005.cosgz.myqcloud.com/log/index.js.gz?sign=g+FbAKTQXiDQqnaYOD+m2HK3W8phPTEyNTI0NTgwMDUmaz1BS0lEZURib3JqM3ZwWkJmQld1ZVM1YzljMkNCeW1UemJWVUgmZT0xNTE2NjI5NDMyJnQ9MTUxNDAzNzQzMiZyPTE5MDcxODQwMzQmZj0vbG9nL2luZGV4LmpzLmd6JmI9c3RhdGlj',
	'https://static-1252458005.cosgz.myqcloud.com/icon.woff?sign=4em/ZIOOfS2UYZ3EhoQVvjjt1BxhPTEyNTI0NTgwMDUmaz1BS0lEZURib3JqM3ZwWkJmQld1ZVM1YzljMkNCeW1UemJWVUgmZT0xNTE2NjI4ODYyJnQ9MTUxNDAzNjg2MiZyPTEzNjkzNTkwMjAmZj0vaWNvbi53b2ZmJmI9c3RhdGlj'
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

