import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import {
    HomeIcon,
    FollowIcon,
    LiveIcon,
    HomeActiveIcon,
    FollowActiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import config from '~/config';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        title: 'For you',
        to: config.routes.home,
        icon: {
            active: <HomeActiveIcon />,
            default: <HomeIcon />,
        },
    },
    {
        title: 'Following',
        to: config.routes.following,
        icon: {
            active: <FollowActiveIcon className={cx('follow-icon')} />,
            default: <FollowIcon className={cx('follow-icon')} />,
        },
    },
    {
        title: 'LIVE',
        to: config.routes.live,
        icon: {
            active: <LiveActiveIcon />,
            default: <LiveIcon />,
        },
    },
];

function Sidebar() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page:1, perPage:5 })
            .then((data) => {
                setSuggestedUsers(data)
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                {MENU_ITEMS.map((item, index) => (
                    <MenuItem
                        key={index}
                        title={item.title}
                        to={item.to}
                        icon={item.icon}
                    />
                ))}
            </Menu>
            <SuggestedAccounts label="Suggest Accounts" data={suggestedUsers} />
            <SuggestedAccounts label="Following Accounts" />
        </aside>
    );
}

export default Sidebar;
