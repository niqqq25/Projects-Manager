import styled from 'styled-components';

const Member = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`;

const RightSide = styled.div``;
const LeftSide = styled.div`
    display: flex;
    align-items: center;
`;

const MemberInfo = styled.div`
    margin-left: 16px;
`;
const MemberUsername = styled.h1`
    font-size: 16px;
`;
const MemberFullName = styled.p`
    color: ${({ theme }) => theme.text.alt};
    font-size: 13px;
`;

export {
    Member,
    RightSide,
    LeftSide,
    MemberInfo,
    MemberUsername,
    MemberFullName,
};
