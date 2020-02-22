self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html'),
  {
    blacklist: [/^\/_/, /\/[^/?]+\.[^/]+$/]
  }
);

const API_ENDPOINT =
  'https://rmru2tqyjl.execute-api.us-west-2.amazonaws.com/prod/';

// Cache Api with StaleWhileRevalidate
workbox.routing.registerRoute(
  new RegExp(API_ENDPOINT + '.*'),
  new workbox.strategies.StaleWhileRevalidate({
    plugins: []
  })
);
