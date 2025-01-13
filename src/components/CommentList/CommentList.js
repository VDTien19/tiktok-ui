import classNames from "classnames/bind";

import CommentItem from "~/components/CommentItem";
import styles from './CommentList.module.scss';

const cx = classNames.bind(styles)
function CommentList({ comments }) {
    return (  
        <div className={cx('wrapper')}>
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

export default CommentList;