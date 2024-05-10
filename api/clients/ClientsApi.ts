import { SearchResponse } from 'api/models/SearchResponse';
import { Client } from 'app/clients/models/Client';
import { SearchClientsByCompanyRequest } from './models/SearchClientsByCompanyRequest';
import { requests } from 'api/api';

const prefix = '/clients';

const ClientsApi = {
    searchClientsByCompany: (req: SearchClientsByCompanyRequest) =>
        requests.post<SearchResponse<Client>>(prefix, req),
};

export { ClientsApi };
