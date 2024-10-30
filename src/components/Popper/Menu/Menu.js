import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};
// Gán onChange mặc định là defaultFn để khi Comp ở ngoài không truyền vào thì sẽ không bị lỗi

function Menu({
    children,
    items = [],
    hideOnClick = false,
    onChange = defaultFn,
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    // current là phần tử cuối, chúng ta sẽ làm theo logic mảng, tất cả phần tử cấp 1 gom vào 1 ptu trong mảng, cấp 2 gom vào ptu thứ 2 ....
    // console.log(current.data);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children; // Convert item sang dạng boolean để kiểm tra xem item có con hay không
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (item.onClick) {
                            item.onClick();
                        }
                        if (isParent) {
                            // console.log(item.children);
                            setHistory((prev) => [...prev, item.children]); // prev để giữ lại các item cha (mảng đầu tiên gồm: lang, help, keyboard)
                        } else {
                            onChange(item); // item là phần tử con
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) =>
            prev.slice(0, prev.length - 1),
        ); // Xóa phần tử cuối (lúc nào current cũng ở phần tử cuối, nên chỉ cần xóa phần tử cuối thì sẽ lên ptu tiếp theo)
    }

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && (
                    <Header
                        title={current.title}
                        onBack={handleBack}
                    />
                )}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    // Reset to first page
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            interactive
            hideOnClick={hideOnClick}
            delay={[0, 700]}
            offset={[8, 14]} // ngang, cao
            placement="bottom-end"
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
