'use client';

import { ProductCard } from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../api/api';

export const ProductList = () => {
    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: () => api.Products.getAll(),
    });

    return (
        <div className="flex flex-wrap gap-2">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
