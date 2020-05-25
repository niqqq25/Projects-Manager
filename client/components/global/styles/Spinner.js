import styled, { keyframes, css } from 'styled-components';

const spinning = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const SpinnerWrapper = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const getSpinnerSizeInPx = (size) => {
    switch (size) {
        case 'normal':
        default:
            return 50;
    }
};

const Spinner = styled.div`
    display: block;
    height: ${({ size }) => getSpinnerSizeInPx(size)}px;
    width: ${({ size }) => getSpinnerSizeInPx(size)}px;
    border: 3px solid #ffd6bd;
    border-top-color: white;
    border-radius: 50%;
    animation: ${css`
            ${spinning}`} linear infinite 1s;
`;

export { SpinnerWrapper, Spinner };
