import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState, memo } from 'react';

import { useVideoIntersection } from '~/hooks'
import styles from './VideoItem.module.scss';
import {
    OnSoundIcon,
    MutedIcon,
    ThreeDotIcon,
    MusicNoteIcon,
    AddIcon,
    HeartIcon,
    FavoriteIcon,
    ShareIcon,
    PlayIcon,
    PauseIcon
} from '~/components/Icons';
import { useVideo } from '~/contexts/VideoContext';
import { Link } from 'react-router-dom';
import Image from '~/components/Images';
import images from '~/assets/images'

const cx = classNames.bind(styles);

function VideoItem({ data, index, onPlaying, playingIndex }) {
    const { volume, isMute, handleChangeVolume, toggleMute } =
        useVideo();
        
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showIcon, setShowIcon] = useState(null);

    // const videoRef = useRef(null);

    const { videoRef } = useVideoIntersection(index, playingIndex, onPlaying);

    console.log("isPlaying: " + isPlaying);

    // Cập nhật âm lượng và trạng thái tắt tiếng cho video mỗi khi thay đổi
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
            // handlePlay(videoRef.current); // Gọi handlePlay để tạm dừng các video khác
            setIsPlaying(true);
            videoRef.current.play(); // Phát video hiện tại
            triggerIconAnimation('play');
        } else {
            setIsPlaying(false);
            videoRef.current.pause();
            triggerIconAnimation('pause');
        }
    };

    // Trigger icon animation temporarily
    const triggerIconAnimation = (type) => {
        setShowIcon(type); // Show "play" or "pause" icon
        setTimeout(() => {
            setShowIcon(null); // Hide icon after animation
        }, 500); // Duration matches the animation
    };

    // Xử lý ẩn hiện desc
    const handleToggleButton = () => {
        setIsExpanded((prev) => !prev)
    };

    // Cập nhật CSS động cho thanh trượt
    const sliderBackground = {
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
                                    style={sliderBackground}
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

                    {showIcon && (
                        <div
                            className={cx('icon-play-pause', {
                                show: showIcon === 'play',
                                hide: showIcon === 'pause',
                            })}
                        >
                            {showIcon === 'play' ? <PlayIcon /> : <PauseIcon />}
                        </div>
                    )}
    
                    {/* Footer hiển thị thông tin */}
                    <div className={cx('footer', {
                        'footer-expanded': isExpanded
                    })}>
                        <div className={cx('name-date')}>
                            <span className={cx('name')}>{data.user.nickname}</span>
                            <span className={cx('dot-seperate')}> · </span>
                            <span className={cx('date')}> {data.published_at.split(' ')[0]}</span>
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
                                    <strong> #tiennemix #xuhuong</strong>
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
                                    <MusicNoteIcon className={cx('music-icon')} />
                                    nhạc nền {`${data.music.length > 0 ? data.music : data.user.nickname}`}
                                </p>
                                {/* <Image src="" className={cx('thumb-avatar')} /> */}
                            </Link>
                        )}
                    </div>
                </section>
    
                {/* Action bar */}
                <section className={cx('action-bar')}>
                    <div className={cx('follow-action')}>
                        <Link to="/">
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
                    <button className={cx('like-action')}>
                        <div className={cx('like-icon')}>
                            <HeartIcon />
                        </div>
                        <span className={cx('like-count')}>{data.likes_count}</span>
                    </button>
                    <button className={cx('comment-action')}>
                        <div className={cx('comment-icon')}>
                            <Image src={images.commentIcon} className={cx('comment-img')} />
                        </div>
                        <span className={cx('comment-count')}>{data.comments_count}</span>
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
                        <span className={cx('share-count')}>{data.shares_count}</span>
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

