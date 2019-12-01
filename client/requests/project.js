import Cookies from 'js-cookie';

const HOSTNAME = 'localhost:5000';
const PROTOCOL = 'http://';
const getToken = () => Cookies.get('access_token');

export async function create({ title, description }) {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/projects`, {
            method: 'POST',
            headers: {
                authorization: getToken(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
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

export async function getAll() {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/projects`, {
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

export async function get(projectId) {
    try {
        const response = await fetch(
            `${PROTOCOL}${HOSTNAME}/projects/${projectId}`,
            {
                method: 'GET',
                headers: {
                    authorization: getToken(),
                },
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

export async function update({ title, description, owner, projectId }) {
    try {
        const response = await fetch(
            `${PROTOCOL}${HOSTNAME}/projects/${projectId}`,
            {
                method: 'PATCH',
                headers: {
                    authorization: getToken(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, owner }),
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

export async function remove(projectId) {
    try {
        const response = await fetch(
            `${PROTOCOL}${HOSTNAME}/projects/${projectId}`,
            {
                method: 'DELETE',
                headers: {
                    authorization: getToken(),
                },
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

export async function addMember({ projectId, userId }) {
    try {
        const response = await fetch(
            `${PROTOCOL}${HOSTNAME}/projects/${projectId}/members`,
            {
                method: 'POST',
                headers: {
                    authorization: getToken(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId }),
            }
        );

        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            return { error: response.message };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}

export async function removeMember({ projectId, userId }) {
    try {
        const response = await fetch(
            `${PROTOCOL}${HOSTNAME}/projects/${projectId}/members`,
            {
                method: 'DELETE',
                headers: {
                    authorization: getToken(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId }),
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