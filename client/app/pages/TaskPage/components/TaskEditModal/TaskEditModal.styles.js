import styled from 'styled-components';

const TaskEditModal = styled.div`
    position: relative;
    z-index: 999;
`;

const TaskEditModal__Form = styled.form`
    max-width: inherit;
    width: 400px;
    @media (max-width: 500px) {
        width: 100vw;
    }
`;

const TaskEditModal__InputContainer = styled.div`
    margin-bottom: 15px;
`;

export default {
    TaskEditModal,
    TaskEditModal__Form,
    TaskEditModal__InputContainer,
};
