import React, { useEffect } from 'react';
import { MembersList, NoMatchingResults } from './styled/MembersList';
import Spinner from '../../../global/Spinner';
import Member from './Member';

import { connect } from 'react-redux';
import { getMembers } from '../../../../redux/private/actions/assigneeManageModal';
import ASSIGNEE_MANAGE_MODAL from '../../../../redux/private/constants/assigneeManageModal';

const unassignedMember = {
    _id: null,
    username: 'Unassigned',
    avatarUrl: 'http://www.gravatar.com/avatar/?d=mm',
};

function filterMembers(members, filter, assignee) {
    const regex = new RegExp(`^${filter}`, 'i');
    return members.filter(
        ({ username, _id }) => username.match(regex) && assignee !== _id
    );
}

function _MembersList({
    filter,
    getMembers,
    isLoading,
    members,
    projectId,
    assignee,
}) {
    useEffect(() => {
        getMembers(projectId);
    }, []);

    if (isLoading || !members) {
        return <Spinner size="small" />;
    }

    const filteredMembers = filterMembers(members, filter, assignee);
    if (!filteredMembers.length) {
        return <NoMatchingResults>No matching results</NoMatchingResults>;
    }

    return (
        <MembersList>
            {assignee && <Member member={unassignedMember} />}
            {filteredMembers.map((member, index) => (
                <Member member={member} key={index} />
            ))}
        </MembersList>
    );
}

const ConnectedMembersList = connect(
    ({ assigneeManageModal, requests, currentTask }) => ({
        members: assigneeManageModal.members,
        isLoading: requests.includes(ASSIGNEE_MANAGE_MODAL.GET_MEMBERS),
        projectId: currentTask.task.project._id,
        assignee: currentTask.task.assignee?._id,
    }),
    (dispatch) => ({
        getMembers: (id) => dispatch(getMembers(id)),
    })
)(_MembersList);

export default ConnectedMembersList;
