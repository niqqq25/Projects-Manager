import styled, { css } from 'styled-components';

const userInfoCard = css`
    width: 300px;
    height: 300px;
    margin: 0 20px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    @media (max-width: 700px) {
        margin: 40px 0;
    }
`;

const AvatarBorder = styled.div`
    background: ${({ theme }) => theme.bg.horizontalGradient};
    border-radius: 50%;
    padding: 5px;
`;

const CardTitle = styled.p`
    margin: 10px 0;
    font-weight: bold;
    font-size: 19px;
    color: ${({ theme }) => theme.text.primary};
`;

const CardText = styled.p`
    font-size: 13px;
    color: ${({ theme }) => theme.text.alt};
`;

export { userInfoCard, AvatarBorder, CardTitle, CardText };
