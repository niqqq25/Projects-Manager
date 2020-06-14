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
    &:focus {
        outline: none;
    }
`;

export { Textarea };
