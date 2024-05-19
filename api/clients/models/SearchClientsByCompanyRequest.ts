import { SearchRequest } from 'api/models/SearchRequest';
import { ClientType } from 'app/clients/models/Client';
import { ClientSearchField } from 'app/clients/stores/useClientFilters';

type ClientsSearchFilters = {
    searchFields?: ClientSearchField[];
    types: ClientType[];
};

export type SearchClientsByCompanyRequest = {
    companyId: string;
    filters: ClientsSearchFilters;
} & SearchRequest;
