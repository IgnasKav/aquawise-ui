import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import { api } from 'api/api';
import { User } from 'app/auth/models/User';
import { getServerSession } from 'next-auth';
import ClientsTable from './components/ClientsTable';
import AuthGuard from 'app/auth/AuthGuard';
import { nextAuthOptions } from 'app/api/auth/[...nextauth]/route';

const ClientsPage = async () => {
    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as User;

    if (!user) return <div>No data</div>;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['clients'],
        queryFn: () =>
            api.Clients.searchClientsByCompany({
                companyId: user.company.id,
                page: 1,
                pageSize: 10,
            }),
    });

    return (
        <AuthGuard>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ClientsTable user={user} />
            </HydrationBoundary>
        </AuthGuard>
    );
};

export default ClientsPage;
