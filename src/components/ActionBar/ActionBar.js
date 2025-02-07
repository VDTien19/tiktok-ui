import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import { memo } from 'react';

import { useLike, useFollow } from '~/hooks';
import styles from './ActionBar.module.scss'
import Image from '~/components/Images'
import images from '~/assets/images';
import {
    AddIcon,
    TickIcon,
    HeartIcon,
    HeartIconActive,
    FavoriteIcon,
    ShareIcon,
} from '~/components/Icons';
import { useState } from "react";
import { useAuth } from '~/contexts/AuthContext';
import AuthModal from '~/components/AuthModal';

const cx = classNames.bind(styles)
function ActionBar({ data, direction='vertical', followAction=false, shareAction=false, link=false }) {
    const { isAuthenticated } = useAuth();
    const [isAnimating, setAnimating] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleLikeClick = () => {
        if(!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }

        if(!isAnimating) {
            setAnimating(true);
            toggleLike();

            setTimeout(() => {setAnimating(false);}, 600)
        }
    }

    const handleCloseModal = () => {
        setShowAuthModal(false);
    }

    const { isFollowed, toggleFollow } = useFollow(
        data?.user.is_followed,
        null,
        data?.user.id
    );

    const handleFollow = () => {
        if(isAuthenticated) {
            toggleFollow();
        } else {
            setShowAuthModal(true);
            return;
        }
    }

    const { isLiked, likeCount, toggleLike } = useLike(
        data?.is_liked,
        data?.likes_count,
        data?.id,
    );

    const actionBarDrirection = cx('action-bar', {
        vertical: direction === 'vertical',
        horizontal: direction === 'horizontal'
    })
    
    return (  
        <>
            <section className={actionBarDrirection}>
                {followAction && (
                    <div className={cx('follow-action')}>
                        <Link to={`/@${data?.user.nickname}`}>
                            <Image
                                src={data?.user.avatar}
                                alt={data?.user.nickname}
                                className={cx('avatar-img')}
                            />
                        </Link>
                        <button onClick={handleFollow} className={cx('follow-btn', {'white-bg': isFollowed})}>
                            {isFollowed ? (
                                <TickIcon className={cx('tick-icon')} />
                            ) : (
                                <AddIcon className={cx('add-icon')} />
                            )}
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
                    {link ? (
                        <Link to={`/@${data?.user.nickname}/video/${data?.id}`} className={cx('comment-link')}>
                            <div className={cx('comment-icon')}>
                                <Image
                                    src={images.commentIcon}
                                    className={cx('comment-img')}
                                />
                            </div>
                            <span className={cx('comment-count')}>
                                {data?.comments_count}
                            </span>
                        </Link>
                    ) : (
                        <>
                            <div className={cx('comment-icon')}>
                                <Image
                                    src={images.commentIcon}
                                    className={cx('comment-img')}
                                />
                            </div>
                            <span className={cx('comment-count')}>
                                {data?.comments_count}
                            </span>
                        </>
                    )}
                </button>
                <button className={cx('favorite-action')}>
                    <div className={cx('favorite-icon')}>
                        <FavoriteIcon />
                    </div>
                    <span className={cx('favorite-count')}>0</span>
                </button>
                {shareAction && (
                    <button className={cx('share-action')}>
                        <div className={cx('share-icon')}>
                            <ShareIcon />
                        </div>
                        <span className={cx('share-count')}>
                            {data?.shares_count}
                        </span>
                    </button>
                )}
            </section>
            {showAuthModal && (
                <AuthModal isOpen={showAuthModal} onClose={handleCloseModal} />
            )}
        </>
    );
}

export default memo(ActionBar);