import AuthGuard from 'app/auth/AuthGuard';
import { api } from '../../api/api';
import CompanyTable from './components/CompanyTable';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';

const CompaniesPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['companies'],
        queryFn: () => api.Companies.getAll(),
    });

    return (
        <AuthGuard>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CompanyTable />
            </HydrationBoundary>
        </AuthGuard>
    );
};

export default CompaniesPage;
