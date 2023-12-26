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

export const CreateProductButton = () => {
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

                    <ProductCreateForm />

                    <DialogFooter>
                        <Button type="submit">Create Product</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
