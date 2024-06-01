import { api } from 'api/api';
import { User } from 'app/auth/models/User';
import { getServerSession } from 'next-auth';
import ClientsTable from './components/clients-table';
import AuthGuard from 'app/auth/AuthGuard';
import { nextAuthOptions } from 'app/api/auth/[...nextauth]/route';
import { ClientType } from './models/Client';
import { FailedDataFetchComponent } from 'app/shared/components/not-found/failed-data-fetch';
import { Suspense } from 'react';
import TableLoader from 'app/shared/components/loaders/TableLoader';
import { UserFilterSaveRequest } from 'api/users/models/user-filter-save-request';
import { ClientsSearchField } from 'api/clients/models/clients-search-request';

export type ClientsPageSearchParams = {
    page: number;
    searchText: string;
    types: ClientType[];
    searchFields: ClientsSearchField[];
};

const getClientSearchParams = (searchParams: {
    [key: string]: string | undefined;
}): ClientsPageSearchParams => {
    const page = +(searchParams.p ?? 1);
    const types = searchParams.types
        ? (searchParams.types.split(',') as ClientType[])
        : [];

    const searchText = searchParams.searchText ?? '';

    const searchFields = searchParams.searchFields
        ? (searchParams.searchFields.split(',') as ClientsSearchField[])
        : [];

    return { page, types, searchText, searchFields };
};

const saveClientSearchParams = async (
    userId: string,
    { page, searchText, types, searchFields }: ClientsPageSearchParams,
) => {
    const req: UserFilterSaveRequest = {
        scope: 'clients',
        filter: {
            searchText,
            page: page,
            searchFields,
            types,
        },
    };

    api.Users.saveUserFilter(userId, req);
};

const ClientsPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as User;

    const params = getClientSearchParams(searchParams);

    saveClientSearchParams(user.id, params);

    const { page, types, searchText, searchFields } = params;

    const pageSize = 15;

    const response = await api.Clients.searchClientsByCompany({
        companyId: user.company.id,
        page,
        pageSize,
        searchText,
        filter: {
            searchFields,
            types,
        },
    });

    if (response.isError) {
        return (
            <FailedDataFetchComponent
                title="Failed to load clients"
                reason={response.message}
            />
        );
    }

    if (!response.data) {
        return <div>No resulst</div>;
    }

    return (
        <AuthGuard>
            <Suspense fallback={<TableLoader />}>
                <ClientsTable
                    clients={response.data.data}
                    page={page}
                    pageSize={pageSize}
                    total={response.data.total}
                    searchParams={params}
                />
            </Suspense>
        </AuthGuard>
    );
};

export default ClientsPage;
