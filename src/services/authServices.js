import * as httpRequest from '~/utils/httpRequest';

export const getCurrentUser = async (token) => {
    try {
        const respone = await httpRequest.get('auth/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return respone.data;
    } catch (err) {
        console.log('>>> Get current user FALSE: ', err);
        throw err;
    }
};

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

export const logout = async () => {
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
                type: 'email',
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
