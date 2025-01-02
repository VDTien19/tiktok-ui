import { useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

const useVideoIntersection = (index, playingIndex, onPlaying) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        const handleIntersection = debounce((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (typeof onPlaying === 'function') {
                        onPlaying(index);
                    }
                    if (playingIndex === index) {
                        video.play();
                    }
                } else {
                    video.pause();
                }
            });
        }, 500);

        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.6 });
        if (video) observer.observe(video);

        return () => observer.disconnect();
    }, [index, playingIndex, onPlaying]);

    return { videoRef };
};

export default useVideoIntersection;