import * as Cookie from '../utils/cookie';

const HOSTNAME = 'localhost:5000';
const PROTOCOL = 'http://';
const TOKEN = Cookie.get('access_token');

export async function getMe() {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/users/me`, {
            method: 'GET',
            headers: {
                authorization: TOKEN,
            },
        });

        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            return { error: json };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}

export async function get({ username, password }) {
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
            return { error: json };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}

export async function create({
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
            return { error: json };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}
