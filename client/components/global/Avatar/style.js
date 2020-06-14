import styled from 'styled-components';

const Avatar = styled.img`
    width: 100%;
    border-radius: inherit;
`;

const AvatarWrapper = styled.div`
    width: ${({ size }) => size || 32}px;
    height: ${({ size }) => size || 32}px;
    border-radius: 50%;
    background: white;
`;

export { Avatar, AvatarWrapper };
