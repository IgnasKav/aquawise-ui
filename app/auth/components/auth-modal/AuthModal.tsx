'use client';

import { LoginForm } from './LoginForm';
import { useState } from 'react';
import { CompanyApplicationForm } from './CompanyApplicationForm';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import CloseButton from 'app/shared/components/icons/CloseIcon';

const AuthModal = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);

    const openDialog = () => {
        setIsLoginView(true);
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <AlertDialog open={dialogOpen} onOpenChange={handleClose}>
                <Button onClick={openDialog}>Log in</Button>
                <AlertDialogContent>
                    <div className="flex justify-between">
                        <div>
                            {isLoginView
                                ? 'Welcome to Aquawise, log in with'
                                : 'Apply for a company account'}
                        </div>
                        <CloseButton onClick={handleClose} />
                    </div>
                    {isLoginView ? (
                        <LoginForm
                            closeModal={handleClose}
                            switchToRegistration={() => setIsLoginView(false)}
                        />
                    ) : (
                        <CompanyApplicationForm
                            closeModal={handleClose}
                            switchToLogin={() => setIsLoginView(true)}
                        />
                    )}
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default AuthModal;
