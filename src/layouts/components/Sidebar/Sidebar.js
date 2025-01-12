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

import { useAuth } from '~/contexts/AuthContext';
import config from '~/config';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';
import * as followServices from '~/services/followServices';

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
    const { isAuthenticated } = useAuth();

    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [numPageSuggested, setNumPageSuggested] = useState(INIT_PAGE);
    const [numPageFollowing, setNumPageFollowing] = useState(INIT_PAGE);

    useEffect(() => {
        const fetchApi = async () => {
            const data = await userService.getSuggested({
                page: numPageSuggested,
                perPage: PER_PAGE,
            });
            const filteredUsers = data.filter(user => user.is_followed === false)
            setSuggestedUsers((prevUser) => [...prevUser, ...filteredUsers]);
        };
        fetchApi();
    }, [numPageSuggested]);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchFollowingUsers = async () => {
                const data = await followServices.getFollowing({
                    page: numPageFollowing,
                    perPage: PER_PAGE,
                });
                setFollowingUsers((prevUser) => [...prevUser, ...data]);
            };
            fetchFollowingUsers();
        }
    }, [isAuthenticated, numPageFollowing]);

    const handleSeeMoreSuggested = useCallback(() => {
        setNumPageSuggested((prevPage) => prevPage + 1);
    }, []);

    const handleSeeMoreFollowing = useCallback(() => {
        setNumPageFollowing((prevPage) => prevPage + 1);
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
            <SuggestedAccounts
                label="Suggest Accounts"
                data={suggestedUsers}
                onSeeMore={handleSeeMoreSuggested}
            />
            {isAuthenticated && (
                <SuggestedAccounts
                    label="Following Accounts"
                    data={followingUsers}
                    onSeeMore={handleSeeMoreFollowing}
                />
            )}
        </aside>
    );
}

export default Sidebar;
