'use client';

import { Product } from '../../models/Product';
import { modals } from '@mantine/modals';
import { ProductEditForm } from '../forms/ProductEditForm';
import { ApiUrl } from '../../../../api/api';
import Image from 'next/image';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const openEditModal = () =>
        modals.open({
            id: 'productEditModal',
            title: 'Edit product',
            children: (
                <ProductEditForm
                    product={product}
                    onSave={() => modals.close('productEditModal')}
                />
            ),
        });

    return (
        <div
            className="w-[240px] cursor-pointer"
            onClick={() => openEditModal()}
        >
            <div className="overflow-hidden rounded-xl">
                <Image
                    className="h-auto w-[240px] object-cover transition-all hover:scale-105 aspect-square"
                    src={`${ApiUrl}/${product.imageUrl}`}
                    alt="Product Image"
                    width={240}
                    height={240}
                />
            </div>
            <div className="space-y-1 text-sm mt-2">
                <h3 className="text-base font-medium leading-none">
                    €{product.price}
                </h3>
                <p className="text-sm text-muted-foreground">{product.name}</p>
            </div>
        </div>
    );
};
