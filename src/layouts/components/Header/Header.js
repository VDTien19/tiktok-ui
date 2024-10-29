import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEllipsisVertical,
    faGear,
    faGlobe,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { MailboxIcon, UploadIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Images';
import Search from '../Search';
import config from '~/config';
import { useAuth } from '~/context/AuthContext';
import AuthModal from '~/components/AuthModal';

// classname có thể viết '-'
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faGlobe} />,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English', // United States, Canada, Australia, etc.
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt', // Vietnam
                    // children: {
                    //     title: 'Language',
                    //     data: [
                    //         {
                    //             code: 'vi-1',
                    //             title: 'Tiếng Việt 1'
                    //         },
                    //         {
                    //             code: 'vi-2',
                    //             title: 'Tiếng Việt 2',
                    //             children: {
                    //                 title: 'Language',
                    //                 data: [
                    //                     {
                    //                         code: 'vi-1',
                    //                         title: 'Tiếng Việt 2-1'
                    //                     },
                    //                     {
                    //                         code: 'vi-2',
                    //                         title: 'Tiếng Việt 2-2'
                    //                     },
                    //                 ]
                    //             }
                    //         },
                    //     ]
                    // }
                },
                {
                    type: 'language',
                    code: 'fi',
                    title: 'Suomi', // Finland
                },
                {
                    type: 'language',
                    code: 'no',
                    title: 'Norsk', // Norway
                },
                {
                    type: 'language',
                    code: 'se',
                    title: 'Svenska', // Sweden
                },
                {
                    type: 'language',
                    code: 'dk',
                    title: 'Dansk', // Denmark
                },
                {
                    type: 'language',
                    code: 'ch',
                    title: 'Schweizerdeutsch', // Switzerland (Swiss German)
                },
                {
                    type: 'language',
                    code: 'nl',
                    title: 'Nederlands', // Netherlands
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcut',
    },
];

function Header() {
    const { userData, isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const location = useLocation();

    if (isAuthenticated) {
        console.log('userData: ', userData);
        console.log("isAuthenticated: ", isAuthenticated);
    }

    // Handle logic
    const handleChangeMenu = (menuItem) => {
        // console.log(menuItem);
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const handleOpenForm = () => {
        setShowAuthModal(true);
    };

    let nickname;
    if(location.pathname !== userData?.nickname) {
        nickname = `@${userData?.nickname}`
    } else {
        nickname = '/profile'
    }
    // console.log('nickname: ', nickname);

    // const handleViewProfile = () => {
    //     console.log("Clicked !")
    //     if (location.pathname !== userData?.nickname) {
    //         navigate(`@${userData?.nickname}`);
    //     }
    // };

    const USER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: nickname,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Coin',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <Image src={images.logo} alt="Tiktok" />
                    </Link>
                    <div>
                        <Search />
                    </div>

                    <div className={cx('actions')}>
                        {isAuthenticated ? (
                            <>
                                <Tippy
                                    content="Upload video"
                                    placement="bottom"
                                >
                                    <button className={cx('action-btn')}>
                                        <UploadIcon
                                            className={cx('upload-icon')}
                                        />
                                    </button>
                                </Tippy>
                                <Tippy content="Mailbox" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <MailboxIcon
                                            className={cx('mailbox-icon')}
                                        />
                                    </button>
                                </Tippy>
                                <Tippy content="Inbox" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <InboxIcon
                                            className={cx('inbox-icon')}
                                        />
                                    </button>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <Button text>Upload</Button>
                                <Button primary onClick={handleOpenForm}>
                                    Log in
                                </Button>
                            </>
                        )}
                        {isAuthenticated && (
                            <Menu items={USER_MENU} onChange={handleChangeMenu} >
                                <Image
                                    src={userData?.avatar}
                                    alt={userData?.nickname}
                                    className={cx('user-avatar')}
                                />
                            </Menu>
                        )}
                        {!isAuthenticated && (
                            <Menu items={MENU_ITEMS} onChange={handleChangeMenu} >
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                    />
                                </button>
                            </Menu>
                        )}
                    </div>
                </div>
            </header>
            {showAuthModal && <AuthModal />}
        </>
    );
}

// setTimeout(() => {
//     debugger;
// }, 5000)

export default Header;
