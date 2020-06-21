import styled from 'styled-components';

const Dropdown = styled.div`
    position: relative;
    &:focus {
        outline: none;
    }
`;

const DropdownContent = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    right: 0;
    box-shadow: 0 3px 6px rgba(33, 37, 41, 0.1);
    font-size: 14px;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid ${({ theme }) => theme.border.default};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.bg.white};
`;

export { Dropdown, DropdownContent };
