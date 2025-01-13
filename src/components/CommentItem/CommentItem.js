import { PropTypes } from 'prop-types';
import classNames from 'classnames/bind';

import { HeartIconActive, HeartSolidIcon } from '~/components/Icons';
import Image from '~/components/Images';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles)
function CommentItem({ comment }) {

    const time = comment.updated_at.split(' ')

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('comment-item')}>
                <div className={cx('avatar')}>
                    <Image src={comment.user.avatar} className={cx('avatar-url')} />
                </div>
                <div className={cx('comment')}>
                    <div className={cx('comment-username')}>{`${comment.user.first_name} ${comment.user.last_name}`}</div>
                    <div className={cx('comment-content')}>{comment.comment}</div>
                    <div className={cx('comment-time')}>{time[0]}</div>
                </div>
            </div>
            <div className={cx('comment-like')}>
                <div className={cx('like-icon')}>
                    <HeartSolidIcon />
                </div>
                <div className={cx('like-count')}>{comment.likes_count}</div>
            </div>
        </div>
    );
}

export default CommentItem;