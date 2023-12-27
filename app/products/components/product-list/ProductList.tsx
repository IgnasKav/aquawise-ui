'use client';

import { ProductCard } from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../api/api';

export const ProductList = () => {
    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: () => api.Products.getAll(),
    });

    console.log('data', products);

    return (
        <div className="grid grid-cols-4 gap-4">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
