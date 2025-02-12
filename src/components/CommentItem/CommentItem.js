import { PropTypes } from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { HeartSolidIconActive, HeartSolidIcon } from '~/components/Icons';
import { likeComment, unlikeComment } from '~/services/likeServices';
import Image from '~/components/Images';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);
function CommentItem({ comment }) {
    const [isLiked, setIsLiked] = useState(comment.is_liked);
    const [likeCount, setLikeCount] = useState(comment.likes_count);

    const hanldeLikeVideo = () => {
        setIsLiked(!isLiked);
        if (isLiked) {
            setLikeCount((prev) => prev - 1);
            unlikeComment(comment.id);
        } else {
            setLikeCount((prev) => prev + 1);
            likeComment(comment.id);
        }
    };

    const time = comment.updated_at.split(' ');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('comment-item')}>
                <div className={cx('avatar')}>
                    <Link to={`/@${comment.user.nickname}`}>
                        <Image
                            src={comment.user.avatar}
                            className={cx('avatar-url')}
                        />
                    </Link>
                </div>
                <div className={cx('comment')}>
                    <div className={cx('comment-username')}>
                        <Link
                            to={`/@${comment.user.nickname}`}
                        >{`${comment.user.first_name} ${comment.user.last_name}`}</Link>
                    </div>
                    <p className={cx('comment-content')}>
                        {comment.comment}
                    </p>
                    <div className={cx('comment-time')}>{time[0]}</div>
                </div>
            </div>
            <div className={cx('comment-like')}>
                <div className={cx('like-icon')} onClick={hanldeLikeVideo}>
                    {isLiked ? <HeartSolidIconActive /> : <HeartSolidIcon />}
                </div>
                <div className={cx('like-count')}>{likeCount}</div>
            </div>
        </div>
    );
}

export default CommentItem;
