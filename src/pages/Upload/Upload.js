import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from "react-hot-toast";

import {
        ActionIcon,
        LiveIcon,
        MusicNoteIcon,
        SearchIcon,
    } from '~/components/Icons';
import { useAuth } from '~/contexts/AuthContext';
import ViewUpload from '~/components/ViewUpload';
import ViewVideoUpload from '~/components/ViewVideoUpload';
import styles from './Upload.module.scss';
import Image from '~/components/Images';
import images from '~/assets/images';
import Button from '~/components/Button';
import { uploadVideo } from '~/services/videoServices';

const cx = classNames.bind(styles);

function Upload() {
    const { userData } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'TikTok Studio';
    }, []);

    const [selectedFile, setSelectedFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [videoDuration, setVideoDuration] = useState(0);
    const [selectedTime, setSelectedTime] = useState(0);
    const [caption, setCaption] = useState('');
    // const [coverImage, setCoverImage] = useState(null);
    const [selectedFrame, setSelectedFrame] = useState(0);
    const [frames, setFrames] = useState([]);
    const [loadingFrame, setLoadingFrame] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const [allows, setAllows] = useState(['comment', 'duet', 'stitch']);
    const [viewable, setViewable] = useState('public');

    const handleSelectFile = (file) => {
        setSelectedFile(file);
        setVideoUrl(URL.createObjectURL(file));
    };

    useEffect(() => {
        if (selectedFile) {
            setCaption(selectedFile.name.slice(0, -4))
        }
    }, [selectedFile])

    const handleChangeVideo = () => {
        setSelectedFile(null);
        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
        };
    }, [videoUrl]);

    const handleChangeCaptions = (e) => {
        setCaption(e.target.value);
    };

    const toggleAllow = (option) => {
        setAllows((prev) => 
            prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        )
    }

    // Trích xuất 10 khung ảnh từ video
    const extractFrames = useCallback(async (videoUrl, duration) => {
        setFrames([]);
        setSelectedFrame(0);
        setLoadingFrame(true);
        
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = "anonymous";

        const frameCount = 10;
        const frameURLs = [];

        await new Promise((resolve) => {
            video.onloadedmetadata = () => resolve();
            video.load();
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = video.videoWidth / 4;
        canvas.height = video.videoHeight / 4;

        for (let i = 0; i < frameCount; i++) {
            const time = (duration / frameCount) * i;
            video.currentTime = time;

            await new Promise((resolve) => {
                video.onseeked = () => {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    frameURLs.push(canvas.toDataURL('image/png')); // Giữ định dạng PNG để không nén
                    resolve();
                };
            });
        }
        setLoadingFrame(false);
        setFrames(frameURLs);

    }, []);

    // Load video và trích xuất khung khi videoUrl thay đổi
    useEffect(() => {
        if (!videoUrl) return;

        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = "anonymous";

        video.onloadedmetadata = () => {
            setVideoDuration(video.duration);
            extractFrames(videoUrl, video.duration);
        };

        return () => {
            if (videoUrl) URL.revokeObjectURL(videoUrl);
        };
    }, [videoUrl, extractFrames]);

    // Xử lý click vào khung ảnh
    const handleFrameClick = (index) => {
        const frameCount = 10;
        const timeClicked = (videoDuration / frameCount) * index;
        setSelectedTime(timeClicked.toFixed(0));
        setSelectedFrame(index);

        // Tạo ảnh bìa từ khung được chọn
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = "anonymous";
        video.currentTime = timeClicked;

        video.onseeked = () => {
            const offscreenCanvas = document.createElement('canvas');
            const ctx = offscreenCanvas.getContext('2d');
            offscreenCanvas.width = video.videoWidth;
            offscreenCanvas.height = video.videoHeight;

            ctx.drawImage(video, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
            // setCoverImage(offscreenCanvas.toDataURL('image/png'));
        };
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('description', caption);
        formData.append('upload_file', selectedFile);
        formData.append('thumbnail_time', selectedTime);
        formData.append('viewable', viewable);
        allows.forEach(allow => formData.append('allows[]', allow));

        try {
            setLoadingBtn(true);
            const response = await uploadVideo(formData);
            
            if (response) {
                toast('Tải video thành công.', {
                    position: 'top-center',
                    duration: 3000,
                    style: {
                        backgroundColor: 'rgba(25, 25, 25, 0.8)',
                        color: '#fff',
                        fontWeight: 'italic',
                        width: '100%',
                    },
                    iconTheme: {
                        display: 'none',
                    },
                });
                setTimeout(() => {
                    navigate(`/@${userData.nickname}`);
                }, 1000)
            } else {
                setLoadingBtn(false);
                toast('Có lỗi khi tải video lên. Vui lòng thử lại.', {
                    position: 'top-center',
                    duration: 3000,
                    style: {
                        backgroundColor: 'rgba(25, 25, 25, 0.8)',
                        color: '#fff',
                        fontWeight: 'italic',
                        width: '100%',
                    },
                    iconTheme: {
                        display: 'none',
                    },
                });
            }
        } catch (e) {
            console.error(e);
        };
        
    }

    const handleDiscard = () => {
        setTimeout(() => { navigate('/') }, 300)
    }
    
    return (
        <div className={cx('wrapper')}>
            {!selectedFile ? (
                <ViewUpload onFileSelect={handleSelectFile} />
            ) : (
                <div className={cx('wrapper-content')}>
                    <div className={cx('header')}>
                        <h1 className={cx('title')}>Upload video</h1>
                        <p>Post a video to your account</p>
                    </div>
                    <div className={cx('container')}>
                        <div className={cx('video-container')}>
                            <Image className={cx('bg-image')} src={images.bgIphone} />
                            <div className={cx('video')}>
                                <ViewVideoUpload
                                    videoUrl={videoUrl}
                                />
                            </div>
                            <div className={cx('header')}>
                                <div className={cx('live')}>
                                    <LiveIcon />
                                </div>
                                <div>Following</div>
                                <div className={cx('active')}>For you</div>
                                <div className={cx('search')}>
                                    <SearchIcon />
                                </div>
                            </div>
                            <div className={cx('controls')}>
                                <Image className={cx('control-icon')} src={images.iconMobile} />
                            </div>
                            <div className={cx('actions')}>
                                <div className={cx('avatar')}>
                                    <Image className={cx('avatar-image')} src={userData.avatar} />
                                </div>
                                <ActionIcon />
                            </div>
                            <div className={cx('video-content')}>
                                <div className={cx('full-name')}>{`${userData.first_name} ${userData.last_name}`}</div>
                                {caption && <input className={cx('description')} type="text" value={caption} readOnly />}
                                <div className={cx('video-content__footer')}>
                                    <div className={cx('music')}>
                                        <MusicNoteIcon width="1.6rem" height="1.6rem" className={cx('music-icon')} /> Original sound - {userData.nickname}
                                    </div>
                                    <div className={cx('thumb', 'spin')}>
                                        <Image className={cx('thumb-image')} src={userData.avatar} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('edit-video')}>
                            <div className={cx('caption')}>
                                <p>Caption</p>
                                <div className={cx('video-title')}>
                                    <input
                                        type="text"
                                        value={caption}
                                        onChange={handleChangeCaptions}
                                    />
                                    <Button
                                        onClick={handleChangeVideo}
                                        leftIcon={
                                            <LiveIcon
                                                className={cx('change-icon')}
                                                width="2.2rem"
                                                height="2.2rem"
                                            />
                                        }
                                        primary
                                        className={cx('change-video-btn')}
                                    >
                                        Thay đổi
                                    </Button>
                                </div>
                            </div>
                            <div className={cx('cover')}>
                                <p>Cover</p>
                                <div className={cx('frame-container')}>
                                    <div className={cx('frame-list')}>
                                        {frames.map((frame, index) => (
                                            <div
                                                key={index}
                                                className={cx('frame-item')}
                                                style={{ "--delay": `${index * 0.1}s` }} // Thêm delay động cho mỗi frame
                                            >
                                                <img
                                                    src={frame}
                                                    alt={`frame-${index}`}
                                                    className={cx('frame-image', { selected: index === selectedFrame })}
                                                    onClick={() => handleFrameClick(index)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {loadingFrame && (
                                        <FontAwesomeIcon
                                            className={cx('loading')}
                                            icon={faSpinner}
                                        />
                                    )}
                                </div>
                                {/* <Image src={coverImage} alt="cover-image" className={cx('cover-image')} /> */}
                            </div>
                            <div className={cx('released')}>
                                <p>Who can view this video</p>
                                <select
                                    className={cx('select-box')}
                                    name="viewer"
                                    id=""
                                    value={viewable}
                                    onChange={(e) => setViewable(e.target.value)}
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="friends">Friends</option>
                                </select>
                            </div>
                            <div className={cx('allowable')}>
                                <p>Allow users to:</p>
                                <div className={cx('allowable-option')}>
                                    <input
                                        type="checkbox"
                                        name="comment"
                                        id="comment"
                                        checked={allows.includes('comment')}
                                        onChange={() => toggleAllow('comment')}
                                    />
                                    <label htmlFor="comment">Comments</label>
                                    <input
                                        type="checkbox"
                                        name="duet"
                                        id="duet"
                                        checked={allows.includes('duet')}
                                        onChange={() => toggleAllow('duet')}
                                    />
                                    <label htmlFor="duet">Duet</label>
                                    <input
                                        type="checkbox"
                                        name="stitch"
                                        id="stitch"
                                        checked={allows.includes('stitch')}
                                        onChange={() => toggleAllow('stitch')}
                                    />
                                    <label htmlFor="stitch">Stitch</label>
                                </div>
                            </div>
                            <div className={cx('copyright')}>
                                <div className={cx('copyright-check')}>
                                    <p>Run a copyright check</p>
                                    <input
                                        type="checkbox"
                                        name="copyright"
                                        id=""
                                    />
                                </div>
                                <p className={cx('copyright-note')}>
                                    We'll check your video for potential
                                    copyright infringements on used sounds. If
                                    infringements are found, you can edit the
                                    video before posting.{' '}
                                    <strong>Learn more</strong>
                                </p>
                            </div>
                            <div className={cx('action')}>
                                <button className={cx('discard-btn')} onClick={handleDiscard}>
                                    Discard
                                </button>

                                <div className={cx('btn-upload')}>
                                    <Button primary onClick={handleUpload}>Upload</Button>
                                    
                                    {loadingBtn && (
                                        <div className={cx('loading')}>
                                            <FontAwesomeIcon
                                                className={cx('loading-icon')}
                                                icon={faSpinner}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Toaster />
                </div>
            )}
        </div>
    );
}

export default Upload;