import classNames from 'classnames/bind';

import {
    HomeIcon,
    UserGroupIcon,
    LiveIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import config from '~/config';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For you"
                    to={config.routes.home}
                    icon={{ active: <HomeActiveIcon />, default: <HomeIcon /> }}
                />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={{
                        active: <UserGroupActiveIcon />,
                        default: <UserGroupIcon />,
                    }}
                />
                <MenuItem
                    title="LIVE"
                    to={config.routes.live}
                    icon={{ active: <LiveActiveIcon />, default: <LiveIcon /> }}
                />
            </Menu>
        </aside>
    );
}

export default Sidebar;
