import { SearchRequest } from 'api/models/SearchRequest';
import { ClientType } from 'app/clients/models/Client';

export type ClientsSearchField = 'email' | 'name' | 'phone' | 'address';

export type ClientsSearchFilter = {
    searchFields?: ClientsSearchField[];
    types: ClientType[];
};

export type ClientsSearchRequest = {
    companyId: string;
    filter: ClientsSearchFilter;
} & SearchRequest;
