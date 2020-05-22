import { TASK_CREATE_MODAL } from '../constants';

const open = () => ({ type: TASK_CREATE_MODAL.OPEN });

const close = () => ({ type: TASK_CREATE_MODAL.CLOSE });

export default { open, close };
    