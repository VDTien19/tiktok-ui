import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon }) {
    return (
        <NavLink
            to={to}
            className={(navData) => cx('menu-item', { active: navData.isActive })}
        >
            {/* isActive là một giá trị do React Router cung cấp thông qua callback */}
            {({ isActive }) => (
                <>
                    <div className={cx('icon')}>
                        {isActive ? icon.active : icon.default}
                    </div>
                    <span className={cx('title')}>{title}</span>
                </>
            )}
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.shape({
        active: PropTypes.node.isRequired,
        default: PropTypes.node.isRequired,
    }).isRequired,
};

export default MenuItem;
