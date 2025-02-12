import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './VideoDetail.module.scss';
import CommentSection from '~/components/CommentSection';
import VideoPosterInfo from '~/components/VideoPosterInfo';
import VideoComment from '~/components/VideoComment';
import { ClosedIcon, ArrowIcon } from '~/components/Icons';
import { getVideo } from '~/services/videoServices';
import { getComment } from '~/services/commentServices';
import { useEffect, useState } from 'react';
// import CreatorVideo from '~/components/CreatorVideo';

const cx = classNames.bind(styles)

function VideoDetail() {
    const [videoData, setVideoData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [commentsReady, setCommentsReady] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchDataVideo = async () => {
            try {
                const data = await getVideo(id);
                const comment = await getComment(id);
                const videoData = data.data;
                const commentData = comment.data;
                setVideoData(videoData)
                setCommentData(commentData || []);
                setCommentsReady(true);
            } catch (e) {
                console.log(e);
            }
        }
        fetchDataVideo();
    }, [id]);

    const refetchComments = async () => {
        try {
            const comment = await getComment(id);
            setCommentData(comment.data || []);
        } catch (e) {
            console.log(e);
        }
    };
    
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
                        <button className={cx('row-up-btn')}>
                            <ArrowIcon />
                        </button>
                        <button className={cx('row-down-btn')}>
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