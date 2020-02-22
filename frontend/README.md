# Bower Library Visualizer!

This project uses the libraries.io API to present a list of bower projects that you can search/filter/sort.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This application uses a Service Worker, _and it runs even on development mode_, so be aware of that. The service worker adds the following functionality:

- Caches the API responses using the [Stale While Revalidate strategy](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate). This means search partially works offline (only for search terms you've search for before).
- Adds a notification to update the App when any asset changes. This is really important for PWA's, specially when deploying a new version as we want users to always use the latest version.

## Available Scripts

- `yarn start`: Runs the app

- `yarn test`: Runs tests

- `yarn build`: Builds the app
