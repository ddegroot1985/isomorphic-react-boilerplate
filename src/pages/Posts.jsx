import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPosts } from '../redux/posts';

class Posts extends React.Component {
    static fetchInitialData(dispatch) {
        return dispatch(getPosts());
    }
    render() {
        return (
            <div>
                <h1>Posts</h1>
                <p>
                    This page does an async request. When the page is rendered on the server the request will be done there and not on the client.
                </p>
                <ul>
                    {this.props.posts.map((post) => {
                        return <li key={post.id}>{post.title}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

Posts.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string
    })).isRequired
};

export default connect((state) => {
    return { posts: state.posts };
}, (dispatch) => {
    return bindActionCreators({ getPosts }, dispatch);
})(Posts);
