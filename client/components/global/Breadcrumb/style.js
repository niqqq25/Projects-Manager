import styled from 'styled-components';

const Breadcrumb = styled.ol`
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    list-style: none;
`;

const BreadcrumbItem = styled.li`
    color: ${({ theme }) => theme.text.breadcrumb};
    &:not(:last-child):after {
        content: '›';
        font-size: 21px;
        padding: 0 8px;
        // color: ${({ theme }) => theme.text.breadcrumb};
    }
`;

export { Breadcrumb, BreadcrumbItem };
