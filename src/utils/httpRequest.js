import axios from 'axios';

// console.log(process.env);

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const respone = await httpRequest.get(path, options);
    return respone.data;
};

export const post = async (path, body = {}, options = {}) => {
    const respone = await httpRequest.post(path, body, options)
    return respone.data
}

export const deleted = async (path, body = {}, options = {}) => {
    const respone = await httpRequest.delete(path, body, options)
    return respone.data
}

export default httpRequest;
