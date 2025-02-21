import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
import { FavoriteIconV2, ReupIconV2, ThreeVerticalLineIcon, HeartIconV2 } from "~/components/Icons";
import styles from './ProfileTab.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    { key: "videos", label: "Video", icon: <ThreeVerticalLineIcon className={cx('btn-icon')} width="2rem" /> },
    { key: "reposted", label: "Bài đăng lại", icon: <ReupIconV2 className={cx('btn-icon')} width="2rem" /> },
    { key: "favorite", label: "Yêu thích", icon: <FavoriteIconV2 className={cx('btn-icon')} width="2rem" /> },
    { key: "liked", label: "Đã thích", icon: <HeartIconV2 className={cx('btn-icon')} width="2rem" /> },
]

function ProfileTab({ activeTab, setTab }) {
    const [underlineStyle, setUnderlineStyle] = useState({});
    const tabRef = useRef([]);

    // Hàm cập nhật vị trí underline (dùng khi hover hoặc click)
    const updateUnderline = (index) => {
        if (tabRef.current[index]) {
            const { offsetLeft, offsetWidth } = tabRef.current[index];
            setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
        }
    };

    // Khi hover vào tab
    const handleHover = (index) => {
        updateUnderline(index);
    };

    // Khi bỏ hover -> underline trở về tab đang active
    const handleLeave = () => {
        const activeIndex = tabRef.current.findIndex(tab => tab.dataset.tab === activeTab);
        if (activeIndex !== -1) {
            updateUnderline(activeIndex);
        }
    };

    // Khi click vào tab -> cập nhật activeTab + underline ngay lập tức
    const handleClick = (key, index) => {
        setTab(key); // Cập nhật tab đang active
        updateUnderline(index); // Cập nhật underline ngay lập tức
    };

    // Khi component mount, set vị trí underline cho tab đang active
    useEffect(() => {
        handleLeave();
    }, [activeTab]); // Mỗi khi activeTab thay đổi, chạy lại handleLeave

    return (
        <div className={cx('wrapper')}>
            <div className={cx("underline")} style={underlineStyle} />

            {MENU_ITEMS.map((tab, index) => (
                <button
                    key={tab.key}
                    ref={(el) => (tabRef.current[index] = el)}
                    data-tab={tab.key}
                    className={cx({ active: activeTab === tab.key })}
                    onClick={() => handleClick(tab.key, index)}
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={handleLeave}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

export default ProfileTab;
