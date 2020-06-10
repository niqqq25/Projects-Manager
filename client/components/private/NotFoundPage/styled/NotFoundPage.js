import styled from 'styled-components';

const NotFoundPage = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

const Title = styled.h1`
    font-size: 10rem;
    @media (max-width: 1000px) {
        font-size: 5rem;
    }
`;

const Description = styled.p`
    color: grey;
    font-size: 1.875rem;
    margin-bottom: 1.25rem;
    @media (max-width: 1000px) {
        font-size: initial;
        margin-bottom: 0.9375rem;
    }
`;

export { NotFoundPage, Title, Description };
