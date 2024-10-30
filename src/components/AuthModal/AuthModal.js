import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './Register';
import Modal from '~/components/Modal'

function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    // const [isRegister, setIsRegister] = useState(false);
    // const [isForgot, setIsForgot] = useState(false);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {isLogin ? (
                <LoginForm
                    onClose={onClose}
                    switchToRegister={() => setIsLogin(false)}
                />
            ) : (
                <RegisterForm
                    onClose={onClose}
                    switchToLogin={() => setIsLogin(true)}
                />
            )}
        </Modal>
    );
}

export default AuthModal;
