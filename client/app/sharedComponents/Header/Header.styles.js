import styled from 'styled-components';

const Header = styled.div`
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 1;
    background-color: white;
    &:after {
        content: '';
        display: block;
        height: 5px;
        background: linear-gradient(90deg, #f5af19, #f12711);
    }
`;

const Header__Inner = styled.div`
    display: flex;
    padding: 20px 30px;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items : center;
    }
`;

const Header__UserName = styled.div`
    font-weight: bold;
`;

const Header__NavigationList = styled.ul`
    display: inline-block;
    margin-left: auto;
    list-style-type: none;
    overflow: hidden;
    @media (max-width: 600px) {
        margin-left: initial;
        margin-top: 20px;
    }
`;

const NavigationList__Link = styled.li`
    display: inline-block;
    padding: 0 20px;
    font-weight: bold;
    &:hover {
        background: -webkit-linear-gradient(#f5af19, #f12711);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        cursor: pointer;
    }
`;

export default {
    Header,
    Header__NavigationList,
    NavigationList__Link,
    Header__UserName,
    Header__Inner,
};
