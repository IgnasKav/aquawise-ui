import { Product } from './models/Product';
import { ProductCard } from './ProductCard';
import css from './products.module.scss';

interface Props {
    products: Product[];
}

export const ProductList = ({ products }: Props) => {
    return (
        <div className={css.grid}>
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
