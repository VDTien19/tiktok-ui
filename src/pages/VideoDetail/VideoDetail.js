import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useCallback } from 'react';
import { throttle } from 'lodash';

import styles from './VideoDetail.module.scss';
import CommentSection from '~/components/CommentSection';
import VideoPosterInfo from '~/components/VideoPosterInfo';
import VideoComment from '~/components/VideoComment';
import { ClosedIcon, ArrowIcon } from '~/components/Icons';
import { getVideo, getListVideo } from '~/services/videoServices';
import { getComment } from '~/services/commentServices';
// import CreatorVideo from '~/components/CreatorVideo';

const cx = classNames.bind(styles)
const initPage = Math.floor(Math.random() * 10);

function VideoDetail() {
    const [videoData, setVideoData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [commentsReady, setCommentsReady] = useState(false);
    const [videoHistory, setVideoHistory] = useState([]);
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(initPage);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchDataVideo = async (idVideo) => {
            try {
                const data = await getVideo(idVideo);
                const videoData = data.data;
                setVideoData(videoData)
            } catch (e) {
                console.error("Error fetching video: " + e);
            }
        }
        const fetchDataComment = async (idVideo) => {
            try {
                const comment = await getComment(idVideo);
                const commentData = comment.data;
                setCommentData(commentData || []);
                setCommentsReady(true);
            } catch (e) {
                console.error("Error fetching comment: ", e);
            }
        }

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

    // Xác định vị trí của video hiện tại trong danh sách
    const currentIndex = videos.findIndex(video => video.id === Number(id));

    // Nếu video hiện tại không có trong danh sách, thêm vào đầu danh sách
    const fetchVideos = async () => {
        try {
            const data = await getListVideo('for-you', page);
            const updatedVideos = [...data];

            // Nếu video hiện tại không có trong danh sách, thêm vào
            if (!updatedVideos.some(video => video.id === Number(id)) && videoData) {
                updatedVideos.unshift(videoData);
            }

            setVideos(updatedVideos);
        } catch (err) {
            console.error('Lỗi khi lấy danh sách video: ', err);
        }
    }

    useEffect(() => {
        fetchVideos();
    }, [page]);

    // Chuyển sang video tiếp theo
    const handleNextVideo = () => {
        if (currentIndex !== -1 && currentIndex < videos.length - 1) {
            const nextVideo = videos[currentIndex + 1];
            navigate(`/@${nextVideo.user.nickname}/video/${nextVideo.id}`);
        } else {
            setPage(prevPage => prevPage + 1); // Tải thêm video nếu hết danh sách
        }
    };

    // Quay lại video trước đó
    const handlePrevVideo = () => {
        if (currentIndex > 0) {
            const prevVideo = videos[currentIndex - 1];
            navigate(`/@${prevVideo.user.nickname}/video/${prevVideo.id}`);
        }
    };

    // const handlePrevVideo = async () => {
    //     if(videoHistory.length > 0) {
    //         const prevId = videoHistory.pop(); 
    //         setVideoHistory([...videoHistory]);
    //         try {
    //             const res = await getVideo(prevId); // Lấy dữ liệu video trước 
    //             if (res.data) {
    //                 navigate(`/@${res.data.user.nickname}/video/${prevId}`);
    //             }
    //         } catch (e) {
    //             console.error("Lỗi khi quay lại video:", prevId);
    //         }
    //     }
    // }


    // const handleScroll = useCallback(
    //     throttle(() => {
    //         if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
    //             setPage((prevPage) => prevPage + 1);
    //         }
    //     }, 300), // Throttle 300ms
    //     [],
    // );

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [page]);


    // Handle next video
    // const handleNextVideo = async () => {
    //     let nextId = Number(id) - 1;
    //     while (true) {
    //         try {
    //             const res = await getVideo(nextId);
    //             const data = res.data;
    //             if(data) {
    //                 setVideoHistory([...videoHistory, id]); // Lưu id cũ
    //                 navigate(`/@${data?.user.nickname}/video/${data?.id}`);
    //                 return;
    //             };
    //         } catch (e) {
    //             console.error("Video", nextId, "không hợp lê: ", e);
    //             nextId--;
    //             if(nextId > Number(id) + 100)    break; // Call api tối đa 10 lần
    //         }
    //     }
    // }
 
    // // Handle back video
    // const handlePrevVideo = async () => {
    //     if(videoHistory.length > 0) {
    //         const prevId = videoHistory.pop(); 
    //         setVideoHistory([...videoHistory]);
    //         try {
    //             const res = await getVideo(prevId); // Lấy dữ liệu video trước 
    //             if (res.data) {
    //                 navigate(`/@${res.data.user.nickname}/video/${prevId}`);
    //             }
    //         } catch (e) {
    //             console.error("Lỗi khi quay lại video:", prevId);
    //         }
    //     }
    // }

    const handleClose = () => {
        navigate('/');
    };

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <VideoComment videoData={videoData}>
                    <div className={cx('close')}>
                        <button className={cx('close-btn')} onClick={handleClose} >
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
                        <FontAwesomeIcon
                            className={cx('loading')}
                            icon={faSpinner}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoDetail;