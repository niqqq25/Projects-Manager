import React, { useState } from 'react';
import Modal from '../../../global/Modal';
import { ModalContent, ModalTitle } from './styled/MemberAddModal';
import SearchBar from './SearchBar';
import UsersList from './UsersList';

import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../redux/private/actions/activeModals';
import MODALS from '../../../../redux/private/constants/modals';

function MemberAddModal() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    return (
        <Modal onClose={() => dispatch(closeModal(MODALS.MEMBER_ADD))}>
            <ModalContent>
                <ModalTitle>Add member</ModalTitle>
                <SearchBar value={search} onChange={setSearch} />
                <UsersList search={search} />
            </ModalContent>
        </Modal>
    );
}

export default MemberAddModal;
