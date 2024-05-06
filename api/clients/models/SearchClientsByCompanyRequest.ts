import { SearchRequest } from 'api/models/SearchRequest';

export type SearchClientsByCompanyRequest = {
    companyId: string;
} & SearchRequest;
