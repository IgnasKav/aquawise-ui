import { ProductCardLoader } from './ProductCardLoader';

const ProductListLoader = () => {
    const productLoaders = Array.from({ length: 20 });

    return (
        <div className="flex flex-wrap gap-2">
            {productLoaders.map((_, index) => (
                <ProductCardLoader key={index} />
            ))}
        </div>
    );
};

export { ProductListLoader };
