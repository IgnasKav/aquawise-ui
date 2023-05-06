import {LoginForm} from './LoginForm';
import {Modal} from '@mantine/core';
import {useState} from 'react';
import {ApplyForm} from './ApplyForm';

interface AuthModalProps {
    onClose: () => void;
}

const AuthModal = ({onClose }: AuthModalProps) => {
    const [isLoginView, setIsLoginView] = useState(true);
    return (
        <Modal
            opened={true}
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
