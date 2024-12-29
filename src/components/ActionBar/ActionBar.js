import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import { memo } from 'react';

import { useLike } from '~/hooks';
import styles from './ActionBar.module.scss'
import Image from '~/components/Images'
import images from '~/assets/images';
import {
    AddIcon,
    HeartIcon,
    HeartIconActive,
    FavoriteIcon,
    ShareIcon,
} from '~/components/Icons';
import { useState } from "react";

const cx = classNames.bind(styles)
function ActionBar({ data, direction='vertical', followAction=false }) {

    const [isAnimating, setAnimating] = useState(false)

    const handleLikeClick = () => {
        if(!isAnimating) {
            setAnimating(true);
            toggleLike();

            setTimeout(() => {setAnimating(false);}, 600)
        }
    }

    const { isLiked, likeCount, toggleLike } = useLike(
        data.is_liked,
        data.likes_count,
        data.id,
    );

    const actionBarDrirection = cx('action-bar', {
        vertical: direction === 'vertical',
        horizontal: direction === 'horizontal'
    })
    
    return (  
        <div>
            <section className={actionBarDrirection}>
                {followAction && (
                    <div className={cx('follow-action')}>
                        <Link to={`/@${data.user.nickname}`}>
                            <Image
                                src={data.user.avatar}
                                alt={data.user.nickname}
                                className={cx('avatar-img')}
                            />
                        </Link>
                        <button className={cx('follow-btn')}>
                            <AddIcon className={cx('add-icon')} />
                        </button>
                    </div>
                )}
                <button onClick={handleLikeClick} className={cx('like-action')}>
                    <div className={cx('like-icon')}>
                        {isLiked ? (
                            <HeartIconActive className={cx({'like-icon-animation': isAnimating})} />
                        ) : (
                            <HeartIcon />
                        )}
                    </div>
                    <span className={cx('like-count')}>{likeCount}</span>
                </button>
                <button className={cx('comment-action')}>
                    <Link to={`/@${data.user.nickname}/video/${data.id}`}>
                        <div className={cx('comment-icon')}>
                            <Image
                                src={images.commentIcon}
                                className={cx('comment-img')}
                            />
                        </div>
                        <span className={cx('comment-count')}>
                            {data.comments_count}
                        </span>
                    </Link>
                </button>
                <button className={cx('favorite-action')}>
                    <div className={cx('favorite-icon')}>
                        <FavoriteIcon />
                    </div>
                    <span className={cx('favorite-count')}>0</span>
                </button>
                <button className={cx('share-action')}>
                    <div className={cx('share-icon')}>
                        <ShareIcon />
                    </div>
                    <span className={cx('share-count')}>
                        {data.shares_count}
                    </span>
                </button>
            </section>
        </div>
    );
}

export default memo(ActionBar);