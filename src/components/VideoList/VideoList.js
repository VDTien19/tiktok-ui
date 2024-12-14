/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState, useCallback, memo, useRef } from 'react';
import { throttle } from 'lodash';
import LazyLoad from 'react-lazyload';

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

    const handleScroll = useCallback(
        throttle(() => {
            if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
                setPage((prevPage) => prevPage + 1);
            }
        }, 300), // Throttle 300ms
        [],
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

    useEffect(() => {
        fetchVideos();
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
