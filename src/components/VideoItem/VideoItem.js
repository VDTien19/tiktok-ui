import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState, memo } from 'react';

import { useVideoIntersection } from '~/hooks';
import styles from './VideoItem.module.scss';
import {
    OnSoundIcon,
    MutedIcon,
    ThreeDotIcon,
    MusicNoteIcon,
    AddIcon,
    HeartIcon,
    HeartIconActive,
    FavoriteIcon,
    ShareIcon,
    PlayIcon,
    PauseIcon,
} from '~/components/Icons';
import { useVideo } from '~/contexts/VideoContext';
import { Link } from 'react-router-dom';
import Image from '~/components/Images';
import images from '~/assets/images';
import { useLike } from '~/hooks';

const cx = classNames.bind(styles);

function VideoItem({ data, index, onPlaying, playingIndex }) {
    const { volume, isMute, handleChangeVolume, toggleMute } = useVideo();

    const { isLiked, likeCount, toggleLike } = useLike(
        data.is_liked,
        data.likes_count,
        data.id,
    );

    const [isExpanded, setIsExpanded] = useState(false);
    const [effectPlayPause, setEffectPlayPause] = useState(null);
    const [progress, setProgress] = useState(0);

    const { videoRef } = useVideoIntersection(index, playingIndex, onPlaying);

    const handleTimeUpdate = () => {
        if(videoRef.current) {
            const duration = videoRef.current.duration;
            const currentTime = videoRef.current.currentTime;
            setProgress(currentTime / duration * 100);
        }
    }

    const handleSeek = (e) => {
        if(videoRef.current) {
            const rect = e.target.getBoundingClientRect();  // Kích thước thanh chạy
            const offsetX = e.clientX - rect.left;   // vị trí click
            const width = rect.width;
            const seekTime = (offsetX / width) * videoRef.current.duration;
            videoRef.current.currentTime = seekTime;
            setProgress(seekTime / videoRef.current.duration * 100);
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

                    <div className={cx('progress-bar')} onClick={handleSeek} >
                        <div
                            className={cx('progress')}
                            style={{ width: `${progress}%` }}
                        ></div>
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
                <section className={cx('action-bar')}>
                    <div className={cx('follow-action')}>
                        <Link to={`/@${data.user.nickname}`}>
                            <Image
                                src={data.user.avatar}
                                alt={data.user.nickname}
                                className={cx('avatar-img')}
                            />
                        </Link>
                        <button className={cx('follow-btn')}>
                            <AddIcon className={cx('add-icon')} />
                        </button>
                    </div>
                    <button onClick={toggleLike} className={cx('like-action')}>
                        <div className={cx('like-icon')}>
                            {isLiked ? (
                                <HeartIconActive
                                    className={cx('like-icon-active')}
                                />
                            ) : (
                                <HeartIcon />
                            )}
                        </div>
                        <span className={cx('like-count')}>{likeCount}</span>
                    </button>
                    <button className={cx('comment-action')}>
                        <div className={cx('comment-icon')}>
                            <Image
                                src={images.commentIcon}
                                className={cx('comment-img')}
                            />
                        </div>
                        <span className={cx('comment-count')}>
                            {data.comments_count}
                        </span>
                    </button>
                    <button className={cx('favorite-action')}>
                        <div className={cx('favorite-icon')}>
                            <FavoriteIcon />
                        </div>
                        <span className={cx('favorite-count')}>0</span>
                    </button>
                    <button className={cx('share-action')}>
                        <div className={cx('share-icon')}>
                            <ShareIcon />
                        </div>
                        <span className={cx('share-count')}>
                            {data.shares_count}
                        </span>
                    </button>
                </section>
            </div>
        </article>
    );
}

// VideoItem.propTypes = {
//     src: PropTypes.string.isRequired, // Đường dẫn video
//     username: PropTypes.string.isRequired, // Tên người dùng
//     description: PropTypes.string, // Mô tả video
//     music: PropTypes.string, // Nhạc nền
// };

export default memo(VideoItem);
