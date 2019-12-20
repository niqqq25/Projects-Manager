import styled from 'styled-components';

const ProjectEditModal = styled.div`
    position: relative;
    z-index: 999;
`;

const ProjectEditModal__Form = styled.form`
    max-width: inherit;
    width: 400px;
    @media (max-width: 500px) {
        width: 100vw;
    }
`;

const ProjectEditModal__InputContainer = styled.div`
    margin-bottom: 15px;
`;

export default {
    ProjectEditModal,
    ProjectEditModal__InputContainer,
    ProjectEditModal__Form,
};
