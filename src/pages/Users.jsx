
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import { route as routePropType } from 'react-router-prop-types';
import { bindActionCreators } from 'redux';
import { getUsers } from '../redux/users';
import { browserContext as browserContextPropType, store as storePropType } from '../utilities/customPropTypes';

class Users extends React.Component {
    static fetchInitialData(dispatch) {
        return dispatch(getUsers(5));
    }
    render() {
        const { route, store, browserContext } = this.props;

        return (
            <div>
                <h1>Users</h1>
                <p>
                    This page simulates an async request by using a setTimeout in the redux action.<br />
                    A user can by clicked to show some dummy details to prove nested routes are also working.<br />
                    Clicking on the last user will generate an error.
                </p>
                <ul>
                    {this.props.users.map((user) => {
                        return <li key={user.id}><Link to={`/users/${user.id}`}>{user.name}{user.somethingelse}</Link></li>;
                    })}
                </ul>
                {renderRoutes(route.routes, { store, browserContext })}
            </div>
        );
    }
}

Users.propTypes = {
    route: routePropType.isRequired,
    store: storePropType.isRequired,
    browserContext: browserContextPropType,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })).isRequired
};

Users.defaultProps = {
    browserContext: undefined
};

export default connect((state) => {
    return { users: state.users };
}, (dispatch) => {
    return bindActionCreators({ getUsers }, dispatch);
})(Users);
