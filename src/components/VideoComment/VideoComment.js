import classNames from 'classnames/bind';

import { useVideoIntersection } from '~/hooks';
import { useVideo } from '~/contexts/VideoContext';
import styles from './VideoComment.module.scss';
import {
    OnSoundIcon,
    MutedIcon,
    StaticPauseIcon
} from '~/components/Icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function VideoComment({ videoData, index, playingIndex, onPlaying, children }) {
    const { volume, isMute, handleChangeVolume, toggleMute } = useVideo();
    const { videoRef } = useVideoIntersection(index, playingIndex, onPlaying);

    const [showIconPause, setShowIconPause] = useState(false);
    const handleToggleButton = () => {
        setShowIconPause(!showIconPause);
    }

    useEffect(() => {
        const video = videoRef.current;

        const handleLoadedMetadata = () => {
            setShowIconPause(video.paused);
        };

        if (video) {
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            video.addEventListener('pause', () => setShowIconPause(true));
            video.addEventListener('play', () => setShowIconPause(false));
        }

        return () => {
            if (video) {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                video.removeEventListener('pause', () => setShowIconPause(true));
                video.removeEventListener('play', () => setShowIconPause(false));
            }
        };
    }, [videoRef]);
    
    const [progress, setProgress] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [minute, setMinute] = useState(0);
    const [seconds, setSeconds] = useState(0);

    // Tổng thời gian
    useEffect(() => {
        if(videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                const duration = videoRef.current.duration;
                setTotalMinutes(Math.floor(duration / 60));
                setTotalSeconds(Math.floor(duration % 60));
;            }
        }
    }, [videoRef]);

    const handleTimeUpdate = () => {
        if(videoRef.current) {
            const duration = videoRef.current.duration;
            const currentTime = videoRef.current.currentTime;
            const newProgress = (currentTime / duration) * 100;
            setProgress(newProgress);
            setMinute(Math.floor(currentTime / 60));
            setSeconds(Math.floor(currentTime % 60));
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;

            video.addEventListener('timeupdate', handleTimeUpdate)

            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef]);

    const handleSeek = (e) => {
        if(videoRef.current) {
            const seekValue = e.target.value;
            const duration = videoRef.current.duration;
            const newTime = (seekValue / 100) * duration;
            videoRef.current.currentTime = newTime;
            setProgress(seekValue);
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.isMuted = isMute;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volume, isMute])

    const handlePlayPause = () => {
        if(videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const handleClickVideo = () => {
        handleToggleButton();
        handlePlayPause();
    };

    const sliderBackgroundSound = {
        background: `linear-gradient(to right, #fff ${
            volume * 100
        }%, rgba(255, 255, 255, 0.34) ${volume * 100}%)`,
    };

    const sliderBackgroundProgress = {
        background: `linear-gradient(to right, #fff ${
            progress
        }%, rgba(255, 255, 255, 0.34) ${progress}%)`,
    };
    
    return (
        <div className={cx('wrapper')}>
            {children}
            <div
                className={cx('video-overlay')}
                style={{ backgroundImage: `url(${videoData?.thumb_url})` }}
            ></div>
            <div className={cx('video-container')}>
                <video
                    onClick={handleClickVideo}
                    ref={videoRef}
                    className={cx('video-url')}
                    src={videoData?.file_url}
                    loop
                    autoPlay
                ></video>
                {showIconPause && <StaticPauseIcon className={cx('pause-icon')} width='5.6rem' height='5.6rem' />}
                <div className={cx('progress')}>
                    <div className={cx('progress-bar')}>
                        <div className={cx('progress-container')}>
                            <input
                                type="range"
                                className={cx('progress-range')}
                                min="0"
                                max="100"
                                value={progress}
                                step="1"
                                style={sliderBackgroundProgress}
                                onChange={handleSeek}
                            />
                        </div>
                        <div className={cx('progress-time')}>{`${minute < 10 ? `0${minute}` : minute}:${seconds < 10 ? `0${seconds}` : seconds}/${totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes}:${totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds}`}</div>
                    </div>
                </div>
                <div className={cx('sound')}>
                    {isMute ? (
                        <MutedIcon
                            onClick={toggleMute}
                            className={cx('sound-icon')}
                        />
                    ) : (
                        <OnSoundIcon
                            onClick={toggleMute}
                            className={cx('sound-icon')}
                        />
                    )}
                    <div className={cx('sound-wrapper')}>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume * 100}
                            onChange={handleChangeVolume}
                            className={cx('sound-slider')}
                            style={sliderBackgroundSound}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoComment;
