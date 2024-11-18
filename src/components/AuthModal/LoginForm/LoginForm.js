import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import { useState } from 'react';
import Button from '~/components/Button';
import { useAuth } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

function LoginForm({ onClose, switchToRegister }) {
    const { login, error, setError } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSuccess = () => {
        setUsername('');
        setPassword('');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);

            handleLoginSuccess();
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error('Login error:', err);
        }
    };

    return (
        <div>
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

                    {error && (
                        <p className={cx('error')}>
                            Invalid Email or Password. Please try again!
                        </p>
                    )}

                    <Button
                        outline={!!username && !!password}
                        disable={!username || !password}
                    >
                        Login
                    </Button>
                </form>
            </div>

            <div className={cx('footer')}>
                <p>
                    Don't have an account?{' '}
                    <strong
                        className={cx('sign-up')}
                        onClick={switchToRegister}
                    >
                        Sign up
                    </strong>{' '}
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
