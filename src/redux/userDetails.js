import { createAction, handleActions } from 'redux-actions';
import { data } from './users';

const defaultState = null;

// Reducer
export default handleActions({
    USER_DETAILS_GET_FULFILLED: (state, action) => {
        return action.payload;
    },
    USER_DETAILS_GET_REJECTED: (state, action) => {
        return { error: action.payload.message };
    }
}, defaultState);

// Action Creators
export const getUserDetails = createAction('USER_DETAILS_GET', (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id < 4) {
                const user = data[id];

                resolve({
                    id: user.id,
                    name: user.name,
                    bio: user.bio
                });
            } else {
                reject(Error('Ooops! User not found!'));
            }
        }, 1000);
    });
});
