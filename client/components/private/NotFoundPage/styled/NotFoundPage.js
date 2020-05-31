import styled from 'styled-components';

const NotFoundPage = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

const Title = styled.h1`
    font-size: 160px;
    @media (max-width: 1000px) {
        font-size: 80px;
    }
`;

const Description = styled.p`
    color: grey;
    font-size: 30px;
    margin-bottom: 20px;
    @media (max-width: 1000px) {
        font-size: initial;
        margin-bottom: 15px;
    }
`;

const ButtonWrapper = styled.div`
    width: fit-content;
    font-size: 20px;
    margin: 0 auto;
    @media (max-width: 1000px) {
        font-size: initial;
    }
`;

export { NotFoundPage, Title, Description, ButtonWrapper };
