'use client';

import { LoginForm } from './LoginForm';
import { useState } from 'react';
import { CompanyApplicationForm } from './CompanyApplicationForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

const AuthModal = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);

    const handleClose = () => {
        setDialogOpen(false);
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
                    {isLoginView ? (
                        <LoginForm
                            closeModal={handleClose}
                            switchToRegistration={() => setIsLoginView(false)}
                        />
                    ) : (
                        <CompanyApplicationForm
                            switchToLogin={() => setIsLoginView(true)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AuthModal;
