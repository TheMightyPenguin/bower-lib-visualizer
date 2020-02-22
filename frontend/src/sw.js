self.__precacheManifest = [].concat(self.__precacheManifest || []);

const API_ENDPOINT =
  'https://rmru2tqyjl.execute-api.us-west-2.amazonaws.com/prod/';

const API_REGEX = new RegExp(API_ENDPOINT + '.*');

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html'),
  {
    blacklist: [/^\/_/, /\/[^/?]+\.[^/]+$/]
  }
);

// Cache API with StaleWhileRevalidate
workbox.routing.registerRoute(
  API_REGEX,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'API_PROJECTS',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 1 * 24 * 60 * 60 // 1 Day
      })
    ]
  })
);
