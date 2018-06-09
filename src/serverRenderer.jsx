import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './redux';
import errorHandler from './redux/middleware/errorHandler';
import routes from './routes';

async function serverRenderer(url) {
    const middleware = applyMiddleware(errorHandler, promiseMiddleware());

    const store = createStore(reducers, middleware);

    const branch = matchRoutes(routes, url);

    const promises = branch.map(({ route, match }) => {
        return route.component.fetchInitialData
            ? route.component.fetchInitialData(store.dispatch, match)
            : Promise.resolve();
    });

    const staticContext = {};

    const ServerApp = (
        <Provider store={store}>
            <StaticRouter location={url} context={staticContext}>
                {renderRoutes(routes, { store })}
            </StaticRouter>
        </Provider>
    );

    await Promise.all(promises);

    return {
        html: renderToString(ServerApp),
        redirectUrl: staticContext.url,
        statusCode: staticContext.statusCode || 200,
        globals: {
            initialReduxState: store.getState()
        }
    };
}

export default serverRenderer;
