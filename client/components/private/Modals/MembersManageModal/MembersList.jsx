import React from 'react';
import { MembersList, NoMatchingResults } from './styled/MembersList';
import Member from './Member';

import { connect } from 'react-redux';

function filterMembers(members, owner, filter) {
    const regex = new RegExp(`^${filter}`, 'i');
    return members.filter(
        ({ username, _id }) => username.match(regex) && _id !== owner._id
    );
}

function _MembersList({ filter, project }) {
    const { members, _id: projectId, owner } = project;
    const filteredMembers = filterMembers(members, owner, filter);

    if (!filteredMembers.length) {
        return <NoMatchingResults>No matching results</NoMatchingResults>;
    }

    return (
        <MembersList>
            {filteredMembers.map((member, index) => (
                <Member key={index} member={member} projectId={projectId} />
            ))}
        </MembersList>
    );
}

const ConnectedMembersList = connect(({ currentProject }) => ({
    project: currentProject.project,
}))(_MembersList);

export default ConnectedMembersList;
