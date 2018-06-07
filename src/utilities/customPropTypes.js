import PropTypes from 'prop-types';

export const store = PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    replaceReducer: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired
});

export const browserContext = PropTypes.shape({
    isFirstRender: PropTypes.bool.isRequired
});
