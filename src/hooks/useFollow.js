import { useState, useEffect } from 'react';
import * as followServices from '~/services/followServices';

function useFollow(initialIsFollowed, initialFollowCount, userId) {
    const [isFollowed, setIsFollowed] = useState(initialIsFollowed);
    const [followCount, setFollowCount] = useState(initialFollowCount);

    useEffect(() => {
        setIsFollowed(initialIsFollowed);
        setFollowCount(initialFollowCount);
    }, [initialIsFollowed, initialFollowCount]);

    const toggleFollow = async () => {
        try {
            if(isFollowed) {
                await followServices.unFollowUser(userId);
                setFollowCount(prev => prev - 1);
            } else {
                await followServices.followUser(userId);
                setFollowCount(prev => prev + 1);
            }
            setIsFollowed(!isFollowed);
        } catch (err) {
            console.error("Error toggle Follow: ", err);
        }
    }

    return { isFollowed, followCount, toggleFollow };
}

export default useFollow;