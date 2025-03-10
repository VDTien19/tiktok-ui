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

export const uploadVideo = async (formData) => {
    try {
        const res = await httpRequest.post('videos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        // console.log("Upload video successfully", res);
        return res;
    } catch (err) {
        console.log('>>> Upload video error: ', err.response ? err.response.data : err.message);
    }
}

export const deletedVideo = async (idVideo) => {
    try {
        const res = await httpRequest.deleted(`videos/${idVideo}`);
        console.log("Delete video successfully");
        return res;
    } catch (err) {
        console.log('>>> Delete video error: ', err);
    }
}

export const updateVideo = async (idVideo, formData) => {
    try {
        const res = await httpRequest.post(`videos/${idVideo}?_method=PATCH`, formData, {
            header: {
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log("Update video successfully");
        return res;
    } catch (err) {
        console.log('>>> Update video error: ', err);
    }
}