import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { useState, useRef } from 'react';

import styles from './CommentForm.module.scss';
import { MentionIcon, EmojiIcon } from '~/components/Icons';
import { createComment } from '~/services/commentServices'

const cx = classNames.bind(styles);
function CommentForm({ idVideo, refetchComments }) {
    const inputRef = useRef(null);

    const [commentValue, setCommentValue] = useState('');
    const [activeButton, setActiveButton] = useState(false);

    const handleChange = (e) => {
        const commentValue = e.target.value;
        
        if(!commentValue.startsWith(' ')) {
            setCommentValue(commentValue);
            setActiveButton(true);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(inputRef.current.value === '') {
            inputRef.current.focus();
            return;
        }
        try {
            await createComment(idVideo, commentValue);
            if(inputRef.current) {
                inputRef.current.focus();
                setCommentValue('');
                setActiveButton(false);
            }
            console.log('Comment successfully');
            await refetchComments();
        } catch (e) {
            console.log(e);
        }
        // console.log("Comment: " + commentValue);
    }

    // const prevHandleSubmit = (e) => {
    //     e.preventDefault();
    //     if(inputRef.current.value !== '') {
    //         handleSubmit(e)
    //     }
    // };  

    return (
        <div className={cx('wrapper')}>
            <form
                className={cx('form-group')}
                onSubmit={handleSubmit}
            >
                <div className={cx('comment-content')}>
                    <input
                        ref={inputRef}
                        className={cx('input')}
                        type="text"
                        placeholder="Thêm bình luận..."
                        value={commentValue}
                        onChange={handleChange}
                    />
                    <div className={cx('option')}>
                        <Tippy
                            content="Dùng ký hiệu '@' để gắn thẻ một người dùng"
                            placement="top"
                        >
                            <div className={cx('mention')}>
                                <MentionIcon />
                            </div>
                        </Tippy>
                        <Tippy placement="top" content="Nhấp để thêm Emoji">
                            <div className={cx('emoji')}>
                                <EmojiIcon />
                            </div>
                        </Tippy>
                    </div>
                </div>
                <button className={cx('submit-btn', {'btn-active': activeButton})} type="submit">
                    Đăng
                </button>
            </form>
        </div>
    );
}

export default CommentForm;
