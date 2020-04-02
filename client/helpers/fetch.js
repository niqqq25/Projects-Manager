async function _fetch(url, options) {
    const { method = 'GET', body } = options || {};

    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
    }).then(res => res.json());

    if (res.status !== 'error') {
        return res;
    } else {
        throw res;
    }
}

export default _fetch;
