export type SearchResponse<T> = {
    total: number;
    page: number;
    pageSize: number;
    data: T[];
};
