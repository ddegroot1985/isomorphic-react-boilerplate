import { createAction, handleActions } from 'redux-actions';

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

const defaultState = [];

// Reducer
export default handleActions({
    USER_GET_FULFILLED: (state, action) => {
        return action.payload;
    }
}, defaultState);

// Action Creators
export const getUsers = createAction('USER_GET', (count) => {
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
