# isomorphic-react-boilerplate
Very simple and straightforward isomorphic react boilerplate.
This project supports server-side rendering (SSR) with async data fetching.
Async data fetched on the server is not also fetched in the browser.

# npm commands
* clean - clean the dist directory
* dev - build a development build, mainly used for testing SSR support
* devsrv - start the webpack dev server, recommended for development
* prod - build a production build
* start - start the server (requires dev or prod to be run first)

# Production
In production a different port can be used other than the default port `3000`, also `NODE_ENV` should be set to production.

`NODE_ENV=production PORT=2500 node ./dist/server.js`

# Main frameworks and libaries
Webpack, React, Redux, React Router, Express

# Editing tools
* eslint configured with a slightly modified (and opinionated) airbnb configuration.
* sass lint
