import styled from 'styled-components';
import {
    linearBackgroundBorder,
    greyRoundButton,
} from '../../../global/styles/button';
import { dropdownItem } from '../../../global/styles/dropdown';

const ProjectSettingsButton = styled.button`
    ${greyRoundButton}
    &:focus {
        outline: none;
    }
    &:focus:before {
        ${linearBackgroundBorder}
    }
`;

const DropdownItem = styled.a`
    ${dropdownItem}
    color: ${({ danger }) => (danger ? 'red' : 'default')};
`;

export { ProjectSettingsButton, DropdownItem };
