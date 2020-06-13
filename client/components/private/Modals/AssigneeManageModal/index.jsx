import React, { useState, useEffect } from 'react';
import Modal from '../../../global/Modal';
import { ModalContent, ModalTitle } from './styled/AssigneeManageModal';
import SearchBar from './SearchBar';
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
                <SearchBar value={search} onChange={setSearch} />
                <MembersList filter={search} />
            </ModalContent>
        </Modal>
    );
}

export default MembersManageModal;
