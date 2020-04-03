import { PROJECT_CREATE_MODAL } from '../constants';

const open = () => ({ type: PROJECT_CREATE_MODAL.OPEN });

const close = () => ({ type: PROJECT_CREATE_MODAL.CLOSE });

export default { open, close };
