import { useState, useRef } from 'react';
import classNames from "classnames/bind";

import styles from './EditProfileForm.module.scss';
import Modal from '~/components/Modal';
import Image from '~/components/Images';
import { EditIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
function EditProfileForm({ isOpen, onClose }) {
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (  
        <Modal title='Sửa hồ sơ' partition isOpen={isOpen} onClose={onClose}>
            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <div className={cx('form-group', 'avatar')}>
                        <span className={cx('label')}>Ảnh hồ sơ</span>
                        <div className={cx('content')}>
                            <div className={cx('image')}>
                                <Image className={cx('image-url')} src='https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/b70a0230adec2382cff97656ff637219~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&nonce=6724&refresh_token=9d0606b786b0115bfa0d41c336f5185b&x-expires=1740380400&x-signature=PMBQm9657y%2Fat4nfpsYcBctYXeY%3D&idc=my&ps=13740610&shcp=81f88b70&shp=a5d48078&t=4d5b0474' />
                                <button className={cx('edit-btn')} onClick={handleButtonClick}>
                                    <EditIcon className={cx('edit-icon')} width='1.8rem' height='1.8rem' />
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        onChange={(e) => console.log("File selected:", e.target.files[0])}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <span className={cx('label')}>TikTok ID</span>
                        <div className={cx('content')}>
                            <p className={cx('nickname')}>
                                <input type="text" value='tienne' />
                            </p>
                            <p className={cx('url-profile')}>www.tiktok.com/@tiennemix</p>
                            <p className={cx('note')}>TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. Khi thay đổi TikTok ID, liên kết hồ sơ của bạn cũng sẽ thay đổi.</p>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <span className={cx('label')}>Tên</span>
                        <div className={cx('content')}>
                            <p className={cx('full-name')}>
                                <input type="text" value='Vịt Tẩm Đá' />
                            </p>
                            <p className={cx('note')}>Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần. Bạn có thể tiếp tục thay đổi biệt danh sau ngày Feb 23, 2025.</p>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <span className={cx('label')}>Tiểu sử</span>
                        <div className={cx('content')}>
                            <textarea className={cx('bio')} name="" id="" placeholder='Tiểu sử...' value='Sô cô la: Music From Ninh Bình Mua - Đặt nhạc liên hệ: 0942.852.933' />
                        </div>
                    </div>
                    {/* <div className={cx('form-group')}>
                        <label className={cx('label')}>Ngày sinh</label>
                        <div className={cx('content')}>
                            <input type="date" value='01-09-2003' />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('label')}>Giới tính</label>
                        <div className={cx('content')}>
                            <input type="radio" value='Nam' />
                            <input type="radio" value='Nữ' />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('label')}>Trang Web</label>
                        <div className={cx('content')}>
                            <p></p>
                        </div>
                    </div> */}
                    <div className={cx('footer')}>
                        <button className={cx('cancel-btn')}>
                            Hủy
                        </button>
                        <button className={cx('save-btn', 'active')}>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default EditProfileForm;