import classNames from "classnames/bind";
import { useParams } from 'react-router-dom';
import { useState } from "react";

import styles from './ProfileHeader.module.scss';
import { useAuth } from "~/contexts/AuthContext";
import Image from "~/components/Images";
import Button from "~/components/Button";
import { UserFollowedIcon, ShareSolidIcon, ThreeDotIcon, SettingIcon } from '~/components/Icons';
import { useFollow } from "~/hooks";
import AuthModal from '~/components/AuthModal';

const cx = classNames.bind(styles);
function ProfileHeader({ data }) {
    const { nickname } = useParams();

    const [showAuthModal, setShowAuthModal] = useState(false);

    const { isFollowed, followCount, toggleFollow } = useFollow(data?.is_followed, data?.followings_count, data?.id);

    const { userData, isAuthenticated } = useAuth();
    const owner = userData?.nickname === nickname.slice(1);

    const handleFollow = () => {
        if (!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }
        toggleFollow();
    }

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <Image className={cx('avatar-img')} src={data?.avatar} />
            </div>
            <div className={cx('info')}>
                <div className={cx('name')}>
                    <h1 className={cx('username')}>{data?.nickname}</h1>
                    <h2 className={cx('full-name')}>{data?.first_name} {data?.last_name}</h2>
                </div>
                <div className={cx('action')}>
                    {owner ? (
                        <div className={cx('action-list')}>
                            <Button primary className={cx('edit-profile-btn')}>Sửa hồ sơ</Button>
                            <Button className={cx('post-adv')}>Quảng bá bài đăng</Button>
                            <button className={cx('setting-btn')}><SettingIcon /></button>
                            <button className={cx('share-btn')}><ShareSolidIcon /></button>
                        </div>
                    ) : (
                        <div className={cx('action-list')}>
                            {isFollowed ? (
                                <Button onClick={handleFollow} className={cx('follow-btn')}>
                                    <span>
                                        <UserFollowedIcon />
                                        <p className={cx('follow-btn-text')}>Đang Follow</p>
                                    </span>
                                </Button>
                            ) : (
                                <Button onClick={handleFollow} primary>Follow</Button>
                            )}
                            <Button className={cx('message-btn')}>Tin nhắn</Button>
                            <button className={cx('share-btn')}><ShareSolidIcon /></button>
                            <button className={cx('three-dot-btn')}><ThreeDotIcon width='2rem' /></button>
                        </div>
                    )}
                </div>
                <div className={cx('action-bar')}>
                    <div className={cx('following')}>
                        <p className={cx('following-count')}>{followCount}</p>
                        <p className={cx('following-text')}>Đang Follow</p>
                    </div>
                    <div className={cx('follower')}>
                        <p className={cx('follower-count')}>{data?.followers_count}</p>
                        <p className={cx('follower-text')}>Follower</p>
                    </div>
                    <div className={cx('like')}>
                        <p className={cx('like-count')}>{data?.likes_count}</p>
                        <p className={cx('like-text')}>Thích</p>
                    </div>
                </div>
                <div className={cx('bio')}>
                    <p className={cx('bio-text')}>{data?.bio}</p>
                </div>
            </div>
            {showAuthModal && (
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(!showAuthModal)} />
            )}
        </div>
    );
}

export default ProfileHeader;