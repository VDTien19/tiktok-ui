import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import styles from './Register.module.scss';
import { useState } from 'react';
import Button from '~/components/Button';
import * as authRegister from '~/services/authServices';

import { useAuth } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

function RegisterForm({ onClose, switchToLogin }) {
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleRegisterSuccess = async () => {
        try {
            const isSuccess = await login(username, password);
            
            if (isSuccess) {
                toast('Đăng ký thành công.', {
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
                setUsername('');
                setPassword('');
                onClose();
            }
        } catch (error) {
            setError(error.message);
            console('>>> Register error: ', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authRegister.register(username, password);
            console.log('Register successful:', response);

            if (response && response.meta.token) {
                localStorage.setItem('token', response.meta.token);
            }

            handleRegisterSuccess();

            navigate('/');
        } catch (err) {
            setError('Failed to register. Please check your credentials.');
            console.error('Register error:', err);
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <h2 className={cx('title')}>Tạo tài khoản với Tiktok</h2>

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

                    {error && (
                        <p className={cx('error')}>
                            Invalid Email or Password. Please try again!
                        </p>
                    )}

                    <Button
                        outline={!!username && !!password}
                        disable={!username || !password}
                    >
                        Register
                    </Button>
                </form>
            </div>

            <div className={cx('footer')}>
                <p>
                    Already have an account?{' '}
                    <strong className={cx('sign-up')} onClick={switchToLogin}>
                        Login.
                    </strong>{' '}
                </p>
            </div>
            <Toaster />
        </>
    );
}

export default RegisterForm;
