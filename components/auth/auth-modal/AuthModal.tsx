'use client';

import { LoginForm } from './LoginForm';
import { useState } from 'react';
import { CompanyRegisterForm } from './CompanyRegisterForm';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

const AuthModal = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);

    const handleClose = () => {
        setDialogOpen(false);
        setTimeout(() => setIsLoginView(true), 200);
    };

    return (
        <>
            <Dialog open={dialogOpen} onOpenChange={handleClose}>
                <Button onClick={() => setDialogOpen(true)}>Log in</Button>
                <DialogContent>
                    <DialogHeader>
                        {isLoginView
                            ? 'Welcome to Aquawise, log in with'
                            : 'Apply for a company account'}
                    </DialogHeader>
                    <AnimatePresence initial={false}>
                        {isLoginView ? (
                            <LoginForm
                                closeModal={handleClose}
                                switchToRegistration={() =>
                                    setIsLoginView(false)
                                }
                            />
                        ) : (
                            <CompanyRegisterForm
                                switchToLogin={() => setIsLoginView(true)}
                            />
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AuthModal;
