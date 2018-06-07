
import { createAction } from 'redux-actions';

const data = [...new Array(20)].map((item, index) => {
    const name = `Mr. ${String.fromCharCode(65 + index)}. Smith`;
    return {
        id: index,
        name,
        bio: `A very long an descriptive bio for ${name}.`
    };
});

// Export data
export { data };

// Reducer
export default function reducer(state = [], action) {
    switch (action.type) {
        case 'GET_USERS_FULFILLED':
            return action.payload;
        default:
            return state;
    }
}

// Action Creators
export const getUsers = createAction('GET_USERS', (count) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.slice(0, count).map((user) => {
                return {
                    id: user.id,
                    name: user.name
                };
            }));
        }, 1000);
    });
});
