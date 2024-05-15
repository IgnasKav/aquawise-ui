'use client';

import { Button } from '@/components/ui/button';
import { CategoryFilter } from 'app/shared/components/entity-table/filter/category-filter';
import { useEffect } from 'react';
import { useClientFilters } from '../stores/useClientFilters';
import { useRouter } from 'next/navigation';
import { ClientsPageSearchParams } from '../page';

type ClientsTableFiltersProps = {
    searchParams: ClientsPageSearchParams;
};

const ClientsTableFilters = ({ searchParams }: ClientsTableFiltersProps) => {
    const router = useRouter();
    const [typeFilters, setTypeFilters] = useClientFilters((state) => [
        state.typeFilters,
        state.setTypeFilters,
    ]);

    useEffect(() => {
        const updatedStatuses = typeFilters.map((filter) => ({
            ...filter,
            isSelected: searchParams.types.has(filter.value),
        }));

        setTypeFilters(updatedStatuses);
    }, []);

    const getUrl = () => {
        let url = `/clients?p=1`;

        const selectedTypeFilters = typeFilters
            .filter((f) => f.isSelected)
            .map((f) => f.value);

        const urlTypesFilter = encodeURIComponent(
            selectedTypeFilters.toString(),
        );

        if (urlTypesFilter.trim() !== '') {
            url += `&types=${urlTypesFilter}`;
        }

        return url;
    };
    return (
        <div className="flex gap-x-2">
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
