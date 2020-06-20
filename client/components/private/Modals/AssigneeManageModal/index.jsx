import React, { useState, useEffect } from 'react';
import { Modal, SearchBar } from '../../../global';
import {
    ModalContent,
    ModalTitle,
    searchBar,
} from './styles/AssigneeManageModal';
import MembersList from './MembersList';

import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../redux/private/actions/activeModals';
import { clearAssigneeManageModal } from '../../../../redux/private/actions/assigneeManageModal';
import MODALS from '../../../../redux/private/constants/modals';

function MembersManageModal() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        return () => dispatch(clearAssigneeManageModal());
    }, []);

    return (
        <Modal onClose={() => dispatch(closeModal(MODALS.ASSIGNEE_MANAGE))}>
            <ModalContent>
                <ModalTitle>Manage Members</ModalTitle>
                <SearchBar
                    _css={searchBar}
                    value={search}
                    onChange={setSearch}
                />
                <MembersList filter={search} />
            </ModalContent>
        </Modal>
    );
}

export default MembersManageModal;
