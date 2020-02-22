# Bower Library Visualizer!

This project uses the libraries.io API to present a list of bower projects that you can search/filter/sort.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This application uses a Service Worker, _and it runs even on development mode_, so be aware of that. The service worker adds the following functionality:

- Caches the API responses using the [Stale While Revalidate strategy](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate). This means search partially works offline (only for search terms you've search for before).
- Adds a notification to update the App when any asset changes. This is really important for PWA's, specially when deploying a new version as we want users to always use the latest version.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
