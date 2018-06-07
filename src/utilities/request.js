
import fetch from 'isomorphic-fetch';
import config from '../config';

const request = {
    getJson: async (action) => {
        const url = config.apiUrl.concat(action);

        const promise = fetch(url, {
            headers: {
                Accept: 'application/json'
            }
        });

        const response = await promise;

        const json = await response.json();

        if (response.ok) {
            return json;
        }

        return Promise.reject(Error(json.message || response.statusText || response.status));
    }
};

export default request;
