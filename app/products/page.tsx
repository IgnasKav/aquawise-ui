import { ProductList } from './components/product-list/ProductList';
import { CreateProductButton } from './components/CreateProductButton';
import { api } from 'api/api';
import AuthGuard from 'app/auth/AuthGuard';
import { PaginationComponent } from 'app/shared/components/pagination/pagination';

export type ProductsPageSearchParams = {
    page: number;
};

const getProductsSearchParams = (searchParams: {
    [key: string]: string | undefined;
}): ProductsPageSearchParams => {
    const page = +(searchParams.p ?? 1);

    return { page };
};

const ProductsPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const { page } = getProductsSearchParams(searchParams);
    const pageSize = 15;

    const resp = await api.Products.search({
        searchText: '',
        pageSize,
        page,
        filter: {},
    });

    if (resp.isError) {
        return;
    }

    const products = resp.data;

    return (
        <AuthGuard>
            <div className="overflow-hidden flex flex-col grow">
                <CreateProductButton className="flex-none" />
                <ProductList
                    className="overflow-y-auto grow mt-4 rounded-md"
                    products={products}
                />
                <PaginationComponent
                    className="mt-2 pb-8"
                    page={page}
                    pageSize={pageSize}
                    total={resp.total}
                />
            </div>
        </AuthGuard>
    );
};

export default ProductsPage;
