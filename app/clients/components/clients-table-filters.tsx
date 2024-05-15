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
    const { p: page } = searchParams;

    const router = useRouter();
    const [typeFilters, setTypeFilters] = useClientFilters((state) => [
        state.typeFilters,
        state.setTypeFilters,
    ]);

    useEffect(() => {
        const updatedStatuses = typeFilters.map((filter) => ({
            ...filter,
            isSelected: searchParams.statuses.has(filter.value),
        }));

        setTypeFilters(updatedStatuses);
    }, []);

    const handleSearch = () => {
        const selectedStatusFilters = typeFilters
            .filter((f) => f.isSelected)
            .map((f) => f.value);

        const urlStatusFilter = encodeURIComponent(
            selectedStatusFilters.toString(),
        );

        router.push(`/clients?p=${page}&statuses=${urlStatusFilter}`);
    };

    return (
        <div className="flex gap-x-2">
            <CategoryFilter
                title="Type"
                filters={typeFilters}
                setFilters={setTypeFilters}
            />
            <Button className="h-8" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
};

export { ClientsTableFilters };
