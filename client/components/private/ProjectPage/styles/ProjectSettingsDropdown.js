import styled from 'styled-components';

const DropdownItem = styled.a`
    display: block;
    white-space: nowrap;
    width: 100%;
    padding: 8px 14px;
    border-radius: inherit;
    font-weight: bold;
    &:hover {
        background-color: ${({ theme }) => theme.bg.hover};
        cursor: pointer;
    }
    color: ${({ danger, theme }) => (danger ? theme.warning.default : 'default')};
`;

export { DropdownItem };
