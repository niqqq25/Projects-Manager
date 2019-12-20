import styled from 'styled-components';

const AddUserModal = styled.div`
    position: relative;
    z-index: 10;
`;

const AddUserModal__Form = styled.form`
    max-width: inherit;
    width: 400px;
    @media (max-width: 500px) {
        width: 100vw;
    }
`;

const AddUserModal__Form__SelectContainer = styled.div`
    margin-bottom: 20px;
`;

export default {
    AddUserModal,
    AddUserModal__Form,
    AddUserModal__Form__SelectContainer,
};
