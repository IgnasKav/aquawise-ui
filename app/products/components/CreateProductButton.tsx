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

export const CreateProductButton = () => {
    const formRef = createRef<HTMLFormElement>();

    const handleClick = () => {
        const submitButton = formRef.current?.querySelector<HTMLButtonElement>(
            'button[type="submit"]',
        );
        submitButton?.click();
    };

    return (
        <>
            <Dialog>
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

                    <ProductCreateForm ref={formRef} />

                    <DialogFooter>
                        <Button onClick={handleClick}>Create Product</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
