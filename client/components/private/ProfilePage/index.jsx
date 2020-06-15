import React, { useEffect } from 'react';

import UserEditForm from './UserEditForm';
import UserInfoCard from './UserInfoCard';
import { ProfilePage } from './styles/ProfilePage';

import { useDispatch, useSelector } from 'react-redux';
import { setProfilePageActive } from '../../../redux/private/actions/navbar';

function _ProfilePage() {
    const dispatch = useDispatch();
    const currentUser = useSelector(({ currentUser }) => currentUser);

    useEffect(() => {
        dispatch(setProfilePageActive());
    }, []);

    const { avatarUrl, fullName, projects } = currentUser;

    return (
        <>
            <ProfilePage>
                <UserInfoCard
                    avatarUrl={avatarUrl}
                    fullName={fullName}
                    projects={projects}
                />
                <UserEditForm />
            </ProfilePage>
        </>
    );
}

export default _ProfilePage;
