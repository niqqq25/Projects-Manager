import CONFIRMATION from '../constants/confirmation';

const openConfirmation = (type) => ({
    type: CONFIRMATION.OPEN,
    payload: { type },
});

const closeConfirmation = () => ({
    type: CONFIRMATION.CLOSE,
});

export { openConfirmation, closeConfirmation };
