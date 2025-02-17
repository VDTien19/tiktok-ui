import classNames from 'classnames/bind';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './CreatorVideo.module.scss';

const cx = classNames.bind(styles);
function CreatorVideo({ data }) {
    const videoRef = useRef(new Map());
    const [fullColumn, setFullColumn] = useState(false);

    const handleMouseEnter = (index) => {
        const video = videoRef.current.get(index);
        if (video) {
            video.play();
        }
    }
    const handleMouseLeave = (index) => {
        const video = videoRef.current.get(index);
        if (video) {
            video.pause();
        }
    }

    useEffect(() => {
        if (data?.videos.length === 0) {
            setFullColumn(true);
        } else {
            setFullColumn(false);
        }
    }, [data]);

    return (  
        <div className={cx("wrapper", {'full-column': fullColumn})}>
            {data?.videos.length === 0 ? (
                <div className={cx('non-info')}>Hiện người dùng này chưa có video nào.</div>
            ) : (
                data?.videos.map((video, index) => (
                    <Link to={`video/${video.id}`}>
                        <div key={video.id} className={cx("video-container")}>
                            <video 
                                ref={(el) => videoRef.current.set(index, el)} 
                                className={cx('video-url')} 
                                src={video.file_url} 
                                muted 
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            />
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
}

export default CreatorVideo;