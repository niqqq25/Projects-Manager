import { css } from 'styled-components';

const dropdownItem = css`
    display: block;
    white-space: nowrap;
    width: 100%;
    padding: 0.5rem 0.875rem;
    border-radius: inherit;
    font-weight: bold;
    &:hover {
        background-color: #e9ecef;
        cursor: pointer;
    }
`;

export { dropdownItem };
