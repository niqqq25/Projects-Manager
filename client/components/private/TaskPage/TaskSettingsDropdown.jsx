import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { DropdownItem } from './styles/TaskSettingsDropdown';
import { GreyRoundButton } from '../../global/buttons';
import Dropdown from '../../global/Dropdown';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _TaskSettingsDropdown() {
    const dispatch = useDispatch();

    return (
        <Dropdown
            toggle={
                <GreyRoundButton>
                    <FiSettings size="20px" />
                </GreyRoundButton>
            }
            content={
                <>
                    <DropdownItem
                        onMouseDown={() =>
                            dispatch(openModal(MODALS.TASK_UPDATE))
                        }
                    >
                        Update Task
                    </DropdownItem>
                    <DropdownItem
                        danger
                        onMouseDown={() =>
                            dispatch(openModal(MODALS.TASK_DELETE_CON))
                        }
                    >
                        Delete Task
                    </DropdownItem>
                </>
            }
        />
    );
}

export default _TaskSettingsDropdown;
