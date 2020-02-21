# Bower Lib Browser!

This project is meant to show a list of searchable/sortable/filterable Bower projects.

## Frontend

Check the `/frontend` folder to see the UI implementation, it's mmade in React + TypeScript.

## API

A service was implemented on top of the one provided by https://libraries.io. This was due to the fact that consuming that service directly from the frontend, it was a `cors` request, so we were not able to get all of the headers, and we were interested in the `link` header to get the proper pagination information, like what's the last page, the next one, the first one, and so on.

This service it's just a small layer on top that returns a JSON with the following structure:

```
{
  data: [], // array with API results
  pagination: {
    next: '', // next page link
    first: '', // first page link
    last: '', // last page link
    totalPages: 0, // number of total pages
  }
}
```

Check the `/api` folder to learn more about it.
