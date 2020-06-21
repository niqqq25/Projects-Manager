import styled, { css } from 'styled-components';

const Navbar = styled.nav`
    position: sticky;
    display: flex;
    width: 100%;
    top: 0;
    z-index: 1;
    background: ${({ theme }) => theme.bg.horizontalGradient};
    box-shadow: 0 8px 6px -6px #999;
    padding: 10px 30px;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;
    }
`;

const UserInfoWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const UserFullname = styled.p`
    font-weight: bold;
    margin-left: 10px;
`;

const NavigationList = styled.ul`
    display: inline-block;
    margin-left: auto;
    list-style-type: none;
    overflow: hidden;
    @media (max-width: 600px) {
        margin-left: initial;
        margin-top: 20px;
    }
`;

const ListItem = styled.li`
    display: inline-block;
    padding: 0 20px;
    &:first-child {
        padding-left: 0;
    }
    &:last-child {
        padding-right: 0;
    }
`;

const navigationLink = css`
    color: ${({ isActive, theme }) =>
        isActive ? theme.text.white : theme.text.primary};
    &:hover {
        color: ${({ theme }) => theme.text.white};
    }
`;

export {
    Navbar,
    NavigationList,
    ListItem,
    UserInfoWrapper,
    UserFullname,
    navigationLink,
};
