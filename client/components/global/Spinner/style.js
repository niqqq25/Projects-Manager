import styled, { keyframes, css } from 'styled-components';

const spinning = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const SpinnerWrapper = styled.div`
    display: flex;
    height: -webkit-fill-available;
    justify-content: center;
    align-items: center;
`;

const getSpinnerSizeInPx = (size) => {
    switch (size) {
        case 'small':
            return 30;
        case 'normal':
        default:
            return 40;
    }
};

const Spinner = styled.div`
    display: block;
    height: ${({ size }) => getSpinnerSizeInPx(size)}px;
    width: ${({ size }) => getSpinnerSizeInPx(size)}px;
    border: 3px solid ${({ theme }) => theme.text.main};
    border-top-color: transparent;
    border-radius: 50%;
    opacity: 0.7;
    animation: ${css`
            ${spinning}`} linear infinite 1s;
`;

export { SpinnerWrapper, Spinner };
