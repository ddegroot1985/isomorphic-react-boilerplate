import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './redux';
import errorHandler from './redux/middleware/errorHandler';
import routes from './routes';
import './styles/main.scss';
import { usingDevServer } from './utilities/environment';

const logger = createLogger({
    collapsed: true
});

const middleware = applyMiddleware(errorHandler, promiseMiddleware(), logger);

// Take the initial redux state from the window object and delete it from the window object.
const { initialReduxState } = window;
delete window.initialReduxState;

const store = createStore(reducers, initialReduxState, middleware);

// The browserContext is currently only used to keep track of the first render which is used to fetch initial data.
// This needs to be passed in all components in the routing tree.
const browserContext = {
    isFirstRender: true
};

const BrowserApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                {renderRoutes(routes, { store, browserContext })}
            </BrowserRouter>
        </Provider>
    );
};

// The webpack dev server does not render the application on the server side.
// Use 'hydrate' when the app is pre rendered, otherwise use 'render'.
const renderMethod = usingDevServer
    ? render
    : hydrate;

renderMethod(
    <BrowserApp />,
    document.getElementById('root')
);

// After the render set isFirstRender to false.
browserContext.isFirstRender = false;
