import React, { useEffect, useState, useRef } from 'react';
import { UsersList, noMatchingResults } from './styles/UsersList';
import User from './User';
import Spinner from '../../../global/Spinner';
import { EmptyCard } from '../../../global/cards';

import { connect } from 'react-redux';
import { getUsers } from '../../../../redux/private/actions/memberAddModal';
import MEMBER_ADD_MODAL from '../../../../redux/private/constants/memberAddModal';

const SEARCH_TIMEOUT = 1000;
const USERS_LIMIT = 20;

function _UsersList({ users = [], getUsers, isLoading, search, projectId }) {
    const [searchTimeout, setSearchTimeout] = useState(null);
    const firstUpdate = useRef(true);

    useEffect(() => {
        const timeout = firstUpdate.current ? 0 : SEARCH_TIMEOUT;
        firstUpdate.current = false;

        clearTimeout(searchTimeout);
        const id = setTimeout(
            () => getUsers(search, projectId, USERS_LIMIT),
            timeout
        );
        setSearchTimeout(id);
    }, [search]);

    useEffect(() => {
        return () => {
            clearTimeout(searchTimeout);
        };
    }, []);

    if (isLoading || !users) {
        return <Spinner size="small" />;
    }
    if (!users.length) {
        return (
            <EmptyCard _css={noMatchingResults}>No matching results</EmptyCard>
        );
    }

    return (
        <UsersList>
            {users.map((user, index) => (
                <User key={index} user={user} projectId={projectId} />
            ))}
        </UsersList>
    );
}

const ConnectedUsersList = connect(
    ({ memberAddModal, requests, currentProject }) => ({
        users: memberAddModal.users,
        isLoading: requests.includes(MEMBER_ADD_MODAL.GET_USERS),
        projectId: currentProject.project._id,
    }),
    (dispatch) => ({
        getUsers: (query, projectId, limit) =>
            dispatch(getUsers({ query, projectId, limit })),
    })
)(_UsersList);

export default ConnectedUsersList;
