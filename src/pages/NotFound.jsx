import PropTypes from 'prop-types';
import React from 'react';

const NotFound = ({ staticContext }) => {
    if (staticContext) {
        staticContext.statusCode = 404; /* eslint-disable-line no-param-reassign */
    }

    return (
        <h1>404 Not Found</h1>
    );
};

NotFound.propTypes = {
    staticContext: PropTypes.objectOf(PropTypes.shape({
        statusCode: PropTypes.number
    }))
};

NotFound.defaultProps = {
    staticContext: undefined
};

export default NotFound;
