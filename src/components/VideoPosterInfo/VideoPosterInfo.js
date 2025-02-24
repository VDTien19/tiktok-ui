import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Toaster, toast } from 'react-hot-toast';

import { useAuth } from '~/contexts/AuthContext';
import { useFollow } from '~/hooks';
import styles from './VideoPosterInfo.module.scss';
import Image from '~/components/Images';
import Button from '~/components/Button';
import ActionBar from '~/components/ActionBar';
import Menu from '~/components/Popper/Menu';
import {
    MusicNoteIcon,
    ShareIcon,
    TwitterIcon,
    LineIcon,
    FacebookIcon,
    ReupIcon,
    TagIcon,
    LinkedInIcon,
    RedditIcon,
    TelegramIcon,
    EmailIcon,
    PinterestIcon,
    WhatsAppIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <TwitterIcon />,
        title: 'Chia sẻ với Twitter',
        defaultText: true,
    },
    {
        icon: <LinkedInIcon />,
        title: 'Chia sẻ với LinkedIn',
        defaultText: true,
    },
    {
        icon: <RedditIcon />,
        title: 'Chia sẻ với Reddit',
        defaultText: true,
    },
    {
        icon: <TelegramIcon />,
        title: 'Chia sẻ với Telegram',
        defaultText: true,
    },
    {
        icon: <EmailIcon />,
        title: 'Chia sẻ với Email',
        defaultText: true,
    },
    {
        icon: <LineIcon />,
        title: 'Chia sẻ với Line',
        defaultText: true,
    },
    {
        icon: <PinterestIcon />,
        title: 'Chia sẻ với Printerest',
        defaultText: true,
    },
];


function VideoPosterInfo({ dataUser }) {
    const { userData } = useAuth();
    const { nickname } = useParams();

    const owner = userData.nickname === nickname.slice(1)

    const urlVideoRef = useRef(null);

    const { isFollowed, toggleFollow } = useFollow(
        dataUser?.user.is_followed,
        null,
        dataUser?.user.id,
    );

    const handleFollow = () => {
        toggleFollow();
    }

    const handleClickCopy = async () => {
        if (urlVideoRef.current) {
            try {
                await navigator.clipboard.writeText(
                    urlVideoRef.current.innerText,
                );
                toast('Đã sao chép liên kết', {
                    position: 'top-center',
                    duration: 3000,
                    style: {
                        backgroundColor: 'rgba(25, 25, 25, 0.8)',
                        color: '#fff',
                        fontWeight: 'bold',
                        width: '100%',
                    },
                    iconTheme: {
                        display: 'none',
                    },
                });
            } catch (err) {
                console.error(err);
            }
        }
    };

    // useEffect(() => {
    //     console.log("urlVideoRef: " + urlVideoRef.current.innerText);
    // });

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandDesc = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Link
                    to={`/@${dataUser?.user.nickname}`}
                    className={cx('user-url')}
                >
                    <div className={cx('avatar')}>
                        <Image
                            className={cx('avatar-url')}
                            alt={dataUser?.user.nickname}
                            src={dataUser?.user.avatar}
                        />
                    </div>
                    <div className={cx('user-info')}>
                        <span className={cx('nickname')}>
                            {dataUser?.user.nickname}
                        </span>
                        <div className={cx('other-info')}>
                            <span
                                className={cx('username')}
                            >{`${dataUser?.user.first_name} ${dataUser?.user.last_name}`}</span>
                            {(dataUser?.user.first_name ||
                                dataUser?.user.last_name) && (
                                <span className={cx('seperate')}></span>
                            )}
                            <span>{dataUser?.updated_at.split(' ')[0]}</span>
                        </div>
                    </div>
                </Link>
                {/* {dataUser?.is_followed ? (
                    <Button primary className={cx('follow-btn')}>
                        Follow
                    </Button>
                ) : (
                    <Button outline className={cx('follow-btn')}>
                        Following
                    </Button>
                )} */}
                {owner ? (
                    <Button small outline style={{ marginLeft: '5rem'}}>Xóa</Button>
                ) : (
                    <Button onClick={handleFollow} primary={!isFollowed} outline={isFollowed} className={cx('follow-btn')}>
                        {isFollowed ? 'Following' : 'Follow'}
                    </Button>
                )}
            </header>
            <div className={cx('content')}>
                <h1 className={cx('video-desc')}>
                    <span
                        className={cx({
                            expanded: isExpanded,
                            collapsed: !isExpanded,
                        })}
                    >
                        {dataUser?.description}
                    </span>
                    {dataUser?.description.length > 100 && (
                        <button onClick={handleExpandDesc}>
                            {isExpanded ? 'ẩn bớt' : 'thêm'}
                        </button>
                    )}
                </h1>
                <Link to="/" className={cx('music-url')}>
                    <MusicNoteIcon className={cx('music-icon')} /> nhạc nền{' '}
                    {dataUser?.music}
                </Link>
            </div>

            <div className={cx('action')}>
                {/* Action bar */}
                <div className={cx('action-bar')}>
                    <ActionBar data={dataUser} direction="horizontal" />
                </div>

                {/* Share */}
                <div className={cx('share-list')}>
                    <Tippy content="Đăng lại" placement="top">
                        <button className={cx('share-item')}>
                            <ReupIcon className={cx('reup-icon')} />
                        </button>
                    </Tippy>
                    <Tippy content="Nhúng" placement="top">
                        <button className={cx('share-item')}>
                            <TagIcon />
                        </button>
                    </Tippy>
                    <Tippy content="Chia sẻ với Facebook" placement="top">
                        <button className={cx('share-item')}>
                            <FacebookIcon />
                        </button>
                    </Tippy>
                    <Tippy content="Chia sẻ với WhatsApp" placement="top">
                        <button className={cx('share-item')}>
                            <WhatsAppIcon />
                        </button>
                    </Tippy>
                    <Menu items={MENU_ITEMS}>
                        <button className={cx('share-item')}>
                            <ShareIcon />
                        </button>
                    </Menu>
                </div>
            </div>

            <div className={cx('footer')}>
                <p className={cx('share-url')} ref={urlVideoRef}>
                    {`${window.location.origin}/@${dataUser?.user.nickname}/video/${dataUser?.id}`}
                </p>
                <button onClick={handleClickCopy} className={cx('btn-copy')}>
                    Sao chép liên kết
                </button>
                <Toaster />
            </div>
        </div>
    );
}

export default VideoPosterInfo;
