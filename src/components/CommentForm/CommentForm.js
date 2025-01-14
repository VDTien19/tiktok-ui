import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import styles from './CommentForm.module.scss'
import { MentionIcon, EmojiIcon } from '~/components/Icons';

const cx = classNames.bind(styles)
function CommentForm() {
    return (  
        <div className={cx('wrapper')}>
            <form className={cx('form-group')} onSubmit={e => e.preventDefault()}>
                <div className={cx('comment-content')}>
                    <input className={cx('input')} type="text" placeholder='Thêm bình luận...' />
                    <div className={cx('option')}>
                        <Tippy
                            content="Dùng ký hiệu '@' để gắn thẻ một người dùng"
                            placement="top"
                        >
                            <div className={cx('mention')}>
                                <MentionIcon />
                            </div>
                        </Tippy>
                        <Tippy
                            placement='top'
                            content='Nhấp để thêm Emoji'
                        >
                            <div className={cx('emoji')}>
                                <EmojiIcon />
                            </div>
                        </Tippy>
                    </div>
                </div>
                <button className={cx('submit-btn')} type='submit'>Đăng</button>
            </form>
        </div>
    );
}

export default CommentForm;