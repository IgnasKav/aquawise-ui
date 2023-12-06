import { RequireAuth } from '../../components/auth/RequireAuth';
import { ProductList } from '../../components/products/product-list/ProductList';
import { CreateProductButton } from '../../components/products/product-forms/CreateProductButton';

const ProductsPage = () => {
    return (
        <RequireAuth>
            <>
                <CreateProductButton />
                <ProductList />
            </>
        </RequireAuth>
    );
};

export default ProductsPage;
