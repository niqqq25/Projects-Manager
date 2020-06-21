import React, { useState } from 'react';
import { Modal, SearchBar } from '../../../global';
import { searchBar, modalInner, modalOuter } from './styles/MemberAddModal';
import UsersList from './UsersList';

import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../redux/private/actions/activeModals';
import MODALS from '../../../../redux/private/constants/modals';

function MemberAddModal() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    return (
        <Modal
            onClose={() => dispatch(closeModal(MODALS.MEMBER_ADD))}
            title="Add member"
            _cssOuter={modalOuter}
            _cssInner={modalInner}
        >
            <SearchBar value={search} onChange={setSearch} _css={searchBar} />
            <UsersList search={search} />
        </Modal>
    );
}

export default MemberAddModal;
