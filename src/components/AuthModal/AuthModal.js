import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './Register';

function AuthModal() {
    const [isLogin, setIsLogin] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(true);
    // const [isRegister, setIsRegister] = useState(false);
    // const [isForgot, setIsForgot] = useState(false);
    
    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    return (
        <>
            {isOpenModal &&
                (isLogin ? (
                    <LoginForm
                        onClose={handleCloseModal}
                        switchToRegister={() => setIsLogin(false)}
                    />
                ) : (
                    <RegisterForm
                        onClose={handleCloseModal}
                        switchToLogin={() => setIsLogin(true)}
                    />
                ))}
        </>
    );
}

export default AuthModal;
