import { SearchRequest } from 'api/models/SearchRequest';
import { ClientType } from 'app/clients/models/Client';

type ClientsSearchFilters = {
    types: ClientType[];
};

export type SearchClientsByCompanyRequest = {
    companyId: string;
    filters: ClientsSearchFilters;
} & SearchRequest;
