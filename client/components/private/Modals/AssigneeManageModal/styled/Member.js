import styled from 'styled-components';

const Member = styled.li`
    display: flex;
    align-items: center;
    padding: 0.25rem 0;
    &:hover {
        background: rgb(235, 236, 240);
        cursor: pointer;
    }
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

export { Member, MemberInfo, MemberUsername, MemberFullName };
