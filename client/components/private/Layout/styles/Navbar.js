import styled from 'styled-components';

const Navbar = styled.nav`
    position: sticky;
    display: flex;
    width: 100%;
    top: 0;
    z-index: 1;
    background: linear-gradient(
        90deg,
        hsl(41, 91.7%, 70.9%),
        hsl(6, 88.9%, 70.6%)
    );
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
    padding: 10px 30px;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;
    }
`;

const UserWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const UserAvatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
`;

const UserFullname = styled.p`
    font-weight: bold;
    margin-left: 15px;
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

const LinkWrapper = styled.li`
    display: inline-block;
    padding: 0 20px;
    font-weight: bold;
    &:first-child {
        padding-left: 0;
    }
    &:last-child {
        padding-right: 0;
    }
`;

export {
    Navbar,
    NavigationList,
    LinkWrapper,
    UserWrapper,
    UserAvatar,
    UserFullname,
};
