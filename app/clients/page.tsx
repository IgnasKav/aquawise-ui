import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import { api } from 'api/api';
import { User } from 'models/User';
import { getServerSession } from 'next-auth';
import ClientsTable from './components/ClientsTable';
import AuthGuard from 'app/auth/AuthGuard';

export default async function Clients() {
    const session = await getServerSession();
    const user = session?.user as User;

    if (!user) return <div>No data</div>;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['clients'],
        queryFn: () => api.Companies.getClients(user.company.id),
    });

    return (
        <AuthGuard>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ClientsTable user={user} />
            </HydrationBoundary>
        </AuthGuard>
    );
}
