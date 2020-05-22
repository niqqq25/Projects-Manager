import { PROJECT_EDIT_MODAL } from '../constants';

const open = () => ({ type: PROJECT_EDIT_MODAL.OPEN });

const close = () => ({ type: PROJECT_EDIT_MODAL.CLOSE });

export default { open, close };
