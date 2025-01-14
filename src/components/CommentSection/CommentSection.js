import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import CommentList from '~/components/CommentList';
import CommentForm from '~/components/CommentForm';
import styles from './CommentSection.module.scss'

const cx = classNames.bind(styles)

const dataComments = [
    {
        "id": 3654,
        "comment": "Vừa nhặt được câu chuyện làm tóc đầu năm,ông em kia ra đòi cắt và ép side form hàn hết 260🌿,về mẹ hỏi tl làm sao đó bà mẹ ra gank cả tiệm,haiz!!!#juicebarbershop #juiceacademy #xuhuong",
        "likes_count": 0,
        "is_liked": false,
        "created_at": "2023-11-12 15:52:19",
        "updated_at": "2023-11-12 15:52:19",
        "user": {
            "id": 8,
            "first_name": "Sơn",
            "last_name": "Ko Đập Trai Lắm",
            "nickname": "sondnf8",
            "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/8/65564e989e190.jpg",
            "bio": "hehehe...hi",
            "tick": false,
            "is_followed": false,
            "followings_count": 26,
            "followers_count": 172,
            "likes_count": 29,
            "date_of_birth": "2003-04-06",
            "website_url": "https://fullstack.edu.vn/test",
            "facebook_url": "",
            "youtube_url": "",
            "twitter_url": "",
            "instagram_url": ""
        }
    },
    {
        "id": 3653,
        "comment": "ádas",
        "likes_count": 0,
        "is_liked": false,
        "created_at": "2023-11-12 15:52:05",
        "updated_at": "2023-11-12 15:52:05",
        "user": {
            "id": 8,
            "first_name": "Sơn",
            "last_name": "Ko Đập Trai Lắm",
            "nickname": "sondnf8",
            "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/8/65564e989e190.jpg",
            "bio": "hehehe...hi",
            "tick": false,
            "is_followed": false,
            "followings_count": 26,
            "followers_count": 172,
            "likes_count": 29,
            "date_of_birth": "2003-04-06",
            "website_url": "https://fullstack.edu.vn/test",
            "facebook_url": "",
            "youtube_url": "",
            "twitter_url": "",
            "instagram_url": ""
        }
    },
    {
        "id": 3645,
        "comment": "123",
        "likes_count": 0,
        "is_liked": false,
        "created_at": "2023-11-01 21:28:57",
        "updated_at": "2023-11-01 21:28:57",
        "user": {
            "id": 8,
            "first_name": "Sơn",
            "last_name": "Ko Đập Trai Lắm",
            "nickname": "sondnf8",
            "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/8/65564e989e190.jpg",
            "bio": "hehehe...hi",
            "tick": false,
            "is_followed": false,
            "followings_count": 26,
            "followers_count": 172,
            "likes_count": 29,
            "date_of_birth": "2003-04-06",
            "website_url": "https://fullstack.edu.vn/test",
            "facebook_url": "",
            "youtube_url": "",
            "twitter_url": "",
            "instagram_url": ""
        }
    },
    {
        "id": 3644,
        "comment": "Nv",
        "likes_count": 0,
        "is_liked": false,
        "created_at": "2023-11-01 19:43:43",
        "updated_at": "2023-11-01 19:43:43",
        "user": {
            "id": 8,
            "first_name": "Sơn",
            "last_name": "Ko Đập Trai Lắm",
            "nickname": "sondnf8",
            "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/8/65564e989e190.jpg",
            "bio": "hehehe...hi",
            "tick": false,
            "is_followed": false,
            "followings_count": 26,
            "followers_count": 172,
            "likes_count": 29,
            "date_of_birth": "2003-04-06",
            "website_url": "https://fullstack.edu.vn/test",
            "facebook_url": "",
            "youtube_url": "",
            "twitter_url": "",
            "instagram_url": ""
        }
    },
    {
        "id": 3641,
        "comment": "Ac",
        "likes_count": 0,
        "is_liked": false,
        "created_at": "2023-11-01 01:33:16",
        "updated_at": "2023-11-01 01:33:16",
        "user": {
            "id": 8,
            "first_name": "Sơn",
            "last_name": "Ko Đập Trai Lắm",
            "nickname": "sondnf8",
            "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/8/65564e989e190.jpg",
            "bio": "hehehe...hi",
            "tick": false,
            "is_followed": false,
            "followings_count": 26,
            "followers_count": 172,
            "likes_count": 29,
            "date_of_birth": "2003-04-06",
            "website_url": "https://fullstack.edu.vn/test",
            "facebook_url": "",
            "youtube_url": "",
            "twitter_url": "",
            "instagram_url": ""
        }
    },
    {
        "id": 3638,
        "comment": "ffd",
        "likes_count": 0,
        "is_liked": false,
        "created_at": "2023-11-01 01:28:08",
        "updated_at": "2023-11-01 01:28:08",
        "user": {
            "id": 8,
            "first_name": "Sơn",
            "last_name": "Ko Đập Trai Lắm",
            "nickname": "sondnf8",
            "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/8/65564e989e190.jpg",
            "bio": "hehehe...hi",
            "tick": false,
            "is_followed": false,
            "followings_count": 26,
            "followers_count": 172,
            "likes_count": 29,
            "date_of_birth": "2003-04-06",
            "website_url": "https://fullstack.edu.vn/test",
            "facebook_url": "",
            "youtube_url": "",
            "twitter_url": "",
            "instagram_url": ""
        }
    },
    {
        "id": 3637,
        "comment": "asd",
        "likes_count": 0,
        "is_liked": false,
        "created_at": "2023-11-01 01:28:04",
        "updated_at": "2023-11-01 01:28:04",
        "user": {
            "id": 8,
            "first_name": "Sơn",
            "last_name": "Ko Đập Trai Lắm",
            "nickname": "sondnf8",
            "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/8/65564e989e190.jpg",
            "bio": "hehehe...hi",
            "tick": false,
            "is_followed": false,
            "followings_count": 26,
            "followers_count": 172,
            "likes_count": 29,
            "date_of_birth": "2003-04-06",
            "website_url": "https://fullstack.edu.vn/test",
            "facebook_url": "",
            "youtube_url": "",
            "twitter_url": "",
            "instagram_url": ""
        }
    },
    {
        "id": 3636,
        "comment": "123",
        "likes_count": 0,
        "is_liked": false,
        "created_at": "2023-11-01 01:28:02",
        "updated_at": "2023-11-01 01:28:02",
        "user": {
            "id": 8,
            "first_name": "Sơn",
            "last_name": "Ko Đập Trai Lắm",
            "nickname": "sondnf8",
            "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/8/65564e989e190.jpg",
            "bio": "hehehe...hi",
            "tick": false,
            "is_followed": false,
            "followings_count": 26,
            "followers_count": 172,
            "likes_count": 29,
            "date_of_birth": "2003-04-06",
            "website_url": "https://fullstack.edu.vn/test",
            "facebook_url": "",
            "youtube_url": "",
            "twitter_url": "",
            "instagram_url": ""
        }
    },
    {
        "id": 3635,
        "comment": "abc",
        "likes_count": 0,
        "is_liked": false,
        "created_at": "2023-11-01 01:27:56",
        "updated_at": "2023-11-01 01:27:56",
        "user": {
            "id": 8,
            "first_name": "Sơn",
            "last_name": "Ko Đập Trai Lắm",
            "nickname": "sondnf8",
            "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/8/65564e989e190.jpg",
            "bio": "hehehe...hi",
            "tick": false,
            "is_followed": false,
            "followings_count": 26,
            "followers_count": 172,
            "likes_count": 29,
            "date_of_birth": "2003-04-06",
            "website_url": "https://fullstack.edu.vn/test",
            "facebook_url": "",
            "youtube_url": "",
            "twitter_url": "",
            "instagram_url": ""
        }
    },
    {
        "id": 3617,
        "comment": "Aa",
        "likes_count": 0,
        "is_liked": false,
        "created_at": "2023-10-31 19:02:10",
        "updated_at": "2023-10-31 19:02:10",
        "user": {
            "id": 8,
            "first_name": "Sơn",
            "last_name": "Ko Đập Trai Lắm",
            "nickname": "sondnf8",
            "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/8/65564e989e190.jpg",
            "bio": "hehehe...hi",
            "tick": false,
            "is_followed": false,
            "followings_count": 26,
            "followers_count": 172,
            "likes_count": 29,
            "date_of_birth": "2003-04-06",
            "website_url": "https://fullstack.edu.vn/test",
            "facebook_url": "",
            "youtube_url": "",
            "twitter_url": "",
            "instagram_url": ""
        }
    },
]
function CommentSection() {
    return (  
        <div className={cx('wrapper')}>
            <header className={cx('header')}>Bình luận ({dataComments.length})</header>
            <div className={cx('content')}>
                {/* <div className={cx('comment-list')}></div> */}
                <CommentList comments={dataComments} />
            </div>
            <div className={cx('comment-form')}>
                <CommentForm />
            </div>
        </div>
    );
}

export default CommentSection;