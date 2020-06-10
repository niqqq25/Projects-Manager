import React, { useState } from 'react';
import Modal from '../../../global/Modal';
import { ModalContent, ModalTitle } from './styled/MembersManageModal';
import SearchBar from './SearchBar';
import MembersList from './MembersList';

import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../redux/private/actions/activeModals';
import MODALS from '../../../../redux/private/constants/modals';

function MembersManageModal() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    return (
        <Modal onClose={() => dispatch(closeModal(MODALS.MEMBERS_MANAGE))}>
            <ModalContent>
                <ModalTitle>Manage Members</ModalTitle>
                <SearchBar value={search} onChange={setSearch} />
                <MembersList filter={search} />
            </ModalContent>
        </Modal>
    );
}

export default MembersManageModal;
