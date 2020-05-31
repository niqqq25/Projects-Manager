import CONFIRMATION from '../constants/confirmation';

const openConfirmation = ({ type, callback }) => ({
    type: CONFIRMATION.OPEN,
    payload: { type, callback },
});

const closeConfirmation = () => ({
    type: CONFIRMATION.CLOSE,
});

export { openConfirmation, closeConfirmation };
