import { api } from '../../api/api';
import CompanyTable from './components/CompanyTable';
import { RequireAuth } from '../../components/auth/RequireAuth';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';

export default async function Companies() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['companies'],
        queryFn: () => api.Companies.getAll(),
    });

    return (
        <RequireAuth>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CompanyTable />
            </HydrationBoundary>
        </RequireAuth>
    );
}
