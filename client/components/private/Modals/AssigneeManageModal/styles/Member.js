import styled from 'styled-components';

const Member = styled.li`
    display: flex;
    align-items: center;
    padding: 4px 0;
    &:hover {
        background: ${({ theme }) => theme.bg.hover};
        cursor: pointer;
    }
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

export { Member, MemberInfo, MemberUsername, MemberFullName };
