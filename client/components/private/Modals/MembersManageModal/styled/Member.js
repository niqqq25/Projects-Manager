import styled from 'styled-components';

const Member = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const RightSide = styled.div``;
const LeftSide = styled.div`
    display: flex;
    align-items: center;
`;

const MemberInfo = styled.div`
    margin-left: 1rem;
`;
const MemberUsername = styled.h1`
    font-size: 1rem;
`;
const MemberFullName = styled.p`
    color: #6c757d;
    font-size: 0.8rem;
`;

export {
    Member,
    RightSide,
    LeftSide,
    MemberInfo,
    MemberUsername,
    MemberFullName,
};
