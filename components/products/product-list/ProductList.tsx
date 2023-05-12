import { ProductCard } from './ProductCard';
import css from './product-list.module.scss';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../api/api';
import { ProductQueryKeys } from '../models/ProductQueryKeys';

export const ProductList = () => {
    const { data: products } = useQuery([ProductQueryKeys.ProductList], () =>
        api.Products.getAll(),
    );

    return (
        <div className={css.grid}>
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
