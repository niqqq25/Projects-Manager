import styled from 'styled-components';

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.div`
    order: -1;
    pointer-events: none;
    transition: all 0.2s ease-in;
    transform: translateY(${(props) => (props.labelSliding ? 25 : 0)}px);
    color: ${({ error, theme }) =>
        error ? theme.warning.default : theme.text.light};
    font-size: 14px;
    padding-left: 5px;
    text-transform: capitalize;
`;

const InputWrapper = styled.div`
    &:after {
        content: '';
        display: block;
        height: 2px;
        background-image: linear-gradient(
            90deg,
            ${({ theme }) => theme.color.neonPink} 0%,
            ${({ theme }) => theme.color.purple} 50%,
            ${({ theme }) => theme.text.light} 50%,
            ${({ theme }) => theme.text.light} 100%
        );
        background-size: 200%;
        background-position: right;
        transition: background-position 0.4s;
        background-position: ${(props) =>
            props.borderSliding ? 'right' : 'left'};
    }
    &:focus-within + ${Label} {
        transform: translateY(0px);
    }
    &:focus-within::after {
        background-position: left;
    }
`;

const ErrorText = styled.p`
    margin-top: 2px;
    font-size: 12px;
    color: ${({ theme }) => theme.warning.default};
`;

const InputRequiredSymbol = styled.p`
    display: inline-block;
    color: ${({ theme }) => theme.warning.default};
`;

export { InputGroup, Label, InputWrapper, ErrorText, InputRequiredSymbol };
