import React, {useState, useEffect} from 'react';
import './profilePage.css';

import ProfileEditForm from '../ProfileEditForm/ProfileEditForm';

import * as UserAPI from '../../../requests/user';

// import getMe from '../../../requests/getMe';
// import getCookie from '../../../utils/getCookie';

export default function ProfilePage(props){
    const [userData, setUserData] = useState(null);
    const [loginRedirect, setLoginRedirect] = useState(false);
    useEffect(() => {
        console.log('BOOM');
        // getUserData();
    }, []);

    // async function getUser() {
    //     const response = await UserAPI.getMe();

    //     if (response.error) {
    //         setLoginRedirect(true);
    //     } else {
    //         setUser(response);
    //     }
    // }

    async function getUserData(){
        // const token = getCookie('access-token');
        // const data = await getMe(token);

        if(data){
            setUserData(data);
        } else {

        }
    }

    return <div id="profile-page">
        {userData && <ProfileEditForm />}
        {loginRedirect && <Redirect to="/login"/>}
    </div>;
}