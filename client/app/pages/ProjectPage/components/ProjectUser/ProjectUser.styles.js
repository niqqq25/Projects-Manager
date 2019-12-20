import styled from 'styled-components';

const ProjectUser = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0 10px 10px;
    border-bottom: 1px solid rgb(236, 236, 236);
    transition: transform 0.4s;
    list-style-type: none;
    &:hover {
        transform: scale(1.05);
    }
`;

const ProjectUser__CloseLink = styled.a`
    padding: 5px;
    font-size: 10px;
    float: right;
    font-weight: bold;
    color: rgb(182, 181, 181);
    &:hover {
        cursor: pointer;
        background: -webkit-linear-gradient(#f5af19, #f12711);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

export default { ProjectUser, ProjectUser__CloseLink };
