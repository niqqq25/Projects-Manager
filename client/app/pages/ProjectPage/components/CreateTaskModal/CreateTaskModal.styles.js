import styled from 'styled-components';

const CreateTaskModal = styled.div`
    position: relative;
    z-index: 10;
`;

const CreateTaskModal__Form = styled.form`
    max-width: inherit;
    width: 400px;
    @media (max-width: 500px) {
        width: 100vw;
    }
`;

const CreateTaskModal__InputContainer = styled.div`
    margin-bottom: 20px;
`;

export default {
    CreateTaskModal,
    CreateTaskModal__Form,
    CreateTaskModal__InputContainer,
};
