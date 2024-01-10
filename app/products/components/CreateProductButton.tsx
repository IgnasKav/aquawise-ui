'use client';

import { ProductCreateForm } from './forms/ProducCreateForm';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { createRef } from 'react';
import { Subject } from 'rxjs';

export const CreateProductButton = () => {
    const formRef = createRef<HTMLFormElement>();
    const onCloseTrigger = new Subject<void>();

    const handleClick = () => {
        const submitButton = formRef.current?.querySelector<HTMLButtonElement>(
            'button[type="submit"]',
        );
        submitButton?.click();
    };

    const handleDialogClose = () => {
        onCloseTrigger.next();
    };

    return (
        <>
            <Dialog onOpenChange={handleDialogClose}>
                <DialogTrigger asChild>
                    <Button>Add product</Button>
                </DialogTrigger>
                <DialogContent className="grid h-screen w-screen max-w-screen-md sm:h-fit sm:w-[434px]">
                    <DialogHeader>
                        <DialogTitle>Create Product</DialogTitle>
                        <DialogDescription>
                            {`Create new product for your company's clients`}
                        </DialogDescription>
                    </DialogHeader>

                    <ProductCreateForm
                        ref={formRef}
                        onCloseTrigger={onCloseTrigger}
                    />

                    <DialogFooter>
                        <Button onClick={handleClick}>Create Product</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
