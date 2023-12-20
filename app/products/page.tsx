import { RequireAuth } from '../../components/auth/RequireAuth';
import { ProductList } from './components/product-list/ProductList';
import { CreateProductButton } from './components/CreateProductButton';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import { api } from 'api/api';

const Products = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['products'],
        queryFn: () => api.Products.getAll(),
    });

    return (
        <RequireAuth>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CreateProductButton />
                <ProductList />
            </HydrationBoundary>
        </RequireAuth>
    );
};

export default Products;
