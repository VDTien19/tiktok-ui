import * as httpRequest from '~/utils/httpRequest';

export const likeVideo = async (videoId) => {
    try {
        await httpRequest.post(`videos/${videoId}/like`);
    } catch (err) {
        console.error(err);
        console.log("Failed to like video id: " + videoId);
    }
}

export const unlikeVideo = async (videoId) => {
    try {
        await httpRequest.post(`videos/${videoId}/unlike`);
    } catch (err) {
        console.error(err);
        console.log("Failed to unlike video id: " + videoId);
    }
}

export const likeComment = async (commentId) => {
    try {
        await httpRequest.post(`comments/${commentId}/like`)
    } catch (err) {
        console.error(err);
        console.log("Failed to like comment id: " + commentId);
    }
}

export const unlikeComment = async (commentId) => {
    try {
        await httpRequest.post(`comments/${commentId}/unlike`)
    } catch (err) {
        console.error(err);
        console.log("Failed to unlike comment id: " + commentId);
    }
}