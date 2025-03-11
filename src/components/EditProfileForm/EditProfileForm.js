import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-hot-toast';

import styles from './EditProfileForm.module.scss';
import Modal from '~/components/Modal';
import Image from '~/components/Images';
import { EditIcon } from '~/components/Icons';
import { useAuth } from '~/contexts/AuthContext';
import { updateUser } from '~/services/authServices';

const cx = classNames.bind(styles);
function EditProfileForm({ isOpen, onClose }) {
    const { userData } = useAuth();

    const fileInputRef = useRef(null);

    const [editData, setEditData] = useState({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        bio: userData.bio || '',
        avatar: userData.avatar || '',
    });

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);

            setEditData((prev) => ({ ...prev, avatar: imgUrl }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const res = await updateUser(
                editData.first_name,
                editData.last_name,
                editData.avatar,
                editData.bio
            );

            if (res) {
                onClose();
                toast('Cập nhật thành công.', {
                    position: 'top-center',
                    duration: 3000,
                    style: {
                        backgroundColor: 'rgba(25, 25, 25, 0.8)',
                        color: '#fff',
                        fontWeight: 'italic',
                        width: '100%',
                    },
                    iconTheme: {
                        display: 'none',
                    },
                });
            }
        } catch (e) {
            console.error("Lỗi cập nhật profile: " + e)
        }
    };

    return (
        <Modal title="Sửa hồ sơ" partition isOpen={isOpen} onClose={onClose}>
            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <div className={cx('form-group', 'avatar')}>
                        <span className={cx('label')}>Ảnh hồ sơ</span>
                        <div className={cx('content')}>
                            <div className={cx('image')}>
                                <Image
                                    className={cx('image-url')}
                                    src={editData.avatar || ''}
                                />
                                {/* <img className={cx('image-url')} src={editData.avatar || ''} alt={userData.nickname} /> */}
                                <button
                                    className={cx('edit-btn')}
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <EditIcon
                                        className={cx('edit-icon')}
                                        width="1.8rem"
                                        height="1.8rem"
                                    />
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        id="fileInput"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleChangeAvatar}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <span className={cx('label')}>TikTok ID</span>
                        <div className={cx('content')}>
                            <p className={cx('nickname')}>
                                <input
                                    readOnly
                                    type="text"
                                    value={userData.nickname}
                                />
                            </p>
                            <p
                                className={cx('url-profile')}
                            >{`www.tiktok.com/@${userData.nickname}`}</p>
                            <p className={cx('note')}>
                                TikTok ID chỉ có thể bao gồm chữ cái, chữ số,
                                dấu gạch dưới và dấu chấm. Khi thay đổi TikTok
                                ID, liên kết hồ sơ của bạn cũng sẽ thay đổi.
                            </p>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <span className={cx('label')}>Tên</span>
                        <div className={cx('content')}>
                            <p className={cx('full-name')}>
                                <div className={cx('first-name')}>
                                    <span>Họ: </span>
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        name="first_name"
                                        value={editData.first_name}
                                    />
                                </div>
                                <div className={cx('last-name')}>
                                    <span>Tên: </span>
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        name="last_name"
                                        value={editData.last_name}
                                    />
                                </div>
                            </p>
                            <p className={cx('note')}>
                                Bạn chỉ có thể thay đổi biệt danh 7 ngày một
                                lần.
                            </p>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <span className={cx('label')}>Tiểu sử</span>
                        <div className={cx('content')}>
                            <textarea
                                onChange={handleInputChange}
                                className={cx('bio')}
                                name="bio"
                                placeholder="Tiểu sử..."
                                value={editData.bio}
                            />
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
                        <button onClick={onClose} className={cx('cancel-btn')}>
                            Hủy
                        </button>
                        <button onClick={handleSave} className={cx('save-btn', 'active')}>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default EditProfileForm;
