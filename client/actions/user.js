import ROUTES from '../../shared/routes';

async function loginUser({ username, password }) {
    const res = await fetch(`${ROUTES.USER.ROOT}${ROUTES.USER.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    return await res.json();
}

async function createUser({ fullName, username, email, password }) {
    const res = await fetch(`${ROUTES.USER.ROOT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, password, email }),
    });

    return await res.json();
}

export { loginUser, createUser };
