import React, { useEffect } from 'react';
import { NotFound, Title, Description, ButtonWrapper } from './styles/NotFound';
import { Button } from '../../global';
import ROUTES from '../../../constants/routes';

function _NotFound({ history }) {
    return (
        <NotFound>
            <Title>404</Title>
            <Description>OOPS, SORRY WE CANT FIND THAT PAGE!</Description>
            <ButtonWrapper>
                <Button
                    value="Home page"
                    onClick={() => history.push(ROUTES.HOME)}
                />
            </ButtonWrapper>
        </NotFound>
    );
}

export default _NotFound;
