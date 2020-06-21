import styled from 'styled-components';

const SearchBar = styled.input`
    border-radius: 160px;
    width: 100%;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.border.default};
    font-family: inherit;
    padding: 8px 16px;
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.text.main};
    }
`;

export { SearchBar };
