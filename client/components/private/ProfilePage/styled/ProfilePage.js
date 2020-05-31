import styled from 'styled-components';

const ProfilePage = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 60px;
    @media (max-width: 700px) {
        flex-direction: column;
        padding-top: 20px;
        align-items: center;
        background: white;
    }
`;

export { ProfilePage };
