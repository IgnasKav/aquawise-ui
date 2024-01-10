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
} from '@/components/ui/dialog';
import { useEffect, useMemo, useState } from 'react';
import { Subject } from 'rxjs';

export const CreateProductButton = () => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const onCloseSubject = useMemo(() => new Subject<void>(), []);
    const onSubmitSubject = useMemo(() => new Subject<void>(), []);

    useEffect(() => {
        const subscription = onSubmitSubject.subscribe(() => {
            console.log('submitting in parent');
            setDialogOpen(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [onSubmitSubject]);

    const handleDialogClose = () => {
        onCloseSubject.next();
        setDialogOpen(false);
    };

    return (
        <>
            <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
                <Button onClick={() => setDialogOpen(true)}>Add product</Button>
                <DialogContent className="grid h-screen w-screen max-w-screen-md sm:h-fit sm:w-[434px]">
                    <DialogHeader>
                        <DialogTitle>Create Product</DialogTitle>
                        <DialogDescription>
                            {`Create new product for your company's clients`}
                        </DialogDescription>
                    </DialogHeader>

                    <ProductCreateForm
                        id="product-create-form"
                        onCloseSubject={onCloseSubject}
                        onSubmitSubject={onSubmitSubject}
                    />

                    <DialogFooter>
                        <Button type="submit" form="product-create-form">
                            Create Product
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
