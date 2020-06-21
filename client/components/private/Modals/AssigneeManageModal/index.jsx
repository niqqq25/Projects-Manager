import React, { useState, useEffect } from 'react';
import { Modal, SearchBar } from '../../../global';
import {
    searchBar,
    modalOuter,
    modalInner,
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
        <Modal
            onClose={() => dispatch(closeModal(MODALS.ASSIGNEE_MANAGE))}
            title="Manage Assignee"
            _cssOuter={modalOuter}
            _cssInner={modalInner}
        >
            <SearchBar _css={searchBar} value={search} onChange={setSearch} />
            <MembersList filter={search} />
        </Modal>
    );
}

export default MembersManageModal;
