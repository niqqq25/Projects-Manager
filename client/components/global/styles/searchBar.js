import { css } from 'styled-components';

const searchBar = css`
    border-radius: 10rem;
    width: 100%;
    font-size: 0.875rem;
    border: 1px solid #dee2e6;
    font-family: inherit;
    padding: 0.5rem 1rem;
    &:focus {
        outline: none;
        border-color: #f36a15;
    }
`;

export { searchBar };
