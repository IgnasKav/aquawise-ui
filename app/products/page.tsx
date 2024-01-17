import { ProductList } from './components/product-list/ProductList';
import { CreateProductButton } from './components/CreateProductButton';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import { api } from 'api/api';
import AuthGuard from 'app/auth/AuthGuard';

const Products = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['products'],
        queryFn: () => api.Products.getAll(),
    });

    return (
        <AuthGuard>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CreateProductButton />
                <ProductList />
            </HydrationBoundary>
        </AuthGuard>
    );
};

export default Products;
