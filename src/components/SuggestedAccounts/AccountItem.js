// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './SuggestedAccounts.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data }) {

    const renderPreview = (attrs) => {
        return (
            <div tabIndex="-1" {...attrs} >
                <PopperWrapper>
                    <AccountPreview/>
                </PopperWrapper>
            </div>
        )
    }

    return (
        <div>
            <Tippy
                interactive
                delay={[800, 0]}
                offset={[-5, 0]}
                placement='bottom'
                render={renderPreview}
            >
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/464558306_864790569146516_1294670142566699772_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFOnqsyp94cFhcRJuFhVq2u4SL92JdARbPhIv3Yl0BFs3OPbGWXddfxpn6411Gh-lA&_nc_ohc=FKjatmHyk8IQ7kNvgHtqa8l&_nc_zt=23&_nc_ht=scontent.fhph2-1.fna&_nc_gid=Ahayc59cNyL1tFnXbjs0dAS&oh=00_AYBRw4X7O_1_xvgVrjlteNmi-JjFKWo2yTrP-v7kMefHYw&oe=671FB2CA"
                        alt=""
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>quocnguyenphu</strong>
                            <FontAwesomeIcon
                                className={cx('check')}
                                icon={faCheckCircle}
                            />
                        </p>
                        <p className={cx('name')}>Quốc Nguyễn Phú</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

// AccountItem.propTypes = {};

export default AccountItem;
