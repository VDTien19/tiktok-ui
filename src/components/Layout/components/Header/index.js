import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCircleXmark,
    faCloudUpload,
    faCoins,
    faEllipsisVertical,
    faGear,
    faGlobe,
    faKeyboard,
    faMagnifyingGlass,
    faPaperPlane,
    faSignOut,
    faSpinner,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '../../../AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

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
    const [searchResult, setSearchResult] = useState([]);
    
    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

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

    const USER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@ntd.july'
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Coin',
            to: '/coin'
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/setting'
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true
        },
    ]
    
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="Tiktok" />
                <div>
                    <HeadlessTippy
                        visible={searchResult.length > 0}
                        interactive
                        render={(attrs) => (
                            <div
                                className={cx('search-result')}
                                tabIndex="-1"
                                {...attrs}
                            >
                                <PopperWrapper>
                                    <h4 className={cx('search-title')}>
                                        Accounts
                                    </h4>
                                    <AccountItem />
                                    <AccountItem />
                                    <AccountItem />
                                    <AccountItem />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('search')}>
                            <input
                                type="text"
                                placeholder="Search accounts and videos"
                                spellCheck={false}
                            />
                            <button className={cx('clear')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                            <FontAwesomeIcon
                                className={cx('loading')}
                                icon={faSpinner}
                            />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </HeadlessTippy>
                </div>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video" placement='bottom'>
                                <button>
                                    <FontAwesomeIcon className={cx('action-btn')} icon={faCloudUpload} />
                                </button>
                            </Tippy>
                            <button>
                                <FontAwesomeIcon className={cx('action-btn')} icon={faPaperPlane} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleChangeMenu}>
                        {currentUser ? (
                            <img
                                src="https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/433135275_1450921095831335_5022358092751087662_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHIxA9Z89oOZCqUTZdL-_3uTtNRzzeO5KBO01HPN47koHoA2-EpSKqte3uZJ3XrU7fm8aRK6ByG0DXylA0ypezT&_nc_ohc=DO3J2N_lQlsQ7kNvgGlDVzo&_nc_ht=scontent.fhph2-1.fna&_nc_gid=AejWfiZJ-YGJJvVnUB99mOq&oh=00_AYBe1AiuqyFdvOD72-AlygnGYmhBRtYaTD2y1GFIp9PbvA&oe=670D725C"
                                alt="Nguyễn Thùy Dương"
                                className={cx('user-avatar')}
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

// setTimeout(() => {
//     debugger;
// }, 5000)

export default Header;
