import { requests } from 'api/api';
import {
    UserFilterSaveRequest,
    UserFilterScope,
} from './models/user-filter-save-request';
import { ClientsSearchFilter } from 'api/clients/models/SearchClientsByCompanyRequest';
import { ClientsPageSearchParams } from 'app/clients/page';

const prefix = '/users';

const UsersApi = {
    getUserFilter: (userId: string, scope: UserFilterScope) =>
        requests.get<ClientsPageSearchParams>(
            `${prefix}/${userId}/${scope}/filters`,
        ),
    saveUserFilter: (userId: string, req: UserFilterSaveRequest) =>
        requests.post<ClientsSearchFilter>(`${prefix}/${userId}/filters`, req),
};

export { UsersApi };
