import * as httpRequest from '~/utils/httpRequest';

export const login = async (email, password) => {
    try {
        const res = await httpRequest.post(
            'auth/login',
            {
                email: email,
                password: password,
            },
            {},
        );
        return res;
    } catch (err) {
        console.log('Login error: ', err);
        console.log('Status code: ', err.res.status);
    }
};

export const logout = async (token) => {
    try {
        const res = await httpRequest.post(
            'auth/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        return res;
    } catch (err) {
        console.log('Logout error: ', err);
        console.log('Status code: ', err.res.status);
    }
};

export const register = async (email, password) => {
    try {
        const res = httpRequest.post(
            'auth/register',
            {
                type: "email",
                email: email,
                password: password,
            },
            {},
        );
        return res;
    } catch (err) {
        console.log('Logout error: ', err);
        console.log('Status code: ', err.res.status);
    }
};
