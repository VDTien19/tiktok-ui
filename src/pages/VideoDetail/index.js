import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './VideoDetail.module.scss';
import CommentSection from '~/components/CommentSection';
import VideoPosterInfo from '~/components/VideoPosterInfo';
import VideoComment from '~/components/VideoComment';
// import CreatorVideo from '~/components/CreatorVideo';
import { ClosedIcon } from '~/components/Icons';

const cx = classNames.bind(styles)

function VideoDetail() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    };

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <VideoComment>
                    <div className={cx('close')}>
                        <button className={cx('close-btn')} onClick={handleClose} >
                            <ClosedIcon className={cx('close-icon')} />
                        </button>
                    </div>
                </VideoComment>
            </div>
            <div className={cx('section')}>
                <div className={cx('info-section')}>
                    <VideoPosterInfo />
                </div>
                <div className={cx('comment-section')}>
                    <CommentSection />
                </div>
            </div>
        </div>
    );
}

export default VideoDetail;