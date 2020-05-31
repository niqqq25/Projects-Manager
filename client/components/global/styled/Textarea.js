import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    text-align: left;
    resize: none;
    overflow: hidden;
    border: none;
    padding: 10px 5px;
    font-weight: bold;
    font-family: inherit;
    &:focus {
        background-color: rgb(245, 244, 244);
        outline: none;
    }
`;

export { Textarea };