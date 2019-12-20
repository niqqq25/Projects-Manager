import styled from 'styled-components';

const CreateProjectModal = styled.div`
    position: relative;
    z-index: 10;
`;

const CreateProjectModal__Form = styled.form`
    max-width: inherit;
    width: 400px;
    @media (max-width: 500px) {
        width: 100vw;
    }
`;

const CreateProjectModal__InputContainer = styled.div`
    margin-bottom: 20px;
`;

export default {
    CreateProjectModal,
    CreateProjectModal__Form,
    CreateProjectModal__InputContainer,
};
