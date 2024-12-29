import * as httpRequest from '~/utils/httpRequest';

export const getListVideo = async (type = 'for-you', page) => {
    try {
        const response = await httpRequest.get('videos', {
            params: {
                type,
                page,
            }
        });
        return response.data;
    } catch (err) {
        console.log('>>> Get list video error: ', err);
        throw err;
    }
};

export const getVideo = async (idVideo) => {
    try {
        const respone = await httpRequest.get(`videos/${idVideo}`, {})
        return respone;
    } catch (err) {
        console.log(`>>> Get video id ${idVideo} error: ` + err)
        throw err
    }
}

export const getUserVideo = async (idVideo) => {
    try {
        const respone = await httpRequest.get(`users/${idVideo}/videos`, {})
        return respone;
    } catch (err) {
        console.log(">>> Get user of video id ", idVideo, " false!")
        throw err;
    }
}
