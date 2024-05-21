import { SearchRequest } from 'api/models/SearchRequest';

export type ProductsSearchField = 'name';

export type ProductsSearchFilter = {
    searchFields?: ProductsSearchField[];
};
export type ProductsSearchRequest = {
    filter: ProductsSearchFilter;
} & SearchRequest;
