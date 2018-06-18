import { createAction, handleActions } from 'redux-actions';
import request from '../utilities/request';

const defaultState = [];

// Reducer
export default handleActions({
    POSTS_GET_FULFILLED: (state, action) => {
        return action.payload;
    }
}, defaultState);

// Action Creators
export const getPosts = createAction('POSTS_GET', () => {
    return request.getJson('posts');
});
