import { UserFilterScope } from 'api/users/models/user-filter-save-request';
import { ClientsPageSearchParams } from '../page';

const buildUrl = (scope: UserFilterScope, page: number) => {
    return `/${scope}?p=${page}`;
};

const buildClientsUrl = ({
    page,
    searchText,
    types,
    searchFields,
}: ClientsPageSearchParams) => {
    let url = buildUrl('clients', page);

    if (types.length > 0) {
        url += `&types=${encodeURIComponent(types.toString())}`;
    }

    if (searchText.trim() !== '') {
        url += `&searchText=${encodeURIComponent(searchText)}`;
    }

    if (searchFields.length > 0) {
        url += `&searchFields=${encodeURIComponent(searchFields.toString())}`;
    }

    return url;
};

export { buildClientsUrl };
