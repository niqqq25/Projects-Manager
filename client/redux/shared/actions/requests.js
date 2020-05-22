import REQUESTS from '../constants/requests';

const startRequest = (request) => ({
    type: REQUESTS.START,
    payload: { request },
});

const endRequest = (request) => ({
    type: REQUESTS.END,
    payload: { request },
});

export { startRequest, endRequest };
