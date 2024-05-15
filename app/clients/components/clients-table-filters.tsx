'use client';

import { Button } from '@/components/ui/button';
import { StatusFilter } from 'app/shared/components/entity-table/filter/status-filter';
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
    const [statusFilters, setStatusFilters] = useClientFilters((state) => [
        state.typeFilter,
        state.setTypeFilter,
    ]);

    useEffect(() => {
        const updatedStatuses = statusFilters.map((filter) => ({
            ...filter,
            isSelected: searchParams.statuses.has(filter.value),
        }));

        setStatusFilters(updatedStatuses);
    }, []);

    const handleSearch = () => {
        const selectedStatusFilters = statusFilters
            .filter((f) => f.isSelected)
            .map((f) => f.value);

        const urlStatusFilter = encodeURIComponent(
            selectedStatusFilters.toString(),
        );

        router.push(`/clients?p=${page}&statuses=${urlStatusFilter}`);
    };

    return (
        <div className="flex gap-x-2">
            <StatusFilter
                title="Type"
                filters={statusFilters}
                setFilters={setStatusFilters}
            />
            <Button className="h-8" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
};

export { ClientsTableFilters };
