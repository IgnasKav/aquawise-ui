'use client';

import { ProductCard } from './ProductCard';
import { Product } from 'app/products/models/Product';

type ProductsListProps = {
    products: Product[];
};

const ProductList = ({ products }: ProductsListProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export { ProductList };
