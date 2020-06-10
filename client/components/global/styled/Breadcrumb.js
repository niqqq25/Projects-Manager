import styled from 'styled-components';
import { GoChevronRight } from 'react-icons/go';

const Breadcrumb = styled.ol`
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    list-style: none;
`;

const BreadcrumbItem = styled.li`
    color: #6c757d;
    &:not(:last-child):after {
        content: '›';
        font-size: 1.3rem;
        padding: 0 0.5rem;
        color: #adb5bd;
    }
`;

export { Breadcrumb, BreadcrumbItem };
