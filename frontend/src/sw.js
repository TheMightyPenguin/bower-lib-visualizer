// @ts-nocheck

self.__precacheManifest = [].concat(self.__precacheManifest || []);

const API_ENDPOINT =
  'https://rmru2tqyjl.execute-api.us-west-2.amazonaws.com/prod/';

const API_REGEX = new RegExp(API_ENDPOINT + '.*');

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('notificationclick', event => {
  if (event.notification.tag === 'searchRetry') {
    event.notification.close();
    event.waitUntil(
      clients
        .matchAll({
          type: 'window'
        })
        .then(function(clientList) {
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url == '/') {
              return client
                .focus()
                .then(c => c.navigate(`/?${event.notification.data}`));
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(`/?${event.notification.data}`);
          }
        })
    );
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

function showNotification(title, options) {
  return self.registration.showNotification(title, options);
}

// Cache API with StaleWhileRevalidate
workbox.routing.registerRoute(
  API_REGEX,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'API_PROJECTS',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 1 * 24 * 60 * 60 // 1 Day
      }),
      new workbox.backgroundSync.Plugin('retryQueue', {
        maxRetentionTime: 24 * 60, // 24 hours
        onSync: async ({ queue }) => {
          const entry = await queue.shiftRequest();

          if (!entry || !entry.request) {
            return;
          }

          const requestUrl = new URL(entry.request.url);
          const searchQuery = requestUrl.searchParams.get('q');

          const notificationTitle = searchQuery
            ? `Your serch for "${searchQuery}" is waiting for you!`
            : 'Results for most popular libraries are waiting for you!';
          await showNotification(notificationTitle, {
            tag: 'searchRetry',
            data: requestUrl.searchParams.toString()
          });
        }
      })
    ]
  })
);

/**
 * Cacching google fonts using this recipe:
 * @see https://developers.google.com/web/tools/workbox/guides/common-recipes
 */

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30
      })
    ]
  })
);
