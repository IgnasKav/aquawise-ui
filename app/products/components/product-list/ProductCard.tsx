'use client';

import { Product } from '../../models/Product';
import { ApiUrl } from '../../../../api/api';
import Image from 'next/image';
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { ProductEditForm } from '../forms/ProductEditForm';
import { Button } from '@/components/ui/button';
import { createRef } from 'react';
import { Subject } from 'rxjs';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const formRef = createRef<HTMLFormElement>();
    const onCloseTrigger = new Subject<void>();

    const handleDialogClose = () => {
        onCloseTrigger.next();
    };

    return (
        <Dialog onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <div className="w-[240px] cursor-pointer">
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
            </DialogTrigger>
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
                    ref={formRef}
                    onCloseTrigger={onCloseTrigger}
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
