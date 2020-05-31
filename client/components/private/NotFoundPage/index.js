import React from 'react';
import {
    NotFoundPage,
    Title,
    Description,
    ButtonWrapper,
} from './styled/NotFoundPage';
import { Button } from '../../global';
import ROUTES from '../../../constants/routes';

function _NotFoundPage({ history }) {
    return (
        <NotFoundPage>
            <Title>404</Title>
            <Description>OOPS, SORRY WE CANT FIND THAT PAGE!</Description>
            <ButtonWrapper>
                <Button
                    value="Projects page"
                    onClick={() => history.push(ROUTES.PROJECTS)}
                />
            </ButtonWrapper>
        </NotFoundPage>
    );
}

export default _NotFoundPage;
