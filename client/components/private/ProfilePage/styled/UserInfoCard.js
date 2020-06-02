import styled from 'styled-components';

const UserInfoCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 300px;
    margin: 0 20px;
    background: white;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    @media (max-width: 700px) {
        margin: 40px 0;
    }
`;

const AvatarBorder = styled.div`
    background: linear-gradient(
        90deg,
        hsl(41, 91.7%, 70.9%),
        hsl(6, 88.9%, 70.6%)
    );
    border-radius: 50%;
    padding: 5px;
`;

const CardTitle = styled.p`
    margin: 10px 0;
    font-weight: bold;
    font-size: 1.2rem;
`;

const CardText = styled.p`
    font-size: 0.8rem;
`;

export { UserInfoCard, AvatarBorder, CardTitle, CardText };
