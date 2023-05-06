import {LoginForm} from './loginForm';
import {Modal} from '@mantine/core';
import {useState} from 'react';
import {ApplyForm} from './applyForm';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [isLoginView, setIsLoginView] = useState(true);
    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title={
                isLoginView
                    ? 'Welcome to Aquawise, log in with'
                    : 'Apply for a company account'
            }
        >
            {isLoginView ? <LoginForm switchToRegistration={() => setIsLoginView(false)}/> : <ApplyForm switchToLogin={() => setIsLoginView(true)} />}
        </Modal>
    );
};

export default AuthModal;
