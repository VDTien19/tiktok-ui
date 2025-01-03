import { useState } from 'react';

import * as likeServices from '~/services/likeServices';

const useLike = (initialIsLiked, initialLikeCount, videoId) => {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    const toggleLike = async () => {
        try {
            if(isLiked) {
                await likeServices.unlikeVideo(videoId);
                setLikeCount(prev => prev - 1);
            } else {
                await likeServices.likeVideo(videoId);
                setLikeCount(prev => prev + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    }

    return { isLiked, likeCount, toggleLike };
}

export default useLike;