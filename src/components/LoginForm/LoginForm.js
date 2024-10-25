import classNames from 'classnames/bind';

import Modal from '~/components/Modal';
import styles from './Login.module.scss';
import { useState } from 'react';
import Button from '~/components/Button';
import * as authLogin from '~/services/authServices';

const cx = classNames.bind(styles);

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleLoginSuccess = () => {
        setUsername('');
        setPassword('');
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authLogin.login(username, password);
            console.log('Login successful:', response);

            if (response && response.meta.token) {
                localStorage.setItem('token', response.meta.token);
            }

            handleLoginSuccess();
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error('Login error:', err);
        }
    };

    return (
        <Modal isOpen={isModalOpen} onClose={handleClose}>
            <div className={cx('wrapper')}>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <h2 className={cx('title')}>Đăng nhập vào Tiktok</h2>

                    <div className={cx('input-group')}>
                        <input
                            className={cx('input-group_input')}
                            type="text"
                            id="email"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label
                            htmlFor="email"
                            className={cx('input-group_label')}
                        >
                            Email address
                        </label>
                    </div>

                    <div className={cx('input-group')}>
                        <input
                            className={cx('input-group_input')}
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            htmlFor="password"
                            className={cx('input-group_label')}
                        >
                            Password
                        </label>
                    </div>

                    {error && <p className={cx('error')}>Invalid Email or Password. Please try again!</p>}

                    <Button
                        outline={!!username && !!password}
                        disable={!username || !password}
                    >
                        Login
                    </Button>
                </form>
            </div>

            <div className={cx('footer')}>
                <p>Don't have an account? <strong className={cx('sign-up')}>Sign up</strong> </p> 
            </div>

        </Modal>
    );
}

export default LoginForm;
