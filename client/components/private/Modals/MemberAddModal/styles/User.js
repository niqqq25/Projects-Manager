import styled from 'styled-components';

const User = styled.li`
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

const UserInfo = styled.div`
    margin-left: 16px;
`;
const UserUsername = styled.h1`
    font-size: 16px;
`;
const UserFullName = styled.p`
    color: ${({ theme }) => theme.text.second};
    font-size: 13px;
`;

export { User, RightSide, LeftSide, UserInfo, UserUsername, UserFullName };
