'use client';

import { Product } from '../../models/Product';
import { ApiUrl } from '../../../../api/api';
import Image from 'next/image';
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { ProductEditForm } from '../forms/ProductEditForm';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';
import { Subject } from 'rxjs';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const onCloseSubject = new Subject<void>();
    const onSubmitSubject = useMemo(() => new Subject<void>(), []);

    useEffect(() => {
        const subscription = onSubmitSubject.subscribe(() => {
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
        <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
            <div
                className="w-[240px] cursor-pointer"
                onClick={() => setDialogOpen(true)}
            >
                <div className="overflow-hidden rounded-xl">
                    {product.images && product.images.length > 0 ? (
                        <Image
                            className="h-auto w-[240px] object-cover transition-all hover:scale-105 aspect-square"
                            src={`${ApiUrl}/${product.images[0].imageUrl}`}
                            alt="Product Image"
                            width={240}
                            height={240}
                        />
                    ) : (
                        'no pic'
                    )}
                </div>
                <div className="space-y-1 text-sm mt-2">
                    <h3 className="text-base font-medium leading-none">
                        €{product.price}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {product.name}
                    </p>
                </div>
            </div>
            <DialogContent className="grid h-screen w-screen max-w-screen-md sm:h-fit sm:w-[434px]">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                        {`Update product info`}
                    </DialogDescription>
                </DialogHeader>

                <ProductEditForm
                    id="product-edit-form"
                    product={product}
                    onCloseSubject={onCloseSubject}
                    onSubmitSubject={onSubmitSubject}
                />

                <DialogFooter>
                    <Button type="submit" form="product-edit-form">
                        Edit Product
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
