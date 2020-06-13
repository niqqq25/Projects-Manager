//constants
import ASSIGNEE_MANAGE_MODAL from '../constants/assigneeManageModal';

//actions
import { startRequest, endRequest } from '../../shared/actions/requests';

//services
import { getMembers } from '../services/users';

const getMembersSuccess = (members) => ({
    type: ASSIGNEE_MANAGE_MODAL.GET_MEMBERS_SUCCESS,
    payload: { members },
});

const _getMembers = (projectId) => async (dispatch) => {
    dispatch(startRequest(ASSIGNEE_MANAGE_MODAL.GET_MEMBERS));

    try {
        const { users } = await getMembers({ projectId });
        dispatch(getMembersSuccess(users));
    } catch (err) {
        console.error(err);
    }

    dispatch(endRequest(ASSIGNEE_MANAGE_MODAL.GET_MEMBERS));
};

const clearAssigneeManageModal = () => ({
    type: ASSIGNEE_MANAGE_MODAL.CLEAR,
});

export { _getMembers as getMembers, clearAssigneeManageModal };
