import React from 'react';
import Styled from './404Page.styles';

import Button from '../../sharedComponents/Button';

export default function Page404(props) {
    function redirectToHomePage() {
        props.history.push('/home');
    }

    return (
        <Styled.Page404>
            <Styled.Page404__Title>404</Styled.Page404__Title>
            <Styled.Page404__Paragraph>
                OOPS, SORRY WE CANT FIND THAT PAGE!
            </Styled.Page404__Paragraph>
            <Button value="Home page" onClick={redirectToHomePage} />
        </Styled.Page404>
    );
}
