import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { useFollow } from '~/hooks';
import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';
import Image from '~/components/Images';
import { Link } from 'react-router-dom';
import { useAuth } from '~/contexts/AuthContext';
import AuthModal from '~/components/AuthModal';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const [showAuthModal, setShowAuthModal] = useState(false);

    const { isAuthenticated } = useAuth();
    const { isFollowed, toggleFollow } = useFollow(
        data?.is_followed,
        null,
        data?.id,
    );

    const handleFollow = () => {
        if (!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }
        toggleFollow();
    };

    const handleCloseModal = () => {
        setShowAuthModal(false);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Link to={`/@${data.nickname}`}>
                        <Image
                            src={data.avatar}
                            alt={data.nickname}
                            className={cx('avatar')}
                            // fallback="https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338429_1280.png"
                        />
                    </Link>
                    <Button
                        onClick={handleFollow}
                        outline={isFollowed}
                        primary={!isFollowed}
                    >
                        {isFollowed ? 'Following' : 'Follow'}
                    </Button>
                </div>
                <div className={cx('body')}>
                    <p className={cx('nickname')}>
                        <Link to={`/@${data.nickname}`}>
                            <strong>{data.nickname}</strong>
                        </Link>
                        {data.tick && (
                            <FontAwesomeIcon
                                className={cx('check')}
                                icon={faCheckCircle}
                            />
                        )}
                    </p>
                    <p
                        className={cx('name')}
                    >{`${data.first_name} ${data.last_name}`}</p>
                    <p className={cx('analytics')}>
                        <strong className={cx('value')}>
                            {data.followers_count}
                        </strong>
                        <span className={cx('label')}>Followers</span>
                        <strong className={cx('value')}>
                            {data.likes_count}
                        </strong>
                        <span className={cx('label')}>Likes</span>
                    </p>
                </div>
            </div>
            {showAuthModal && (
                <AuthModal onClose={handleCloseModal} isOpen={showAuthModal} />
            )}
        </>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
