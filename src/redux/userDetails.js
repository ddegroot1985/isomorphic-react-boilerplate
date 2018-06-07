import { createAction } from 'redux-actions';
import { data } from './users';

// Reducer
export default function reducer(state = null, action) {
    switch (action.type) {
        case 'GET_USER_DETAILS_FULFILLED':
            return action.payload;
        case 'GET_USER_DETAILS_REJECTED':
            return { error: action.payload.message };
        default:
            return state;
    }
}

// Action Creators
export const getUserDetails = createAction('GET_USER_DETAILS', (id) => {
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
