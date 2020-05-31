import styled from 'styled-components';

const Avatar = styled.img`
    width: ${({ size }) => size || 32}px;
    border-radius: 50%;
`;

export { Avatar };
