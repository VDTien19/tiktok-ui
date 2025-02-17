import * as httpRequest from '~/utils/httpRequest';

export const getSuggested = async ({ page, perPage }) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAnUser = async(nickname) => {
    try {
        const res = await httpRequest.get(`users/${nickname}`);
        return res.data;
    } catch (error) {
        console.log("Failed to get user" + error);
    }
}