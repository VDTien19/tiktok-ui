import { useState, useEffect, useCallback } from 'react';
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

const INIT_PAGE = 1;
const PER_PAGE = 5;

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
    const [numPage, setNumPage] = useState(INIT_PAGE);

    useEffect(() => {
        const fetchApi = async () => {
            const data = await userService.getSuggested({ page: numPage, perPage: PER_PAGE });
            setSuggestedUsers((prevUser) => [...prevUser, ...data]);
        };
        fetchApi();
    }, [numPage]);

    const handleSeeMore = useCallback(() => {
        setNumPage((prevPage) => prevPage + 1);
        console.log('page: ', numPage);
    }, [numPage])

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
            <SuggestedAccounts
                label="Suggest Accounts"
                data={suggestedUsers}
                onSeeMore={handleSeeMore}
            />
            <SuggestedAccounts label="Following Accounts" />
        </aside>
    );
}

export default Sidebar;
