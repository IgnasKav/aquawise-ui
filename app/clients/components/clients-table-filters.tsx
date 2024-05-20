'use client';

import { Button } from '@/components/ui/button';
import { CategoryFilter } from 'app/shared/components/entity-table/filter/category-filter';
import { useEffect } from 'react';
import { useClientFilters } from '../stores/useClientFilters';
import { useRouter } from 'next/navigation';
import { ClientsPageSearchParams } from '../page';
import { Input } from '@/components/ui/input';
import { UserFilterSaveRequest } from 'api/users/models/user-filter-save-request';
import { api } from 'api/api';
import { useSession } from 'next-auth/react';
import { User } from 'app/auth/models/User';
import { buildClientsUrl } from '../utils/client-url-builder';

type ClientsTableFiltersProps = {
    searchParams: ClientsPageSearchParams;
};

const ClientsTableFilters = ({ searchParams }: ClientsTableFiltersProps) => {
    const session = useSession();
    const router = useRouter();
    const [
        searchText,
        setSearchText,
        typeFilters,
        setTypeFilters,
        searchFields,
        setSearchFields,
    ] = useClientFilters((state) => [
        state.searchText,
        state.setSearchText,
        state.typeFilters,
        state.setTypeFilters,
        state.searchFields,
        state.setSearchFields,
    ]);

    useEffect(() => {
        const initialStatuses = typeFilters.map((filter) => ({
            ...filter,
            isSelected: searchParams.types.includes(filter.value),
        }));

        setTypeFilters(initialStatuses);

        const initialSearchFields = searchFields.map((field) => ({
            ...field,
            isSelected: searchParams.searchFields.includes(field.value),
        }));

        setSearchFields(initialSearchFields);

        setSearchText(searchParams.searchText);
    }, []);

    const getUrl = () => {
        const url = buildClientsUrl({
            page: 1,
            searchText,
            types: typeFilters.filter((f) => f.isSelected).map((f) => f.value),
            searchFields: searchFields
                .filter((f) => f.isSelected)
                .map((f) => f.value),
        });

        return url;
    };

    const onSearch = async () => {
        await saveFilters();
        router.push(getUrl());
    };

    const saveFilters = async () => {
        const req: UserFilterSaveRequest = {
            scope: 'clients',
            filter: {
                searchText,
                page: searchParams.page,
                searchFields: searchFields
                    .filter((f) => f.isSelected)
                    .map((f) => f.value),
                types: typeFilters
                    .filter((t) => t.isSelected)
                    .map((t) => t.value),
            },
        };

        const user = session.data?.user as User;

        if (!user) return;

        api.Users.saveUserFilter(user.id, req);
    };

    return (
        <div className="flex gap-x-2">
            <Input
                placeholder="Search"
                className="h-8"
                isPlain={true}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <CategoryFilter
                title="Fields"
                filters={searchFields}
                setFilters={setSearchFields}
            />
            <CategoryFilter
                title="Type"
                filters={typeFilters}
                setFilters={setTypeFilters}
            />
            <Button className="h-8" onClick={() => onSearch()}>
                Search
            </Button>
        </div>
    );
};

export { ClientsTableFilters };
