import styled from 'styled-components';

const Navbar = styled.div`
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 1;
    background: linear-gradient(
        90deg,
        rgb(245, 175, 25, 0.15),
        rgb(241, 39, 17, 0.15)
    );
    &:after {
        content: '';
        display: block;
        height: 5px;
        background: linear-gradient(90deg, #f5af19, #f12711);
    }
`;

const NavbarInner = styled.div`
    display: flex;
    padding: 20px 30px;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`;

const UserInfo = styled.div`
    font-weight: bold;
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

const LinkContainer = styled.li`
    display: inline-block;
    padding: 0 20px;
    font-weight: bold;
`;

export { Navbar, NavbarInner, UserInfo, NavigationList, LinkContainer };
