import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './SuggestedAccounts.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';
import Image from '~/components/Images'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ data }) {

    const renderPreview = (attrs) => {
        return (
            <div tabIndex="-1" {...attrs} >
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        )
    }

    return (
        <div>
            <Tippy
                interactive
                delay={[800, 0]}
                offset={[45, 0]}
                placement='bottom'
                render={renderPreview}
                appendTo={document.body}
            >
                <Link to={`/@${data.nickname}`}>
                    <div className={cx('account-item')}>
                        <Image
                            className={cx('avatar')}
                            src={data.avatar}
                            alt={data.nickname}
                            fallback="https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338429_1280.png"
                        />
                        <div className={cx('item-info')}>
                            <p className={cx('nickname')}>
                                <strong>{data.nickname}</strong>
                                {data.tick && (
                                    <FontAwesomeIcon
                                        className={cx('check')}
                                        icon={faCheckCircle}
                                    />
                                )}
                            </p>
                            <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                        </div>
                    </div>
                </Link>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountItem;
