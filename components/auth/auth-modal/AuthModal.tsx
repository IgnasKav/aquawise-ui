import {LoginForm} from './LoginForm';
import {Modal} from '@mantine/core';
import {useState} from 'react';
import {CompanyRegisterForm} from './CompanyRegisterForm';

interface AuthModalProps {
    isOpened: boolean;
    onClose: () => void;
}

const AuthModal = ({isOpened, onClose}: AuthModalProps) => {
    const [isLoginView, setIsLoginView] = useState(true);
    return (
        <Modal
            opened={isOpened}
            onClose={onClose}
            title={
                isLoginView
                    ? 'Welcome to Aquawise, log in with'
                    : 'Apply for a company account'
            }
        >
            {isLoginView ? <LoginForm switchToRegistration={() => setIsLoginView(false)}/> : <CompanyRegisterForm switchToLogin={() => setIsLoginView(true)} />}
        </Modal>
    );
};

export default AuthModal;
