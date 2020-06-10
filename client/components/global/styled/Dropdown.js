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
    box-shadow: 0 0.1875rem 0.375rem rgba(33, 37, 41, 0.1);
    font-size: 0.875rem;
    padding: 0.5rem;
    margin-top: 0.25rem;
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;
    background-color: #fff;
`;

export { Dropdown, DropdownContent };
