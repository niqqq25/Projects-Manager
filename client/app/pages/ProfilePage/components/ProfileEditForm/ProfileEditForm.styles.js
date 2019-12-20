import styled from 'styled-components';

const ProfileEditForm = styled.div`
    width: ${props => (props.isMobile ? '100%' : '400px')};
    padding: 10px 0;
    margin: 0 auto;
`;

const ProfileEditForm__InputContainer = styled.div`
    margin-bottom: 20px;
`;

export default { ProfileEditForm, ProfileEditForm__InputContainer };
