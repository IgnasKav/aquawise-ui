import AuthGuard from 'app/auth/AuthGuard';
import { api } from '../../api/api';
import CompanyTable from './components/CompanyTable';
import { QueryClient } from '@tanstack/react-query';

const CompaniesPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['companies'],
        queryFn: () => api.Companies.getAll(),
    });

    const resp = await api.Companies.getAll();

    if (resp.isError) {
        return `Error: ${resp.message}`;
    }

    if (!resp.data) {
        return 'No resulsts';
    }

    return (
        <AuthGuard>
            <CompanyTable companies={resp.data} />
        </AuthGuard>
    );
};

export default CompaniesPage;
