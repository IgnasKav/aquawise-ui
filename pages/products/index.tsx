import { Product } from '../../components/products/models/Product';
import { createFakeProduct } from '../../components/products/models/FakeProduct';
import { RequireAuth } from '../../components/auth/RequireAuth';
import { ProductList } from '../../components/products/product-list/ProductList';
import { CreateProductButton } from '../../components/products/product-edit/CreateProductButton';

// this will be removed after implementing product fetching
export async function getServerSideProps() {
    const fakeProducts: Product[] = [];

    for (let i = 0; i < 10; i++) {
        fakeProducts.push(createFakeProduct());
    }
    const products = JSON.parse(JSON.stringify(fakeProducts));

    return {
        props: {
            products: products,
        },
    };
}

interface ServerSideProps {
    products: Product[];
}

const ProductsPage = ({ products }: ServerSideProps) => {
    return (
        <RequireAuth>
            <>
                <CreateProductButton />
                <ProductList products={products} />
            </>
        </RequireAuth>
    );
};

export default ProductsPage;
