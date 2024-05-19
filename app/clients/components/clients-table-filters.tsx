'use client';

import { Button } from '@/components/ui/button';
import { CategoryFilter } from 'app/shared/components/entity-table/filter/category-filter';
import { useEffect } from 'react';
import { useClientFilters } from '../stores/useClientFilters';
import { useRouter } from 'next/navigation';
import { ClientsPageSearchParams } from '../page';
import { Input } from '@/components/ui/input';

type ClientsTableFiltersProps = {
    searchParams: ClientsPageSearchParams;
};

const ClientsTableFilters = ({ searchParams }: ClientsTableFiltersProps) => {
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
        let url = `/clients?p=1`;

        const selectedTypeFilters = typeFilters
            .filter((f) => f.isSelected)
            .map((f) => f.value);

        if (selectedTypeFilters.length > 0) {
            url += `&types=${encodeURIComponent(
                selectedTypeFilters.toString(),
            )}`;
        }

        if (searchText.trim() !== '') {
            url += `&searchText=${encodeURIComponent(searchText)}`;
        }

        const selectedSearchFields = searchFields
            .filter((f) => f.isSelected)
            .map((f) => f.value);

        if (selectedSearchFields.length > 0) {
            url += `&searchFields=${encodeURIComponent(
                selectedSearchFields.toString(),
            )}`;
        }

        return url;
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
            <Button className="h-8" onClick={() => router.push(getUrl())}>
                Search
            </Button>
        </div>
    );
};

export { ClientsTableFilters };
