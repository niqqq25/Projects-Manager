import { CONFIRMATION } from '../constants';

const open = type => ({
    type: CONFIRMATION.OPEN,
    payload: { type },
});

const close = () => ({
    type: CONFIRMATION.CLOSE,
});

export default { open, close };
