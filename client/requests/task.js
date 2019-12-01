import Cookies from 'js-cookie';

const HOSTNAME = 'localhost:5000';
const PROTOCOL = 'http://';
const getToken = () => Cookies.get('access_token');

export async function create({ project, parentTask, task }) {
    const URL = parentTask
        ? `${PROTOCOL}${HOSTNAME}/tasks/${parentTask}`
        : `${PROTOCOL}${HOSTNAME}/projects/${project}/tasks`;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                authorization: getToken(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
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

export async function get(taskId) {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/tasks/${taskId}`, {
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

export async function update(taskId, updates) {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                authorization: getToken(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
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

export async function remove(taskId) {
    try {
        const response = await fetch(`${PROTOCOL}${HOSTNAME}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                authorization: getToken(),
            },
        });

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

export async function addAssignee(taskId, assignee) {
    try {
        const response = await fetch(
            `${PROTOCOL}${HOSTNAME}/tasks/${taskId}/assignee`,
            {
                method: 'POST',
                headers: {
                    authorization: getToken(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: assignee }),
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

export async function removeAssigne(taskId) {
    try {
        const response = await fetch(
            `${PROTOCOL}${HOSTNAME}/tasks/${taskId}/assignee`,
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
