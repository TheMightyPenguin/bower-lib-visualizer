# Bower Library Visualizer!

This project uses the libraries.io API to present a list of bower projects that you can search/filter/sort.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This application uses a Service Worker, _and it runs even on development mode_, so be aware of that. The service worker adds the following functionality:

- Caches the API responses using the [Stale While Revalidate strategy](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate). This means search partially works offline (only for search terms you've search for before).
- Adds a notification to update the App when any asset changes. This is really important for PWA's, specially when deploying a new version as we want users to always use the latest version.
- If you try to search while you're offline, it will remember the search and show a notification when the user is back online. This is not working reliably tho.

This application gets automatically deployed to Netlify on every push, check it out here: https://musing-mirzakhani-054044.netlify.com/

## Available Scripts

- `yarn start`: Runs the app

- `yarn test`: Runs tests

- `yarn build`: Builds the app

### Could Improve

- Adding more integration tests to the app: For example to test the behaviour of the current options on the URL, or when interacting with the sort inputs.
- Have a better method of generating mock data, probably using something like: https://github.com/willryan/factory.ts
- The way of sending notifactions. Right now this is only used to send the Service Worker update message, so the way to send notifications is really hacky, check Notifications.component.tsx to see it. They way to go with this would be to create a Provider around it, and then consume the function to send notifications from it. And also moving the Servicce Worker registration into a provider so that it can consume this context to send the notifications
- The service worker is written in Plain JS, this is due the the painful process of creating a custom Service Worker when using Create React App. I'd change this to a custom Webpack setting so that when things like this are needed, the settings are more flexible and allow customization for these cases. Squoosh is a public example of a PWA that writes its service worker in TypeScript: https://github.com/GoogleChromeLabs/squoosh. This change would improve Developer Experience when modifying the Service Worker.
- Also improve the service worker logic, to make it more resilient.
- UX/UI, I'm not totally happy with how the apps looks, but it's decent.
- Implement better primivites components to handle Layouts, components like Stack or Inline (similar to the ones in this design system: https://seek-oss.github.io/braid-design-system/foundations/layout) would make it easier to implement layouts, instead of using Box's with lots of props all over the place. The Box approach is nice to use and really flexible, but won't scale well to bigger applications as we'll see repeating props all over the place, so having abstracions like Stack or Inline help a lot with this, and a bonus is that we don't need the care about the underlying implementation detials (e.g.: using Flex or CSS Grid).
- Probably a lot of other things that I'm missing, there's always room for improvement! :D
