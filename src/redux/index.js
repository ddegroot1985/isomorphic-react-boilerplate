import { combineReducers } from 'redux';
import postsReducer from './posts';
import userDetailsReducer from './userDetails';
import usersReducer from './users';

export default combineReducers({
    posts: postsReducer,
    userDetails: userDetailsReducer,
    users: usersReducer
});
