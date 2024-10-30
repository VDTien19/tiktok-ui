import * as httpRequest from '~/utils/httpRequest';

export const getFollowing = async ({ page, perPage }) => {
    try {
        const res = await httpRequest.get('me/followings', {
            params: {
                page: page,
                per_page: perPage
            }
        })
        return res.data
    } catch (err) {
        console.log("Failed to get following: ", err);
        throw err;
    }
}