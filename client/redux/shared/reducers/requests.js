import REQUESTS from '../constants/requests';

function requests(state = [], { type, payload }) {
    switch (type) {
        case REQUESTS.START:
            return [...state, payload.request];
        case REQUESTS.END:
            return state.filter((request) => request !== payload.request);
        default:
            return state;
    }
}

export default requests;
