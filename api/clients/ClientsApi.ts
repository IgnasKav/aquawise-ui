import { SearchResponse } from 'api/models/SearchResponse';
import { Client } from 'app/clients/models/Client';
import { ClientsSearchRequest } from './models/clients-search-request';
import { requests } from 'api/api';

const prefix = '/clients';

const ClientsApi = {
    searchClientsByCompany: (req: ClientsSearchRequest) =>
        requests.post<SearchResponse<Client>>(prefix, req),
};

export { ClientsApi };
