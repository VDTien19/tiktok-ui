import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import CommentList from '~/components/CommentList';
import CommentForm from '~/components/CommentForm';
import styles from './CommentSection.module.scss'

const cx = classNames.bind(styles)

function CommentSection({ dataComment }) {
    console.log("Comment: " + dataComment);

    if (!Array.isArray(dataComment) || dataComment.length === 0) {
        return (
            <div>
                <p>Hãy là người đầu tiên bình luận video này.</p>
                <div className={cx('comment-form')}>
                    <CommentForm />
                </div>
            </div>
        )
    }

    return (  
        <div className={cx('wrapper')}>
            <header className={cx('header')}>Bình luận ({dataComment?.length})</header>
            <div className={cx('content')}>
                {/* <div className={cx('comment-list')}></div> */}
                <CommentList comments={dataComment} />
            </div>
            <div className={cx('comment-form')}>
                <CommentForm />
            </div>
        </div>
    );
}

export default CommentSection;