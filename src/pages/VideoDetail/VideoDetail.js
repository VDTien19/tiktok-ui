import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import styles from './VideoDetail.module.scss';
import CommentSection from '~/components/CommentSection';
import VideoPosterInfo from '~/components/VideoPosterInfo';
import VideoComment from '~/components/VideoComment';
import { ClosedIcon, ArrowIcon } from '~/components/Icons';
import { getVideo, getListVideo } from '~/services/videoServices';
import { getComment } from '~/services/commentServices';

const cx = classNames.bind(styles);
const initPage = Math.floor(Math.random() * 10);

function VideoDetail() {
    const [videoData, setVideoData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [commentsReady, setCommentsReady] = useState(false);
    const [videoHistory, setVideoHistory] = useState([]); // Lưu video đã xem
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(initPage);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchDataVideo = async (idVideo) => {
            try {
                const data = await getVideo(idVideo);
                setVideoData(data.data);
            } catch (e) {
                console.error("Error fetching video: " + e);
            }
        };

        const fetchDataComment = async (idVideo) => {
            try {
                const comment = await getComment(idVideo);
                setCommentData(comment.data || []);
                setCommentsReady(true);
            } catch (e) {
                console.error("Error fetching comment: ", e);
            }
        };

        fetchDataVideo(id);
        fetchDataComment(id);
    }, [id]);

    const refetchComments = async () => {
        try {
            const comment = await getComment(id);
            setCommentData(comment.data || []);
        } catch (e) {
            console.log(e);
        }
    };

    // Vị trí của video hiện tại trong danh sách
    const currentIndex = videos.findIndex(video => video.id === Number(id));

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await getListVideo('for-you', page);

                setVideos((prevVideos) => {
                    const updatedVideos = [...prevVideos, ...data];

                    // Đảm bảo video hiện tại có trong danh sách
                    if (!updatedVideos.some(video => video.id === Number(id)) && videoData) {
                        updatedVideos.unshift(videoData);
                    }

                    return updatedVideos;
                });
            } catch (err) {
                console.error('Lỗi khi lấy danh sách video: ', err);
            }
        };

        if (videos.length === 0 || currentIndex === videos.length - 1) {
            fetchVideos();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, id]);

    
    // chuyển sang video tiếp theo
    const handleNextVideo = () => {
        const nextVideo = videos[currentIndex + 1];
        setVideoHistory((prevHistory) => [...prevHistory, id]); // Lưu video đã xem
        navigate(`/@${nextVideo.user.nickname}/video/${nextVideo.id}`);
        // console.log({currentIndex, videos})
        if (currentIndex === videos.length - 2) {
            // console.log("Page add 1");
            setPage(prev => prev + 1);
        }
    };

    // quay lại video trước
    const handlePrevVideo = async () => {
        if(videoHistory.length > 0) {
            // console.log("videoHistory: ", videoHistory)
            const prevId = videoHistory.pop(); 
            setVideoHistory([...videoHistory]);
            try {
                const res = await getVideo(prevId); // Lấy dữ liệu video trước 
                if (res.data) {
                    navigate(`/@${res.data.user.nickname}/video/${prevId}`);
                }
            } catch (e) {
                console.error("Lỗi khi quay lại video:", prevId);
            }
        }
    }
    // const handlePrevVideo = () => {
    //     if (videoHistory.length > 0) {
    //         console.log("videoHistory: ", videoHistory)
    //         const prevId = videoHistory.pop(); // Lấy video cuối trong lịch sử
    //         setVideoHistory([...videoHistory]); // Cập nhật lại lịch sử
    //         navigate(`/@${videos.user?.nickname}/video/${prevId}`);
    //     }
    // };

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <VideoComment videoData={videoData}>
                    <div className={cx('close')}>
                        <button className={cx('close-btn')} onClick={handleClose}>
                            <ClosedIcon className={cx('close-icon')} />
                        </button>
                    </div>
                    <div className={cx('row-control')}>
                        {videoHistory.length > 0 && (
                            <button onClick={handlePrevVideo} className={cx('row-up-btn')}>
                                <ArrowIcon />
                            </button>
                        )}
                        <button onClick={handleNextVideo} className={cx('row-down-btn')}>
                            <ArrowIcon />
                        </button>
                    </div>
                </VideoComment>
            </div>
            <div className={cx('section')}>
                <div className={cx('info-section')}>
                    <VideoPosterInfo dataUser={videoData} />
                </div>
                <div className={cx('comment-section')}>
                    {commentsReady ? (
                        <CommentSection dataComment={commentData} idVideo={id} refetchComments={refetchComments} />
                    ) : (
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoDetail;
