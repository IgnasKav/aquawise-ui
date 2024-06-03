'use client';

import { Product } from '../../models/Product';
import { ApiUrl } from '../../../../api/api';
import Image from 'next/image';
import { ProductEditForm } from '../forms/ProductEditForm';
import { useEffect, useMemo, useState } from 'react';
import { Subject } from 'rxjs';

import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

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
            <div className="group w-[240px] cursor-pointer">
                <div className="overflow-hidden rounded-xl">
                    {product.images && product.images.length > 0 ? (
                        <Carousel className="w-full max-w-xs">
                            <CarouselContent>
                                {product.images.map((image) => (
                                    <CarouselItem key={image.id}>
                                        <Image
                                            onClick={() => setDialogOpen(true)}
                                            className="rounded-xl h-auto w-[240px] object-cover transition-all aspect-square"
                                            src={`${ApiUrl}/${image.imageUrl}`}
                                            alt="Product Image"
                                            width={240}
                                            height={240}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-2 z-10 scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out" />
                            <CarouselNext className="absolute right-2 z-10 scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out" />
                        </Carousel>
                    ) : (
                        <></>
                    )}
                </div>
                <div
                    className="space-y-1 text-sm mt-2"
                    onClick={() => setDialogOpen(true)}
                >
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
