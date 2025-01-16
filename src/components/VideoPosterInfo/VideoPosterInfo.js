import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
// import { toast } from 'react-toastify';
import { Toaster, toast } from 'react-hot-toast';

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

// const data = {
//     "id": 1,
//     "uuid": "0abea96d-f156-4bf3-b876-85fddeab8618",
//     "user_id": 24,
//     "type": "",
//     "thumb_url": "https://files.fullstack.edu.vn/f8-tiktok/videos/1-6302686680ba6.jpg",
//     "file_url": "https://files.fullstack.edu.vn/f8-tiktok/videos/1-630268663e570.mp4",
//     "description": "đừng ai xem đến cuối =)))) ig: blmhuong",
//     "music": "",
//     "is_liked": false,
//     "likes_count": 17,
//     "comments_count": 14,
//     "shares_count": 0,
//     "views_count": 0,
//     "viewable": "public",
//     "allows": [
//         "comment"
//     ],
//     "published_at": "2022-08-22 00:16:22",
//     "created_at": "2022-08-22 00:16:22",
//     "updated_at": "2022-08-22 00:16:24",
//     "user": {
//         "id": 24,
//         "first_name": "Thanh",
//         "last_name": "Vương",
//         "nickname": "vuongf88",
//         "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/24/63086f1576895.png",
//         "bio": "✨ 1998 ✨\nVietnam 🇻🇳\nĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !",
//         "tick": true,
//         "is_followed": false,
//         "followings_count": 4,
//         "followers_count": 25,
//         "likes_count": 21,
//         "website_url": "https://fullstack.edu.vn/",
//         "facebook_url": "",
//         "youtube_url": "",
//         "twitter_url": "",
//         "instagram_url": ""
//     },
//     "meta": {
//         "file_size": 1452675,
//         "file_format": "mp4",
//         "mime_type": "video/mp4",
//         "playtime_string": "0:09",
//         "playtime_seconds": 8.892,
//         "bitrate": 1297088.6189833558,
//         "video": {
//             "dataformat": "quicktime",
//             "rotate": 0,
//             "resolution_x": 576,
//             "resolution_y": 1024,
//             "fourcc": "avc1",
//             "fourcc_lookup": "H.264/MPEG-4 AVC",
//             "frame_rate": 30
//         }
//     }
// };

function VideoPosterInfo({ dataUser }) {
    const urlVideoRef = useRef(null);

    const handleClickCopy = async () => {
        if (urlVideoRef.current) {
            try {
                await navigator.clipboard.writeText(urlVideoRef.current.innerText);
                toast('Đã sao chép liên kết', {
                    position: "top-center",
                    duration: 3000,
                    style: {
                        backgroundColor: "rgba(25, 25, 25, 0.8)",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "100%",
                    },
                    iconTheme: {
                        display: "none",
                    }
                })
            } catch (err) {
                console.error(err);
            }
        }
    }

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
                <Link to={`/@${dataUser?.user.nickname}`} className={cx('user-url')}>
                    <div className={cx('avatar')}>
                        <Image
                            className={cx('avatar-url')}
                            alt={dataUser?.user.nickname}
                            src={dataUser?.user.avatar}
                        />
                    </div>
                    <div className={cx('user-info')}>
                        <span className={cx('nickname')}>{dataUser?.user.nickname}</span>
                        <div className={cx('other-info')}>
                            <span className={cx('username')}>{`${dataUser?.user.first_name} ${dataUser?.user.last_name}`}</span>
                            {(dataUser?.user.first_name || dataUser?.user.last_name) && (
                                <span className={cx('seperate')}></span>
                            )}
                            <span>{dataUser?.updated_at.split(' ')[0]}</span>
                        </div>
                    </div>
                </Link>
                <Button primary className={cx('follow-btn')}>
                    Follow
                </Button>
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
                    <button onClick={handleExpandDesc}>
                        {isExpanded ? 'ẩn bớt' : 'thêm'}
                    </button>
                </h1>
                <Link to="/" className={cx('music-url')}>
                    <MusicNoteIcon className={cx('music-icon')} /> nhạc nền {dataUser?.music}
                </Link>
            </div>

            <div className={cx('action')}>
                {/* Action bar */}
                <div className={cx('action-bar')}>
                    <ActionBar data={dataUser} direction='horizontal' />
                </div>
    
                {/* Share */}
                <div className={cx('share-list')}>
                    <Tippy
                        content="Đăng lại"
                        placement="top"
                    >
                        <button className={cx('share-item')}>
                            <ReupIcon className={cx('reup-icon')} />
                        </button>
                    </Tippy>
                    <Tippy
                        content="Nhúng"
                        placement="top"
                    >
                        <button className={cx('share-item')}>
                            <TagIcon />
                        </button>
                    </Tippy>
                    <Tippy 
                        content="Chia sẻ với Facebook"
                        placement="top"
                    >
                        <button className={cx('share-item')}>
                            <FacebookIcon />
                        </button>
                    </Tippy >
                    <Tippy
                        content="Chia sẻ với WhatsApp"
                        placement="top"
                    >
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
                   {`https://www.mytiktok.com/video/${dataUser?.id}`}
                </p>
                <button onClick={handleClickCopy} className={cx('btn-copy')}>Sao chép liên kết</button>
                <Toaster />
            </div>
        </div>
    );
}

export default VideoPosterInfo;
