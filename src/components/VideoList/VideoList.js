import classNames from 'classnames/bind';
import { useEffect, useState } from 'react'

import styles from './VideoList.module.scss'
import { getListVideo } from '~/services/videoServices';
import VideoItem from '~/components/VideoItem'

const cx = classNames.bind(styles);

function VideoList() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(7);

    const fetchVideos = async () => {
        try {
            const data = await getListVideo('for-you', page)
            setVideos(prevVideo => [...prevVideo, ...data])
        } catch (err) {
            // setError('Không thể tải danh sách video. Vui lòng thử lại!');
            console.error('Lỗi khi lấy danh sách video: ', err);
        } finally {
            // setLoading(false); // Tắt trạng thái loading
        }
    }

    useEffect(() => {
        fetchVideos();
    }, [])

    return (  
        <div className={cx('wrapper')}>
            {videos.map((video, index) => (
                <VideoItem key={index} data={video} />
            ))}
        </div>
    );
}

export default VideoList;