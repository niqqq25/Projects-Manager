//constants
import MEMBER_ADD_MODAL from '../constants/memberAddModal';

//actions
import { startRequest, endRequest } from '../../shared/actions/requests';

//services
import { getNonMemberUsers } from '../services/users';

const getUsersSuccess = (users) => ({
    type: MEMBER_ADD_MODAL.GET_USERS_SUCCESS,
    payload: { users },
});

const getUsers = ({ query, limit, projectId }) => async (dispatch) => {
    dispatch(startRequest(MEMBER_ADD_MODAL.GET_USERS));

    try {
        const { users } = await getNonMemberUsers({ query, limit, projectId });
        dispatch(getUsersSuccess(users));
    } catch (err) {
        console.error(err);
    }

    dispatch(endRequest(MEMBER_ADD_MODAL.GET_USERS));
};

const clearUsers = () => ({
    type: MEMBER_ADD_MODAL.CLEAR,
});

export { getUsers, clearUsers };
