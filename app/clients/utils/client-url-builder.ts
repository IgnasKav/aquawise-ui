import { ClientsPageSearchParams } from '../page';

const buildClientsUrl = ({
    page,
    searchText,
    types,
    searchFields,
}: ClientsPageSearchParams) => {
    let url = `/clients?p=${page}`;

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
