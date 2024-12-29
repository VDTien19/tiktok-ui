import * as httpRequest from '~/utils/httpRequest';

export const createComment = async (idVideo, commentContent) => {
    try {
        const respone = await httpRequest.post(`videos/${idVideo}/comments`, {
            comment: commentContent
        })
        return respone
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }  
}

export const getComment = async (idVideo) => {
    try {
        const respone = await httpRequest.get(`videos/${idVideo}/comments`, {});
        return respone;
    } catch (error) {
        console.error('Error getting comments:', error);
        throw error;
    }
}

export const deletedComment = async (idComment) => {
    try {
        const respone = await httpRequest.deleted(`comments/${idComment}`)
        return respone;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}

export const updateComment = async (idComment, commentContent) => {
    try {
        const respone = await httpRequest.patch(`comments/${idComment}`, {
            comment: commentContent
        })
        return respone;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
}