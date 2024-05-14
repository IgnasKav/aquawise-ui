import { SearchRequest } from 'api/models/SearchRequest';
import { ClientType } from 'app/clients/models/Client';

type ClientsSearchFilters = {
    statuses: ClientType[];
};

export type SearchClientsByCompanyRequest = {
    companyId: string;
    filters: ClientsSearchFilters;
} & SearchRequest;
