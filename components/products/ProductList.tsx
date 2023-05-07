import { Product } from './models/Product';
import { ProductCard } from './ProductCard';
import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => {
    return {
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gridGap: '1rem',
        },
    };
});

interface Props {
    products: Product[];
}

export const ProductList = ({ products }: Props) => {
    const { classes } = useStyles();

    return (
        <div className={classes.grid}>
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
