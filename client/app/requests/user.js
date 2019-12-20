import Cookies from 'js-cookie';

const HOSTNAME = 'localhost:5000';
const PROTOCOL = 'http://';
const getToken = () => Cookies.get('access_token');

async function getMe() {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/users/me`, {
            method: 'GET',
            headers: {
                authorization: getToken(),
            },
        });

        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            return { error: json.message };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}

async function get({ username, password }) {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            return { error: json.message };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}

async function create({
    firstname,
    secondname,
    company,
    phone,
    email,
    username,
    password,
}) {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname,
                secondname,
                company,
                phone,
                email,
                username,
                password,
            }),
        });

        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            return { error: json.message };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}

async function update({ phone, firstname, secondname }) {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: getToken(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, firstname, secondname }),
        });

        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            return { error: json.message };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}

async function updatePassword(password) {
    try {
        const response = await fetch(
            `${PROTOCOL}${HOSTNAME}/users/me/password`,
            {
                method: 'PATCH',
                headers: {
                    authorization: getToken(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            }
        );

        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            return { error: json.message };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}

async function remove() {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/users/me`, {
            method: 'DELETE',
            headers: {
                authorization: getToken(),
            },
        });

        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            return { error: json.message };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}

async function getAll({ regex, projectId, isMember }) {
    let params = '';

    if (regex) {
        params += `regex=${regex}&`;
    }

    if (projectId) {
        params += `project=${projectId}&`;
    }

    params += `isMembers=${!!isMember}`;

    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/users?${params}`, {
            method: 'GET',
            headers: {
                authorization: getToken(),
            },
        });

        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            return { error: json.message };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}

export default { getMe, get, getAll, create, update, remove, updatePassword };
