/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState, useCallback, memo, useRef } from 'react';
import { throttle } from 'lodash';
import LazyLoad from 'react-lazyload';

import styles from './VideoList.module.scss';
import { getListVideo } from '~/services/videoServices';
import VideoItem from '~/components/VideoItem';

const cx = classNames.bind(styles);

const initPage = Math.floor(Math.random() * 10);

function VideoList() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(initPage);
    const [playingIndex, setPlayingIndex] = useState(null);

    const fetchVideos = async () => {
        try {
            const data = await getListVideo('for-you', page);
            console.log("Fetching videos: " + JSON.stringify(data));
            
            setVideos((prevVideos) => [...prevVideos, ...(Array.isArray(data) ? data : [])]);
        } catch (err) {
            console.error('Lỗi khi lấy danh sách video: ', err);
            setVideos((prevVideos) => [...prevVideos]);
        }
    };

    const handleScroll = useCallback(
        throttle(() => {
            if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
                setPage((prevPage) => prevPage + 1);
            }
        }, 300),
        [videos.length],
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

    useEffect(() => {
        if (page >= 0) {
            fetchVideos();
        }
    }, [page]);

    const playingIndexRef = useRef(null);

    const handlePlaying = useCallback((index) => {
        if (playingIndexRef.current !== index) {
            playingIndexRef.current = index;
            setPlayingIndex(index);
        }
    }, []);


    return (
        <LazyLoad height={500} offset={300}>
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
        </LazyLoad>
    );
}

export default memo(VideoList);
