import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import { api } from 'api/api';
import { RequireAuth } from 'components/auth/RequireAuth';
import { User } from 'models/User';
import { getServerSession } from 'next-auth';
import ClientsTable from './components/ClientsTable';

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
        <RequireAuth>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ClientsTable user={user} />
            </HydrationBoundary>
        </RequireAuth>
    );
}
