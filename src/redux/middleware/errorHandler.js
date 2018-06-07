// Based on:
// https://github.com/pburtchaell/redux-promise-middleware/blob/master/examples/complex/middleware/error.js

import { isDev } from '../../utilities/environment';

function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value && typeof value.then === 'function';
    }

    return false;
}

function errorHandler() {
    return (next) => {
        return (action) => {
            // If not a promise, continue on
            if (!isPromise(action.payload)) {
                return next(action);
            }

            // Dispatch initial pending promise, but catch any errors
            return next(action)
                .catch((error) => {
                    if (isDev) {
                        // eslint-disable-next-line no-console
                        console.warn(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);
                    }

                    return error;
                });
        };
    };
}

export default errorHandler;
