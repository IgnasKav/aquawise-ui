import { api } from 'api/api';
import { User } from 'app/auth/models/User';
import { getServerSession } from 'next-auth';
import ClientsTable from './components/ClientsTable';
import AuthGuard from 'app/auth/AuthGuard';
import { nextAuthOptions } from 'app/api/auth/[...nextauth]/route';
import { Client } from './models/Client';

const ClientsPage = async () => {
    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as User;
    const clients: Client[] = [];

    const response = await api.Clients.searchClientsByCompany({
        companyId: user.company.id,
        page: 1,
        pageSize: 10,
    });

    if (!response.isError) {
        clients.push(...response.data);
    }

    return (
        <AuthGuard>
            <ClientsTable clients={clients} />
        </AuthGuard>
    );
};

export default ClientsPage;
