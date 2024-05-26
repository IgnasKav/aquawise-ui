'use client';

import { cn } from '@/lib/utils';
import { ProductCard } from './ProductCard';
import { Product } from 'app/products/models/Product';
import css from './product-list.module.scss';

type ProductsListProps = {
    className?: string;
    products: Product[];
};

const ProductList = ({ products, className }: ProductsListProps) => {
    return (
        <div className={cn(className, css.productGrid, 'gap-4')}>
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export { ProductList };
