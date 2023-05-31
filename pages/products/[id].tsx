import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { RequireAuth } from '../../components/auth/RequireAuth';

interface QueryParams extends ParsedUrlQuery {
    id: string;
}

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query as QueryParams;
    return (
        <RequireAuth>
            <div>{`Product: ${id}`}</div>
        </RequireAuth>
    );
};

export default ProductPage;
