import styled from 'styled-components';

const User = styled.li`
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

const UserInfo = styled.div`
    margin-left: 1rem;
`;
const UserUsername = styled.h1`
    font-size: 1rem;
`;
const UserFullName = styled.p`
    color: #6c757d;
    font-size: 0.8rem;
`;

export { User, RightSide, LeftSide, UserInfo, UserUsername, UserFullName };
