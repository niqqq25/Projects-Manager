import { REQUESTING } from '../constants';

const start = request => ({
    type: REQUESTING.START,
    payload: request,
});

const end = request => ({
    type: REQUESTING.END,
    payload: request,
});

export default { start, end };
