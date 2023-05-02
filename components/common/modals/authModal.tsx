import { LoginForm } from '../../auth/loginForm';
import { Anchor, Group, Modal } from '@mantine/core';
import { useState } from 'react';
import { ApplyForm } from '../../auth/applyForm';

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
            {isLoginView ? <LoginForm /> : <ApplyForm />}

            <Group position="apart" mt="xl">
                <Anchor
                    component="button"
                    type="button"
                    color="dimmed"
                    size="xs"
                    onClick={() => setIsLoginView(!isLoginView)}
                >
                    {isLoginView
                        ? "Don't have an account? Apply here"
                        : 'Already have an account? Log in'}
                </Anchor>
            </Group>
        </Modal>
    );
};

export default AuthModal;
