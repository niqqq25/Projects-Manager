import styled from 'styled-components';

const TaskBreadcrumb = styled.p`
    font-size: 14px;
    color: rgb(112, 112, 112);
`;

const TaskBreadcrumb__Link = styled.a`
    &:hover {
        color: #f36a15;
        cursor: pointer;
    }
    &:after {
        content: ' > ';
    }
`;

export default { TaskBreadcrumb, TaskBreadcrumb__Link };
