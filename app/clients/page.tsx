import { api } from 'api/api';
import { User } from 'app/auth/models/User';
import { getServerSession } from 'next-auth';
import ClientsTable from './components/clients-table';
import AuthGuard from 'app/auth/AuthGuard';
import { nextAuthOptions } from 'app/api/auth/[...nextauth]/route';
import { Client } from './models/Client';
import { FailedDataFetchComponent } from 'app/shared/components/not-found/failed-data-fetch';
import { Suspense } from 'react';
import TableLoader from 'app/shared/components/loaders/TableLoader';

type ClientsPageSearchParams = {
    p?: string;
};

const ClientsPage = async ({
    searchParams,
}: {
    searchParams: ClientsPageSearchParams;
}) => {
    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as User;
    const clients: Client[] = [];

    const page = searchParams?.p ? +searchParams.p : 1;
    const pageSize = 15;

    const response = await api.Clients.searchClientsByCompany({
        companyId: user.company.id,
        page,
        pageSize,
    });

    if (!response.isError) {
        clients.push(...response.data);
    } else {
        return (
            <FailedDataFetchComponent
                title="Failed to load clients"
                reason={response.message}
            />
        );
    }

    return (
        <AuthGuard>
            <Suspense fallback={<TableLoader />}>
                <ClientsTable
                    clients={clients}
                    page={page}
                    pageSize={pageSize}
                    total={response.total}
                />
            </Suspense>
        </AuthGuard>
    );
};

export default ClientsPage;
