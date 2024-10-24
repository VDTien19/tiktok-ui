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
            active: <FollowActiveIcon className={cx('follow-icon')}  />,
            default: <FollowIcon className={cx('follow-icon')}  />,
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
            <SuggestedAccounts label='Suggest Accounts' />
            <SuggestedAccounts label='Folling Accounts' />
        </aside>
    );
}

export default Sidebar;
