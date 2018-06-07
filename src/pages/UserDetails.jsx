import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { match as matchPropType } from 'react-router-prop-types';
import { bindActionCreators } from 'redux';
import { getUserDetails } from '../redux/userDetails';

class UserDetails extends React.Component {
    static fetchInitialData(dispatch, match) {
        return dispatch(getUserDetails(match.params.id));
    }
    componentDidUpdate(prevProps) {
        const prevId = prevProps.match.params.id;
        const newId = this.props.match.params.id;

        if (prevId !== newId) {
            this.props.getUserDetails(newId);
        }
    }
    render() {
        const { userDetails } = this.props;

        if (!userDetails) {
            return <div>Loading...</div>;
        }

        const { name, bio, error } = userDetails;

        if (error) {
            return <div>{userDetails.error}</div>;
        }

        return (
            <div>
                <h1>{name}</h1>
                <p>{bio}</p>
            </div>
        );
    }
}

UserDetails.propTypes = {
    getUserDetails: PropTypes.func.isRequired,
    match: matchPropType.isRequired,
    userDetails: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        bio: PropTypes.string,
        error: PropTypes.string
    })
};

UserDetails.defaultProps = {
    userDetails: null
};

export default connect((state) => {
    return { userDetails: state.userDetails };
}, (dispatch) => {
    return bindActionCreators({ getUserDetails }, dispatch);
})(UserDetails);
