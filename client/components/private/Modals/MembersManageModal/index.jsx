import React, { useState } from 'react';
import { Modal, SearchBar } from '../../../global';
import { searchBar, modalOuter, modalInner } from './styles/MembersManageModal';
import MembersList from './MembersList';

import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../redux/private/actions/activeModals';
import MODALS from '../../../../redux/private/constants/modals';

function MembersManageModal() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    return (
        <Modal
            onClose={() => dispatch(closeModal(MODALS.MEMBERS_MANAGE))}
            title="Manage Members"
            _cssInner={modalInner}
            _cssOuter={modalOuter}
        >
            <SearchBar _css={searchBar} value={search} onChange={setSearch} />
            <MembersList filter={search} />
        </Modal>
    );
}

export default MembersManageModal;
