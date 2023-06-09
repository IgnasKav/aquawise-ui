import { LoginForm } from './LoginForm';
import { useState } from 'react';
import { CompanyRegisterForm } from './CompanyRegisterForm';
import { Modal } from '@mantine/core';
import { AnimatePresence } from 'framer-motion';
import css from './auth-modal.module.scss';

interface AuthModalProps {
    isOpened: boolean;
    onClose: () => void;
}

const AuthModal = ({ isOpened, onClose }: AuthModalProps) => {
    const [isLoginView, setIsLoginView] = useState(true);

    const handleClose = () => {
        onClose();
        setTimeout(() => setIsLoginView(true), 200);
    };

    return (
        <Modal
            opened={isOpened}
            onClose={handleClose}
            title={
                isLoginView
                    ? 'Welcome to Aquawise, log in with'
                    : 'Apply for a company account'
            }
        >
            <div className={css.overflowHidden}>
                <AnimatePresence initial={false}>
                    {isLoginView ? (
                        <LoginForm
                            closeModal={handleClose}
                            switchToRegistration={() => setIsLoginView(false)}
                        />
                    ) : (
                        <CompanyRegisterForm
                            switchToLogin={() => setIsLoginView(true)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </Modal>
    );
};

export default AuthModal;
