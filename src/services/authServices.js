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

// export const updateUser = async (firstName, lastName, avatar, gender, bio, dateOfBirth, websiteUrl, fbUrl, ytUrl, twUrl, igUrl) => {
//     try {
//         const formData = new FormData();
//         formData.append('first_name', firstName || '');
//         formData.append('last_name', lastName || '');
//         formData.append('bio', bio || '');

//         const formattedDate = dateOfBirth ? moment(dateOfBirth).format('YYYY-MM-DD') : '';
//         formData.append('date_of_birth', formattedDate);

//         const genderMap = { 'Nam': 1, 'Nữ': 2 };
//         formData.append('gender', genderMap[gender] || '');

//         // Xử lý URL hợp lệ
//         const validateUrl = (url) => {
//             if (!url) return ''; 
//             return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
//         };

//         formData.append('website_url', validateUrl(websiteUrl));
//         formData.append('facebook_url', validateUrl(fbUrl));
//         formData.append('youtube_url', validateUrl(ytUrl));
//         formData.append('twitter_url', validateUrl(twUrl));
//         formData.append('instagram_url', validateUrl(igUrl));

//         if (avatar && avatar instanceof File) {
//             formData.append('avatar', avatar);
//         }

//         for (let [key, value] of formData.entries()) {
//             console.log({key, value});
//         }

//         const res = await httpRequest.post('auth/me?_method=PATCH', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             }
//         });

//         return res;
//     } catch (err) {
//         if (err.response) {
//             console.log('>>> Update user FAILED:', err.response.data);
//         } else {
//             console.log('>>> Update user ERROR:', err.message);
//         }
//     }
// }

export const updateUser = async (firstName, lastName, avatar, bio) => {
    try {
        const formData = new FormData();
        formData.append('first_name', firstName || '');
        formData.append('last_name', lastName || '');
        formData.append('bio', bio || '');

        if (avatar && avatar instanceof File) {
            formData.append('avatar', avatar);
        }
        
        // for (let [key, value] of formData.entries()) {
        //     console.log({key, value});
        // }

        const res = await httpRequest.post('auth/me?_method=PATCH', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return res;
    } catch (err) {
        if (err.response) {
            console.log('>>> Update user FAILED:', err.response.data);
        } else {
            console.log('>>> Update user ERROR:', err.message);
        }
    }
}

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
