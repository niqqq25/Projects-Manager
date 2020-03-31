import ROUTES from '../../shared/routes';
import FE_ROUTES from '../constants/routes';

async function loginUser({ username, password }) {
    const res = await fetch(`${ROUTES.USER.ROOT}${ROUTES.USER.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    return await res.json();
}

async function logoutMe() {
    await fetch(`${ROUTES.USER.ROOT}${ROUTES.USER.LOGOUT}`);
    window.location = FE_ROUTES.LOGIN;
}

async function createUser({ fullName, username, email, password }) {
    const res = await fetch(`${ROUTES.USER.ROOT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, password, email }),
    });

    return await res.json();
}

async function getMe() {
    const res = await fetch(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`);
    return await res.json();
}

async function updateMe({ fullName, password }) {
    const res = await fetch(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, password }),
    });

    return await res.json();
}

export { loginUser, createUser, getMe, updateMe, logoutMe };
