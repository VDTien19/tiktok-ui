/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState, useCallback, memo } from 'react';

import styles from './VideoList.module.scss';
import { getListVideo } from '~/services/videoServices';
import VideoItem from '~/components/VideoItem';

const cx = classNames.bind(styles);

function VideoList() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(15);
    const [playingIndex, setPlayingIndex] = useState(null);

    // console.log("playingIndex: ", playingIndex)
    console.log("page: ", page);

    const fetchVideos = async () => {
        try {
            const data = await getListVideo('for-you', page);
            setVideos((prevVideos) => [...prevVideos, ...data]);
        } catch (err) {
            console.error('Lỗi khi lấy danh sách video: ', err);
        }
    };

    function handleScrool() {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            setPage((page) => page + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScrool);
        return () => {
            window.removeEventListener('scroll', handleScrool);
        };
    }, [page]);

    useEffect(() => {
        fetchVideos();
    }, [page]);

    const handlePlaying = useCallback(
        (index) => {
            if (playingIndex !== index) {
                setPlayingIndex(index);
            }
        },
        [playingIndex],
    );

    return (
        <div className={cx('wrapper')}>
            {videos.map((video, index) => (
                <VideoItem
                    key={index}
                    data={video}
                    index={index}
                    onPlaying={handlePlaying}
                    playingIndex={playingIndex}
                />
            ))}
        </div>
    );
}

export default memo(VideoList);
