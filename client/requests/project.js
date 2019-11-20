import * as Cookie from '../utils/cookie';

const HOSTNAME = 'localhost:5000';
const PROTOCOL = 'http://';
const TOKEN = Cookie.get('access_token');

export async function create({ title, description }) {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/projects`, {
            method: 'POST',
            headers: {
                authorization: TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
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

export async function getAll() {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/projects`, {
            method: 'GET',
            headers: {
                authorization: TOKEN,
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();
        if(response.ok){
            return json;
        } else {
            return {error: json};
        }
    } catch (error) {
        console.log(error);
        return { error };
    }
}
