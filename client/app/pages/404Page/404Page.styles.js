import styled from 'styled-components';

const Page404 = styled.div`
    position: fixed;
    min-width: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

const Page404__Title = styled.h1`
    font-size: 80px;
`;

const Page404__Paragraph = styled.p`
    color: grey;
    margin-bottom: 15px;
    padding-bottom: 1px;
    &:after {
        content: '';
        display: block;
        height: 1px;
        width: 100%;
        background: linear-gradient(90deg, #f5af19, #f12711);
    }
`;

export default {
    Page404,
    Page404__Title,
    Page404__Paragraph,
};
