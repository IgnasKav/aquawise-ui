import { ClientsPageSearchParams } from 'app/clients/page';

export type UserFilterScope = 'clients' | 'products' | 'orders';

export type UserFilterSaveRequest = {
    scope: UserFilterScope;
    filter: ClientsPageSearchParams;
};
