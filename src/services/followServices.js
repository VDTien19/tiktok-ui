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

export const followUser = async (idUser) => {
    try {
        const respone = await httpRequest.post(`users/${idUser}/follow`, {});
        return respone;
    } catch (err) {
        console.log("Failed to follow user: ", err);
        throw err;
    }
}

export const unFollowUser = async (idUser) => {
    try {
        const respone = await httpRequest.post(`users/${idUser}/unfollow`, {});
        return respone;
    } catch (err) {
        console.log("Failed to unfollow user: ", err);
        throw err;
    }
}