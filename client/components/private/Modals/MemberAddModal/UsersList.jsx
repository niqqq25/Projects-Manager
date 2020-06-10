import React, { useEffect, useState, useRef } from 'react';
import { UsersList, NoMatchingResults } from './styled/UsersList';
import User from './User';
import Spinner from '../../../global/Spinner';

import { connect } from 'react-redux';
import { getNonMemberUsers } from '../../../../redux/private/actions/users';
import USERS from '../../../../redux/private/constants/users';

const SEARCH_TIMEOUT = 1000;
const USERS_LIMIT = 20;

function _UsersList({ users, getUsers, isLoading, search, projectId }) {
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

    if (isLoading) {
        return <Spinner size="small" />;
    }
    if (!users.length) {
        return <NoMatchingResults>No matching results</NoMatchingResults>;
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
    ({ users, requests, currentProject }) => ({
        users,
        isLoading: requests.includes(USERS.GET),
        projectId: currentProject.project._id,
    }),
    (dispatch) => ({
        getUsers: (query, projectId, limit) =>
            dispatch(getNonMemberUsers({ query, projectId, limit })),
    })
)(_UsersList);

export default ConnectedUsersList;
