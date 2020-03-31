import React from 'react';
import {
    NotFound,
    Title,
    Description,
    ButtonContainer,
} from './styles/NotFound';
import { Button } from '../../global';
import ROUTES from '../../../constants/routes';

const _NotFound = ({ history }) => (
    <NotFound>
        <Title>404</Title>
        <Description>OOPS, SORRY WE CANT FIND THAT PAGE!</Description>
        <ButtonContainer>
            <Button
                value="Home page"
                onClick={() => history.push(ROUTES.HOME)}
            />
        </ButtonContainer>
    </NotFound>
);

export default _NotFound;
