import { createAction } from 'redux-actions';
import request from '../utilities/request';

// Reducer
export default function reducer(state = [], action) {
    switch (action.type) {
        case 'GET_POSTS_FULFILLED':
            return action.payload;
        default:
            return state;
    }
}

// Action Creators
export const getPosts = createAction('GET_POSTS', () => {
    return request.getJson('posts');
});
