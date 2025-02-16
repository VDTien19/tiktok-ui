import classNames from "classnames/bind";
import { useParams } from 'react-router-dom';

import styles from './ProfileHeader.module.scss';
import { useAuth } from "~/contexts/AuthContext";
import Image from "~/components/Images";
import Button from "~/components/Button";
import { UserFollowedIcon, ShareSolidIcon, ThreeDotIcon, SettingIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
function ProfileHeader() {
    const { nickname } = useParams();
    console.log("nickname", nickname.slice(1));

    const { userData } = useAuth();
    console.log("userData", userData);
    const owner = userData?.nickname === nickname.slice(1);
    console.log("owner", owner);

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <Image className={cx('avatar-img')} src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/b70a0230adec2382cff97656ff637219~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&nonce=8009&refresh_token=df58e4ef51cc92fc4e6d1c738937251c&x-expires=1739847600&x-signature=Dcw4USmLyCjts%2FZmrCvxEFLIHuQ%3D&idc=my&ps=13740610&shcp=81f88b70&shp=a5d48078&t=4d5b0474" />
            </div>
            <div className={cx('info')}>
                <div className={cx('name')}>
                    <h1 className={cx('username')}>tiennemix</h1>
                    <h2 className={cx('full-name')}>Vịt Tẩm Đá</h2>
                </div>
                <div className={cx('action')}>
                    {owner ? (
                        <div className={cx('action-list')}>
                            <Button primary className={cx('edit-profile-btn')}>Sửa hồ sơ</Button>
                            <Button className={cx('post-adv')}>Quảng bá bài đăng</Button>
                            <button className={cx('setting-btn')}><SettingIcon /></button>
                            <button className={cx('share-btn')}><ShareSolidIcon /></button>
                        </div>
                    ) : (
                        <div className={cx('action-list')}>
                            <Button className={cx('follow-btn')}>
                                <span>
                                    <UserFollowedIcon />
                                    <p className={cx('follow-btn-text')}>Đang Follow</p>
                                </span>
                            </Button>
                            <Button className={cx('message-btn')}>Tin nhắn</Button>
                            <button className={cx('share-btn')}><ShareSolidIcon /></button>
                            <button className={cx('three-dot-btn')}><ThreeDotIcon width='2rem' /></button>
                        </div>
                    )}
                </div>
                <div className={cx('action-bar')}>
                    <div className={cx('following')}>
                        <p className={cx('following-count')}>1.2K</p>
                        <p className={cx('following-text')}>Đang Follow</p>
                    </div>
                    <div className={cx('follower')}>
                        <p className={cx('follower-count')}>1.2K</p>
                        <p className={cx('follower-text')}>Follower</p>
                    </div>
                    <div className={cx('like')}>
                        <p className={cx('like-count')}>1.2K</p>
                        <p className={cx('like-text')}>Thích</p>
                    </div>
                </div>
                <div className={cx('bio')}>
                    <p className={cx('bio-text')}>Tôi là một người yêu thích âm nhạc và </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;