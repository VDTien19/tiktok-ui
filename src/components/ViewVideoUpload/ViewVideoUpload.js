import classNames from 'classnames/bind';
import { useState, useEffect, useRef, useCallback, memo } from 'react';

import {
    StaticPauseIcon,
} from '~/components/Icons';
import styles from './ViewVideoUpload.module.scss';

const cx = classNames.bind(styles);

function ViewVideoUpload({ videoUrl }) {
    const videoRef = useRef(null);
    
    const [showIconPause, setShowIconPause] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (video && videoUrl) {
            video.src = videoUrl;
            video.load();
        }
    }, [videoUrl]);

    const handlePlayPause = useCallback(() => {
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play();
            setShowIconPause(false);
        } else {
            videoRef.current.pause();
            setShowIconPause(true);
        }
    }, []);

    return (
        <div className={cx('video')}>
            <video
                autoPlay
                onClick={handlePlayPause}
                className={cx('video-url')}
                ref={videoRef}
                loop
            />
            {showIconPause && (
                <StaticPauseIcon
                    className={cx('pause-icon')}
                    width="3rem"
                    height="3rem"
                />
            )}
        </div>
    );
}

export default memo(ViewVideoUpload);