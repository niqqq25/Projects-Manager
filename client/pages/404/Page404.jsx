import React from 'react';
import './page404.css';

import Button from '../../sharedComponents/Button/Button';

export default function Page404(props) {
    function redirectToHomePage() {
        props.history.push('/home');
    }

    return (
        <div id="page404">
            <h1>404</h1>
            <p>OOPS, SORRY WE CANT FIND THAT PAGE!</p>
            <Button value="Home page" onClick={redirectToHomePage} />
        </div>
    );
}
