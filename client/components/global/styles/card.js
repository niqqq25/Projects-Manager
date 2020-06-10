import { css } from 'styled-components';

const card = css`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s ease-in-out, transform 0.2s;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }
`;

export { card };
