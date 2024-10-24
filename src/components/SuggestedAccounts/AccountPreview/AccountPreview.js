import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    src="https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/464558306_864790569146516_1294670142566699772_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFOnqsyp94cFhcRJuFhVq2u4SL92JdARbPhIv3Yl0BFs3OPbGWXddfxpn6411Gh-lA&_nc_ohc=FKjatmHyk8IQ7kNvgHtqa8l&_nc_zt=23&_nc_ht=scontent.fhph2-1.fna&_nc_gid=Ahayc59cNyL1tFnXbjs0dAS&oh=00_AYBRw4X7O_1_xvgVrjlteNmi-JjFKWo2yTrP-v7kMefHYw&oe=671FB2CA"
                    alt=""
                    className={cx('avatar')}
                />
                <Button className={cx('follow-btn')} primary>Follow</Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>quocnguyenphu</strong>
                    <FontAwesomeIcon
                        className={cx('check')}
                        icon={faCheckCircle}
                    />
                </p>
                <p className={cx('name')}>Quốc Nguyễn Phú</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>8.2M</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>8.2M</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
