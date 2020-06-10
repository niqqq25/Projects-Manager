//constants
import USERS from '../constants/users';

//actions
import { startRequest, endRequest } from '../../shared/actions/requests';

//services
import { getNonMemberUsers } from '../services/users';

const getUsersSuccess = (users) => ({
    type: USERS.GET_SUCCESS,
    payload: { users },
});

const _getNonMemberUsers = ({ query, limit, projectId }) => async (
    dispatch
) => {
    dispatch(startRequest(USERS.GET));

    try {
        const { users } = await getNonMemberUsers({ query, limit, projectId });
        dispatch(getUsersSuccess(users));
    } catch (err) {
        console.error(err);
    }

    dispatch(endRequest(USERS.GET));
};

const clearUsers = () => ({
    type: USERS.CLEAR,
});

export { _getNonMemberUsers as getNonMemberUsers, clearUsers };
