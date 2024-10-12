import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {}
// Gán onChange mặc định là defaultFn để khi Comp ở ngoài không truyền vào thì sẽ không bị lỗi

function Menu({ children, items = [], onChange = defaultFn }) {
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

    return (
        <Tippy
            interactive
            delay={[0, 500]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) =>
                                        prev.slice(0, prev.length - 1),
                                    ); // Xóa phần tử cuối (lúc nào current cũng ở phần tử cuối, nên chỉ cần xóa phần tử cuối thì sẽ lên ptu tiếp theo)
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
