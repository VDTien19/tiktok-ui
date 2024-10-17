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

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { MailboxIcon, UploadIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Images'
import Search from '../Search'

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
    const currentUser = true;

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
                    <Search />
                </div>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video" placement='bottom'>
                                <button className={cx('action-btn')}>
                                    <UploadIcon className={cx('upload-icon')} />
                                </button>
                            </Tippy>
                            <Tippy content="Mailbox" placement='bottom'>
                                <button className={cx('action-btn')}>
                                    <MailboxIcon className={cx('mailbox-icon')} />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement='bottom'>
                                <button className={cx('action-btn')}>
                                    <InboxIcon className={cx('inbox-icon')} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleChangeMenu}>
                        {currentUser ? (
                            <Image
                                src="https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/441510897_1485238849066226_7390159272317637928_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH_qkO8Ptt1hqtIVvhqQ-LdbsogqlNzjHNuyiCqU3OMc0T1n1ck94blkUITMx3RjyIOwxar1Aqr-kE88iil2uWf&_nc_ohc=s5PrlNnUd_AQ7kNvgHmpLvQ&_nc_zt=23&_nc_ht=scontent.fhan3-2.fna&_nc_gid=ACanW4k9tfF8IOiy9sDGNKX&oh=00_AYAUZoalGliyPJ-XCt0TW6CkQ2foaIn848OaF8cs5frYyA&oe=67145FF9"
                                alt="Nguyễn Thùy Dương"
                                className={cx('user-avatar')}
                                fallback='https://scontent.fhph1-2.fna.fbcdn.net/v/t39.30808-6/462716938_1063431158555320_3980149353593334452_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHCcrNBzjLZ62GnDF6e5j0wcKkEniPo_4BwqQSeI-j_gLi8LbBzEscgbcpluaiwbwrULZS99JtCnTwBNzwuN-gv&_nc_ohc=vCEc0Iw0oPwQ7kNvgGauAUn&_nc_ht=scontent.fhph1-2.fna&_nc_gid=AKKxE-S48SskLkbUgNAaucm&oh=00_AYA4PbhsDTdJlZvmAKfabgNlufBgJo31wMIbBnQUP0aenA&oe=6716B9E3'
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
