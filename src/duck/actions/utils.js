export const URL = 'https://jsonplaceholder.typicode.com';

export const setAuthHeader = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
}

export const Options = (method, url, data) => ({
    method,
    headers: setAuthHeader,
    url,
    data,
})