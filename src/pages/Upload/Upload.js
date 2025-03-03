import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { ActionIcon, LiveIcon, MusicNoteIcon, SearchIcon, StaticPauseIcon } from "~/components/Icons";
import { useAuth } from "~/contexts/AuthContext";
import ViewUpload from "~/components/ViewUpload";
import styles from "./Upload.module.scss";
import Image from "~/components/Images";
import images from "~/assets/images";

import Button from "~/components/Button";

const cx = classNames.bind(styles);
function Upload() {
    const { userData } = useAuth();
    
    useEffect(() => {
        document.title = 'TikTok Studio';
    }, []);

    const videoRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null)
    const [showIconPause, setShowIconPause] = useState(false);
    // const [spinAnimate, setSpinAnimate] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')

    const handleSelectFile = (file) => {
        setSelectedFile(file);
        setVideoUrl(URL.createObjectURL(file));
    };
    
    if (selectedFile) {
        console.log("File details:", {
            name: selectedFile.name, 
            size: selectedFile.size, 
            type: selectedFile.type, 
            lastModified: selectedFile.lastModified,
            url: videoUrl,
            length: selectedFile.duration
        });
    }

    const handlePlayPause = () => {
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play();
            setShowIconPause(false);
            // setSpinAnimate(true);
        } else {
            videoRef.current.pause();
            setShowIconPause(true);
            // setSpinAnimate(false);
        }
    }

    const handleChangeVideo = () => {
        setSelectedFile(null);
        if(videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }
    }

    useEffect(() => {
        return () => {
            if(videoUrl) {URL.revokeObjectURL(videoUrl);
            }
        }
    })

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
                                <video autoPlay onClick={handlePlayPause} className={cx('video-url')} ref={videoRef} src={videoUrl} loop></video>
                                {showIconPause && <StaticPauseIcon className={cx('pause-icon')} width='3rem' height='3rem' />}
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
                                {/* <div className={cx('description')}>{selectedFile.name.slice(0, -4)}</div> */}
                                <input className={cx('description')} type="text" value={selectedFile.name.slice(0, -4)} />
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
                                    <input type="text" value={selectedFile.name.slice(0, -4)} />
                                    <Button onClick={handleChangeVideo} leftIcon={<LiveIcon className={cx('change-icon')} width="2.2rem" height="2.2rem"/>} primary className={cx('change-video-btn')}>Thay đổi</Button>
                                </div>
                            </div>
                            <div className={cx('cover')}>
                                <p>Cover</p>
                                <canvas></canvas>
                            </div>
                            <div className={cx('released')}>
                                <p>Who can view this video</p>
                                <select className={cx('select-box')} name="viewer" id="">
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="friends">Friends</option>
                                </select>
                            </div>
                            <div className={cx('allowable')}>
                                <p>Allow users to:</p>
                                <div className={cx('allowable-option')}>
                                    <input type="checkbox" name="comment" id="comment" />
                                    <label htmlFor="comment">Comments</label>
                                    <input type="checkbox"name="duet" id="duet" />
                                    <label htmlFor="duet">Duet</label>
                                </div>
                            </div>
                            <div className={cx('copyright')}>
                                <div className={cx('copyright-check')}>
                                    <p>Run a copyright check</p>
                                    <input type="checkbox" name="copyright" id="" />
                                </div>
                                <p className={cx('copyright-note')}>
                                    We'll check your video for potential copyright infringements on used sounds. If infringements are found, you can edit the video before posting. <strong>Learn more</strong>
                                </p>
                            </div>
                            <div className={cx('action')}>
                                <button className={cx('discard-btn')}>Discard</button>
                                <Button primary>Upload</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
     );
}

export default Upload;