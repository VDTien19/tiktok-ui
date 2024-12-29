import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';

import ActionBar from '~/components/ActionBar'
import { useVideoIntersection } from '~/hooks';
import styles from './VideoItem.module.scss';
import {
    OnSoundIcon,
    MutedIcon,
    ThreeDotIcon,
    MusicNoteIcon,
    PlayIcon,
    PauseIcon,
} from '~/components/Icons';
import { useVideo } from '~/contexts/VideoContext';

const cx = classNames.bind(styles);

function VideoItem({ data, index, onPlaying, playingIndex }) {
    const { volume, isMute, handleChangeVolume, toggleMute } = useVideo();

    const [isExpanded, setIsExpanded] = useState(false);
    const [effectPlayPause, setEffectPlayPause] = useState(null);

    // Thanh tiến trình
    const [progress, setProgress] = useState(0);

    const { videoRef } = useVideoIntersection(index, playingIndex, onPlaying);

    const handleTimeUpdate = () => {
        if(videoRef.current) {
            const duration = videoRef.current.duration;
            const currentTime = videoRef.current.currentTime;
            const newProgress = (currentTime / duration) * 100;
            setProgress(newProgress);
        }
    }

    const handleSeek = (e) => {
        if(videoRef.current) {
            const seekValue = e.target.value;
            const newTime = (seekValue / 100) * videoRef.current.duration;
            videoRef.current.currentTime = newTime;
            setProgress(seekValue)
        }
    }

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener('timeupdate', handleTimeUpdate);
        }

        // Cleanup khi component unmount
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef])

    // Cập nhật âm lượng và trạng thái tắt tiếng cho video
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.muted = isMute;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volume, isMute]);

    // Xử lý phát/tạm dừng video khi nhấn vào video
    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            triggerIconAnimation('play');
        } else {
            // setIsPlaying(false);
            videoRef.current.pause();
            triggerIconAnimation('pause');
        }
    };

    // Kích hoạt icon phát/dừng
    const triggerIconAnimation = (type) => {
        setEffectPlayPause(type);
        setTimeout(() => {
            setEffectPlayPause(null);
        }, 500);
    };

    // Xử lý ẩn hiện desc
    const handleToggleButton = () => {
        setIsExpanded((prev) => !prev);
    };

    // CSS động cho âm lượng
    const sliderBackgroundSound = {
        background: `linear-gradient(to right, #fff ${
            volume * 100
        }%, rgba(255, 255, 255, 0.34) ${volume * 100}%)`,
    };

    return (
        <article className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <section className={cx('video-item')}>
                    <div className={cx('header')}>
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
                        <ThreeDotIcon className={cx('three-dot-icon')} />
                    </div>

                    <video
                        onClick={handlePlayPause}
                        ref={videoRef}
                        src={data.file_url}
                        className={cx('video-url')}
                        loop
                        muted
                    ></video>

                    <div className={cx('progress-bar')}>
                        <input 
                            type="range" 
                            className={cx('progress')}
                            min="0"
                            max="100"
                            value={progress}
                            step="0.1"
                            style={{
                                background: `linear-gradient(to right, #fe2c55 ${progress}%, rgba(207, 207, 207, 0.7) ${progress}%)`,
                            }}
                            onChange={handleSeek}
                        />
                    </div>

                    {effectPlayPause && (
                        <div
                            className={cx('icon-play-pause', {
                                show: effectPlayPause === 'play',
                                hide: effectPlayPause === 'pause',
                            })}
                        >
                            {effectPlayPause === 'play' ? (
                                <PlayIcon />
                            ) : (
                                <PauseIcon />
                            )}
                        </div>
                    )}

                    {/* Footer hiển thị thông tin */}
                    <div
                        className={cx('footer', {
                            'footer-expanded': isExpanded,
                        })}
                    >
                        <div className={cx('name-date')}>
                            <span className={cx('name')}>
                                {data.user.nickname}
                            </span>
                            <span className={cx('dot-seperate')}> · </span>
                            <span className={cx('date')}>
                                {' '}
                                {data.published_at.split(' ')[0]}
                            </span>
                        </div>
                        <div className={cx('desc-wrapper')}>
                            <div
                                className={cx('description', {
                                    expanded: isExpanded,
                                    collapsed: !isExpanded,
                                })}
                            >
                                {data.description}
                                <span className={cx('hastag')}>
                                    <strong> #xuhuong</strong>
                                </span>
                            </div>
                            {data.description.length > 50 && (
                                <button
                                    onClick={handleToggleButton}
                                    className={cx('toggle-button')}
                                >
                                    {isExpanded ? 'ẩn bớt' : 'thêm'}
                                </button>
                            )}
                        </div>
                        {data.music.length >= 0 && (
                            <Link to="/" className={cx('music')}>
                                <p className={cx('music-name')}>
                                    <MusicNoteIcon
                                        className={cx('music-icon')}
                                    />
                                    nhạc nền{' '}
                                    {`${
                                        data.music.length > 0
                                            ? data.music
                                            : data.user.nickname
                                    }`}
                                </p>
                                {/* <Image src="" className={cx('thumb-avatar')} /> */}
                            </Link>
                        )}
                    </div>
                </section>

                {/* Action bar */}
                <ActionBar data={data} followAction={true} />
                
            </div>
        </article>
    );
}

VideoItem.propTypes = {
    data: PropTypes.node.isRequired,
    index: PropTypes.number,
    onPlaying: PropTypes.func,
    playingIndex: PropTypes.number
};

export default memo(VideoItem);
